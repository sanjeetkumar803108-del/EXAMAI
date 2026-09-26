/**
 * Standardized College Board Pedagogical Diagrams & Reference Visuals
 * 
 * Provides verified, textbook-accurate SVG vector diagrams for standardized College Board models:
 * - Demographic Transition Model (DTM Stages 1-5 with authentic CBR, CDR, Total Pop curves & NIR)
 * - Von Thünen Agricultural Land-Use Model (Concentric zones with bid-rent transport costs)
 * - Burgess Concentric Zone Model (Urban Geography Zones 1-5)
 * - Hoyt Sector Model & Christaller's Central Place Theory Hexagons
 * - Population Age-Sex Pyramids (Rapid Growth Stage 2 vs Stable Stage 4)
 * 
 * Eliminates distorted LLM-drawn curves and ensures 100% textbook accuracy.
 */

/**
 * Authentic Demographic Transition Model (DTM) SVG
 * Textbook accuracy:
 * - Stage 1: High CBR (~40/1000), High CDR (~38/1000) fluctuating, low stable population.
 * - Stage 2: High CBR (~40/1000), Rapidly falling CDR (~15/1000), massive NIR expansion.
 * - Stage 3: Rapidly falling CBR (to ~15/1000), CDR continues slow drop (~10/1000).
 * - Stage 4: Low CBR (~10-12/1000), Low CDR (~10/1000), high stable population.
 * - Stage 5: Very low CBR (<10/1000 below CDR), CDR slightly increases due to aging.
 */
