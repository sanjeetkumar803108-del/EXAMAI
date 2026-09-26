import { APUnitNote } from './types';

export const AP_ENVIRONMENTAL_SCIENCE_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: THE LIVING WORLD: ECOSYSTEMS (CED 6%–8% of Exam)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'The Living World: Ecosystems',
    examWeight: '6%–8% of AP Exam',
    bigIdea: 'Ecosystems are complex webs of interactions where energy flows unidirectionally from the sun and matter cycles continuously through biogeochemical reservoirs.',
    keyTheorems: [
      {
        name: 'The 10% Trophic Energy Transfer Efficiency',
        conditions: 'Energy passing from one trophic level to the next in an ecological pyramid.',
        conclusion: 'Only approximately $10\\%$ of energy stored as biomass at one trophic level is assimilated into biomass at the next level; $90\\%$ is lost as metabolic heat (2nd Law of Thermodynamics) and cellular respiration.',
        apTip: 'This thermodynamic inefficiency is why food chains rarely exceed 4 or 5 levels and why eating lower on the food chain (primary producers) supports significantly more human population per acre.'
      },
      {
        name: 'Primary Productivity Equation',
        conditions: 'Autotrophic carbon fixation in terrestrial and aquatic biomes.',
        conclusion: 'Net Primary Productivity equals Gross Primary Productivity minus autotrophic cellular respiration: $\\text{NPP} = \\text{GPP} - R$.',
        apTip: 'NPP represents the actual biomass energy available to heterotrophic consumers. Tropical rainforests and coral reefs have the highest NPP per square meter; open oceans have the highest TOTAL global NPP due to vast surface area.'
      }
    ],
    formulas: [
      {
        name: 'Net Primary Productivity',
        latex: '\\text{NPP} = \\text{GPP} - R',
        explanation: '$\\text{GPP}$ is total solar energy captured; $R$ is energy used by plants for cellular respiration.'
      },
      {
        name: 'Trophic Energy Transfer',
        latex: 'E_{n+1} = E_n \\times 0.10',
        explanation: 'Each ascending trophic level receives approximately one-tenth the energy of the level below it.'
      }
    ],
    sections: [
      {
        heading: '1. Biogeochemical Nutrient Cycles Master Reference',
        content: `How essential elements cycle between biotic and abiotic reservoirs:

| Cycle | Primary Major Reservoir | Essential Biological Role | Driving Mechanism / Key Bacteria | Human Disruption |
| :--- | :--- | :--- | :--- | :--- |
| **Carbon** | **Sedimentary rock & deep ocean sediment** | Backbone of all organic macromolecules | Photosynthesis ($6\\text{CO}_2 \\rightarrow \\text{Sugar}$) vs. Cellular Respiration | Burning fossil fuels & deforestation release massive excess $\\text{CO}_2$ |
| **Nitrogen** | **Atmosphere** ($78\\% \\text{ N}_2$ gas) | Proteins, amino acids, DNA, and RNA | **Nitrogen Fixation** (bacteria on legume roots convert $\\text{N}_2 \\rightarrow \\text{NH}_3/\\text{NH}_4^+$); **Nitrification** ($\\rightarrow \\text{NO}_2^- \\rightarrow \\text{NO}_3^-$); **Denitrification** ($\\text{NO}_3^- \\rightarrow \\text{N}_2$) | Haber-Bosch synthetic fertilizer causes agricultural runoff eutrophication |
| **Phosphorus** | **Sedimentary rock & minerals** (NO atmospheric phase!) | ATP, phospholipid membranes, and nucleic acid backbones | Extremely slow weathering of uplifted phosphate rocks | Synthetic fertilizers and detergents cause aquatic algal blooms |
| **Hydrologic** | **Oceans** ($97\\%$) & Glaciers ($2\\%$) | Solvent, transpiration, metabolic medium | Evaporation, condensation, transpiration, precipitation, percolation | Aquifer overdraft (Ogallala) and concrete runoff flooding |`
      }
    ,
      {
        heading: '2. Terrestrial Biomes, Aquatic Zones & Primary Productivity (CED 1.2-1.4)',
        content: `Global biome geographic distributions and ecosystem energetics:

* **Terrestrial Biomes Determinants**:
  * Biomes are governed strictly by **average annual temperature and precipitation patterns**:
    * **Taiga (Boreal Forest)**: Coniferous evergreens, acidic nutrient-poor podzol soils, long subarctic winters.
    * **Tundra**: Treeless permafrost layer, fragile dwarf lichens/shrubs, low annual precipitation (cold desert).
    * **Tropical Rainforest**: High year-round temperature and rainfall; rapid nutrient cycling yielding nutrient-poor leached soils; highest terrestrial biodiversity.
    * **Temperate Deciduous Forest**: Distinct four seasons, rich organic humus soils from leaf litter.
* **Aquatic Ecosystem Stratification**:
  * **Freshwater Wetlands**: Swamps, bogs, and marshes act as natural biological sponges (flood control, water filtration, groundwater recharge).
  * **Marine Life Zones**: Coastal estuaries (brackish nursery grounds with extreme NPP), coral reefs (oligotrophic clear waters with immense biodiversity), and open ocean (euphotic zone restricted to upper sunlit 200m).
* **Primary Productivity**:
  $$NPP = GPP - R$$
  * Estuaries, salt marshes, and tropical rainforests boast the highest $NPP$ per square meter.
  * The open ocean exhibits very low $NPP$ per unit area due to nitrogen/iron nutrient limits, but produces the largest **total global biomass** due to covering $71\\%$ of the planet's surface!`
      }
    ],
    workedExamples: [
      {
        title: 'Net Primary Productivity and Trophic Energy Math',
        topicRef: 'CED 1.8 Primary Productivity',
        question: 'A temperate forest has a Gross Primary Productivity (GPP) of $20,000\\text{ kcal/m}^2/\\text{yr}$. Producers in this forest consume $12,000\\text{ kcal/m}^2/\\text{yr}$ during cellular respiration. (a) Calculate the Net Primary Productivity (NPP), and (b) Calculate the energy available to secondary consumers in this ecosystem.',
        solutionSteps: [
          'Step 1: Calculate NPP: $\\text{NPP} = \\text{GPP} - R = 20,000 - 12,000 = 8,000\\text{ kcal/m}^2/\\text{yr}$.',
          'Step 2: NPP represents energy stored in primary producer biomass available to primary consumers (herbivores).',
          'Step 3: Primary consumers receive $10\\%$ of producer energy: $8,000 \\times 0.10 = 800\\text{ kcal/m}^2/\\text{yr}$.',
          'Step 4: Secondary consumers (carnivores) receive $10\\%$ of primary consumer energy: $800 \\times 0.10 = 80\\text{ kcal/m}^2/\\text{yr}$.'
        ],
        finalAnswer: 'NPP = $8,000\\text{ kcal/m}^2/\\text{yr}$; Energy available to secondary consumers = $80\\text{ kcal/m}^2/\\text{yr}$.',
        apScoringTip: 'Remember that consumers eat NPP, NOT GPP! Always subtract respiration ($R$) first before applying the $10\\%$ trophic transfer rule.'
      }
    ],
    diagrams: [
      {
        id: 'apes_nitrogen_cycle',
        title: 'The Nitrogen Cycle and Bacterial Pathways',
        subtitle: 'Fixation, Nitrification, Assimilation, Ammonification, Denitrification',
        type: 'nitrogen_cycle_flow',
        description: 'Flowchart showing atmospheric $\\text{N}_2$ fixed by Rhizobium bacteria into ammonia, converted by nitrifying bacteria into nitrites and nitrates, absorbed by plants, and returned to atmosphere by denitrifying bacteria.',
        takeaway: 'Bacteria are the indispensable drivers of the nitrogen cycle; without specialized bacteria, plants cannot utilize atmospheric nitrogen gas.'
      }
    ],
    commonTraps: [
      'Assuming the phosphorus cycle has an atmospheric gas phase. Phosphorus has NO gaseous phase; it cycles exclusively through rock, soil, water, and organisms.',
      'Confusing Gross Primary Productivity with Net Primary Productivity. GPP is total sugar made; NPP is what remains after the plant breathes ($R$).',
      'Thinking plants only do photosynthesis. Plants perform cellular respiration continuously day and night, using their own stored carbohydrates.'
    ],
    cramSheet: [
      'NPP = GPP - R. Only NPP is available to herbivores.',
      'Phosphorus cycle has NO atmospheric gas phase (slowest biogeochemical cycle).',
      'Nitrogen: Fixed by bacteria from $\\text{N}_2 \\rightarrow \\text{NH}_3/\\text{NH}_4^+$; returned by denitrifying bacteria to $\\text{N}_2$.',
      'Trophic pyramid: $10\\%$ rule means each level up gets $1/10$ the energy ($10,000 \\rightarrow 1,000 \\rightarrow 100 \\rightarrow 10$).'
    ]
  },

  // ==========================================
  // UNIT 2: THE LIVING WORLD: BIODIVERSITY (CED 6%–8% of Exam)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'The Living World: Biodiversity',
    examWeight: '6%–8% of AP Exam',
    bigIdea: 'Biodiversity supports ecosystem resilience. Ecosystem services, island biogeography, and ecological succession reflect natural and anthropogenic disruptions.',
    keyTheorems: [
      {
        name: 'The 4 Categories of Ecosystem Services (Millennium Assessment)',
        conditions: 'Direct and indirect benefits ecosystems provide to human society.',
        conclusion: '(1) Provisioning: Material goods extracted directly (timber, food, clean drinking water, medicinal plants); (2) Regulating: Climate regulation, flood control by wetlands, pollination, water purification; (3) Cultural: Recreational, aesthetic, and spiritual benefits (national parks, tourism); (4) Supporting: Foundational processes sustaining all other services (photosynthesis, soil formation, nutrient cycling).',
        apTip: 'On FRQs, never just write "it helps the environment." You must name the specific ecosystem service category and explicitly explain the economic or human survival benefit!'
      },
      {
        name: 'Theory of Island Biogeography (MacArthur & Wilson)',
        conditions: 'Species richness equilibrium on isolated habitat islands.',
        conclusion: 'Species richness depends on two variables: (1) Island Size: Larger islands have higher immigration, lower extinction, and greater habitat diversity; (2) Distance from Mainland: Islands closer to mainland have higher immigration rates. Highest species richness = **Large & Close**; Lowest = **Small & Far**.',
        apTip: 'Habitat fragmentation creates terrestrial "islands" surrounded by human development; wildlife corridors bridge these fragments to preserve gene flow and mimic larger islands.'
      }
    ],
    formulas: [
      {
        name: 'Species Richness vs. Species Evenness',
        latex: '\\text{Richness} = \\text{Total Number of Distinct Species}; \\quad \\text{Evenness} = \\text{Relative Abundance Equitability}',
        explanation: 'Communities with equal representation across species are more diverse and resilient than communities dominated by a single species.'
      }
    ],
    sections: [
      {
        heading: '1. Primary vs. Secondary Ecological Succession',
        content: `How ecosystems recover following natural or anthropogenic disturbance:

| Feature | Primary Succession | Secondary Succession |
| :--- | :--- | :--- |
| **Initial Starting Substrate** | **Bare Rock / No Soil** (volcanic lava flow, retreating glacier) | **Existing Soil Intact** (abandoned farmland, forest fire, clearcut logging) |
| **Pioneer Species** | Lichens and mosses (secrete mild acids to break rock into soil) | Fast-growing grasses, annual weeds, and wild wildflowers |
| **Time Scale to Climax** | Extremely slow (hundreds to thousands of years) | Much faster (decades to a century) because soil is pre-existing |
| **Soil Formation Required?** | **YES** (fundamental limiting rate step) | **NO** (seed bank and nutrient-rich soil already present) |`
      }
    ,
      {
        heading: '2. Ecosystem Services, Island Biogeography & Ecological Tolerance (CED 2.1-2.4)',
        content: `Biodiversity values, ecological dynamics, and spatial colonization:

* **The 4 Categories of Ecosystem Services (Millennium Assessment)**:
  * **Provisioning Services**: Direct material harvest extracted from nature (timber, food crops, clean drinking water, medicinal plants like paclitaxel).
  * **Regulating Services**: Natural ecological processes moderating environmental conditions (wetland flood absorption, forest carbon sequestration, atmospheric oxygen production).
  * **Supporting Services**: Fundamental structural processes sustaining all life (pollination of crops by bees, soil formation via decomposition, primary biomass production).
  * **Cultural Services**: Non-material aesthetic, recreational, and spiritual benefits (ecotourism revenue in national parks).
* **Theory of Island Biogeography (MacArthur & Wilson)**:
  * **Island Size**: Larger islands have more diverse microhabitats, greater resource variety, and **lower extinction rates**.
  * **Distance from Mainland**: Islands closer to the mainland experience **higher immigration and colonization rates**.
  * Highest species richness is found on **Large, Close islands**; lowest species richness on **Small, Isolated islands**!
* **Ecological Tolerance & Generalists vs. Specialists**:
  * **Specialist Species**: Narrow ecological niche, specific diet (e.g. giant panda feeding on bamboo); highly vulnerable to rapid habitat fragmentation.
  * **Generalist Species**: Broad niche, adaptable diet (e.g. raccoons, coyotes); thrive in human-altered changing environments.`
      }
    ],
    workedExamples: [
      {
        title: 'Island Biogeography Colonization & Extinction Rates',
        topicRef: 'CED 2.3 Island Biogeography',
        question: 'Two oceanic islands, Alpha (area $500\\text{ km}^2$, $20\\text{ km}$ from mainland) and Beta (area $50\\text{ km}^2$, $200\\text{ km}$ from mainland), are surveyed. Predict which island will support higher species richness and justify using island biogeography principles.',
        solutionSteps: [
          'Step 1: Evaluate Island Alpha: Large area ($500\\text{ km}^2$) and close to mainland ($20\\text{ km}$).',
          'Step 2: Proximity effect: Being close ($20\\text{ km}$) allows higher immigration rates because wind, birds, and floating rafts reach the island more frequently.',
          'Step 3: Size effect: Being large ($500\\text{ km}^2$) provides more diverse ecological niches and larger resource pools, supporting larger populations with LOWER extinction rates.',
          'Step 4: Evaluate Island Beta: Small and distant, yielding low immigration and high extinction rates.',
          'Step 5: Conclude: Island Alpha will maintain a significantly higher equilibrium number of species.'
        ],
        finalAnswer: 'Island Alpha will have higher species richness because its large size reduces extinction rates and its proximity to mainland maximizes immigration rates.',
        apScoringTip: 'Always discuss BOTH immigration (distance factor) AND extinction (island size factor) when answering island biogeography FRQs.'
      }
    ],
    diagrams: [
      {
        id: 'apes_island_biogeography',
        title: 'MacArthur-Wilson Island Biogeography Curves',
        subtitle: 'Immigration (Near vs. Far) and Extinction (Small vs. Large)',
        type: 'island_biogeography_curves',
        description: 'Immigration curves sloping downward intersecting extinction curves sloping upward. The intersection point defines the equilibrium species richness ($S$).',
        takeaway: 'Equilibrium species richness is highest for Large & Near islands and lowest for Small & Far islands.'
      }
    ],
    commonTraps: [
      'Assuming secondary succession starts from bare rock. Secondary succession ALWAYS starts with pre-existing soil; only primary succession starts from bare rock.',
      'Confusing provisioning with regulating ecosystem services. Provisioning is something physical humans take and sell (lumber, fish); regulating is a natural control process (mangroves preventing storm surge flooding).',
      'Thinking generalist species outcompete specialists on stable islands. Specialist species thrive in stable, constant environments with narrow niches; generalists excel in rapidly changing, disrupted habitats.'
    ],
    cramSheet: [
      'Island Biogeography: Highest species richness = Large island Close to mainland.',
      'Primary succession: Bare rock $\\rightarrow$ Lichens/mosses create soil. Secondary: Soil already present.',
      'Provisioning service: Physical harvestable goods (food, lumber, medicine).',
      'Regulating service: Nature controlling hazards (wetlands filtering water, bees pollinating crops).'
    ]
  },

  // ==========================================
  // UNIT 3: POPULATIONS (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Populations and Demography',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Populations exhibit distinct reproductive strategies ($r$ vs. $K$) and survivorship curves. Human demographic transitions impact global resource demands.',
    keyTheorems: [
      {
        name: 'r-Selected vs. K-Selected Life History Strategies',
        conditions: 'Evolutionary trade-offs between offspring quantity and parental investment.',
        conclusion: 'r-selected species: Small body, short lifespan, high fecundity, zero parental care, rapid maturity, boom-and-bust population dynamics (e.g. insects, rodents, bacteria). K-selected species: Large body, long lifespan, few offspring, heavy parental investment, stable near carrying capacity $K$ (e.g. elephants, humans, whales).',
        apTip: 'Invasive species are almost always r-selected generalists: They reproduce rapidly, mature quickly, and easily adapt to human-disturbed habitats!'
      },
      {
        name: 'Type I, II, and III Survivorship Curves',
        conditions: 'Patterns of mortality across an organism’s lifespan.',
        conclusion: 'Type I (Convex): High survival in early and middle life; rapid mortality in old age (K-selected, humans); Type II (Diagonal): Constant mortality rate throughout lifespan (songbirds, reptiles); Type III (Concave): Massive infant mortality; the few surviving individuals live long lives (r-selected, oysters, sea turtles, trees).',
        apTip: 'Be prepared to identify survivorship curves on logarithmic graphs on the AP exam.'
      }
    ],
    formulas: [
      {
        name: 'Human Population Growth Rate (CBR & CDR)',
        latex: '\\text{Growth Rate } r \\, (\\%) = \\frac{(\\text{CBR} + \\text{Immigration}) - (\\text{CDR} + \\text{Emigration})}{10}',
        explanation: 'Crude birth and death rates are measured per 1,000 individuals; dividing by 10 yields percentage.'
      },
      {
        name: 'Doubling Time (Rule of 70)',
        latex: 'T_{\\text{double}} = \\frac{70}{r \\, (\\%)}',
        explanation: 'Quick mental math formula for calculating exponential doubling time.'
      }
    ],
    sections: [
      {
        heading: '1. Human Demographic Transition Stages & Population Pyramids',
        content: `Connecting demographic metrics to national development:

- **Stage 1 (Pre-Industrial)**: High CBR, High CDR $\\implies$ Slow, fluctuating growth. High infant mortality.
- **Stage 2 (Transitional)**: High CBR, Rapidly Plunging CDR $\\implies$ **Rapid population explosion**. Wide-base pyramid (e.g. Sub-Saharan Africa). Driven by improved sanitation, vaccines, and clean water.
- **Stage 3 (Industrial)**: Plunging CBR, Low CDR $\\implies$ Growth slows. Pyramid sides become steeper (e.g. India, Mexico). Driven by urbanization, female education, and access to family planning.
- **Stage 4 (Post-Industrial)**: Low CBR, Low CDR $\\implies$ Zero Population Growth (ZPG). Column-shaped pyramid (e.g. USA, Canada).
- **Stage 5 (Declining)**: Very Low CBR below CDR $\\implies$ Negative growth, aging population. Inverted pyramid (e.g. Japan, Germany).`
      },
      {
        heading: '2. r-Selected vs. K-Selected Reproductive Strategies Matrix',
        content: `Evolutionary trade-offs in life history strategies tested on APES:

| Characteristic / Parameter | r-Selected Species | K-Selected Species | AP Exam Notes & Traps |
| :--- | :--- | :--- | :--- |
| **Body Size & Lifespan** | Small body size; short lifespan | Large body size; long lifespan | Whales, elephants, humans vs. bacteria, mice |
| **Offspring Quantity** | Many small offspring produced per clutch | Few, single offspring produced per pregnancy | r-selected invest zero energy per offspring |
| **Parental Care** | **Little to none** | **Extensive, prolonged** parental care | K-selected juveniles require heavy maternal investment |
| **Time to Reproductive Maturity** | Very fast (early maturity) | Slow (late sexual maturity) | r-selected can double populations in hours/days |
| **Carrying Capacity ($K$) Dynamic** | Boom-and-bust overshoot and crash cycles | Stable near carrying capacity ($K$) | S-shaped logistic curve vs. exponential J-curve |
| **Environmental Adaptation** | Highly adaptable ecological **generalists** | Specialized ecological **specialists** | Invasive species are almost always r-selected generalists! |
| **Survivorship Curve Type** | **Type III** (High infant mortality) | **Type I** (High adult survival) | Type II (songbirds/reptiles) falls intermediate |
| **Vulnerability to Extinction** | Low (recovers quickly from disturbances) | **HIGH** (slow recovery, easily overhunted) | Habitat fragmentation imperils K-selected species most |`
      }
    ],
    workedExamples: [
      {
        title: 'Rule of 70 Doubling Time Calculation',
        topicRef: 'CED 3.8 Human Population Dynamics',
        question: 'A developing nation has a Crude Birth Rate (CBR) of 38 per 1,000 and a Crude Death Rate (CDR) of 8 per 1,000. Net migration is zero. (a) Calculate the annual population growth rate ($r$), and (b) Calculate the number of years required for this nation’s population to double.',
        solutionSteps: [
          'Step 1: Calculate annual growth rate percentage: $r = \\frac{\\text{CBR} - \\text{CDR}}{10} = \\frac{38 - 8}{10} = \\frac{30}{10} = 3.0\\%$.',
          'Step 2: Apply the Rule of 70: $T_{\\text{double}} = \\frac{70}{r} = \\frac{70}{3.0} \\approx 23.33\\text{ years}$.'
        ],
        finalAnswer: 'Growth rate $r = 3.0\\%$; Doubling time $\\approx 23.3\\text{ years}$.',
        apScoringTip: 'Show both the division by 10 and the Rule of 70 fraction. Never forget to include units (years).'
      }
    ],
    diagrams: [
      {
        id: 'apes_survivorship_curves',
        title: 'Type I, II, and III Survivorship Curves',
        subtitle: 'Logarithmic Fraction Surviving vs. Relative Lifespan',
        type: 'survivorship_curves',
        description: 'Semilog graph showing Type I curve convex at top (high adult survival), Type II straight diagonal, and Type III dropping steeply at start (heavy early mortality).',
        takeaway: 'Type I corresponds to K-selected species with high parental care; Type III corresponds to r-selected species producing thousands of unparented offspring.'
      }
    ],
    commonTraps: [
      'Confusing Total Fertility Rate (TFR) with replacement level fertility. TFR is the average children born per woman; Replacement level is $2.1$ (the rate needed to replace parents and account for childhood mortality).',
      'Assuming death rates drop in DTM Stage 3. Death rates drop dramatically in **Stage 2** due to the medical revolution; Stage 3 is characterized by dropping **birth rates**.',
      'Treating carrying capacity ($K$) as an unbreakable ceiling. Populations frequently overshoot $K$, triggering a catastrophic die-off / population crash.'
    ],
    cramSheet: [
      'r-strategists: Small, many offspring, zero care, high infant mortality (Type III curve).',
      'K-strategists: Large, few offspring, high care, high adult survival (Type I curve).',
      'Rule of 70: $\\text{Doubling Time} = 70 / r\\%$.',
      'Total Fertility Rate (TFR) $< 2.1$ results in population decline over time.'
    ]
  },

  // ==========================================
  // UNIT 4: EARTH SYSTEMS & RESOURCES (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Earth Systems and Resources',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Plate tectonics, atmospheric convection cells, soil horizons, and oceanic circulation govern terrestrial climates and resource distributions.',
    keyTheorems: [
      {
        name: 'Tectonic Plate Boundary Types and Landforms',
        conditions: 'Lithospheric plates moving over the asthenosphere powered by mantle convection currents.',
        conclusion: '(1) Convergent: Plates collide (Continental-Oceanic creates subduction zones, deep ocean trenches, and volcanic mountain arcs; Continental-Continental crumples into non-volcanic mountain ranges like Himalayas); (2) Divergent: Plates pull apart (mid-ocean ridges, continental rift valleys, seafloor spreading); (3) Transform: Plates slide laterally past each other (shallow earthquakes, e.g. San Andreas Fault).',
        apTip: 'Tsunamis are triggered by underwater subduction zone earthquakes (convergent boundaries) when tectonic displacement thrusts an entire column of ocean water upward!'
      },
      {
        name: 'Atmospheric Convection Cells & Coriolis Effect',
        conditions: 'Differential solar heating of spherical Earth combined with planetary rotation.',
        conclusion: 'Equatorial intense heating drives Hadley Cells: Warm moist air rises at the Equator ($0^\\circ$, Intertropical Convergence Zone ITCZ), creating tropical rainforests; dry air sinks at $30^\\circ\\text{ N/S}$, creating major global subtropical deserts. Coriolis effect deflects moving winds to the right in the Northern Hemisphere and left in the Southern Hemisphere.',
        apTip: 'Air rises $\\implies$ expands, cools adiabatically $\\implies$ condensation, clouds, heavy rain. Air sinks $\\implies$ compresses, warms $\\implies$ dry, high pressure, clear skies.'
      }
    ],
    formulas: [
      {
        name: 'Soil Porosity Calculation',
        latex: '\\text{Porosity (\\%)} = \\frac{\\text{Pore Volume}}{\\text{Total Soil Volume}} \\times 100\\%',
        explanation: 'Clay has high total porosity but tiny pores (poor permeability); Sand has low porosity but large interconnected pores (high permeability).'
      }
    ],
    sections: [
      {
        heading: '1. Soil Horizons and Texture Triangle Reference',
        content: `Soil profiles and particle size dynamics:

- **O Horizon (Organic)**: Fresh and decomposing leaf litter, humus, and decomposing organic debris.
- **A Horizon (Topsoil)**: Mineral matter mixed with rich organic humus. Most biologically active layer for plant root absorption.
- **B Horizon (Subsoil)**: Zone of illuviation where clays, iron, and leached minerals accumulate.
- **C Horizon (Substratum)**: Partially weathered parent rock material.
- **R Horizon (Bedrock)**: Unweathered parent rock.

*Soil Particle Size Order*:
$$\\text{Clay } (< 0.002\\text{ mm}) < \\text{Silt } (0.002\\text{–}0.05\\text{ mm}) < \\text{Sand } (0.05\\text{–}2.0\\text{ mm})$$
- **Loam** ($40\\%\\text{ Sand}, 40\\%\\text{ Silt}, 20\\%\\text{ Clay}$) is the ideal agricultural soil balancing water retention and aeration.`
      },
      {
        heading: '2. Soil Horizons & Atmospheric Convection Cells Matrix',
        content: `Physical characteristics of Earth systems and resource stratification:

| System / Component | Defining Physical Layer / Zone | Hydraulic / Climatic Characteristics | Key AP Exam Diagnostic Feature |
| :--- | :--- | :--- | :--- |
| **O Horizon** | Surface Organic Layer | High organic matter, freshly decomposing leaf litter | Dark, rich in humus; missing in desert soils |
| **A Horizon (Topsoil)** | Mineral soil mixed with organic humus | High biological activity, earthworms, root absorption | Erodes quickly under conventional industrial tilling |
| **B Horizon (Subsoil)** | Zone of Illuviation / Mineral accumulation | Accumulation of leached iron, aluminum, and fine clays | Low organic content; dense clay pan layer |
| **Clay Particles** | $< 0.002\\text{ mm}$ (Smallest) | **Highest porosity**, but microscopic pores $\\implies$ **Lowest permeability** | Holds water tightly; prone to waterlogging crops |
| **Sand Particles** | $0.05 - 2.0\\text{ mm}$ (Largest) | Lowest porosity, but large interconnected pores $\\implies$ **Highest permeability** | Drains rapidly; prone to nutrient leaching |
| **Hadley Cell ($0^\\circ - 30^\\circ$)** | Tropical Convection Cell | Air rises at $0^\\circ$ (wet rainforest); sinks at $30^\\circ$ (arid desert) | Powers Trade Winds and Intertropical Convergence Zone (ITCZ) |
| **Ferrel Cell ($30^\\circ - 60^\\circ$)** | Mid-Latitude Convection Cell | Driven by interactions between Hadley and Polar cells | Produces prevailing Westerlies and temperate variable weather |`
      }
    ],
    workedExamples: [
      {
        title: 'El Niño-Southern Oscillation (ENSO) Dynamics',
        topicRef: 'CED 4.8 El Niño and La Niña',
        question: 'Describe the atmospheric and oceanic changes that occur in the Tropical Pacific during an El Niño event, and explain its ecological impact on South American fisheries.',
        solutionSteps: [
          'Step 1: Normal conditions: Trade winds blow strongly westward (East to West) across the Pacific, pushing warm surface water toward Indonesia. This allows cold, nutrient-rich deep water to upwell along the coast of Peru (South America).',
          'Step 2: El Niño changes: The easterly trade winds weaken or reverse direction to blow eastward.',
          'Step 3: Oceanic impact: Warm surface water sloshes eastward toward South America, suppressing the thermocline.',
          'Step 4: Upwelling shutdown: The cold, nutrient-rich upwelling off the Peruvian coast is completely blocked.',
          'Step 5: Ecological impact: Without nutrient upwelling (nitrates and phosphates), phytoplankton blooms crash, causing a collapse in anchovy and sardine populations, devastating the commercial fishing industry and seabirds.'
        ],
        finalAnswer: 'During El Niño, trade winds weaken, warm water moves eastward, and coastal upwelling is suppressed off South America, causing the collapse of commercial fisheries due to nutrient starvation.',
        apScoringTip: 'Be sure to link the atmospheric change (weakened trade winds) to the oceanic change (suppressed upwelling) to the biological outcome (fisheries collapse).'
      }
    ],
    diagrams: [
      {
        id: 'apes_soil_triangle',
        title: 'USDA Soil Texture Triangle Chart',
        subtitle: 'Percentages of Clay, Silt, and Sand Defining Soil Types',
        type: 'soil_triangle',
        description: 'Ternary soil triangle diagram showing intersecting coordinate grid lines for percent clay, silt, and sand leading to the central Loam region.',
        takeaway: 'Read clay horizontally across; read silt downward to the left; read sand diagonally upward to the left.'
      }
    ],
    commonTraps: [
      'Assuming clay has low porosity. Clay actually has HIGHER total porosity than sand, but its pore spaces are microscopic, so its permeability (water flow speed) is extremely low.',
      'Confusing weather with climate. Weather is short-term atmospheric conditions (hours/days); climate is 30-year average patterns of temperature and precipitation.',
      'Thinking the rain shadow effect produces rain on both sides of a mountain. The windward side receives heavy rain as air rises and cools; the leeward side receives dry, warm sinking air, creating an arid rain-shadow desert.'
    ],
    cramSheet: [
      'Soil horizons in order: O (Organic), A (Topsoil), B (Subsoil), C (Weathered rock), R (Bedrock).',
      'Particle size: Clay (smallest) < Silt < Sand (largest). Loam is the ideal farming soil.',
      'Hadley cells: Warm air rises at Equator ($0^\\circ$) $\\rightarrow$ heavy rain; dry air sinks at $30^\\circ\\text{ N/S}$ $\\rightarrow$ deserts.',
      'El Niño: Weakened trade winds $\\rightarrow$ suppressed upwelling off Peru $\\rightarrow$ fisheries collapse.'
    ]
  },

  // ==========================================
  // UNIT 5: LAND & WATER USE (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Land and Water Use',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Human resource extraction and agricultural methods can lead to depletion (Tragedy of the Commons). Sustainable practices protect soil, water, and forests.',
    keyTheorems: [
      {
        name: 'The Tragedy of the Commons (Garrett Hardin)',
        conditions: 'Shared, unregulated common-pool resources (e.g. open ocean fishing, public grazing land, atmosphere, groundwater).',
        conclusion: 'Individual users act independently and rationally according to self-interest, ultimately overexploiting and depleting the shared resource to the detriment of all users.',
        apTip: 'Solutions to the Tragedy of the Commons tested on AP exams: (1) Government regulation / permits / quotas (e.g. Clean Air Act, fishing catch shares), (2) Privatization of the land, (3) Community management agreements.'
      },
      {
        name: 'Integrated Pest Management (IPM)',
        conditions: 'Agricultural pest control designed to minimize environmental harm and prevent chemical resistance.',
        conclusion: 'A multi-tiered strategy that combines: (1) Biological controls (introducing natural predators like ladybugs, parasitic wasps), (2) Cultural practices (crop rotation, polyculture, trap crops), (3) Physical/mechanical barriers, and (4) Synthetic chemical pesticides used ONLY as a last-resort targeted spray.',
        apTip: 'IPM does NOT aim to eradicate $100\\%$ of pests! It aims to keep pest populations below the Economic Injury Level (EIL) while preserving beneficial insects.'
      }
    ],
    formulas: [
      {
        name: 'Percent Change Formula',
        latex: '\\text{\\% Change} = \\frac{\\text{New Value} - \\text{Old Value}}{\\text{Old Value}} \\times 100\\%',
        explanation: 'Fundamental math calculation tested extensively on APES FRQs.'
      }
    ],
    sections: [
      {
        heading: '1. Irrigation Efficiency Comparison Table',
        content: `Evaluating agricultural irrigation methods by water conservation:

| Irrigation Type | Water Efficiency | Mechanism & Labor Cost | Environmental Disadvantages |
| :--- | :--- | :--- | :--- |
| **Furrow** | $\\approx 60\\%$ (Low) | Trenches dug between crop rows flooded with water; inexpensive | High water loss to evaporation and runoff; risk of waterlogging |
| **Flood** | $\\approx 70\\%$ (Low) | Entire field flooded with water; flat land required | High evaporation; leads to **salinization** and waterlogging |
| **Center-Pivot Spray**| $\\approx 80\\%$ (Moderate) | Motorized rotating spray nozzles pump water over circular field | Higher energy and equipment capital costs |
| **Drip (Micro-irrigation)**| **$\\approx 95\\%$ (HIGHEST)**| Perforated tubes deliver water drop-by-drop directly to plant roots | Expensive installation; tubes can clog with sediment |

*Soil Salinization*: Repeated irrigation in dry climates deposits tiny traces of dissolved salts. As water evaporates, salt accumulates in the topsoil, eventually stunting crop growth and poisoning roots.`
      }
    ,
      {
        heading: '2. Sustainable Agriculture, Meat Production & Overfishing (CED 5.6-5.12)',
        content: `Resource exploitation impacts and sustainable management techniques:

* **Tragedy of the Commons (Garrett Hardin)**:
  * Individuals acting independently and rationally according to self-interest deplete a shared, un-owned open-access resource (overgrazing public pastures, oceanic overfishing, atmospheric greenhouse dumping).
  * **Solutions**: Private property ownership, government-enforced catch/grazing quotas, user-fee permits.
* **Meat Production & CAFO Environmental Costs**:
  * **Concentrated Animal Feeding Operations (CAFOs)**: High-density livestock confinement; produces massive manure lagoons leaking nitrates/pathogens into aquifers, requires antibiotic usage promoting resistant bacteria strains.
  * **Trophic Energy Inefficiency**: Producing $1\\text{ kg}$ of beef requires $\\approx 20\\text{ kg}$ of grain and $15{,}000\\text{ L}$ of water, consuming far more arable land than direct plant agriculture.
* **Commercial Overfishing & Bycatch**:
  * **Bottom Trawling**: Drags heavy weighted nets across seafloor, pulverizing benthic coral reef habitats.
  * **Bycatch**: Non-target marine organisms (sea turtles, dolphins, juvenile fish) killed in fishing gear.
  * **Maximum Sustainable Yield (MSY)**: The maximum harvestable catch that can be taken indefinitely without reducing population recruitment (typically at half carrying capacity, $K/2$).`
      }
    ],
    workedExamples: [
      {
        title: 'Meat Production vs. Grain Efficiency Calculation',
        topicRef: 'CED 5.7 Meat Production Methods',
        question: 'It takes $8\\text{ kg}$ of grain to produce $1\\text{ kg}$ of edible beef in a Concentrated Animal Feeding Operation (CAFO). A feedlot produces $50,000\\text{ kg}$ of beef annually. (a) Calculate the mass of grain needed to feed these cattle, and (b) If $1\\text{ kg}$ of grain feeds 2 people for a day, how many person-days of food are sacrificed by routing the grain through cattle rather than directly to humans?',
        solutionSteps: [
          'Step 1: Calculate total grain required: $50,000\\text{ kg beef} \\times 8\\text{ kg grain/kg beef} = 400,000\\text{ kg grain}$.',
          'Step 2: Calculate person-days supported directly by grain: $400,000\\text{ kg grain} \\times 2\\text{ person-days/kg grain} = 800,000\\text{ person-days}$.',
          'Step 3: Analyze efficiency loss: $90\\%$ of the grain caloric energy is lost to cattle metabolism, respiration, and manure (10% trophic rule).'
        ],
        finalAnswer: 'Grain required = $400,000\\text{ kg}$; $800,000\\text{ person-days}$ of human food are consumed by the cattle.',
        apScoringTip: 'Show all conversion dimensional analysis factors clearly. Setting up units that cancel out prevents math arithmetic mistakes.'
      }
    ],
    diagrams: [
      {
        id: 'apes_ipm_pyramid',
        title: 'Integrated Pest Management (IPM) Hierarchy Pyramid',
        subtitle: 'Prevention & Cultural Controls at Base $\\rightarrow$ Chemical Sprays at Peak',
        type: 'ipm_hierarchy_pyramid',
        description: 'Pyramid showing Cultural Controls (crop rotation) at wide base, Physical/Mechanical barriers in middle, Biological controls above, and Chemical pesticides as tiny apex of last resort.',
        takeaway: 'IPM minimizes chemical pesticide use by prioritizing preventative cultural, physical, and biological controls first.'
      }
    ],
    commonTraps: [
      'Believing clearcutting is environmentally sustainable because trees grow back. Clearcutting causes massive topsoil erosion, mudslides, streams sedimentation, water warming, and total biodiversity loss.',
      'Assuming drip irrigation is universally adopted. Drip irrigation is the most water-efficient ($95\\%$), but its high equipment and installation cost prevents low-income farmers from utilizing it.',
      'Confusing the pesticide treadmill with biological biomagnification. The pesticide treadmill is the evolutionary cycle where pests evolve resistance to chemicals, requiring higher doses or new toxic formulations.'
    ],
    cramSheet: [
      'Tragedy of the Commons: Shared unregulated resource depleted by individual self-interest.',
      'Drip irrigation is the most efficient ($95\\%$ water efficiency; minimal evaporation).',
      'IPM: Combines biological, cultural, and mechanical controls; uses chemicals only as last resort.',
      'Overgrazing causes soil compaction and desertification; CAFOs produce massive concentrated manure runoff.'
    ]
  },

  // ==========================================
  // UNIT 6: ENERGY RESOURCES & CONSUMPTION (CED 10%–15% of Exam)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Energy Resources & Consumption',
    examWeight: '10%–15% of AP Exam',
    bigIdea: 'Human society relies on renewable and nonrenewable energy sources. Burning fossil fuels drives greenhouse emissions, while renewable transitions face storage and grid challenges.',
    keyTheorems: [
      {
        name: 'The Thermal Power Plant Electricity Generation Cycle',
        conditions: 'Generating electricity from coal, natural gas, biomass, or nuclear fission.',
        conclusion: 'Fuel heat generates high-pressure steam in a boiler $\\rightarrow$ Steam spins turbine blades $\\rightarrow$ Turbine shaft rotates electromagnets inside a copper wire generator $\\rightarrow$ Mechanical energy converted to electrical current via electromagnetic induction.',
        apTip: 'Thermal power plants require vast quantities of cooling water. Discharging heated water back into rivers causes THERMAL POLLUTION: Warm water holds less dissolved oxygen, causing fish asphyxiation.'
      },
      {
        name: 'Nuclear Fission vs. Fossil Fuel Generation',
        conditions: 'Uranium-235 fission in light-water commercial reactors.',
        conclusion: 'Neutron strikes $^{235}\\text{U}$, splitting it into fission fragments, releasing heat and additional neutrons in a self-sustaining chain reaction. Nuclear power emits ZERO greenhouse gases ($\\text{CO}_2, \\text{SO}_2, \\text{NO}_x$) during operation, but generates long-lived radioactive spent fuel (half-life of $^{239}\\text{Pu}$ is $24,000\\text{ years}$).',
        apTip: 'Control rods (cadmium/boron) ABSORB neutrons to slow the chain reaction; the moderator (water/graphite) SLOWS DOWN neutrons so they can be captured.'
      }
    ],
    formulas: [
      {
        name: 'Electrical Energy & Power Formula',
        latex: '\\text{Energy (kWh)} = \\frac{\\text{Power (Watts)} \\times \\text{Time (Hours)}}{1000}',
        explanation: 'Standard utility billing unit ($1\\text{ kWh} = 3.6 \\times 10^6\\text{ Joules}$).'
      },
      {
        name: 'Radioactive Half-Life Decay',
        latex: 'N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t / t_{1/2}}',
        explanation: 'Fraction remaining after $n$ half-lives is $(1/2)^n$.'
      }
    ],
    sections: [
      {
        heading: '1. Renewable vs. Nonrenewable Energy Sources Comparison',
        content: `Master the pros, cons, and environmental trade-offs of major global energy sources:

| Energy Source | Renewable? | Major Advantages | Major Environmental Drawbacks |
| :--- | :--- | :--- | :--- |
| **Coal** | **Nonrenewable** | Abundant reserves; high energy density; inexpensive | Emits $\\text{CO}_2$, $\\text{SO}_2$ (acid rain), mercury, toxic coal ash |
| **Natural Gas** | **Nonrenewable** | Burns cleaner than coal ($50\\% \\text{ less CO}_2$); rapid startup | **Methane ($\\text{CH}_4$) leaks** during fracking; groundwater contamination |
| **Nuclear Fission** | **Nonrenewable** | **Zero direct $\\text{CO}_2$ emissions**; high baseload reliability | Radioactive waste storage (Yucca Mountain); catastrophic risk |
| **Hydroelectric** | **Renewable** | Zero emissions; reservoir water storage; recreation | Floods upstream habitat; disrupts fish migration; downstream silt starvation |
| **Solar Photovoltaic**| **Renewable** | Infinite energy; zero operating emissions; rooftop modularity | Intermittent (requires battery storage); toxic mining for rare metals |
| **Wind Turbines** | **Renewable** | Zero emissions; small land footprint; low operating cost | Intermittent; bird/bat collisions; aesthetic/noise concerns |`
      }
    ,
      {
        heading: '2. Nuclear Fission Energy, Half-Life Decay & Grid Efficiency (CED 6.6-6.9)',
        content: `Nuclear power plant mechanics, nuclear waste, and energy conservation:

* **Nuclear Fission Power Plant Mechanics**:
  * Uranium-235 pellets undergo controlled nuclear fission in a reactor core:
    $$^{235}_{92}\\text{U} + ^1_0\\text{n} \\rightarrow ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3 \\, ^1_0\\text{n} + \\text{Energy}$$
  * **Control Rods**: Made of neutron-absorbing materials (cadmium or boron); inserted between fuel rods to regulate or halt the fission chain reaction.
  * **Clean Operation**: Produces zero direct emissions of greenhouse gases ($CO_2, CH_4$) or criteria air pollutants during electricity generation.
  * **Thermal Pollution**: Cooling water discharged into natural water bodies reduces dissolved oxygen ($DO$), causing thermal shock to aquatic organisms.
* **Radioactive Half-Life Calculations**:
  $$N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t / t_{1/2}}$$
  * High-level radioactive spent fuel remains hazardous for tens of thousands of years, currently stored on-site in lead-lined steel dry casks.
* **Cogeneration (Combined Heat and Power - CHP)**:
  * Harnessing waste thermal energy from industrial electricity generation to heat nearby buildings, elevating overall thermodynamic efficiency from $\\approx 35\\%$ to over $80\\%$!`
      }
    ],
    workedExamples: [
      {
        title: 'Radioactive Waste Decay and Half-Life Calculation',
        topicRef: 'CED 6.6 Nuclear Energy & Half-Life',
        question: 'A sample of medical radioactive iodine-131 has a half-life of $8.0\\text{ days}$. If an initial sample has an activity of $80.0\\text{ grams}$, calculate (a) how many half-lives have elapsed after $32\\text{ days}$, and (b) the remaining mass of iodine-131.',
        solutionSteps: [
          'Step 1: Calculate number of half-lives elapsed: $n = \\frac{\\text{Total Time}}{t_{1/2}} = \\frac{32\\text{ days}}{8.0\\text{ days}} = 4\\text{ half-lives}$.',
          'Step 2: Calculate remaining mass after 4 half-lives: $M = M_0 \\times \\left(\\frac{1}{2}\\right)^4 = 80.0 \\times \\frac{1}{16} = 5.0\\text{ grams}$.'
        ],
        finalAnswer: '4 half-lives have elapsed; $5.0\\text{ grams}$ of iodine-131 remain.',
        apScoringTip: 'Half-life math on APES exams can almost always be solved by successive halving: $80 \\rightarrow 40 \\rightarrow 20 \\rightarrow 10 \\rightarrow 5$. Show the sequence clearly!'
      }
    ],
    diagrams: [
      {
        id: 'apes_thermal_power_plant',
        title: 'Thermal Electric Power Generation Flowchart',
        subtitle: 'Fuel Combustion $\\rightarrow$ Boiler Steam $\\rightarrow$ Turbine $\\rightarrow$ Generator',
        type: 'power_plant_flow',
        description: 'Diagram showing heat source creating steam, high-pressure steam spinning turbine blades, magnetic generator creating electricity, and cooling condenser tower.',
        takeaway: 'All thermal power plants (coal, gas, nuclear, biomass) use the same fundamental physics: Steam spins a turbine connected to an electromagnetic generator.'
      }
    ],
    commonTraps: [
      'Assuming nuclear energy emits greenhouse gases during electricity generation. Nuclear fission releases ZERO $\\text{CO}_2, \\text{SO}_2,$ or $\\text{NO}_x$ emissions during operation.',
      'Claiming biomass energy is nonrenewable. Biomass (wood, crop residues) is renewable as long as harvest rates do not exceed replenishment rates.',
      'Forgetting that hydraulic fracturing (fracking) injects high-pressure fluid underground to fracture shale rock, releasing trapped natural gas.'
    ],
    cramSheet: [
      'Coal combustion releases: $\\text{CO}_2$, $\\text{SO}_2$ (acid rain), $\\text{NO}_x$, Particulates, and Mercury.',
      'Natural gas (methane $\\text{CH}_4$) is the cleanest burning fossil fuel, but fracking risks groundwater contamination and fugitive leaks.',
      'Nuclear: High baseload, zero $\\text{CO}_2$ emissions, but creates long-lived radioactive spent fuel.',
      'Thermal pollution: Warm cooling water discharge lowers dissolved oxygen in rivers, suffocating fish.'
    ]
  },

  // ==========================================
  // UNIT 7: ATMOSPHERIC POLLUTION (CED 7%–10% of Exam)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Atmospheric Pollution',
    examWeight: '7%–10% of AP Exam',
    bigIdea: 'Air pollutants from stationary and mobile sources undergo chemical reactions forming secondary smog and acid rain. Thermal inversions trap pollutants locally.',
    keyTheorems: [
      {
        name: 'Photochemical Smog Formation Mechanism',
        conditions: 'Sunlight acting on motor vehicle exhaust in urban valleys.',
        conclusion: '$\\text{NO}_x + \\text{VOCs} + \\text{Sunlight} \\rightarrow \\text{Tropospheric Ozone } (\\text{O}_3) + \\text{PANs} + \\text{Aldehydes}$. Ozone peaks in the late afternoon when sunlight intensity and atmospheric temperatures are highest.',
        apTip: 'Tropospheric ozone is a harmful secondary pollutant (causes respiratory irritation and plant tissue necrosis); Stratospheric ozone is beneficial (shields Earth from UV-B radiation)!'
      },
      {
        name: 'Thermal Inversion Trap',
        conditions: 'Valleys bounded by mountains where a warm air layer traps a cold air layer beneath it.',
        conclusion: 'Normal lapse rate (air cools with altitude) is inverted: A warm inversion layer acts as an atmospheric lid, preventing convection and trapping high concentrations of surface pollutants near the ground.',
        apTip: 'Thermal inversions frequently cause catastrophic urban air pollution spikes in cities like Los Angeles, Mexico City, and Santiago.'
      }
    ],
    formulas: [
      {
        name: 'Acid Rain Chemical Formation',
        latex: '\\text{SO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{SO}_4, \\quad 2\\text{NO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{HNO}_3 + \\text{HNO}_2',
        explanation: 'Sulfur dioxide from coal plants and nitrogen oxides from vehicle engines dissolve in clouds to form sulfuric and nitric acids (pH $< 5.6$).'
      }
    ],
    sections: [
      {
        heading: '1. Primary vs. Secondary Pollutants & Major Indoor Pollutants',
        content: `Classification of atmospheric contaminants:

- **Primary Pollutants**: Emitted directly from source into air ($\\text{CO}, \\text{CO}_2, \\text{SO}_2, \\text{NO}_x$, particulate matter $\\text{PM}_{2.5}/\\text{PM}_{10}$, raw unburned VOCs).
- **Secondary Pollutants**: Formed when primary pollutants react with sunlight, water, or oxygen in the atmosphere (Tropospheric $\\text{O}_3$, Sulfuric Acid $\\text{H}_2\\text{SO}_4$, Nitric Acid $\\text{HNO}_3$, PANs).
- **Major Indoor Air Pollutants**:
  - **Radon-222**: Radioactive gas naturally seeping into basements from uranium decay in bedrock; **#2 cause of lung cancer**.
  - **Carbon Monoxide (CO)**: Odorless gas from malfunctioning furnaces; binds hemoglobin causing asphyxiation.
  - **Asbestos**: Fibrous mineral formerly used in insulation; causes mesothelioma lung disease.
  - **Lead**: Found in old paint and pipes; causes neurological impairment in children.`
      },
      {
        heading: '2. Criteria Air Pollutants & Mitigation Technologies Matrix',
        content: `Clean Air Act Criteria Pollutants and emission control engineering:

| Criteria Air Pollutant | Primary or Secondary? | Primary Anthropogenic Source | Human / Ecological Damage | Engineering Mitigation Technology |
| :--- | :--- | :--- | :--- | :--- |
| **Sulfur Dioxide ($\\text{SO}_2$)** | **Primary** | Coal combustion in power plants | Respiratory irritant, precursor to **Acid Rain** ($\\text{H}_2\\text{SO}_4$) | **Wet Scrubbers** (calcium carbonate spray), low-sulfur coal |
| **Nitrogen Oxides ($\\text{NO}_x$)** | **Primary** | Motor vehicle exhaust, fossil fuel combustion | Lung inflammation, precursor to **Photochemical Smog** & Acid Rain | **Catalytic Converters** (reduces $\\text{NO}_x$ to $\\text{N}_2$ and $\\text{O}_2$) |
| **Carbon Monoxide ($\\text{CO}$)** | **Primary** | Incomplete combustion of fossil fuels | Binds hemoglobin, asphyxiation (deadly odorless gas) | Catalytic converters, proper home furnace ventilation |
| **Particulate Matter ($\\text{PM}_{2.5}$)** | **Primary** & Secondary | Diesel soot, construction, road dust, coal smoke | Deep alveolar lung tissue penetration, asthma, haze | **Electrostatic Precipitators**, Baghouse fabric filters |
| **Tropospheric Ozone ($\\text{O}_3$)** | **Secondary** | $\\text{NO}_x + \\text{VOCs} + \\text{Sunlight}$ (Peaks in PM) | Plant stomatal damage, necrosis, human respiratory pain | Limit commuter vehicle miles traveled, vapor recovery nozzles |
| **Lead ($\\text{Pb}$)** | **Primary** | Historical leaded gasoline, smelters, waste incineration | Neurotoxin causing cognitive deficit and brain damage | Phase-out of leaded gasoline and leaded aviation fuel |`
      }
    ],
    workedExamples: [
      {
        title: 'Acid Rain Buffering Capacity of Limestone Bedrock',
        topicRef: 'CED 7.7 Acid Deposition',
        question: 'Explain why lakes situated on limestone (calcium carbonate) bedrock are resistant to acidification from acid precipitation, while lakes on granite bedrock suffer catastrophic drops in pH.',
        solutionSteps: [
          'Step 1: Identify acid precipitation chemistry: Acid rain contains sulfuric acid ($\\text{H}_2\\text{SO}_4$) and nitric acid ($\\text{HNO}_3$), releasing hydrogen ions ($\\text{H}^+$).',
          'Step 2: Limestone chemistry: Limestone is composed of calcium carbonate ($\\text{CaCO}_3$), which acts as a natural chemical buffer: $\\text{CaCO}_3 + 2\\text{H}^+ \\rightarrow \\text{Ca}^{2+} + \\text{H}_2\\text{O} + \\text{CO}_2$.',
          'Step 3: Neutralization: The carbonate ions neutralize the added acidity, maintaining lake pH near neutral ($6.5\\text{–}7.5$).',
          'Step 4: Granite bedrock: Granite is composed of insoluble silica ($\\text{SiO}_2$) with zero buffering capacity.',
          'Step 5: Conclude: In granite watersheds, acid rain causes lake pH to drop rapidly below $5.0$, causing aluminum ions to leach from soil and suffocating fish gills.'
        ],
        finalAnswer: 'Limestone contains calcium carbonate ($\\text{CaCO}_3$) which chemically neutralizes added acid rain; granite lacks buffering capacity, leading to severe acidification.',
        apScoringTip: 'Mention the term "calcium carbonate" or "buffering capacity" to earn full credit on acid deposition FRQs.'
      }
    ],
    diagrams: [
      {
        id: 'apes_photochemical_smog',
        title: 'Photochemical Smog Reaction Cycle',
        subtitle: 'NOx + VOCs + Sunlight $\\rightarrow$ Tropospheric Ozone Peak',
        type: 'photochemical_smog_timeline',
        description: 'Timeline graph showing commuter rush-hour peaks of NO and VOCs at 8 AM, followed by sunlight peak at noon driving the afternoon spike in hazardous ground-level ozone at 3 PM.',
        takeaway: 'Ozone is a secondary pollutant formed by sunlight; its highest concentration occurs in sunny mid-afternoons.'
      }
    ],
    commonTraps: [
      'Confusing photochemical smog (brown smog) with industrial smog (gray smog). Photochemical smog is caused by vehicle $\\text{NO}_x$ and VOCs reacting with sunlight; industrial smog is caused by coal combustion sulfur dioxide and particulates.',
      'Thinking radon gas comes from insulation or paint. Radon seeps naturally from the radioactive decay of uranium in underlying bedrock and enters through foundation cracks.',
      'Confusing acid rain with ozone depletion. Acid rain is caused by $\\text{SO}_2$ and $\\text{NO}_x$; ozone depletion is caused by CFCs.'
    ],
    cramSheet: [
      'Photochemical smog = $\\text{NO}_x + \\text{VOCs} + \\text{Sunlight} \\rightarrow \\text{O}_3$ (peaks in afternoon).',
      'Thermal inversion: Warm layer sits on top of cold air, trapping urban pollutants in valleys.',
      'Acid rain: $\\text{SO}_2$ (coal plants) and $\\text{NO}_x$ (vehicles) form $\\text{H}_2\\text{SO}_4$ and $\\text{HNO}_3$. Limestone buffers it.',
      'Radon-222: Bedrock gas in basements causing lung cancer; Carbon Monoxide: Incomplete combustion causing asphyxiation.'
    ]
  },

  // ==========================================
  // UNIT 8: AQUATIC & TERRESTRIAL POLLUTION (CED 7%–10% of Exam)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Aquatic and Terrestrial Pollution',
    examWeight: '7%–10% of AP Exam',
    bigIdea: 'Pollution impacts aquatic ecosystems through cultural eutrophication and bioaccumulation. Solid waste landfills and municipal wastewater require engineered solutions.',
    keyTheorems: [
      {
        name: 'The Cultural Eutrophication Cascade',
        conditions: 'Excess agricultural fertilizer (nitrogen/phosphorus) runoff entering an aquatic waterway.',
        conclusion: 'Fertilizer influx triggers massive algae bloom $\\rightarrow$ Algae die when nutrients deplete $\\rightarrow$ Aerobic decomposing bacteria consume dead biomass $\\rightarrow$ Bacterial respiration depletes Dissolved Oxygen (DO) $\\rightarrow$ Waterway becomes **Hypoxic (Dead Zone)**, suffocating fish.',
        apTip: 'The algae do NOT directly kill the fish! Fish die of hypoxia because the DECOMPOSING BACTERIA consume all the dissolved oxygen while breaking down dead algae.'
      },
      {
        name: 'Bioaccumulation vs. Biomagnification',
        conditions: 'Fat-soluble, persistent chemical contaminants (e.g. DDT, methylmercury, PCBs).',
        conclusion: 'Bioaccumulation is the buildup of a toxin in the fatty tissues of a single individual organism over its lifetime. Biomagnification is the exponential increase in toxic concentration at progressively higher trophic levels up the food chain.',
        apTip: 'Apex predators (e.g. bald eagles, killer whales, tuna) exhibit the highest toxic concentrations because they consume thousands of contaminated prey items.'
      }
    ],
    formulas: [
      {
        name: 'LD50 (Lethal Dose 50%)',
        latex: '\\text{LD}_{50} = \\text{Dose required to kill exactly } 50\\% \\text{ of the test population}',
        explanation: 'Lower numerical $\\text{LD}_{50}$ value indicates a MORE toxic chemical substance.'
      }
    ],
    sections: [
      {
        heading: '1. Sewage Wastewater Treatment Stages',
        content: `Three-stage municipal wastewater purification:

1. **Primary Treatment (Physical)**:
   - Screens and bar racks filter out large debris (rags, plastic, sticks).
   - Settling grit tanks allow heavy suspended organic solids to settle to the bottom as sludge.
2. **Secondary Treatment (Biological)**:
   - Aerobic bacteria break down dissolved organic wastes in large aeration basins.
   - Requires continuous injection of oxygen to support aerobic bacterial digestion.
3. **Tertiary Treatment (Chemical / Advanced)**:
   - Removes excess nitrates and phosphates to prevent cultural eutrophication in receiving rivers.
   - Disinfection: Effluent treated with chlorine, ozone, or UV radiation to kill pathogenic bacteria (e.g. E. coli) before environmental discharge.`
      },
      {
        heading: '2. Oxygen Sag Curve Zones & Wastewater Purification Matrix',
        content: `Anatomy of aquatic pollution degradation and municipal sewage processing:

| Stream Zone / Stage | Dissolved Oxygen (DO) Level | Biological Oxygen Demand (BOD) | Characteristic Organisms Present | Key Water Quality Process |
| :--- | :--- | :--- | :--- | :--- |
| **1. Clean Zone (Upstream)** | **High** ($> 8\\text{ ppm}$) | **Low** ($< 2\\text{ ppm}$) | Trout, bass, mayfly larvae, stonefly nymphs | Pristine oxygen-rich stream ecosystem |
| **2. Decomposition Zone** | Dropping rapidly | **Skyrocketing** | Carp, gar, leeches, blackfly larvae | High organic influx; aerobic bacteria consume DO |
| **3. Septic Zone** | **Extremely Low / Zero** ($< 2\\text{ ppm}$) | Declining slowly | Anaerobic bacteria, sludge worms, red midge larvae | **Hypoxic Dead Zone**: Fish suffocate and float dead |
| **4. Recovery Zone** | Rising back to normal | Returning to baseline | Rough fish, tolerant insects re-emerging | Natural re-aeration across stream riffles |
| **Primary Wastewater** | Physical mechanical | Removes suspended solids as sludge | Bar screens, grit chambers, settling clarifier tanks | Filters $60\\%$ of suspended solids mechanically |
| **Secondary Wastewater** | **Biological aerobic** | Slashes BOD by $90\\%$ | Aeration basins injected with activated sludge bacteria | Aerobic digestion of dissolved organic wastes |
| **Disinfection Step** | Chemical / Radiation | Destroys pathogens | Treated with **Chlorine, Ozone, or UV Light** | Neutralizes coliform bacteria prior to river release |`
      }
    ],
    workedExamples: [
      {
        title: 'Interpreting Dose-Response Curves and LD50',
        topicRef: 'CED 8.12 Lethal Dose 50% (LD50)',
        question: 'A toxicological trial tests Chemical A and Chemical B on mice. The $\\text{LD}_{50}$ of Chemical A is $15\\text{ mg/kg}$, while the $\\text{LD}_{50}$ of Chemical B is $450\\text{ mg/kg}$. (a) State which chemical is more toxic, and (b) Calculate the mass of Chemical A needed to kill $50\\%$ of a population of rats weighing $2.0\\text{ kg}$ each.',
        solutionSteps: [
          'Step 1: Compare $\\text{LD}_{50}$ values: Chemical A requires only $15\\text{ mg/kg}$ to kill half the animals, whereas Chemical B requires $450\\text{ mg/kg}$.',
          'Step 2: Conclusion (a): Lower $\\text{LD}_{50}$ means higher toxicity $\\implies$ **Chemical A is significantly more toxic**.',
          'Step 3: Calculate lethal dose for a $2.0\\text{ kg}$ animal: $\\text{Dose} = 15\\text{ mg/kg} \\times 2.0\\text{ kg} = 30\\text{ mg}$.'
        ],
        finalAnswer: 'Chemical A is more toxic; $30\\text{ mg}$ of Chemical A represents the lethal dose for a $2.0\\text{ kg}$ rat.',
        apScoringTip: 'Remember the inverse relationship: Smaller $\\text{LD}_{50}$ means the chemical is MORE toxic (it takes a smaller dose to kill).'
      }
    ],
    diagrams: [
      {
        id: 'apes_eutrophication_steps',
        title: 'Cultural Eutrophication and Oxygen Sag Curve',
        subtitle: 'Nutrient Runoff $\\rightarrow$ Algae Bloom $\\rightarrow$ Decomposition $\\rightarrow$ Hypoxia',
        type: 'oxygen_sag_curve',
        description: 'Curve tracking Biological Oxygen Demand (BOD) spiking immediately after sewage discharge while Dissolved Oxygen (DO) plummets into the septic dead zone before gradually recovering downstream.',
        takeaway: 'Decomposition of organic matter creates high Biological Oxygen Demand (BOD), driving Dissolved Oxygen (DO) down to lethal hypoxic levels.'
      }
    ],
    commonTraps: [
      'Claiming algae blooms directly suffocate fish. Algae produce oxygen by day; fish suffocate because aerobic BACTERIA consume all oxygen when decomposing the dead algae.',
      'Confusing bioaccumulation with biomagnification. Bioaccumulation = within one individual over time; Biomagnification = increasing concentration across successive trophic levels.',
      'Thinking sanitary landfills are compost heaps. Modern landfills are tightly sealed anaerobic tomb environments designed to prevent decomposition and leachate leaks, producing methane gas.'
    ],
    cramSheet: [
      'Eutrophication: Excess N & P runoff $\\rightarrow$ Algae bloom $\\rightarrow$ Algae die $\\rightarrow$ Decomposers consume oxygen $\\rightarrow$ Fish kill (hypoxia).',
      'Biomagnification: Fat-soluble toxins (DDT, mercury) reach highest concentrations in top apex predators.',
      'Lower $\\text{LD}_{50}$ = MORE toxic substance.',
      'Wastewater: Primary = physical settling; Secondary = biological bacteria; Disinfection = chlorine, UV, or ozone.'
    ]
  },

  // ==========================================
  // UNIT 9: GLOBAL CHANGE (CED 15%–20% of Exam - Highest Weight)
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Global Change',
    examWeight: '15%–20% of AP Exam',
    bigIdea: 'Anthropogenic greenhouse gases cause global climate disruption and ocean acidification. Stratospheric ozone depletion is mitigated by international treaties.',
    keyTheorems: [
      {
        name: 'The Greenhouse Effect Mechanism',
        conditions: 'Solar radiation interacting with Earth’s surface and atmosphere.',
        conclusion: 'Sun emits shortwave ultraviolet and visible light radiation $\\rightarrow$ Earth’s surface absorbs light and re-radiates it as longwave INFRARED (heat) radiation $\\rightarrow$ Greenhouse gases ($\\text{H}_2\\text{O}, \\text{CO}_2, \\text{CH}_4, \\text{N}_2\\text{O}, \\text{CFCs}$) absorb and re-emit infrared heat back toward Earth, warming the troposphere.',
        apTip: 'Water vapor ($\\text{H}_2\\text{O}$) is the most abundant natural greenhouse gas; Carbon dioxide ($\\text{CO}_2$) is the most impactful anthropogenic driver; Methane ($\\text{CH}_4$) has roughly $25\\text{–}30\\times$ higher Global Warming Potential (GWP) than $\\text{CO}_2$.'
      },
      {
        name: 'Ocean Acidification Chemistry',
        conditions: 'Excess atmospheric carbon dioxide dissolving into seawater.',
        conclusion: '$\\text{CO}_2 + \\text{H}_2\\text{O} \\rightarrow \\text{H}_2\\text{CO}_3 \\rightarrow \\text{H}^+ + \\text{HCO}_3^-$. Added hydrogen ions bind free carbonate ions ($\\text{H}^+ + \\text{CO}_3^{2-} \\rightarrow \\text{HCO}_3^-$), depleting carbonate needed by marine calcifiers to build calcium carbonate ($\\text{CaCO}_3$) shells, causing coral bleaching and shell dissolution.',
        apTip: 'Ocean acidification is caused directly by CHEMICAL DISSOLUTION of $\\text{CO}_2$ gas, NOT by ocean warming!'
      },
      {
        name: 'Stratospheric Ozone Depletion vs. The Montreal Protocol',
        conditions: 'Chlorofluorocarbons (CFCs) reaching the stratosphere.',
        conclusion: 'UV light cleaves chlorine free radicals from CFCs: $\\text{Cl} + \\text{O}_3 \\rightarrow \\text{ClO} + \\text{O}_2$. A single chlorine atom catalytically destroys up to $100,000$ ozone molecules! The 1987 **Montreal Protocol** successfully phased out global CFC production, allowing the ozone layer to recover.',
        apTip: 'DO NOT CONFUSE OZONE DEPLETION WITH CLIMATE CHANGE! Ozone depletion causes skin cancer and cataracts from UV radiation; it does NOT cause global warming!'
      }
    ],
    formulas: [
      {
        name: 'Ocean Acidification Equilibrium',
        latex: '\\text{CO}_2(aq) + \\text{H}_2\\text{O}(l) \\rightleftharpoons \\text{H}_2\\text{CO}_3(aq) \\rightleftharpoons \\text{H}^+(aq) + \\text{HCO}_3^-(aq)',
        explanation: 'Dissolved $\\text{CO}_2$ increases $[\\text{H}^+]$, lowering ocean pH and consuming carbonate ions ($\\text{CO}_3^{2-}$).'
      }
    ],
    sections: [
      {
        heading: '1. Consequences of Global Climate Change Reference Guide',
        content: `Major verified impacts of rising global temperatures:

- **Thermal Expansion of Oceans**: Over half of sea level rise is caused by the simple physical thermal expansion of water as it warms, combined with the melting of terrestrial continental glaciers and ice sheets (Greenland, Antarctica). Melting sea ice does NOT raise sea levels!
- **Positive Climate Feedback Loops**:
  - *Ice-Albedo Feedback*: Melting reflective white polar ice exposes dark ocean water $\\rightarrow$ dark water absorbs more solar heat $\\rightarrow$ accelerates further ice melt.
  - *Permafrost Methane Release*: Warming melts Arctic tundra permafrost $\\rightarrow$ anaerobic microbes decompose thawed organic matter, releasing massive methane ($\\text{CH}_4$) gas $\\rightarrow$ accelerates warming.
- **Invasive Species Characteristics (H.I.P.C.O.)**:
  - Habitat destruction, Invasive species, Population growth, Pollution, Climate change, Overexploitation.
  - Invasive species are r-selected ecological generalists that outcompete native specialists lacking natural predators.`
      },
      {
        heading: '2. Greenhouse Gases, Ozone Depletion & Treaties Matrix',
        content: `Master comparison of anthropogenic atmospheric drivers and global environmental treaties:

| Atmospheric Gas / Treaty | Atmospheric Residence Time | Global Warming Potential (GWP) | Anthropogenic Emission Source | Specific Environmental Hazard |
| :--- | :--- | :--- | :--- | :--- |
| **Carbon Dioxide ($\\text{CO}_2$)** | $100 - 1000\\text{ years}$ | **$1$ (Baseline)** | Fossil fuel combustion, deforestation, cement | Traps infrared heat $\\rightarrow$ Sea level rise, ocean acidification |
| **Methane ($\\text{CH}_4$)** | $12\\text{ years}$ | **$\\approx 25 - 30\\times$** | Livestock digestion, landfills, natural gas leaks, rice paddies | Potent short-term greenhouse gas warming |
| **Nitrous Oxide ($\\text{N}_2\\text{O}$)** | $114\\text{ years}$ | **$\\approx 300\\times$** | Synthetic fertilizer over-application, manure | Traps heat and participates in ozone layer reactions |
| **CFCs / Halocarbons** | $50 - 100+\\text{ years}$ | **$5,000 - 10,000+\\times$** | Refrigerants, aerosols, air conditioners | **Destroys stratospheric ozone layer** (Chlorine radical catalytic cycle) |
| **Water Vapor ($\\text{H}_2\\text{O}$)** | $9\\text{ days}$ | Variable | Natural evaporation (amplified by global warming) | Most abundant natural greenhouse gas; positive feedback loop |
| **Montreal Protocol (1987)** | International Treaty | Solved CFC phase-out | Regulates ozone-depleting substances | **Healed the stratospheric ozone hole** (NOT climate change!) |
| **Kyoto Protocol & Paris Accord** | International Treaties | Legally binding & voluntary targets | Target greenhouse gas emission reductions | Keep global warming below $1.5^\\circ\\text{C}$ pre-industrial levels |`
      }
    ],
    workedExamples: [
      {
        title: 'Thermal Expansion and Ice Melt Sea Level Rise',
        topicRef: 'CED 9.5 Global Climate Change',
        question: 'Explain why the melting of Arctic sea ice does NOT raise global sea levels, whereas the melting of the Greenland ice sheet causes catastrophic sea level rise.',
        solutionSteps: [
          'Step 1: Evaluate Arctic sea ice: Sea ice is already floating on the ocean water.',
          'Step 2: Apply Archimedes’ Principle: A floating body displaces a volume of water equal to its own weight. When floating sea ice melts, the resulting liquid water occupies the exact same volume that the submerged ice previously displaced $\\implies$ Zero net change in sea level.',
          'Step 3: Evaluate Greenland ice sheet: Greenland ice consists of terrestrial continental glaciers sitting on top of land bedrock.',
          'Step 4: Analyze runoff: When land-based ice melts, it runs off the continent into the ocean, adding entirely NEW volume to the ocean basin.',
          'Step 5: Conclude: Melting land ice increases ocean volume, directly driving sea level rise.'
        ],
        finalAnswer: 'Arctic sea ice is already floating and displacing water (no sea level change); Greenland ice is on land and adds new water volume to the ocean when it melts.',
        apScoringTip: 'Always distinguish between floating sea ice (no sea level rise) and land-based glaciers/ice sheets (causes sea level rise).'
      }
    ],
    diagrams: [
      {
        id: 'apes_greenhouse_effect',
        title: 'The Atmospheric Greenhouse Effect Cycle',
        subtitle: 'Incoming Shortwave UV/Visible vs. Trapped Outgoing Longwave Infrared',
        type: 'greenhouse_effect_diagram',
        description: 'Solar rays entering atmosphere, surface absorbing energy and emitting longwave infrared heat, with greenhouse gas molecules absorbing infrared and re-radiating heat back down.',
        takeaway: 'Greenhouse gases are transparent to incoming solar shortwave light, but absorb outgoing terrestrial infrared (heat) radiation.'
      }
    ],
    commonTraps: [
      'Confusing the greenhouse effect with stratospheric ozone depletion. This is the single most common mistake on APES! Ozone depletion is caused by CFCs and lets in UV rays; Climate change is caused by $\\text{CO}_2$ and $\\text{CH}_4$ trapping infrared heat.',
      'Claiming melting sea ice raises sea levels. Only melting LAND-BASED ice (glaciers, ice sheets) and thermal water expansion raise sea levels.',
      'Thinking ocean acidification means the ocean has turned into an acid (pH $< 7$). Seawater is normally basic (pH $\\approx 8.2$); acidification has lowered it to $\\approx 8.1$. While still technically basic, a $0.1$ drop represents a $30\\%$ increase in $[\\text{H}^+]$ concentration!'
    ],
    cramSheet: [
      'Greenhouse Effect: Traps outgoing infrared heat radiation ($\\text{CO}_2, \\text{CH}_4, \\text{N}_2\\text{O}, \\text{H}_2\\text{O}$).',
      'Ocean Acidification: $\\text{CO}_2$ dissolves $\\rightarrow$ forms carbonic acid $\\rightarrow$ strips $\\text{CO}_3^{2-}$ needed for coral/shells.',
      'Montreal Protocol (1987): Phased out CFCs to heal stratospheric ozone layer.',
      'Kyoto Protocol & Paris Agreement: International accords aiming to reduce greenhouse gas emissions.'
    ]
  }
];
