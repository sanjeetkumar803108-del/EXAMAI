// AP U.S. History (APUSH) Units Data
// Comprehensive College Board CED aligned curriculum (Periods 1–9)
// Authentic primary source context, historiography, legislative milestones, constitutional debates, and socioeconomic transformations.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_USH_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'p1',
    title: 'Period 1: 1491–1607',
    shortTitle: 'Period 1: Early Contact',
    description: 'Pre-Columbian Native American societies, European exploration, the Columbian Exchange, and the Spanish encomienda system',
    examWeight: '4–6% of AP Exam',
    biome: {
      name: 'Mesoamerican Mesa & Galleon Shoals',
      icon: '⛵',
      accentColor: '#EF4444',
      secondaryColor: '#B91C1C',
      groundGradient: 'from-amber-100 via-orange-50 to-red-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'ush-p1-l1',
        topicNumber: 'Period 1.1 & 1.2',
        name: 'The Columbian Exchange & Encomienda',
        subtitle: 'Biological exchanges, coerced labor, and demographic collapse',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'us1-l1-q1',
            stem: 'Which crop introduced from the Americas to Afro-Eurasia via the Columbian Exchange triggered explosive population growth and urbanization across Europe?',
            options: [
              'Corn (maize) and potatoes',
              'Wheat and barley',
              'Sugarcane and coffee',
              'Rice and indigo'
            ],
            correctIndex: 0,
            explanation: 'Calorie-dense New World staple crops—primarily maize and potatoes—dramatically increased nutritional yields per acre in Europe, sparking sustained demographic expansion and fueling the shift from feudalism to commercial capitalism.',
            distractorTip: 'Wheat, horses, and smallpox went from the Old World TO the Americas; corn, potatoes, tomatoes, and tobacco went from the Americas TO Europe.'
          },
          {
            id: 'us1-l1-q2',
            stem: 'What was the foundational structure of the Spanish colonial encomienda system in the sixteenth century?',
            options: [
              'The Spanish Crown granted conquistadors rights to indigenous labor and tribute in exchange for converting them to Catholicism.',
              'A communal land-sharing agreement between Spanish settlers and Pueblo leaders.',
              'An import duty system on enslaved African labor.',
              'A joint-stock venture funded by private British merchants.'
            ],
            correctIndex: 0,
            explanation: 'Under the encomienda system, Spanish colonists were granted authority over indigenous communities to extract forced labor in silver mines (such as Potosí) and sugar plantations under the legal pretense of religious Christianization.',
            distractorTip: 'Dominican friar Bartolomé de las Casas famously denounced the cruelty of the encomienda system, leading to the New Laws of 1542.'
          },
          {
            id: 'us1-l1-q3',
            stem: 'What was the primary cause of the catastrophic $80\\text{--}90\\%$ population collapse of indigenous Native Americans within a century of European arrival?',
            options: [
              'Lack of acquired immunological resistance to Old World epidemic pathogens such as smallpox, measles, and influenza.',
              'Mass starvation caused by locust plagues.',
              'Military battles fought exclusively with muskets.',
              'Forced migration to South America.'
            ],
            correctIndex: 0,
            explanation: 'Millennia of geographic isolation meant Indigenous Americans had zero inherited immunity to European crowd pathogens (smallpox, typhus, measles). Virgin-soil epidemics devastated populations far ahead of actual military conquest.',
            distractorTip: 'Disease was the decisive factor, far outstripping musket and steel casualties.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'p2',
    title: 'Period 2: 1607–1754',
    shortTitle: 'Period 2: Colonial Era',
    description: 'Chesapeake tobacco, New England Puritanism, Middle Colonies diversity, mercantilism, Bacon\'s Rebellion, and the First Great Awakening',
    examWeight: '6–8% of AP Exam',
    biome: {
      name: 'Plymouth Timber & Chesapeake Tidewater',
      icon: '🏛️',
      accentColor: '#D97706',
      secondaryColor: '#B45309',
      groundGradient: 'from-amber-100 via-stone-50 to-orange-100',
      cardBorder: 'border-amber-500',
      trailColor: '#d97706',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-stone-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'ush-p2-l1',
        topicNumber: 'Period 2.1 & 2.4',
        name: 'Colonial Labor & Bacon\'s Rebellion',
        subtitle: 'Indentured servitude, tobacco capitalism, and the shift to chattel slavery',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'us2-l1-q1',
            stem: 'What major historical turning point accelerated the transition from white indentured servitude to racialized chattel African slavery in the Virginia colony?',
            options: [
              'Bacon\'s Rebellion (1676), which united poor white and Black former indentured servants against the planter elite.',
              'The signing of the Mayflower Compact in 1620.',
              'The Stono Rebellion of 1739 in South Carolina.',
              'The enforcement of the Navigation Acts in 1651.'
            ],
            correctIndex: 0,
            explanation: 'Nathaniel Bacon led a rebellion of disenfranchised frontier indentured servants and poor laborers against Governor Berkeley. Terrified by the alliance of landless poor whites and Blacks, Virginia\'s gentry transitioned to permanent, hereditary African chattel slavery to divide the laboring classes by race.',
            distractorTip: 'Bacon\'s Rebellion (1676) = The catalyst for the institutional codification of racial chattel slavery in Virginia.'
          },
          {
            id: 'us2-l1-q2',
            stem: 'How did the Puritan settlement of the Massachusetts Bay Colony under John Winthrop differ fundamentally from the Jamestown settlement in Virginia?',
            options: [
              'Massachusetts Bay was settled by cohesive family units seeking religious covenant ("City upon a Hill"), whereas Jamestown was initially settled by single men seeking mineral wealth.',
              'Jamestown was founded on strict egalitarian democracy, while Massachusetts was an absolute monarchy.',
              'Massachusetts Bay depended exclusively on cash-crop tobacco exports.',
              'Jamestown settlers formed immediate peaceful treaties with all neighboring tribes.'
            ],
            correctIndex: 0,
            explanation: 'Winthrop\'s Puritans migrated as intact family units with balanced sex ratios, establishing tightly-knit religious towns centered on congregational churches and subsistence agriculture, unlike the profit-driven single men of early Jamestown.',
            distractorTip: 'Winthrop\'s "City upon a Hill" sermon established American exceptionalism rooted in moral/religious community.'
          },
          {
            id: 'us2-l1-q3',
            stem: 'The First Great Awakening of the 1730s and 1740s, led by ministers like Jonathan Edwards and George Whitefield, impacted colonial society by:',
            options: [
              'Promoting emotional, personal evangelical faith that democratized religious authority across all 13 colonies.',
              'Unifying all colonists under the Church of England.',
              'Outlawing slavery throughout New England.',
              'Establishing the first secular public universities.'
            ],
            correctIndex: 0,
            explanation: 'The Great Awakening introduced charismatic itinerant preaching that emphasized personal conversion over dry doctrine. It broke denominational monopolies ("New Lights" vs "Old Lights") and was the first shared trans-colonial cultural experience.',
            distractorTip: 'Jonathan Edwards\' famous sermon: "Sinners in the Hands of an Angry God".'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'p3',
    title: 'Period 3: 1754–1800',
    shortTitle: 'Period 3: Revolution & Constitution',
    description: 'Seven Years’ War aftermath, end of salutary neglect, Declaration of Independence, Articles of Confederation, Constitutional Convention, and Washington’s Presidency',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Independence Hall & Frontier Redoubts',
      icon: '📜',
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
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'ush-p3-l1',
        topicNumber: 'Period 3.1 & 3.8',
        name: 'The Road to Revolution & The Constitution',
        subtitle: 'Stamp Act, Common Sense, Shays\' Rebellion, and the Great Compromise',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'us3-l1-q1',
            stem: 'Why did the British victory in the French and Indian War (Seven Years\' War) in 1763 directly spark colonial resistance leading to the American Revolution?',
            options: [
              'Britain incurred massive war debt, prompting Parliament to abandon salutary neglect and impose direct internal taxes on the colonies without representation.',
              'France forced Britain to cede all North American territory to Native tribes.',
              'Colonial merchants were forced to enlist in the Royal Navy.',
              'Parliament abolished all colonial town assemblies in 1763.'
            ],
            correctIndex: 0,
            explanation: 'Britain\'s national debt doubled fighting the war. Believing American colonists should pay for their defense, Parliament enacted the Proclamation of 1763 and taxes (Sugar Act, Stamp Act), ending the century-old policy of "salutary neglect."',
            distractorTip: '1763 is the ultimate APUSH watershed year: End of French and Indian War + End of Salutary Neglect + Proclamation of 1763.'
          },
          {
            id: 'us3-l1-q2',
            stem: 'What major historical event highlighted the fatal weaknesses of the Articles of Confederation and convinced political elites like George Washington and Alexander Hamilton to convene the Philadelphia Convention of 1787?',
            options: [
              'Shays\' Rebellion in western Massachusetts',
              'The Boston Tea Party',
              'The Whiskey Rebellion',
              'The Hartford Convention'
            ],
            correctIndex: 0,
            explanation: 'Shays\' Rebellion (1786) by indebted Revolutionary War veterans unable to pay land taxes revealed that the Confederation Congress lacked the authority to levy taxes, raise a standing national army, or enforce laws.',
            distractorTip: 'Shays\' Rebellion proved the Articles were too weak; the Whiskey Rebellion (1794) proved the new Constitution was strong enough to enforce laws.'
          },
          {
            id: 'us3-l1-q3',
            stem: 'In his 1796 Farewell Address, President George Washington explicitly warned the young American republic against which two political hazards?',
            options: [
              'Entangling permanent foreign military alliances and bitter domestic political factions (partisan parties).',
              'Federal taxation and paper currency.',
              'Territorial expansion past the Mississippi River.',
              'The establishment of a national judicial court system.'
            ],
            correctIndex: 0,
            explanation: 'Washington urged neutrality in European wars (avoiding permanent alliances) and warned that divisive political parties would foster hyper-partisanship and enable demagogues to seize power.',
            distractorTip: 'Washington\'s warnings formed the bedrock of American isolationist foreign policy until World War II.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'p4',
    title: 'Period 4: 1800–1848',
    shortTitle: 'Period 4: Market Revolution',
    description: 'Jeffersonian democracy, Marbury v. Madison, Market Revolution, Jacksonian Democracy, Indian Removal, Second Great Awakening, and early women’s rights',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Canal Locks & Cotton Gin Mills',
      icon: '🏭',
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
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'ush-p4-l1',
        topicNumber: 'Period 4.2 & 4.8',
        name: 'The Market Revolution & Jacksonian Politics',
        subtitle: 'Erie Canal, Lowell textile mills, Nullification, and Seneca Falls',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'us4-l1-q1',
            stem: 'The landmark Supreme Court decision in Marbury v. Madison (1803), written by Chief Justice John Marshall, established which cornerstone principle of American constitutional law?',
            options: [
              'Judicial review: the Supreme Court holds the final authority to declare federal statutes unconstitutional.',
              'States have the constitutional right to nullify federal laws.',
              'Congress has no power to establish a National Bank.',
              'The President cannot negotiate international treaties without prior Senate approval.'
            ],
            correctIndex: 0,
            explanation: 'Marshall declared Section 13 of the Judiciary Act of 1789 unconstitutional, establishing the Supreme Court\'s power of judicial review over executive and legislative actions.',
            distractorTip: 'Marshall Court consistently expanded federal power over state claims (McCulloch v. Maryland, Gibbons v. Ogden).'
          },
          {
            id: 'us4-l1-q2',
            stem: 'How did the Market Revolution of the early 19th century (steamboats, canals, cotton gin, textile factories) alter the socioeconomic role of Northern middle-class women?',
            options: [
              'It fostered the "Cult of Domesticity," which separated the home as a private moral sphere from the public commercial marketplace.',
              'It granted women the immediate right to vote in municipal elections.',
              'It eliminated all domestic servitude in Northern cities.',
              'It made female political candidacy standard across New England.'
            ],
            correctIndex: 0,
            explanation: 'The shift of work outside the home into factories created the Cult of Domesticity, an ideology prescribing that middle-class women cultivate piety, purity, and moral virtue within the private domestic haven.',
            distractorTip: 'Working-class women worked in Lowell mills, while middle-class women were idealized within the Cult of Domesticity.'
          },
          {
            id: 'us4-l1-q3',
            stem: 'The Declaration of Sentiments adopted at the Seneca Falls Convention (1848), organized by Elizabeth Cady Stanton and Lucretia Mott, modeled its text directly upon:',
            options: [
              'The Declaration of Independence, asserting that "all men and women are created equal."',
              'The United States Constitution\'s Bill of Rights.',
              'The Monroe Doctrine.',
              'The Northwest Ordinance of 1787.'
            ],
            correctIndex: 0,
            explanation: 'The Declaration of Sentiments mirrored Jefferson\'s Declaration of Independence line-by-line, indicting mankind for a history of repeated injuries against women and demanding universal women\'s suffrage.',
            distractorTip: 'Seneca Falls (1848) marks the formal birth of the American Women\'s Rights Movement.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'p5',
    title: 'Period 5: 1844–1877',
    shortTitle: 'Period 5: Civil War & Reconstruction',
    description: 'Manifest Destiny, Mexican-American War, Sectional Crisis, Dred Scott decision, Civil War strategies, Emancipation Proclamation, and 13th/14th/15th Amendments',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Antietam Ridge & Reconstruction Capitol',
      icon: '⚔️',
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
        uniqueKey: 'ush-p5-l1',
        topicNumber: 'Period 5.2 & 5.10',
        name: 'The Sectional Crisis & Reconstruction Amendments',
        subtitle: 'Dred Scott, Lincoln\'s wartime aims, and the 13th, 14th, and 15th Amendments',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'us5-l1-q1',
            stem: 'In the notorious Dred Scott v. Sandford (1857) ruling, Chief Justice Roger Taney ruled that:',
            options: [
              'Enslaved and free African Americans were not U.S. citizens, and Congress possessed no power to ban slavery in federal territories.',
              'Popular sovereignty was the only legal method to determine slavery in the territories.',
              'Dred Scott was emancipated immediately upon setting foot on free soil.',
              'The Fugitive Slave Act violated state sovereignty.'
            ],
            correctIndex: 0,
            explanation: 'Taney ruled that Black Americans were not citizens with legal standing to sue, and declared the Missouri Compromise unconstitutional under the 5th Amendment, decreeing that Congress could not deprive slaveholders of their human "property" anywhere in U.S. territories.',
            distractorTip: 'Taney\'s ruling effectively legalized slavery in all federal territories, outraging the Republican Party.'
          },
          {
            id: 'us5-l1-q2',
            stem: 'President Abraham Lincoln issued the Emancipation Proclamation on January 1, 1863, which officially liberated:',
            options: [
              'Only enslaved persons in states actively in military rebellion against the Union, leaving border state slavery intact.',
              'All enslaved persons throughout all 34 American states immediately.',
              'Only enslaved persons in the Union border states (Maryland, Kentucky, Missouri, Delaware).',
              'Enslaved people who paid a personal freedom tax to the War Department.'
            ],
            correctIndex: 0,
            explanation: 'Lincoln exercised war powers as Commander-in-Chief. To avoid driving critical Union border slave states (MD, KY, MO, DE) into the Confederacy, the proclamation applied solely to areas in active rebellion, transforming the war into a moral crusade against slavery and enabling Black enlistment in Union forces.',
            distractorTip: 'The 13th Amendment (1865)—NOT the Emancipation Proclamation—formally and permanently abolished slavery everywhere in the United States.'
          },
          {
            id: 'us5-l1-q3',
            stem: 'Which Reconstruction constitutional amendment guaranteed birthright citizenship and prohibited states from denying any person "equal protection of the laws" or "due process of law"?',
            options: [
              'The 14th Amendment',
              'The 13th Amendment',
              'The 15th Amendment',
              'The 16th Amendment'
            ],
            correctIndex: 0,
            explanation: 'The 14th Amendment (1868) granted birthright citizenship (nullifying Dred Scott) and established the Due Process and Equal Protection Clauses, forming the legal bedrock of subsequent civil rights jurisprudence.',
            distractorTip: 'Memory tool: Free (13th - abolished slavery), Citizens (14th - citizenship & equal protection), Vote (15th - voting rights for Black men).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'p6',
    title: 'Period 6: 1865–1898',
    shortTitle: 'Period 6: The Gilded Age',
    description: 'Second Industrial Revolution, Robber Barons vs Captains of Industry, labor unions, urbanization, immigration, Dawes Act, and Populist movement',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Smokestack Metropolis & Homestead Prairie',
      icon: '🚂',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-stone-50 to-yellow-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-stone-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'ush-p6-l1',
        topicNumber: 'Period 6.1 & 6.8',
        name: 'Industrial Capitalism & Populist Agrarian Revolt',
        subtitle: 'Social Darwinism, AFL bread-and-butter unionism, and the Omaha Platform',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'us6-l1-q1',
            stem: 'Andrew Carnegie\'s 1889 essay "The Gospel of Wealth" argued that wealthy industrialists had a moral responsibility to:',
            options: [
              'Distribute their surplus wealth as philanthropic trustees for public libraries, universities, and cultural institutions during their lifetime.',
              'Bequeath all their fortune directly to their immediate heirs.',
              'Distribute cash handouts to all striking factory workers.',
              'Pay federal corporate income tax rates above $50\\%$.'
            ],
            correctIndex: 0,
            explanation: 'Carnegie condemned dying rich, arguing the self-made titan should administer surplus riches for public cultural advancement (libraries, concert halls), while opposing direct charity as unearned handouts.',
            distractorTip: 'Carnegie practiced what he preached, funding over 2,500 public libraries worldwide.'
          },
          {
            id: 'us6-l1-q2',
            stem: 'Unlike the radical Knights of Labor, Samuel Gompers\' American Federation of Labor (AFL) achieved lasting institutional success by focusing strictly on:',
            options: [
              'Pragmatic "bread-and-butter" union goals (higher wages, 8-hour workday, safer conditions) for skilled craft workers.',
              'Overthrowing the capitalist wage system and forming a socialist labor party.',
              'Unionizing unskilled agricultural and domestic migrant workers.',
              'Banning all industrial strikes in favor of political lobbying.'
            ],
            correctIndex: 0,
            explanation: 'Gompers rejected broad social engineering and radical politics. The AFL organized only skilled craft workers into trade-specific unions, leveraging their irreplaceable skills in collective bargaining for "bread-and-butter" gains.',
            distractorTip: 'AFL = Skilled workers, bread-and-butter issues; Knights of Labor / IWW = All workers, broad utopian/radical reform.'
          },
          {
            id: 'us6-l1-q3',
            stem: 'The Omaha Platform (1892) of the Populist (People\'s) Party demanded which key economic policy to relieve debt-ridden western and southern farmers?',
            options: [
              'Free and unlimited coinage of silver at 16:1 ratio to cause inflation and expand the money supply.',
              'A strict gold standard with tight credit limits.',
              'High protective industrial tariffs on European steel.',
              'Deregulation of all private railroad monopolies.'
            ],
            correctIndex: 0,
            explanation: 'Farmers were squeezed by falling crop prices and deflation under the gold standard. Free silver ("bimetallism") would increase circulating currency, inducing mild inflation that made fixed mortgage debts easier to repay with inflated agricultural receipts.',
            distractorTip: 'William Jennings Bryan\'s impassioned "Cross of Gold" speech at the 1896 DNC championed this exact cause.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'p7',
    title: 'Period 7: 1890–1945',
    shortTitle: 'Period 7: Modern Crises & World Wars',
    description: 'Progressivism, Spanish-American War and Imperialism, WWI mobilization, Harlem Renaissance, Great Depression, New Deal, and WWII total warfare',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Roaring Boulevard & Normandy Beachhead',
      icon: '🎖️',
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
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'ush-p7-l1',
        topicNumber: 'Period 7.4 & 7.10',
        name: 'The Progressive Era & FDR\'s New Deal',
        subtitle: 'Muckrakers, Social Security, FDIC, and the New Deal Coalition',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'us7-l1-q1',
            stem: 'Upton Sinclair\'s muckraking novel The Jungle (1906) horrified the American public and directly pressured President Theodore Roosevelt into passing which landmark legislation?',
            options: [
              'The Meat Inspection Act and Pure Food and Drug Act',
              'The Sherman Antitrust Act',
              'The Federal Reserve Act',
              'The Clayton Antitrust Act'
            ],
            correctIndex: 0,
            explanation: 'Sinclair\'s vivid exposés of unsanitary Chicago meatpacking plants revolted readers and spurred TR to sign the Meat Inspection Act and the Pure Food and Drug Act in 1906, establishing federal food purity oversight.',
            distractorTip: 'Sinclair famously remarked: "I aimed at the public\'s heart, and by accident I hit it in the stomach."'
          },
          {
            id: 'us7-l1-q2',
            stem: 'President Franklin D. Roosevelt\'s First Hundred Days in 1933 tackled the banking collapse immediately through which decisive action?',
            options: [
              'Declaring a nationwide four-day Bank Holiday and passing the Emergency Banking Act and FDIC insurance.',
              'Nationalizing all private Wall Street commercial banks permanently.',
              'Ordering all citizens to redeem paper currency for physical gold.',
              'Abolishing the Federal Reserve System.'
            ],
            correctIndex: 0,
            explanation: 'FDR declared an emergency Bank Holiday, sent federal auditors to inspect solvent banks, passed the Glass-Steagall Act creating the FDIC to insure deposits, and held a Fireside Chat assuring Americans their money was safer in reopened banks than under mattresses.',
            distractorTip: 'The 3 Rs of FDR\'s New Deal: Relief (immediate aid), Recovery (economic revival), Reform (preventing future depressions).'
          },
          {
            id: 'us7-l1-q3',
            stem: 'Executive Order 9066, signed by President Roosevelt in February 1942, resulted in which controversial home front action during World War II?',
            options: [
              'The forced internment of over $120{,}000$ Japanese Americans from the West Coast into remote inland detention camps without due process.',
              'The immediate desegregation of all military branches.',
              'The prohibition of women working in defense munitions factories.',
              'The complete censorship of all domestic radio broadcasts.'
            ],
            correctIndex: 0,
            explanation: 'Fueled by wartime hysteria and anti-Asian racism following Pearl Harbor, FDR authorized the military to forcibly relocate and incarcerate Japanese Americans (two-thirds of whom were U.S. citizens). In Korematsu v. U.S. (1944), the Supreme Court upheld the internment as a wartime necessity.',
            distractorTip: 'In 1988, the Civil Liberties Act formally apologized and granted reparations to surviving internees.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'p8',
    title: 'Period 8: 1945–1980',
    shortTitle: 'Period 8: Cold War & Civil Rights',
    description: 'Cold War containment (Truman Doctrine, Korean War, Cuban Missile Crisis), Civil Rights Movement (Brown v. Board, MLK), Vietnam War, Great Society, and Watergate',
    examWeight: '10–17% of AP Exam',
    biome: {
      name: 'Containment Line & Montgomery March',
      icon: '🚀',
      accentColor: '#6366F1',
      secondaryColor: '#4F46E5',
      groundGradient: 'from-indigo-100 via-blue-50 to-purple-100',
      cardBorder: 'border-indigo-500',
      trailColor: '#6366f1',
      nodeRing: 'ring-indigo-400/40',
      skyTint: 'from-indigo-50 to-purple-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'ush-p8-l1',
        topicNumber: 'Period 8.2 & 8.10',
        name: 'The Cold War & The Civil Rights Revolution',
        subtitle: 'George Kennan containment, Brown v. Board, Civil Rights Act of 1964, and Gulf of Tonkin',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'us8-l1-q1',
            stem: 'Diplomat George F. Kennan\'s famous "Long Telegram" (1946) established which fundamental doctrine that guided U.S. foreign policy throughout the Cold War?',
            options: [
              'Containment: resisting Soviet territorial and ideological expansion through steady diplomatic, economic, and military pressure.',
              'Rollback: invading the Soviet Union to forcefully liberate Eastern Europe.',
              'Isolationism: withdrawing all American forces from Europe and Asia.',
              'Mutual Assured Disarmament: unilaterally dismantling the U.S. nuclear arsenal.'
            ],
            correctIndex: 0,
            explanation: 'Kennan argued that Soviet ideology was inherently expansive yet cautious. Containment posited that if the West held the perimeter against Communist expansion, Soviet internal contradictions would eventually cause its collapse.',
            distractorTip: 'Containment manifested in the Truman Doctrine, the Marshall Plan, and NATO.'
          },
          {
            id: 'us8-l1-q2',
            stem: 'In the unanimous landmark ruling Brown v. Board of Education of Topeka (1954), Chief Justice Earl Warren struck down the doctrine of:',
            options: [
              '"Separate but equal" established by Plessy v. Ferguson (1896), declaring racial segregation in public schools inherently unequal.',
              'Affirmative action in state universities.',
              'Poll taxes and literacy tests for voter registration.',
              'De facto residential neighborhood segregation.'
            ],
            correctIndex: 0,
            explanation: 'Warren concluded that separating school children solely on the basis of race generates feelings of inferiority that cannot be undone, ruling state-sanctioned de jure segregation a direct violation of the 14th Amendment\'s Equal Protection Clause.',
            distractorTip: 'Brown v. Board catalyzed the modern Civil Rights Movement.'
          },
          {
            id: 'us8-l1-q3',
            stem: 'The Civil Rights Act of 1964, signed into law by President Lyndon B. Johnson, legally abolished:',
            options: [
              'Segregation in all public accommodations (hotels, restaurants) and employment discrimination based on race, color, religion, sex, or national origin.',
              'All state death penalty statutes.',
              'Draft registration for the Vietnam War.',
              'The Electoral College in presidential elections.'
            ],
            correctIndex: 0,
            explanation: 'Title II of the Civil Rights Act of 1964 outlawed racial discrimination in public accommodations, while Title VII prohibited workplace discrimination, enforced by the Equal Employment Opportunity Commission (EEOC).',
            distractorTip: 'The Voting Rights Act of 1965 followed the next year, banning literacy tests and sending federal registrars to the South.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 9,
    unitId: 'p9',
    title: 'Period 9: 1980–Present',
    shortTitle: 'Period 9: Modern Era',
    description: 'Reagan Revolution, supply-side economics, fall of the Berlin Wall, Gulf War, post-9/11 War on Terror, digital age, and contemporary polarization',
    examWeight: '4–6% of AP Exam',
    biome: {
      name: 'Silicon Corridor & Globalized Horizon',
      icon: '🌐',
      accentColor: '#10B981',
      secondaryColor: '#059669',
      groundGradient: 'from-emerald-100 via-teal-50 to-cyan-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-cyan-50/30'
    },
    levels: [
      {
        id: 901,
        unitIndex: 9,
        levelNumber: 1,
        uniqueKey: 'ush-p9-l1',
        topicNumber: 'Period 9.2 & 9.5',
        name: 'The Reagan Revolution & The Post-9/11 World',
        subtitle: 'Supply-side economics, Cold War victory, Patriot Act, and globalization',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'us9-l1-q1',
            stem: 'President Ronald Reagan\'s economic program ("Reaganomics" or supply-side economics) was predicated on which core domestic policy pillars?',
            options: [
              'Substantial marginal tax cuts for corporations and high earners, deregulation of industries, and reductions in federal domestic spending alongside massive defense spending increases.',
              'Tripling corporate income taxes and nationalizing energy utilities.',
              'Re-imposing strict price controls on petroleum and agriculture.',
              'Balancing the federal budget by slashing all military spending.'
            ],
            correctIndex: 0,
            explanation: 'Supply-side economics argued that cutting taxes and slashing regulations would stimulate private capital investment, increasing productivity and economic growth. However, soaring military outlays combined with tax cuts led to record peacetime national debt.',
            distractorTip: 'Supply-side targets the PRODUCER/SUPPLIER (cut taxes to invest), contrasting with Keynesian economics which stimulates CONSUMER DEMAND.'
          },
          {
            id: 'us9-l1-q2',
            stem: 'Following the terrorist attacks of September 11, 2001, the enactment of the USA PATRIOT Act ignited intense constitutional debates regarding:',
            options: [
              'The balance between national security surveillance powers and Fourth Amendment protections against unreasonable searches without specific warrants.',
              'The right of the federal government to print sovereign paper currency.',
              'The establishment of a state religion.',
              'The legality of the North American Free Trade Agreement (NAFTA).'
            ],
            correctIndex: 0,
            explanation: 'The Patriot Act expanded federal law enforcement authority to conduct wiretaps, monitor electronic records, and detain suspected foreign terrorists without warrants (roving wiretaps, national security letters), raising severe 4th Amendment privacy concerns.',
            distractorTip: 'Post-9/11 domestic debate: Liberty vs Security.'
          },
          {
            id: 'us9-l1-q3',
            stem: 'What international event in 1991 formally marked the conclusion of the Cold War between the United States and the Eastern Bloc?',
            options: [
              'The dissolution of the Soviet Union into 15 independent republics following Mikhail Gorbachev\'s resignation.',
              'The signing of the Camp David Accords.',
              'The withdrawal of American troops from Saigon.',
              'The reunification of North and South Korea.'
            ],
            correctIndex: 0,
            explanation: 'On December 25, 1991, following economic stagnation, Chernobyl, the Afghan war, and reforms (Glasnost and Perestroika), the Soviet flag was lowered over the Kremlin as the USSR disintegrated into independent nations, ending the four-decade Cold War.',
            distractorTip: 'The Berlin Wall fell in November 1989; the Soviet Union officially collapsed in December 1991.'
          }
        ]
      }
    ]
  }
];