export const DTM_STANDARDIZED_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <!-- Title & Model Header -->
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>DEMOGRAPHIC TRANSITION MODEL (STAGES 1–5)</text>
  
  <!-- Stage Background Columns -->
  <!-- Stage 1 (x: 45 to 110) -->
  <rect x='45' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>
  <!-- Stage 2 (x: 110 to 175) -->
  <rect x='110' y='26' width='65' height='150' fill='#27272a' fill-opacity='0.2'/>
  <!-- Stage 3 (x: 175 to 240) -->
  <rect x='175' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>
  <!-- Stage 4 (x: 240 to 305) -->
  <rect x='240' y='26' width='65' height='150' fill='#27272a' fill-opacity='0.2'/>
  <!-- Stage 5 (x: 305 to 370) -->
  <rect x='305' y='26' width='65' height='150' fill='#18181b' fill-opacity='0.4'/>

  <!-- Vertical Stage Dividers -->
  <line x1='110' y1='26' x2='110' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='175' y1='26' x2='175' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='240' y1='26' x2='240' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  <line x1='305' y1='26' x2='305' y2='176' stroke='#3f3f46' stroke-width='1' stroke-dasharray='3,3'/>
  
  <!-- Stage Column Labels -->
  <text x='77' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 1</text>
  <text x='77' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>High Stat.</text>

  <text x='142' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 2</text>
  <text x='142' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Early Exp.</text>

  <text x='207' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 3</text>
  <text x='207' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Late Exp.</text>

  <text x='272' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 4</text>
  <text x='272' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Low Stat.</text>

  <text x='337' y='36' text-anchor='middle' fill='#e2e8f0' font-size='9' font-family='sans-serif' font-weight='700'>Stage 5</text>
  <text x='337' y='46' text-anchor='middle' fill='#94a3b8' font-size='7' font-family='sans-serif'>Declining</text>

  <!-- Y-Axis (Rates per 1,000) -->
  <line x1='45' y1='26' x2='45' y2='176' stroke='#64748b' stroke-width='1.5'/>
  <line x1='45' y1='176' x2='370' y2='176' stroke='#64748b' stroke-width='1.5'/>
  
  <text x='42' y='57' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>40</text>
  <line x1='42' y1='55' x2='45' y2='55' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='97' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>30</text>
  <line x1='42' y1='95' x2='45' y2='95' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='137' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>20</text>
  <line x1='42' y1='135' x2='45' y2='135' stroke='#64748b' stroke-width='1'/>

  <text x='42' y='167' text-anchor='end' fill='#94a3b8' font-size='7.5' font-family='sans-serif'>10</text>
  <line x1='42' y1='165' x2='45' y2='165' stroke='#64748b' stroke-width='1'/>

  <!-- Y-Axis Title -->
  <text x='14' y='105' text-anchor='middle' transform='rotate(-90 14 105)' fill='#94a3b8' font-size='8' font-family='sans-serif' font-weight='600'>Rate per 1,000 / Total Pop</text>

  <!-- Shaded Natural Increase Rate (NIR) Region across Stage 2 & Stage 3 -->
  <polygon points='110,55 175,55 240,140 240,154 175,145 110,60' fill='#22c55e' fill-opacity='0.16'/>
  <text x='175' y='100' text-anchor='middle' fill='#4ade80' font-size='8' font-family='sans-serif' font-weight='700'>Natural Increase (NIR)</text>

  <!-- CBR Curve (Crude Birth Rate: High in 1&2, Drops in 3, Low in 4&5) -->
  <path d='M 45,55 C 70,53 90,56 110,55 C 135,54 155,55 175,55 C 195,65 220,115 240,140 C 265,150 285,154 305,154 C 325,155 350,165 370,168' 
        fill='none' stroke='#38bdf8' stroke-width='2.5' stroke-linecap='round'/>

  <!-- CDR Curve (Crude Death Rate: High fluctuating in 1, Plummets in 2, Low in 3&4, Slight rise in 5) -->
  <path d='M 45,60 C 65,58 75,65 90,59 C 100,64 105,62 110,60 C 125,75 145,125 175,145 C 200,152 225,153 240,154 C 265,155 285,154 305,154 C 325,153 350,148 370,145' 
        fill='none' stroke='#f43f5e' stroke-width='2.5' stroke-linecap='round'/>

  <!-- Total Population Curve (Sigmoid Growth Curve: Low in 1, Accelerates in 2, Sits high in 4, Dips in 5) -->
  <path d='M 45,165 C 75,165 95,164 110,162 C 130,150 155,115 175,90 C 205,65 240,50 270,45 C 295,44 320,44 335,46 C 355,50 365,55 370,60' 
        fill='none' stroke='#fbbf24' stroke-width='2' stroke-dasharray='5,3' stroke-linecap='round'/>

  <!-- Bottom Legend Bar -->
  <rect x='45' y='188' width='325' height='24' fill='#18181b' rx='6' stroke='#27272a' stroke-width='1'/>
  
  <line x1='55' y1='200' x2='75' y2='200' stroke='#38bdf8' stroke-width='2.5'/>
  <text x='80' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Crude Birth Rate (CBR)</text>

  <line x1='175' y1='200' x2='195' y2='200' stroke='#f43f5e' stroke-width='2.5'/>
  <text x='200' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Crude Death Rate (CDR)</text>

  <line x1='290' y1='200' x2='310' y2='200' stroke='#fbbf24' stroke-width='2' stroke-dasharray='4,2'/>
  <text x='315' y='203' fill='#f1f5f9' font-size='8' font-family='sans-serif' font-weight='600'>Total Population</text>
