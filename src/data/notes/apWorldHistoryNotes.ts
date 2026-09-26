import { APUnitNote } from './types';

export const AP_WORLD_HISTORY_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: THE GLOBAL TAPESTRY (1200–1450)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'The Global Tapestry (1200–1450)',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'States in Afro-Eurasia and the Americas consolidated administrative power through bureaucratic institutions, religious legitimization, and agricultural innovation.',
    keyTheorems: [
      {
        name: 'State Building Mechanisms Across Post-Classical Civilizations',
        conditions: 'Consolidating imperial rule across diverse imperial territories (1200–1450).',
        conclusion: 'Major empires utilized distinct state-building pillars: (1) Song China: Bureaucratic meritocracy via Civil Service Exam grounded in Neo-Confucianism; (2) Dar al-Islam (Abbasid Caliphate): Islamic Sharia law, House of Wisdom in Baghdad, and intellectual syncretism; (3) South/Southeast Asia (Vijayanagara, Khmer): Hinduism and Buddhism legitimizing royal god-king status (Devaraja); (4) Americas (Mexica/Inca): Tribute systems, human sacrifice for cosmic order, and the Incan Mita labor system.',
        apTip: 'On WHAP essays, never make isolated claims. Compare how two regions used religion to govern: e.g. Song China used Neo-Confucian filial piety, whereas the Mexica Aztec Empire used divine sacrificial rituals.'
      },
      {
        name: 'Technological & Agricultural Catalysts of Urbanization',
        conditions: 'Sustaining dramatic population growth in medieval societies.',
        conclusion: 'The introduction of Champa rice from Vietnam into Song China (drought-resistant, ripened twice a year) triggered massive demographic expansion, fueling urbanization and commercialization (Grand Canal transport, paper money/flying cash).',
        apTip: 'Champa rice is the single most tested agricultural innovation in Unit 1! Pair it with the Grand Canal expansion as the economic engine of the Song Dynasty.'
      }
    ],
    formulas: [
      {
        name: 'Imperial State Consolidation Framework',
        latex: '\\text{State Power} = \\text{Bureaucratic Administration} + \\text{Religious/Philosophical Legitimization} + \\text{Agricultural Surplus}',
        explanation: 'E.g. Song China: Merit-based exam + Neo-Confucian filial hierarchy + Champa rice yield.'
      }
    ],
    sections: [
      {
        heading: '1. Major Empires of the Global Tapestry (1200–1450) Matrix',
        content: `Comparative governance and cultural structures:

| Region | Major State / Empire | Governance System | Primary Cultural / Religious Anchor | Economic / Agricultural Innovation |
| :--- | :--- | :--- | :--- | :--- |
| **East Asia** | **Song Dynasty** | Centralized imperial bureaucracy; Civil Service Exams | Neo-Confucianism, Filial Piety, Foot-binding | Champa rice, porcelain, Grand Canal expansion, Flying cash |
| **Middle East** | **Abbasid Caliphate & Seljuk Turks** | Caliphate / Sultanate military rule | Islam (Sunni/Shia), Sharia law | House of Wisdom (Baghdad), algebraic mathematics, optics |
| **South Asia** | **Delhi Sultanate & Vijayanagara** | Feudal regional kingdoms | Islam (north), Hinduism & Bhakti movement (south) | Cotton textile export, monsoon-timed Indian Ocean trade |
| **Southeast Asia** | **Majapahit & Khmer Empire** | Maritime thalassocracy / Riverine state | Buddhism & Hinduism (Angkor Wat syncretism) | Tributary sea-lane tolls (Strait of Malacca), hydraulic canals |
| **Americas** | **Mexica (Aztec) & Inca Empire** | Tribute empire (Aztec); Centralized Mita empire (Inca) | Polytheism, cosmic blood sacrifice (Aztec); Sun god Inti (Inca) | Chinampas (floating gardens), Quipu record-keeping, Terracing |
| **Africa** | **Mali Empire & Great Zimbabwe** | Monarchy controlling gold-salt trade routes | Islam (Mali via Mansa Musa), Animism/Ancestor worship | Gold mining, trans-Saharan camel caravans, stone architecture |`
      }
    ,
      {
        heading: '2. Song Bureaucracy, Neo-Confucianism & Commercial Boom (CED 1.1-1.3)',
        content: `State building, agricultural innovation, and commercial expansion in Song China:

* **Imperial Bureaucracy & The Civil Service Examination**:
  * The Song Dynasty ($960-1279\\text{ CE}$) established a highly centralized meritocracy utilizing competitive civil service examinations based on the Confucian classics.
  * Bureaucratic scholar-officials ('scholar-gentry') managed state affairs, reducing the political power of hereditary military aristocrats.
* **Agricultural Revolution & Urbanization**:
  * **Champa Rice**: Fast-ripening, drought-resistant grain variety introduced from Vietnam that allowed double-cropping per season.
  * Triggered an unprecedented demographic boom, expanding Chinese population beyond $100$ million and fostering the largest metropolitan cities on Earth (Hangzhou).
  * **The Grand Canal Expansion**: Connected the agricultural surplus of the southern Yangtze river basin with northern political/military capitals.
* **Commercialization & Manufacturing Innovations**:
  * **Proto-Industrial Production**: Large-scale blast furnaces produced immense quantities of iron and steel for agricultural tools and armor; porcelain became a premier global luxury export.
  * **Monetary Systems**: Song invented **flying cash** (first government-issued paper currency) to replace heavy strings of copper coins.
  * **Neo-Confucian Patriarchal Resurgence**: Synthetic philosophy blending Confucian ethics with Daoist and Buddhist metaphysics; reinforced strict social hierarchies, filial piety, and elite female subordination exemplified by **foot-binding**.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating State Legitimacy in Song China vs. Abbasid Caliphate',
        topicRef: 'CED 1.1 Developments in East Asia & Dar al-Islam',
        question: 'Compare how the Song Dynasty and the Abbasid Caliphate legitimized and maintained their political rule.',
        solutionSteps: [
          'Step 1: Identify Song legitimization: The Mandate of Heaven and Neo-Confucian social hierarchies (filial piety subordinate to ruler); standardized civil service exams created a loyal scholar-gentry class.',
          'Step 2: Identify Abbasid legitimization: Islamic religious authority as Caliphs (successors to the Prophet Muhammad) enforcing Sharia law; patronizing scholars at the House of Wisdom to reinforce moral/intellectual supremacy.',
          'Step 3: Analyze similarities: Both utilized a shared philosophical/religious orthodoxy to justify administrative hierarchy and legal enforcement.',
          'Step 4: Analyze differences: Song China relied on an intellectual examination system open to commoners (meritocracy), while the Abbasid state relied heavily on military sultans and Turkic slave soldiers (Mamluks) as political authority fractured.'
        ],
        finalAnswer: 'Both used overarching belief systems to secure obedience, but Song China institutionalized civil exams while the Abbasids utilized religious caliphate authority and military slave institutions.',
        apScoringTip: 'To earn full analysis points on WHAP Short Answer Questions (SAQ) and Long Essay Questions (LEQ), always provide at least one specific piece of historical evidence (e.g. "scholar-gentry", "Mamluks").'
      }
    ],
    commonTraps: [
      'Assuming the Abbasid Caliphate remained fully centralized throughout 1200–1450. By this era, political authority had fractured into Turkic sultanates (Seljuks, Mamluks).',
      'Confusing the Mexica (Aztec) tribute system with the Inca Mita system. Aztecs demanded physical goods and captives; the Inca demanded mandatory physical labor service.',
      'Claiming Confucianism is a religion with gods. Classical Confucianism and Neo-Confucianism are philosophical, ethical, and social systems focused on societal order.'
    ],
    cramSheet: [
      'Song China: Civil Service Exams, Neo-Confucianism, Champa rice, foot-binding, flying cash.',
      'Dar al-Islam: House of Wisdom in Baghdad, Sharia law, preservation of Greek philosophy.',
      'Americas: Aztec chinampas and tribute; Inca Mita labor system, road network, and Quipu.',
      'Africa: Mansa Musa’s 1324 pilgrimage put Mali on European maps with gold trade.'
    ]
  },

  // ==========================================
  // UNIT 2: NETWORKS OF EXCHANGE (1200–1450)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Networks of Exchange (1200–1450)',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'Afro-Eurasian trade routes (Silk Roads, Indian Ocean, Trans-Saharan) expanded commercial connectivity, fostered urban growth, and facilitated biological/cultural diffusion.',
    keyTheorems: [
      {
        name: 'The Pax Mongolica and Silk Road Revitalization',
        conditions: 'Mongol Empire conquest of Eurasia under Genghis Khan and successors.',
        conclusion: 'The unified control of the Mongol Empire across Eurasia (Pax Mongolica) eliminated banditry and trade tariffs, instituting the Yam courier relay system and issuing passport tablets (Paiza). This security drastically lowered transportation risk, accelerating commercial volume and technological diffusion (gunpowder, paper, printing).',
        apTip: 'Mongol unification of Eurasia inadvertently enabled the rapid continental diffusion of the Yersinia pestis bacteria (the Black Death), decimating 30%–60% of European and Middle Eastern populations.'
      },
      {
        name: 'Environmental Knowledge and Indian Ocean Monsoon Maritime Trade',
        conditions: 'Navigating maritime networks connecting China, Southeast Asia, India, and Swahili East Africa.',
        conclusion: 'Merchants mastered the predictable seasonal monsoon winds (blowing northeast in summer, southwest in winter). Waiting for wind shifts necessitated extended stays in foreign ports, giving rise to vibrant Diasporic Merchant Communities where Arab, Persian, and Chinese traders married locally and diffused Islam and cultural customs.',
        apTip: 'Key maritime technologies: The Lateen sail (triangular sail catching crosswinds), the magnetic compass, the sternpost rudder, and the astrolabe.'
      }
    ],
    formulas: [
      {
        name: 'Cross-Cultural Diffusion Formula',
        latex: '\\text{Commercial Route Security} + \\text{Diasporic Merchant Enclaves} \\rightarrow \\text{Religious Syncretism} + \\text{Pandemic Spread}',
        explanation: 'E.g. Silk Roads + Pax Mongolica $\\rightarrow$ Islam/Buddhism diffusion + Black Death.'
      }
    ],
    sections: [
      {
        heading: '1. Comparative Analysis of Afro-Eurasian Trade Networks',
        content: `The three major commercial networks of exchange:

| Trade Network | Primary Goods Traded | Transportation Tech | Commercial / Financial Inventions | Religious & Cultural Diffusion |
| :--- | :--- | :--- | :--- | :--- |
| **Silk Roads** (Central Asia to Mediterranean) | Luxury goods: Silk, porcelain, spices, jade | Camel caravans, Caravanserai roadside inns | Paper money (flying cash), bills of exchange, banking houses | Buddhism, Islam, Christianity, Gunpowder |
| **Indian Ocean** (South China Sea to East Africa) | Bulk & luxury: Spices, cotton textiles, timber, ivory | Dhows, Junks, Lateen sails, Sternpost rudders, Astrolabe | Diasporic merchant communities, credit systems | Islam (Swahili coast, Indonesia), Hinduism/Buddhism |
| **Trans-Saharan** (North Africa to West Africa) | Gold, salt, slaves, kola nuts | Camel saddles (carrying up to 600 lbs), Oasis caravans | Caravans, Timbuktu trade centers | Islam diffused across West African empires (Ghana, Mali, Songhai) |`
      }
    ,
      {
        heading: '2. The Pax Mongolica & Indian Ocean Maritime Innovations (CED 2.1-2.4)',
        content: `Afro-Eurasian trade network intensification, nomads, and maritime technology:

* **The Mongol Empire & Pax Mongolica (13th-14th Centuries)**:
  * Genghis Khan unified nomadic steppe pastoral clans through meritocratic military organization and horse archer mobility.
  * **Pax Mongolica ('Mongol Peace')**: The unification of Afro-Eurasia under the four Mongol Khanates (Yuan Dynasty in China, Ilkhanate in Persia, Golden Horde in Russia, Chagatai in Central Asia) revitalized the **Silk Roads**.
  * Facilitated safe commercial transit with the **Yam postal courier relay system** and issued passports (**paiza**) guaranteeing diplomatic immunity and trade protection.
  * Diffusion of Chinese technologies westward: Gunpowder, magnetic compass, paper making, and movable type printing.
* **Indian Ocean Trade Innovations**:
  * **Environmental Knowledge**: Merchants scheduled voyages around predictable seasonal **monsoon winds** (blowing northeast in summer, southwest in winter).
  * **Maritime Tech**: Triangular **lateen sails** allowed ships to tack against the wind; **sternpost rudders** improved steerage; **astrolabes** calculated latitude.
  * **Diasporic Merchant Communities**: Arab, Persian, Chinese, and Indian traders settled in coastal entrepôts (Strait of Malacca, Calicut in India, Swahili city-states like Kilwa), introducing Islam and syncretic Swahili language (Bantu mixed with Arabic loanwords).`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Traveler Perspectives: Ibn Battuta vs. Marco Polo',
        topicRef: 'CED 2.5 Cultural Consequences of Connectivity',
        question: 'Explain how the accounts of Ibn Battuta and Marco Polo reflect the extent and nature of Afro-Eurasian connectivity between 1200 and 1450.',
        solutionSteps: [
          'Step 1: Analyze Ibn Battuta: Moroccan Muslim scholar who traveled ~73,000 miles across Dar al-Islam (West Africa, Middle East, India, China). His writings reveal the unifying power of the Islamic Sharia legal system, though he expressed shock at cultural variations (e.g. female autonomy in Mali).',
          'Step 2: Analyze Marco Polo: Venetian Christian merchant who spent 17 years in the court of Kublai Khan in Yuan China. His travelogue fascinated Europeans with descriptions of Chinese wealth, coal, paper money, and postal systems.',
          'Step 3: Synthesize connectivity: Both accounts demonstrate that Afro-Eurasia was intricately interconnected, allowing individuals to travel across continents under the legal and commercial protections of dominant empires (Pax Mongolica and Dar al-Islam).'
        ],
        finalAnswer: 'Both travelogues document extensive transcontinental connectivity, illustrating how shared religions and Mongol peace facilitated safe long-distance travel and cross-cultural reporting.',
        apScoringTip: 'Traveler accounts are classic primary sources on Document-Based Questions (DBQs). Always identify the author’s point of view (POV) and cultural lens.'
      }
    ],
    commonTraps: [
      'Assuming the Silk Roads primarily traded heavy bulk agricultural crops. High land-transport costs meant overland caravans traded almost exclusively HIGH-VALUE LUXURY goods (silk, porcelain). Bulk goods moved by sea!',
      'Thinking the Black Death originated in Europe. The plague originated in East/Central Asia and spread westward along Mongol trade routes.',
      'Claiming Islam spread across West Africa through military conquest. Islam spread to sub-Saharan Africa peacefully via Trans-Saharan merchants and scholars!'
    ],
    cramSheet: [
      'Silk Roads = Luxury goods (silk, porcelain); Indian Ocean = Bulk & luxury goods (spices, cotton); Trans-Saharan = Gold & salt.',
      'Tech: Caravanserai, lateen sails, astrolabe, magnetic compass, camel saddle.',
      'Pax Mongolica secured the Silk Roads, accelerating trade and the Black Death.',
      'Travelers: Ibn Battuta (Dar al-Islam), Marco Polo (China/Yuan Dynasty), Margery Kempe (Christian pilgrimage).'
    ]
  },

  // ==========================================
  // UNIT 3: LAND-BASED EMPIRES (1450–1750)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Land-Based Empires (1450–1750)',
    examWeight: '12%–15% of AP Exam',
    bigIdea: 'Gunpowder empires (Ottoman, Safavid, Mughal, Qing, Russian) expanded territorially and consolidated power through military technology, elite bureaucratic armies, and monumental architecture.',
    keyTheorems: [
      {
        name: 'The Gunpowder Empire Triad and Religious Sectarianism',
        conditions: 'Imperial expansion across the Islamic world (1450–1750).',
        conclusion: 'The Ottoman, Safavid, and Mughal empires consolidated rule through gunpowder artillery and muskets. Religious rivalries intensified geopolitical conflict: The Sunni Ottoman Empire and the Shia Safavid Empire fought bitter territorial wars (e.g. Battle of Chaldiran, 1514), creating lasting religious divides in the Middle East.',
        apTip: 'The Mughal Empire under Akbar pursued religious tolerance (abolishing the jizya tax on non-Muslims and creating the syncretic Din-i Ilahi), whereas under Aurangzeb, strict Islamic orthodoxy was reinstated.'
      },
      {
        name: 'Bureaucratic Recruitment and Elite Military Castes',
        conditions: 'Centralizing monarchical power away from hereditary feudal aristocrats.',
        conclusion: 'Empires recruited military and bureaucratic elites directly loyal to the ruler: (1) Ottoman Devshirme system (Christian boys conscripted and trained as elite Janissary infantry or bureaucrats); (2) Japanese Samurai under the Tokugawa Shogunate; (3) French Intendants under Louis XIV; (4) Russian Boyars checked by Peter the Great.',
        apTip: 'Devshirme and Janissaries are the single most tested military recruitment concept in Unit 3!'
      }
    ],
    formulas: [
      {
        name: 'Imperial Centralization Formula',
        latex: '\\text{Monarchical Power} = \\text{Gunpowder Army} + \\text{Elite Slave/Bureaucratic Caste} + \\text{Monumental Architecture (Legitimization)}',
        explanation: 'E.g. Ottomans: Janissaries + Devshirme + Suleymaniye Mosque; Mughals: Gunpowder + Zamindars + Taj Mahal.'
      }
    ],
    sections: [
      {
        heading: '1. Land-Based Empires State Consolidation Matrix (1450–1750)',
        content: `Methods of consolidation, administration, and architectural legitimization:

| Empire | Key Rulers | Elite Military / Administrative Cadre | Religious Stance | Monumental Architecture / Artistic Display |
| :--- | :--- | :--- | :--- | :--- |
| **Ottoman Empire** | Mehmed II (conquered Constantinople 1453), Suleiman the Magnificent | **Janissaries** (recruited through the **Devshirme** system) | Sunni Islam; Millets allowed religious autonomy for Christians/Jews | Süleymaniye Mosque, Topkapi Palace |
| **Safavid Empire** | Shah Ismail, Shah Abbas I | Ghulams (slave soldiers of Christian descent) | **Twelver Shia Islam** (mandatory state religion; clashed with Ottomans) | Isfahan royal mosques, Persian carpets |
| **Mughal Empire** | Akbar the Great, Aurangzeb, Shah Jahan | **Zamindars** (local tax collectors responsible for land revenue) | Religious tolerance under Akbar (abolished Jizya); Orthodoxy under Aurangzeb | **Taj Mahal**, Red Fort (Delhi), Fatehpur Sikri |
| **Qing Dynasty** (China) | Kangxi, Qianlong | Eight Banners military; retained Ming Civil Service Exams | Confucian Mandate of Heaven; enforced Manchu queue hairstyle | Imperial portraits, Forbidden City renovations |
| **Russian Empire** | Ivan IV (the Terrible), Peter the Great | Streltsy military; Westernized nobility (Table of Ranks) | Russian Eastern Orthodox Christianity | St. Petersburg ("Window to the West"), Winter Palace |
| **France (Bourbon)** | Louis XIV ("The Sun King") | Royal Intendants (civil bureaucrats displacing feudal nobles) | Catholicism (Revoked Edict of Nantes; Divine Right of Kings) | **Palace of Versailles** (forced nobles to reside under surveillance) |`
      }
    ,
      {
        heading: '2. Gunpowder Empire Bureaucratic Recruitment & Monumental Art (CED 3.1-3.4)',
        content: `Land-based imperial consolidation, military modernization, and ideological legitimation:

* **The Ottoman Empire (Sunni Islamic Caliphate)**:
  * Conquered Constantinople in $1453$ under Mehmed II, transforming it into Istanbul.
  * **Devshirme System**: Enslaved Christian boys from the Balkans, converted them to Islam, and educated them for high-level civil administration or the elite firearm-wielding infantry corps (**Janissaries**).
  * **Tax Farming (Iltizam)**: State auctioned the right to collect agricultural taxes to wealthy private bidding elites.
* **The Safavid Empire (Twelver Shia Theocracy)**:
  * Founded by Shah Ismail; established Twelver Shia Islam as the mandatory state religion, triggering chronic geopolitical and religious warfare against the neighboring Sunni Ottoman Empire (Battle of Chaldiran, $1514$).
* **The Mughal Empire (South Asia)**:
  * Akbar the Great ($1556-1605$) consolidated control over a Hindu majority through religious tolerance: abolished the **jizya** tax on non-Muslims, married Hindu Rajput princesses, and fostered cultural syncretism.
  * **Monumental Architecture**: Shah Jahan constructed the **Taj Mahal** as an architectural testament combining Persian, Islamic, and Indian motifs to project imperial power and legitimacy.
* **Qing Dynasty China ($1644-1912$)**:
  * Manchu pastoralists from Manchuria overthrew the Ming Dynasty; enforced ethnic supremacy via the **queue hairstyle mandate** (punishable by death for Han men who refused), while maintaining Confucian civil service governance.`
      }
    ],
    workedExamples: [
      {
        title: 'Explaining How Rulers Used Monumental Architecture to Legitimate Rule',
        topicRef: 'CED 3.2 Imperial Legitimization & Architecture',
        question: 'Explain how both Louis XIV at Versailles and Shah Jahan at the Taj Mahal used monumental architecture to consolidate imperial power.',
        solutionSteps: [
          'Step 1: Analyze Versailles: Built by Louis XIV outside Paris. The sheer grandeur displayed divine right and immense state wealth; requiring aristocrats to live at Versailles neutralized feudal rebellion through court etiquette and surveillance.',
          'Step 2: Analyze the Taj Mahal: Commissioned by Shah Jahan as a mausoleum for Mumtaz Mahal. Incorporating Islamic domes and Quranic calligraphy, it demonstrated unmatched Mughal imperial wealth and synthesized Islamic and Persian aesthetic mastery.',
          'Step 3: Synthesize analytical connection: Both rulers diverted state tax revenues into awe-inspiring physical monuments that symbolized unquestioned monarchical authority, deterred domestic rebellion, and projected divine favor to foreign emissaries.'
        ],
        finalAnswer: 'Both constructed monumental architectural complexes to visually manifest wealth, project divine/imperial supremacy, and domesticate or intimidate political rivals.',
        apScoringTip: 'When writing LEQs, link physical architecture directly to *political function* (e.g. Versailles served as a political prison/gilded cage for nobles).'
      }
    ],
    commonTraps: [
      'Assuming the Janissaries were simple mistreated slaves. Janissaries were elite, salaried, prestigious military commanders with immense political influence.',
      'Confusing Sunni Ottoman and Shia Safavid alliances. They were mortal enemies who fought brutal religious wars over Mesopotamia.',
      'Thinking the Protestant Reformation (1517) occurred in Eastern Europe or Asia. Martin Luther’s 95 Theses fractured Western European Catholicism, leading to the 30 Years War.'
    ],
    cramSheet: [
      'Gunpowder empires: Ottoman, Safavid, Mughal, Qing, Russian.',
      'Ottomans: Devshirme system, Janissary musketeers, Sunni vs. Shia Safavid rivalry.',
      'Mughals: Akbar (tolerance, abolished Jizya) vs. Aurangzeb (orthodoxy); Zamindar tax system.',
      'Monumental architecture = power display: Versailles (Louis XIV), Taj Mahal (Shah Jahan).',
      'Qing Dynasty: Manchu minority rulers maintained Confucian exams but enforced Queue haircut.'
    ]
  },

  // ==========================================
  // UNIT 4: TRANSOCEANIC INTERCONNECTIONS (1450–1750)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Transoceanic Interconnections (1450–1750)',
    examWeight: '12%–15% of AP Exam',
    bigIdea: 'European maritime exploration connected the Eastern and Western hemispheres, establishing global trade networks, the Columbian Exchange, and coerced labor empires.',
    keyTheorems: [
      {
        name: 'The Columbian Exchange Biological & Demographic Shock',
        conditions: 'The cross-hemispheric exchange of flora, fauna, and pathogens following 1492.',
        conclusion: 'Afro-Eurasian pathogens (Smallpox, Measles, Influenza) caused the Great Dying in the Americas, wiping out 80%–90% of indigenous populations. Conversely, American caloric crops (Potatoes, Maize, Cassava) revolutionized Afro-Eurasian nutrition, triggering rapid population booms in Europe, Africa, and China.',
        apTip: 'Remember the directionality: Diseases went East $\\rightarrow$ West (Europe to Americas); Caloric staple crops went West $\\rightarrow$ East (Americas to Europe/Asia); Horses and sugarcane went East $\\rightarrow$ West.'
      },
      {
        name: 'Mercantilism and the Global Silver Drain',
        conditions: 'European imperial economic policy and Asian commodity markets.',
        conclusion: 'Mercantilist theory held that global wealth was fixed, measured in bullion (gold/silver). Spanish silver from Potosí (Bolivia) and Zacatecas (Mexico) was shipped via the Manila Galleons across the Pacific to China, where the Ming Dynasty required all taxes to be paid in silver, making China the ultimate global sink for New World silver.',
        apTip: 'Silver was the first truly global currency connecting the Americas, Europe, and Asia.'
      }
    ],
    formulas: [
      {
        name: 'The Triangular Trade Engine',
        latex: '\\text{European Manufactured Goods (Guns/Cloth)} \\xrightarrow{\\text{Africa}} \\text{Enslaved Labor (Middle Passage)} \\xrightarrow{\\text{Americas}} \\text{Raw Cash Crops (Sugar/Tobacco)} \\xrightarrow{\\text{Europe}}',
        explanation: 'Perpetual maritime trade cycle enriching European colonial metropoles at horrific human cost.'
      }
    ],
    sections: [
      {
        heading: '1. The Columbian Exchange Transfer Matrix',
        content: `Hemispheric exchange of species and consequences:

| Category | Transferred from Americas to Afro-Eurasia (Old World) | Transferred from Afro-Eurasia to Americas (New World) | Major Global Consequence |
| :--- | :--- | :--- | :--- |
| **Crops & Flora** | Potatoes, Maize (Corn), Tomatoes, Tobacco, Cacao, Vanilla, Cassava, Peanuts | Sugarcane, Wheat, Coffee, Bananas, Rice, Citrus | Caloric surge in Old World caused massive population growth; Sugar fueled plantation slavery |
| **Domesticated Animals** | Turkeys, Llamas, Alpacas, Guinea Pigs | Horses, Cattle, Pigs, Sheep, Goats, Chickens | Horses revolutionized indigenous Great Plains hunting (Comanche); Pigs multiplied rapidly |
| **Pathogens / Disease** | Syphilis (disputed origins) | **Smallpox**, Measles, Malaria, Yellow Fever, Influenza | **The Great Dying**: 80%–90% indigenous mortality in the Americas |`
      }
    ,
      {
        heading: '2. European Maritime Empires, Global Silver & Transatlantic Trade (CED 4.2-4.7)',
        content: `Oceanic voyaging, global commercial integration, and coercive plantation labor:

* **European Maritime Exploration & Mercantilism**:
  * Portugal built a **Trading Post Empire** along African and Asian coasts (Prince Henry the Navigator, Vasco da Gama), establishing naval choke-points and selling commercial trading permits (**cartaz**).
  * Spain sponsored Christopher Columbus ($1492$); Treaty of Tordesillas ($1494$) divided non-European world between Spain and Portugal.
* **The Global Silver Flow (The Silver Drain)**:
  * Spanish extraction of massive silver deposits at **Potosí** (Bolivia) and Zacatecas (Mexico) utilizing the coerced indigenous **mita system**.
  * Silver galleons sailed across the Pacific to Manila (Philippines), where Spanish silver was exchanged for Chinese luxury silks, porcelain, and tea.
  * The Ming Dynasty's **Single Whip Tax Reform** mandated that all domestic taxes be paid strictly in silver, turning China into the ultimate global destination ('silver sink') for New World bullion!
* **Joint-Stock Companies**:
  * Dutch East India Company (**VOC**) and British East India Company (**EIC**): Privately financed chartered corporations with investor limited liability, possessing state-like powers to wage war, mint coinage, and administer colonial territories.
* **The Transatlantic Chattel Slave Trade**:
  * Capture and horrific middle passage shipment of over $12$ million enslaved Africans to Brazilian and Caribbean sugar plantations, causing catastrophic demographic depletion in West Africa and enriching European imperial powers.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating Labor Systems in the Spanish American Empire',
        topicRef: 'CED 4.4 Maritime Empires Established: Labor Systems',
        question: 'Differentiate between the Encomienda, Hacienda, and adapted Incan Mita systems utilized by the Spanish crown.',
        solutionSteps: [
          'Step 1: Encomienda: Spanish crown granted conquistadors the right to exact forced labor and tribute from indigenous populations in exchange for Christianization; collapsed due to extreme brutality and indigenous demographic collapse.',
          'Step 2: Hacienda: Large rural agricultural estates producing food and livestock for domestic colonial markets, employing debt-peonage indigenous and mestizo workers tied to the land.',
          'Step 3: Adapted Mita: Spanish coerced traditional Incan public labor service into brutal mandatory rotational labor in silver mines (e.g. Potosí, "the mountain that eats men") where toxic mercury amalgamation killed tens of thousands.',
          'Step 4: Shift to Transatlantic Chattel Slavery: As indigenous populations succumbed to disease and exhaustion, Europeans imported millions of enslaved Africans who possessed agricultural expertise and resistance to tropical diseases.'
        ],
        finalAnswer: 'Encomienda granted labor rights; Hacienda was agrarian debt-peonage; Mita was coerced mining labor; all eventually supplemented by African chattel slavery.',
        apScoringTip: 'Identify the racial hierarchy: The Casta System classified colonial society by blood purity (Peninsulares $\\rightarrow$ Creoles $\\rightarrow$ Mestizos $\\rightarrow$ Mulattoes $\\rightarrow$ Indigenous/Africans).'
      }
    ],
    commonTraps: [
      'Assuming the vast majority of enslaved Africans went to North America. Less than 5% went to British North America! Over 90% went to Brazil and the Caribbean to work on lethal sugar plantations.',
      'Thinking potatoes and maize existed in Europe before 1492. None of these existed in Afro-Eurasia prior to Columbus!',
      'Confusing Creoles with Mestizos. Creoles were 100% European descent born in the Americas; Mestizos were mixed European and Indigenous ancestry.'
    ],
    cramSheet: [
      'Columbian Exchange: Smallpox East $\\rightarrow$ West (Great Dying); Potatoes/Corn West $\\rightarrow$ East (population boom).',
      'Potosí Silver: Mined via coerced Mita labor; flowed to China via Manila Galleons to pay taxes.',
      'Labor: Encomienda $\\rightarrow$ Hacienda debt peonage $\\rightarrow$ African chattel slavery.',
      'Casta System: Peninsulares (Spanish-born) $\\rightarrow$ Creoles (American-born whites) $\\rightarrow$ Mestizos/Mulattoes $\\rightarrow$ Indigenous/Africans.',
      'Joint-Stock Companies: Dutch East India (VOC) and British East India Company financed global trade.'
    ]
  },

  // ==========================================
  // UNIT 5: REVOLUTIONS (1750–1900)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Revolutions (1750–1900)',
    examWeight: '12%–15% of AP Exam',
    bigIdea: 'Enlightenment philosophies of natural rights, popular sovereignty, and the social contract challenged monarchical tyranny, inspiring Atlantic revolutions and the Industrial Revolution.',
    keyTheorems: [
      {
        name: 'The Enlightenment Social Contract Theory',
        conditions: 'Challenging absolute divine-right monarchy.',
        conclusion: 'John Locke posited natural rights (Life, Liberty, Property) and argued government exists solely through the consent of the governed. If a government breaks the social contract, citizens possess the legitimate right to overthrow it. Baron de Montesquieu advocated separation of powers; Voltaire defended freedom of speech and religious toleration; Jean-Jacques Rousseau articulated the General Will.',
        apTip: 'The American Declaration of Independence (1776) and French Declaration of the Rights of Man (1789) directly quote and adapt John Locke’s philosophies.'
      },
      {
        name: 'Comparative Atlantic Revolutions Mechanics',
        conditions: 'Wave of political upheaval sweeping the Atlantic world (1775–1830).',
        conclusion: 'American Revolution: Conservative political separation without altering internal socioeconomic structures. French Revolution: Radical overthrow of monarchy and feudal Estates system (Reign of Terror). Haitian Revolution (1791–1804): The ONLY successful slave rebellion in history, led by Toussaint Louverture, establishing the first black republic. Latin American Wars: Creole elites (Simón Bolívar, José de San Martín) ousted Spanish rule but preserved social hierarchies.',
        apTip: 'The Haitian Revolution terrified slave-owning elites across the Atlantic, including the United States, which imposed an economic embargo on Haiti.'
      }
    ],
    formulas: [
      {
        name: 'Atlantic Revolutionary Sequence',
        latex: '\\text{Enlightenment Ideas} + \\text{Fiscal Crisis / Imperial Taxation} \\rightarrow \\text{Revolution} \\rightarrow \\text{Constitutional Nationalism}',
        explanation: 'E.g. Locke/Rousseau + British/French war debt from 7 Years War $\\rightarrow$ Revolutions.'
      }
    ],
    sections: [
      {
        heading: '1. Comparative Atlantic Revolutions Matrix',
        content: `Causes, leaders, outcomes, and radicalism:

| Revolution | Primary Causes | Key Leaders | Document / Ideology | Revolutionary Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **American** (1775–1783) | British taxation without representation after Seven Years War | George Washington, Thomas Jefferson | Declaration of Independence; Locke's natural rights | Independent democratic republic; preserved slavery |
| **French** (1789–1799) | Three Estates inequality, royal debt, bread shortages | Maximilien Robespierre, National Assembly | Declaration of the Rights of Man; Liberty, Equality, Fraternity | Overthrew monarchy; Reign of Terror; ended in Napoleon's military dictatorship |
| **Haitian** (1791–1804) | Brutality of sugar slavery, inspired by French declaration | **Toussaint Louverture**, Jean-Jacques Dessalines | Abolition of slavery, racial equality | Only successful enslaved rebellion; first free black republic |
| **Latin American** (1808–1825) | Creole resentment of Peninsulares, Napoleonic invasion of Spain | **Simón Bolívar** (Jamaica Letter), José de San Martín | Enlightenment republicanism, Gran Colombia vision | Independence from Spain; Creoles replaced Peninsulares at the top |`
      }
    ,
      {
        heading: '2. Enlightenment Ideology, Nationalism & The Atlantic Revolutions (CED 5.1-5.4)',
        content: `Intellectual revolutions, constitutional challenges, and imperial dissolutions:

* **The Enlightenment Intellectual Foundations**:
  * **John Locke**: Posited inalienable natural rights (life, liberty, property) and a **social contract** where citizens retain the right to overthrow tyrannical rulers who violate their rights.
  * **Baron de Montesquieu**: Advocated separation of powers into executive, legislative, and judicial branches.
  * **Jean-Jacques Rousseau**: Promoted popular sovereignty and the 'General Will'.
* **The Atlantic Revolutions Nexus**:
  * **American Revolution ($1775-1783$)**: Colonists rebelled against British imperial taxes without parliamentary representation; established a democratic republic grounded in Enlightenment principles.
  * **French Revolution ($1789-1799$)**: Third Estate revolted against aristocratic feudal privilege; National Assembly adopted the **Declaration of the Rights of Man and of the Citizen**; radical Jacobin Reign of Terror (Robespierre) followed by the rise of Napoleon Bonaparte spreading legal equality across Europe.
  * **Haitian Revolution ($1791-1804$)**: Led by **Toussaint Louverture**, enslaved Black workers in the French sugar colony of Saint-Domingue executed the only successful slave revolt in world history, abolishing slavery and founding the world's first free Black republic.
  * **Latin American Independence ($1808-1826$)**: **Simón Bolívar** (author of the *Jamaica Letter*) and José de San Martín led Creole elites in overthrowing Spanish colonial rule across South America.`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Simón Bolívar’s Jamaica Letter (1815)',
        topicRef: 'CED 5.2 Nationalism and Revolutions in Latin America',
        question: 'Explain how Simón Bolívar’s Jamaica Letter reflects both Enlightenment ideals and the self-interest of the Creole class.',
        solutionSteps: [
          'Step 1: Identify Enlightenment principles in the letter: Bolívar critiques Spanish mercantilism and despotic rule, arguing for natural liberty, constitutional representative government, and regional unity.',
          'Step 2: Identify Creole class interest: Bolívar laments that Creoles are treated as perpetual minors, locked out of political governance and forced into commercial servitude to Spain.',
          'Step 3: Analyze limitations: While championing freedom, Bolívar expressed skepticism about full democracy for indigenous and mixed-race masses, advocating a strong centralized executive.',
          'Step 4: Conclude synthesis: The Jamaica Letter employed universal Enlightenment rhetoric to justify a revolution that primarily elevated the Creole aristocracy into state power.'
        ],
        finalAnswer: 'Bolívar used Enlightenment liberty to dismantle Spanish imperialism while preserving Creole elite authority over lower racial classes.',
        apScoringTip: 'Whenever analyzing Bolívar or Jefferson, evaluate the tension between their universal human rights rhetoric and their preservation of racial hierarchies.'
      }
    ],
    commonTraps: [
      'Assuming the French and American revolutions achieved the same radicalism. The American revolution changed rulers; the French revolution destroyed the church, executed the king, and reorganized society.',
      'Thinking the Haitian revolution was led exclusively by elite landowners. It was an uprising of 500,000 enslaved sugar laborers.',
      'Forgetting that nationalism united some countries (Germany under Bismarck, Italy under Cavour) while fracturing multi-ethnic empires (Ottoman and Austro-Hungarian empires).'
    ],
    cramSheet: [
      'Enlightenment: Locke (Natural rights: Life, Liberty, Property), Montesquieu (Separation of powers).',
      'Atlantic Revolutions: American (1776), French (1789), Haitian (1791 - only successful slave revolt), Latin America (Bolívar).',
      'Haitian Revolution leader: Toussaint Louverture.',
      'Nationalism: Unification of Germany (Otto von Bismarck - "Blood and Iron") and Italy (Cavour/Garibaldi).',
      'Industrial Revolution begins in Britain: Coal, iron, rivers, capital, enclosure acts, steam engine (James Watt).'
    ]
  },

  // ==========================================
  // UNIT 6: INDUSTRIALIZATION & IMPERIALISM (1750–1900)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Consequences of Industrialization (1750–1900)',
    examWeight: '12%–15% of AP Exam',
    bigIdea: 'Industrial capitalism transformed global economic power, driving Western and Japanese imperialism to extract raw materials and dominate export markets.',
    keyTheorems: [
      {
        name: 'The Scramble for Africa and the Berlin Conference (1884–1885)',
        conditions: 'European colonial powers partitioning the African continent.',
        conclusion: 'Convened by German Chancellor Otto von Bismarck, the Berlin Conference established the "Principle of Effective Occupation" to carve up Africa without inter-European war. Artificial borders were drawn completely disregarding indigenous ethnic, linguistic, and cultural boundaries, precipitating brutal exploitation (King Leopold II in the Congo Free State) and lasting post-colonial conflict.',
        apTip: 'Only TWO African nations successfully resisted European colonization: Ethiopia (defeated Italy at the Battle of Adwa in 1896 under Menelik II) and Liberia.'
      },
      {
        name: 'State-Sponsored Industrialization vs. Non-Western Resistance',
        conditions: 'Response of non-Western empires to Western imperial hegemony.',
        conclusion: 'Meiji Restoration in Japan (1868): Abolished the Tokugawa Shogunate, modernized infrastructure, and industrialized rapidly ("Enrich the country, strengthen the armed forces"), enabling Japan to defeat China (1895) and Russia (1905). In contrast, China’s Self-Strengthening Movement failed, leading to spheres of influence and the Boxer Rebellion.',
        apTip: 'Contrast Japan (successful rapid modernization) with Qing China (resisted Westernization, suffered unequal treaties and Opium Wars) on every comparative essay!'
      }
    ],
    formulas: [
      {
        name: 'Industrial Imperialism Feedback Loop',
        latex: '\\text{Factory Industrialization} \\rightarrow \\text{Demand for Raw Materials (Rubber/Oil/Cotton)} \\rightarrow \\text{Military Imperialism} \\rightarrow \\text{Captive Export Markets}',
        explanation: 'Industrial nations colonized non-industrial regions to extract inputs and dump manufactured goods.'
      }
    ],
    sections: [
      {
        heading: '1. Economic Ideologies and Social Responses to Industrialization',
        content: `Competing economic theories of the Industrial Age:

| Ideology / Theorist | Primary Text | Core Economic Thesis | Role of the State |
| :--- | :--- | :--- | :--- |
| **Capitalism** (Adam Smith) | *The Wealth of Nations* (1776) | Free-market competition governed by the "Invisible Hand"; division of labor maximizes productivity | **Laissez-faire** (Minimal government intervention; protect property rights) |
| **Marxism / Socialism** (Karl Marx & Friedrich Engels) | *The Communist Manifesto* (1848) | History is driven by class struggle between the Bourgeoisie (owners) and Proletariat (workers); capitalism inevitably produces revolution | Proletariat seizes means of production; state eventually withers away into classless communism |
| **Utilitarianism** (John Stuart Mill) | *Utilitarianism* (1861) | Actions are right if they promote the greatest happiness for the greatest number | Government intervention justified to protect workers, ban child labor, and secure public health |`
      }
    ,
      {
        heading: '2. Industrial Imperialism, The Scramble for Africa & Meiji Japan (CED 6.1-6.6)',
        content: `Technological military imbalances, colonial subjugation, and defensive modernization:

* **Motives & Rationales for 19th-Century Imperialism**:
  * **Economic Drivers**: Industrial factories demanded continuous raw materials (rubber from Congo, cotton from Egypt/India, copper from Chile, petroleum, palm oil for machine lubricants) and captive markets.
  * **Ideological Justifications**:
    * **Social Darwinism**: Pseudoscience claiming white European racial superiority destined Europeans to dominate 'weaker' non-white races.
    * **The 'Civilizing Mission'**: Paternalistic duty to spread Christianity, Western medicine, and European law ('White Man's Burden').
* **The Scramble for Africa ($1884-1914$)**:
  * **The Berlin Conference ($1884-1885$)**: Organized by German Chancellor Otto von Bismarck; 14 European powers partitioned the African continent without inviting a single African leader, drawing artificial borders that exacerbated ethnic conflicts.
  * **King Leopold II of Belgium**: Private owner of the Congo Free State; enforced horrific rubber quotas through mass mutilation and forced labor (an estimated 10 million Congolese died).
* **Anti-Colonial Resistance Movements**:
  * **Sepoy Mutiny / Indian Rebellion of 1857**: Indian soldiers rebelled against British East India Company over Enfield rifle cartridges greased with pig/cow fat; British brutally suppressed revolt and instituted direct **British Raj** rule.
  * **Boxer Rebellion ($1899-1901$) in China**: Anti-foreign, anti-Christian uprising crushed by an Eight-Nation multinational coalition.
* **Meiji Restoration in Japan ($1868$)**:
  * Following Commodore Matthew Perry's forced opening of Japan ($1853$), young samurai overthrew the Tokugawa Shogunate and restored the Meiji Emperor.
  * **Defensive Industrial Modernization**: Abolished feudal samurai privileges, modernized military along Prussian lines, built state-financed railways and factories sold to private conglomerates (**zaibatsu**), emerging as an imperialist power defeating China ($1895$) and Russia ($1905$).`
      }
    ],
    workedExamples: [
      {
        title: 'Explaining the Rationales for 19th-Century Imperialism',
        topicRef: 'CED 6.1 Rationales for Imperialism from 1750 to 1900',
        question: 'Analyze how Social Darwinism, the "Civilizing Mission", and economic motives were used to justify European colonial expansion.',
        solutionSteps: [
          'Step 1: Economic Motives (Material Base): Industrial factories desperately required raw resources not found in Europe (rubber from the Congo/Amazon, cotton from India/Egypt, copper for electrical wiring, palm oil for machine lubrication) and needed captive export markets for surplus goods.',
          'Step 2: Social Darwinism (Scientific Racism): Misapplication of Charles Darwin’s biological evolution to human societies, asserting white Europeans were culturally and racially superior, and that conquest was a natural law of "survival of the fittest."',
          'Step 3: Cultural "Civilizing Mission" (Rudyard Kipling’s "White Man’s Burden"): Paternalistic ideology claiming Europeans had a moral obligation to civilize non-white populations by introducing Christianity, Western education, and medicine.',
          'Step 4: Synthesize justification: Ideologies masked ruthless economic extraction beneath the veneer of humanitarian progress.'
        ],
        finalAnswer: 'Colonial powers rationalized raw resource extraction using pseudo-scientific Social Darwinism and moralizing "civilizing mission" rhetoric.',
        apScoringTip: 'When discussing imperialism, distinguish between CAUSES (need for rubber, cotton, oil) and JUSTIFICATIONS (Social Darwinism, religion).'
      }
    ],
    commonTraps: [
      'Assuming the British East India Company was the British government. The EIC was a private joint-stock corporation until the 1857 Sepoy Rebellion forced the British crown to assume direct rule (the British Raj).',
      'Confusing the First Industrial Revolution (textiles, steam, coal, iron) with the Second Industrial Revolution (steel, chemicals, electricity, petroleum).',
      'Thinking King Leopold II colonized the Congo for the Belgian nation. The Congo Free State was his personal private real estate empire, resulting in 10 million deaths.'
    ],
    cramSheet: [
      '1st Industrial Rev: Steam, coal, textiles, iron; 2nd Industrial Rev: Steel, electricity, chemicals, petroleum.',
      'Berlin Conference (1884–1885): Scramble for Africa partitioned without African consent.',
      'Meiji Restoration (1868): Japan modernizes and industrializes to prevent Western colonization.',
      'Opium Wars (1839–1860): Britain forces China to open treaty ports (Treaty of Nanking).',
      'Sepoy Rebellion (1857): British crown assumes direct rule (British Raj) over India.'
    ]
  },

  // ==========================================
  // UNIT 7: GLOBAL CONFLICT (1900–PRESENT)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Global Conflict (1900–Present)',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'Imperial rivalries, nationalist tensions, and economic collapse precipitated two total world wars, mass atrocities, and the collapse of old global orders.',
    keyTheorems: [
      {
        name: 'The M-A-I-N Causes of World War I',
        conditions: 'Eruption of the Great War following the 1914 assassination of Archduke Franz Ferdinand.',
        conclusion: 'World War I was triggered by four structural catalysts: (1) Militarism (naval arms race between Britain and Germany), (2) Alliances (Triple Entente vs. Triple Alliance entangling secret pacts), (3) Imperialism (competition for African and Asian territories), (4) Nationalism (Balkan "powder keg" Slavic nationalism against Austro-Hungarian control).',
        apTip: 'World War I was a **Total War**: governments mobilized their entire populations, censored the press, deployed female labor in munitions factories, and rationed all food.'
      },
      {
        name: 'Fascism, the Great Depression, and World War II Axis Aggression',
        conditions: 'The collapse of global trade after 1929 and the rise of totalitarian regimes.',
        conclusion: 'The 1929 Great Depression exacerbated economic devastation in Weimar Germany, facilitating Adolf Hitler’s Nazi rise to power on promises to overturn the humiliating Treaty of Versailles. Combined with Benito Mussolini’s Italian Fascism and Japanese imperial expansion (Invasion of Manchuria 1931, Rape of Nanking 1937), aggressive expansionism systematically broke the weak League of Nations.',
        apTip: 'World War II mass atrocities: The Holocaust (Nazi state-sponsored systematic genocide of 6 million Jews), the Rwandan Genocide, and the Armenian Genocide.'
      }
    ],
    formulas: [
      {
        name: 'Total War Equation',
        latex: '\\text{Total War} = \\text{Universal Conscription} + \\text{Economic Mobilization} + \\text{State Propaganda} + \\text{Targeting of Civilian Infrastructure}',
        explanation: 'Civilians become targets via strategic aerial bombing, starvation blockades, and atomic weapons.'
      }
    ],
    sections: [
      {
        heading: '1. Comparative Analysis: World War I vs. World War II',
        content: `Structural comparison of the two 20th-century global conflicts:

| Feature | World War I (1914–1918) | World War II (1939–1945) |
| :--- | :--- | :--- |
| **Underlying Causes** | M-A-I-N (Militarism, Alliances, Imperialism, Nationalism) | Fascist expansionism, Failure of Treaty of Versailles & League of Nations, Great Depression |
| **Alliances** | **Allies** (UK, France, Russia, USA) vs. **Central Powers** (Germany, Austria-Hungary, Ottoman) | **Allies** (USA, USSR, UK, China) vs. **Axis Powers** (Nazi Germany, Imperial Japan, Italy) |
| **Military Tech** | Trench warfare, machine guns, poison gas, barbed wire, artillery stalemates | Blitzkrieg (tank-aircraft coordination), radar, aircraft carriers, **Atomic Bomb** |
| **Casualties / Atrocities** | ~20 million military/civilian deaths; Armenian Genocide | ~75 million deaths; **The Holocaust**; Firebombing of Dresden/Tokyo; Hiroshima/Nagasaki |
| **Political Outcome** | Fall of 4 empires (Russian, German, Ottoman, Austro-Hungarian); League of Nations | Emergence of two Superpowers (USA and USSR); Creation of United Nations (UN) |`
      }
    ,
      {
        heading: '2. Total War Mobilization, Global Depression & The Holocaust (CED 7.2-7.8)',
        content: `Industrialized carnage, economic collapse, fascist aggression, and genocide:

* **World War I ($1914-1918$) as Total War**:
  * **M-A-I-N Long-Term Causes**: Militarism, Alliances (Triple Entente vs. Triple Alliance), Imperialism, and Nationalism.
  * Spark: Assassination of Archduke Franz Ferdinand by Gavrilo Princip (Black Hand) in Sarajevo.
  * **Total War Reality**: Governments harnessed all domestic civilian resources, enforced military conscription, directed industrial production, rationed food, censored press, and deployed wartime propaganda.
  * Industrial Military Tech: Machine guns, poison mustard gas, tanks, airplanes, flamethrowers, and subterranean **trench warfare** along the Western Front causing catastrophic attrition.
* **The Interwar Crisis & Rise of Totalitarianism ($1919-1939$)**:
  * **Treaty of Versailles ($1919$)**: Imposed catastrophic 'War Guilt Clause' (Article 231) and astronomical financial reparations on Germany, breeding bitter revanchist resentment.
  * **The Great Depression ($1929$)**: Triggered by US stock market crash; global financial collapse collapsed international trade, discrediting democratic capitalism and paving the way for fascist dictators: Benito Mussolini in Italy and Adolf Hitler in Nazi Germany.
* **World War II ($1939-1945$) & The Holocaust**:
  * German **Blitzkrieg** conquered continental Europe; Axis powers (Germany, Italy, Japan) sought violent territorial Lebensraum and resource spheres (Greater East Asia Co-Prosperity Sphere).
  * Turning Point Battles: Stalingrad ($1942-1943$, destruction of German 6th Army in Russia); Midway ($1942$, US naval victory in the Pacific).
  * **The Holocaust**: Nazi industrialized state-sponsored genocide murdering $6$ million European Jews and millions of Roma, Soviet POWs, and disabled people in death camp gas chambers (Auschwitz-Birkenau).
  * Concluded in August $1945$ with US atomic bombings of Hiroshima and Nagasaki, inaugurating the Nuclear Age.`
      }
    ],
    workedExamples: [
      {
        title: 'Explaining Total War in 20th-Century Conflicts',
        topicRef: 'CED 7.3 Conducting World War I: Total War',
        question: 'Explain how both the British Empire and Nazi Germany practiced total war during the World Wars.',
        solutionSteps: [
          'Step 1: Define Total War: A military conflict in which nations mobilize all available economic, industrial, and human resources, blurring the line between military combatants and civilian targets.',
          'Step 2: Provide British World War I evidence: Britain instituted universal military conscription (DORA legislation), rationed domestic food, employed over 1 million women in munitions factories, and imposed a naval blockade starving German civilians.',
          'Step 3: Provide Nazi World War II evidence: Germany converted its entire industrial base to armaments, exploited millions of foreign slave laborers, and utilized V-2 rockets and strategic bombings against British civilian population centers.',
          'Step 4: Conclude: Both states mobilized every facet of domestic society and explicitly targeted civilian life and economic infrastructure to force total unconditional surrender.'
        ],
        finalAnswer: 'Both deployed civilian labor, rationed domestic economies, and targeted civilian populations through naval blockades and aerial bombardment.',
        apScoringTip: 'Remember that colonial troops played an indispensable role in Total Wars (e.g. over 1 million Indian soldiers fought for Britain in WWI).'
      }
    ],
    commonTraps: [
      'Confusing the League of Nations (formed after WWI, weak, failed to prevent WWII) with the United Nations (formed after WWII, stronger, includes permanent Security Council with veto power).',
      'Thinking the US entered WWI immediately. WWI began in 1914; the US entered in 1917 due to unrestricted German submarine warfare (Lusitania) and the Zimmermann Telegram.',
      'Assuming the Russian Revolution happened after WWI. The Bolsheviks overthrew the Tsar in 1917 and signed the Treaty of Brest-Litovsk to EXIT World War I early.'
    ],
    cramSheet: [
      'WWI Causes: MAIN (Militarism, Alliances, Imperialism, Nationalism).',
      'Total War: Full economic mobilization, female labor, propaganda, rationing, targeting civilians.',
      'Treaty of Versailles (1919): War Guilt Clause, crippling German reparations, League of Nations.',
      'Russian Revolution (1917): Lenin and Bolsheviks establish first communist state (USSR).',
      'WWII Holocaust: Nazi state-sponsored genocide of 6 million European Jews.'
    ]
  },

  // ==========================================
  // UNIT 8: COLD WAR & DECOLONIZATION (1900–PRESENT)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Cold War & Decolonization (1900–Present)',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'The post-WWII ideological struggle between the US and USSR reshaped global geopolitics, accompanied by historic decolonization movements across Africa and Asia.',
    keyTheorems: [
      {
        name: 'Cold War Superpower Geopolitics & Proxy Warfare',
        conditions: 'Bipolar ideological rivalry between Capitalism/Democracy (USA/NATO) and Communism/Authoritarianism (USSR/Warsaw Pact).',
        conclusion: 'Because Mutually Assured Destruction (MAD) prevented direct nuclear exchange between superpowers, conflict played out through Proxy Wars in developing nations: (1) Korean War (1950–1953: divided at 38th parallel), (2) Vietnam War (1955–1975: US defeat, unified communist state), (3) Soviet-Afghan War (1979–1989: Soviet defeat against US-backed Mujahideen), (4) Cuban Missile Crisis (1962).',
        apTip: 'The Non-Aligned Movement (Bandung Conference 1955: Sukarno of Indonesia, Nehru of India, Nasser of Egypt, Tito of Yugoslavia) sought to avoid taking sides with either superpower bloc.'
      },
      {
        name: 'Decolonization Pathways: Negotiated Independence vs. Armed Struggle',
        conditions: 'Collapse of European colonial empires after World War II.',
        conclusion: 'Colonies achieved freedom through two distinct paths: (1) Negotiated Independence: India from Britain (1947 via Gandhi’s nonviolent Satyagraha, followed by bloody Partition with Pakistan); Ghana from Britain (1957 under Kwame Nkrumah); (2) Armed Anti-Colonial Struggle: Algeria from France (FLN armed rebellion 1954–1962); Vietnam from France/USA (Ho Chi Minh).',
        apTip: 'Decolonization was frequently complicated by imperial borders causing ethnic violence (e.g. the 1947 Partition of India into Hindu India and Muslim Pakistan displacing 15 million people and killing over 1 million).'
      }
    ],
    formulas: [
      {
        name: 'Nuclear Deterrence Equation',
        latex: '\\text{MAD (Mutually Assured Destruction)} \\implies \\text{Direct Superpower War} = 0, \\; \\text{Proxy Wars} \\gg 0',
        explanation: 'Nuclear parity forced conflicts into proxy struggles across Latin America, Asia, and Africa.'
      }
    ],
    sections: [
      {
        heading: '1. Comparative Decolonization Case Studies Matrix',
        content: `Independence movements, leaders, and post-colonial challenges:

| Country / Colony | Colonial Power | Primary Independence Leader | Method of Liberation | Post-Colonial Conflict / Legacy |
| :--- | :--- | :--- | :--- | :--- |
| **India** | British Empire | **Mahatma Gandhi**, Jawaharlal Nehru | Nonviolent civil disobedience (Salt March), negotiation | **1947 Partition of India & Pakistan**; massive Hindu-Muslim refugee violence |
| **Ghana** | British Empire | **Kwame Nkrumah** | Peaceful parliamentary negotiation, strikes | Pan-Africanism, infrastructure development, eventual military coups |
| **Algeria** | France | National Liberation Front (FLN) | **Brutal guerrilla warfare** (1954–1962) | 1 million Algerian deaths; European settlers (*pieds-noirs*) fled to France |
| **Vietnam** | France & USA | **Ho Chi Minh** | Armed guerrilla resistance (Viet Minh, Viet Cong) | Defeated French at Dien Bien Phu (1954); unified Vietnam under communism (1975) |
| **South Africa** | Apartheid White Minority | **Nelson Mandela**, Desmond Tutu | ANC resistance, international economic boycotts | Ended Apartheid (1994); peaceful democratic transition |`
      }
    ,
      {
        heading: '2. Cold War Proxy Conflicts, Decolonization & Non-Alignment (CED 8.2-8.8)',
        content: `Bipolar superpower ideological struggles and anti-colonial national liberations:

* **Cold War Ideological Confrontation**:
  * Superpower rivalry between democratic capitalism (United States and NATO) and Marxist-Leninist state communism (Soviet Union and the Warsaw Pact).
  * **Nuclear Deterrence & MAD**: The doctrine of Mutually Assured Destruction prevented direct military confrontation between superpowers, diverting conflict into global **proxy wars**:
    * **Korean War ($1950-1953$)**: North Korean communist invasion backed by USSR/China opposed by US/UN forces; concluded with armistice along the 38th parallel.
    * **Vietnam War ($1955-1975$)**: Communist Viet Minh and Viet Cong led by Ho Chi Minh defeated French and US forces, reunifying Vietnam under communist governance.
    * **Soviet-Afghan War ($1979-1989$)**: Soviet invasion to prop up communist regime opposed by US-funded Islamic holy warriors (**Mujahideen**); became the 'Soviet Vietnam'.
* **Decolonization Pathways Across Afro-Eurasia**:
  * **Negotiated Independence**:
    * **India ($1947$)**: Mahatma Gandhi led the Indian National Congress in nonviolent civil disobedience (**satyagraha**); British departure triggered the violent **Partition of India** into Hindu-majority India and Muslim-majority Pakistan, displacing $15$ million people and killing an estimated 1 million.
    * **Ghana ($1957$)**: Kwame Nkrumah led peaceful negotiations, becoming the first sub-Saharan colony to gain independence, championing **Pan-Africanism**.
  * **Armed National Liberation**:
    * **Algerian War ($1954-1962$)**: National Liberation Front (FLN) fought a brutal guerrilla war against French settlers and military forces to achieve independence.
* **The Non-Aligned Movement (NAM)**:
  * Spearheaded by Prime Minister Jawaharlal Nehru (India), President Sukarno (Indonesia), President Gamal Abdel Nasser (Egypt), and President Josip Broz Tito (Yugoslavia) at the **1955 Bandung Conference**.
  * Collective coalition of developing Third World nations refusing to align as vassal states of either the American capitalist or Soviet communist bloc.`
      }
    ],
    workedExamples: [
      {
        title: 'Explaining the Collapse of the Soviet Union (1991)',
        topicRef: 'CED 8.8 End of the Cold War',
        question: 'Identify the key economic and political reforms introduced by Mikhail Gorbachev that accelerated the collapse of the USSR.',
        solutionSteps: [
          'Step 1: Identify Glasnost ("Openness"): Political policy ending state censorship, permitting free speech, public criticism of government failures, and freedom of the press.',
          'Step 2: Identify Perestroika ("Restructuring"): Economic policy introducing decentralization, limited private enterprise, and foreign capitalist investment to fix the stagnating Soviet command economy.',
          'Step 3: Analyze consequences: Glasnost exposed historical Soviet atrocities (Stalin’s purges, Chernobyl coverup), fueling nationalist uprisings in Soviet satellite states (Poland’s Solidarity, fall of Berlin Wall in 1989); Perestroika produced shortages without rapid recovery.',
          'Step 4: Conclude: The reforms unleashed democratic and nationalist forces the Soviet government could no longer control, culminating in the dissolution of the USSR in December 1991.'
        ],
        finalAnswer: 'Gorbachev’s policies of Glasnost (political openness) and Perestroika (economic restructuring) unintentionally dismantled authoritarian control, triggering the USSR’s collapse.',
        apScoringTip: 'Always cite Glasnost and Perestroika by name and define both terms on Cold War essays.'
      }
    ],
    commonTraps: [
      'Assuming the Cold War involved direct combat between American and Soviet soldiers. They never engaged in open direct military conflict; they fought exclusively via proxies.',
      'Thinking Gandhi wanted India and Pakistan to partition. Gandhi fiercely opposed Partition and pleaded for a unified secular Hindu-Muslim nation.',
      'Confusing the Cultural Revolution with the Great Leap Forward in Mao’s China. Great Leap Forward (1958) was disastrous collectivized agriculture (30 million starved); Cultural Revolution (1966) was ideological purge using Red Guards.'
    ],
    cramSheet: [
      'Cold War: Capitalism/Democracy (US/NATO) vs. Communism/Authoritarianism (USSR/Warsaw Pact).',
      'Proxy wars: Korean War, Vietnam War, Soviet-Afghan War, Cuban Missile Crisis.',
      'Non-Aligned Movement: Nehru (India), Nasser (Egypt), Sukarno (Indonesia) stayed neutral.',
      'Decolonization: India (Gandhi - nonviolence & Partition), Algeria (FLN - armed war), Ghana (Nkrumah - Pan-Africanism).',
      'Fall of USSR: Gorbachev’s Glasnost (openness) and Perestroika (economic restructuring).'
    ]
  },

  // ==========================================
  // UNIT 9: GLOBALIZATION (1900–PRESENT)
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Globalization (1900–Present)',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'Technological acceleration, international financial institutions, and multinational corporations created an unprecedentedly interconnected, consumerist, yet environmentally vulnerable globalized world.',
    keyTheorems: [
      {
        name: 'Technological Proliferation and Economic Globalization',
        conditions: 'Late 20th and early 21st-century global economic integration.',
        conclusion: 'Rapid advancements in transportation (commercial aviation, standardized shipping containers) and information communication technology (the Internet, cellular networks) drastically reduced trade friction. Neoliberal policies (Reagan, Thatcher) promoted free trade, deregulation, and privatization, supported by supranational bodies (World Trade Organization, IMF, World Bank).',
        apTip: 'Standardized shipping containers (invented by Malcolm McLean) are an elite evidence point: they cut cargo loading costs by over 90%, enabling transoceanic consumer supply chains.'
      },
      {
        name: 'The Anthropocene and Environmental Degradation',
        conditions: 'Global population growth exceeding 8 billion and explosive industrial carbon emissions.',
        conclusion: 'Human activity has altered Earth’s geology and ecosystems (the Anthropocene). Consequences include: (1) Greenhouse gas emissions accelerating anthropogenic climate change; (2) Deforestation in the Amazon and Southeast Asia; (3) Ocean acidification and microplastic contamination; (4) Freshwater depletion and desertification.',
        apTip: 'International treaties like the Kyoto Protocol (1997) and Paris Climate Accord (2015) demonstrate multilateral diplomatic attempts to mitigate global environmental crises.'
      }
    ],
    formulas: [
      {
        name: 'Global Interdependence Equation',
        latex: '\\text{Globalization} = \\text{Instant Digital Communication} + \\text{Global Supply Chains} + \\text{Multilateral Governance}',
        explanation: 'Fosters global cultural diffusion, economic growth, and shared transnational crises.'
      }
    ],
    sections: [
      {
        heading: '1. Technological, Health, and Cultural Innovations of Globalization',
        content: `Major global advances and challenges:

| Domain | 20th/21st-Century Innovations | Positive Global Impact | Negative Disruption / Critique |
| :--- | :--- | :--- | :--- |
| **Communication & Tech** | Internet, smartphones, social media, satellite telecommunications | Instantaneous knowledge exchange, remote work, citizen journalism | Algorithmic misinformation, digital divide, cybersecurity threats |
| **Agriculture & Energy** | **The Green Revolution** (high-yield dwarf wheat, synthetic fertilizers, irrigation) | Dramatically expanded global food supply, prevented famines in India/Mexico | Chemical runoff, pesticide dependency, groundwater depletion, loss of heirloom crops |
| **Medicine & Health** | **Antibiotics (Penicillin)**, vaccines (polio, COVID-19), artificial hearts | Doubled human life expectancy, eradicated smallpox | Antibiotic-resistant superbugs, unequal vaccine access between wealthy and developing nations |
| **Culture & Society** | Global pop culture (Hollywood, K-Pop, anime, Bollywood), global human rights | Spread of universal human rights (UN Universal Declaration), feminist liberation | Cultural homogenization ("Americanization"), loss of indigenous languages |`
      }
    ,
      {
        heading: '2. Technological Interconnectedness, Global Governance & Anthropocene (CED 9.1-9.9)',
        content: `21st-century globalization, multilateral institutions, and environmental transformations:

* **Technological Proliferation & Economic Integration**:
  * Rapid communication via the **World Wide Web, smartphones, and fiber-optic cables** enabled instant global financial transactions and decentralized corporate workflows.
  * Commercial aviation and standardized shipping containers slashed transportation costs, fostering multinational global supply chains.
  * **Free-Market Neoliberalism**: Economic policies championed by Ronald Reagan and Margaret Thatcher promoting deregulation, privatization of state industries, and reduced tariffs via the **World Trade Organization (WTO)** and trade pacts (NAFTA/USMCA).
* **Global Governance & Universal Human Rights**:
  * **United Nations (UN)**: Established in $1945$ following League of Nations failure; created the **Universal Declaration of Human Rights (1948)** asserting universal rights regardless of nationality, race, or sex.
  * Multilateral Institutions: International Monetary Fund (IMF) and World Bank financing international economic development and structural adjustment programs.
* **Global Environmental Challenges & The Anthropocene**:
  * **The Anthropocene Epoch**: Geological era defined by human industrial activity becoming the dominant influence on Earth's climate, atmosphere, and ecosystems.
  * Escalating global challenges: Fossil fuel greenhouse gas emissions causing climate change, ocean acidification, deforestation in the Amazon basin, plastic pollution, and the Sixth Mass Extinction.
  * Global environmental cooperation: **Kyoto Protocol ($1997$)** and **Paris Climate Agreement ($2015$)** establishing binding emissions targets to limit global temperature increases.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating the Impacts of the Green Revolution',
        topicRef: 'CED 9.1 Advances in Technology and Exchange',
        question: 'Explain one major positive impact and one major negative criticism of the Green Revolution in the late 20th century.',
        solutionSteps: [
          'Step 1: Identify Green Revolution: Norman Borlaug bred high-yield, disease-resistant dwarf wheat varieties, coupled with chemical fertilizers, pesticides, and mechanized irrigation in the 1960s.',
          'Step 2: Positive impact: Drastically increased grain yields in developing nations like India, Pakistan, and Mexico, saving an estimated 1 billion people from starvation and supporting rapid urbanization.',
          'Step 3: Negative criticism: Required massive capital investment in tractors and chemicals, driving small subsistence farmers into debt and forcing migration to urban slums; heavy synthetic fertilizer runoff caused aquatic dead zones (eutrophication).',
          'Step 4: Conclude: The Green Revolution averted catastrophic famine but created environmental degradation and socioeconomic inequality for smallholder farmers.'
        ],
        finalAnswer: 'Positively prevented widespread famine via crop yields; negatively caused environmental pollution and bankrupted small non-mechanized farmers.',
        apScoringTip: 'The Green Revolution is the single most frequently tested technological development in Unit 9.'
      }
    ],
    commonTraps: [
      'Confusing the Green Revolution with modern environmentalism. The Green Revolution was an AGRICULTURAL chemical/genetic yield boom in the 1960s, NOT an environmental conservation movement!',
      'Thinking diseases disappeared in the 20th century. While infectious diseases declined in the West, diseases of poverty (Malaria, Tuberculosis, Cholera) persist, alongside lifestyle diseases (Heart Disease, Alzheimer’s).',
      'Assuming globalization only flows from West to East. Cultural exchange flows in all directions (e.g. K-Pop from Korea, Yoga and Bollywood from India, Anime from Japan).'
    ],
    cramSheet: [
      'Green Revolution (Norman Borlaug): High-yield crops, synthetic fertilizer, saved 1B from famine, caused chemical runoff.',
      'Medical breakthroughs: Polio vaccine (Salk), antibiotics (Penicillin - Fleming), increased human life expectancy.',
      'Neoliberal economic policies: Free trade, deregulation, privatization (Reagan, Thatcher).',
      'Global organizations: United Nations (UN), World Trade Organization (WTO), World Bank.',
      'Anthropocene: Human-driven climate change, greenhouse gas emissions, biodiversity loss.'
    ]
  }
];
