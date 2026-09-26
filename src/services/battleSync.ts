import { getBattleApiUrl } from '../utils/api';
import { BattleQuestion, getBattleQuestions } from '../data/quizBattleBank';

export interface PlayerProfile {
  id: string;
  name: string;
  avatar: string;
  isRealPlayer: boolean;
  score: number;
  hasAnswered: boolean;
  currentQ: number;
  finished?: boolean;
  gradeLevel?: string;
  tagline?: string;
}

export interface BattleRoom {
  id: string;
  code?: string;
  subjectId: string;
  status: 'waiting' | 'countdown' | 'battle' | 'finished';
  player1: PlayerProfile;
  player2: PlayerProfile | null;
  questions: BattleQuestion[];
  currentQ: number;
  roundStatus: 'playing' | 'revealed';
  roundStartTime: number;
  revealStartTime?: number;
  countdownStart?: number;
  updatedAt: number;
  forfeitedBy?: string;
  winnerId?: string;
}

// Clean helper to extract and normalize room code
export const normalizeBattleCode = (rawCode: string): string => {
  if (!rawCode) return '';
  const trimmed = rawCode.trim().toUpperCase();
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length >= 4) {
    return `AP-${digits.slice(-4)}`;
  }
  const cleanAlpha = trimmed.replace(/[^A-Z0-9]/g, '');
  if (cleanAlpha.length >= 4) {
    return cleanAlpha.startsWith('AP') ? cleanAlpha : `AP-${cleanAlpha}`;
  }
  return trimmed;
};

export class BattleSyncService {
  /**
   * 0. Ping server to check connectivity and round-trip latency
   */
  async checkConnection(): Promise<{ ok: boolean; latencyMs: number }> {
    const t0 = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(getBattleApiUrl('/api/battle/ping'), {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const latencyMs = Math.round(performance.now() - t0);
      return { ok: res.ok, latencyMs };
    } catch {
      return { ok: false, latencyMs: -1 };
    }
  }

  /**
   * 0.5 Generate brand new AI-powered battle questions with anti-repetition filter
   */
  async generateBattleQuestions(
    subjectId: string,
    gradeLevel: string = '11th Grade',
    avoidStems: string[] = []
  ): Promise<BattleQuestion[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(getBattleApiUrl('/api/battle/generate-questions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          subjectId,
          gradeLevel,
          avoidStems: avoidStems.slice(-100),
          count: 5
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.questions && Array.isArray(data.questions) && data.questions.length >= 5) {
          return data.questions;
        }
      }
    } catch (err) {
      console.warn('[BattleSync] Dynamic question generation fallback:', err);
    }
    return getBattleQuestions(subjectId, 5, avoidStems);
  }