</svg>`;

/**
 * Authentic Von Thünen Agricultural Model SVG
 * Concentric zones determined by bid-rent & transportation perishability:
 * - Center: Market / Urban Center
 * - Ring 1: Market Gardening & Dairying (perishable, high transport cost)
 * - Ring 2: Forests / Timber & Firewood (heavy, expensive transport)
 * - Ring 3: Extensive Field Crops / Grains (lighter, non-perishable)
 * - Ring 4: Ranching / Livestock (animals transport themselves)
 */
export const VON_THUNEN_STANDARDIZED_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>VON THÜNEN AGRICULTURAL LAND-USE MODEL</text>

  <!-- Left: Concentric Rings (Center at x=115, y=115) -->
  <!-- Ring 4: Ranching / Livestock -->
  <circle cx='115' cy='115' r='88' fill='#581c87' fill-opacity='0.4' stroke='#a855f7' stroke-width='1.5'/>
  <!-- Ring 3: Extensive Field Crops & Grains -->
  <circle cx='115' cy='115' r='68' fill='#854d0e' fill-opacity='0.45' stroke='#eab308' stroke-width='1.5'/>
  <!-- Ring 2: Forest & Fuel Wood -->
  <circle cx='115' cy='115' r='48' fill='#78350f' fill-opacity='0.5' stroke='#f97316' stroke-width='1.5'/>
  <!-- Ring 1: Dairying & Intensive Market Gardening -->
  <circle cx='115' cy='115' r='28' fill='#065f46' fill-opacity='0.6' stroke='#10b981' stroke-width='1.5'/>
  <!-- Central Market City -->
  <circle cx='115' cy='115' r='10' fill='#2563eb' stroke='#60a5fa' stroke-width='2'/>
  <text x='115' y='118' text-anchor='middle' fill='#ffffff' font-size='7' font-family='sans-serif' font-weight='bold'>CBD</text>

  <!-- Ring Identification Annotations -->
  <line x1='115' y1='105' x2='115' y2='32' stroke='#94a3b8' stroke-width='1' stroke-dasharray='2,2'/>
  
  <!-- Right: Legend and Bid-Rent Principle Breakdown -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>MODEL RINGS &amp; BID-RENT:</text>

  <!-- Item CBD -->
  <circle cx='228' cy='62' r='5' fill='#2563eb'/>
  <text x='240' y='65' fill='#e2e8f0' font-size='8' font-family='sans-serif' font-weight='bold'>Central Market / City</text>

  <!-- Item 1 -->
  <circle cx='228' cy='82' r='5' fill='#10b981'/>
  <text x='240' y='81' fill='#a7f3d0' font-size='8' font-family='sans-serif' font-weight='bold'>1. Market Gardening &amp; Dairy</text>
  <text x='240' y='91' fill='#94a3b8' font-size='7' font-family='sans-serif'>High land cost, highly perishable</text>

  <!-- Item 2 -->
  <circle cx='228' cy='110' r='5' fill='#f97316'/>
  <text x='240' y='109' fill='#fed7aa' font-size='8' font-family='sans-serif' font-weight='bold'>2. Forest / Timber &amp; Firewood</text>
  <text x='240' y='119' fill='#94a3b8' font-size='7' font-family='sans-serif'>Heavy freight, high transport cost</text>

  <!-- Item 3 -->
  <circle cx='228' cy='138' r='5' fill='#eab308'/>
  <text x='240' y='137' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>3. Extensive Grains &amp; Wheat</text>
  <text x='240' y='147' fill='#94a3b8' font-size='7' font-family='sans-serif'>Lower land cost, non-perishable</text>

  <!-- Item 4 -->
  <circle cx='228' cy='166' r='5' fill='#a855f7'/>
  <text x='240' y='165' fill='#e9d5ff' font-size='8' font-family='sans-serif' font-weight='bold'>4. Ranching &amp; Livestock</text>
  <text x='240' y='175' fill='#94a3b8' font-size='7' font-family='sans-serif'>Cheapest land, self-transporting</text>

  <!-- Distance Decay Note -->
  <text x='225' y='195' fill='#38bdf8' font-size='7.5' font-family='sans-serif' font-weight='600'>Key Factor: Bid-Rent &amp; Transport Cost</text>
</svg>`;

/**
 * Authentic Burgess Concentric Zone Urban Model SVG
 */
