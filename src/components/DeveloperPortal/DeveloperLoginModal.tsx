import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Lock, Mail, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { triggerVibration } from '../../utils/vibrate';
import { showToast } from '../../utils/toast';
import { safeSetItem } from '../../utils/storage';

interface DeveloperLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AUTHORIZED_DEV_EMAIL = 'sanjeetkumar803108@gmail.com';
const AUTHORIZED_DEV_PASSWORD = '87654321';

export default function DeveloperLoginModal({ isOpen, onClose, onSuccess }: DeveloperLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerVibration(15);
    setError(null);

    const trimmedEmail = email.trim().toLowerCase();

    // Strict credential check
    if (trimmedEmail !== AUTHORIZED_DEV_EMAIL || password !== AUTHORIZED_DEV_PASSWORD) {
      setError('Access Denied: Invalid Developer Credentials. Only the authorized app owner can sign in.');
      showToast('Access Denied: Unauthorized developer email or password', 'error');
      triggerVibration(30);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      safeSetItem('is_developer_authenticated', 'true');
      safeSetItem('dev_auth_email', AUTHORIZED_DEV_EMAIL);
      window.dispatchEvent(new CustomEvent('developer-auth-changed', { detail: { authenticated: true } }));
      showToast('Welcome App Owner! Developer Mode Activated', 'success');
      setLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-700/80 rounded-3xl p-6 shadow-2xl relative text-zinc-100 flex flex-col"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            triggerVibration(10);
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-700"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Developer Badge Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/30">
                Authorized Access
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight text-white mt-1">
              Developer Account
            </h2>
          </div>
        </div>

        <p className="text-xs text-zinc-400 font-medium mb-5 leading-relaxed">
          Sign in to the private developer management portal to upload and manage AP sample paper question sets.
        </p>

        {/* Form with strictly two inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* 1. Email Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Developer Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="Enter authorized developer email"
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* 2. Password Box */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Developer Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                placeholder="Enter developer password"
                className="w-full bg-zinc-800/90 border border-zinc-700 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In as Developer</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-4 pt-3 border-t border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            Protected App Owner Terminal • Private Access Only
          </span>
        </div>
      </motion.div>
    </div>
  );
}
