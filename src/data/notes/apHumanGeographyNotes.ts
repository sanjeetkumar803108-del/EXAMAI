import { APUnitNote } from './types';

export const AP_HUMAN_GEOGRAPHY_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: THINKING GEOGRAPHICALLY (CED 8%–10% of Exam)
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Thinking Geographically',
    examWeight: '8%–10% of AP Exam',
    bigIdea: 'Geographers use maps, spatial concepts, and geospatial technologies to understand relationships between people, places, and spatial patterns across local, regional, and global scales.',
    keyTheorems: [
      {
        name: 'The 3 Types of Formal/Functional/Vernacular Regions',
        conditions: 'Categorizing geographic space into coherent spatial units.',
        conclusion: '(1) Formal (Uniform): Defined by measurable shared cultural or physical characteristics (e.g. French-speaking Canada, Corn Belt); (2) Functional (Nodal): Organized around a focal node with distance decay (e.g. newspaper circulation, subway network, radio broadcast); (3) Vernacular (Perceptual): Defined by informal cultural identity and subjective feelings (e.g. "The American South", "The Middle East").',
        apTip: 'Distinguish between functional and perceptual regions on the exam. Functional regions ALWAYS have a central node or focal point with transportation or economic links that weaken with distance.'
      },
      {
        name: 'Tobler’s First Law of Geography & Distance Decay',
        conditions: 'Spatial interaction between two geographic locations.',
        conclusion: 'Everything is related to everything else, but near things are more related than distant things. Interaction diminishes as physical distance increases (Distance Decay / Friction of Distance).',
        apTip: 'Space-time compression (via modern internet, aviation, and telecommunications) reduces the friction of distance, allowing rapid global interaction despite physical separation.'
      }
    ],
    formulas: [
      {
        name: 'Map Scale Fraction',
        latex: '\\text{Representative Fraction (RF)} = \\frac{\\text{Map Distance}}{\\text{Ground Distance}}',
        explanation: 'Large-scale maps (e.g. 1:10,000) show small areas in high detail; Small-scale maps (e.g. 1:100,000,000) show large global areas in low detail.'
      }
    ],
    sections: [
      {
        heading: '1. Map Projections & Distortions Reference',
        content: `Every 2D flat map projection inherently distorts at least one of four properties: Shape, Area, Distance, or Direction (S.A.D.D.):

| Map Projection | What is Preserved | What is Distorted | Primary Use & Key AP Takeaway |
| :--- | :--- | :--- | :--- |
| **Mercator** | **Shape & True Direction** ($90^\\circ$ grid) | **Area severely distorted at poles** | Navigation. Landmasses near poles (Greenland, Antarctica) appear enormously exaggerated relative to Africa. |
| **Peters (Gall-Peters)** | **True Area (Equal-Area)** | **Shape distorted** (stretched vertically) | Social justice focus. Accurately portrays true relative land sizes of Africa and South America. |
| **Robinson** | Compromise projection (visually balanced) | Slight distortion across all 4 properties | Classroom and thematic reference maps. |
| **Polar (Azimuthal)** | True direction from central pole | Area and shape distorted away from center | Airline flight routes and polar geopolitics. |`
      }
    ,
      {
        heading: '2. Geospatial Technologies, GIS & Spatial Data Analysis (CED 1.2-1.4)',
        content: `Spatial data acquisition technologies and analytical methodologies:

* **Geospatial Hardware & Software Systems**:
  * **Remote Sensing**: Satellite and aircraft sensors capturing electromagnetic radiation reflected from Earth's surface (monitors deforestation, glacier melt, agricultural crop health, urban sprawl).
  * **Geographic Information Systems (GIS)**: Sophisticated computer hardware/software that captures, stores, analyzes, and overlays **layered thematic spatial datasets** (e.g. combining flood zones, census demographics, and parcel boundaries for emergency planning).
  * **Global Positioning System (GPS)**: Network of satellites transmitting radio signals to receivers on Earth to calculate precise mathematical **absolute location** (latitude/longitude coordinates).
* **Quantitative vs. Qualitative Spatial Data**:
  * **Quantitative Data**: Numerical, statistically measurable data (decennial census counts, infant mortality rates, demographic surveys).
  * **Qualitative Data**: Descriptive, subjective data describing human experiences and cultural landscapes (field interviews, photographic records, oral histories, travel narratives).`
      }
    ],
    workedExamples: [
      {
        title: 'Scale of Analysis vs. Scale of Inquiry',
        topicRef: 'CED 1.6 Scales of Analysis',
        question: 'Explain how analyzing GDP per capita at the national scale can obscure significant geographic disparities at the subnational local scale, citing a specific example.',
        solutionSteps: [
          'Step 1: Define scale of analysis: The spatial level at which data is aggregated and displayed (global, national, regional, local).',
          'Step 2: Explain national scale aggregation: A national average calculates aggregate wealth divided by total population, treating the entire country as a uniform plane.',
          'Step 3: Identify subnational disparities: Urban core regions often have very high wealth while rural peripheral zones experience severe poverty.',
          'Step 4: Cite specific example: In China, national GDP per capita appears moderate, but coastal megacities (Shanghai, Shenzhen) have wealth comparable to Western Europe, while rural western provinces (Tibet, Gansu) remain predominantly agrarian and impoverished.',
          'Step 5: Conclude: Changing the scale of analysis reveals localized spatial inequality obscured by national averages.'
        ],
        finalAnswer: 'Aggregating data at the national scale produces a single average that conceals stark internal regional divides between wealthy urban coastal clusters and poor rural interiors.',
        apScoringTip: 'Remember: A "large-scale" map shows a small geographic area (like a city block) with large detail. A "small-scale" map shows a large area (like the world) with small detail.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_regions_diagram',
        title: 'Formal, Functional, and Vernacular Regions',
        subtitle: 'Uniform Homogeneity vs. Nodal Links vs. Cultural Perception',
        type: 'regions_diagram',
        description: 'Diagram contrasting formal region with crisp uniform boundary, functional region with central node and radial flows decaying outward, and vernacular region with hazy fuzzy borders.',
        takeaway: 'Functional regions feature a central node (hub) and diminish with distance decay; vernacular regions have no formal boundaries and exist in mental perception.'
      }
    ],
    commonTraps: [
      'Confusing "large-scale" and "small-scale" maps. Large-scale = small area, zoomed in ($1:5,000$). Small-scale = large world area, zoomed out ($1:50,000,000$).',
      'Confusing environmental determinism with possibilism. Environmental determinism claims climate strictly dictates human success; possibilism recognizes that humans use technology to adapt to and modify environments.',
      'Misidentifying map projections. Remember: Mercator keeps directions straight for sailing, but makes Greenland look as large as Africa (Africa is actually $14\\times$ larger!).'
    ],
    cramSheet: [
      'GIS (Geographic Information Systems) stacks thematic spatial data layers for analysis.',
      'GPS uses satellite trilateration to pinpoint absolute mathematical coordinates.',
      'Remote sensing captures data via satellites or aircraft without physical contact.',
      'Possibilism: The environment sets limits, but human culture and technology overcome physical barriers.'
    ]
  },

  // ==========================================
  // UNIT 2: POPULATION & MIGRATION PATTERNS (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Population and Migration Patterns',
    examWeight: '12%–17% of AP Exam',
    bigIdea: 'Population distribution, growth rates, and migration streams reflect economic development, medical advancements, public policies, and cultural shifts.',
    keyTheorems: [
      {
        name: 'The Demographic Transition Model (DTM Stages 1–5)',
        conditions: 'Societal transition from agrarian high-vitality rates to industrial urban low rates.',
        conclusion: 'Stage 1: High CBR, High CDR (Low growth); Stage 2: High CBR, Plunging CDR (Explosive NIR, wide pyramid base); Stage 3: Plunging CBR, Low CDR (Moderate growth); Stage 4: Low CBR, Low CDR (ZPG / stable); Stage 5: Very Low CBR below CDR (Negative NIR / aging decline).',
        apTip: 'CDR drops FIRST in Stage 2 due to the Industrial / Medical Revolution; CBR drops LATER in Stage 3 due to female education, urbanization, and family planning.'
      },
      {
        name: 'Ravenstein’s Laws of Migration',
        conditions: 'Patterns observed in voluntary human migration flows.',
        conclusion: '(1) Most migrants travel short distances; (2) Long-distance migrants head for major economic urban centers; (3) Migration occurs in steps (step migration); (4) Every migration flow creates a counter-migration stream; (5) Most international migrants are young adult individuals rather than families.',
        apTip: 'Push factors drive people away from home (war, famine, lack of jobs); Pull factors attract people to a new destination (peace, high wages, political freedom).'
      }
    ],
    formulas: [
      {
        name: 'Rate of Natural Increase (NIR)',
        latex: '\\text{NIR (\\%)} = \\frac{\\text{CBR} - \\text{CDR}}{10}',
        explanation: 'Crude Birth Rate minus Crude Death Rate per 1,000, divided by 10 to give annual percentage.'
      },
      {
        name: 'Doubling Time (Rule of 70)',
        latex: '\\text{Doubling Time} = \\frac{70}{\\text{NIR (\\%)}}',
        explanation: 'Years required for population to double at constant annual NIR percentage.'
      },
      {
        name: 'Population Density Formulas',
        latex: '\\text{Arithmetic} = \\frac{\\text{Total Pop}}{\\text{Total Land}}, \\quad \\text{Physiological} = \\frac{\\text{Total Pop}}{\\text{Arable Land}}, \\quad \\text{Agricultural} = \\frac{\\text{Farmers}}{\\text{Arable Land}}',
        explanation: 'High physiological density with low agricultural density indicates intensive, mechanized modern agriculture (e.g. Japan).'
      }
    ],
    sections: [
      {
        heading: '1. Population Pyramids & Age-Sex Structure Interpretation',
        content: `How population pyramid shapes map to DTM stages and economic development:

| Pyramid Shape | Base & Sides | DTM Stage | Typical Growth Trend | Real World Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Expansive (Triangle)** | Broad base, rapidly tapering sides | **Stage 2** | Rapid explosive population growth | Niger, Uganda, Afghanistan |
| **Moderately Expansive** | Moderately wide base | **Stage 3** | Slowing, moderate growth | India, Mexico, Brazil |
| **Stationary (Box / Column)** | Vertical rectangular sides | **Stage 4** | Zero population growth (ZPG) | USA, France, UK |
| **Constrictive (Inverted)** | Narrow base, bulging top | **Stage 5** | Aging population, negative growth | Japan, Germany, Italy |`
      }
    ,
      {
        heading: '2. Malthusian Population Theory & Global Migration Typologies (CED 2.6-2.11)',
        content: `Demographic growth limits, state policies, and migration mechanics:

* **Thomas Malthus Population Hypothesis**:
  * Premise: Population grows exponentially ($1, 2, 4, 8, 16$), while food production grows arithmetically ($1, 2, 3, 4, 5$).
  * Predicted inevitable catastrophic 'Malthusian checks' (famine, plague, war).
  * **Neo-Malthusians**: Warn that modern population growth exhausts not just food, but clean fresh water, arable land, and energy reserves.
  * **Ester Boserup Counter-Thesis**: 'Necessity is the mother of invention'; population pressure stimulates agricultural technological innovation and intensification.
* **National Population Policies**:
  * **Pro-Natalist Policies**: Government programs encouraging childbirth in aging Stage 4/5 nations (subsidized childcare, generous parental leave in France and Japan).
  * **Anti-Natalist Policies**: Programs restricting family size (China's historic One-Child Policy, female education and contraception access).
* **Forced vs. Voluntary Migration**:
  * **Refugee**: A person forced to cross an international border due to well-founded fear of persecution, conflict, or violence.
  * **Internally Displaced Person (IDP)**: Forced to flee their home for similar reasons but remains within their home country's sovereign borders.`
      }
    ],
    workedExamples: [
      {
        title: 'Malthusian Theory vs. Modern Agricultural Reality',
        topicRef: 'CED 2.8 Malthusian Theory',
        question: 'Explain Thomas Malthus’s 1798 population hypothesis and state TWO reasons why his catastrophic predictions failed to occur on a global scale.',
        solutionSteps: [
          'Step 1: State Malthusian core thesis: Population grows exponentially (geometrically: $1, 2, 4, 8, 16...$), while food production grows only arithmetically ($1, 2, 3, 4, 5...$). Malthus predicted unavoidable famine, war, and disease ("positive checks").',
          'Step 2: First reason for failure - Agricultural revolutions: The Green Revolution introduced high-yield genetically hybridized crops, synthetic nitrogen fertilizers, mechanization, and advanced irrigation that increased food production exponentially.',
          'Step 3: Second reason for failure - Demographic decline: Malthus failed to foresee female education, urbanization, and modern contraception, which caused birth rates (CBR) to plummet globally in DTM Stages 3 and 4.',
          'Step 4: Third reason (transportation): Global trade networks allow rapid shipping of food surpluses across oceans to deficit areas.'
        ],
        finalAnswer: 'Malthus predicted population would outstrip food supply; he failed to anticipate exponential agricultural technology (Green Revolution) and the dramatic drop in birth rates due to female education and urbanization.',
        apScoringTip: 'When discussing Malthus on the AP exam, use the exact phrases "exponential population growth" and "arithmetic food production." Mentioning the Green Revolution or DTM Stage 3 fertility decline earns top marks.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_dtm_stages',
        title: 'The Demographic Transition Model (DTM Stages 1–5)',
        subtitle: 'Crude Birth Rate, Crude Death Rate, and Natural Increase Gap',
        type: 'dtm_graph',
        description: 'Multi-stage graph tracking birth rate (red) and death rate (blue). Stage 2 shows death rate plunging while birth rate stays high, creating a wide shaded gap representing explosive population growth.',
        takeaway: 'Death rates drop first in Stage 2 due to sanitation and medicine; birth rates fall later in Stage 3 as women enter the workforce and urbanize.'
      }
    ],
    commonTraps: [
      'Assuming that a country in DTM Stage 5 has high death rates. Stage 5 death rates rise slightly ONLY because the elderly cohort constitutes a huge fraction of the population, not because of disease or poverty!',
      'Confusing refugees with internally displaced persons (IDPs). Refugees cross an international border due to fear of persecution; IDPs flee within their own country.',
      'Equating arithmetic density with physiological density. Egypt has a modest arithmetic density, but its physiological density is astronomical because $99\\%$ of its population is crammed along the narrow fertile Nile riverbank.'
    ],
    cramSheet: [
      'DTM Stage 2: Rapid growth (death rate plunges). Stage 4: Stable ZPG. Stage 5: Negative growth (aging).',
      'Replacement level fertility: TFR $= 2.1$ (births per woman needed to maintain zero population growth).',
      'Rule of 70: $\\text{Doubling Time} = 70 / \\text{NIR}$.',
      'Dependency ratio: $\\frac{\\text{Pop } < 15 + \\text{Pop } > 65}{\\text{Working-age Pop (15–64)}} \\times 100$. High dependency ratio strains healthcare and pensions.'
    ]
  },

  // ==========================================
  // UNIT 3: CULTURAL PATTERNS & PROCESSES (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Cultural Patterns and Processes',
    examWeight: '12%–17% of AP Exam',
    bigIdea: 'Culture is expressed through language, religion, architecture, and cultural landscapes. Cultural diffusion occurs through expansion and relocation mechanisms.',
    keyTheorems: [
      {
        name: 'Mechanisms of Cultural Diffusion',
        conditions: 'Spread of cultural traits, ideas, or innovations from a cultural hearth.',
        conclusion: '(1) Relocation: Spread via physical migration of individuals; (2) Expansion Diffusion: (a) Contagious (rapid, person-to-person wave), (b) Hierarchical (top-down from power nodes, celebrities, or major urban centers), (c) Stimulus (underlying concept adopted but modified to fit local culture).',
        apTip: 'McDonald’s serving vegetable burgers in India is the quintessential example of STIMULUS diffusion: The core fast-food concept is adopted, but the specific beef trait is modified due to Hindu dietary taboos.'
      },
      {
        name: 'Universalizing vs. Ethnic Religions',
        conditions: 'Global religious classification based on origin and geographic appeal.',
        conclusion: 'Universalizing religions (Christianity, Islam, Buddhism, Sikhism) actively seek converts, have broad global appeal, and trace to specific historical founders. Ethnic religions (Hinduism, Judaism) appeal primarily to one group living in one place and do not actively proselytize.',
        apTip: 'Universalizing religions have widespread dispersed distributions due to expansion and relocation diffusion; ethnic religions remain clustered near their cultural hearths.'
      }
    ],
    formulas: [
      {
        name: 'Linguistic Hierarchy Ordering',
        latex: '\\text{Language Family} \\rightarrow \\text{Language Branch} \\rightarrow \\text{Language Group} \\rightarrow \\text{Language} \\rightarrow \\text{Dialect}',
        explanation: 'Indo-European is the largest family; Germanic is the branch; English is the language.'
      }
    ],
    sections: [
      {
        heading: '1. Universalizing vs. Ethnic Religions Comparison',
        content: `Major global religions categorized by spatial diffusion:

| Religion | Classification | Hearth Origin | Holy Places & Diffusion Method | Key Cultural Landscape Features |
| :--- | :--- | :--- | :--- | :--- |
| **Christianity** | **Universalizing** | Eastern Mediterranean / SW Asia | Jerusalem; Relocation (missionaries) & Hierarchical (Roman Empire) | Churches, cathedrals with steeples, cruciform architecture, cemeteries |
| **Islam** | **Universalizing** | Arabian Peninsula (Mecca / Medina) | Mecca (Kaaba); Contagious conquest & trade networks | Mosques with minarets, geometric arabesques (no human depictions) |
| **Buddhism** | **Universalizing** | Northern India / Nepal | Bodh Gaya; Hierarchical (Emperor Ashoka) along trade routes | Pagodas, stupas containing relics, statues of Buddha |
| **Hinduism** | **Ethnic** (Largest) | Indus River Valley / India | Ganges River (Varanasi); Clustered in India and Nepal | Temples near water, shrines, cremation sites |
| **Judaism** | **Ethnic** | SW Asia / Levant | Jerusalem (Western Wall); Diaspora relocated Jewish communities | Synagogues, Star of David, distinct diaspora quarters |`
      }
    ,
      {
        heading: '2. Language Families, Lingua Franca & Cultural Integration (CED 3.3-3.6)',
        content: `Linguistic spatial trees, global communication, and cultural fusion:

* **Linguistic Taxonomy**:
  * **Language Family**: Oldest ancestral grouping with a prehistoric common origin (e.g. **Indo-European** is the largest, spoken by nearly half the world; Sino-Tibetan is second largest).
  * **Language Branch**: Collection of related languages sharing common historical ancestry within a family (e.g. Germanic, Romance, Slavic).
  * **Lingua Franca**: A mutually understood bridge language adopted for international commerce, diplomacy, and aviation (e.g. English globally, Swahili in East Africa, Arabic in North Africa/Middle East).
* **Mechanisms of Cultural Transformation**:
  * **Acculturation**: An immigrant group adopts certain cultural traits of the dominant host society while still retaining significant distinct elements of their original culture.
  * **Assimilation**: A minority group loses its distinguishing cultural traits completely, blending indistinguishably into the dominant culture.
  * **Syncretism**: The creative fusion of two or more distinct cultural traditions into an entirely new hybrid cultural phenomenon (e.g. Sikhism blending Hinduism and Islam; Haitian Vodou blending West African animism and Catholicism).`
      }
    ],
    workedExamples: [
      {
        title: 'Identifying Diffusion Types from Contemporary Scenarios',
        topicRef: 'CED 3.4 Types of Diffusion',
        question: 'Identify the specific type of diffusion operating in each case: (a) Hip-hop music originating in NYC inner cities and spreading to major global hubs (London, Tokyo) before reaching rural towns, (b) A viral internet dance meme sweeping across schools, and (c) The spread of surfing from ancient Polynesia to coastal California via migrating surfers.',
        solutionSteps: [
          'Step 1: Case (a) involves ideas jumping from high-order urban nodes to secondary cities before trickling down to rural areas $\\implies$ **Hierarchical Diffusion**.',
          'Step 2: Case (b) spreads rapidly like a wave through person-to-person contact without regard to hierarchy $\\implies$ **Contagious Diffusion**.',
          'Step 3: Case (c) involves people physically packing their culture and moving to a new geographic location $\\implies$ **Relocation Diffusion**.'
        ],
        finalAnswer: '(a) Hierarchical Diffusion, (b) Contagious Diffusion, (c) Relocation Diffusion.',
        apScoringTip: 'Be very precise: Do not just write "expansion diffusion." You must specify whether it is contagious, hierarchical, or stimulus expansion diffusion.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_diffusion_types',
        title: 'Expansion vs. Relocation Diffusion Patterns',
        subtitle: 'Contagious Wave, Hierarchical Step-Down, and Relocation Leap',
        type: 'diffusion_map',
        description: 'Diagram comparing contagious outward wave, hierarchical leap from large node to secondary node, and relocation migration moving people from one hearth to a distant target.',
        takeaway: 'In expansion diffusion, the trait remains strong in the hearth while spreading; in relocation diffusion, the trait spreads exclusively because people physically migrate.'
      }
    ],
    commonTraps: [
      'Assuming all religions seek converts. Ethnic religions (Hinduism, Judaism) do NOT actively seek converts; membership is primarily through birth.',
      'Confusing assimilation with acculturation. Acculturation is adopting some traits of a dominant culture while retaining original heritage; Assimilation is complete loss of original culture to blend entirely into the host society.',
      'Thinking a lingua franca is a single native language. A lingua franca is a mutually understood language used for international trade between groups whose native tongues differ (e.g. English, Swahili).'
    ],
    cramSheet: [
      'Indo-European is the largest language family (includes Germanic, Romance, Slavic, Indo-Iranian).',
      'Sino-Tibetan is the second largest language family (Mandarin Chinese).',
      'Centripetal forces unite a country (national pride, shared language); Centrifugal forces tear it apart (ethnic conflict, regionalism).',
      'Cultural landscape: The visible imprint of human activity on the physical environment (Carl Sauer).'
    ]
  },

  // ==========================================
  // UNIT 4: POLITICAL PATTERNS & PROCESSES (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Political Patterns and Processes',
    examWeight: '12%–17% of AP Exam',
    bigIdea: 'Political organization of space is structured by territorial sovereignty, boundary delimitations, devolutionary pressures, and supranational alliances.',
    keyTheorems: [
      {
        name: 'The 4 Political Geography Entity Definitions',
        conditions: 'Classifying sovereign states, ethnic nations, and political borders.',
        conclusion: '(1) State: Politically organized territory with sovereign government and international recognition; (2) Nation: Group of people sharing common culture and history (e.g. Kurds, Cherokee); (3) Nation-State: State whose territory corresponds to a single dominant ethnicity (e.g. Japan, Iceland); (4) Stateless Nation: Ethnic nation lacking its own sovereign state (e.g. Kurds, Palestinians, Basques).',
        apTip: 'The Kurds are the classic AP exam example of a Stateless Nation: A distinct cultural nation of 30+ million people divided across Turkey, Iraq, Iran, and Syria without their own independent state.'
      },
      {
        name: 'UNCLOS Maritime Law & Exclusive Economic Zones (EEZ)',
        conditions: 'United Nations Convention on the Law of the Sea coastal jurisdiction.',
        conclusion: '(1) Territorial Sea: 0–12 nautical miles from baseline (full sovereign coastal state law); (2) Contiguous Zone: 12–24 nautical miles (enforce customs, immigration, sanitation); (3) Exclusive Economic Zone (EEZ): 0–200 nautical miles (exclusive rights to natural resources, fishing, and seabed minerals).',
        apTip: 'If two states’ EEZs overlap (less than 400 nm apart), the median-line principle divides the boundary equidistant between the two coastlines (e.g. South China Sea disputes).'
      }
    ],
    formulas: [
      {
        name: 'UNCLOS Boundary Distances',
        latex: '\\text{Territorial Waters} = 12\\text{ nm}, \\quad \\text{Contiguous Zone} = 24\\text{ nm}, \\quad \\text{EEZ} = 200\\text{ nm}',
        explanation: '1 nautical mile (nm) $\\approx 1.15$ statute miles.'
      }
    ],
    sections: [
      {
        heading: '1. Gerrymandering: Cracking vs. Packing',
        content: `Redistricting strategies used to manipulate legislative voting boundaries:

- **Packing**: Cramming as many opposing party voters as possible into a single district. This concedes one seat to the opposition but dilutes their voting power across all surrounding districts.
- **Cracking**: Splitting opposing party voters across multiple districts so they remain a permanent minority in every district, denying them any representation.
- **Consequences**: Uncompetitive safe districts, hyper-partisanship, and disconnected non-compact district shapes.`
      },
      {
        heading: '2. Boundary Typologies & State Morphology Matrix',
        content: `College Board classifications of political boundaries and territorial state shapes:

| Boundary / Shape Type | Defining Geographic Feature | Strategic Advantage or Devolutionary Risk | Benchmark AP Exam Exemplar |
| :--- | :--- | :--- | :--- |
| **Antecedent Boundary** | Drawn **before** significant human settlement or cultural landscape developed | Natural demarcation; low initial cultural dispute | 49th Parallel US-Canada border (established in 1846) |
| **Subsequent Boundary** | Drawn **after** cultural landscape evolved; accommodates cultural/ethnic lines | Reflects linguistic, religious, or ethnic divisions | Border between Northern Ireland (Protestant/UK) and Republic of Ireland (Catholic) |
| **Superimposed Boundary** | Forcibly imposed by outside colonial or imperial powers ignoring local ethnicities | High centrifugal conflict, civil wars, and ethnic strife | **1884 Berlin Conference** dividing Africa into arbitrary colonies |
| **Relic Boundary** | No longer functions as a formal border, but leaves visible imprint on cultural landscape | Historical tourism, economic development disparities | **The Berlin Wall** dividing East and West Germany; Great Wall of China |
| **Compact State** | Round/geometric; distance from center to border is roughly equal | Efficient governance, rapid communication, easy defense | **Poland**, Kenya, Uruguay |
| **Elongated State** | Long, narrow ribbon shape ($> 6\\times$ longer than wide) | Extreme isolation of peripheral regions; poor transportation | **Chile**, Vietnam, Norway |
| **Prorupted State** | Compact state with protruding territorial extension or corridor | Access to strategic raw materials/water, but corridor easily severed | **Namibia** (Caprivi Strip), Thailand |
| **Fragmented State** | Composed of discontinuous territorial pieces (islands or enclaves) | Enormous communication and national cohesion hurdles | **Indonesia** (17,000+ islands), Philippines, USA (Alaska/Hawaii) |
| **Perforated State** | Completely surrounds and encloses another independent state | Enclosed enclave state is 100% dependent on surrounding host | **South Africa** (surrounds Lesotho), Italy (surrounds Vatican City & San Marino) |`
      }
    ],
    workedExamples: [
      {
        title: 'Devolutionary Pressures Leading to Balkanization',
        topicRef: 'CED 4.8 Devolution & Centrifugal Forces',
        question: 'Define devolution and identify THREE distinct centrifugal forces that can cause a sovereign state to fragment.',
        solutionSteps: [
          'Step 1: Define devolution: The statutory transfer of power from a central federal government to subnational regional authorities (e.g. Scottish Parliament in the UK) or the complete breakup of a state.',
          'Step 2: Force 1 - Ethnic/Cultural diversity: Disparate linguistic, religious, or ethnic groups demanding self-determination (e.g. former Yugoslavia, Kurds in the Middle East).',
          'Step 3: Force 2 - Geographic isolation / Periphery location: Physical barriers (mountains, islands) separating regions from the capital (e.g. Basque Country in Pyrenees, Hawaii).',
          'Step 4: Force 3 - Economic inequality: Resource-rich regions resenting central government subsidizing poorer provinces (e.g. Catalonia in Spain, Northern League in Italy).'
        ],
        finalAnswer: 'Devolution is the decentralization of power from central to regional governments. Three centrifugal drivers are: (1) Ethnic nationalism, (2) Physical geographic barriers, and (3) Regional economic disparity.',
        apScoringTip: 'Always cite real-world examples when discussing devolution: Catalonia, Scotland, Basque Country, or former Yugoslavia earn immediate credit.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_unclos_zones',
        title: 'UNCLOS Maritime Zones and Baselines',
        subtitle: 'Territorial Waters (12 nm) to Exclusive Economic Zone (200 nm)',
        type: 'unclos_diagram',
        description: 'Cross-section of coastline showing baseline, 12 nm Territorial Sea, 24 nm Contiguous Zone, and 200 nm Exclusive Economic Zone extending to international high seas.',
        takeaway: 'Coastal nations have exclusive economic rights to marine resources (fishing, oil, minerals) out to 200 nautical miles.'
      }
    ],
    commonTraps: [
      'Confusing a nation with a state. A state is a legal country with borders and sovereignty; a nation is a group of people with a shared cultural heritage.',
      'Assuming supranational organizations eliminate state sovereignty. Members of the UN, EU, or NATO willingly surrender SOME sovereignty in exchange for collective economic or military security.',
      'Thinking geometric boundaries follow physical features. Geometric boundaries are straight lines drawn along latitude/longitude lines (e.g. 49th parallel US-Canada border).'
    ],
    cramSheet: [
      'Nation-State: Culturally homogeneous state (Japan, Iceland).',
      'Stateless Nation: Ethnic nation without its own independent country (Kurds, Basques, Palestinians).',
      'Supranationalism: Three or more states uniting for mutual benefit (UN, EU, NATO, ASEAN, USMCA).',
      'Devolution: Transfer of power from central government to regional units (Catalonia, Scotland).'
    ]
  },

  // ==========================================
  // UNIT 5: AGRICULTURE & RURAL LAND-USE (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Agriculture and Rural Land-Use',
    examWeight: '12%–17% of Exam',
    bigIdea: 'Agricultural practices are shaped by environmental factors and market proximity. The Three Agricultural Revolutions transformed global food systems.',
    keyTheorems: [
      {
        name: 'Von Thünen’s Agricultural Land-Use Model',
        conditions: 'Isolated state with central market surrounded by uniform flat land with identical soil and climate.',
        conclusion: 'Concentric rings emerge based on land rent (bid-rent theory) and transportation costs: Ring 1: Market Gardening & Dairying (perishable, high transport cost); Ring 2: Forest / Timber (heavy, high transport cost); Ring 3: Extensive Grains / Field Crops; Ring 4: Livestock Ranching (animals walk themselves to market).',
        apTip: 'Von Thünen’s key insight: Land closest to the market is the most expensive per acre; farmers must produce high-value, highly perishable products (dairying, horticulture) to pay the high rent!'
      },
      {
        name: 'The Green Revolution (Third Agricultural Revolution)',
        conditions: 'Mid-20th century international transfer of high-yield farming technology to developing nations (Mexico, India).',
        conclusion: 'Yields increased dramatically via: (1) High-yielding dwarf wheat and rice cultivars, (2) Synthetic chemical fertilizers and pesticides, (3) Mechanized machinery, (4) Advanced irrigation systems.',
        apTip: 'Know the criticisms: Green Revolution created groundwater depletion, pesticide pollution, soil salinization, and debt among small farmers who could not afford expensive seeds and machinery.'
      }
    ],
    formulas: [
      {
        name: 'Bid-Rent Curve Equation',
        latex: '\\text{Land Rent} = \\text{Yield} \\times (\\text{Market Price} - \\text{Production Cost}) - (\\text{Yield} \\times \\text{Freight Rate} \\times \\text{Distance})',
        explanation: 'Explains why land rent drops steeply with increasing distance from market center.'
      }
    ],
    sections: [
      {
        heading: '1. Intensive vs. Extensive Agriculture Matrix',
        content: `Comparing agricultural systems by capital, labor, and land use:

| Agriculture Type | Labor / Capital Input | Land Area Required | Yield per Acre | Real-World Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Intensive Agriculture** | **HIGH** labor or capital | Small parcels of land | **HIGH** | Market gardening, intensive wet-rice subsistence (East/South Asia), mixed crop and livestock, plantation farming |
| **Extensive Agriculture** | **LOW** labor and capital | Large expansive tracts | **LOW** | Nomadic pastoral herding (Sahel, Central Asia), shifting cultivation (slash-and-burn in rainforests), livestock ranching (US West, Pampas) |`
      }
    ,
      {
        heading: '2. Agricultural Revolutions & Global Commodity Chains (CED 5.3-5.5)',
        content: `Evolution of farming practices from domestication to modern agribusiness:

* **The Three Agricultural Revolutions**:
  * **First (Neolithic) Agricultural Revolution**: Transition from nomadic hunting/gathering to sedentary farming via initial plant and animal domestication (~10,000 BCE in Fertile Crescent, Indus Valley, Mesoamerica).
  * **Second Agricultural Revolution**: Accompanied the Industrial Revolution in 18th-century Western Europe; enclosure acts, selective breeding, mechanical seed drills, and four-field crop rotation generated urban labor surpluses.
  * **Third (Green) Agricultural Revolution**: Mid-20th century science-driven boom (Dr. Norman Borlaug); high-yielding hybrid semi-dwarf wheat and miracle rice varieties, synthetic chemical fertilizers, pesticides, and motorized deep-well irrigation.
* **Modern Agribusiness & Global Commodity Chains**:
  * Transition from family subsistence farming to corporate-controlled vertical integration (seed patents, feedlots, processing plants, global refrigerated container shipping).
  * **Environmental Consequences**: Aquifer depletion, soil salinization from excessive irrigation, nitrogen runoff dead zones, loss of biodiversity from monoculture cropping.`
      }
    ],
    workedExamples: [
      {
        title: 'Von Thünen Concentric Ring Analysis',
        topicRef: 'CED 5.8 Von Thünen Model',
        question: 'Explain why dairy farming is located in Ring 1 closest to the central market in Von Thünen’s model, and explain how modern refrigeration altered this spatial pattern.',
        solutionSteps: [
          'Step 1: Explain Ring 1 proximity: Milk is highly perishable and spoils quickly without rapid transport to market.',
          'Step 2: Explain transport costs: Fluid milk is bulky and heavy to transport relative to value.',
          'Step 3: Connect to bid-rent: Dairy farmers generate high revenue per acre, allowing them to outbid grain farmers for expensive land near the central city.',
          'Step 4: Analyze refrigeration impact: Refrigerated trucks and rapid rail transport allow fluid milk to be shipped hundreds of miles without spoiling.',
          'Step 5: Conclude: The milkshed has expanded drastically outward, shifting modern dairy farms farther from urban centers onto cheaper rural land.'
        ],
        finalAnswer: 'Dairy was in Ring 1 due to high perishability and high transport costs; modern refrigeration and refrigerated trucks expanded the milkshed, allowing dairy farms to operate much farther away.',
        apScoringTip: 'Always mention BOTH perishability AND transportation costs when explaining Von Thünen Ring 1.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_von_thunen',
        title: 'Von Thünen Concentric Agricultural Rings',
        subtitle: 'Market City $\\rightarrow$ Dairying $\\rightarrow$ Timber $\\rightarrow$ Grains $\\rightarrow$ Ranching',
        type: 'von_thunen_rings',
        description: 'Concentric circular rings centered on market city: Ring 1 (Dairy/Vegetables), Ring 2 (Timber), Ring 3 (Field Crops/Grains), Ring 4 (Livestock Ranching).',
        takeaway: 'Intensive, perishable, high-transport-cost agriculture is located closest to the market; extensive, durable farming is located farther out.'
      }
    ],
    commonTraps: [
      'Assuming shifting cultivation (slash-and-burn) is an intensive farming system. Shifting cultivation is EXTENSIVE: It requires vast land areas because plots must be left fallow for decades to regenerate nutrients.',
      'Forgetting that plantations are located in developing nations but owned by transnational corporations in developed nations.',
      'Confusing the 2nd Agricultural Revolution with the Green Revolution. 2nd Ag Rev occurred alongside the Industrial Revolution in Europe (crop rotation, seed drill); Green Revolution occurred in the 1960s with synthetic fertilizers and GMO dwarf seeds.'
    ],
    cramSheet: [
      '1st Ag Rev: Neolithic domestication of plants and animals.',
      '2nd Ag Rev: Mechanization, crop rotation, enclosure movement (accompanied Industrial Rev).',
      '3rd Ag Rev (Green Rev): High-yield dwarf seeds, synthetic fertilizers, pesticides, irrigation.',
      'Bid-Rent: Land closest to the city has the highest price per acre.',
      'Rural survey systems: Metes and bounds (natural landmarks), Township and range (grid squares), Long-lot (French narrow riverfront access).'
    ]
  },

  // ==========================================
  // UNIT 6: CITIES & URBAN LAND-USE (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Cities and Urban Land-Use',
    examWeight: '12%–17% of Exam',
    bigIdea: 'Cities function as centers of economic, political, and cultural life. Urban spatial models and sustainability initiatives reflect evolving transportation and demographic patterns.',
    keyTheorems: [
      {
        name: 'Classical North American Urban Land-Use Models',
        conditions: 'Spatial layout of commercial and residential zones within 20th-century cities.',
        conclusion: '(1) Burgess Concentric Zone (1925): Concentric rings expanding outward from central CBD (CBD $\\rightarrow$ Zone of Transition $\\rightarrow$ Working-class homes $\\rightarrow$ Better homes $\\rightarrow$ Commuter zone); (2) Hoyt Sector (1939): Wedge-shaped sectors expanding along transportation corridors (rail lines, highways); (3) Harris-Ullman Multiple Nuclei (1945): Multiple decentralized commercial nodes / suburban downtowns (edge cities) driven by automobile proliferation.',
        apTip: 'Burgess reflects walking and horse-car transit; Hoyt reflects streetcars and rail corridors; Harris-Ullman reflects modern car highways and edge cities.'
      },
      {
        name: 'Christaller’s Central Place Theory (CPT)',
        conditions: 'Hexagonal market areas providing goods and services across urban hierarchies.',
        conclusion: '(1) Range: Maximum distance consumers are willing to travel for a good/service; (2) Threshold: Minimum population required to support a business. High-order goods (cancer hospitals, luxury cars) have high thresholds and large ranges; low-order goods (gas stations, convenience stores) have low thresholds and short ranges.',
        apTip: 'Hexagonal hinterlands eliminate overlapping service zones and leave no gaps in consumer market coverage.'
      }
    ],
    formulas: [
      {
        name: 'Rank-Size Rule Formula',
        latex: 'P_n = \\frac{P_1}{n}',
        explanation: 'The $n$-th largest city has $1/n$ the population of the largest city (e.g. 2nd city is $1/2$ size, 3rd is $1/3$). Indicates balanced urban development.'
      },
      {
        name: 'Primate City Law',
        latex: 'P_1 > 2 \\times P_2 \\quad \\text{and dominates national economy/politics}',
        explanation: 'Largest city is more than double the second largest and disproportionately dominant (e.g. Paris, London, Mexico City).'
      }
    ],
    sections: [
      {
        heading: '1. Urban Challenges & Sustainable Initiatives',
        content: `Contemporary urban issues and sustainable development models:

- **Gentrification**: Influx of higher-income residents into historically lower-income inner-city neighborhoods.
  - *Benefits*: Renovated housing stock, increased tax revenues, new retail amenities.
  - *Costs*: Soaring property taxes and rents displacing long-time vulnerable residents.
- **Redlining & Blockbusting**: Historical discriminatory housing practices.
  - *Redlining*: Banks drawing red lines on maps refusing mortgage loans to minority neighborhoods.
  - *Blockbusting*: Real estate agents exploiting racial fears to buy homes cheaply and resell at inflated prices.
- **New Urbanism / Smart Growth**:
  - Walkable mixed-use developments blending commercial retail and residential housing.
  - Accessible public mass transit, greenbelts, and preservation of open green space to curb suburban sprawl.`
      },
      {
        heading: '2. Classic & Developing World Urban Models Comparative Matrix',
        content: `Master reference for the six urban spatial models tested on AP Human Geography:

| Urban Model | Theorist & Year | Spatial Geometric Layout | Primary Transportation Driver | High-Yield AP Diagnostic Feature |
| :--- | :--- | :--- | :--- | :--- |
| **Concentric Zone Model** | Ernest Burgess (1925) | Concentric circular rings expanding from central CBD | Walking and horse-drawn carriages | **Zone of Transition** immediately outside CBD has lowest income & highest density |
| **Sector Model** | Homer Hoyt (1939) | Directional **pie-shaped wedges** radiating outward | Electric streetcars and rail corridors | High-income residential sector expands along fastest transit/environmental corridor |
| **Multiple Nuclei Model** | Harris & Ullman (1945) | Decentralized layout with multiple specialized centers | Automobiles and truck freight | Incompatible land uses (e.g. heavy industry vs. high-class housing) repel each other |
| **Galactic / Peripheral Model** | Chauncy Harris (1960s) | Urban core encircled by beltway highway with edge cities | Interstate highway system | **Edge cities** and office parks located at highway interchanges |
| **Latin American City Model** | Griffin & Ford (1980) | Commercial spine extending from CBD flanked by elite housing | Radial transit corridors | **Disamenity zones** and squatter settlements (*favelas*) on peripheral hillsides |
| **Southeast Asian City Model** | Terry McGee (1967) | No central CBD; revolves around colonial port zone | Maritime ocean shipping | Port zone flanked by Western commercial zone and Alien commercial zone (Chinese) |`
      }
    ],
    workedExamples: [
      {
        title: 'Rank-Size Rule vs. Primate City Comparison',
        topicRef: 'CED 6.4 Central Place Theory & Urban Hierarchy',
        question: 'Country A’s largest city has $8,000,000$ people, its 2nd city has $4,000,000$, and its 3rd city has $2,650,000$. Country B’s largest city has $10,000,000$ people, and its 2nd city has $1,500,000$. Classify the urban systems of Country A and Country B and explain the economic implication of Country B’s structure.',
        solutionSteps: [
          'Step 1: Analyze Country A: $P_2 = 8,000,000 / 2 = 4,000,000$; $P_3 = 8,000,000 / 3 \\approx 2,666,667$. Matches $P_n = P_1 / n \\implies$ Country A follows the **Rank-Size Rule**.',
          'Step 2: Analyze Country B: The largest city ($10\\text{ million}$) is more than six times larger than the 2nd city ($1.5\\text{ million}$) $\\implies$ Country B has a **Primate City**.',
          'Step 3: Economic implications of Country B: Wealth, political power, infrastructure, and top-tier services (universities, specialized medical care) are overwhelmingly concentrated in the primate megacity.',
          'Step 4: Peripheral regions in Country B suffer from unequal access to capital, brain drain to the capital, and inadequate infrastructure investment.'
        ],
        finalAnswer: 'Country A follows the Rank-Size Rule (indicating balanced regional urban development); Country B has a Primate City (leading to unequal geographic distribution of economic wealth and services).',
        apScoringTip: 'Showing the rank-size fractions ($1/2$ and $1/3$) confirms mastery of the mathematical rule on AP exams.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_urban_models',
        title: 'Burgess, Hoyt, and Harris-Ullman Urban Models',
        subtitle: 'Concentric Rings vs. Sector Wedges vs. Multiple Nuclei Nodes',
        type: 'urban_models_diagram',
        description: 'Side-by-side comparison of Burgess concentric rings, Hoyt wedge sectors radiating along rail lines, and Harris-Ullman multiple nuclei showing dispersed suburban edge cities.',
        takeaway: 'Each urban model reflects the dominant transportation mode of its era: Walking $\\rightarrow$ Streetcars/Rail $\\rightarrow$ Automobiles.'
      }
    ],
    commonTraps: [
      'Confusing threshold with range in Central Place Theory. Threshold is minimum CUSTOMERS needed to survive; Range is maximum DISTANCE customers will travel.',
      'Assuming all countries have primate cities. Countries with decentralized power or large geographic size (e.g. USA, Canada, Germany) typically follow the Rank-Size Rule.',
      'Believing gentrification only has negative impacts. AP readers expect students to present BOTH benefits (tax revenue, revitalized infrastructure) AND drawbacks (displacement, loss of cultural character).'
    ],
    cramSheet: [
      'Burgess = Concentric rings; Hoyt = Transportation sectors; Harris-Ullman = Multiple nuclei.',
      'Latin American City Model (Griffin-Ford): Commercial spine extending from CBD flanked by elite housing, surrounded by squatter settlements (favelas).',
      'Rank-Size: $P_n = P_1/n$. Primate City: 1st city is $> 2\\times$ size of 2nd city and dominates.',
      'New Urbanism: Mixed-use zoning, walkability, transit-oriented development, reducing sprawl.'
    ]
  },

  // ==========================================
  // UNIT 7: INDUSTRIAL & ECONOMIC DEVELOPMENT (CED 12%–17% of Exam)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Industrial & Economic Development',
    examWeight: '12%–17% of Exam',
    bigIdea: 'Economic development varies globally, characterized by shifts from primary to tertiary sectors, core-periphery dependencies, and trade agreements.',
    keyTheorems: [
      {
        name: 'Rostow’s 5 Stages of Economic Growth Model',
        conditions: 'Linear modernization model of national economic development.',
        conclusion: 'Stage 1: Traditional Society (subsistence farming); Stage 2: Preconditions for Takeoff (infrastructure, commercialization); Stage 3: Takeoff (rapid industrialization, textile factory boom); Stage 4: Drive to Maturity (diversified technology, consumer goods); Stage 5: Age of High Mass Consumption (tertiary services, mass luxury goods).',
        apTip: 'Criticism: Rostow assumed all countries follow the identical Western European trajectory, ignoring colonial exploitation, international debt, and post-colonial dependencies.'
      },
      {
        name: 'Wallerstein’s World Systems Theory (Core-Periphery)',
        conditions: 'Structuralist model viewing the global economy as a single capitalist world system.',
        conclusion: '(1) Core: High-income, dominant nations possessing high-skill labor, advanced technology, and high consumption (e.g. US, Western Europe, Japan); (2) Periphery: Low-income nations exporting cheap raw materials and agricultural commodities, dependent on core capital (e.g. Sub-Saharan Africa); (3) Semi-Periphery: Industrializing manufacturing nations bridging core and periphery (e.g. China, India, Brazil, Mexico).',
        apTip: 'Wallerstein argues that the wealth of the Core is physically built upon the extraction and exploitation of the Periphery!'
      },
      {
        name: 'Weber’s Least Cost Theory of Industrial Location',
        conditions: 'Determining the optimal factory location to minimize production expenses.',
        conclusion: 'Factory location is dictated by three primary factors: (1) Transportation costs (dominant factor), (2) Labor costs, (3) Agglomeration economies (clustering with related firms).',
        apTip: 'Bulk-reducing industries (e.g. copper smelting, paper mills) locate near RAW MATERIALS because the finished product is lighter and cheaper to transport; Bulk-gaining industries (e.g. soft drink bottling, car assembly) locate near the MARKET!'
      }
    ],
    formulas: [
      {
        name: 'Human Development Index (HDI) Components',
        latex: '\\text{HDI} = \\sqrt[3]{\\text{Health (Life Expectancy)} \\times \\text{Education (Schooling Years)} \\times \\text{Standard of Living (GNI per capita)}}',
        explanation: 'Composite index from 0 to 1.0 evaluating human well-being beyond simple GDP.'
      }
    ],
    sections: [
      {
        heading: '1. Sectors of the Global Economy Summary',
        content: `Classification of economic activities across national development:

| Sector | Nature of Economic Activity | Key Examples | Dominant in DTM Stages |
| :--- | :--- | :--- | :--- |
| **Primary** | Direct extraction of raw natural resources from Earth | Agriculture, mining, forestry, commercial fishing | DTM Stage 2 (LDCs) |
| **Secondary** | Processing, manufacturing, and fabricating raw materials into goods | Automobile assembly, steel mills, textile factories | DTM Stage 3 (NICs) |
| **Tertiary** | Providing services to consumers and businesses | Retail, restaurant service, transportation, banking | DTM Stages 4 & 5 (MDCs) |
| **Quaternary** | Knowledge-based information processing and management | Financial research, software engineering, higher education | DTM Stage 4 & 5 |
| **Quinary** | High-level executive decision-making and scientific leadership | Government heads, Fortune 500 CEOs, top research scientists | DTM Stage 5 |`
      }
    ,
      {
        heading: '2. Deindustrialization, Export Processing Zones & Gender Metrics (CED 7.4-7.7)',
        content: `Post-Fordist spatial reorganization, manufacturing shifts, and gender development:

* **Global Spatial Division of Labor**:
  * Core nations transition to post-industrial tertiary, quaternary, and quinary service/technology economies.
  * Manufacturing shifts to semi-periphery and periphery nations with lower labor costs and laxer environmental regulations.
* **Specialized Economic Enclaves**:
  * **Export Processing Zones (EPZs)**: Designated industrial areas offering foreign corporations duty-free imports of raw materials and tax holidays for exporting manufactured products.
  * **Mexican Maquiladoras**: Manufacturing assembly plants sited along the US-Mexico border capitalizing on NAFTA/USMCA tariff-free trade and lower wage rates.
  * **Special Economic Zones (SEZs)**: Coastal urban districts in China (e.g. Shenzhen) established by Deng Xiaoping to attract multinational foreign direct investment.
* **Gender Inequality Index (GII)**:
  * UN composite index measuring female disparities in three critical dimensions:
    1. **Reproductive Health**: Maternal mortality ratio and adolescent birth rates.
    2. **Empowerment**: Share of parliamentary seats held by women and higher education attainment.
    3. **Labor Market**: Female labor force participation rates compared to men.`
      }
    ],
    workedExamples: [
      {
        title: 'Weber Least Cost Theory: Bulk-Gaining vs. Bulk-Reducing',
        topicRef: 'CED 7.2 Weber’s Least Cost Theory',
        question: 'Identify whether each industry is Bulk-Gaining or Bulk-Reducing and explain where the factory should locate relative to inputs and market: (a) A copper smelting facility that purifies raw ore, and (b) A beer brewing and bottling company.',
        solutionSteps: [
          'Step 1: Analyze copper smelting: Raw copper ore contains $99\\%$ worthless rock. Smelting removes waste rock, producing pure copper that is dramatically lighter and less bulky than the raw ore.',
          'Step 2: Classification (a): Bulk-reducing (weight-losing) industry.',
          'Step 3: Location (a): The factory must locate near the raw material mine site to avoid paying high transport costs on heavy waste rock.',
          'Step 4: Analyze beer brewing: The primary ingredient is heavy water, added locally to dry barley and hops. Canned and bottled beer is significantly heavier, bulkier, and fragile compared to dry ingredients.',
          'Step 5: Classification (b): Bulk-gaining (weight-gaining) industry.',
          'Step 6: Location (b): The brewery must locate near the consumer market to minimize transport costs of finished heavy liquid.'
        ],
        finalAnswer: 'Copper smelting is Bulk-Reducing $\\rightarrow$ locates near raw material mines; Beer brewing is Bulk-Gaining $\\rightarrow$ locates near consumer markets.',
        apScoringTip: 'Remember the core rule: If the finished product is heavier or more fragile than inputs, it is bulk-gaining and locates near the market.'
      }
    ],
    diagrams: [
      {
        id: 'aphg_weber_triangle',
        title: 'Weber’s Location Triangle',
        subtitle: 'Optimal Factory Position Balances Raw Materials and Market',
        type: 'weber_triangle',
        description: 'Triangle with vertices at Raw Material 1, Raw Material 2, and Market, showing the least-cost factory site positioned to minimize total weight-distance transport costs.',
        takeaway: 'Bulk-reducing industries pull the factory toward raw materials; bulk-gaining industries pull the factory toward the market.'
      }
    ],
    commonTraps: [
      'Assuming higher GDP automatically guarantees high gender equality. Some oil-rich states have high GDP per capita but very low Gender Inequality Index (GII) scores due to female disenfranchisement.',
      'Confusing Wallerstein’s Core-Periphery model with Rostow’s stages. Rostow views development as an independent ladder any country can climb; Wallerstein views underdevelopment as an active structural condition maintained by core exploitation.',
      'Confusing GDP with GNI. GDP counts economic output produced WITHIN a nation’s borders; GNI counts income earned by a nation’s citizens and corporations regardless of where on Earth it is generated.'
    ],
    cramSheet: [
      'Rostow: 5 Stages of Modernization (Traditional $\\rightarrow$ Preconditions $\\rightarrow$ Takeoff $\\rightarrow$ Maturity $\\rightarrow$ Mass Consumption).',
      'Wallerstein: Core (manufactures/consumes), Semi-Periphery (industrializes), Periphery (extracts raw materials).',
      'Weber: Bulk-reducing locates near raw materials; Bulk-gaining locates near market.',
      'Special Economic Zones (SEZs) and Maquiladoras offer low taxes, tariff-free exports, and cheap labor to attract foreign multinational investment.'
    ]
  }
];