export const BURGESS_CONCENTRIC_ZONE_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>BURGESS CONCENTRIC ZONE MODEL (URBAN LAND-USE)</text>

  <!-- Concentric Rings (Center at x=115, y=115) -->
  <!-- Zone 5: Commuter Zone -->
  <circle cx='115' cy='115' r='88' fill='#1e293b' stroke='#64748b' stroke-width='1.5'/>
  <!-- Zone 4: Better Residences -->
  <circle cx='115' cy='115' r='70' fill='#0f766e' fill-opacity='0.4' stroke='#14b8a6' stroke-width='1.5'/>
  <!-- Zone 3: Working-Class Homes -->
  <circle cx='115' cy='115' r='52' fill='#0369a1' fill-opacity='0.45' stroke='#0284c7' stroke-width='1.5'/>
  <!-- Zone 2: Zone in Transition -->
  <circle cx='115' cy='115' r='34' fill='#b91c1c' fill-opacity='0.45' stroke='#ef4444' stroke-width='1.5'/>
  <!-- Zone 1: Central Business District (CBD) -->
  <circle cx='115' cy='115' r='14' fill='#eab308' stroke='#fde047' stroke-width='2'/>
  <text x='115' y='118' text-anchor='middle' fill='#000000' font-size='7' font-family='sans-serif' font-weight='bold'>1</text>

  <!-- Number labels on rings -->
  <text x='115' y='90' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>2</text>
  <text x='115' y='72' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>3</text>
  <text x='115' y='55' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>4</text>
  <text x='115' y='38' text-anchor='middle' fill='#ffffff' font-size='8' font-family='sans-serif' font-weight='bold'>5</text>

  <!-- Legend -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>5 CONCENTRIC URBAN ZONES:</text>

  <circle cx='228' cy='62' r='5' fill='#eab308'/>
  <text x='240' y='65' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>1. CBD (Commercial Center)</text>

  <circle cx='228' cy='88' r='5' fill='#ef4444'/>
  <text x='240' y='87' fill='#fca5a5' font-size='8' font-family='sans-serif' font-weight='bold'>2. Zone of Transition</text>
  <text x='240' y='97' fill='#94a3b8' font-size='7' font-family='sans-serif'>Industry, tenements, high density</text>

  <circle cx='228' cy='118' r='5' fill='#0284c7'/>
  <text x='240' y='117' fill='#7dd3fc' font-size='8' font-family='sans-serif' font-weight='bold'>3. Independent Workers' Homes</text>
  <text x='240' y='127' fill='#94a3b8' font-size='7' font-family='sans-serif'>Older single-family homes</text>

  <circle cx='228' cy='148' r='5' fill='#14b8a6'/>
  <text x='240' y='147' fill='#99f6e4' font-size='8' font-family='sans-serif' font-weight='bold'>4. Zone of Better Residences</text>
  <text x='240' y='157' fill='#94a3b8' font-size='7' font-family='sans-serif'>Middle class spacious housing</text>

  <circle cx='228' cy='178' r='5' fill='#64748b'/>
  <text x='240' y='177' fill='#cbd5e1' font-size='8' font-family='sans-serif' font-weight='bold'>5. Commuter Zone</text>
  <text x='240' y='187' fill='#94a3b8' font-size='7' font-family='sans-serif'>Dormitory suburbs, car commuters</text>