  /**
   * 1. Try to find a match or enter queue on the live server
   */
  async enterMatchQueue(
    playerId: string,
    playerName: string,
    playerAvatar: string,
    subjectId: string,
    questions: BattleQuestion[],
    gradeLevel?: string
  ): Promise<{ status: 'matched' | 'waiting'; roomId?: string; isPlayer1?: boolean; opponent?: PlayerProfile; questions?: BattleQuestion[]; subjectId?: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(getBattleApiUrl('/api/battle/match'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          playerId,
          playerName,
          playerAvatar,
          subjectId,
          questions,
          gradeLevel
        })
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Matchmaking HTTP error ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.warn('Live server match request failed:', err);
      return { status: 'waiting' };
    }
  }

  /**
   * 2. Start polling for an opponent while active on radar screen (every 350ms with self-healing heartbeat)
   */
  startQueuePolling(
    playerId: string,
    onMatched: (roomId: string, opponent: PlayerProfile, questions: BattleQuestion[], isPlayer1: boolean, subjectId?: string) => void,
    playerContext?: {
      playerName?: string;
      playerAvatar?: string;
      subjectId?: string;
      gradeLevel?: string;
      questions?: BattleQuestion[];
    }
  ): () => void {
    let active = true;

    const poll = async () => {
      if (!active) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(getBattleApiUrl('/api/battle/poll-match'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({ 
            playerId,
            playerName: playerContext?.playerName,
            playerAvatar: playerContext?.playerAvatar,
            subjectId: playerContext?.subjectId,
            gradeLevel: playerContext?.gradeLevel,
            questions: playerContext?.questions
          })
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'matched' && data.roomId && data.opponent) {
            active = false;
            const opp: PlayerProfile = {
              id: data.opponent.id,
              name: data.opponent.name,
              avatar: data.opponent.avatar,
              isRealPlayer: true,
              score: data.opponent.score || 0,
              hasAnswered: !!data.opponent.hasAnswered,
              currentQ: data.opponent.currentQ || 0,
              gradeLevel: data.opponent.gradeLevel || data.opponent.grade,
              tagline: data.opponent.tagline
            };
            onMatched(data.roomId, opp, data.questions || [], !!data.isPlayer1, data.subjectId);
            return;
          }
        }
      } catch (err) {
        // Suppress transient poll blips
      }

      if (active) {
        setTimeout(poll, 350);
      }
    };

    setTimeout(poll, 200);

    return () => {
      active = false;
    };
  }

  /**
   * 3. Cleanly leave the queue / cancel matchmaking
   */
  async leaveQueue(playerId: string, roomId?: string): Promise<void> {
    try {
      await fetch(getBattleApiUrl('/api/battle/cancel'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, roomId })
      });
    } catch {}
  }

  /**
   * 4. Create a private room with flexible Code
   */
  async createFriendRoom(
    code: string,
    player: PlayerProfile,
    subjectId: string,
    questions: BattleQuestion[]
  ): Promise<{ success: boolean; roomId?: string; code?: string; questions?: BattleQuestion[] }> {
    try {
      const formattedCode = normalizeBattleCode(code);
      const res = await fetch(getBattleApiUrl('/api/battle/room/create'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: formattedCode,
          player,
          subjectId,
          questions
        })
      });

      if (!res.ok) return { success: false };
      const data = await res.json();
      return { success: true, roomId: data.roomId, code: data.code || formattedCode, questions: data.questions };
    } catch (err) {
      console.warn('Create friend room failed:', err);
      return { success: false };
    }
  }

  /**
   * 5. Join a private room with flexible Code (handles digits only, AP- prefix, spaces)
   */
  async joinFriendRoom(
    code: string,
    player: PlayerProfile
  ): Promise<{ success: boolean; roomId?: string; opponent?: PlayerProfile; questions?: BattleQuestion[]; subjectId?: string; error?: string }> {
    try {
      const cleanInput = code.trim().toUpperCase();
      const res = await fetch(getBattleApiUrl('/api/battle/room/join'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: cleanInput,
          player
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        return { success: false, error: errData.error || 'Room not found' };
      }

      const data = await res.json();
      const opp: PlayerProfile = {
        id: data.opponent.id,
        name: data.opponent.name,
        avatar: data.opponent.avatar,
        isRealPlayer: true,
        score: data.opponent.score || 0,
        hasAnswered: !!data.opponent.hasAnswered,
        currentQ: data.opponent.currentQ || 0,
        gradeLevel: data.opponent.gradeLevel || data.opponent.grade,
        tagline: data.opponent.tagline
      };

      return {
        success: true,
        roomId: data.roomId,
        opponent: opp,
        questions: data.questions,
        subjectId: data.subjectId || data.room?.subjectId
      };
    } catch (err: any) {
      console.warn('Join friend room failed:', err);
      return { success: false, error: 'Network connection failed' };
    }
  }

  /**
   * 6. Sync player action in room (Score, Answered state, Finished state)
   */
  async updatePlayerAction(
    roomId: string,
    playerId: string,
    score: number,
    hasAnswered: boolean,
    finished: boolean = false,
    currentQ?: number,
    isPlayer1?: boolean
  ): Promise<{ success: boolean; room?: BattleRoom }> {
    const payload = JSON.stringify({
      roomId,
      playerId,
      score,
      hasAnswered,
      finished,
      currentQ,
      isPlayer1
    });

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(getBattleApiUrl('/api/battle/action'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: payload
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          return { success: true, room: data.room };
        }
      } catch (err) {
        if (attempt === 2) console.warn('Sync player action error after 3 attempts:', err);
      }
      await new Promise(r => setTimeout(r, 100));
    }
    return { success: false };
  }

  /**
   * 7. Poll room status during battle (every 250ms)
   */
  subscribeToRoomUpdates(
    roomId: string,
    myPlayerId: string,
    onRoomUpdate: (room: BattleRoom, opponent: PlayerProfile | null, serverTime?: number) => void,
    isPlayer1Hint?: boolean
  ): () => void {
    let active = true;

    const poll = async () => {
      if (!active) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const pollUrl = `/api/battle/room/${encodeURIComponent(roomId)}${myPlayerId ? `?playerId=${encodeURIComponent(myPlayerId)}` : ''}`;
        const res = await fetch(getBattleApiUrl(pollUrl), {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const room: BattleRoom = data.room;
          if (room) {
            let isMeP1 = isPlayer1Hint !== undefined ? isPlayer1Hint : false;
            if (room.player1?.id === myPlayerId) {
              isMeP1 = true;
            } else if (room.player2?.id === myPlayerId) {
              isMeP1 = false;
            } else if (isPlayer1Hint === undefined && room.player1?.id && myPlayerId) {
              const myBase = myPlayerId.split('_tab_')[0].split('_sess_')[0];
              const p1Base = room.player1.id.split('_tab_')[0].split('_sess_')[0];
              const p2Base = room.player2?.id ? room.player2.id.split('_tab_')[0].split('_sess_')[0] : '';
              if (myBase !== 'player' && myBase !== 'student' && myBase === p1Base && myBase !== p2Base) {
                isMeP1 = true;
              } else if (myBase !== 'player' && myBase !== 'student' && myBase === p2Base) {
                isMeP1 = false;
              }
            }

            const oppRaw = isMeP1 ? room.player2 : room.player1;
            const opp: PlayerProfile | null = oppRaw ? {
              id: oppRaw.id,
              name: oppRaw.name,
              avatar: oppRaw.avatar,
              isRealPlayer: true,
              score: oppRaw.score || 0,
              hasAnswered: !!oppRaw.hasAnswered,
              currentQ: oppRaw.currentQ || 0,
              gradeLevel: (oppRaw as any).gradeLevel || (oppRaw as any).grade,
              tagline: (oppRaw as any).tagline
            } : null;

            onRoomUpdate(room, opp, data.serverTime);
          }
        }
      } catch (pollErr) {
        console.warn('[BattleSync Room Poll Notice]:', pollErr);
      }

      if (active) {
        setTimeout(poll, 250);
      }
    };

    setTimeout(poll, 100);

    return () => {
      active = false;
    };
  }
}

export const battleSync = new BattleSyncService();

