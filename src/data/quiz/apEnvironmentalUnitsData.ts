// AP Environmental Science (APES) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–9)
// Authentic ecological cycles, population dynamics, earth systems, energy resources, pollution pathways, and global climate mechanisms.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_ENVIRONMENTAL_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: The Living World: Ecosystems',
    shortTitle: 'Unit 1: Ecosystems',
    description: 'Biogeochemical cycles (nitrogen, carbon, phosphorus, hydrologic), primary productivity (NPP = GPP - R), and trophic energy flow',
    examWeight: '6–8% of AP Exam',
    biome: {
      name: 'Evergreen Canopy & Biogeochemical Springs',
      icon: '🌿',
      accentColor: '#16A34A',
      secondaryColor: '#15803D',
      groundGradient: 'from-green-100 via-emerald-50 to-teal-100',
      cardBorder: 'border-green-500',
      trailColor: '#16a34a',
      nodeRing: 'ring-green-400/40',
      skyTint: 'from-green-50 to-emerald-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'apes-u1-l1',
        topicNumber: 'Topic 1.4 & 1.8',
        name: 'Biogeochemical Cycles & Productivity',
        subtitle: 'Nitrogen fixation, phosphorus limitations, and NPP equations',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'es1-l1-q1',
            stem: 'Which major biogeochemical cycle lacks a significant atmospheric gaseous phase, making it a key limiting nutrient in terrestrial and freshwater ecosystems?',
            options: [
              'The phosphorus cycle',
              'The nitrogen cycle',
              'The carbon cycle',
              'The sulfur cycle'
            ],
            correctIndex: 0,
            explanation: 'The phosphorus cycle cycles primarily through sedimentary rock, soil, and aquatic sediments via weathering. Unlike carbon ($CO_2$), nitrogen ($N_2$), and water ($H_2O$), phosphorus does not enter the atmosphere in appreciable amounts.',
            distractorTip: 'Phosphorus is trapped in rocks and released only by slow geologic weathering, making it the most common limiting nutrient in freshwater biomes.'
          },
          {
            id: 'es1-l1-q2',
            stem: 'In a marine estuary, the Gross Primary Productivity (GPP) is measured at $20\\,\\text{kg/m}^2/\\text{yr}$. If autotrophic cellular respiration consumes $8\\,\\text{kg/m}^2/\\text{yr}$, what is the Net Primary Productivity (NPP)?',
            options: [
              '$12\\,\\text{kg/m}^2/\\text{yr}$',
              '$28\\,\\text{kg/m}^2/\\text{yr}$',
              '$160\\,\\text{kg/m}^2/\\text{yr}$',
              '$2.5\\,\\text{kg/m}^2/\\text{yr}$'
            ],
            correctIndex: 0,
            explanation: 'By definition: $\\text{NPP} = \\text{GPP} - R_{resp}$. Here $\\text{NPP} = 20 - 8 = 12\\,\\text{kg/m}^2/\\text{yr}$. NPP represents the actual biomass energy available to herbivores and higher trophic levels.',
            distractorTip: 'Remember: GPP is the total energy fixed; NPP is what remains after plants metabolize for their own cellular respiration.'
          },
          {
            id: 'es1-l1-q3',
            stem: 'Which step of the nitrogen cycle converts atmospheric nitrogen ($N_2$) into biologically usable ammonium ($NH_4^+$) or ammonia ($NH_3$), often via symbiotic bacteria in legume root nodules?',
            options: [
              'Nitrogen fixation',
              'Denitrification',
              'Nitrification',
              'Assimilation'
            ],
            correctIndex: 0,
            explanation: 'Nitrogen fixation is carried out by specialized diazotrophic bacteria (such as Rhizobium or cyanobacteria), converting inert atmospheric $N_2$ into plant-available ammonia ($NH_3/NH_4^+$).',
            distractorTip: 'Denitrification does the OPPOSITE: converting soil nitrates ($NO_3^-$) back into $N_2$ gas.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: The Living World: Biodiversity',
    shortTitle: 'Unit 2: Biodiversity',
    description: 'Ecosystem services (provisioning, regulating, cultural, supporting), island biogeography, ecological tolerance, and ecological succession',
    examWeight: '6–8% of AP Exam',
    biome: {
      name: 'Archipelago of Endemism & Coral Shoals',
      icon: '🏝️',
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
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'apes-u2-l1',
        topicNumber: 'Topic 2.2 & 2.3',
        name: 'Ecosystem Services & Island Biogeography',
        subtitle: 'MacArthur-Wilson theory, four service categories, and primary succession',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'es2-l1-q1',
            stem: 'A coastal wetland filters agricultural runoff, absorbs storm surge wave energy, and buffers inland homes from flood damage. Which category of ecosystem service does this represent?',
            options: [
              'Regulating service',
              'Provisioning service',
              'Cultural service',
              'Supporting service'
            ],
            correctIndex: 0,
            explanation: 'Regulating services are benefits obtained from the regulation of ecosystem processes, such as flood control, climate moderation, water purification, and pollination.',
            distractorTip: 'Provisioning = physical goods (timber, crops, fresh water); Regulating = balance/protection (flood control, water filtration); Cultural = recreation/spiritual; Supporting = fundamental underlying processes (soil formation, photosynthesis).'
          },
          {
            id: 'es2-l1-q2',
            stem: 'According to MacArthur and Wilson\'s Theory of Island Biogeography, which island will support the highest species richness and lowest extinction rate at dynamic equilibrium?',
            options: [
              'A large island located close to the mainland.',
              'A small island located far from the mainland.',
              'A large island located far from the mainland.',
              'A small island located close to the mainland.'
            ],
            correctIndex: 0,
            explanation: 'Large islands have more diverse microhabitats and lower extinction rates. Islands close to the mainland have high immigration rates. Thus, a LARGE, NEAR island supports the greatest biodiversity.',
            distractorTip: 'Size dictates extinction rate (large = low extinction); Distance dictates immigration rate (near = high immigration).'
          },
          {
            id: 'es2-l1-q3',
            stem: 'Following a retreating glacier that leaves behind bare, exposed bedrock, which organisms act as pioneer species to initiate primary ecological succession?',
            options: [
              'Lichens and mosses that secrete acids to weather rock into primitive soil.',
              'Fast-growing hardwood oak and hickory trees.',
              'Perennial grasses with deep root networks.',
              'Coniferous pine seedlings.'
            ],
            correctIndex: 0,
            explanation: 'Primary succession begins in lifeless areas with NO pre-existing soil (like bare rock or volcanic lava). Pioneer lichens and mosses colonize bare rock, chemically weathering it and trapping windborne organic dust to slowly form the first layer of soil.',
            distractorTip: 'Secondary succession begins where soil ALREADY exists (after a forest fire or abandoned farmland).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Populations',
    shortTitle: 'Unit 3: Populations',
    description: 'r-selected vs K-selected species, survivorship curves, carrying capacity (K), human demographic transition, and population doubling calculations',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Demographic Delta & Carrying Ridge',
      icon: '📊',
      accentColor: '#8B5CF6',
      secondaryColor: '#7C3AED',
      groundGradient: 'from-purple-100 via-indigo-50 to-pink-100',
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
        uniqueKey: 'apes-u3-l1',
        topicNumber: 'Topic 3.1 & 3.8',
        name: 'Survivorship & Demographic Transition',
        subtitle: 'Rule of 70, K vs r selection, and DTM stages',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'es3-l1-q1',
            stem: 'Which life-history trait is characteristic of a $K$-selected species (such as elephants or whales) compared to an $r$-selected species?',
            options: [
              'High parental investment, long gestation, slow sexual maturity, and small litter size.',
              'Production of thousands of offspring with zero parental care.',
              'Short lifespan and high juvenile mortality.',
              'Ability to rapidly colonize disturbed pioneer environments.'
            ],
            correctIndex: 0,
            explanation: '$K$-selected species reproduce near carrying capacity ($K$), investing heavy parental energy into few offspring to ensure high juvenile survival (Type I survivorship curve).',
            distractorTip: '$r$-selected species maximize reproductive rate ($r$): many offspring, tiny parental investment, Type III survivorship curve (frogs, insects, dandelions).'
          },
          {
            id: 'es3-l1-q2',
            stem: 'If a developing country has an annual population growth rate of $2.0\\%$, according to the Rule of 70, in how many years will its population double?',
            options: [
              '35 years',
              '70 years',
              '140 years',
              '20 years'
            ],
            correctIndex: 0,
            explanation: 'The Rule of 70 formula is: $\\text{Doubling Time} = \\frac{70}{\\text{Growth Rate Percentage}} = \\frac{70}{2.0} = 35\\,\\text{years}$. (Do not convert $2.0\\%$ to $0.02$ when dividing into 70).',
            distractorTip: 'Always keep the percentage as a whole number when using the Rule of 70 formula.'
          },
          {
            id: 'es3-l1-q3',
            stem: 'In the Demographic Transition Model (DTM), what specific demographic shift defines Stage 2 (Transitional / Industrializing)?',
            options: [
              'Death rates plummet due to sanitation and medicine while birth rates remain stubbornly high, causing rapid population explosion.',
              'Both birth and death rates remain high and volatile.',
              'Birth rates decline rapidly while death rates rise.',
              'Total fertility rate drops below replacement level ($2.1$).'
            ],
            correctIndex: 0,
            explanation: 'Stage 2 is characterized by a rapid drop in crude death rates due to improved hygiene, clean water, and food security, while birth rates remain culturally high, generating the widest demographic gap and fastest population growth.',
            distractorTip: 'Stage 3 is where birth rates finally begin dropping due to women\'s education and urbanization.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Earth Systems & Resources',
    shortTitle: 'Unit 4: Earth Systems',
    description: 'Tectonic plates, soil horizons and soil texture triangle, atmospheric layers, global wind patterns (Hadley cells), and El Niño/La Niña (ENSO)',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Tectonic Rift & Coriolis Atmosphere',
      icon: '🌋',
      accentColor: '#EF4444',
      secondaryColor: '#B91C1C',
      groundGradient: 'from-red-100 via-amber-50 to-orange-100',
      cardBorder: 'border-red-500',
      trailColor: '#ef4444',
      nodeRing: 'ring-red-400/40',
      skyTint: 'from-red-50 to-orange-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'apes-u4-l1',
        topicNumber: 'Topic 4.3 & 4.8',
        name: 'Soil Horizons & ENSO Ocean Cycles',
        subtitle: 'Soil texture triangle, El Niño upwelling disruptions, and Hadley cells',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'es4-l1-q1',
            stem: 'During an El Niño (warm phase of ENSO) event in the equatorial Pacific, what happens to trade winds and coastal upwelling along the western coast of South America (Peru)?',
            options: [
              'Easterly trade winds weaken or reverse, suppressing cold nutrient-rich upwelling and collapsing local anchovy fisheries.',
              'Trade winds strengthen dramatically, causing extreme drought in South America.',
              'Deep ocean upwelling doubles in intensity, increasing fish populations.',
              'Surface ocean water becomes colder than normal in Peru.'
            ],
            correctIndex: 0,
            explanation: 'During El Niño, equatorial trade winds weaken or blow eastward, allowing warm surface waters to pile up along the South American coast. This thick warm water cap suppresses the cold, nutrient-rich Humboldt upwelling, devastating phytoplankton and fish populations.',
            distractorTip: 'La Niña is the OPPOSITE: intensified trade winds, super-cold waters off Peru, and enhanced upwelling.'
          },
          {
            id: 'es4-l1-q2',
            stem: 'A soil sample is analyzed and found to consist of $40\\%$ sand, $40\\%$ silt, and $20\\%$ clay. Using standard soil classification, this soil is categorized as:',
            options: [
              'Loam (the ideal agricultural soil for drainage and nutrient retention)',
              'Heavy impermeable clay',
              'Coarse drought-prone sand',
              'Pure silt sediment'
            ],
            correctIndex: 0,
            explanation: 'A balanced mix of sand, silt, and clay (approximately 40-40-20) defines loam. It provides optimal porosity: sand ensures drainage/aeration, clay provides cation exchange capacity (nutrient retention), and silt holds moisture.',
            distractorTip: 'Soil order from largest to smallest particle size: Sand ($0.05-2\\,\\text{mm}$) > Silt ($0.002-0.05\\,\\text{mm}$) > Clay ($<0.002\\,\\text{mm}$).'
          },
          {
            id: 'es4-l1-q3',
            stem: 'Which atmospheric layer contains the protective ozone layer that absorbs harmful solar ultraviolet ($UV-C$ and $UV-B$) radiation?',
            options: [
              'Stratosphere',
              'Troposphere',
              'Mesosphere',
              'Thermosphere'
            ],
            correctIndex: 0,
            explanation: 'The stratosphere (extending from roughly 12 to 50 km above Earth) houses stratospheric ozone ($O_3$), which absorbs lethal ultraviolet-B and ultraviolet-C photons.',
            distractorTip: 'Tropospheric ozone is a harmful pollutant and respiratory irritant (bad nearby); Stratospheric ozone protects us from UV radiation (good up high).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Land & Water Use',
    shortTitle: 'Unit 5: Land & Water Use',
    description: 'Tragedy of the Commons, Green Revolution, irrigation (drip, flood, spray), Integrated Pest Management (IPM), CAFOs, and mining impacts',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Agricultural Commons & Aquifer Valley',
      icon: '🌾',
      accentColor: '#10B981',
      secondaryColor: '#059669',
      groundGradient: 'from-emerald-100 via-lime-50 to-green-100',
      cardBorder: 'border-emerald-500',
      trailColor: '#10b981',
      nodeRing: 'ring-emerald-400/40',
      skyTint: 'from-emerald-50 to-lime-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'apes-u5-l1',
        topicNumber: 'Topic 5.1 & 5.14',
        name: 'Tragedy of the Commons & IPM',
        subtitle: 'Public shared resources, drip irrigation, and biological pest control',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'es5-l1-q1',
            stem: 'Overfishing in international oceanic waters where individual commercial trawlers maximize private catch until fish stocks collapse is a classic example of:',
            options: [
              'The Tragedy of the Commons',
              'Resource partitioning',
              'Competitive exclusion',
              'Trophic cascade regulation'
            ],
            correctIndex: 0,
            explanation: 'Garrett Hardin\'s Tragedy of the Commons describes how individuals acting independently and rationally according to self-interest deplete or spoil a shared, unregulated public resource (oceans, clean air, grazing lands).',
            distractorTip: 'Solutions to the Tragedy of the Commons: Government regulation, quotas/taxes, or privatization.'
          },
          {
            id: 'es5-l1-q2',
            stem: 'Which agricultural irrigation method delivers water directly to plant root zones with over $95\\%$ efficiency, minimizing evaporative loss and soil salinization?',
            options: [
              'Drip irrigation',
              'Flood irrigation',
              'Furrow irrigation',
              'Center-pivot spray irrigation'
            ],
            correctIndex: 0,
            explanation: 'Drip irrigation uses perforated hoses laid along the soil surface or buried underground to deliver water slowly and directly to root zones. It loses minimal water to evaporation or runoff compared to flood irrigation ($60\\%$ efficiency).',
            distractorTip: 'Flood irrigation is cheap but causes severe soil waterlogging and salinization through evaporation.'
          },
          {
            id: 'es5-l1-q3',
            stem: 'What is the foundational philosophy of Integrated Pest Management (IPM)?',
            options: [
              'To minimize economic crop damage using a combination of biological controls, crop rotation, and targeted minimal synthetic pesticide use only as a last resort.',
              'To completely eradicate 100% of insects using blanket broad-spectrum organophosphate sprays.',
              'To replace all chemical farming with hydroponics.',
              'To avoid all pest control and let natural selection take place.'
            ],
            correctIndex: 0,
            explanation: 'IPM does NOT attempt total pest eradication; it aims to keep pest populations below economically damaging thresholds using crop rotation, natural predators (ladybugs), pest-resistant crops, and minimal chemical pesticides.',
            distractorTip: 'IPM reduces pesticide resistance (the pesticide treadmill) and prevents bioaccumulation.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Energy Resources & Consumption',
    shortTitle: 'Unit 6: Energy Resources',
    description: 'Fossil fuels (coal, oil, natural gas), nuclear fission and half-life, renewable energy (solar, wind, hydro, geothermal), and energy efficiency',
    examWeight: '10–15% of AP Exam',
    biome: {
      name: 'Turbine Plains & Fission Vault',
      icon: '⚡',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-yellow-50 to-orange-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-yellow-50/30'
    },
    levels: [
      {
        id: 601,
        unitIndex: 6,
        levelNumber: 1,
        uniqueKey: 'apes-u6-l1',
        topicNumber: 'Topic 6.6 & 6.8',
        name: 'Nuclear Fission & Renewable Tech',
        subtitle: 'Uranium half-life calculations, fuel cells, and grid storage',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'es6-l1-q1',
            stem: 'A radioactive isotope in nuclear waste has a half-life of 30 years. If a spent fuel rod initially contains $800\\,\\text{g}$ of this isotope, how much remains radioactive after 90 years?',
            options: [
              '$100\\,\\text{g}$',
              '$200\\,\\text{g}$',
              '$50\\,\\text{g}$',
              '$267\\,\\text{g}$'
            ],
            correctIndex: 0,
            explanation: '90 years represents $\\frac{90}{30} = 3$ half-lives. Starting with $800\\,\\text{g}$: after 1 half-life (30 yr) $\\rightarrow 400\\,\\text{g}$; after 2 half-lives (60 yr) $\\rightarrow 200\\,\\text{g}$; after 3 half-lives (90 yr) $\\rightarrow 100\\,\\text{g}$.',
            distractorTip: 'Formula: $N_t = N_0 \\cdot (1/2)^n$ where $n = 90/30 = 3$. $(1/2)^3 = 1/8$, and $800 / 8 = 100\\,\\text{g}$.'
          },
          {
            id: 'es6-l1-q2',
            stem: 'What is the sole direct chemical emission produced at the tailpipe of a vehicle powered by a pure hydrogen fuel cell?',
            options: [
              'Water vapor ($H_2O$)',
              'Carbon monoxide ($CO$)',
              'Sulfur dioxide ($SO_2$)',
              'Nitrous oxide ($N_2O$)'
            ],
            correctIndex: 0,
            explanation: 'Hydrogen fuel cells combine pressurized hydrogen gas ($H_2$) and ambient oxygen ($O_2$) electrochemically: $2H_2 + O_2 \\rightarrow 2H_2O + \\text{electricity} + \\text{heat}$. Water vapor is the only tailpipe exhaust.',
            distractorTip: 'However, producing commercial $H_2$ fuel often relies on methane steam reforming, which releases $CO_2$ upstream.'
          },
          {
            id: 'es6-l1-q3',
            stem: 'Which fossil fuel emits the highest amount of sulfur dioxide ($SO_2$) and particulate heavy metals (mercury) per kilowatt-hour of electricity generated?',
            options: [
              'Coal',
              'Natural gas (methane)',
              'Petroleum (crude oil)',
              'Propane'
            ],
            correctIndex: 0,
            explanation: 'Combustion of bituminous coal releases high concentrations of sulfur impurities (forming $SO_2$, the precursor to acid rain) as well as fly ash, soot, and trace neurotoxic mercury ($Hg$). Natural gas is substantially cleaner burning, emitting mostly $CO_2$ and $H_2O$.',
            distractorTip: 'Coal is the dirtiest fossil fuel in terms of $SO_2$, particulate matter, and mercury emissions.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 7,
    unitId: 'u7',
    title: 'Unit 7: Atmospheric Pollution',
    shortTitle: 'Unit 7: Air Pollution',
    description: 'Photochemical smog, thermal inversions, acid deposition (SO2/NOx), indoor air pollutants (radon, VOCs, CO), and Clean Air Act criteria pollutants',
    examWeight: '7–10% of AP Exam',
    biome: {
      name: 'Smog Inversion Valley & Acid Rain Ridge',
      icon: '🌫️',
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
        id: 701,
        unitIndex: 7,
        levelNumber: 1,
        uniqueKey: 'apes-u7-l1',
        topicNumber: 'Topic 7.2 & 7.5',
        name: 'Photochemical Smog & Thermal Inversions',
        subtitle: 'Secondary pollutants, VOCs, ozone formation, and radon-222',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'es7-l1-q1',
            stem: 'Photochemical smog forms on sunny afternoons primarily when sunlight acts on which combination of primary pollutants emitted by motor vehicles?',
            options: [
              'Nitrogen oxides ($NO_x$) and Volatile Organic Compounds (VOCs)',
              'Sulfur dioxide ($SO_2$) and chlorofluorocarbons (CFCs)',
              'Lead particulates and radon gas',
              'Methane and carbon monoxide'
            ],
            correctIndex: 0,
            explanation: 'Photochemical smog is catalyzed by ultraviolet solar radiation splitting $NO_2$ into $NO$ and atomic oxygen $O$, which joins $O_2$ to form tropospheric ozone ($O_3$). VOCs bind with $NO$, preventing ozone from breaking back down, creating brown smog and PANs.',
            distractorTip: 'Smog ingredients: $NO_x + \\text{VOCs} + \\text{Sunlight} \\rightarrow \\text{Ozone} + \\text{PANs}$. Peaks in early afternoon.'
          },
          {
            id: 'es7-l1-q2',
            stem: 'During a thermal inversion over a city nestled in a mountain valley, what meteorological condition traps air pollutants close to the ground?',
            options: [
              'A layer of warm air settles over a colder layer of surface air, preventing vertical convection and mixing.',
              'Rapidly falling cold air creates intense upward thermal updrafts.',
              'Excess greenhouse gases create torrential acid precipitation.',
              'High surface winds disperse all particulate matter.'
            ],
            correctIndex: 0,
            explanation: 'Normally, air temperature decreases with altitude, allowing warm surface air to rise and disperse pollutants. In a thermal inversion, a warm lid of air sits atop cooler, denser surface air, trapping smog and soot near ground level.',
            distractorTip: 'Inversion = Warm air over Cold air. Common in Los Angeles, Salt Lake City, and Mexico City.'
          },
          {
            id: 'es7-l1-q3',
            stem: 'Radon-222 is a dangerous indoor air pollutant that is the second leading cause of lung cancer. How does it enter residential basements?',
            options: [
              'It seeps up from the natural radioactive decay of uranium in underlying granite bedrock through foundation cracks.',
              'It off-gasses from synthetic carpet adhesives and formaldehyde furniture.',
              'It leaks from faulty natural gas space heaters.',
              'It forms from the reaction of ozone with cleaning solvents.'
            ],
            correctIndex: 0,
            explanation: 'Radon-222 is an odorless, naturally occurring radioactive noble gas produced by the radioactive decay chain of uranium found in soil and granite rocks. It migrates into homes through foundation cracks and sump pumps.',
            distractorTip: 'Radon = Bedrock uranium decay (lung cancer); Carbon monoxide = Incomplete combustion (asphyxiation).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 8,
    unitId: 'u8',
    title: 'Unit 8: Aquatic & Terrestrial Pollution',
    shortTitle: 'Unit 8: Water & Waste Pollution',
    description: 'Eutrophication, dead zones/hypoxia, bioaccumulation vs biomagnification, endocrine disruptors, sanitary landfills, and LD50 toxicity testing',
    examWeight: '7–10% of AP Exam',
    biome: {
      name: 'Eutrophic Estuary & Bioaccumulation Marsh',
      icon: '☠️',
      accentColor: '#14B8A6',
      secondaryColor: '#0D9488',
      groundGradient: 'from-teal-100 via-emerald-50 to-cyan-100',
      cardBorder: 'border-teal-500',
      trailColor: '#14b8a6',
      nodeRing: 'ring-teal-400/40',
      skyTint: 'from-teal-50 to-emerald-50/30'
    },
    levels: [
      {
        id: 801,
        unitIndex: 8,
        levelNumber: 1,
        uniqueKey: 'apes-u8-l1',
        topicNumber: 'Topic 8.2 & 8.7',
        name: 'Eutrophication & Biomagnification',
        subtitle: 'BOD, hypoxic dead zones, and lipid-soluble toxic concentration',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'es8-l1-q1',
            stem: 'What is the precise sequence of ecological events that produces a hypoxic "dead zone" in the Gulf of Mexico downstream from agricultural runoff?',
            options: [
              'Excess nitrogen/phosphorus fertilizers $\\rightarrow$ Massive algal bloom $\\rightarrow$ Algae die and sink $\\rightarrow$ Aerobic decomposer bacteria consume dissolved oxygen ($DO$) $\\rightarrow$ Fish suffocate.',
              'Excess fertilizers poison fish directly on contact, leaving water toxic.',
              'Algae consume all the oxygen during daytime photosynthesis, suffocating crustaceans.',
              'Chemical fertilizers evaporate into the air, creating acid clouds that deplete oxygen.'
            ],
            correctIndex: 0,
            explanation: 'Eutrophication is not direct poisoning: excess nutrients trigger explosive algal growth. When algae die, decomposer bacteria multiply rapidly, and their aerobic cellular respiration consumes dissolved oxygen ($DO < 2\\,\\text{mg/L}$), creating lethal hypoxic dead zones.',
            distractorTip: 'Common Student Error: Algae do NOT consume the oxygen; it is the DECOMPOSER BACTERIA that consume the oxygen while eating dead algae!'
          },
          {
            id: 'es8-l1-q2',
            stem: 'Why did top predatory birds like bald eagles and ospreys suffer thin, fragile eggshell collapse due to DDT pollution, while small fish in the same lake showed low concentrations?',
            options: [
              'DDT is fat-soluble and biomagnifies at each successive trophic level, reaching highest concentrations in apex predators.',
              'Eagles drank large volumes of DDT-contaminated water directly.',
              'Small fish developed genetic immunity to synthetic pesticides.',
              'DDT decomposes into calcium carbonate inside avian nests.'
            ],
            correctIndex: 0,
            explanation: 'Biomagnification occurs when persistent, fat-soluble toxins (like DDT, PCBs, or methylmercury) cannot be excreted and become concentrated at higher trophic levels as predators consume thousands of contaminated prey items.',
            distractorTip: 'Bioaccumulation = toxin buildup in ONE organism over its lifetime; Biomagnification = toxin concentration multiplying UP the food chain.'
          },
          {
            id: 'es8-l1-q3',
            stem: 'On a dose-response toxicity curve, what does the $LD_{50}$ metric indicate?',
            options: [
              'The lethal dose of a chemical that kills $50\\%$ of the test population.',
              'The dose at which $50\\%$ of organisms experience minor allergic symptoms.',
              'The concentration that is $50\\%$ safe for human consumption.',
              'The dose that takes 50 days to degrade.'
            ],
            correctIndex: 0,
            explanation: '$LD_{50}$ (Lethal Dose 50%) is the standard toxicological metric representing the chemical dose required to kill exactly 50 percent of a tested animal population. A lower $LD_{50}$ means higher toxicity.',
            distractorTip: 'Lower $LD_{50}$ = MORE toxic (it takes less chemical to kill half the population).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 9,
    unitId: 'u9',
    title: 'Unit 9: Global Change',
    shortTitle: 'Unit 9: Global Change',
    description: 'Stratospheric ozone depletion (CFCs), Montreal Protocol, greenhouse gases and global warming, ocean acidification, and invasive species (HIPPCO)',
    examWeight: '15–20% of AP Exam',
    biome: {
      name: 'Stratospheric Vault & Coral Bleaching Reef',
      icon: '🌍',
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
        uniqueKey: 'apes-u9-l1',
        topicNumber: 'Topic 9.1 & 9.7',
        name: 'Ozone Depletion & Ocean Acidification',
        subtitle: 'CFC catalytic cycles, Montreal Protocol, and carbonic acid dissolution',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'es9-l1-q1',
            stem: 'How does a single chlorine atom from a chlorofluorocarbon (CFC) molecule catalyze the destruction of up to $100{,}000$ stratospheric ozone ($O_3$) molecules?',
            options: [
              'Chlorine reacts with $O_3$ to form $ClO$, which then reacts with a free oxygen atom to regenerate a free $Cl$ atom, repeating the catalytic cycle endlessly.',
              'Chlorine blocks all incoming sunlight from reaching the stratosphere.',
              'Chlorine binds permanently to water vapor, producing heavy acid rain.',
              'Chlorine splits into two argon atoms that displace ozone molecules.'
            ],
            correctIndex: 0,
            explanation: 'Chlorine acts as an unconsumed catalyst: $Cl + O_3 \\rightarrow ClO + O_2$, followed by $ClO + O \\rightarrow Cl + O_2$. Because the chlorine atom is regenerated at the end of each cycle, one atom can destroy tens of thousands of ozone molecules before drifting away.',
            distractorTip: 'The 1987 Montreal Protocol successfully phased out CFCs, allowing the stratospheric ozone layer to begin recovering.'
          },
          {
            id: 'es9-l1-q2',
            stem: 'What is the underlying chemical mechanism of ocean acidification, and why does it threaten marine organisms like corals and shellfish?',
            options: [
              'Absorbed atmospheric $CO_2$ reacts with seawater to form carbonic acid ($H_2CO_3$), releasing $H^+$ ions that bind with carbonate ($CO_3^{2-}$), depleting the carbonate ions needed to build calcium carbonate ($CaCO_3$) shells.',
              'Acid rain pours sulfuric acid into the ocean, boiling the coral reefs.',
              'Increased ocean salinity dissolves calcium atoms directly.',
              'Warmer water temperatures convert ocean sodium into hydrogen gas.'
            ],
            correctIndex: 0,
            explanation: 'Ocean absorption of excess anthropogenic $CO_2$ produces carbonic acid ($CO_2 + H_2O \\rightarrow H_2CO_3 \\rightarrow H^+ + HCO_3^-$). Free hydrogen ions ($H^+$) combine with available carbonate ($H^+ + CO_3^{2-} \\rightarrow HCO_3^-$), starving calcifying organisms (corals, pteropods, mollusks) of carbonate needed for $CaCO_3$ shells.',
            distractorTip: 'Ocean acidification lowers seawater pH and dissolves existing calcium carbonate skeletons.'
          },
          {
            id: 'es9-l1-q3',
            stem: 'Why are invasive species such as zebra mussels and kudzu vines able to rapidly outcompete native species and disrupt local ecosystems?',
            options: [
              'They typically lack natural predators, parasites, or competitors in the introduced range and possess broad ecological tolerance ($r$-selected traits).',
              'They have smaller genomes that mutate faster than native species.',
              'They are only able to reproduce asexually.',
              'They exclusively inhabit extreme hydrothermal vents.'
            ],
            correctIndex: 0,
            explanation: 'Invasive species thrive because they are freed from the co-evolved predators, herbivores, and diseases of their native habitat (enemy release hypothesis) and often possess $r$-selected traits: generalist diets, rapid reproduction, and wide environmental tolerance.',
            distractorTip: 'HIPPCO acronym for biodiversity loss: Habitat loss, Invasive species, Population growth, Pollution, Climate change, Overexploitation. Habitat loss is #1, Invasives are #2.'
          }
        ]
      }
    ]
  }
];