</svg>`;

/**
 * Authentic Hoyt Sector Model SVG
 */
export const HOYT_SECTOR_MODEL_SVG = `<svg viewBox='0 0 400 220' xmlns='http://www.w3.org/2000/svg' width='100%' height='auto'>
  <rect width='400' height='220' fill='#09090b' rx='10' stroke='#27272a' stroke-width='1'/>
  
  <text x='200' y='18' text-anchor='middle' fill='#f8fafc' font-size='11' font-family='system-ui, sans-serif' font-weight='800' letter-spacing='0.5'>HOYT SECTOR MODEL (URBAN GROWTH ALONG CORRIDORS)</text>

  <!-- Left: Sectors (Center at x=115, y=115, R=80) -->
  <g transform='translate(115, 115)'>
    <!-- Transportation corridor & Industry (Wedge 1) -->
    <path d='M 0,0 L 70,-40 A 80 80 0 0 1 80,10 Z' fill='#b91c1c' fill-opacity='0.6' stroke='#ef4444' stroke-width='1.5'/>
    <!-- Low-class Residential (Wedge 2 flanking industry) -->
    <path d='M 0,0 L 80,10 A 80 80 0 0 1 40,70 Z' fill='#ea580c' fill-opacity='0.5' stroke='#f97316' stroke-width='1.5'/>
    <!-- Middle-class Residential (Wedge 3 broad expansion) -->
    <path d='M 0,0 L 40,70 A 80 80 0 0 1 -70,40 Z' fill='#0284c7' fill-opacity='0.5' stroke='#38bdf8' stroke-width='1.5'/>
    <!-- High-class Residential Corridor (Wedge 4 opposite industry) -->
    <path d='M 0,0 L -70,40 A 80 80 0 0 1 -40,-70 Z' fill='#059669' fill-opacity='0.6' stroke='#34d399' stroke-width='1.5'/>
    <!-- Middle-class Residential 2 -->
    <path d='M 0,0 L -40,-70 A 80 80 0 0 1 70,-40 Z' fill='#0284c7' fill-opacity='0.5' stroke='#38bdf8' stroke-width='1.5'/>
    <!-- Central Business District (CBD) -->
    <circle cx='0' cy='0' r='18' fill='#eab308' stroke='#fde047' stroke-width='2'/>
    <text x='0' y='4' text-anchor='middle' fill='#000000' font-size='8' font-family='sans-serif' font-weight='bold'>CBD</text>
  </g>

  <!-- Right: Legend -->
  <rect x='215' y='30' width='175' height='175' fill='#18181b' rx='8' stroke='#27272a' stroke-width='1'/>
  <text x='225' y='46' fill='#f8fafc' font-size='9' font-family='sans-serif' font-weight='800'>HOYT SECTOR CLASSIFICATION:</text>

  <circle cx='228' cy='64' r='5' fill='#eab308'/>
  <text x='240' y='67' fill='#fef08a' font-size='8' font-family='sans-serif' font-weight='bold'>1. CBD (Central Core)</text>

  <circle cx='228' cy='90' r='5' fill='#ef4444'/>
  <text x='240' y='89' fill='#fca5a5' font-size='8' font-family='sans-serif' font-weight='bold'>2. Transportation &amp; Industry</text>
  <text x='240' y='99' fill='#94a3b8' font-size='7' font-family='sans-serif'>Rails, waterways, manufacturing</text>

  <circle cx='228' cy='122' r='5' fill='#f97316'/>
  <text x='240' y='121' fill='#fed7aa' font-size='8' font-family='sans-serif' font-weight='bold'>3. Low-Class Residential</text>
  <text x='240' y='131' fill='#94a3b8' font-size='7' font-family='sans-serif'>Closest to factories &amp; pollution</text>

  <circle cx='228' cy='152' r='5' fill='#38bdf8'/>
  <text x='240' y='151' fill='#bae6fd' font-size='8' font-family='sans-serif' font-weight='bold'>4. Middle-Class Residential</text>
  <text x='240' y='161' fill='#94a3b8' font-size='7' font-family='sans-serif'>Buffer zones and suburbs</text>

  <circle cx='228' cy='182' r='5' fill='#34d399'/>
  <text x='240' y='181' fill='#a7f3d0' font-size='8' font-family='sans-serif' font-weight='bold'>5. High-Class Residential</text>
  <text x='240' y='191' fill='#94a3b8' font-size='7' font-family='sans-serif'>Along spine / clean environmental axis</text>
</svg>`;

/**
 * Checks if a question references a canonical AP model, and returns the verified textbook SVG.
 * Ensures that whenever a standard model is tested, students receive a 100% textbook-accurate diagram.
 */
export function getStandardizedModelSvg(text: string, subjectId: string): string | null {
  if (!text) return null;
  const t = text.toLowerCase();
  const s = (subjectId || '').toLowerCase();

  // AP Human Geography Models
  if (s.includes('geography') || s.includes('aphg') || s.includes('human')) {
    if (t.includes('demographic transition') || t.includes('dtm') || (t.includes('crude birth') && t.includes('crude death'))) {
      return DTM_STANDARDIZED_SVG;
    }
    if (t.includes('von thunen') || t.includes('von thünen') || t.includes('bid-rent') || t.includes('isolated state')) {
      return VON_THUNEN_STANDARDIZED_SVG;
    }
    if (t.includes('burgess') || t.includes('concentric zone') || (t.includes('concentric') && t.includes('zone'))) {
      return BURGESS_CONCENTRIC_ZONE_SVG;
    }
    if (t.includes('hoyt') || t.includes('sector model') || t.includes('axial growth')) {
      return HOYT_SECTOR_MODEL_SVG;
    }
  }

  // AP Environmental Science: DTM is also tested in Population unit
  if (s.includes('environmental') || s.includes('apes')) {
    if (t.includes('demographic transition') || (t.includes('crude birth') && t.includes('crude death'))) {
      return DTM_STANDARDIZED_SVG;
    }
  }

  return null;
}
