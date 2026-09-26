// AP Human Geography (APHG) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–7)
// Each level covers authentic geographical models, geospatial concepts, spatial theories, and AP traps.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_HUMAN_GEOGRAPHY_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Thinking Geographically',
    shortTitle: 'Unit 1: Geospatial',
    description: 'Geospatial tech (GIS, GPS, remote sensing), spatial concepts, scales of analysis, and formal/functional/vernacular regions',
    examWeight: '8–10% of AP Exam',
    biome: {
      name: 'Cartographer’s Coast & GIS Archipelago',
      icon: '🗺️',
      accentColor: '#0284C7',
      secondaryColor: '#0369A1',
      groundGradient: 'from-sky-100 via-teal-50 to-emerald-100',
      cardBorder: 'border-sky-500',
      trailColor: '#0284c7',
      nodeRing: 'ring-sky-400/40',
      skyTint: 'from-sky-50 to-teal-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'aphg-u1-l1',
        topicNumber: 'Topic 1.1',
        name: 'Map Projections & Distortions',
        subtitle: 'Mercator, Peters, Robinson & distortion types',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg1-l1-q1',
            stem: 'Which statement accurately describes the main limitation of the Mercator map projection?',
            options: [
              'It severely distorts land area at high latitudes near the poles while preserving shape and direction.',
              'It distorts compass directions while keeping landmass sizes strictly accurate.',
              'It is an interrupted projection that splits ocean basins.',
              'It can only be used to map local city neighborhoods.'
            ],
            correctIndex: 0,
            explanation: 'The Mercator projection is conformal: lines of latitude and longitude intersect at 90-degree angles, preserving direction for nautical navigation, but area is massively exaggerated towards the North and South Poles (making Greenland appear larger than Africa, despite Africa being 14x larger).',
            distractorTip: 'Remember: All 2D maps have distortion. Mercator distorts AREA/SIZE, while Gall-Peters distorts SHAPE.'
          },
          {
            id: 'hg1-l1-q2',
            stem: 'A choropleth map uses which technique to represent geographical data?',
            options: [
              'Different color shading or patterns to indicate categorical or quantitative values per predefined region.',
              'Dots of equal size where each dot represents a specific frequency of occurrence.',
              'Distorting the geographical size of countries proportional to the statistical value being mapped.',
              'Contour lines connecting points of equal atmospheric pressure or elevation.'
            ],
            correctIndex: 0,
            explanation: 'Choropleth maps use color gradations or shading within defined political/statistical boundaries (like states or counties) to visualize density or rates.',
            distractorTip: 'Cartograms distort shape/size; dot density maps use dots; isoline maps connect equal values.'
          },
          {
            id: 'hg1-l1-q3',
            stem: 'Why might a cartographer choose the Robinson projection over the Mercator projection for an introductory world geography textbook?',
            options: [
              'It visually balances distortions of shape, area, distance, and direction for a visually pleasing global overview.',
              'It has zero distortion of both area and shape simultaneously.',
              'It preserves exact compass bearings for long-distance marine navigators.',
              'It portrays landmasses as flat polygons without curved meridian lines.'
            ],
            correctIndex: 0,
            explanation: 'The Robinson projection is a compromise projection. It compromises on all four geometric properties (shape, area, distance, direction) so that none are completely distorted, producing an aesthetically balanced classroom map.',
            distractorTip: 'AP Exam Trap: No flat map can have zero distortion because projecting a 3D sphere onto a 2D plane always distorts at least one geometric property.'
          }
        ]
      },
      {
        id: 102,
        unitIndex: 1,
        levelNumber: 2,
        uniqueKey: 'aphg-u1-l2',
        topicNumber: 'Topic 1.2 & 1.3',
        name: 'Geospatial Technologies & Spatial Data',
        subtitle: 'GIS layering, GPS navigation, and Remote Sensing satellites',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg1-l2-q1',
            stem: 'Urban planners combine layers of soil drainage, flood zones, transportation corridors, and zoning boundaries to select a hospital site. Which technology are they utilizing?',
            options: [
              'Geographic Information Systems (GIS)',
              'Global Positioning System (GPS)',
              'Remote Sensing satellite photography alone',
              'Photogrammetric compass surveys'
            ],
            correctIndex: 0,
            explanation: 'GIS is a computer hardware and software system that captures, stores, analyzes, and overlays multiple thematic spatial data layers to solve complex planning problems.',
            distractorTip: 'GPS determines absolute location coordinates; Remote Sensing gathers data from afar (satellites/drones); GIS analyzes and layers data.'
          },
          {
            id: 'hg1-l2-q2',
            stem: 'Which of the following is the best example of quantitative geographic data collected through remote sensing?',
            options: [
              'Multispectral infrared satellite scans measuring Amazon rainforest canopy loss over five years.',
              'Interview transcripts from local farmers discussing climate changes.',
              'Field sketches drawn by an architectural historian.',
              'Census surveyor questionnaires asking for household language preferences.'
            ],
            correctIndex: 0,
            explanation: 'Remote sensing refers to acquiring data about Earth\'s surface from satellites, planes, or drones without physical contact. Satellite imagery measuring deforestation provides measurable numerical (quantitative) data.',
            distractorTip: 'Interviews and field sketches are qualitative data; satellite sensors generate quantitative spatial pixels.'
          },
          {
            id: 'hg1-l2-q3',
            stem: 'A retail chain uses GPS location data from shoppers\' smartphones to map the distance customers travel to visit a flagship store. This spatial analysis specifically examines:',
            options: [
              'The market threshold and range of a commercial service.',
              'Environmental determinism.',
              'Vernacular regional identity.',
              'Relocation cultural assimilation.'
            ],
            correctIndex: 0,
            explanation: 'Mapping customer travel distance evaluates the "range" (maximum distance people are willing to travel for a good or service) and "threshold" (minimum number of customers needed to remain profitable).',
            distractorTip: 'Central Place Theory concepts (range and threshold) are frequently tested in spatial business applications.'
          }
        ]
      },
      {
        id: 103,
        unitIndex: 1,
        levelNumber: 3,
        uniqueKey: 'aphg-u1-l3',
        topicNumber: 'Topic 1.4 & 1.5',
        name: 'Spatial Concepts & Human-Environment Interaction',
        subtitle: 'Distance decay, space-time compression & possibilism',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg1-l3-q1',
            stem: 'High-speed internet, commercial aviation, and fiber-optic communication have reduced the friction of distance between Tokyo and New York. This phenomenon is known as:',
            options: [
              'Space-time compression',
              'Environmental determinism',
              'Distance decay',
              'Hierarchical diffusion'
            ],
            correctIndex: 0,
            explanation: 'David Harvey coined "space-time compression" to explain how technological innovations in transportation and telecommunications dramatically reduce the travel/communication time between distant places, making the world feel smaller.',
            distractorTip: 'Distance decay states interaction decreases as distance increases; space-time compression counteracts distance decay via technology.'
          },
          {
            id: 'hg1-l3-q2',
            stem: 'Which scenario best demonstrates the theory of Possibilism in human geography?',
            options: [
              'Agriculturalists in Dubai constructing air-conditioned indoor hydroponic farms and desalination plants to produce crops in an arid climate.',
              'A society remaining strictly pastoral nomads because their desert climate makes agriculture impossible.',
              'The claim that tropical climates cause human populations to become lazy and technologically backwards.',
              'A coastline community subsisting entirely on raw fish due to local coastal geography.'
            ],
            correctIndex: 0,
            explanation: 'Possibilism argues that while the physical environment may set initial limitations, humans possess the agency, technology, and culture to adapt, innovate, and overcome environmental constraints.',
            distractorTip: 'Environmental determinism argued climate dictated culture; modern geography rejects determinism in favor of possibilism.'
          },
          {
            id: 'hg1-l3-q3',
            stem: 'A student notices that foot traffic to a local bakery drops by 80% for households located more than 3 miles away. This pattern directly illustrates:',
            options: [
              'Distance decay',
              'Stimulus diffusion',
              'Toponymy',
              'Cultural divergence'
            ],
            correctIndex: 0,
            explanation: 'Distance decay is the geographic principle stating that interaction between two locales decreases as the physical distance between them increases.',
            distractorTip: 'Remember the inverse relationship: as physical distance increases, spatial interaction decays.'
          }
        ]
      },
      {
        id: 104,
        unitIndex: 1,
        levelNumber: 4,
        uniqueKey: 'aphg-u1-l4',
        topicNumber: 'Topic 1.6 & 1.7',
        name: 'Scales of Analysis & Regional Types',
        subtitle: 'Formal, Functional, and Vernacular regions',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg1-l4-q1',
            stem: 'Which of the following is the best example of a Functional (Nodal) region?',
            options: [
              'The delivery area of a local pizzeria centered on its kitchen location.',
              'The state boundary of Texas defined by legislative statute.',
              'The "American Midwest" defined by informal cultural perceptions.',
              'The French-speaking territory of Quebec where everyone shares a common language.'
            ],
            correctIndex: 0,
            explanation: 'A functional (nodal) region is organized around a focal point or node (the pizzeria) and is held together through functional interactions or transport/delivery links that diminish towards the periphery.',
            distractorTip: 'Texas is Formal (legally defined); The Midwest is Vernacular/Perceptual; French-speaking area is Formal (uniform cultural trait).'
          },
          {
            id: 'hg1-l4-q2',
            stem: 'A map displaying aggregate national GDP masks severe regional poverty in rural provinces. Which geographical concept explains why the national map is misleading?',
            options: [
              'Scale of analysis (generalization at higher scales obscures local disparities).',
              'Environmental possibilism.',
              'Friction of distance.',
              'Vernacular regionalism.'
            ],
            correctIndex: 0,
            explanation: 'Scale of analysis is critical: national-scale data generalizes numbers across an entire country, smoothing out and hiding significant local or regional inequalities.',
            distractorTip: 'AP Exam Tip: Changing the scale of inquiry changes the conclusions you can draw from spatial data!'
          },
          {
            id: 'hg1-l4-q3',
            stem: 'The concept of "The American South" or "The Cotton Belt" where boundaries are not legally defined but based on shared mental maps and dialect is a:',
            options: [
              'Perceptual / Vernacular region',
              'Formal / Uniform region',
              'Functional / Nodal region',
              'Administrative region'
            ],
            correctIndex: 0,
            explanation: 'A perceptual or vernacular region exists in people\'s shared cultural identity, folklore, and mental maps without formally surveyed boundaries.',
            distractorTip: 'Vernacular regions vary from person to person (e.g. some include Texas in "the South", others consider it Southwestern).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Population & Migration Patterns',
    shortTitle: 'Unit 2: Population',
    description: 'Demographic Transition Model (DTM Stages 1-5), population pyramids, Malthusian theory, push/pull factors, and refugees',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Delta of Demographics & Migrant Crossings',
      icon: '👥',
      accentColor: '#10B981',
      secondaryColor: '#059669',
      groundGradient: 'from-emerald-100 via-teal-50 to-emerald-200',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-teal-50/30'
    },
    levels: [
      {
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'aphg-u2-l1',
        topicNumber: 'Topic 2.1 & 2.2',
        name: 'Population Density Measures',
        subtitle: 'Arithmetic, Physiological, and Agricultural density',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg2-l1-q1',
            stem: 'Country X has a high physiological density and a very low agricultural density. What does this reveal about its agricultural structure?',
            options: [
              'It has limited arable land, but farming is highly mechanized with few farmers per unit of farmable land.',
              'Most of the population works as subsistence peasant farmers.',
              'The country has abundant uninhabited fertile plains.',
              'It suffers from severe underpopulation and low food production.'
            ],
            correctIndex: 0,
            explanation: 'Physiological density is total population divided by arable land (high = heavy pressure on farmable land). Agricultural density is farmers divided by arable land (low = few farmers, indicating modern mechanization like in Japan or the US).',
            distractorTip: 'High physiological + low agricultural density is the classic signature of an advanced, industrialized country with limited land.'
          },
          {
            id: 'hg2-l1-q2',
            stem: 'How is Arithmetic Population Density calculated?',
            options: [
              'Total population divided by total land area.',
              'Total population divided by arable (farmable) land.',
              'Number of farmers divided by arable land area.',
              'Number of live births per 1,000 citizens per year.'
            ],
            correctIndex: 0,
            explanation: 'Arithmetic density is the crude total population divided by total land area (e.g. people per square kilometer).',
            distractorTip: 'Arithmetic density can be misleading because it averages desert, mountains, and uninhabitable terrain with urban centers.'
          },
          {
            id: 'hg2-l1-q3',
            stem: 'Egypt’s arithmetic density is approximately 100 people/km², but its physiological density exceeds 2,500 people/km². Why is there such a massive gap?',
            options: [
              'Over 95% of Egypt\'s territory is uninhabitable desert; virtually the entire population is squeezed along the fertile Nile River valley.',
              'Egypt has an extremely high infant mortality rate.',
              'The Egyptian government encourages pro-natalist immigration from North Africa.',
              'Egyptian farmers rely exclusively on nomadic pastoralism.'
            ],
            correctIndex: 0,
            explanation: 'Because only a narrow strip along the Nile River is arable land, the ratio of total population to arable land (physiological density) is astronomical compared to its total desert territory.',
            distractorTip: 'Whenever physiological density is vastly higher than arithmetic density, look for desert or mountainous terrain!'
          }
        ]
      },
      {
        id: 202,
        unitIndex: 2,
        levelNumber: 2,
        uniqueKey: 'aphg-u2-l2',
        topicNumber: 'Topic 2.4 - 2.6',
        name: 'The Demographic Transition Model (DTM)',
        subtitle: 'Stages 1 through 5, CBR, CDR & natural increase',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg2-l2-q1',
            stem: 'What demographic change triggers the transition from Stage 1 to Stage 2 in the Demographic Transition Model (DTM)?',
            options: [
              'A sharp, dramatic drop in the Crude Death Rate (CDR) while the Crude Birth Rate (CBR) remains high.',
              'A rapid decline in the Crude Birth Rate due to female empowerment.',
              'An immediate surge in the Natural Increase Rate caused by zero death rates.',
              'Mass emigration of elderly retirees to urban areas.'
            ],
            correctIndex: 0,
            explanation: 'Stage 2 begins when improvements in sanitation, food supply, and basic medicine (Industrial Revolution in 1750s / Medical Revolution in 1950s) cause death rates to plummet while birth rates remain culturally high, causing explosive population growth.',
            distractorTip: 'Birth rates do NOT fall in Stage 2; they drop in Stage 3 as urban families choose smaller family sizes.'
          },
          {
            id: 'hg2-l2-q2',
            stem: 'A country has a Crude Birth Rate (CBR) of 9 per 1,000 and a Crude Death Rate (CDR) of 11 per 1,000. Which DTM stage is this country in?',
            options: [
              'Stage 5 (Declining population / Negative natural increase)',
              'Stage 1 (High stationary equilibrium)',
              'Stage 2 (Early expanding)',
              'Stage 3 (Late expanding)'
            ],
            correctIndex: 0,
            explanation: 'When the death rate exceeds the birth rate (CDR > CBR) in an affluent, highly urbanized society, the Natural Increase Rate turns negative (e.g. Japan, Germany, Italy), which defines Stage 5.',
            distractorTip: 'Stage 4 has CBR $\\approx$ CDR (ZPG: Zero Population Growth); Stage 5 has CDR > CBR (population decline).'
          },
          {
            id: 'hg2-l2-q3',
            stem: 'A population pyramid with an expansive, broad base that tapers rapidly towards the peak is typical of a country in which DTM stage?',
            options: [
              'Stage 2 (High birth rate, high youth dependency ratio, like Mali or Niger)',
              'Stage 4 (Rectangular / column-shaped, like Canada)',
              'Stage 5 (Inverted base / aging population, like Japan)',
              'Stage 1 (Extinct in the modern world)'
            ],
            correctIndex: 0,
            explanation: 'A wide pyramid base signifies a very high birth rate and a large percentage of youths under age 15 (high youth dependency ratio), characteristic of Stage 2 developing nations.',
            distractorTip: 'Expansive pyramid = Stage 2; Column/Beehive = Stage 4; Upside-down / narrow base = Stage 5.'
          }
        ]
      },
      {
        id: 203,
        unitIndex: 2,
        levelNumber: 3,
        uniqueKey: 'aphg-u2-l3',
        topicNumber: 'Topic 2.10 - 2.12',
        name: 'Migration Patterns, Push-Pull & Refugees',
        subtitle: 'Ravenstein\'s laws, forced vs voluntary, IDPs & asylum',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg2-l3-q1',
            stem: 'Which of the following aligns directly with E.G. Ravenstein\'s classical Laws of Migration?',
            options: [
              'Most migrants move only a short distance, and long-distance migrants tend to head for major economic centers.',
              'Families with elderly grandparents migrate internationally more frequently than young single adults.',
              'Urban dwellers are significantly more likely to migrate than rural agriculturalists.',
              'Long-distance migrants prefer moving to small rural farming hamlets.'
            ],
            correctIndex: 0,
            explanation: 'Ravenstein established that: (1) Most migrants travel short distances (distance decay), (2) Long-distance migrants target big commercial cities, (3) Economic factors drive most moves, and (4) Young single adults migrate more than families.',
            distractorTip: 'Ravenstein identified young adult males as historical international migrants, while modern migration has seen significant feminization.'
          },
          {
            id: 'hg2-l3-q2',
            stem: 'A family flees armed conflict in their hometown and relocates to a temporary camp in another province inside their own country. Under UN conventions, they are classified as:',
            options: [
              'Internally Displaced Persons (IDPs)',
              'Recognized international refugees',
              'Voluntary chain migrants',
              'Transnational guest workers'
            ],
            correctIndex: 0,
            explanation: 'An Internally Displaced Person (IDP) is forced to flee their home due to conflict or persecution but has NOT crossed an internationally recognized state boundary.',
            distractorTip: 'Crossing an international border is the legal requirement to be defined as a Refugee or Asylum Seeker.'
          },
          {
            id: 'hg2-l3-q3',
            stem: 'A migrant moves from Mexico to Los Angeles because their elder sibling already secured employment and housing there, paving the way. This is an example of:',
            options: [
              'Chain migration',
              'Step migration',
              'Transhumance',
              'Intervening obstacle'
            ],
            correctIndex: 0,
            explanation: 'Chain migration is the social process by which migrants from a particular town follow family members or kindred to a specific neighborhood, forming ethnic enclaves.',
            distractorTip: 'Step migration is moving in stages (farm to village to town to city); chain migration follows relatives.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Cultural Patterns & Processes',
    shortTitle: 'Unit 3: Culture',
    description: 'Diffusion mechanisms (contagious, hierarchical, stimulus), language families, universalizing vs ethnic religions, and cultural landscapes',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Plateau of Pilgrimages & Dialect Valleys',
      icon: '🕌',
      accentColor: '#8B5CF6',
      secondaryColor: '#6D28D9',
      groundGradient: 'from-purple-100 via-fuchsia-50 to-indigo-100',
      cardBorder: 'border-purple-500',
      trailColor: '#8b5cf6',
      nodeRing: 'ring-purple-400/40',
      skyTint: 'from-purple-50 to-indigo-50/30'
    },
    levels: [
      {
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'aphg-u3-l1',
        topicNumber: 'Topic 3.4',
        name: 'Types of Cultural Diffusion',
        subtitle: 'Relocation, contagious, hierarchical & stimulus',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg3-l1-q1',
            stem: 'When fast-food restaurants expanded into India, they replaced beef burgers with vegetarian McAloo Tikki patties to respect Hindu dietary customs. This is an example of:',
            options: [
              'Stimulus diffusion',
              'Contagious diffusion',
              'Relocation diffusion',
              'Maladaptive diffusion'
            ],
            correctIndex: 0,
            explanation: 'Stimulus diffusion occurs when an underlying concept or idea is adopted, but the specific characteristic is modified or adapted due to local cultural, religious, or environmental barriers.',
            distractorTip: 'Notice the adaptation: The burger concept diffused, but the meat ingredient was altered for local culture.'
          },
          {
            id: 'hg3-l1-q2',
            stem: 'A new viral dance moves across social media platforms like TikTok, spreading rapidly person-to-person across all social classes simultaneously. This is:',
            options: [
              'Contagious diffusion',
              'Hierarchical diffusion',
              'Relocation diffusion',
              'Stimulus diffusion'
            ],
            correctIndex: 0,
            explanation: 'Contagious diffusion is rapid, widespread diffusion of a characteristic throughout the population by direct person-to-person contact, without regard to social rank.',
            distractorTip: 'Hierarchical diffusion leaps from elite leaders or major urban hubs down to smaller communities.'
          },
          {
            id: 'hg3-l1-q3',
            stem: 'A luxury fashion trend appears first on Paris and Milan runways, spreads next to boutiques in New York and Tokyo, and months later reaches suburban shopping malls. This is:',
            options: [
              'Hierarchical diffusion',
              'Contagious diffusion',
              'Relocation diffusion',
              'Autonomous diffusion'
            ],
            correctIndex: 0,
            explanation: 'Hierarchical diffusion spreads from nodes of authority, power, or major world cities down the urban hierarchy to smaller peripheral towns.',
            distractorTip: 'Top-down spread = Hierarchical. Wave-like continuous spread = Contagious.'
          }
        ]
      },
      {
        id: 302,
        unitIndex: 3,
        levelNumber: 2,
        uniqueKey: 'aphg-u3-l2',
        topicNumber: 'Topic 3.6 & 3.7',
        name: 'Universalizing vs. Ethnic Religions',
        subtitle: 'Global proselytizing vs place-based sacred faiths',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg3-l2-q1',
            stem: 'Which pair consists strictly of Universalizing Religions that actively seek converts worldwide?',
            options: [
              'Christianity and Islam',
              'Hinduism and Judaism',
              'Shinto and Sikhism',
              'Judaism and Daoism'
            ],
            correctIndex: 0,
            explanation: 'Universalizing religions (Christianity, Islam, Buddhism, and Sikhism) have broad global appeal, a known individual founder, and actively proselytize to gain converts.',
            distractorTip: 'Hinduism and Judaism are Ethnic religions: tied to a specific ethnic group or geographical region, generally without active missionary conversion.'
          },
          {
            id: 'hg3-l2-q2',
            stem: 'Why is Hinduism classified as an Ethnic Religion rather than a Universalizing Religion?',
            options: [
              'It is deeply concentrated in the Indian subcontinent and does not traditionally deploy missionaries to convert outsiders.',
              'It has fewer than one million adherents globally.',
              'Its scriptures forbid anyone living outside India from practicing.',
              'It was established as an offshoot of Buddhism in the 18th century.'
            ],
            correctIndex: 0,
            explanation: 'Ethnic religions are closely identified with a particular ethnic group and place. Hinduism is the world\'s largest ethnic religion, centered primarily in India and Nepal without organized global missionary campaigns.',
            distractorTip: 'Ethnic religions can still be huge in total population (Hinduism has >1.2 billion followers).'
          },
          {
            id: 'hg3-l2-q3',
            stem: 'The presence of Spanish place names (e.g. San Francisco, Los Angeles, San Diego) throughout California is evidence of which geographical concept?',
            options: [
              'Sequent occupance (cultural landscape layers left by successive occupant groups).',
              'Environmental determinism.',
              'Syncretic language divergence.',
              'Reverse hierarchical assimilation.'
            ],
            correctIndex: 0,
            explanation: 'Derwent Whittlesey\'s "sequent occupance" describes how successive historical societies leave cultural imprints on a place, which combine to shape the contemporary cultural landscape.',
            distractorTip: 'Religious toponyms (Catholic saints) reflect early Spanish Franciscan missionary settlement.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Political Patterns & Processes',
    shortTitle: 'Unit 4: Political',
    description: 'Sovereignty, nation-states, stateless nations, boundaries/UNCLOS, gerrymandering, supranationalism (UN, EU), and devolution',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Citadel of Sovereignty & Maritime Straits',
      icon: '🏛️',
      accentColor: '#EF4444',
      secondaryColor: '#DC2626',
      groundGradient: 'from-red-100 via-rose-50 to-amber-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-rose-50 to-red-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'aphg-u4-l1',
        topicNumber: 'Topic 4.1 & 4.2',
        name: 'Nations, States & Stateless Nations',
        subtitle: 'Kurds, Palestinians, nation-states & sovereignty',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg4-l1-q1',
            stem: 'The Kurds are an ethnic group of over 30 million people spanning Turkey, Iraq, Iran, and Syria without their own sovereign homeland. They are best classified as a:',
            options: [
              'Stateless nation',
              'Nation-state',
              'Autonomous federal republic',
              'Sovereign microstate'
            ],
            correctIndex: 0,
            explanation: 'A stateless nation is a cultural group possessing national identity and shared heritage that lacks its own independent sovereign political state (e.g. Kurds, Palestinians, Basques).',
            distractorTip: 'A Nation is a cultural group; a State is a sovereign political territory. A Nation-State is when the two coincide perfectly (e.g. Japan, Iceland).'
          },
          {
            id: 'hg4-l1-q2',
            stem: 'Which country is the premier modern textbook example of a Nation-State?',
            options: [
              'Japan (over 98% of the population is ethnically Japanese with sovereign boundaries)',
              'Canada (divided between English and French Quebec)',
              'Belgium (divided between Flemish and Walloons)',
              'The United Kingdom (comprising England, Scotland, Wales, and Northern Ireland)'
            ],
            correctIndex: 0,
            explanation: 'A nation-state exists where political state borders correspond closely with a single dominant ethnic/cultural group. Japan\'s strict immigration history and 98%+ ethnic homogeneity make it the classic nation-state.',
            distractorTip: 'Canada, Belgium, and the UK are multinational states with distinct historic cultural nations.'
          },
          {
            id: 'hg4-l1-q3',
            stem: 'What is the fundamental difference between Sovereignty and Autonomy in political geography?',
            options: [
              'Sovereignty is full legal supreme control over internal and foreign affairs without external oversight; autonomy is partial self-governance granted by a central state.',
              'Autonomy is recognized by the UN, while sovereignty is only local.',
              'Sovereignty applies exclusively to islands.',
              'They are legally identical terms under international law.'
            ],
            correctIndex: 0,
            explanation: 'Sovereignty means complete political independence and ultimate legal authority. Autonomy (like Native American tribal reservations or Greenland within Denmark) is localized self-rule subject to higher state authority.',
            distractorTip: 'A region can be autonomous without being an internationally recognized sovereign state.'
          }
        ]
      },
      {
        id: 402,
        unitIndex: 4,
        levelNumber: 2,
        uniqueKey: 'aphg-u4-l2',
        topicNumber: 'Topic 4.5 & 4.6',
        name: 'UNCLOS Maritime Zones & Boundaries',
        subtitle: '12 nm territorial sea, 200 nm Exclusive Economic Zone (EEZ)',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg4-l2-q1',
            stem: 'Under the United Nations Convention on the Law of the Sea (UNCLOS), how far from a nation’s baseline does its Exclusive Economic Zone (EEZ) extend?',
            options: [
              '200 nautical miles (granting exclusive rights to fish, oil, and mineral resources)',
              '12 nautical miles',
              '24 nautical miles',
              '350 nautical miles universally'
            ],
            correctIndex: 0,
            explanation: 'Under UNCLOS: Territorial Sea = 12 nautical miles (full sovereign jurisdiction). Contiguous Zone = 24 nautical miles (customs, tax, immigration laws). EEZ = 200 nautical miles (exclusive rights to extract marine resources, minerals, and oil).',
            distractorTip: 'Do not confuse the 12-nautical-mile Territorial Sea with the 200-nautical-mile EEZ!'
          },
          {
            id: 'hg4-l2-q2',
            stem: 'The boundary drawn across Africa at the 1884–1885 Berlin Conference ignored existing ethnic groups and was established by European imperial powers. This is a:',
            options: [
              'Superimposed boundary',
              'Antecedent boundary',
              'Relic boundary',
              'Consequent boundary'
            ],
            correctIndex: 0,
            explanation: 'A superimposed boundary is forcibly drawn across an existing cultural landscape by outside powers with total disregard for indigenous cultural and ethnic divisions.',
            distractorTip: 'Antecedent = drawn before population settlement; Relic = no longer functions but visible (Berlin Wall); Consequent = drawn to accommodate cultural divisions.'
          },
          {
            id: 'hg4-l2-q3',
            stem: 'The Great Wall of China and the former border between East and West Germany are classic examples of which boundary type?',
            options: [
              'Relic boundary (no longer functioning as a legal border, but still visible on the cultural landscape)',
              'Antecedent boundary',
              'Subsequent boundary',
              'Superimposed boundary'
            ],
            correctIndex: 0,
            explanation: 'A relic boundary is a historical boundary that has ceased to function politically, but whose imprint, architecture, or economic differences remain visibly embedded in the cultural landscape.',
            distractorTip: 'The Berlin Wall is the most famous AP example of a relic boundary.'
          }
        ]
      },
      {
        id: 403,
        unitIndex: 4,
        levelNumber: 3,
        uniqueKey: 'aphg-u4-l3',
        topicNumber: 'Topic 4.7 & 4.9',
        name: 'Gerrymandering & Devolutionary Forces',
        subtitle: 'Packing/cracking districts & centrifugal vs centripetal',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg4-l4-q1',
            stem: 'In redistricting, "packing" refers to which political strategy?',
            options: [
              'Concentrating opposing party voters into as few legislative districts as possible to waste their surplus votes.',
              'Dispersing opposition voters thinly across many districts so they never achieve a majority.',
              'Ensuring districts follow county boundaries and geographic rivers.',
              'Assigning two representatives to each voting ward.'
            ],
            correctIndex: 0,
            explanation: 'Packing concentrates opposition supporters into one or two safe districts, sacrificing those seats but allowing the controlling party to win all surrounding districts. Cracking dilutes opposition voters across multiple districts.',
            distractorTip: 'Gerrymandering techniques: Packing = concentrated in one; Cracking = scattered to prevent a majority.'
          },
          {
            id: 'hg4-l4-q2',
            stem: 'Which factor represents a Centrifugal force that threatens state cohesion and fosters devolution?',
            options: [
              'Ethnocultural conflicts, regional economic disparities, and fragmented physical geography.',
              'A charismatic national leader and strong national pride during the Olympics.',
              'An efficient, unified transcontinental railway network.',
              'A single universal national language spoken by 100% of residents.'
            ],
            correctIndex: 0,
            explanation: 'Centrifugal forces (think "centrifugal / fleeing the center") pull people apart and destabilize states (e.g. ethnic strife, unequal wealth distribution). Centripetal forces ("seeking center") unite a country.',
            distractorTip: 'Centrifugal = Pulls apart (devolution/civil war); Centripetal = Binds together (patriotism).'
          },
          {
            id: 'hg4-l4-q3',
            stem: 'The creation of autonomous regional parliaments in Scotland, Wales, and Northern Ireland within the United Kingdom is an example of:',
            options: [
              'Devolution',
              'Supranationalism',
              'Irredentism',
              'Annexation'
            ],
            correctIndex: 0,
            explanation: 'Devolution is the transfer or delegation of power and decision-making authority from a central sovereign government to subnational regional administrations.',
            distractorTip: 'Supranationalism gives power UPWARD to organizations like the EU; Devolution grants power DOWNWARD to regional governments.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Agriculture & Rural Land-Use',
    shortTitle: 'Unit 5: Agriculture',
    description: 'Von Thünen spatial model, Green Revolution, subsistence vs commercial farming, agricultural hearths, and rural land survey systems',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Von Thünen Concentric Plains & Green Fields',
      icon: '🌾',
      accentColor: '#16A34A',
      secondaryColor: '#15803D',
      groundGradient: 'from-green-100 via-emerald-50 to-lime-100',
      cardBorder: 'border-green-500',
      trailColor: '#16a34a',
      nodeRing: 'ring-green-400/40',
      skyTint: 'from-green-50 to-lime-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'aphg-u5-l1',
        topicNumber: 'Topic 5.7 & 5.8',
        name: 'The Von Thünen Agricultural Model',
        subtitle: 'Concentric rings: Perishability & transport cost',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg5-l1-q1',
            stem: 'In the classic Von Thünen model, why is commercial dairy farming and market gardening located in Ring 1 closest to the central market city?',
            options: [
              'Milk and fresh produce are highly perishable and expensive to transport, commanding high bid-rent near the market.',
              'Cows require the cheapest remote grazing pastures.',
              'Forestry regulations prohibit timber harvesting near urban centers.',
              'Grain crops require higher municipal water pressures.'
            ],
            correctIndex: 0,
            explanation: 'Johann Heinrich von Thünen modeled rural land use based on transportation costs and land rent (Bid-Rent Theory). Perishable goods (dairy and fresh vegetables) must reach market quickly without spoiling, so farmers pay top dollar for Ring 1 proximity.',
            distractorTip: 'Ring 1 = Dairy & intensive garden; Ring 2 = Timber/Forest (heavy transport); Ring 3 = Extensive grains; Ring 4 = Livestock ranching.'
          },
          {
            id: 'hg5-l1-q2',
            stem: 'Why did Von Thünen place the Forest / Timber ring in Ring 2 immediately surrounding the market city in 1826?',
            options: [
              'Wood was essential for heating and construction, but its extreme weight made long-distance transport cost-prohibitive.',
              'Trees could only grow on flat municipal soils.',
              'Foresters were required to protect cities from enemy cavalry invasions.',
              'Wild cattle herds required shaded forests before slaughter.'
            ],
            correctIndex: 0,
            explanation: 'In the 19th century, firewood and lumber were heavy and bulky. Transporting heavy logs by horse-drawn cart over long distances was tremendously costly, placing forestry close to the urban core.',
            distractorTip: 'Modern refrigeration and highways modified Ring 1 and 2, but the underlying spatial logic of transport cost remains fundamental.'
          },
          {
            id: 'hg5-l1-q3',
            stem: 'Which agricultural activity is situated in the outermost ring of Von Thünen\'s model due to its extensive land requirements and low land rent?',
            options: [
              'Livestock ranching',
              'Market horticulture',
              'Firewood forestry',
              'Intensive greenhouse floriculture'
            ],
            correctIndex: 0,
            explanation: 'Livestock ranching requires vast grazing acreage (extensive agriculture) and can be conducted where land is cheapest. Animals can self-transport (walk) to market or slaughterhouses.',
            distractorTip: 'Intensive = high labor/capital per acre (near city); Extensive = low labor/capital per vast acre (far from city).'
          }
        ]
      },
      {
        id: 502,
        unitIndex: 5,
        levelNumber: 2,
        uniqueKey: 'aphg-u5-l2',
        topicNumber: 'Topic 5.4 & 5.5',
        name: 'The Green Revolution & Modern Agri-Business',
        subtitle: 'High-yield varieties (HYVs), Norman Borlaug & consequences',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg5-l2-q1',
            stem: 'What was the primary technological breakthrough of the Third Agricultural (Green) Revolution in the 1960s?',
            options: [
              'The development of high-yielding dwarf varieties of wheat and rice paired with synthetic chemical fertilizers and mechanized irrigation.',
              'The invention of the horse collar and crop rotation.',
              'The domestication of maize in Mesoamerica.',
              'The replacement of tractor machinery with manual ox plows.'
            ],
            correctIndex: 0,
            explanation: 'Led by Norman Borlaug, the Green Revolution bred high-yield semi-dwarf wheat and "miracle rice" (IR8) along with synthetic nitrogen fertilizers, chemical pesticides, and tube-well irrigation to avert famine in India and Mexico.',
            distractorTip: 'First Rev = Neolithic plant domestication; Second Rev = 18th-century crop rotation & seed drill; Third Rev = 20th-century Green Revolution (biotech/chemicals).'
          },
          {
            id: 'hg5-l2-q2',
            stem: 'Which unintended consequence is frequently cited as a negative ecological outcome of the Green Revolution?',
            options: [
              'Groundwater depletion from tube wells and soil salinization from intensive synthetic irrigation.',
              'A total collapse in global cereal grain production.',
              'Widespread desertification of European urban areas.',
              'A global revival of primitive slash-and-burn horticulture.'
            ],
            correctIndex: 0,
            explanation: 'Intensive chemical runoff causes eutrophication, heavy aquifer pumping depletes water tables (e.g. Punjab, India), and excessive irrigation in arid zones leads to soil salinization.',
            distractorTip: 'On AP FRQs, be prepared to give both a positive (prevented famine) and negative (chemical runoff / expensive seeds hurting small farmers).'
          },
          {
            id: 'hg5-l2-q3',
            stem: 'Which rural survey system produces long, narrow parcels of farmland granting every landowner direct access to a navigable river?',
            options: [
              'French long-lot system (prevalent in Louisiana and Quebec)',
              'English metes and bounds system',
              'US Public Land Survey Township and Range grid',
              'Nucleated circular village system'
            ],
            correctIndex: 0,
            explanation: 'The French long-lot system divided land into narrow strips extending back from waterways, ensuring all settlers had access to river trade and transport.',
            distractorTip: 'Metes and bounds uses natural landmarks (trees, boulders); Township & Range uses a 6x6 mile grid square.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Cities & Urban Land-Use',
    shortTitle: 'Unit 6: Urban',
    description: 'Burgess Concentric Zone, Hoyt Sector, Harris-Ullman Multiple Nuclei, Central Place Theory (Christaller), gentrification, and New Urbanism',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Skyline Metropolis & Concentric Rings',
      icon: '🏙️',
      accentColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      groundGradient: 'from-blue-100 via-indigo-50 to-slate-100',
      cardBorder: 'border-blue-500',
      trailColor: '#3b82f6',
      nodeRing: 'ring-blue-400/40',
      skyTint: 'from-blue-50 to-slate-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'aphg-u6-l1',
        topicNumber: 'Topic 6.4 & 6.5',
        name: 'Classic North American Urban Models',
        subtitle: 'Burgess Concentric, Hoyt Sector & Harris-Ullman Nuclei',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg6-l1-q1',
            stem: 'Homer Hoyt’s Sector Model of urban structure argues that city growth expands along which geographical feature?',
            options: [
              'Wedges along major transportation corridors (railroads, highways, and streetcar lines) radiating from the CBD.',
              'Concentric circular rings expanding uniformly in all directions.',
              'Random clusters surrounding suburban shopping malls with no connection to transit.',
              'A single linear spine connecting the central market to squatter settlements.'
            ],
            correctIndex: 0,
            explanation: 'Hoyt (1939) observed that cities grow in pie-shaped wedges/sectors along transit lines. Industrial factories follow rail lines; high-income housing clusters along pleasant high-ground transit corridors.',
            distractorTip: 'Burgess = Concentric rings; Hoyt = Sectors/Wedges along transit; Harris-Ullman = Multiple Nuclei with nodes (airports, universities).'
          },
          {
            id: 'hg6-l1-q2',
            stem: 'In the Burgess Concentric Zone Model (1925), which zone immediately surrounds the central business district (CBD)?',
            options: [
              'Zone of Transition (containing light industry, warehouses, and low-income immigrant tenements).',
              'Zone of Better Residences.',
              'Commuter Zone of high-end suburban estates.',
              'Extensive agricultural farmland.'
            ],
            correctIndex: 0,
            explanation: 'Zone 2 is the "Zone of Transition" where residential housing deteriorates as business/industrial expansion encroaches, creating cheap rental housing for incoming immigrant waves.',
            distractorTip: 'Burgess Zone order from inside out: (1) CBD, (2) Transition, (3) Independent Workers, (4) Better Residences, (5) Commuter.'
          },
          {
            id: 'hg6-l1-q3',
            stem: 'The Harris-Ullman Multiple Nuclei Model (1945) best describes modern polycentric cities (like Los Angeles) because:',
            options: [
              'Automobile transport enabled cities to develop multiple specialized activity nodes (airports, industrial parks, shopping hubs) rather than relying solely on one CBD.',
              'Every citizen must commute to one central downtown skyscraper.',
              'All factories are legally required to locate on riverbanks.',
              'Railroad tracks only service residential commuter rings.'
            ],
            correctIndex: 0,
            explanation: 'Post-WWII automobile dominance freed cities from rail lines, spawning multiple distinct commercial and industrial nuclei across sprawling metropolitan areas.',
            distractorTip: 'Notice the transport link: Streetcars made Hoyt Sectors; Automobiles made Multiple Nuclei and Edge Cities.'
          }
        ]
      },
      {
        id: 602,
        unitIndex: 6,
        levelNumber: 2,
        uniqueKey: 'aphg-u6-l2',
        topicNumber: 'Topic 6.10 & 6.11',
        name: 'Gentrification, Redlining & New Urbanism',
        subtitle: 'Displacement, mixed-use zoning & walkable communities',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg6-l2-q1',
            stem: 'What is the primary socio-economic critique of Gentrification in inner-city neighborhoods?',
            options: [
              'Rising property taxes and rents displace longtime lower-income residents and historic small businesses.',
              'It causes citywide increases in abandoned derelict structures.',
              'It forces suburban commuters to build private toll highways.',
              'It triggers white flight to peripheral rural towns.'
            ],
            correctIndex: 0,
            explanation: 'While gentrification renovates housing and increases municipal tax revenues, higher property values displace vulnerable lower-income tenants who can no longer afford rent.',
            distractorTip: 'On AP FRQs, analyze gentrification through both lenses: infrastructure renewal vs resident displacement.'
          },
          {
            id: 'hg6-l2-q2',
            stem: 'The illegal discriminatory practice where banks refused to issue mortgages to minority buyers within specific red-bordered neighborhood maps is called:',
            options: [
              'Redlining',
              'Blockbusting',
              'Infilling',
              'Smart Growth'
            ],
            correctIndex: 0,
            explanation: 'Redlining was the systemic denial of mortgages and insurance by financial institutions to communities of color, cementing structural urban disinvestment for decades.',
            distractorTip: 'Redlining = banks refusing loans; Blockbusting = realtors exploiting racial fears to buy low and sell high.'
          },
          {
            id: 'hg6-l2-q3',
            stem: 'New Urbanism advocates for which set of urban planning principles?',
            options: [
              'Walkable pedestrian-friendly streets, mixed-use residential/commercial zoning, and transit-oriented development.',
              'Single-family detached homes on 1-acre lots connected only by high-speed expressways.',
              'Complete industrial segregation with no sidewalks or public parks.',
              'Demolishing city centers to create surface parking lots.'
            ],
            correctIndex: 0,
            explanation: 'New Urbanism promotes walkable neighborhoods with mixed-use buildings (shops on ground floor, apartments above), diverse housing types, and access to mass transit to combat suburban sprawl.',
            distractorTip: 'New Urbanism = walkable + mixed-use + transit; Suburban sprawl = car-dependent + single-use zoning.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Industrial & Economic Development',
    shortTitle: 'Unit 7: Development',
    description: 'Wallerstein World Systems (Core/Periphery), Rostow 5 Stages of Economic Growth, Weber Least Cost Theory, HDI, and UN SDGs',
    examWeight: '12–17% of AP Exam',
    biome: {
      name: 'Global Supply Chain Archipelago & Industrial Ports',
      icon: '🏭',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-orange-50 to-amber-200',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'aphg-u7-l1',
        topicNumber: 'Topic 7.2',
        name: 'Alfred Weber\'s Least Cost Theory',
        subtitle: 'Bulk-gaining vs Bulk-reducing industrial location',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg7-l1-q1',
            stem: 'Why are soft-drink bottling plants (e.g. Coca-Cola) located close to consumer markets rather than raw material sources?',
            options: [
              'Water is heavy and ubiquitous; adding water makes the final beverage heavier than the syrup concentrate (bulk-gaining industry).',
              'Soft drinks require special volcanic spring water found only in central cities.',
              'Bottling plants must be near copper smelting mines.',
              'Soft drinks are a bulk-reducing commodity.'
            ],
            correctIndex: 0,
            explanation: 'A bulk-gaining (weight-gaining) industry gains weight or volume during production (syrup + water = heavy bottle). To minimize expensive transport costs of the heavy finished good, the factory locates near the consumer market.',
            distractorTip: 'Bulk-gaining (soda, auto assembly) = near MARKET; Bulk-reducing (paper mill, copper smelting) = near RAW MATERIALS.'
          },
          {
            id: 'hg7-l1-q2',
            stem: 'A paper mill processes heavy timber logs into lightweight reams of printer paper. Under Weber\'s theory, where should this factory locate?',
            options: [
              'Close to the forest raw material source, because the manufacturing process is bulk-reducing.',
              'Close to urban bookstores and corporate offices in the CBD.',
              'At a midpoint airport hub regardless of forest location.',
              'On an offshore oil tanker platform.'
            ],
            correctIndex: 0,
            explanation: 'Paper manufacturing is bulk-reducing (weight-losing). Heavy logs lose moisture and bulk during pulping. To avoid shipping useless heavy bark and wood waste, the factory locates next to the forest.',
            distractorTip: 'Bulk-reducing industries locate near raw materials to save on transporting heavy inputs.'
          },
          {
            id: 'hg7-l1-q3',
            stem: 'What three variable costs does Alfred Weber analyze to determine optimal industrial location?',
            options: [
              'Transportation costs (most important), labor costs, and agglomeration economies.',
              'Patent fees, carbon taxes, and billboard advertising.',
              'Currency exchange rates, tariffs, and executive salaries.',
              'Soil pH, rainfall, and sunshine hours.'
            ],
            correctIndex: 0,
            explanation: 'Weber\'s Least Cost Theory balances: (1) Transportation (minimizing distance of heavy inputs/outputs), (2) Labor (cheap labor can justify longer shipping), and (3) Agglomeration (clustering near related firms to share infrastructure).',
            distractorTip: 'Weber identified transportation as the single most critical location determinant.'
          }
        ]
      },
      {
        id: 702,
        unitIndex: 7,
        levelNumber: 2,
        uniqueKey: 'aphg-u7-l2',
        topicNumber: 'Topic 7.5 & 7.6',
        name: 'Rostow\'s Stages of Growth vs. Wallerstein\'s World Systems',
        subtitle: 'Linear development vs structural core/periphery dependence',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'hg7-l2-q1',
            stem: 'Which statement accurately describes a major critique of Walt Rostow’s 5-Stage Modernization Model?',
            options: [
              'It assumes all countries develop along the exact same Western European linear path, ignoring colonial exploitation and global resource constraints.',
              'It claims that no country can ever industrialize.',
              'It argues that agriculture is more profitable than high-tech manufacturing.',
              'It was designed exclusively for communist planned economies.'
            ],
            correctIndex: 0,
            explanation: 'Rostow assumed every country moves through 5 linear stages (Traditional Society $\\to$ Preconditions $\\to$ Take-off $\\to$ Drive to Maturity $\\to$ High Mass Consumption). Critics note peripheral countries face unequal global trade terms that make Western-style take-off nearly impossible without structural change.',
            distractorTip: 'Rostow = Optimistic internal linear growth; Wallerstein = Unequal structural dependency between rich and poor.'
          },
          {
            id: 'hg7-l2-q2',
            stem: 'Under Immanuel Wallerstein’s World Systems Theory, what is the economic relationship between Core and Periphery countries?',
            options: [
              'Core nations exploit cheap labor and extract raw natural resources from periphery nations, selling back high-profit manufactured goods.',
              'Periphery nations control all global high-tech intellectual property and financial capital.',
              'Core and periphery nations trade agricultural raw commodities on equal barter terms.',
              'Periphery nations collect tariffs from core nations to maintain global dominance.'
            ],
            correctIndex: 0,
            explanation: 'Wallerstein describes a spatial division of labor: Core nations (high income, advanced technology) extract cheap raw materials and low-cost labor from the Periphery, reinforcing economic dependency.',
            distractorTip: 'Semi-periphery nations (e.g. Brazil, India, China, Mexico) manufacture goods and exhibit both core and periphery traits.'
          },
          {
            id: 'hg7-l2-q3',
            stem: 'The Human Development Index (HDI) calculated by the United Nations combines which three fundamental dimensions?',
            options: [
              'Decent standard of living (GNI per capita), long and healthy life (Life Expectancy), and access to knowledge (Expected/Mean Years of Schooling).',
              'Military defense spending, gold reserves, and total population.',
              'Carbon emission reductions, renewable energy percentage, and recycling rates.',
              'Number of internet servers, smartphone ownership, and highway miles.'
            ],
            correctIndex: 0,
            explanation: 'HDI evaluates development beyond pure economic income by blending: (1) Standard of living (GNI per capita PPP), (2) Health (life expectancy at birth), and (3) Education (mean and expected years of schooling).',
            distractorTip: 'HDI scores range from 0.0 to 1.0; top nations (Norway, Switzerland) score above 0.93.'
          }
        ]
      }
    ]
  }
];
