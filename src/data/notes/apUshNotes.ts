import { APUnitNote } from './types';

export const AP_USH_NOTES: APUnitNote[] = [
  // ==========================================
  // PERIOD 1 (1491–1607): EARLY CONTACT & COLUMBIAN EXCHANGE
  // ==========================================
  {
    unitId: 'p1',
    unitNumber: 1,
    title: 'Period 1 (1491–1607): Early Contact & Columbian Exchange',
    examWeight: '4%–6% of AP Exam',
    bigIdea: 'Native societies adapted to diverse North American environments before European contact. The Columbian Exchange transformed demographic, ecological, and economic structures across the Atlantic.',
    keyTheorems: [
      {
        name: 'The Columbian Exchange Ecological Shift',
        conditions: 'Transatlantic transfer of plants, animals, culture, populations, and communicable diseases following 1492.',
        conclusion: 'Old World to New World: Horses, cattle, sugar, wheat, and devastating pathogens (smallpox, measles) decimating up to $90\\%$ of indigenous populations. New World to Old World: Nutrient-dense crops (potatoes, maize, tomatoes, cassava) driving European and Asian population explosions; gold and silver fueling capitalism.',
        apTip: 'Columbian Exchange is the most frequently tested topic in Period 1! Always specify both directions: Epidemics devastated the Americas, while calorie-dense crops triggered population booms in Europe.'
      },
      {
        name: 'The Spanish Encomienda & Caste (Casta) System',
        conditions: 'Spanish colonial socio-economic organization in the Americas.',
        conclusion: 'Encomienda system: Spanish crown granted conquistadors legal rights to extract forced labor and tribute from indigenous populations in exchange for Christianization. Casta system: Strict racial hierarchy determined by birth (Peninsulares $\\rightarrow$ Creoles $\\rightarrow$ Mestizos $\\rightarrow$ Mulattoes $\\rightarrow$ Native Americans $\\rightarrow$ Enslaved Africans).',
        apTip: 'Bartolomé de las Casas argued against the brutal treatment of Native Americans, sparking the 1550 Valladolid Debate against Juan Ginés de Sepúlveda.'
      }
    ],
    formulas: [
      {
        name: 'APUSH HIPP Document Analysis Framework',
        latex: '\\text{HIPP} = \\text{Historical Context} + \\text{Intended Audience} + \\text{Purpose} + \\text{Point of View}',
        explanation: 'Required to earn the sourcing point on Document-Based Questions (DBQs).'
      }
    ],
    sections: [
      {
        heading: '1. Pre-Columbian Native American Regional Adaptations',
        content: `How indigenous societies adapted complex cultures to regional environments:

| Region | Environmental Conditions | Primary Economic Subsistence | Representative Societies |
| :--- | :--- | :--- | :--- |
| **Southwest** | Arid desert, canyon basins | Sedentary agriculture based on maize; sophisticated adobe cliff dwellings and complex irrigation canals | Pueblo, Anasazi, Hopi |
| **Great Plains & Basin** | Vast arid grasslands, sparse water | Nomadic hunter-gatherers tracking American bison (buffalo) herds; portable tepees | Lakota Sioux, Comanche, Apache |
| **Mississippi Valley & East** | Fertile river valleys, humid deciduous forests | Mixed agricultural "Three Sisters" (corn, beans, squash); permanent villages; monumental earthen burial mounds | Cahokia (Mississippian mound builders), Cherokee |
| **Pacific Northwest** | Temperate rainforests, coastal marine | Abundant salmon fishing, whaling, ocean foraging; permanent cedar plank longhouses and carved totem poles | Chinook, Tlingit |`
      }
    ,
      {
        heading: '2. The Columbian Exchange, Encomienda & Spanish Casta System (CED 1.4-1.6)',
        content: `Transatlantic ecological convergence and colonial racial hierarchies:

* **The Columbian Exchange Biological Flux**:
  * **From Old World to New World**:
    * Deadly Epidemic Pathogens: Smallpox, measles, influenza decimated an estimated $80\%$ to $90\%$ of indigenous populations who lacked acquired immunological resistance.
    * Domesticated Animals: Horses transformed nomadic Great Plains indigenous hunting culture; cattle and pigs altered American ecosystems.
    * Cash Crops & Weeds: Sugar cane, coffee, wheat, bluegrass.
  * **From New World to Old World**:
    * Nutrient-Dense Caloric Crops: Potatoes, maize (corn), sweet potatoes, manioc, tomatoes.
    * Fuelled a massive European population boom, facilitating the transition from European feudalism to early capitalism.
* **Labor & Social Systems in New Spain**:
  * **Encomienda System**: Spanish crown granted conquistadores legal rights to extract forced indigenous labor and tribute in exchange for converting them to Roman Catholicism (harsh silver mining in Potosí, plantation agriculture).
  * **The Valladolid Debate (1550-1551)**: First moral debate over European colonial rights:
    * **Bartolomé de Las Casas**: Argued indigenous peoples were rational, human souls deserving equal Christian rights and dignified protection.
    * **Juan Ginés de Sepúlveda**: Defended Spanish conquest using Aristotle's concept of 'natural slaves' lacking moral civilization.
  * **The Casta Hierarchy**: Rigid racial classification system: Peninsulares (Spanish-born) > Creoles (European descent born in Americas) > Mestizos (Spanish-Indigenous) > Mulattoes (Spanish-African) > Enslaved Indigenous and African laborers.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating the Impact of the Columbian Exchange (SAQ)',
        topicRef: 'CED 1.2 The Columbian Exchange',
        question: '(a) Briefly describe ONE specific environmental impact of the Columbian Exchange on the Americas. (b) Briefly describe ONE specific demographic impact on Europe. (c) Briefly explain ONE way indigenous peoples resisted European subjugation.',
        solutionSteps: [
          'Step 1: Address prompt (a) - Environmental impact on Americas: The introduction of European domesticated livestock, specifically horses and pigs. Horses revolutionized Great Plains hunting and warfare, while feral pigs rooted up native crops and disrupted indigenous foraging grounds.',
          'Step 2: Address prompt (b) - Demographic impact on Europe: The introduction of American calorie-dense crops, particularly the potato and maize (corn). These hardy staple crops significantly increased nutritional intake, resulting in substantial European population growth and urbanization.',
          'Step 3: Address prompt (c) - Indigenous resistance: Mention military resistance such as the Pueblo Revolt (Popé’s Rebellion) in 1680, or cultural resistance through the blending of Christian rituals with traditional animist beliefs (syncretism).'
        ],
        finalAnswer: '(a) Horses transformed Plains mobility while free-ranging pigs degraded native ecosystems; (b) Potatoes and corn spurred European population expansion; (c) The 1680 Pueblo Revolt successfully expelled Spanish colonists from New Mexico for over a decade.',
        apScoringTip: 'Always follow the A.C.E. method for Short Answer Questions: **A**nswer the prompt directly, **C**ite specific historical evidence, and **E**xplain how the evidence proves your claim.'
      }
    ],
    commonTraps: [
      'Portraying Native Americans as a single homogeneous culture before 1492. Indigenous North America consisted of hundreds of distinct languages, religions, and governance structures.',
      'Assuming horses were native to North America. Horses were introduced by Spanish explorers in the 16th century.',
      'Overlooking the African slave trade transition. As indigenous populations were devastated by disease, Europeans pivoted to the chattel enslavement of West Africans to meet colonial plantation labor demands.'
    ],
    cramSheet: [
      'Maize cultivation supported dense, sedentary Southwestern and Mississippian civilizations (Cahokia).',
      'Columbian Exchange: Disease (smallpox) wiped out ~90% of native populations; Potatoes/corn fueled European population growth.',
      'Encomienda system: Spanish forced labor system, later replaced by enslaved African labor.',
      'Pueblo Revolt (1680): Successful indigenous revolt against Spanish religious persecution; Spanish returned with greater cultural accommodation.'
    ]
  },

  // ==========================================
  // PERIOD 2 (1607–1754): COLONIAL NORTH AMERICA & MERCANTILISM
  // ==========================================
  {
    unitId: 'p2',
    unitNumber: 2,
    title: 'Period 2 (1607–1754): Colonization & Mercantilism',
    examWeight: '6%–8% of AP Exam',
    bigIdea: 'European powers developed distinct colonial models based on economic goals. British North American colonies evolved regional economies, labor systems, and self-governing institutions under salutary neglect.',
    keyTheorems: [
      {
        name: 'The Mercantilist System and Navigation Acts',
        conditions: 'British imperial economic policy governing Atlantic colonial commerce.',
        conclusion: 'Mercantilism held that national power depended on accumulating bullion (gold/silver) via a favorable balance of trade. Colonies existed solely to supply cheap raw materials (tobacco, sugar, timber) to the mother country and purchase manufactured British goods, enforced by the Navigation Acts.',
        apTip: 'During "Salutary Neglect" (1688–1754), Britain largely ignored strict enforcement of the Navigation Acts, allowing the American colonies to develop independent commercial networks and autonomous democratic traditions.'
      },
      {
        name: 'Bacon’s Rebellion & The Transition to Chattel Slavery',
        conditions: '1676 Virginia frontier uprising led by Nathaniel Bacon against Governor Berkeley.',
        conclusion: 'Frustrated former indentured servants clashed with coastal planter elites over frontier land and Indian policy. Planter elites recognized that poor white indentured servants posed a permanent threat of violent insurrection, triggering the rapid transition to hereditary race-based African chattel slavery as the primary plantation labor force.',
        apTip: 'Bacon’s Rebellion is the turning point for colonial labor: Indentured servitude declined rapidly, and Virginia slave codes formalized race-based hereditary chattel slavery!'
      }
    ],
    formulas: [
      {
        name: 'Triangular Trade Circulation',
        latex: '\\text{British Manufactured Goods} \\rightarrow \\text{West Africa} \\xrightarrow{\\text{Middle Passage}} \\text{Enslaved Africans to Americas} \\rightarrow \\text{Raw Materials to Europe}',
        explanation: 'Interconnected Atlantic mercantile trade circuit.'
      }
    ],
    sections: [
      {
        heading: '1. The 3 Distinct British Colonial Regions Matrix',
        content: `Master the contrasting regional characteristics of the Thirteen Colonies:

| Colonial Region | Geography & Climate | Primary Economic Drivers | Dominant Social & Religious Structure | Governance & Labor Systems |
| :--- | :--- | :--- | :--- | :--- |
| **New England** (MA, NH, CT, RI) | Rocky soil, harsh cold winters, short growing season | Subsistence farming, shipbuilding, timber, commercial fishing, Atlantic maritime trade | Puritan / Congregationalist religious conformity; close-knit town settlements centered on meetinghouses | Direct democracy via **Town Hall Meetings**; family labor; high literacy for Bible reading |
| **Middle Colonies** (NY, PA, NJ, DE) | Temperate climate, fertile broad river valleys | "Breadbasket" wheat, rye, and barley farming; flourishing port commerce in NYC and Philadelphia | High ethnic and religious diversity; William Penn’s **Quaker** "Holy Experiment" practicing religious tolerance | Representative colonial assemblies; indentured servants and tenant farmers |
| **Southern & Chesapeake** (VA, MD, NC, SC, GA) | Rich fertile soils, long warm growing season, swampy tidewater | Cash-crop agriculture: Chesapeake grew **Tobacco**; Deep South grew **Rice and Indigo** | Dispersed rural plantations; aristocratic planter oligarchy; Anglican Church dominance | **Virginia House of Burgesses** (1619); massive reliance on enslaved African chattel labor |`
      }
    ,
      {
        heading: '2. Mercantilism, The Navigation Acts & Chattel Slavery (CED 2.3-2.6)',
        content: `Imperial economic controls, colonial resistance, and labor transformations:

* **British Mercantilism & The Navigation Acts**:
  * **Mercantilist Philosophy**: Economic doctrine that global wealth is finite; a mother country must maximize gold/silver reserves by maintaining a favorable balance of trade (exports > imports).
  * **Colonies' Designated Function**: Supply raw agricultural staples (tobacco, sugar, timber, indigo) exclusively to England and consume British manufactured goods.
  * **Navigation Acts (1651-1673)**: Restricted colonial trade strictly to English ships and mandated that 'enumerated goods' pass through English ports for inspection and taxation.
  * **Period of Salutary Neglect (1688-1763)**: Weak British enforcement of trade regulations allowed colonists to build autonomous political assemblies and engage in widespread smuggling.
* **The Transition to Racial Chattel Slavery**:
  * Prior to the late 17th century, Chesapeake tobacco plantations relied primarily on European **indentured servants**.
  * **Bacon's Rebellion (1676) as Watershed Turning Point**: Nathaniel Bacon led an armed rebellion of poor white former indentured servants and landless freemen against Governor William Berkeley's elite planter establishment.
  * The terrified colonial planter elite deliberately transitioned toward **perpetual African chattel slavery** as a permanent, controllable, race-based labor force defined by matrilineal descent (children inherited mother's enslaved status).
* **The First Great Awakening (1730s-1740s)**:
  * Transatlantic evangelical Protestant revival led by **Jonathan Edwards** ('Sinners in the Hands of an Angry God') and traveling orator **George Whitefield**.
  * Emphasized emotional, personal salvation over established church hierarchy, fostering an anti-authoritarian mindset that democratized religious thought across all 13 colonies.`
      }
    ],
    workedExamples: [
      {
        title: 'Comparative Colonization Models (French vs. British)',
        topicRef: 'CED 2.2 European Colonization',
        question: 'Compare the economic goals and interactions with indigenous peoples between the French and British colonial models in 17th-century North America.',
        solutionSteps: [
          'Step 1: Analyze French colonial model: Economic goal was primarily the lucrative **Fur Trade** (beaver pelts). Because few French settlers immigrated (mostly single young men and Jesuit missionaries), they established cooperative alliances and intermarried with indigenous tribes (e.g. Huron, Algonquin).',
          'Step 2: Analyze British colonial model: Economic goal was land acquisition for agricultural settlement (tobacco, cash crops) and family colonies. British arrived in large family groups, demanding permanent land ownership.',
          'Step 3: Compare indigenous relations: The French cultivated trade partnerships and mutual military alliances, while the British engaged in violent conflict (e.g. King Philip’s War, Powhatan Wars) to expel or displace native tribes from agricultural lands.'
        ],
        finalAnswer: 'France focused on the fur trade with few settlers, fostering alliances and intermarriage with Native Americans; Britain sent large family settlements to acquire land for agriculture, driving violent displacement of native populations.',
        apScoringTip: 'Focus on motivations: Trade vs. Land. This fundamental distinction explains why indigenous relations differed so dramatically between European powers.'
      }
    ],
    commonTraps: [
      'Assuming the Puritans championed universal religious freedom. Puritans settled New England seeking freedom for THEMSELVES, but banishing religious dissenters like Roger Williams (Rhode Island) and Anne Hutchinson.',
      'Claiming slavery was exclusive to the South. Chattel slavery existed in all 13 colonies, though it became the foundational economic engine primarily in the plantation South.',
      'Forgetting the First Great Awakening (1730s–1740s). Revivalist preachers like George Whitefield and Jonathan Edwards fostered emotional personal faith, challenging traditional religious authority and uniting colonies across regional boundaries.'
    ],
    cramSheet: [
      'Salutary Neglect: Britain left colonies alone to govern themselves until 1763.',
      'House of Burgesses (1619) & Mayflower Compact (1620) established early representative democracy.',
      'Bacon’s Rebellion (1676) accelerated the transition from indentured servitude to African chattel slavery.',
      'First Great Awakening promoted religious pluralism and questioned traditional clerical authority.'
    ]
  },

  // ==========================================
  // PERIOD 3 (1754–1800): REVOLUTION & THE CONSTITUTION
  // ==========================================
  {
    unitId: 'p3',
    unitNumber: 3,
    title: 'Period 3 (1754–1800): Revolution & The Early Republic',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'The French and Indian War ended salutary neglect, sparking colonial resistance to taxation without representation. The American Revolution yielded a new republic governed by the Constitution.',
    keyTheorems: [
      {
        name: 'The 1763 Imperial Turning Point',
        conditions: 'The conclusion of the French and Indian War (Seven Years’ War) via the Treaty of Paris (1763).',
        conclusion: 'Britain expelled France from North America but was saddled with massive war debt. King George III and Parliament abandoned "Salutary Neglect," issuing the Proclamation of 1763 (forbidding settlement west of the Appalachians) and levying direct taxes (Stamp Act 1765, Townshend Acts) without colonial parliamentary representation.',
        apTip: '1763 is one of the most critical turning-point dates in American history! Before 1763: Salutary neglect and self-rule. After 1763: British taxation, enforcement, and escalating colonial revolt.'
      },
      {
        name: 'The Constitutional Compromises (1787)',
        conditions: 'The Philadelphia Constitutional Convention replacing the weak Articles of Confederation.',
        conclusion: '(1) Great Compromise (Connecticut): Bicameral legislature with House based on population and Senate with equal state representation (2 senators); (2) Three-Fifths Compromise: Enslaved persons counted as 3/5 of a person for legislative apportionment and federal taxation; (3) Bill of Rights: First 10 Amendments guaranteeing individual liberties added to appease Anti-Federalists.',
        apTip: 'Federalists (Hamilton, Madison, Jay) supported ratification via the Federalist Papers; Anti-Federalists feared a distant tyrannical executive and demanded the Bill of Rights.'
      }
    ],
    formulas: [
      {
        name: 'Constitutional Separation of Powers',
        latex: '\\text{Legislative (Article I)} \\iff \\text{Executive (Article II)} \\iff \\text{Judicial (Article III)}',
        explanation: 'Three co-equal federal branches balancing power through institutional checks and balances.'
      }
    ],
    sections: [
      {
        heading: '1. Articles of Confederation vs. US Constitution Comparison',
        content: `Why the Articles of Confederation failed and how the Constitution rectified its weaknesses:

| Feature | Articles of Confederation (1781–1789) | United States Constitution (1789–Present) |
| :--- | :--- | :--- |
| **Federal Sovereignty** | Extremely weak central government; states held ultimate sovereignty | National supremacy via the **Supremacy Clause** (Article VI) |
| **Taxation Power** | Congress could NOT levy taxes; could only request voluntary funds | Congress possesses direct power to levy and collect taxes (Article I, Sec 8) |
| **Executive Branch** | **NO Chief Executive** (no President to enforce laws) | Strong President with veto power and commander-in-chief authority |
| **Judicial Branch** | **NO Federal Court System** | Supreme Court and federal court system created to resolve interstate disputes |
| **Commerce Regulation** | Congress could NOT regulate interstate commerce (states had tariffs) | **Commerce Clause**: Federal government regulates interstate and foreign trade |
| **Catalyst for Change** | **Shays’ Rebellion (1786)**: Mass farmers revolt exposed federal impotence | Constitutional Convention called to establish a more stable union |`
      }
    ,
      {
        heading: '2. The Imperial Crisis, Revolutionary War & The Constitution (CED 3.2-3.9)',
        content: `The path to independence, war mobilization, and founding statecraft:

* **1763: The Great Imperial Watershed Turning Point**:
  * **Treaty of Paris (1763)**: Ended the French and Indian War (Seven Years' War), expelling France from North America but leaving Britain with immense national debt.
  * **End of Salutary Neglect**: Britain enforced taxes on colonies to pay for imperial defense:
    * **Proclamation of 1763**: Prohibited colonial settlement west of the Appalachian Mountains to avoid Pontiac's Rebellion.
    * **Stamp Act (1765)**: First direct internal tax on printed paper; sparked the Stamp Act Congress, Sons of Liberty, and the rallying cry 'No Taxation Without Representation!'.
    * **Intolerable (Coercive) Acts (1774)**: Punished Boston for the Boston Tea Party, closing the port and quartering troops, prompting the First Continental Congress.
* **Thomas Paine's Common Sense (January 1776)**:
  * Popular pamphlet using plain, accessible language to argue that it was contrary to common sense for an island across an ocean to govern a continent, propelling the Declaration of Independence (July 4, 1776).
* **Articles of Confederation (1781) Failures**:
  * Unicameral legislature with NO executive, NO federal judiciary, NO power to levy taxes, and NO standing army.
  * **Shays' Rebellion (1786)**: Armed uprising of debt-ridden Massachusetts farmers exposed the federal government's total inability to maintain public order, prompting the Constitutional Convention.
* **Constitutional Compromises (1787)**:
  * **The Great (Connecticut) Compromise**: Bicameral legislature; proportional representation in the House of Representatives, equal representation (2 senators per state) in the Senate.
  * **The Three-Fifths Compromise**: Counted three-fifths of enslaved persons for congressional representation and direct taxation.
  * **Federalists vs. Anti-Federalists**: Federalists supported ratification (Hamilton, Madison, Jay authored *The Federalist Papers*); Anti-Federalists demanded a **Bill of Rights** to protect individual liberties against federal tyranny.
* **Hamilton's Financial Plan (1790-1791)**:
  * Full federal funding of national debt at par and assumption of state war debts.
  * Protective tariffs and an excise tax on whiskey (sparking the 1794 Whiskey Rebellion).
  * Creation of the **Bank of the United States (BUS)**, defended via the 'Elastic Clause' (Necessary and Proper Clause) under loose constitutional construction.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating Sourcing and Point of View (DBQ Analysis)',
        topicRef: 'CED 3.4 Common Sense & Revolutionary Ideology',
        question: 'Analyze the historical situation and intended audience of Thomas Paine’s pamphlet *Common Sense* (January 1776).',
        solutionSteps: [
          'Step 1: Identify historical situation: In early 1776, the Revolutionary War was underway (Lexington & Concord, Bunker Hill), but most colonists still viewed themselves as British subjects seeking reconciliation with King George III.',
          'Step 2: Identify intended audience: The broad colonial public and common citizens, written in accessible, persuasive prose without Latin or dense legal jargon.',
          'Step 3: Analyze purpose: To persuade ordinary colonists that complete independence was not just necessary, but common sense, arguing that an island (Britain) should not rule a continent, and denouncing hereditary monarchy as unnatural tyranny.',
          'Step 4: Connect to historical significance: *Common Sense* fundamentally shifted public opinion away from reconciliation toward declaring full independence in July 1776.'
        ],
        finalAnswer: 'Paine wrote *Common Sense* to convince common colonists that reconciliation with the British Crown was impossible, mobilizing public support for the Declaration of Independence.',
        apScoringTip: 'When sourcing a document on the DBQ, explain WHY the author’s perspective or historical situation matters for interpreting the document.'
      }
    ],
    commonTraps: [
      'Assuming the Constitution eliminated slavery. The Constitution protected the institution of slavery via the 3/5ths clause, the Fugitive Slave Clause, and a 20-year ban on outlawing the Atlantic slave trade until 1808.',
      'Thinking George Washington was an avid party leader. Washington loathed political parties, warning against factions and foreign entangling alliances in his famous 1796 Farewell Address.',
      'Confusing the Declaration of Independence with the Constitution. The Declaration (1776) justified separation from Britain using John Locke’s natural rights; the Constitution (1787) created the legal structure of the federal government.'
    ],
    cramSheet: [
      '1763: End of French and Indian War, end of Salutary Neglect, Proclamation of 1763.',
      'Stamp Act (1765): First direct internal tax, sparking "No taxation without representation!"',
      'Shays’ Rebellion (1786) proved the Articles of Confederation were too weak.',
      'Alexander Hamilton’s Financial Plan: National Bank (BUS), federal assumption of state debts, protective tariff.',
      'Washington’s Farewell Address (1796): Warned against political parties and permanent foreign alliances.'
    ]
  },

  // ==========================================
  // PERIOD 4 (1800–1848): DEMOCRACY, MARKET REVOLUTION & REFORM
  // ==========================================
  {
    unitId: 'p4',
    unitNumber: 4,
    title: 'Period 4 (1800–1848): Democratization, Market Revolution & Reform',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'The expansion of democratic suffrage coincided with the Market Revolution. Social reform movements emerged from the Second Great Awakening as sectional tensions deepened.',
    keyTheorems: [
      {
        name: 'The Market Revolution Economic Transformation',
        conditions: 'Antebellum transportation and industrial boom connecting regional economies.',
        conclusion: 'Innovations in transportation (canals, steamboats, railroads) and communication (telegraph) linked western agricultural grain farms to eastern industrial manufacturing centers, shifting the US economy from local agrarian subsistence to specialized commercial market capitalism.',
        apTip: 'The Market Revolution altered gender roles: The "Cult of Domesticity" emerged, designating the public sphere of paid work for men and the private moral home sphere for women.'
      },
      {
        name: 'Jacksonian Democracy and the Second Party System',
        conditions: 'Expansion of universal white male suffrage eliminating property qualifications.',
        conclusion: 'Andrew Jackson championed the "common man," establishing the Democratic Party against Henry Clay’s Whig Party. Jackson expanded presidential authority through aggressive use of the veto, patronage (spoils system), and dismantling the Second Bank of the United States.',
        apTip: 'Contradiction of Jacksonian Democracy: While expanding suffrage for common white men, Jackson violently dispossessed Native Americans (Indian Removal Act of 1830 and the Trail of Tears).'
      }
    ],
    formulas: [
      {
        name: 'Henry Clay’s American System',
        latex: '\\text{American System} = \\text{Protective Tariffs} + \\text{National Bank (BUS)} + \\text{Federally Funded Internal Improvements}',
        explanation: 'Whig economic blueprint to link northern factories with southern and western agriculture.'
      }
    ],
    sections: [
      {
        heading: '1. Antebellum Social Reform Movements from the 2nd Great Awakening',
        content: `The Second Great Awakening fostered religious revivalism, inspiring widespread moral crusades aimed at perfecting American society:

| Reform Movement | Key Leaders & Texts | Core Goals & Philosophy | Methods & Historical Impact |
| :--- | :--- | :--- | :--- |
| **Abolitionism** | William Lloyd Garrison (*The Liberator*), Frederick Douglass (*The North Star*), Harriet Tubman | Immediate emancipation of enslaved persons without compensation; moral condemnation of chattel slavery | Founded American Anti-Slavery Society; Underground Railroad; sparked southern defense of slavery as a "positive good" |
| **Women’s Rights & Suffrage** | Elizabeth Cady Stanton, Lucretia Mott, Susan B. Anthony | Political equality, property rights, legal independence, and female suffrage | **Seneca Falls Convention (1848)**; authored *Declaration of Sentiments* ("all men and women are created equal"); launched feminist movement |
| **Temperance** | American Temperance Society, Lyman Beecher, Frances Willard | Ban or restrict consumption of alcoholic beverages to safeguard family welfare | Pledged total abstinence ("teetotalism"); reduced domestic violence; led to Maine Law (1851) banning alcohol sales statewide |
| **Asylum & Prison Reform** | Dorothea Dix | Humane treatment for the mentally ill, separating them from violent criminals | Documented horrific conditions in state legislatures; established state-funded mental hospitals and rehabilitation facilities |
| **Utopian Communities** | Robert Owen (New Harmony), Oneida Community, Brook Farm | Create ideal cooperative societies transcending competitive industrial capitalism | Experimented with communal property, shared labor, and perfectionism; short-lived but challenged capitalist norms |`
      }
    ,
      {
        heading: '2. The Market Revolution, Jacksonian Democracy & Sectionalism (CED 4.2-4.8)',
        content: `Economic transformation, democratic expansion, and early sectional fissures:

* **The Market Revolution Triad of Innovations**:
  * **Transportation**: Erie Canal (1825) linked Western grain farmers to New York City port; Robert Fulton's steamboats enabled upstream navigation; early railroads connected regional hubs.
  * **Communication**: Samuel Morse's electric telegraph (1844) coordinated national commerce instantly.
  * **Industrial Production**: Eli Whitney's interchangeable parts and cotton gin; Samuel Slater's factory system and Francis Cabot Lowell's textile mills employing young single women ('Lowell Mill Girls').
  * **Social Transformation**: Rise of the urban middle class and the 'Cult of Domesticity' (middle-class gender ideology prescribing women's sphere strictly to home and moral nurturing).
* **Jacksonian Democracy & Mass Politics**:
  * **Universal White Male Suffrage**: Elimination of property ownership requirements for voting expanded the electorate.
  * **The Spoils System**: Andrew Jackson rewarded loyal political partisans with federal administrative jobs ('rotation in office').
  * **The Indian Removal Act (1830)**: Defied Supreme Court Chief Justice John Marshall's ruling in *Worcester v. Georgia* (1832), forcibly marching the Cherokee along the **Trail of Tears** (over 4,000 perished).
  * **The Bank War (1832)**: Jackson vetoed the recharter of the Second Bank of the United States, transferring federal deposits to state 'pet banks', triggering the Panic of 1837.
* **Early Sectional Crises**:
  * **The Missouri Compromise of 1820 (Henry Clay)**: Admitted Missouri as a slave state and Maine as a free state; banned slavery in Louisiana Territory north of latitude **36°30'**.
  * **The Nullification Crisis (1832-1833)**: South Carolina (led by John C. Calhoun) declared the 1828 'Tariff of Abominations' unconstitutional; Jackson threatened military force with the Force Bill while Clay brokered a lower compromise tariff.`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing the Missouri Compromise of 1820',
        topicRef: 'CED 4.8 Sectional Conflict & Missouri Compromise',
        question: 'Explain how the Missouri Compromise of 1820 attempted to resolve sectional conflict over the expansion of slavery, and identify its long-term consequence.',
        solutionSteps: [
          'Step 1: Identify context: In 1819, Missouri applied for statehood as a slave state, threatening to upset the equal balance of 11 free and 11 slave states in the Senate.',
          'Step 2: State terms of the compromise (Henry Clay): (1) Missouri admitted as a slave state; (2) Maine carved out of Massachusetts and admitted as a free state, maintaining the 12-12 balance; (3) Slavery prohibited in the remaining Louisiana Territory north of latitude $36^\\circ 30\'\\text{ N}$.',
          'Step 3: Long-term consequence: The compromise temporarily eased sectional tensions, but Thomas Jefferson famously warned it was a "fire bell in the night" that foreshadowed the eventual bloody division of the Union.',
          'Step 4: It was later repealed by the Kansas-Nebraska Act of 1854 and declared unconstitutional by the *Dred Scott* decision in 1857.'
        ],
        finalAnswer: 'The Missouri Compromise admitted Missouri as slave, Maine as free, and drew the $36^\\circ 30\'$ line banning slavery north of it; it temporarily preserved legislative balance but failed to permanently settle the slavery expansion question.',
        apScoringTip: 'Remember all three components of the 1820 compromise: Missouri (slave), Maine (free), and the $36^\\circ 30\'$ boundary line.'
      }
    ],
    commonTraps: [
      'Assuming all abolitionists advocated violent rebellion. Most (like Garrison and Douglass) advocated moral suasion; only a few radicals like John Brown advocated armed insurrection.',
      'Confusing the First and Second Great Awakenings. First (1730s): Personal salvation before the Revolution. Second (1820s–1830s): Perfectionism that sparked social reform crusades (abolition, temperance, women’s rights).',
      'Thinking the Monroe Doctrine (1823) gave the US authority to colonize Latin America. The doctrine warned European powers against NEW colonization in the Western Hemisphere; the US did not claim annexation rights until the Roosevelt Corollary in 1904.'
    ],
    cramSheet: [
      'Market Revolution: Canals, steamboats, railroads, telegraph linked regional economies.',
      'McCulloch v. Maryland (1819): Affirmed implied federal powers (BUS is constitutional; states cannot tax federal entities).',
      'Missouri Compromise (1820): Missouri (slave), Maine (free), $36^\\circ 30\'$ parallel divides future territories.',
      'Nullification Crisis (1832): South Carolina rejected federal tariffs; Jackson threatened military force to preserve Union supremacy.',
      'Seneca Falls (1848): Declaration of Sentiments demanded female suffrage.'
    ]
  },

  // ==========================================
  // PERIOD 5 (1844–1877): MANIFEST DESTINY, CIVIL WAR & RECONSTRUCTION
  // ==========================================
  {
    unitId: 'p5',
    unitNumber: 5,
    title: 'Period 5 (1844–1877): Manifest Destiny, Civil War & Reconstruction',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'Ideologies of Manifest Destiny spurred territorial expansion that ignited toxic debates over slavery. The Civil War preserved the Union, and Reconstruction reshaped constitutional rights.',
    keyTheorems: [
      {
        name: 'The Compromise of 1850 and Popular Sovereignty',
        conditions: 'Managing territorial spoils acquired from the Mexican-American War (Mexican Cession 1848).',
        conclusion: '(1) California admitted as a free state; (2) Utah and New Mexico territories decided slavery via **Popular Sovereignty**; (3) Slave trade banned in Washington D.C.; (4) Harsh new **Fugitive Slave Act** compelling northerners to assist in capturing runaway enslaved people.',
        apTip: 'The Fugitive Slave Act was the most divisive element: It radicalized Northern anti-slavery sentiment, directly inspiring Harriet Beecher Stowe to write *Uncle Tom’s Cabin* (1852) and spurring the Underground Railroad.'
      },
      {
        name: 'The Reconstruction Amendments (13th, 14th, 15th)',
        conditions: 'Post-Civil War constitutional transformation of American citizenship.',
        conclusion: '(1) **13th Amendment (1865)**: Completely abolished slavery and involuntary servitude; (2) **14th Amendment (1868)**: Granted birthright citizenship and guaranteed equal protection of the laws and due process; (3) **15th Amendment (1870)**: Prohibited denying voting rights based on race, color, or previous servitude.',
        apTip: 'Mnemonic: **FREE CITIZENS VOTE** (13 = Free, 14 = Citizens, 15 = Vote). Despite these amendments, Southern states used Black Codes, Jim Crow laws, poll taxes, literacy tests, and KKK terror to suppress freedmen.'
      }
    ],
    formulas: [
      {
        name: 'Civil War Union Advantages vs. Confederate Advantages',
        latex: '\\text{Union: Population (22M vs 9M)} + \\text{Industry (90\\%)} + \\text{Railroads} \\quad \\text{vs.} \\quad \\text{Confederacy: Defensive War} + \\text{Military Generals}',
        explanation: 'Union industrial superiority and naval blockades gradually wore down the Confederacy.'
      }
    ],
    sections: [
      {
        heading: '1. Sectional Compromises and the Road to Disunion (1820–1861)',
        content: `How legislative attempts to balance slavery expansion continuously unraveled into civil war:

| Compromise / Act / Ruling | Year | Core Provisions & Legal Terms | Sectional Consequence & Backlash |
| :--- | :--- | :--- | :--- |
| **Missouri Compromise** | 1820 | Missouri enters as slave, Maine as free; bans slavery north of $36^\\circ 30'$ line in Louisiana Purchase | Maintained Senate balance (12-12); temporarily defused sectional crisis; warned by Jefferson as "fire bell in the night" |
| **Compromise of 1850** | 1850 | California free state; NM/UT popular sovereignty; DC slave trade banned; harsh new **Fugitive Slave Act** | Fugitive Slave Act radicalized Northerners, stimulated Underground Railroad and Stowe’s *Uncle Tom’s Cabin* (1852) |
| **Kansas-Nebraska Act** | 1854 | Popular sovereignty for Kansas and Nebraska territories, officially repealing the 1820 $36^\\circ 30'$ line | Sparked violent guerrilla warfare ("Bleeding Kansas"); destroyed Whig Party and birthed the anti-slavery **Republican Party** |
| **Dred Scott v. Sandford** | 1857 | Chief Justice Taney ruled Black people were not citizens; Congress has NO constitutional power to ban territorial slavery | Invalidated Republican platform; outraged Northern public opinion; Southern Democrats emboldened to demand federal protection |
| **Crittenden Compromise** | 1860 | Last-ditch proposal to extend $36^\\circ 30'$ line to California to prevent southern secession | Rejected by Lincoln and Republicans because it allowed territorial slavery expansion; Deep South seceded |`
      }
    ,
      {
        heading: '2. Manifest Destiny, Road to Disunion, Civil War & Reconstruction (CED 5.2-5.11)',
        content: `Territorial expansion, escalating slavery crises, total war, and constitutional rebuilding:

* **Manifest Destiny & Territorial Conquest**:
  * Term coined by John L. O'Sullivan (1845): The God-given belief that the United States was divinely destined to expand across the North American continent from Atlantic to Pacific.
  * **Mexican-American War (1846-1848)**: Sparked by Texas annexation; concluded with the **Treaty of Guadalupe Hidalgo**, ceding California and the American Southwest (Mexican Cession) for $15 million.
  * **Wilmot Proviso (1846)**: Proposal to ban slavery in all territory acquired from Mexico; repeatedly passed House but failed Senate, reigniting explosive sectional conflict.
* **The Escalating Sectional Crisis of the 1850s**:
  * **Compromise of 1850 (Henry Clay)**: Admitted California as a free state, abolished slave trade in Washington D.C., opened Utah and New Mexico territories to **popular sovereignty**, and enacted a draconian **Fugitive Slave Act** that outraged Northern abolitionists.
  * **Kansas-Nebraska Act (1854 - Stephen Douglas)**: Repealed the Missouri Compromise 36°30' line to allow popular sovereignty in Kansas and Nebraska, triggering the bloody guerrilla violence of 'Bleeding Kansas' and giving birth to the modern anti-slavery **Republican Party**.
  * **Dred Scott v. Sandford (1857 - Chief Justice Roger Taney)**: Ruled that African Americans were not citizens, that enslaved people were private property protected by the 5th Amendment, and that Congress had **NO constitutional authority to ban slavery in ANY federal territory**.
  * **John Brown's Raid on Harpers Ferry (1859)**: Radical abolitionist attempted to seize federal armory to arm an enslaved rebellion; executed, polarising North and South.
  * **Election of 1860**: Abraham Lincoln won with zero Southern electoral votes; South Carolina seceded in December 1860.
* **Civil War & Emancipation (1861-1865)**:
  * **Emancipation Proclamation (Jan 1, 1863)**: Freed enslaved people in rebelling Confederate states; reframed the war from preserving the Union into a moral crusade against slavery, blocking British/French diplomatic intervention and authorizing African American Union army enlistment (~180,000 served).
  * Turning Point Battles: Gettysburg (July 1-3, 1863) and Vicksburg (July 4, 1863, securing Union control of the Mississippi River).
* **Reconstruction (1865-1877)**:
  * **The Reconstruction Amendments**:
    * **13th Amendment (1865)**: Completely abolished slavery (except as punishment for crime).
    * **14th Amendment (1868)**: Granted birthright citizenship and guaranteed equal protection of the laws and due process against state infringement.
    * **15th Amendment (1870)**: Prohibited denial of voting rights based on race, color, or previous condition of servitude (angered women's suffrage advocates who were excluded).
  * **Compromise of 1877**: Rutherford B. Hayes awarded disputed presidency in exchange for withdrawing federal troops from the South, abandoning Southern Black Americans to Jim Crow disenfranchisement, poll taxes, literacy tests, and violent sharecropping peonage.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating the Emancipation Proclamation (1863)',
        topicRef: 'CED 5.9 Government Policies During the Civil War',
        question: 'Explain the military, diplomatic, and moral objectives of Lincoln’s Emancipation Proclamation (January 1, 1863), and identify which enslaved persons were NOT immediately freed.',
        solutionSteps: [
          'Step 1: Identify legal scope: Lincoln issued the proclamation as Commander-in-Chief as a "fit and necessary war measure." It declared free ONLY those enslaved persons residing in territories currently in active rebellion against the United States.',
          'Step 2: Who was NOT freed: Enslaved persons in the loyal **Border States** (Maryland, Delaware, Kentucky, Missouri) and Union-controlled parts of the Confederacy were NOT freed, because Lincoln feared driving border states into the Confederacy.',
          'Step 3: Military objective: Undermined the Confederate plantation economy and authorized the recruitment of freed Black soldiers into the Union Army (e.g. 54th Massachusetts), providing roughly 180,000 vital troops.',
          'Step 4: Diplomatic objective: Redefined the war as an explicit moral crusade against slavery, making it politically impossible for Britain or France to recognize or aid the Confederacy.',
          'Step 5: Moral shift: Transformed the Union war goal from merely "preserving the Union" to a revolutionary war for human freedom.'
        ],
        finalAnswer: 'The Emancipation Proclamation freed slaves in rebellious Confederate states, added 180,000 Black soldiers to Union ranks, and blocked European intervention; it exempted loyal border states.',
        apScoringTip: 'Never say the Emancipation Proclamation freed ALL slaves! It freed only those in rebel territory; the 13th Amendment was required to officially abolish slavery nationwide.'
      }
    ],
    commonTraps: [
      'Believing Lincoln entered the presidency to immediately abolish slavery. Lincoln’s initial 1861 goal was strictly to preserve the Union and prevent slavery’s EXPANSION into western territories.',
      'Claiming Reconstruction failed because the South won the war. Reconstruction ended because Northern political will collapsed, finalized by the **Compromise of 1877** (Hayes awarded presidency in exchange for withdrawing federal troops from the South).',
      'Confusing carpetbaggers with scalawags. Carpetbaggers were Northerners who moved south after the war for economic or political opportunity; Scalawags were white Southerners who cooperated with Republican Reconstruction policies.'
    ],
    cramSheet: [
      'Manifest Destiny: Belief in God-given American destiny to expand coast-to-coast.',
      'Dred Scott (1857): Slaves are property, not citizens; Congress cannot ban slavery in territories.',
      'Reconstruction Amendments: 13th (Abolished slavery), 14th (Birthright citizenship & Equal protection), 15th (Voting rights).',
      'Sharecropping: System of debt peonage replacing slavery in the post-war South.',
      'Compromise of 1877: Ended Reconstruction by removing federal troops from the South.'
    ]
  },

  // ==========================================
  // PERIOD 6 (1865–1898): THE GILDED AGE
  // ==========================================
  {
    unitId: 'p6',
    unitNumber: 6,
    title: 'Period 6 (1865–1898): The Gilded Age & Industrialization',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'Industrial capitalism transformed the American economy, creating corporate monopolies, labor unrest, massive immigration, and the closing of the Western frontier.',
    keyTheorems: [
      {
        name: 'Monopoly Consolidation: Horizontal vs. Vertical Integration',
        conditions: 'Robber barons amassing unprecedented corporate empires during the Second Industrial Revolution.',
        conclusion: 'Horizontal Integration: Buying out or eliminating competitors in the same industry to establish monopoly control (John D. Rockefeller’s Standard Oil trust). Vertical Integration: Controlling every stage of production from raw materials to manufacturing to distribution to eliminate middlemen and slash costs (Andrew Carnegie’s Carnegie Steel).',
        apTip: 'Carnegie defended massive wealth accumulation in *The Gospel of Wealth* (1889), arguing that the wealthy had a moral obligation to act as philanthropic trustees for society.'
      },
      {
        name: 'The Populist (People’s) Party Platform (1892 Omaha Platform)',
        conditions: 'Agrarian revolt of debt-ridden Midwestern and Southern farmers against railroad monopolies and banks.',
        conclusion: 'The Omaha Platform demanded: (1) Free and unlimited coinage of silver ("Free Silver" at 16:1 ratio) to cause inflation and ease farmer debt, (2) Direct election of US Senators, (3) Graduated income tax, (4) Government ownership of railroads and telegraphs, (5) Secret ballots and an 8-hour workday for urban laborers.',
        apTip: 'William Jennings Bryan gave the famous 1896 "Cross of Gold" speech advocating Free Silver. Although the Populist Party collapsed, virtually all their reforms were later adopted during the Progressive Era!'
      }
    ],
    formulas: [
      {
        name: 'Social Darwinism Ideology',
        latex: '\\text{Herbert Spencer: "Survival of the fittest" applied to human socioeconomic classes}',
        explanation: 'Justified extreme wealth inequality and opposed government regulation or labor unions as interference with natural economic evolution.'
      }
    ],
    sections: [
      {
        heading: '1. Gilded Age Labor Unions, Monopolies & Industrial Conflicts',
        content: `How industrial workers organized against corporate exploitation and faced federal intervention:

| Labor Union / Conflict | Year & Leadership | Membership Base & Philosophy | Key Event & Historical Impact |
| :--- | :--- | :--- | :--- |
| **Knights of Labor** | 1869 (Terence Powderly) | Open to **ALL** workers: Skilled, unskilled, women, and African Americans | Campaigned for 8-hour workday, cooperative worker ownership; collapsed after being falsely blamed for the violent **Haymarket Riot (1886)** |
| **American Federation of Labor (AFL)** | 1886 (Samuel Gompers) | Exclusively **skilled craft workers** segregated into specific trades | Focused on pragmatic "bread-and-butter" unionism (higher wages, 8-hour day, workplace safety); used collective bargaining and strikes |
| **Great Railroad Strike** | 1877 | B&O Railroad workers across multiple states striking against 10% wage cuts | Paralyzed 60% of nation's rail lines; President Hayes deployed **federal troops** to violently crush strike, setting precedent for capital backing |
| **Homestead Strike** | 1892 (Amalgamated Assoc. vs. Frick) | Carnegie Steel union workers fighting wage cuts and lockouts | Henry Clay Frick hired Pinkerton armed guards; bloody shootout ended with PA state militia crushing the union |
| **Pullman Strike** | 1894 (Eugene V. Debs & ARU) | American Railway Union striking against Pullman company town wage cuts | Rail traffic halted across Midwest; President Cleveland sent federal troops citing mail disruption; Debs jailed under Sherman Act |`
      }
    ,
      {
        heading: '2. Industrial Capitalism, Urbanization & The Populist Movement (CED 6.2-6.11)',
        content: `Second Industrial Revolution corporate consolidation, labor struggles, and agrarian revolt:

* **Rise of Corporate Monopolies & Robber Barons**:
  * **Vertical Integration (Andrew Carnegie - Carnegie Steel)**: Controlling every phase of production from iron ore extraction and rail transport to manufacturing mills, eliminating intermediate markups.
  * **Horizontal Integration (John D. Rockefeller - Standard Oil)**: Buying out or crushing competing oil refineries into a singular dominant trust, controlling over $90\%$ of national refining capacity.
  * **Ideological Justifications**:
    * **Social Darwinism (Herbert Spencer)**: Applied Darwin's biological 'survival of the fittest' to human society, arguing poverty resulted from inherent personal unfitness.
    * **The Gospel of Wealth (Andrew Carnegie)**: Wealthy elites held fortunes as trustees with a moral obligation to fund philanthropic civic institutions (libraries, universities, concert halls).
* **Labor Unrest & Union Clashes**:
  * **Knights of Labor (Terence Powderly)**: Inclusive union welcoming skilled, unskilled, women, and Black workers; collapsed after being unfairly blamed for the **Haymarket Square Riot (1886)** bomb in Chicago.
  * **American Federation of Labor (AFL - Samuel Gompers)**: Focused strictly on skilled craft workers and 'bread-and-butter' issues (higher wages, 8-hour workday, safer workplace conditions).
  * Violent strikes suppressed by federal troops: Great Railroad Strike of 1877, Homestead Steel Strike (1892), Pullman Strike (1894).
* **Urbanization & The New Immigrants**:
  * Shift from 'Old Immigrants' (Northern/Western Europe) to **'New Immigrants' (Southern/Eastern Europe - Italy, Poland, Russia, Greece)**: Catholic, Jewish, settled in ethnic urban enclaves; met by nativist backlashes (American Protective Association).
  * Political Machines: **Tammany Hall (Boss Tweed)** traded municipal services, jobs, and coal to poor immigrants in exchange for political votes.
* **The Agrarian Revolt & The Populist Party**:
  * Farmers squeezed by falling crop prices, high railroad freight rates, and deflated gold-backed currency.
  * **The Populist (People's) Party 1892 Omaha Platform**:
    1. **Free Silver (Bimetallism)**: Unlimited coinage of silver at 16:1 ratio to inflate currency and ease debtor burdens.
    2. Government ownership of railroads and telegraphs.
    3. Graduated federal income tax.
    4. Direct election of US Senators.
  * **Election of 1896**: William Jennings Bryan gave the famous 'Cross of Gold' speech; defeated by Republican William McKinley, securing corporate-industrial dominance.`
      }
    ],
    workedExamples: [
      {
        title: 'Frederick Jackson Turner’s Frontier Thesis (1893)',
        topicRef: 'CED 6.3 Westward Expansion & Social Culture',
        question: 'Explain the central argument of Frederick Jackson Turner’s "Frontier Thesis" and explain how its proclamation influenced American foreign policy in the 1890s.',
        solutionSteps: [
          'Step 1: State Turner’s core thesis: The continuous presence of an open western frontier shaped American democracy, individualism, egalitarianism, and unique national character, acting as a "safety valve" for urban discontent.',
          'Step 2: Identify turning point: The 1890 US Census announced that the American frontier was officially closed—there was no longer a discernible frontier line of unsettled wilderness.',
          'Step 3: Connect to foreign policy: Turner and contemporary leaders warned that closing the continental frontier would cause social unrest and economic stagnation unless the US found new overseas frontiers to conquer.',
          'Step 4: Result: The Frontier Thesis provided intellectual justification for the rise of American Imperialism in the 1890s (annexation of Hawaii, Spanish-American War, acquisition of Philippines).'
        ],
        finalAnswer: 'Turner argued the frontier forged American democracy and character; its closing in 1890 drove political leaders to seek new overseas commercial and colonial frontiers in the Pacific and Caribbean.',
        apScoringTip: 'Connect the domestic closing of the frontier in 1890 directly to the overseas imperialist expansion of 1898.'
      }
    ],
    commonTraps: [
      'Assuming the Sherman Anti-Trust Act (1890) successfully broke up monopolies during the Gilded Age. In reality, the courts initially weaponized the law against LABOR UNIONS, ruling that strikes were illegal restraints on trade!',
      'Confusing "Old" vs. "New" Immigrants. "Old" (pre-1880): Northern/Western Europe (Irish, Germans, British), mostly Protestant and English-speaking. "New" (1880–1920): Southern/Eastern Europe (Italians, Poles, Russian Jews), Catholic/Jewish, facing fierce nativism.',
      'Thinking the Dawes Severalty Act (1887) protected Native American culture. The Dawes Act sought to forcibly assimilate natives by breaking up tribal reservations into individual 160-acre allotments and selling off surplus land.'
    ],
    cramSheet: [
      'Gilded Age coined by Mark Twain: Glittering wealth on the surface concealing underlying poverty, corruption, and exploitation.',
      'Robber Barons: Carnegie (Vertical integration, Steel), Rockefeller (Horizontal integration, Oil).',
      'Dawes Act (1887): Assimilation policy breaking up tribal lands into individual private plots.',
      'Plessy v. Ferguson (1896): Legalized racial segregation under the fraudulent doctrine of "Separate but equal."',
      'Populist Party (1892): Farmers demanded Free Silver, direct election of senators, and income tax.'
    ]
  },

  // ==========================================
  // PERIOD 7 (1890–1945): IMPERIALISM, PROGRESSIVISM, DEPRESSION & WORLD WARS
  // ==========================================
  {
    unitId: 'p7',
    unitNumber: 7,
    title: 'Period 7 (1890–1945): Global Conflict, Progressivism & New Deal',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'The US transitioned from an isolationist nation to a global superpower through two World Wars. Domestic reform peaked in the Progressive Era and FDR’s New Deal.',
    keyTheorems: [
      {
        name: 'The Progressive Era Amendments (16th, 17th, 18th, 19th)',
        conditions: 'Bipartisan reform response to Gilded Age corporate monopolies, political machines, and social inequities.',
        conclusion: '(1) **16th Amendment (1913)**: Graduated federal income tax; (2) **17th Amendment (1913)**: Direct election of US Senators by the public; (3) **18th Amendment (1919)**: National prohibition of alcoholic beverages; (4) **19th Amendment (1920)**: Granted women the right to vote.',
        apTip: 'Mnemonic: **T**ax, **S**enators, **S**obriety, **S**uffrage (16 = Income Tax, 17 = Direct Senators, 18 = Prohibition, 19 = Women’s Suffrage).'
      },
      {
        name: 'Franklin D. Roosevelt’s New Deal (The 3 R’s)',
        conditions: 'Combating the catastrophic economic collapse of the Great Depression ($25\\%$ unemployment).',
        conclusion: '(1) **Relief** for the unemployed (CCC, WPA public works jobs); (2) **Recovery** for business and agriculture (NRA, AAA paying farmers to reduce crop surplus); (3) **Reform** of financial institutions to prevent future collapses (FDIC bank insurance, SEC stock market oversight, **Social Security Act of 1935**).',
        apTip: 'The New Deal fundamentally transformed American governance: It established the modern welfare state and cemented the principle that the federal government is responsible for the economic security of its citizens.'
      }
    ],
    formulas: [
      {
        name: 'FDR New Deal Coalition',
        latex: '\\text{New Deal Coalition} = \\text{Urban Working Class} + \\text{Labor Unions} + \\text{African Americans} + \\text{Southern Whites} + \\text{Immigrants}',
        explanation: 'Electoral alignment that dominated presidential politics for three decades.'
      }
    ],
    sections: [
      {
        heading: '1. The Progressive Era Amendments & New Deal Alphabet Agencies',
        content: `How 20th-century reform fundamentally expanded the federal government’s regulatory and welfare powers:

| Program / Amendment | Year / Era | Constitutional or Regulatory Mechanism | Long-Term Transformation & Significance |
| :--- | :--- | :--- | :--- |
| **16th & 17th Amendments** | 1913 | 16th: Graduated federal income tax; 17th: Direct popular election of US Senators | Replaced tariff reliance with federal tax revenue; stripped state party bosses and corporate machines of Senate appointments |
| **18th & 19th Amendments** | 1919 / 1920 | 18th: National prohibition of alcohol manufacture/sale; 19th: Granted women voting rights nationwide | Prohibition led to bootlegging and organized crime (repealed by 21st); 19th climaxed 70-year suffrage fight (Seneca Falls to NAWSA) |
| **Civilian Conservation Corps (CCC)** | 1933 (Relief) | Put 3 million young men to work planting 3 billion trees, building trails, and developing state/national parks | Provided immediate income to impoverished families during Depression and preserved public lands |
| **Agricultural Adjustment Act (AAA)** | 1933 (Recovery) | Paid federal subsidies to farmers to cut crop and livestock production to raise farm prices | Artificially inflated commodity prices to restore agricultural purchasing power; hurt tenant farmers/sharecroppers |
| **Federal Deposit Insurance Corp (FDIC)** | 1933 (Reform) | Insured bank deposits up to $2,500 (now $250,000) under the Glass-Steagall Banking Act | Ended panic runs on commercial banks; restored national public confidence in the banking system |
| **Social Security Act** | 1935 (Reform) | Established federal old-age pensions, unemployment compensation, and aid to dependent children/disabled | Created the cornerstone of the modern American welfare state, guaranteeing federal financial safety net |`
      }
    ,
      {
        heading: '2. Imperialism, The Progressive Era, World War I & The New Deal (CED 7.2-7.14)',
        content: `America on the global stage, domestic reform movements, economic collapse, and state expansion:

* **American Imperialism (1898-1914)**:
  * **Spanish-American War (1898)**: Yellow journalism and sinking of the USS Maine; Treaty of Paris granted the US Puerto Rico, Guam, and the Philippines, sparking the Philippine-American War and the Anti-Imperialist League (Mark Twain).
  * **The Open Door Policy (John Hay)**: Demanded equal commercial trading access for all nations in China.
  * **Roosevelt Corollary to the Monroe Doctrine (1904)**: Asserted the US right to act as an international police power in Latin America ('Big Stick Diplomacy').
* **The Progressive Era (1890-1920)**:
  * Reform movement led by educated urban middle-class professionals to remedy Gilded Age social and political abuses.
  * **Muckrakers**: Upton Sinclair (*The Jungle*, exposing meatpacking horrors, inspiring Pure Food and Drug Act), Ida Tarbell (exposing Standard Oil trust), Jacob Riis (*How the Other Half Lives*).
  * **Progressive Constitutional Amendments**:
    * **16th Amendment (1913)**: Graduated federal income tax.
    * **17th Amendment (1913)**: Direct popular election of US Senators.
    * **18th Amendment (1919)**: Prohibition of alcoholic beverages.
    * **19th Amendment (1920)**: Guaranteed women the right to vote.
* **World War I & The Homefront (1917-1919)**:
  * US abandoned neutrality due to unrestricted German submarine warfare (Lusitania, Sussex Pledge) and the **Zimmermann Telegram**.
  * **Domestic Civil Liberties Infringements**: Espionage Act (1917) and Sedition Act (1918) jailed anti-war dissenters like Eugene V. Debs; upheld in *Schenck v. United States* (1919 - 'clear and present danger').
  * **The Great Migration**: Hundreds of thousands of Black Americans migrated from the Jim Crow South to Northern urban industrial centers for factory jobs, giving rise to the **Harlem Renaissance**.
  * Woodrow Wilson's **Fourteen Points** and League of Nations; Senate rejected Treaty of Versailles led by reservationist Henry Cabot Lodge, returning to isolationism.
* **The Great Depression & FDR's New Deal (1929-1939)**:
  * Stock Market Crash of October 29, 1929 ('Black Tuesday') ignited worldwide economic catastrophe; Herbert Hoover's voluntary cooperation failed.
  * **Franklin D. Roosevelt's New Deal (The 3 R's)**:
    * **Relief**: Civilian Conservation Corps (CCC), Works Progress Administration (WPA).
    * **Recovery**: Agricultural Adjustment Act (AAA), National Industrial Recovery Act (NIRA).
    * **Reform**: Federal Deposit Insurance Corporation (FDIC) insuring bank deposits, Securities and Exchange Commission (SEC) regulating Wall Street, and the landmark **Social Security Act (1935)** establishing the modern social safety net.`
      }
    ],
    workedExamples: [
      {
        title: 'Debate Over American Imperialism in 1898',
        topicRef: 'CED 7.2 Imperialism: Debates',
        question: 'Contrast the arguments of American Imperialists and Anti-Imperialists following the Spanish-American War regarding the annexation of the Philippines.',
        solutionSteps: [
          'Step 1: Imperialist arguments (McKinley, Theodore Roosevelt, Henry Cabot Lodge): Argued annexation provided a vital naval refueling station and commercial gateway to Asian markets (China Open Door). Invoked Social Darwinism and "White Man’s Burden" paternalism to "uplift and Christianize" foreign populations.',
          'Step 2: Anti-Imperialist arguments (Mark Twain, Andrew Carnegie, William Jennings Bryan, Anti-Imperialist League): Argued subjugating foreign peoples without their consent violated the fundamental principles of the Declaration of Independence ("consent of the governed").',
          'Step 3: Connect to outcome: Senate ratified the treaty by a narrow margin; the US fought a brutal three-year Philippine-American War to suppress Filipino independence fighters led by Emilio Aguinaldo.'
        ],
        finalAnswer: 'Imperialists cited naval power, commercial access to Asian markets, and racial paternalism; Anti-Imperialists argued colonialism violated the founding democratic principle of self-determination.',
        apScoringTip: 'Remember that Anti-Imperialists included prominent industrialists like Andrew Carnegie alongside labor leaders and writers.'
      }
    ],
    commonTraps: [
      'Believing the New Deal ended the Great Depression. The New Deal provided vital economic relief and institutional reforms, but full economic recovery and full employment were achieved only by massive defense mobilization in World War II.',
      'Assuming the US joined the League of Nations. President Woodrow Wilson created the League in his 14 Points, but the US Senate (led by Henry Cabot Lodge) rejected the Treaty of Versailles to preserve constitutional warmaking autonomy.',
      'Thinking the 1920s was uniformly prosperous. While urban consumerism boomed, American farmers suffered chronic agricultural depression and debt throughout the entire 1920s due to post-WWI crop surpluses.'
    ],
    cramSheet: [
      'Progressive Era: Muckrakers (Upton Sinclair, Ida Tarbell) exposed corporate abuse; Teddy Roosevelt’s Square Deal regulated trusts.',
      'Progressive Amendments: 16th (Tax), 17th (Senators), 18th (Prohibition), 19th (Women’s Suffrage).',
      'The Great Depression (1929) caused by stock speculation on margin, bank failures, and farm overproduction.',
      'New Deal: Relief, Recovery, Reform (Social Security, FDIC, SEC).',
      'Lend-Lease Act (1941) made the US the "Arsenal of Democracy" before Pearl Harbor forced entry into WWII.'
    ]
  },

  // ==========================================
  // PERIOD 8 (1945–1980): COLD WAR, CIVIL RIGHTS & THE GREAT SOCIETY
  // ==========================================
  {
    unitId: 'p8',
    unitNumber: 8,
    title: 'Period 8 (1945–1980): Cold War, Civil Rights & Vietnam',
    examWeight: '10%–17% of AP Exam',
    bigIdea: 'The Cold War shaped foreign policy through containment and proxy wars. The Civil Rights Movement dismantled legal segregation, while cultural protests divided society.',
    keyTheorems: [
      {
        name: 'The Containment Doctrine (George F. Kennan)',
        conditions: 'US foreign policy strategy to resist Soviet communist expansionism.',
        conclusion: 'The US committed to "contain" communism within its existing borders through economic aid (Marshall Plan), military alliances (NATO), and diplomatic doctrines (Truman Doctrine). Led to proxy wars in Korea (1950–1953) and Vietnam (1964–1973).',
        apTip: 'The Truman Doctrine declared the US would support free peoples resisting subjugation by armed minorities or outside pressures, inaugurating decades of global interventionism.'
      },
      {
        name: 'Landmark Civil Rights Legislation (1964 & 1965)',
        conditions: 'Grassroots civil rights campaigns (Montgomery Bus Boycott, March on Washington, Selma).',
        conclusion: '(1) **Civil Rights Act of 1964**: Banned racial discrimination in all public accommodations and prohibited employment discrimination based on race, sex, or national origin; (2) **Voting Rights Act of 1965**: Outlawed literacy tests and placed southern voting registration under federal oversight.',
        apTip: 'These laws dismantled the entire legal framework of Jim Crow, but alienated southern white voters, prompting a historic political realignments toward the Republican Party.'
      }
    ],
    formulas: [
      {
        name: 'Cold War Domino Theory',
        latex: '\\text{Fall of one nation to communism} \\implies \\text{Neighboring nations fall like dominoes}',
        explanation: 'Provided theoretical justification for US military escalation in Vietnam.'
      }
    ],
    sections: [
      {
        heading: '1. Lyndon B. Johnson’s Great Society vs. FDR’s New Deal',
        content: `Comparing the two peak periods of 20th-century liberal reform:

| Program / Feature | FDR’s New Deal (1930s) | LBJ’s Great Society (1960s) |
| :--- | :--- | :--- |
| **Primary National Context** | Responding to economic **Depression** ($25\\%$ unemployment) | Enacted during a period of unprecedented **Economic Prosperity** |
| **Core Social Target** | Providing direct economic relief, jobs, and financial regulation | Waging the **"War on Poverty"** and securing racial civil rights |
| **Healthcare Programs** | Social Security (pensions, but no universal healthcare) | Created **Medicare** (health insurance for elderly) and **Medicaid** (for low-income) |
| **Education & Environment** | PWA/WPA school construction, Civilian Conservation Corps | Head Start, Elementary and Secondary Education Act, Clean Air/Water Acts |
| **Downfall / Limitation** | Scaled back due to Supreme Court battles and WWII mobilization | Massive federal spending diverted to fund the disastrous **Vietnam War** |`
      }
    ,
      {
        heading: '2. The Cold War, The Civil Rights Revolution & The Vietnam Era (CED 8.2-8.13)',
        content: `Global ideological containment, mass movements for racial equality, and countercultural upheavals:

* **Cold War Containment Geopolitics (1945-1991)**:
  * **Containment Doctrine (George F. Kennan)**: Stop the expansion of Soviet communism wherever it threatened to spread.
  * **Truman Doctrine (1947)**: $400 million in military aid to Greece and Turkey to resist communist subversion.
  * **Marshall Plan (1948)**: $13 billion in economic aid to rebuild Western Europe and inoculate against communist parties.
  * **NATO (1949)**: Collective security alliance against Soviet aggression; countered by the Warsaw Pact (1955).
  * Proxy Hot Conflicts: Korean War (1950-1953, ended in armistice at 38th parallel); Cuban Missile Crisis (October 1962, closest the world came to nuclear war).
  * **Second Red Scare**: Senator Joseph McCarthy's baseless anticommunist witch-hunts; House Un-American Activities Committee (HUAC) blacklisting Hollywood.
* **The Modern Civil Rights Movement**:
  * **Brown v. Board of Education (1954 - Chief Justice Earl Warren)**: Overturned *Plessy v. Ferguson*, ruling that separate educational facilities are inherently unequal.
  * Nonviolent Direct Action: Montgomery Bus Boycott (1955 - Rosa Parks, Martin Luther King Jr.), Greensboro sit-ins (1960), Freedom Rides (1961), March on Washington (1963).
  * **Landmark Federal Civil Rights Legislation**:
    * **Civil Rights Act of 1964**: Banned racial segregation in all public accommodations and outlawed employment discrimination based on race, religion, sex, or national origin.
    * **Voting Rights Act of 1965**: Outlawed literacy tests and sent federal registrars to Southern counties, dramatically expanding Black political participation.
* **The Vietnam War & Domestic Crisis (1964-1975)**:
  * **Gulf of Tonkin Resolution (1964)**: Blank check handed to President Lyndon B. Johnson to escalate military deployment without formal congressional declaration of war.
  * **Tet Offensive (1968)**: Coordinated Vietcong surprise attacks proved the war was unwinnable, shattering US public credibility ('credibility gap').
  * 1968 Watershed: MLK and Robert F. Kennedy assassinations, violent anti-war protests at Chicago Democratic National Convention.
  * **Watergate Scandal (1972-1974)**: Richard Nixon's cover-up of DNC break-in led to near-impeachment and his historic resignation in August 1974, eroding American public trust in government.`
      }
    ],
    workedExamples: [
      {
        title: 'Brown v. Board of Education (1954) Sourcing Analysis',
        topicRef: 'CED 8.6 Early Steps in the Civil Rights Movement',
        question: 'Explain how the Supreme Court decision in *Brown v. Board of Education* (1954) overturned legal precedent and analyze ONE obstacle that delayed its implementation.',
        solutionSteps: [
          'Step 1: Identify overturned precedent: *Brown* directly overturned the 1896 *Plessy v. Ferguson* doctrine of "separate but equal."',
          'Step 2: Legal reasoning: Chief Justice Earl Warren ruled unanimously that racially segregated schools are inherently unequal and violate the Equal Protection Clause of the 14th Amendment, generating feelings of inferiority among Black children.',
          'Step 3: Analyze implementation obstacle: The Supreme Court ordered desegregation with "all deliberate speed," which Southern states exploited to delay compliance through "Massive Resistance" (e.g. closing public schools, Southern Manifesto, Little Rock Central High crisis requiring federal troops).',
          'Step 4: Conclude: Meaningful desegregation required federal military intervention and the Civil Rights Act of 1964.'
        ],
        finalAnswer: '*Brown v. Board* struck down "separate but equal" as a violation of the 14th Amendment Equal Protection Clause; southern states enacted "Massive Resistance" to stall integration.',
        apScoringTip: 'Always link *Brown v. Board* directly to the **14th Amendment’s Equal Protection Clause**.'
      }
    ],
    commonTraps: [
      'Assuming the Cold War involved direct military conflict between the US and the USSR. The US and Soviet Union never fought directly; they engaged through proxy wars (Korea, Vietnam, Afghan-Soviet War) and nuclear brinkmanship (Cuban Missile Crisis).',
      'Confusing Medicare with Medicaid. Medicare is for the ELDERLY (care for seniors); Medicaid is for LOW-INCOME individuals (aid the impoverished).',
      'Thinking the Gulf of Tonkin Resolution was an official declaration of war. Congress never declared war on North Vietnam; the resolution gave President Johnson a "blank check" to escalate military force without formal declaration.'
    ],
    cramSheet: [
      'Containment: George Kennan’s strategy to halt Soviet expansion (Truman Doctrine, Marshall Plan, NATO).',
      'Brown v. Board (1954): Overturned Plessy; segregated public schools violate 14th Amendment.',
      'Civil Rights Act (1964) banned public discrimination; Voting Rights Act (1965) abolished literacy tests.',
      'Gulf of Tonkin Resolution (1964) authorized military escalation in Vietnam; War Powers Act (1973) restricted presidential warmaking.',
      'Watergate Scandal (1974): Richard Nixon resigned after cover-up of DNC break-in was exposed by White House tapes.'
    ]
  },

  // ==========================================
  // PERIOD 9 (1980–PRESENT): CONSERVATISM, GLOBALIZATION & MODERN ERA
  // ==========================================
  {
    unitId: 'p9',
    unitNumber: 9,
    title: 'Period 9 (1980–Present): Conservatism & The Modern Era',
    examWeight: '4%–6% of AP Exam',
    bigIdea: 'The Reagan Revolution inaugurated a conservative resurgence emphasizing deregulation and tax cuts. The end of the Cold War ushered in globalization and the War on Terror.',
    keyTheorems: [
      {
        name: 'The Reagan Revolution and Supply-Side Economics',
        conditions: 'Conservative political resurgence electing Ronald Reagan in 1980.',
        conclusion: '"Reaganomics" (supply-side economics): (1) Major individual and corporate tax cuts (Economic Recovery Tax Act of 1981), (2) Deregulation of finance and environmental restrictions, (3) Massive increases in federal defense spending to outspend the Soviet Union, (4) Cuts to domestic discretionary social programs.',
        apTip: 'Critics noted that while supply-side policies stimulated 1980s economic expansion, pairing tax cuts with massive military spending caused federal national debt to triple!'
      },
      {
        name: 'Post-Cold War Globalization and the War on Terror',
        conditions: 'The 1991 collapse of the Soviet Union and the September 11, 2001 terrorist attacks.',
        conclusion: 'Economic globalization accelerated via multilateral free trade agreements (NAFTA, WTO) and digital internet technology. The 9/11 attacks shifted US national security toward counterterrorism, preemptive war in Afghanistan and Iraq, and domestic surveillance debates (**USA PATRIOT Act**).',
        apTip: 'Debates in Period 9 mirror historical themes: The PATRIOT Act reignited constitutional arguments balancing national security against individual civil liberties (similar to the Alien & Sedition Acts and WWI Espionage Act).'
      }
    ],
    formulas: [
      {
        name: 'Supply-Side Economic Premise (Laffer Curve)',
        latex: '\\text{Lower Tax Rates} \\implies \\text{Higher Private Capital Investment} \\implies \\text{Economic Growth}',
        explanation: 'The conservative economic theory underpinning Reaganomics.'
      }
    ],
    sections: [
      {
        heading: '1. Modern Era Transformations: Conservatism, Foreign Interventions & Demographics',
        content: `Major political, geopolitical, and demographic transformations shaping modern America:

| Theme / Policy | Era & Key Figures | Core Strategy & Mechanism | Long-Term National & Global Impact |
| :--- | :--- | :--- | :--- |
| **Reagan Revolution & Supply-Side Economics** | 1981–1989 (Ronald Reagan) | Lowered top income taxes (ERTA 1981), slashed business regulations, doubled military defense spending | Stimulated 1980s economic boom, but tripled federal national debt; spurred permanent conservative tax-cut orthodoxy |
| **End of Cold War & Globalization** | 1989–1994 (Bush Sr. & Clinton) | Fall of Berlin Wall (1989), collapse of USSR (1991); passage of **NAFTA (1993)** free-trade agreement | Established US as sole superpower; accelerated international supply chains and outsourcing of manufacturing jobs |
| **War on Terror & Domestic Security** | 2001–Present (George W. Bush) | Post-9/11 military interventions in Afghanistan (2001) and Iraq (2003); passed **USA PATRIOT Act** (2001) | Massive expansion of federal executive power and warrantless electronic surveillance; fierce civil liberties debates |
| **Demographic Shift: Sun Belt Boom** | 1970s–Present | Mass migration from northern industrial "Rust Belt" to southern and western "Sun Belt" (TX, FL, AZ, GA) | Shifted congressional seats and electoral college votes South/West; spurred by air conditioning, lower taxes, and aerospace/tech |
| **Immigration Act of 1965 Transformation** | 1965–Present | Replaced discriminatory 1920s national origin quotas with family reunification and skilled employment preferences | Sparked demographic diversification with majority of immigrants arriving from **Latin America and Asia** |`
      }
    ,
      {
        heading: '2. The Reagan Revolution, Post-Cold War Order & The 21st Century (CED 9.2-9.6)',
        content: `Rise of modern conservatism, geopolitical realignments, and post-industrial transitions:

* **The Reagan Revolution of 1980**:
  * Coalition of fiscal conservatives, Cold War hawks, and the evangelical Christian Right (**Moral Majority - Jerry Falwell**).
  * **Supply-Side Economics ('Reaganomics')**:
    * Tax cuts (Economic Recovery Tax Act of 1981) targeting wealthy and corporations to stimulate capital investment (Laffer Curve premise).
    * Substantial domestic deregulation of banking, airline, and environmental industries.
    * Massive increase in defense spending (Strategic Defense Initiative 'Star Wars'), which ran federal budget deficits to record highs.
* **The End of the Cold War (1989-1991)**:
  * Mikhail Gorbachev implemented **Glasnost** (political openness) and **Perestroika** (economic restructuring).
  * Fall of the Berlin Wall (November 1989) and dissolution of the Soviet Union in December 1991 left the United States as the sole global superpower.
* **Globalization & Technological Boom**:
  * **NAFTA (1994)**: Eliminated trade tariffs between the US, Canada, and Mexico.
  * Rise of the personal computer, Internet, and dot-com boom revolutionized productivity while speeding the loss of manufacturing jobs to overseas outsourcing.
* **Post-9/11 Era & The Global War on Terror**:
  * Al-Qaeda terrorist attacks on September 11, 2001 prompted US invasions of Afghanistan (2001) and Iraq (2003).
  * **USA PATRIOT Act (2001)**: Broadened federal electronic surveillance powers, reigniting intense debates balancing national security against 4th Amendment privacy protections.
  * **Demographic Shifts**: The Immigration and Nationality Act of 1965 abolished national origins quotas, transforming American demographics with major immigration waves from Latin America and Asia alongside internal population shifts to the Sunbelt.`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing the Collapse of the Soviet Union (1991)',
        topicRef: 'CED 9.3 The End of the Cold War',
        question: 'Identify and explain TWO factors that contributed to the dissolution of the Soviet Union in 1991.',
        solutionSteps: [
          'Step 1: Factor 1 - Internal economic and political reforms: Soviet Premier Mikhail Gorbachev instituted **Glasnost** (political openness and freedom of speech) and **Perestroika** (economic restructuring incorporating market incentives). Rather than stabilizing the regime, these policies unleashed long-suppressed nationalist independence movements across Soviet satellite republics.',
          'Step 2: Factor 2 - External military and economic pressure: Ronald Reagan’s aggressive defense buildup (including the Strategic Defense Initiative "Star Wars" proposal) forced the economically stagnant Soviet command economy into an arms race it could not financially sustain.',
          'Step 3: Factor 3 - War in Afghanistan: The costly Soviet quagmire in Afghanistan drained resources and military morale.',
          'Step 4: Conclude: In December 1991, the Soviet flag was lowered, formally ending the Cold War and leaving the United States as the sole global superpower.'
        ],
        finalAnswer: 'The Soviet Union collapsed due to Gorbachev’s internal reforms (Glasnost and Perestroika) that unleashed regional nationalism, combined with crippling economic strain from an unsustainable military arms race with the US.',
        apScoringTip: 'Know the definitions of Glasnost (openness) and Perestroika (economic restructuring) for Period 9 foreign policy questions.'
      }
    ],
    commonTraps: [
      'Attributing the end of the Cold War solely to US military buildup. Historians emphasize that internal Soviet economic stagnation, bureaucratic corruption, and Gorbachev’s reforms were equally decisive.',
      'Assuming the conservative movement started with Ronald Reagan. The conservative resurgence began in the 1960s with Barry Goldwater, William F. Buckley’s *National Review*, and the Moral Majority founded by Jerry Falwell.',
      'Overlooking constitutional debates surrounding the USA PATRIOT Act. The expansion of government surveillance wiretaps sparked fierce controversy regarding the 4th Amendment protection against unreasonable searches.'
    ],
    cramSheet: [
      'Reaganomics: Tax cuts, deregulation, defense spending increase, cuts to welfare programs.',
      '1991: Dissolution of the Soviet Union officially ends the Cold War.',
      'Immigration Act of 1965 abolished national quotas; majority of modern immigrants come from Latin America and Asia.',
      'Sun Belt shift: Population and political power moved from the Rust Belt to the South and Southwest.',
      'Post-9/11: Creation of Department of Homeland Security and passage of the USA PATRIOT Act.'
    ]
  }
];
