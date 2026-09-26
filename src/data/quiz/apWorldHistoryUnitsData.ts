// AP World History: Modern (WHAP) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–9)
// Authentic historical evidence, cross-regional trade networks, imperial consolidation, revolutions, global conflicts, and 20th-century geopolitical transformations.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_WORLD_HISTORY_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: The Global Tapestry (1200–1450)',
    shortTitle: 'Unit 1: Global Tapestry',
    description: 'Song Dynasty bureaucratic governance, Champa rice, Dar al-Islam scholarship, South Asian trading kingdoms, and Mesoamerican empires',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Grand Canal Citadel & Silk Pavilions',
      icon: '🏯',
      accentColor: '#D97706',
      secondaryColor: '#B45309',
      groundGradient: 'from-amber-100 via-yellow-50 to-orange-100',
      cardBorder: 'border-amber-500',
      trailColor: '#d97706',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-yellow-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'whap-u1-l1',
        topicNumber: 'Topic 1.1 & 1.2',
        name: 'Song Dynasty & Dar al-Islam',
        subtitle: 'Civil service meritocracy, Champa rice, and the House of Wisdom',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh1-l1-q1',
            stem: 'Which agricultural innovation introduced to Song Dynasty China from Vietnam allowed farmers to harvest two crops per year, spurring massive population growth and urbanization?',
            options: [
              'Champa rice (drought-resistant and fast-ripening)',
              'Terrace irrigation for wheat',
              'Peruvian potatoes',
              'Egyptian cotton'
            ],
            correctIndex: 0,
            explanation: 'Champa rice was a fast-maturing, drought-resistant grain introduced as tribute from Vietnam (Champa). It allowed double-cropping in the Yangtze River basin, causing China\'s population to soar past 100 million during the Song Dynasty.',
            distractorTip: 'Champa rice is the classic AP World technological transfer example for Unit 1.'
          },
          {
            id: 'wh1-l1-q2',
            stem: 'How did the imperial civil service exam system reinforce the governance and social hierarchy of the Song Dynasty?',
            options: [
              'It created an elite scholar-gentry bureaucratic class selected on mastery of Confucian classics, rather than hereditary nobility alone.',
              'It barred all non-military officers from holding local political office.',
              'It mandated the practice of Daoist monasticism.',
              'It was open only to foreign Mongolian diplomats.'
            ],
            correctIndex: 0,
            explanation: 'The imperial examination system, rooted in Confucian orthodoxy, allowed for modest meritocratic mobility and created a loyal, educated scholar-bureaucracy that administered China\'s sprawling imperial institutions.',
            distractorTip: 'Neo-Confucianism also reinforced patriarchal social norms (such as foot binding).'
          },
          {
            id: 'wh1-l1-q3',
            stem: 'The Abbasid capital of Baghdad was globally renowned during the Islamic Golden Age as an intellectual hub primarily because of which institution?',
            options: [
              'The House of Wisdom (Bayt al-Hikma), where scholars translated, preserved, and expanded Greek, Persian, and Indian scientific texts.',
              'The Grand Canal.',
              'The Roman Colosseum.',
              'The Potosí silver mint.'
            ],
            correctIndex: 0,
            explanation: 'The House of Wisdom in Baghdad brought together Muslim, Christian, and Jewish scholars to translate classical Greek philosophy, mathematics (algebra), astronomy, and medicine into Arabic, advancing global science before its destruction by the Mongols in 1258.',
            distractorTip: 'Abbasid Caliphate scholarship preserved Hellenistic learning that later catalyzed the European Renaissance.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Networks of Exchange (1200–1450)',
    shortTitle: 'Unit 2: Trade Networks',
    description: 'Silk Roads, Pax Mongolica, Indian Ocean monsoon navigation, Trans-Saharan gold-salt caravans, and travelers (Ibn Battuta, Marco Polo)',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Caravan Oasis & Monsoon Dhow Haven',
      icon: '🐪',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-orange-50 to-stone-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'whap-u2-l1',
        topicNumber: 'Topic 2.1 & 2.3',
        name: 'The Silk Roads & Indian Ocean Basin',
        subtitle: 'Pax Mongolica, caravanserai, monsoon wind sailing, and Swahili city-states',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh2-l1-q1',
            stem: 'How did the Mongol Empire\'s establishment of the "Pax Mongolica" revitalize Eurasian trade along the Silk Roads during the thirteenth and fourteenth centuries?',
            options: [
              'They unified Eurasia under a single administrative authority, protected merchants with passports (paiza), and established the yam postal relay system.',
              'They abolished all forms of paper currency and forced barter.',
              'They converted all Eurasian populations to Tibetan Buddhism.',
              'They banned maritime travel across the Indian Ocean.'
            ],
            correctIndex: 0,
            explanation: 'Pax Mongolica ("Mongol Peace") secured trans-continental overland caravan routes. Bandits were ruthlessly suppressed, merchants carried official passports, and rest stations (caravanserai) were maintained, enabling unprecedented cultural diffusion and commerce.',
            distractorTip: 'The downside of Pax Mongolica: it also accelerated the rapid transmission of the Black Death (bubonic plague).'
          },
          {
            id: 'wh2-l1-q2',
            stem: 'Maritime merchants trading across the Indian Ocean basin in the post-classical era relied fundamentally on knowledge of which natural meteorological phenomenon?',
            options: [
              'Seasonal monsoon wind cycles, which blew northeast in winter and southwest in summer.',
              'The Coriolis deflection of ocean tsunamis.',
              'El Niño Southern Oscillation droughts.',
              'The North Atlantic Gulf Stream.'
            ],
            correctIndex: 0,
            explanation: 'Indian Ocean maritime trade was governed by predictability: merchants timed their voyages with seasonal monsoon winds, spending months in diaspora merchant communities (like the Sultanate of Malacca or Swahili coast) while waiting for winds to shift.',
            distractorTip: 'Key Indian Ocean tech: Lateen sails (triangular sails catching wind on both sides), dhows, and the astrolabe.'
          },
          {
            id: 'wh2-l1-q3',
            stem: 'The fourteenth-century travels of Moroccan jurist Ibn Battuta across 73,000 miles of Africa, the Middle East, and Asia were made possible because:',
            options: [
              'He traveled throughout the "Dar al-Islam," where shared Islamic legal codes (Sharia) and Arabic literacy provided safe passage and employment as a judge (qadi).',
              'He traveled disguised as a Christian crusader.',
              'He was financed directly by the Pope in Rome.',
              'He sailed exclusively on Portuguese naval caravels.'
            ],
            correctIndex: 0,
            explanation: 'Ibn Battuta traveled almost entirely within the Islamic world (Dar al-Islam). As a trained Islamic legal scholar (qadi), he found immediate hospitality, employment, and common cultural norms everywhere from West Africa to Delhi and China.',
            distractorTip: 'Contrast Ibn Battuta (Muslim insider traveling Islamic world) with Marco Polo (European outsider observing Kublai Khan\'s China).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Land-Based Empires (1450–1750)',
    shortTitle: 'Unit 3: Gunpowder Empires',
    description: 'Ottoman, Safavid, Mughal, and Qing imperial consolidation, gunpowder weaponry, devshirme system, and religious legitimacy',
    examWeight: '12–15% of AP Exam',
    biome: {
      name: 'Gunpowder Bastion & Devshirme Barracks',
      icon: '🛡️',
      accentColor: '#EF4444',
      secondaryColor: '#B91C1C',
      groundGradient: 'from-red-100 via-rose-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-rose-50/30'
    },
    levels: [
      {
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'whap-u3-l1',
        topicNumber: 'Topic 3.1 & 3.3',
        name: 'Imperial Legitimacy & The Gunpowder Empires',
        subtitle: 'Devshirme Janissaries, Mughal tax farming, and monumental architecture',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh3-l1-q1',
            stem: 'How did the Ottoman Empire\'s devshirme system serve to consolidate imperial administrative power for the Sultan?',
            options: [
              'It recruited Christian boys from the Balkans, converted them to Islam, and rigorously trained them as elite soldiers (Janissaries) and loyal bureaucrats with zero hereditary ties to Turkish nobility.',
              'It redistributed land equally among all peasant farmers.',
              'It outsourced all tax collection to European joint-stock corporations.',
              'It forced all subjects to join the Ottoman navy.'
            ],
            correctIndex: 0,
            explanation: 'The devshirme created a slave-soldier and bureaucratic class loyal ONLY to the Sultan. Because they had no local family aristocracy, Janissaries prevented regional Turkish nobles from overthrowing the centralized throne.',
            distractorTip: 'Devshirme provided social mobility within the empire but was a coercive system of human tribute.'
          },
          {
            id: 'wh3-l1-q2',
            stem: 'How did rulers of early modern land-based empires—such as Louis XIV (Palace of Versailles) and Shah Jahan (Taj Mahal)—use monumental architecture?',
            options: [
              'To visually legitimize their absolute political authority, divine right, and imperial wealth to both domestic subjects and foreign rivals.',
              'To provide free public housing for low-income citizens.',
              'To store excess gunpowder safely outside urban centers.',
              'To serve exclusively as defensive fortifications against naval bombardments.'
            ],
            correctIndex: 0,
            explanation: 'Monumental architecture was an imperial tool of statecraft. Vast monumental structures (Versailles, Taj Mahal, Saint Petersburg, Blue Mosque) displayed unrivaled state power, technological mastery, and religious sanctity.',
            distractorTip: 'AP Theme: Rulers use monumental art and architecture to LEGITIMIZE rule.'
          },
          {
            id: 'wh3-l1-q3',
            stem: 'What was the theological and political dividing line that fueled centuries of violent military conflict between the Ottoman Empire and the neighboring Safavid Empire?',
            options: [
              'The Ottomans were Sunni Muslims, while the Safavids proclaimed Twelver Shi\'ism as their mandatory state religion.',
              'The Ottomans were Christian, while the Safavids were Zoroastrian.',
              'The Safavids refused to use gunpowder weaponry.',
              'The Ottomans supported the Protestant Reformation in Germany.'
            ],
            correctIndex: 0,
            explanation: 'The Ottoman-Safavid wars (such as the Battle of Chaldiran in 1514) were defined by bitter sectarian division between Ottoman Sunni orthodoxy and Safavid Shi\'a orthodoxy, solidifying modern sectarian borders between Turkey and Iran.',
            distractorTip: 'Ottoman = Sunni; Safavid (Persia) = Shi\'a. A core conflict tested on the AP exam.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Transoceanic Interconnections (1450–1750)',
    shortTitle: 'Unit 4: Maritime Expansion',
    description: 'Maritime exploration, Columbian Exchange, Atlantic slave trade (Middle Passage), mercantilism, and joint-stock companies (VOC)',
    examWeight: '12–15% of AP Exam',
    biome: {
      name: 'Caravel Anchorage & Galleon Trade Winds',
      icon: '⚓',
      accentColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      groundGradient: 'from-blue-100 via-sky-50 to-indigo-100',
      cardBorder: 'border-blue-500',
      trailColor: '#3b82f6',
      nodeRing: 'ring-blue-400/40',
      skyTint: 'from-blue-50 to-sky-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'whap-u4-l1',
        topicNumber: 'Topic 4.2 & 4.5',
        name: 'The Columbian Exchange & Mercantilist Empires',
        subtitle: 'Silver flows, chattel slavery, and joint-stock monopolies',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh4-l1-q1',
            stem: 'Silver extracted from Spanish American mines (especially Potosí in Bolivia) flowed across the Pacific via the Manila Galleons primarily to satisfy demand in which global economy?',
            options: [
              'Ming Dynasty China, which had reformed its imperial tax system to require all taxes be paid in silver coin.',
              'The Inca Empire to rebuild Cusco.',
              'The Russian Empire to purchase Siberian furs.',
              'Mughal India to purchase ivory.'
            ],
            correctIndex: 0,
            explanation: 'Under the Ming "Single Whip" tax reform, Chinese citizens were required to pay taxes in physical silver bullion. China absorbed roughly half of all New World silver, creating the first truly global currency network connecting the Americas, Europe, and Asia.',
            distractorTip: 'Silver was the bridge of the first global commercial economy.'
          },
          {
            id: 'wh4-l1-q2',
            stem: 'Why did European colonizers in the Americas transition from using indigenous coerced labor to importing enslaved Africans across the Middle Passage?',
            options: [
              'Indigenous populations were decimated by Old World diseases, while Africans had prior acquired immunities to Afro-Eurasian tropical pathogens and agricultural expertise.',
              'Africans voluntarily agreed to signed labor contracts.',
              'European monarchies outlawed all forms of plantation labor in 1550.',
              'Indentured servants from Europe refused to eat New World crops.'
            ],
            correctIndex: 0,
            explanation: 'The catastrophic mortality of Native Americans from European crowd diseases made indigenous labor unsustainable for grueling sugarcane production. Enslaved Africans possessed partial immunity to malaria and yellow fever, leading to the brutal transatlantic chattel slave trade.',
            distractorTip: 'Sugarcane plantations in Brazil and the Caribbean consumed over $85\\%$ of all enslaved Africans brought across the Atlantic.'
          },
          {
            id: 'wh4-l1-q3',
            stem: 'How did European chartered joint-stock companies (such as the Dutch VOC and British East India Company) differ from traditional private merchant guilds?',
            options: [
              'They operated with royal charters granting them state-backed monopolies, the authority to maintain private armies, wage wars, coin money, and establish sovereign colonies.',
              'They were non-profit religious missionary orders.',
              'They were completely owned and staffed by the royal family.',
              'They only traded within the Mediterranean Sea.'
            ],
            correctIndex: 0,
            explanation: 'Joint-stock companies pooled investor capital and spread financial risk while exercising quasi-governmental sovereign powers. The Dutch East India Company (VOC) conquered spice-producing territories in Indonesia with its own private mercenary navy.',
            distractorTip: 'Joint-stock companies were the precursors of modern multinational corporations and key agents of imperialism.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Revolutions (1750–1900)',
    shortTitle: 'Unit 5: Enlightenment & Revolutions',
    description: 'The Enlightenment (Locke, Rousseau), American, French, Haitian, and Latin American revolutions, and early nationalism',
    examWeight: '12–15% of AP Exam',
    biome: {
      name: 'Bastille Boulevard & Maroon Sanctuary',
      icon: '🔥',
      accentColor: '#EF4444',
      secondaryColor: '#DC2626',
      groundGradient: 'from-red-100 via-rose-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-rose-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'whap-u5-l1',
        topicNumber: 'Topic 5.1 & 5.2',
        name: 'The Enlightenment & Atlantic Revolutions',
        subtitle: 'Social contract, popular sovereignty, and Toussaint Louverture',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh5-l1-q1',
            stem: 'John Locke\'s political philosophy of the "social contract" argued that government derives its legitimate authority from:',
            options: [
              'The consent of the governed, with the obligation to protect citizens\' natural rights to life, liberty, and property.',
              'The divine right of kings ordained by the Catholic Pope.',
              'Military conquest and martial law.',
              'Hereditary ancestral lineage.'
            ],
            correctIndex: 0,
            explanation: 'Locke argued that humans enter into a social contract to establish government. If the state fails to protect natural rights (life, liberty, property), citizens possess the inherent moral right to overthrow or alter it.',
            distractorTip: 'Locke\'s ideas directly influenced Thomas Jefferson\'s Declaration of Independence and French Declaration of the Rights of Man.'
          },
          {
            id: 'wh5-l1-q2',
            stem: 'What made the Haitian Revolution (1791–1804), led by Toussaint Louverture, historically unique among all Atlantic revolutions?',
            options: [
              'It was the only successful enslaved rebellion in world history that abolished slavery and established an independent republic governed by formerly enslaved Black people.',
              'It was fought entirely without weapons through economic boycotts.',
              'It re-established the Spanish monarchy in the Caribbean.',
              'It was the first country to industrialize using steam engines.'
            ],
            correctIndex: 0,
            explanation: 'Haiti (Saint-Domingue) threw off French colonial rule. Enslaved Africans defeated French, British, and Spanish imperial armies to simultaneously abolish chattel slavery and create the world\'s first free Black republic in 1804.',
            distractorTip: 'Haitian Revolution terrified slaveholders across the American South and Caribbean.'
          },
          {
            id: 'wh5-l1-q3',
            stem: 'In his famous "Jamaica Letter" (1815), Venezuelan revolutionary Simón Bolívar argued that Latin American colonies should:',
            options: [
              'Unite into a constitutional republic free from Spanish mercantilist oppression, while acknowledging that class divisions required centralized authority.',
              'Remain loyal colonies under the Spanish Crown.',
              'Surrender all territory to the British Empire.',
              'Abolish all private commerce and return to pre-Columbian Aztec rule.'
            ],
            correctIndex: 0,
            explanation: 'Bolívar, a wealthy Creole ("El Libertador"), articulated Enlightenment critiques of Spanish tyranny and advocated for a unified Hispanic America (Gran Colombia), while expressing pragmatic skepticism of pure unguided democracy in diverse societies.',
            distractorTip: 'Creoles led Latin American independence to take power from Spanish-born Peninsulares.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Industrialization & Imperialism (1750–1900)',
    shortTitle: 'Unit 6: Imperialism & Industry',
    description: 'The Industrial Revolution, capitalist economics (Adam Smith), Marxist critique, Scramble for Africa (Berlin Conference), and Meiji Restoration',
    examWeight: '12–15% of AP Exam',
    biome: {
      name: 'Smokestack Ironworks & Imperial Outpost',
      icon: '🏭',
      accentColor: '#6B7280',
      secondaryColor: '#4B5563',
      groundGradient: 'from-gray-100 via-stone-50 to-slate-100',
      cardBorder: 'border-gray-500',
      trailColor: '#6b7280',
      nodeRing: 'ring-gray-400/40',
      skyTint: 'from-gray-50 to-stone-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'whap-u6-l1',
        topicNumber: 'Topic 6.1 & 6.4',
        name: 'The Scramble for Africa & Meiji Restoration',
        subtitle: 'Berlin Conference, Social Darwinism, and Japanese defensive modernization',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh6-l1-q1',
            stem: 'At the Berlin Conference of 1884–1885, European imperial powers partitioned the continent of Africa among themselves based on:',
            options: [
              'The principle of "effective occupation," drawing artificial borders that completely disregarded indigenous ethnic, cultural, and linguistic boundaries.',
              'Plebiscite votes held among African tribal elders.',
              'Pre-existing traditional African kingdom borders.',
              'Equal mathematical acreage distributed to all nations.'
            ],
            correctIndex: 0,
            explanation: 'Without a single African representative present, 14 European nations carved Africa into colonial territories. They drew arbitrary boundaries combining rival ethnic groups or splitting united cultures, laying the structural groundwork for post-colonial civil conflicts.',
            distractorTip: 'Only Ethiopia (which defeated Italy at the Battle of Adwa) and Liberia remained uncolonized.'
          },
          {
            id: 'wh6-l1-q2',
            stem: 'How did Japan respond to Western imperial incursions during the Meiji Restoration (1868)?',
            options: [
              'By dismantling the Tokugawa feudal shogunate and rapidly modernizing its military, industrial infrastructure, and education system to resist colonization.',
              'By sealing its borders and adopting a policy of absolute perpetual isolationism.',
              'By submitting voluntarily to British direct colonial rule.',
              'By abolishing the Emperor and converting to Christianity.'
            ],
            correctIndex: 0,
            explanation: 'Having witnessed China\'s humiliation in the Opium Wars, Japanese reformers embraced defensive modernization: "Enrich the country, strengthen the armed forces" (Fukoku Kyohei). Within decades, Japan industrialized and became an imperial power, defeating Russia in 1905.',
            distractorTip: 'Japan is the prime example of autonomous, rapid non-Western industrialization in the 19th century.'
          },
          {
            id: 'wh6-l1-q3',
            stem: 'How did European imperialists use the pseudoscientific ideology of "Social Darwinism" to justify the violent conquest and economic exploitation of Asian and African peoples?',
            options: [
              'They claimed Europeans were biologically and culturally superior, framing conquest as a philanthropic "civilizing mission" ("The White Man\'s Burden").',
              'They argued that all human cultures were equal and should live in socialist communes.',
              'They used it to argue that European industrial machines caused spiritual corruption.',
              'They argued that Europeans had a duty to submit to Asian dynasties.'
            ],
            correctIndex: 0,
            explanation: 'Social Darwinism distorted biological evolutionary concepts like "survival of the fittest" to rationalize imperial dominance, claiming that white European races had a natural right and racial duty to conquer and civilize "lesser" global populations.',
            distractorTip: 'Rudyard Kipling\'s poem "The White Man\'s Burden" epitomized this paternalistic imperialist justification.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Global Conflict (1900–Present)',
    shortTitle: 'Unit 7: World Wars',
    description: 'World War I (MAIN causes, total war), Russian Revolution (1917), the Great Depression, fascism, World War II, the Holocaust, and the atomic age',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Trench Line & Blitzkrieg Perimeter',
      icon: '💥',
      accentColor: '#EF4444',
      secondaryColor: '#B91C1C',
      groundGradient: 'from-red-100 via-rose-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-rose-50/30'
    },
    levels: [
      {
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'whap-u7-l1',
        topicNumber: 'Topic 7.1 & 7.7',
        name: 'Total War & Mass Atrocities',
        subtitle: 'Treaty of Versailles, propaganda home fronts, and the Holocaust',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh7-l1-q1',
            stem: 'Why is World War I classified by historians as the first modern "Total War"?',
            options: [
              'Governments mobilized entire national economies, civilian labor forces, media propaganda, and industrial infrastructure to wage total military warfare without distinction between civilian and military targets.',
              'It was fought exclusively between soldiers on isolated battlefields without civilian impact.',
              'Every nation on Earth signed the declaration of war on day one.',
              'It was fought without using any firearms or artillery.'
            ],
            correctIndex: 0,
            explanation: 'Total war involves the complete mobilization of resources and people: women entered factories, food was rationed, civil liberties were suppressed, media was censored, and entire civilian populations were targeted by naval blockades and aerial bombardment.',
            distractorTip: 'Total war means the entire society is mobilized for war.'
          },
          {
            id: 'wh7-l1-q2',
            stem: 'How did the punitive conditions imposed on Germany by the Treaty of Versailles (1919)—including the War Guilt Clause and massive financial reparations—contribute to World War II?',
            options: [
              'They destabilized the Weimar Republic with hyperinflation and deep national resentment, which Adolf Hitler and the Nazi Party exploited to seize totalitarian power.',
              'They forced Germany to immediately join the League of Nations as a nuclear superpower.',
              'They led Germany to permanently dismantle all industrial factories.',
              'They united Germany and Great Britain into a single commonwealth.'
            ],
            correctIndex: 0,
            explanation: 'The harsh Versailles terms stripped Germany of land, limited its army to 100,000, and imposed crushing economic reparations. The resulting economic ruin and feelings of humiliation fueled revanchist Nazi propaganda ("stab in the back" myth).',
            distractorTip: 'Versailles created a fragile peace that paved the way for WWII just 20 years later.'
          },
          {
            id: 'wh7-l1-q3',
            stem: 'What bureaucratic and industrial methods distinguished the Holocaust perpetrated by Nazi Germany from earlier historical massacres?',
            options: [
              'The systematic, state-sponsored, mechanized genocide using industrial rail networks, assembly-line gas chambers, and carbonized crematoria to exterminate six million Jewish people and millions of others.',
              'It was conducted purely through spontaneous street riots without government coordination.',
              'It was carried out solely by non-state paramilitary guerrillas in the jungle.',
              'It was limited strictly to prisoner-of-war military combatants.'
            ],
            correctIndex: 0,
            explanation: 'The Holocaust was unprecedented in its mechanized bureaucratic execution: Nazi state apparatus harnessed modern industrial logistics, train scheduling, civil bureaucracy, and chemical factories (Zyklon B) to systematically murder 6 million Jews and millions of Roma, disabled, and Soviet prisoners.',
            distractorTip: 'The 1948 UN Convention on Genocide was adopted directly in response to the Holocaust.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: Cold War & Decolonization (1900–Present)',
    shortTitle: 'Unit 8: Cold War & Independence',
    description: 'Cold War proxy wars (Korea, Vietnam, Cuba), nuclear arms race, Indian independence and partition, African decolonization, and the Non-Aligned Movement',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Proxy Line & Bandung Assembly',
      icon: '🕊️',
      accentColor: '#10B981',
      secondaryColor: '#059669',
      groundGradient: 'from-emerald-100 via-teal-50 to-green-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-teal-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'whap-u8-l1',
        topicNumber: 'Topic 8.2 & 8.6',
        name: 'Cold War Proxies & Decolonization',
        subtitle: 'Mutually Assured Destruction, Non-Aligned Movement, and Partition of India',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'wh8-l1-q1',
            stem: 'Why did the United States and the Soviet Union avoid direct, full-scale military warfare during the four decades of the Cold War?',
            options: [
              'The doctrine of Mutually Assured Destruction (MAD): both superpowers possessed massive thermonuclear arsenals capable of completely annihilating each other in a retaliatory second strike.',
              'They were bound by a formal permanent mutual defense treaty.',
              'Neither country possessed an army after 1945.',
              'The United Nations held an absolute legal veto over all military operations.'
            ],
            correctIndex: 0,
            explanation: 'Direct superpower war was deterred by MAD. Knowing any nuclear exchange would guarantee total mutual devastation, the US and USSR fought indirectly through economic competition, espionage, propaganda, and surrogate proxy wars (Korea, Vietnam, Afghanistan).',
            distractorTip: 'Superpowers fought PROXY wars to avoid direct nuclear conflict.'
          },
          {
            id: 'wh8-l1-q2',
            stem: 'What was the foundational objective of the Non-Aligned Movement (established at the 1955 Bandung Conference by leaders like Nehru, Nasser, and Tito)?',
            options: [
              'To allow newly independent developing nations in Asia, Africa, and Latin America to resist taking sides or becoming pawns in the Cold War rivalry between the US and USSR.',
              'To invade Europe and re-impose colonial rule.',
              'To establish a single unified global currency under Soviet control.',
              'To merge all member states into the British Empire.'
            ],
            correctIndex: 0,
            explanation: 'The Bandung Conference and Non-Aligned Movement united newly decolonized nations that refused to align with either the Western (NATO) or Eastern (Warsaw Pact) power blocs, seeking independent national sovereignty and mutual economic cooperation.',
            distractorTip: 'Non-Aligned = Neither US nor Soviet puppet.'
          },
          {
            id: 'wh8-l1-q3',
            stem: 'The hasty 1947 British withdrawal from South Asia resulted in the violent Partition of the Indian subcontinent into:',
            options: [
              'Hindu-majority India and Muslim-majority Pakistan, triggering the mass displacement of 15 million people and brutal sectarian communal violence.',
              'A unified communist republic modeled on Maoist China.',
              'Ten separate European protectorate territories.',
              'A single secular monarchy governed from Delhi.'
            ],
            correctIndex: 0,
            explanation: 'The British partition of colonial India into the independent Dominions of India and Pakistan (divided into West and East Pakistan, later Bangladesh) along religious lines led to catastrophic migration chaos, border riots, and between 500,000 to 2 million deaths.',
            distractorTip: 'Muhammad Ali Jinnah led the Muslim League demanding Pakistan; Mahatma Gandhi and Jawaharlal Nehru led the Indian National Congress.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 9,
    unitId: 'u9',
    title: 'Unit 9: Globalization (1900–Present)',
    shortTitle: 'Unit 9: Globalization',
    description: 'Technological advances, Green Revolution, global health and pandemics, environmental challenges (climate change), and international economic institutions (WTO, UN)',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Global Satellite Array & Digital Agora',
      icon: '🌐',
      accentColor: '#0EA5E9',
      secondaryColor: '#0284C7',
      groundGradient: 'from-cyan-100 via-sky-50 to-blue-100',
      cardBorder: 'border-cyan-500',
      trailColor: '#0ea5e9',
      nodeRing: 'ring-cyan-400/40',
      skyTint: 'from-cyan-50 to-sky-50/30'
    },
    levels: [
      {
        id: 901,
        unitIndex: 9,
        levelNumber: 1,
        uniqueKey: 'whap-u9-l1',
        topicNumber: 'Topic 9.1 & 9.4',
        name: 'The Green Revolution & Global Institutions',
        subtitle: 'High-yield hybrid crops, multinational corporations, and international human rights',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'wh9-l1-q1',
            stem: 'The mid-twentieth-century "Green Revolution" led by agricultural scientist Norman Borlaug averted catastrophic famine in developing nations primarily through:',
            options: [
              'Developing high-yielding, pest-resistant hybrid varieties of wheat and rice coupled with chemical fertilizers, synthetic pesticides, and mechanization.',
              'Banning all industrial tractors in favor of manual labor.',
              'Converting all agricultural land into residential suburbs.',
              'Stopping international trade in foodstuffs.'
            ],
            correctIndex: 0,
            explanation: 'The Green Revolution applied scientific breeding to develop dwarf, high-yielding crop varieties (wheat, rice) in Mexico, India, and the Philippines, multiplying agricultural yields per acre and saving an estimated one billion people from starvation.',
            distractorTip: 'Critiques of the Green Revolution: high chemical runoff, soil depletion, and increased debt for smallholder farmers.'
          },
          {
            id: 'wh9-l1-q2',
            stem: 'Which international economic institutions established in the aftermath of World War II promoted global free trade, monetary stability, and economic liberalization?',
            options: [
              'The International Monetary Fund (IMF), World Bank, and World Trade Organization (WTO)',
              'The Warsaw Pact and COMECON',
              'The Holy Roman Empire and League of Nations',
              'OPEC and NAFTA only'
            ],
            correctIndex: 0,
            explanation: 'The Bretton Woods institutions (IMF and World Bank) along with the GATT (later WTO) were designed to rebuild war-torn economies, prevent protectionist currency wars, and foster global economic interdependence through open markets.',
            distractorTip: 'These institutions are often criticized by developing nations for enforcing structural adjustment austerity policies.'
          },
          {
            id: 'wh9-l1-q3',
            stem: 'Adopted by the United Nations General Assembly in 1948, the Universal Declaration of Human Rights established that:',
            options: [
              'All human beings are born free and equal in dignity and rights, articulating fundamental civil, political, economic, and social rights regardless of nationality or race.',
              'Only citizens of the five permanent UN Security Council members possess human rights.',
              'National sovereignty gives governments the absolute right to persecute minority groups without foreign interference.',
              'Human rights are only valid in capitalist democracies.'
            ],
            correctIndex: 0,
            explanation: 'Chaired by Eleanor Roosevelt, the Universal Declaration of Human Rights (UDHR) asserted that basic rights (life, liberty, freedom from torture/slavery, free expression) are universal, indivisible, and apply inherently to every human being on the planet.',
            distractorTip: 'The UDHR established the global benchmark for international human rights law.'
          }
        ]
      }
    ]
  }
];
