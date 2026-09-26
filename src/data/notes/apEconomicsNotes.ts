import { APUnitNote } from './types';

export const AP_ECONOMICS_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: BASIC ECONOMIC CONCEPTS, PPC & TRADE
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Basic Economic Concepts, PPC & Comparative Advantage',
    examWeight: '8%–12% of AP Exam (Micro & Macro Foundations)',
    bigIdea: 'Economics is the study of scarcity and choice. Society faces trade-offs modeled by the Production Possibilities Curve (PPC), and gains from trade are maximized through comparative advantage.',
    keyTheorems: [
      {
        name: 'The Law of Increasing Opportunity Cost and Concave PPC',
        conditions: 'Resources are not perfectly adaptable to the production of both goods.',
        conclusion: 'As the production of one good increases, the opportunity cost of producing additional units rises. Geometrically, this gives the Production Possibilities Curve a bowed-out (concave to origin) shape.',
        apTip: 'If resources are perfectly adaptable (e.g. producing pizza vs. calzones), the PPC is a STRAIGHT LINE with constant opportunity costs!'
      },
      {
        name: 'Comparative Advantage and the Gains from Trade',
        conditions: 'Two nations or producers producing two distinct goods.',
        conclusion: 'A producer has an Absolute Advantage if they can produce more output with the same resources. A producer has a Comparative Advantage if they can produce a good at a LOWER opportunity cost. Mutually beneficial trade occurs when the terms of trade fall between the two producers’ opportunity costs.',
        apTip: 'Mnemonic for calculating opportunity cost: For OUTPUT problems ("OOO" = Output: Other goes Over). For INPUT/Time problems ("IOU" = Input: Other goes Under).'
      }
    ],
    formulas: [
      {
        name: 'Opportunity Cost Ratio (Output Method)',
        latex: '\\text{Opportunity Cost of Good A} = \\frac{\\text{Quantity of Good B forgone}}{\\text{Quantity of Good A produced}} \\quad (\\text{"Other Over"})',
        explanation: 'If Nation 1 produces 20 Cars or 60 Planes, 1 Car costs $60/20 = 3$ Planes.'
      },
      {
        name: 'Terms of Trade Range',
        latex: '\\text{Seller\'s Opportunity Cost} < \\text{Terms of Trade} < \\text{Buyer\'s Opportunity Cost}',
        explanation: 'Both parties benefit only when the exchange price lies strictly between their domestic opportunity costs.'
      }
    ],
    sections: [
      {
        heading: '1. Output vs. Input Methods and Comparative Advantage Matrix',
        content: `Decision matrix for solving trade questions on AP Micro & Macro exams:

| Metric / Method | Definition & Data Given | Opportunity Cost Formula | Mnemonic | How to Identify Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Output Method** | Data is in **amount of goods produced** (e.g. tons of wheat, cars built per day) | $\\text{Cost of A} = \\frac{\\text{Output B}}{\\text{Output A}}$ | **OOO** (Output: Other goes Over) | **Higher number** = Absolute Advantage; **Lower Cost** = Comparative Advantage |
| **Input Method** | Data is in **resources/time required** (e.g. hours to make 1 chair, acres of land) | $\\text{Cost of A} = \\frac{\\text{Input A}}{\\text{Input B}}$ | **IOU** (Input: Other goes Under) | **Lower number** = Absolute Advantage (faster/fewer resources); **Lower Cost** = Comparative Advantage |
| **Terms of Trade** | The mutually agreed exchange rate between two goods | Must be strictly between the two domestic opportunity costs | Between Cost A & Cost B | Both nations consume **beyond** their domestic PPC! |`
      }
    ,
      {
        heading: '2. Opportunity Cost, PPC Curvature & Terms of Trade (CED 1.2-1.4)',
        content: `Foundational production possibilities principles and trade negotiations:

* **PPC Shape & Law of Increasing Opportunity Costs**:
  * **Concave (Bowed-Out) PPC**: Reflects increasing opportunity costs because economic resources are NOT perfectly adaptable to alternative uses.
  * **Straight-Line PPC**: Reflects constant opportunity costs where resources are completely interchangeable.
* **Shifts vs. Movements Along PPC**:
  * Movement along curve: Reallocates existing resources (trade-off between consumer and capital goods).
  * Outward shift: Long-run economic growth driven by improvements in technology, discovery of new resources, or human capital investment.
* **Negotiating Terms of Trade**:
  * Mutually beneficial terms of trade must fall strictly between both trading partners' domestic opportunity costs:
    $$\\text{Country A Opportunity Cost} < \\text{Terms of Trade} < \\text{Country B Opportunity Cost}$$
  * This ensures both nations consume outside their individual production possibilities frontiers!`
      }
    ],
    workedExamples: [
      {
        title: 'Determining Comparative Advantage from Output Data',
        topicRef: 'CED Micro 1.3 / Macro 1.3 Comparative Advantage and Trade',
        question: 'In one day, Country X can produce either 40 bushels of Corn or 20 yards of Cloth. Country Y can produce either 30 bushels of Corn or 30 yards of Cloth. (a) Which country has the comparative advantage in Cloth? (b) Suggest a mutually beneficial term of trade for 1 yard of Cloth.',
        solutionSteps: [
          'Step 1: Identify problem type: Output problem (number of goods produced per day) $\\implies$ Use OOO (Other goes Over).',
          'Step 2: Calculate Country X opportunity costs: 1 Cloth costs $\\frac{40}{20} = 2$ Corn. 1 Corn costs $\\frac{20}{40} = 0.5$ Cloth.',
          'Step 3: Calculate Country Y opportunity costs: 1 Cloth costs $\\frac{30}{30} = 1$ Corn. 1 Corn costs $\\frac{30}{30} = 1$ Cloth.',
          'Step 4: Compare costs for Cloth: Country Y gives up 1 Corn; Country X gives up 2 Corn. Country Y has a lower opportunity cost ($1 < 2$) $\\implies$ **Country Y has comparative advantage in Cloth**.',
          'Step 5: Determine Terms of Trade: Mutually beneficial trade for 1 yard of Cloth must lie between 1 Corn and 2 Corn (e.g. 1.5 bushels of Corn).'
        ],
        finalAnswer: '(a) Country Y has the comparative advantage in Cloth. (b) 1 yard of Cloth for 1.5 bushels of Corn.',
        apScoringTip: 'Always show the fraction calculations for opportunity costs! College Board requires comparative advantage justifications to reference specific opportunity cost numbers.'
      }
    ],
    diagrams: [
      {
        id: 'econ_ppc_frontier',
        title: 'Production Possibilities Curve: Scarcity & Economic Growth',
        subtitle: 'Bowed-Out Concave Frontier Illustrating Increasing Opportunity Costs',
        type: 'ppc_frontier_graph',
        description: 'Bowed-out curve showing efficient points on the curve (A), inefficient points inside (B), and unattainable points outside (C), with an outward shift demonstrating economic growth.',
        takeaway: 'Concave PPC reflects increasing opportunity costs; technological progress or capital accumulation shifts the PPC outward.'
      }
    ],
    commonTraps: [
      'Assuming the country with absolute advantage in both goods should produce both. Comparative advantage (lower opportunity cost) dictates specialization, not absolute output!',
      'Confusing input problems with output problems. If the table gives "Hours required to make 1 unit," it is an INPUT problem—lower numbers are better!',
      'Believing points outside the PPC can be reached without trade. Points outside the curve can be consumed ONLY through international specialization and trade.'
    ],
    cramSheet: [
      'Bowed-out PPC = Increasing opportunity costs; Straight-line PPC = Constant opportunity costs.',
      'Output method: OOO (Other Over); Input method: IOU (Other Under).',
      'Comparative advantage = Lowest opportunity cost. Always specialize in your comparative advantage!',
      'Terms of Trade must fall between the two countries’ domestic opportunity costs.'
    ]
  },

  // ==========================================
  // UNIT 2: MICRO: SUPPLY, DEMAND, ELASTICITIES & EFFICIENCY
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Micro 2: Supply, Demand, Elasticity & Market Efficiency',
    examWeight: '15%–20% of Micro AP Exam',
    bigIdea: 'Competitive markets allocate scarce resources through the price mechanism, governed by the laws of supply and demand, consumer/producer surplus, and price elasticities.',
    keyTheorems: [
      {
        name: 'The Law of Demand and Downward-Sloping Demand Curve',
        conditions: 'Ceteris paribus (all other factors held constant).',
        conclusion: 'As the price of a good increases ($P \\uparrow$), quantity demanded decreases ($Q_d \\downarrow$). This inverse relationship is driven by: (1) The Substitution Effect (consumers switch to cheaper alternatives), (2) The Income Effect (higher price reduces real purchasing power), and (3) Diminishing Marginal Utility.',
        apTip: 'A change in PRICE causes a movement ALONG the existing demand curve (change in quantity demanded). A change in non-price determinants (income, preferences, related goods prices) SHIFTS the entire curve!'
      },
      {
        name: 'Deadweight Loss from Price Controls and Taxes',
        conditions: 'Interference with market equilibrium via price ceilings, price floors, or per-unit excise taxes.',
        conclusion: 'Government interventions that drive market output away from equilibrium quantity $Q_e$ create Deadweight Loss (DWL)—the loss of total economic surplus that is neither captured by consumers, producers, nor government tax revenue.',
        apTip: 'A Price Ceiling is binding ONLY when set BELOW equilibrium (causes shortage). A Price Floor is binding ONLY when set ABOVE equilibrium (causes surplus, e.g. minimum wage).'
      }
    ],
    formulas: [
      {
        name: 'Price Elasticity of Demand (Midpoint Formula)',
        latex: 'E_d = \\left| \\frac{\\frac{Q_2 - Q_1}{(Q_1 + Q_2)/2}}{\\frac{P_2 - P_1}{(P_1 + P_2)/2}} \\right|',
        explanation: 'If $E_d > 1$, demand is Elastic; if $E_d < 1$, Inelastic; if $E_d = 1$, Unit Elastic.'
      },
      {
        name: 'Total Revenue Rule of Elasticity',
        latex: '\\text{If } E_d < 1 \\text{ (Inelastic)}, \\; P \\uparrow \\implies TR \\uparrow; \\quad \\text{If } E_d > 1 \\text{ (Elastic)}, \\; P \\uparrow \\implies TR \\downarrow',
        explanation: 'Firms maximize total revenue where demand is unit elastic ($E_d = 1$ and $MR = 0$).'
      }
    ],
    sections: [
      {
        heading: '1. Elasticity Categories and Cross-Elasticity Matrix',
        content: `Classification of economic elasticities:

| Elasticity Metric | Formula Concept | Coefficient Interpretation | Economic Classification |
| :--- | :--- | :--- | :--- |
| **Price Elasticity of Demand ($E_d$)** | $\%\\Delta Q_d / \\%\\Delta P$ | $E_d > 1$ $\\implies$ Elastic | Luxury goods, many substitutes |
| **Price Elasticity of Demand ($E_d$)** | $\%\\Delta Q_d / \\%\\Delta P$ | $E_d < 1$ $\\implies$ Inelastic | Necessities, few substitutes |
| **Price Elasticity of Demand ($E_d$)** | $\%\\Delta Q_d / \\%\\Delta P$ | $E_d = 1$ $\\implies$ Unit Elastic | Total revenue maximized |
| **Cross-Price Elasticity ($E_{xy}$)** | $\%\\Delta Q_{d,x} / \\%\\Delta P_y$ | $E_{xy} > 0$ (Positive) | **Substitutes** (e.g. Coke & Pepsi) |
| **Cross-Price Elasticity ($E_{xy}$)** | $\%\\Delta Q_{d,x} / \\%\\Delta P_y$ | $E_{xy} < 0$ (Negative) | **Complements** (e.g. Coffee & Creamer) |
| **Income Elasticity ($E_i$)** | $\%\\Delta Q_d / \\%\\Delta \\text{Income}$ | $E_i > 0$ (Positive) | **Normal Good** (demand rises with income) |
| **Income Elasticity ($E_i$)** | $\%\\Delta Q_d / \\%\\Delta \\text{Income}$ | $E_i < 0$ (Negative) | **Inferior Good** (e.g. ramen noodles, used cars) |`
      }
    ,
      {
        heading: '2. Consumer/Producer Surplus, Deadweight Loss & Taxes (CED 2.6-2.8)',
        content: `Market welfare maximization, efficiency, and price control distortions:

* **Consumer and Producer Surplus**:
  * **Consumer Surplus (CS)**: Area below the demand curve and above the market price.
  * **Producer Surplus (PS)**: Area above the supply curve and below the market price.
  * **Total Economic Welfare ($CS + PS$)**: Maximized at competitive market equilibrium ($P_e, Q_e$), achieving allocative efficiency ($P = MC$).
* **Price Controls & Deadweight Loss (DWL)**:
  * **Binding Price Ceiling**: Set BELOW equilibrium price $\\implies$ creates chronic shortage ($Q_d > Q_s$) and generates Deadweight Loss.
  * **Binding Price Floor**: Set ABOVE equilibrium price $\\implies$ creates persistent surplus ($Q_s > Q_d$) and generates Deadweight Loss.
* **Tax Incidence & Relative Elasticity**:
  * If demand is more inelastic than supply, buyers bear the greater share of a per-unit tax.
  * If supply is more inelastic than demand, sellers bear the greater tax burden.`
      }
    ],
    workedExamples: [
      {
        title: 'Calculating Deadweight Loss and Tax Incidence',
        topicRef: 'CED Micro 2.8 Taxes and Market Efficiency',
        question: 'In a competitive widget market, equilibrium is $P_e = $10, Q_e = 100$. The government levies a $2 per-unit excise tax on producers, raising consumer price to $11, lowering net producer price to $9, and reducing market transactions to $Q_t = 80$. Calculate: (a) Government tax revenue, and (b) Deadweight Loss (DWL).',
        solutionSteps: [
          'Step 1: Calculate Tax Revenue: $\\text{Revenue} = \\text{Tax per unit} \\times Q_t = \\$2 \\times 80 = \\$160$.',
          'Step 2: Identify loss in quantity: $\\Delta Q = Q_e - Q_t = 100 - 80 = 20$ units.',
          'Step 3: Calculate Deadweight Loss: DWL is the triangular area between supply and demand curves over the lost output: $\\text{DWL} = \\frac{1}{2} \\times \\text{Tax} \\times \\Delta Q = \\frac{1}{2} \\times \\$2 \\times 20 = \\$20$.',
          'Step 4: Tax Incidence: Consumers pay $11 - $10 = $1; producers pay $10 - $9 = $1 $\\implies$ Tax burden is split evenly due to equal elasticities.'
        ],
        finalAnswer: 'Tax Revenue = $160; Deadweight Loss (DWL) = $20.',
        apScoringTip: 'Remember the triangle area formula for Deadweight Loss: $\\frac{1}{2} \\times \\text{Tax} \\times (Q_e - Q_t)$.'
      }
    ],
    diagrams: [
      {
        id: 'econ_supply_demand_tax',
        title: 'Consumer Surplus, Producer Surplus & Tax Deadweight Loss',
        subtitle: 'Triangular Welfare Distribution in Competitive Markets',
        type: 'supply_demand_graph',
        description: 'Classic X-shaped graph showing Consumer Surplus top triangle, Producer Surplus bottom triangle, Tax Revenue rectangle, and Deadweight Loss triangle.',
        takeaway: 'Taxes drive a wedge between consumer and producer prices, creating Deadweight Loss by eliminating mutually beneficial transactions.'
      }
    ],
    commonTraps: [
      'Confusing a "change in demand" (shift of the curve) with a "change in quantity demanded" (movement along the curve caused by price).',
      'Thinking a price ceiling set above equilibrium causes a surplus. An above-equilibrium price ceiling is NON-BINDING and has zero market effect!',
      'Assuming the entity legally obligated to pay the tax bears the economic burden. Tax incidence depends entirely on the relative elasticities of supply and demand, not who writes the check to the government.'
    ],
    cramSheet: [
      'Supply and Demand shift: Price changes cause movements ALONG the curve; external factors SHIFT the curve.',
      'Elasticity: $E_d > 1$ elastic, $E_d < 1$ inelastic. Midpoint on linear demand is unit elastic ($MR = 0$).',
      'Cross-price elasticity: Positive = Substitutes; Negative = Complements.',
      'Income elasticity: Positive = Normal; Negative = Inferior.',
      'Binding price ceiling = BELOW equilibrium (Shortage); Binding price floor = ABOVE equilibrium (Surplus).'
    ]
  },

  // ==========================================
  // UNIT 3: MICRO: PRODUCTION, COSTS & PERFECT COMPETITION
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Micro 3: Production Costs & Perfect Competition',
    examWeight: '12%–15% of Micro AP Exam',
    bigIdea: 'Firms minimize costs across short-run and long-run horizons, maximizing profit where $MR = MC$, with perfect competition driving economic profits to zero in the long run.',
    keyTheorems: [
      {
        name: 'The Golden Profit Maximization Rule ($MR = MC$)',
        conditions: 'Any firm in any market structure (Perfect Competition, Monopoly, Oligopoly).',
        conclusion: 'A rational firm maximizes total profit (or minimizes losses) by producing the output quantity where Marginal Revenue equals Marginal Cost ($MR = MC$), provided price covers average variable cost in the short run.',
        apTip: 'If $MR > MC$, produce more! The extra revenue from that unit exceeds the cost. If $MR < MC$, produce less!'
      },
      {
        name: 'The Short-Run Shutdown Rule vs. Long-Run Exit Rule',
        conditions: 'Operating decisions for a loss-making firm.',
        conclusion: 'In the short run, fixed costs are sunk. A firm should shut down immediately if Price falls below Average Variable Cost ($P < AVC$). If $AVC \\le P < ATC$, the firm continues operating in the short run to offset a portion of fixed costs. In the long run, the firm exits if $P < ATC$.',
        apTip: 'The competitive firm’s short-run supply curve is the Marginal Cost ($MC$) curve ABOVE minimum $AVC$!'
      }
    ],
    formulas: [
      {
        name: 'Cost Equations',
        latex: 'TC = TFC + TVC, \\quad ATC = AFC + AVC, \\quad MC = \\frac{\\Delta TC}{\\Delta Q}',
        explanation: 'Marginal Cost always intersects Average Variable Cost ($AVC$) and Average Total Cost ($ATC$) at their lowest points.'
      },
      {
        name: 'Perfect Competition Price Taker Condition',
        latex: 'P = MR = AR = D \\quad \\text{("Mr. DARP")}',
        explanation: 'In perfect competition, firm faces perfectly horizontal demand curve at market price.'
      }
    ],
    sections: [
      {
        heading: '1. Production Costs Matrix & Minimum Cost Intersections',
        content: `Cost structures and geometric relationships:

| Cost Metric | Abbreviation | Formula | Geometric Behavior on Graph |
| :--- | :--- | :--- | :--- |
| **Total Cost** | $TC$ | $TFC + TVC$ | Upward sloping; vertical distance between $TC$ and $TVC$ is $TFC$ |
| **Marginal Cost** | $MC$ | $\\Delta TC / \\Delta Q$ | U-shaped checkmark; hits minimum of $AVC$ and $ATC$ |
| **Average Total Cost** | $ATC$ | $TC / Q$ | U-shaped; minimum $ATC$ is the productive efficiency point |
| **Average Variable Cost** | $AVC$ | $TVC / Q$ | U-shaped; minimum $AVC$ is the short-run shutdown price |
| **Average Fixed Cost** | $AFC$ | $TFC / Q$ | Continually declining asymptote toward 0 as output expands |`
      }
    ,
      {
        heading: '2. Side-by-Side Market & Firm Graphs and Long-Run Adjustments (CED 3.6-3.7)',
        content: `Perfect competition dynamics from individual firm to industry equilibrium:

* **The Perfectly Competitive Firm as Price Taker**:
  * The firm faces a horizontal, perfectly elastic demand curve:
    $$P = MR = AR = D$$
  * Produces output where Marginal Revenue equals Marginal Cost ($P = MR = MC$) to maximize profit.
* **Short-Run Profit and Long-Run Free Entry/Exit**:
  * **Economic Profit ($P > ATC$)**: Attracts new firms into the industry $\\implies$ Industry Supply shifts right $\\implies$ Market price falls until $P = \\text{min } ATC$ with zero economic profit.
  * **Economic Loss ($P < ATC$)**: Firms exit the industry in the long run $\\implies$ Industry Supply shifts left $\\implies$ Market price rises until normal profit is restored.
* **Long-Run Efficiency Criteria**:
  * **Productive Efficiency**: Producing at the lowest point on the average total cost curve ($P = \\text{min } ATC$).
  * **Allocative Efficiency**: Producing the quantity most desired by society ($P = MC$).`
      }
    ],
    workedExamples: [
      {
        title: 'Long-Run Equilibrium Adjustment in Perfectly Competitive Markets',
        topicRef: 'CED Micro 3.7 Perfect Competition Long-Run Equilibrium',
        question: 'A competitive firm is currently earning positive economic profits ($P > ATC$). Describe the dynamic market adjustment that restores long-run equilibrium.',
        solutionSteps: [
          'Step 1: Short-run state: Economic profit $\\implies$ Total revenue exceeds opportunity costs.',
          'Step 2: Market entry: Because there are NO barriers to entry, new firms enter the industry seeking profit.',
          'Step 3: Industry supply shift: Market supply curve shifts RIGHT ($S \\rightarrow S_1$).',
          'Step 4: Price effect: Market price falls ($P \\downarrow$).',
          'Step 5: Individual firm impact: Horizontal demand curve drops until $P = \\text{minimum } ATC$.',
          'Step 6: Long-run outcome: Economic profits fall to ZERO (normal profit), entry ceases, and both Productive ($P = \\min ATC$) and Allocative ($P = MC$) efficiency are achieved.'
        ],
        finalAnswer: 'New firms enter $\\implies$ Market supply shifts right $\\implies$ Market price falls $\\implies$ Economic profits erode to zero.',
        apScoringTip: 'Remember: Zero economic profit does NOT mean zero accounting profit! It means the firm earns a normal profit covering all explicit and implicit opportunity costs.'
      }
    ],
    diagrams: [
      {
        id: 'perfect_comp_side_by_side',
        title: 'Side-by-Side Market and Firm Perfectly Competitive Graphs',
        subtitle: 'Market Supply/Demand Setting Price for the "Mr. DARP" Horizontal Firm Curve',
        type: 'side_by_side_econ',
        description: 'Classic side-by-side graphs: Left graph shows market equilibrium price crossing horizontally over to the right graph as horizontal line P = MR = AR = D.',
        takeaway: 'Individual competitive firms are price takers with zero market power; price is dictated entirely by global industry equilibrium.'
      }
    ],
    commonTraps: [
      'Thinking a firm should shut down whenever it is losing money. If $P > AVC$, staying open minimizes losses by paying off part of fixed costs!',
      'Forgetting that $MC$ cuts through the MINIMUM of both $ATC$ and $AVC$.',
      'Confusing diminishing marginal returns (short-run phenomenon due to fixed plant size) with diseconomies of scale (long-run phenomenon due to managerial bureaucracy).'
    ],
    cramSheet: [
      'Produce where $MR = MC$ to maximize profit.',
      'Perfect competition: $P = MR = AR = D$ ("Mr. DARP").',
      'Shutdown rule: If $P < AVC$, shut down immediately.',
      'Long-run equilibrium: Zero economic profit ($P = \\min ATC = MC$).',
      'Productive efficiency: $P = \\min ATC$; Allocative efficiency: $P = MC$.'
    ]
  },

  // ==========================================
  // UNIT 4: MICRO: IMPERFECT COMPETITION & GAME THEORY
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Micro 4: Imperfect Competition & Game Theory',
    examWeight: '12%–15% of Micro AP Exam',
    bigIdea: 'Imperfect markets (monopolies, oligopolies, monopolistic competition) restrict output, generate deadweight loss, and engage in strategic game-theoretic interdependence.',
    keyTheorems: [
      {
        name: 'Monopoly Price and Output Inefficiency',
        conditions: 'Single firm with high barriers to entry facing downward-sloping demand.',
        conclusion: 'Because a monopoly must lower price on all units to sell more, Marginal Revenue lies BELOW the Demand curve ($MR < P$). The monopolist produces where $MR = MC$ and charges the price consumers are willing to pay on the Demand curve ($P_m > MC$). Monopolies under-produce, charge higher prices, and create deadweight loss.',
        apTip: 'A natural monopoly has economies of scale over the entire market demand curve (continually downward-sloping $ATC$). Regulators enforce the Fair-Return Price ($P = ATC$) or Socially Optimal Price ($P = MC$).'
      },
      {
        name: 'Nash Equilibrium in Oligopolistic Game Theory',
        conditions: 'Strategic interdependence between oligopolistic firms (Payoff Matrix).',
        conclusion: 'A Dominant Strategy is an action that yields the best outcome regardless of what the competitor chooses. A Nash Equilibrium is an outcome where neither player has an incentive to unilaterally deviate from their chosen strategy given the other player’s choice.',
        apTip: 'In a Prisoner’s Dilemma payoff matrix, collusion (both cooperating) yields the highest joint profit, but the dominant strategy tempts both to defect, landing in an inferior Nash equilibrium.'
      }
    ],
    formulas: [
      {
        name: 'Monopoly Downward Sloping Marginal Revenue',
        latex: 'MR < P \\quad \\text{for any } Q > 0',
        explanation: 'Monopolist must lower the price on previous units to sell an additional unit.'
      },
      {
        name: 'Perfect Price Discrimination Condition',
        latex: '\\text{First-Degree Discrimination: } MR = D \\implies \\text{Consumer Surplus} = 0, \\; \\text{DWL} = 0',
        explanation: 'Charging each consumer their exact willingness to pay captures all surplus into producer profit.'
      }
    ],
    sections: [
      {
        heading: '1. Market Structures Comparative Matrix',
        content: `Comprehensive taxonomy of the four major market structures:

| Characteristic | Perfect Competition | Monopolistic Competition | Oligopoly | Monopoly |
| :--- | :--- | :--- | :--- | :--- |
| **Number of Firms** | Thousands (very large) | Many | Few dominant firms | One single seller |
| **Type of Product** | Standardized (identical) | Differentiated | Standardized or differentiated | Unique (no close substitutes) |
| **Barriers to Entry** | None (free entry/exit) | Low | High (patents, scale) | Very high (legal, geographic) |
| **Control Over Price** | None (Price Taker) | Some | Substantial (Interdependent) | High (Price Maker) |
| **Demand Curve** | Perfectly Elastic (Horizontal) | Downward sloping (Elastic) | Kinked / Interdependent | Downward sloping (Inelastic) |
| **Long-Run Profit** | Zero ($P = \\min ATC$) | Zero ($P = ATC$) | Positive economic profit | Positive economic profit |
| **Efficiency** | Productive & Allocative | Excess capacity (not efficient) | Neither efficient | Neither efficient |`
      }
    ,
      {
        heading: '2. Game Theory Payoff Matrices, Dominant Strategy & Nash (CED 4.5)',
        content: `Strategic interdependence in oligopolies and payoff matrix analysis:

* **$2 \\times 2$ Payoff Matrix Structure**:
  * Shows profits/payoffs for two competing firms given their strategic pricing or output choices.
  * By convention, Firm 1's payoffs are listed first (bottom-left) and Firm 2's payoffs second (top-right).
* **Identifying Dominant Strategies**:
  * A strategy is **dominant** if it yields a strictly higher payoff regardless of which strategy the rival chooses.
  * Circle the best response for Firm 1 for each possible move of Firm 2; repeat for Firm 2.
* **Nash Equilibrium**:
  * An outcome where **both players are choosing their best response** to each other's chosen action.
  * Neither player has an incentive to unilaterally deviate from their strategy.
* **The Prisoner's Dilemma**:
  * Non-cooperative Nash equilibrium yields worse payoffs for both players than the collusive cooperative outcome.`
      }
    ],
    workedExamples: [
      {
        title: 'Solving a $2 \\times 2$ Oligopoly Game Theory Payoff Matrix',
        topicRef: 'CED Micro 4.4 Oligopoly and Game Theory',
        question: 'Two airlines (AirA and FlyB) decide whether to set High or Low ticket prices. Profits (AirA, FlyB): Both High = (\\$100, \\$100); AirA High & FlyB Low = (\\$20, \\$150); AirA Low & FlyB High = (\\$150, \\$20); Both Low = (\\$50, \\$50). (a) Does AirA have a dominant strategy? (b) Identify the Nash Equilibrium.',
        solutionSteps: [
          'Step 1: Determine AirA’s dominant strategy: If FlyB chooses High, AirA prefers Low (\\$150 > \\$100). If FlyB chooses Low, AirA prefers Low (\\$50 > \\$20). Regardless of FlyB, AirA always chooses **Low**.',
          'Step 2: Determine FlyB’s dominant strategy: By symmetry, if AirA chooses High, FlyB chooses Low (\\$150 > \\$100); if AirA chooses Low, FlyB chooses Low (\\$50 > \\$20). FlyB always chooses **Low**.',
          'Step 3: Combine strategies: Both firms have a dominant strategy to choose Low.',
          'Step 4: Find Nash Equilibrium: At (Low, Low), neither firm can unilaterally switch to High without losing money (\\$50 \\rightarrow \\$20).'
        ],
        finalAnswer: '(a) Yes, AirA’s dominant strategy is to price Low. (b) Nash Equilibrium is (AirA Low, FlyB Low) with payoffs (\\$50, \\$50).',
        apScoringTip: 'To prove a dominant strategy on an FRQ, you MUST test both possible actions of the opponent explicitly!'
      }
    ],
    diagrams: [
      {
        id: 'monopoly_deadweight_loss',
        title: 'Monopoly Pricing, Profit, and Deadweight Loss',
        subtitle: 'MR < Demand, Quantity Set at MR = MC, Price Read Up to Demand',
        type: 'monopoly_graph',
        description: 'Graph showing MR curve falling steeper than Demand. Qm chosen where MR=MC, price Pm projected up to Demand curve, creating deadweight loss triangle against competitive Q.',
        takeaway: 'Monopolies restrict quantity and inflate prices above marginal cost, destroying allocative efficiency.'
      }
    ],
    commonTraps: [
      'Reading monopoly price off the $MR$ curve. Monopolies produce where $MR = MC$, but charge the price corresponding to that quantity on the DEMAND curve!',
      'Thinking a Nash equilibrium must maximize joint profits. (Low, Low) is Nash even though (High, High) produces higher combined profits.',
      'Assuming monopolistic competition earns economic profits in the long run. Free entry erodes profits to zero, leaving excess capacity.'
    ],
    cramSheet: [
      'Monopoly: $MR < D$. Produce where $MR = MC$, go UP to Demand curve for Price.',
      'Natural monopoly: Declining $ATC$. Socially optimal price is $P = MC$; Fair-return is $P = ATC$.',
      'Dominant strategy: The best move regardless of what the other player does.',
      'Nash equilibrium: Neither player wants to deviate unilaterally.',
      'Perfect price discrimination: $MR = D$, Consumer Surplus = 0, Deadweight Loss = 0.'
    ]
  },

  // ==========================================
  // UNIT 5: MICRO: FACTOR MARKETS & MONOPSONY
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Micro 5: Factor Markets & Monopsony',
    examWeight: '10%–13% of Micro AP Exam',
    bigIdea: 'Factor markets determine input prices and employment levels. The demand for labor is a derived demand based on marginal revenue product, and monopsonies exert wage-setting power.',
    keyTheorems: [
      {
        name: 'The Profit-Maximizing Resource Hiring Rule ($MRP = MFC$)',
        conditions: 'Firms hiring variable resources (labor) in competitive or non-competitive factor markets.',
        conclusion: 'A firm maximizes profit by employing labor up to the quantity where Marginal Revenue Product equals Marginal Factor Cost ($MRP = MFC$). If $MRP > MFC$, the additional worker adds more to revenue than to cost, so hire them!',
        apTip: 'In a competitive labor market, $MFC$ equals the market wage ($MFC = Wage$). In a monopsony (single employer), $MFC > Wage$ because paying a higher wage to attract another worker raises wages for all existing workers!'
      },
      {
        name: 'The Least-Cost Rule of Resource Combination',
        conditions: 'Firms combining multiple inputs (Labor $L$ and Capital $K$) to produce output.',
        conclusion: 'A firm minimizes total production cost when the marginal product per dollar spent is equalized across all inputs: $\\frac{MP_L}{P_L} = \\frac{MP_K}{P_K}$.',
        apTip: 'If $\\frac{MP_L}{P_L} > \\frac{MP_K}{P_K}$, the firm gets more output per dollar from labor $\\implies$ Hire MORE labor and LESS capital!'
      }
    ],
    formulas: [
      {
        name: 'Marginal Revenue Product (MRP)',
        latex: 'MRP = MP \\times P = \\frac{\\Delta TR}{\\Delta L}',
        explanation: 'Where $MP$ is marginal product of labor and $P$ is product price in a competitive output market.'
      },
      {
        name: 'Least-Cost Input Optimization Rule',
        latex: '\\frac{MP_L}{W} = \\frac{MP_K}{r}',
        explanation: 'Equalizing the ratio of marginal product to input price for labor (wage $W$) and capital (rental rate $r$).'
      }
    ],
    sections: [
      {
        heading: '1. Factor Market Structures: Competitive Labor vs. Monopsony Matrix',
        content: `Comparing hiring behavior and wage determination across labor market structures:

| Feature | Competitive Labor Market | Monopsony (Single Employer) |
| :--- | :--- | :--- |
| **Labor Supply Curve ($S_L$)** | Perfectly elastic horizontal line at market wage ($S_L = MFC = W$) | Upward sloping; firm must raise wages to attract more workers |
| **Marginal Factor Cost ($MFC$)** | Equal to the wage ($MFC = W$) | **Lies ABOVE the Supply of Labor curve** ($MFC > W$) |
| **Hiring Quantity Rule** | Hire where $MRP = W$ | Hire where $MRP = MFC$ (yields $Q_m$) |
| **Wage Paid to Workers** | Set by competitive market ($W_c = MRP$) | Read down from $Q_m$ to the **Supply Curve** ($W_m < MRP$) |
| **Economic Outcome** | Efficient allocation of labor ($W = MRP$) | **Wage exploitation**: Monopsony under-hires and under-pays workers |`
      }
    ,
      {
        heading: '2. Derived Factor Demand, MRP vs. MFC & Monopsony (CED 5.1-5.3)',
        content: `Labor market hiring rules and wage determinations:

* **Derived Demand**: Demand for labor is derived directly from consumer demand for the good that labor produces.
* **Profit-Maximizing Hiring Rule**:
  * Hire additional workers as long as Marginal Revenue Product exceeds or equals Marginal Factor Cost:
    $$MRP \\ge MFC$$
  * In a competitive labor market, $MFC$ is constant and equals the market wage ($MFC = W$).
* **Monopsony (Single Buyer of Labor)**:
  * The monopsonist faces the upward-sloping market labor supply curve, so $MFC > S$ because hiring an additional worker requires raising the wage for ALL previously hired workers!
  * **Monopsony Outcome**: Hires fewer workers and pays a lower wage than a competitive labor market, creating deadweight loss in factor allocation.`
      }
    ],
    workedExamples: [
      {
        title: 'Calculating Optimal Labor Hiring Quantity from Production Data',
        topicRef: 'CED Micro 5.1 Derived Demand & Marginal Revenue Product',
        question: 'A competitive firm sells chairs for $10 each in a competitive product market. The market wage is $50 per day. Number of workers and total chairs produced: 0 workers = 0 chairs; 1 = 8; 2 = 15; 3 = 20; 4 = 23; 5 = 24. How many workers should the firm hire to maximize profit?',
        solutionSteps: [
          'Step 1: Calculate Marginal Product (MP) for each worker: $MP_1 = 8$, $MP_2 = 7$, $MP_3 = 5$, $MP_4 = 3$, $MP_5 = 1$.',
          'Step 2: Calculate Marginal Revenue Product ($MRP = MP \\times P = MP \\times \\$10$): Worker 1: $8 \\times 10 = \\$80$; Worker 2: $7 \\times 10 = \\$70$; Worker 3: $5 \\times 10 = \\$50$; Worker 4: $3 \\times 10 = \\$30$; Worker 5: $1 \\times 10 = \\$10$.',
          'Step 3: Compare $MRP$ to market wage ($W = \\$50$): Worker 1: $\\$80 > \\$50$ (Hire); Worker 2: $\\$70 > \\$50$ (Hire); Worker 3: $\\$50 = \\$50$ (Hire); Worker 4: $\\$30 < \\$50$ (Do NOT hire).',
          'Step 4: Conclude: Firm should hire exactly **3 workers**.'
        ],
        finalAnswer: 'The firm should hire 3 workers, where $MRP = MFC = \\$50$.',
        apScoringTip: 'Always compare $MRP$ directly to $MFC$ (wage). Never stop at Marginal Product alone!'
      }
    ],
    diagrams: [
      {
        id: 'factor_market_graph',
        title: 'Labor Factor Market: Competitive vs. Monopsony Hiring',
        subtitle: 'Marginal Revenue Product (MRP) vs. Marginal Factor Cost (MFC)',
        type: 'factor_market_graph',
        description: 'Two-panel graph comparing horizontal supply of labor in perfect competition against upward-sloping labor supply with steeper MFC in monopsony, showing wage suppression.',
        takeaway: 'Competitive firms pay $W = MRP$; Monopsonies restrict hiring to where $MRP = MFC$ and pay lower wage $W_m$ off the supply curve.'
      }
    ],
    commonTraps: [
      'Confusing product markets with factor markets: In factor markets, INDIVIDUALS supply labor, and FIRMS demand labor!',
      'Reading monopsony wage off the $MRP$ curve. The monopsonist determines hiring quantity where $MRP = MFC$, but pays the wage off the SUPPLY curve ($S_L$)!',
      'Thinking derived demand depends on worker happiness. Derived demand depends entirely on consumer demand for the FINAL PRODUCT the worker produces.'
    ],
    cramSheet: [
      'Derived Demand: Demand for labor comes from demand for the final good.',
      '$MRP = MP \\times P$; Hire where $MRP = MFC$.',
      'Least-cost rule: $\\frac{MP_L}{P_L} = \\frac{MP_K}{P_K}$.',
      'Monopsony: $MFC$ is steeper and above $S_L$. Wage $W_m$ is read off the $S_L$ curve, resulting in $W_m < MRP$.'
    ]
  },

  // ==========================================
  // UNIT 6: MICRO: MARKET FAILURES & ROLE OF GOVERNMENT
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Micro 6: Market Failures, Externalities & Public Goods',
    examWeight: '12%–15% of Micro AP Exam',
    bigIdea: 'Free markets fail when private costs/benefits diverge from social costs/benefits (externalities) or when goods are non-excludable and non-rivalrous (public goods).',
    keyTheorems: [
      {
        name: 'Negative Externalities and Overproduction',
        conditions: 'Production generates uncompensated spillover costs on third parties (e.g. factory toxic smoke).',
        conclusion: 'Marginal Social Cost exceeds Marginal Private Cost ($MSC > MPC$). The unregulated market overproduces ($Q_{mkt} > Q_{opt}$), charging too low a price and creating deadweight loss. Government remedies: Levying a per-unit **Pigouvian Tax** equal to the marginal external cost shifts $MPC$ up to $MSC$.',
        apTip: 'The deadweight loss triangle always points TOWARD the socially optimal quantity ($Q_{opt}$), resembling an arrowhead indicating where the market should move!'
      },
      {
        name: 'Public Goods and the Free-Rider Problem',
        conditions: 'Goods characterized by Non-Excludability (cannot prevent non-payers) and Non-Rivalry (one person\'s consumption does not diminish another\'s).',
        conclusion: 'Because individuals can enjoy public goods without paying (the Free-Rider problem), private markets fail to supply them profitably. Government must finance public goods via taxation up to where $\\text{Marginal Social Benefit} = \\text{Marginal Social Cost}$.',
        apTip: 'Examples: National defense, lighthouses, mosquito abatement, public streetlights.'
      }
    ],
    formulas: [
      {
        name: 'Marginal Social Cost and Benefit Equations',
        latex: 'MSC = MPC + \\text{MEC}, \\quad MSB = MPB + \\text{MEB}',
        explanation: 'Where $MEC$ is marginal external cost (negative externality) and $MEB$ is marginal external benefit (positive externality).'
      },
      {
        name: 'Socially Optimal Output Condition',
        latex: 'MSB = MSC \\implies \\text{Allocative Efficiency (Zero DWL)}',
        explanation: 'The free market achieves efficiency only when external costs and benefits are zero.'
      }
    ],
    sections: [
      {
        heading: '1. Taxonomy of Goods and Market Failures Matrix',
        content: `Classification of economic goods and corrective public policies:

| Good Type | Excludable? | Rival in Consumption? | Classic Examples | Market Failure / Policy Remedy |
| :--- | :--- | :--- | :--- | :--- |
| **Private Goods** | **YES** | **YES** | Pizza, automobiles, clothing | Efficient market allocation; no government failure |
| **Public Goods** | **NO** | **NO** | National defense, lighthouses, streetlights | **Free-Rider problem** $\\implies$ Government tax funding |
| **Common Resources** | **NO** | **YES** | Ocean fisheries, grazing pastures, clean air | **Tragedy of the Commons** $\\implies$ Quotas, property rights |
| **Club / Toll Goods** | **YES** | **NO** | Cable TV, toll bridges, movie cinemas | Natural monopoly $\\implies$ Regulated user fees |
| **Negative Externality** | Spillovers | $MSC > MPC$ | Industrial pollution, second-hand smoke | **Overproduction** $\\implies$ Levy Pigouvian tax |
| **Positive Externality** | Spillovers | $MSB > MPB$ | Vaccinations, education, research | **Underproduction** $\\implies$ Provide per-unit subsidy |`
      }
    ,
      {
        heading: '2. Negative vs. Positive Externalities & Corrective Taxes (CED 6.1-6.4)',
        content: `Market failures, social vs. private costs, and public intervention:

* **Negative Externalities (Spillover Costs)**:
  * Marginal Social Cost exceeds Marginal Private Cost: $MSC > MPC$.
  * Free market overproduces relative to the socially optimal quantity ($Q_{\\text{mkt}} > Q_{\\text{opt}}$).
  * **Correction**: Implement a per-unit **Pigouvian tax equal to marginal external damage**, shifting $MPC$ up to match $MSC$.
* **Positive Externalities (Spillover Benefits)**:
  * Marginal Social Benefit exceeds Marginal Private Benefit: $MSB > MPB$.
  * Free market underproduces ($Q_{\\text{mkt}} < Q_{\\text{opt}}$).
  * **Correction**: Implement a per-unit **Pigouvian subsidy equal to marginal external benefit**, shifting $MPB$ up to match $MSB$.
* **Public Goods**:
  * Non-excludable and non-rival in consumption; suffers from free-rider problem, requiring government financing.`
      }
    ],
    workedExamples: [
      {
        title: 'Determining the Optimal Pigouvian Tax for Negative Externalities',
        topicRef: 'CED Micro 6.2 Externalities & Pigouvian Taxation',
        question: 'A paper mill creates pollution with a marginal external cost of $4 per ream. Market demand is $P = 20 - 0.1Q$ and private marginal cost is $MPC = 4 + 0.1Q$. (a) Find free market equilibrium quantity $Q_{mkt}$. (b) Find socially optimal quantity $Q_{opt}$. (c) State the exact per-unit tax needed to internalize the externality.',
        solutionSteps: [
          'Step 1: Find free market quantity where $MPB = MPC$: $20 - 0.1Q = 4 + 0.1Q \\implies 16 = 0.2Q \\implies Q_{mkt} = 80$.',
          'Step 2: Find Marginal Social Cost: $MSC = MPC + \\text{MEC} = (4 + 0.1Q) + 4 = 8 + 0.1Q$.',
          'Step 3: Find socially optimal quantity where $MSB = MSC$: $20 - 0.1Q = 8 + 0.1Q \\implies 12 = 0.2Q \\implies Q_{opt} = 60$.',
          'Step 4: Notice that the unregulated market overproduces: $80 > 60$.',
          'Step 5: Determine required tax: The government must levy a per-unit Pigouvian Tax equal to the marginal external cost: **$4 per unit**.'
        ],
        finalAnswer: '(a) Qmkt = 80. (b) Qopt = 60. (c) Per-unit tax = $4.',
        apScoringTip: 'The Pigouvian tax MUST equal the vertical distance between MSC and MPC at the socially optimal quantity!'
      }
    ],
    diagrams: [
      {
        id: 'externality_graph',
        title: 'Negative Externality: Marginal Social Cost vs. Private Cost',
        subtitle: 'Overproduction in Free Markets and Pigouvian Tax Solution',
        type: 'externality_graph',
        description: 'Graph showing MSC curve above MPC, MSB curve, free market output Qmkt, socially optimal output Qopt, and the deadweight loss triangle pointing toward Qopt.',
        takeaway: 'Unregulated markets overproduce goods with negative externalities; a per-unit tax equal to marginal external cost restores allocative efficiency.'
      }
    ],
    commonTraps: [
      'Confusing the deadweight loss direction: The DWL triangle ALWAYS points at the socially optimal output ($Q_{opt}$).',
      'Calling public schooling a "pure public good." Education is partially excludable; it is a private good with massive POSITIVE EXTERNALITIES.',
      'Assuming positive externalities don\'t have deadweight loss. Positive externalities cause under-production, which ALSO creates deadweight loss!'
    ],
    cramSheet: [
      'Negative externality: $MSC > MPC$. Free market OVERPRODUCES. Fix with Pigouvian Tax.',
      'Positive externality: $MSB > MPB$. Free market UNDERPRODUCES. Fix with Per-Unit Subsidy.',
      'Public goods: Non-rival and Non-excludable (Free-Rider problem).',
      'Common resources: Non-excludable and Rival (Tragedy of the Commons).',
      'DWL triangle points like an arrowhead toward the socially optimal quantity ($Q_{opt}$).'
    ]
  },

  // ==========================================
  // UNIT 7: MACRO: ECONOMIC INDICATORS, GDP & INFLATION
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Macro 1: Economic Indicators (GDP, Unemployment & Inflation)',
    examWeight: '12%–16% of Macro AP Exam',
    bigIdea: 'National economic performance is quantified using Gross Domestic Product (GDP), unemployment metrics, and price level indices (CPI/GDP Deflator).',
    keyTheorems: [
      {
        name: 'Gross Domestic Product Inclusions and Exclusions',
        conditions: 'Measuring total market value of final goods/services produced domestically in one year.',
        conclusion: 'Expenditure approach: $GDP = C + I + G + (X - M)$. GDP excludes: (1) Intermediate goods (avoids double counting), (2) Used/secondhand goods, (3) Purely financial transactions (stocks/bonds), (4) Government transfer payments (welfare/Social Security), and (5) Non-market/illegal activities.',
        apTip: 'Transfer payments are NOT part of GDP because no current good or service is produced in exchange. When recipients spend that money, it enters GDP under Consumer Spending ($C$).'
      },
      {
        name: 'Nominal vs. Real GDP and the GDP Deflator',
        conditions: 'Distinguishing economic output growth from price level inflation.',
        conclusion: 'Nominal GDP measures output using current prices; Real GDP measures output using constant base-year prices. Only Real GDP reflects actual physical production growth.',
        apTip: 'If Nominal GDP grew by 5% and the GDP Deflator grew by 3%, Real GDP grew by approximately $5\\% - 3\\% = 2\\%$.'
      }
    ],
    formulas: [
      {
        name: 'GDP Expenditure Equation',
        latex: 'GDP = C + I + G + X_n \\quad (X_n = \\text{Exports} - \\text{Imports})',
        explanation: 'C = Consumer spending, I = Business investment, G = Government spending, Xn = Net exports.'
      },
      {
        name: 'Unemployment Rate Formula',
        latex: '\\text{Unemployment Rate} = \\frac{\\text{Unemployed}}{\\text{Labor Force}} \\times 100',
        explanation: 'Labor force includes only those working or actively seeking work. Discouraged workers are excluded.'
      },
      {
        name: 'Consumer Price Index (CPI) and Inflation Rate',
        latex: '\\text{CPI} = \\frac{\\text{Cost of Market Basket in Current Year}}{\\text{Cost of Market Basket in Base Year}} \\times 100',
        explanation: '$\\text{Inflation Rate} = \\frac{\\text{CPI}_2 - \\text{CPI}_1}{\\text{CPI}_1} \\times 100$.'
      }
    ],
    sections: [
      {
        heading: '1. The Three Types of Unemployment Matrix',
        content: `Classification of unemployment:

| Unemployment Type | Underlying Cause | Economic Remedy | Is it part of the Natural Rate? |
| :--- | :--- | :--- | :--- |
| **Frictional** | Voluntary job transitions, recent college graduates seeking employment | Improved job boards, career counseling | **YES** (Healthy, temporary) |
| **Structural** | Mismatch between worker skills and market needs (automation, globalization) | Job retraining programs, education subsidies | **YES** (Permanent skill shifts) |
| **Cyclical** | Inadequate aggregate demand during economic downturns (recession) | Expansionary fiscal and monetary stimulus | **NO** (Zero at full employment) |`
      }
    ,
      {
        heading: '2. Real vs. Nominal GDP, Deflator & Inflation Rates (CED 1.3-1.6)',
        content: `Measuring national output and the general price level:

* **Nominal GDP vs. Real GDP**:
  * **Nominal GDP**: Total value of final goods/services evaluated at **current-year prices**.
  * **Real GDP**: Total value evaluated at **constant base-year prices**, isolating genuine physical output changes from inflation.
* **GDP Deflator vs. Consumer Price Index (CPI)**:
  $$\\text{GDP Deflator} = \\left(\\frac{\\text{Nominal GDP}}{\\text{Real GDP}}\\right) \\times 100$$
  * GDP Deflator reflects prices of all domestically produced goods and services.
  * CPI reflects prices of a fixed market basket of consumer goods purchased by urban households.
* **Real Interest Rate (Fisher Equation)**:
  $$\\text{Real Interest Rate} = \\text{Nominal Interest Rate} - \\text{Inflation Rate}$$
  * Unanticipated inflation hurts lenders and savers (repaid with dollars of reduced purchasing power) and benefits fixed-rate borrowers!`
      }
    ],
    workedExamples: [
      {
        title: 'Calculating Real Interest Rate and Inflation Winners/Losers',
        topicRef: 'CED Macro 2.6 Real vs. Nominal Interest Rates',
        question: 'A bank issues a 30-year mortgage at a fixed nominal interest rate of 6%. The bank expected inflation to be 2%. However, unexpected inflation surges to 5%. Calculate: (a) Expected real interest rate, (b) Actual real interest rate, and (c) State whether the borrower or the lender is helped by the unexpected inflation.',
        solutionSteps: [
          'Step 1: Apply Fisher Equation: $\\text{Real Interest Rate} = \\text{Nominal Rate} - \\text{Inflation Rate}$.',
          'Step 2: Calculate expected real rate: $r_e = 6\\% - 2\\% = 4\\%$.',
          'Step 3: Calculate actual real rate: $r_a = 6\\% - 5\\% = 1\\%$.',
          'Step 4: Determine winner and loser: The borrower pays back the loan with inflated, less valuable dollars. The real return earned by the bank dropped from 4% down to 1%.',
          'Step 5: Conclude: Unexpected inflation **benefits the borrower** and **harms the lender**.'
        ],
        finalAnswer: '(a) Expected real rate = 4%. (b) Actual real rate = 1%. (c) The borrower is helped; the lender is hurt.',
        apScoringTip: 'Remember: Unexpected inflation HELPS borrowers and HURTS lenders (and savers with fixed interest).'
      }
    ],
    diagrams: [
      {
        id: 'macro_business_cycle',
        title: 'The Macroeconomic Business Cycle Waveform',
        subtitle: 'Peak, Contraction (Recession), Trough, Expansion & Trend Line',
        type: 'business_cycle_chart',
        description: 'Oscillating wave around an upward-sloping long-run potential GDP trend line, showing cyclical unemployment during troughs and inflationary gaps at peaks.',
        takeaway: 'Actual GDP fluctuates above and below potential GDP; full employment occurs where the economy intersects the trend line.'
      }
    ],
    commonTraps: [
      'Counting discouraged workers as unemployed. If a person stops looking for work, they leave the labor force entirely, causing the official unemployment rate to ARTIFICIALLY DROP!',
      'Counting used cars or older homes in GDP. Only NEW goods produced in the current year count.',
      'Confusing the CPI with the GDP Deflator. CPI measures consumer market baskets (includes imports); GDP Deflator measures all domestic production (excludes foreign imports).'
    ],
    cramSheet: [
      'GDP formula: $C + I + G + (X - M)$. Excludes used goods, transfers, and intermediate goods.',
      'Natural Rate of Unemployment (NRU) = Frictional + Structural. Cyclical is ZERO at full employment.',
      'Fisher Equation: $\\text{Real Interest Rate} = \\text{Nominal Interest Rate} - \\text{Inflation Rate}$.',
      'Unexpected inflation hurts lenders and savers; helps borrowers with fixed-rate debt.'
    ]
  },

  // ==========================================
  // UNIT 8: MACRO: AD-AS MODEL & FISCAL POLICY
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Macro 2: AD-AS Model & Fiscal Policy',
    examWeight: '12%–16% of Macro AP Exam',
    bigIdea: 'The Aggregate Demand–Aggregate Supply (AD-AS) model illustrates macroeconomic equilibrium, recessionary/inflationary gaps, and fiscal policy multipliers.',
    keyTheorems: [
      {
        name: 'The Long-Run Self-Correction Mechanism',
        conditions: 'An economy operating in a recessionary or inflationary gap without government intervention.',
        conclusion: 'In a recessionary gap ($Y < Y_f$), high unemployment forces nominal wages to fall in the long run. Lower resource costs cause Short-Run Aggregate Supply to shift RIGHT ($SRAS \\rightarrow$), restoring full employment $Y_f$ at a lower price level. In an inflationary gap ($Y > Y_f$), wages rise, shifting $SRAS$ LEFT, restoring $Y_f$ at a higher price level.',
        apTip: 'Wages and input prices are STICKY in the short run, but FLEXIBLE in the long run. The Long-Run Aggregate Supply ($LRAS$) curve is vertical at potential output $Y_f$.'
      },
      {
        name: 'Spending Multiplier vs. Tax Multiplier',
        conditions: 'Discretionary fiscal policy implemented by Congress/President.',
        conclusion: 'The Spending Multiplier ($1 / MPS$) is always larger in absolute magnitude than the Tax Multiplier ($-MPC / MPS$). Initial government spending directly injects 100% of funds into aggregate demand, whereas a tax cut is partially saved by consumers according to their Marginal Propensity to Save ($MPS$).',
        apTip: 'Balanced Budget Multiplier is always equal to 1! If government increases spending and taxes by the exact same amount $\\Delta G = \\Delta T$, real GDP increases by exactly $\\Delta G$.'
      }
    ],
    formulas: [
      {
        name: 'Marginal Propensities and Multipliers',
        latex: 'MPC + MPS = 1, \\quad \\text{Spending Multiplier} = \\frac{1}{MPS}, \\quad \\text{Tax Multiplier} = -\\frac{MPC}{MPS}',
        explanation: '$\\Delta GDP = \\Delta G \\times \\text{Spending Multiplier}$.'
      },
      {
        name: 'Total Output Change Equation',
        latex: '\\Delta Y = \\Delta G \\left( \\frac{1}{1 - MPC} \\right) = -\\Delta T \\left( \\frac{MPC}{1 - MPC} \\right)',
        explanation: 'Shows impact of government purchases versus tax adjustments.'
      }
    ],
    sections: [
      {
        heading: '1. Macroeconomic Gaps and Fiscal Policy Countermeasures',
        content: `Diagnosis and policy matrix:

| Economic Condition | Output Gap | Price Level Pressure | Fiscal Policy Direction | Specific Policy Actions |
| :--- | :--- | :--- | :--- | :--- |
| **Recessionary Gap** | $Y < Y_f$ (Cyclical unemployment $> 0$) | Deflationary / Disinflation | **Expansionary Fiscal Policy** | $\\uparrow$ Government spending ($G$), $\\downarrow$ Taxes ($T$) |
| **Inflationary Gap** | $Y > Y_f$ (Overheating, tight labor) | Inflationary ($P \\uparrow$) | **Contractionary Fiscal Policy** | $\\downarrow$ Government spending ($G$), $\\uparrow$ Taxes ($T$) |
| **Stagflation** | $Y < Y_f$ and $P \\uparrow$ (Negative supply shock) | High inflation + recession | Supply-side deregulation | Subsidies for inputs; tricky for monetary/fiscal policy |`
      }
    ,
      {
        heading: '2. AD-AS Macroeconomic Equilibrium Gaps & Multipliers (CED 2.3-2.6)',
        content: `Aggregate Demand, Aggregate Supply, and fiscal stabilization:

* **Macroeconomic Output Gaps**:
  * **Recessionary Gap**: Current output is below full employment ($Y < Y_f$), with cyclical unemployment and downward pressure on price levels.
  * **Inflationary Gap**: Current output exceeds full employment capacity ($Y > Y_f$), with low unemployment and upward inflationary pressure.
* **Fiscal Multipliers**:
  $$\\text{Spending Multiplier } (k_s) = \\frac{1}{1 - MPC} = \\frac{1}{MPS}$$
  $$\\text{Tax Multiplier } (k_t) = -\\frac{MPC}{MPS} = -\\frac{MPC}{1 - MPC}$$
  * The spending multiplier is ALWAYS larger in magnitude than the tax multiplier by exactly $1$, because initial government spending directly stimulates aggregate demand, whereas tax cuts are partially leaked into household savings ($MPS$)!
* **Automatic Stabilizers**:
  * Progressive income taxes and unemployment benefits that automatically cushion GDP fluctuations without legislative delay.`
      }
    ],
    workedExamples: [
      {
        title: 'Calculating Required Fiscal Stimulus to Close a Recessionary Gap',
        topicRef: 'CED Macro 3.8 Fiscal Policy Multipliers',
        question: 'An economy has a recessionary gap of $400 billion. The marginal propensity to consume ($MPC$) is 0.8. Calculate: (a) The spending multiplier, (b) The minimum change in government spending ($G$) needed to close the gap, and (c) The change in taxes ($T$) needed if tax cuts were used instead.',
        solutionSteps: [
          'Step 1: Calculate $MPS$: $MPS = 1 - MPC = 1 - 0.8 = 0.2$.',
          'Step 2: Calculate Spending Multiplier: $M_s = \\frac{1}{MPS} = \\frac{1}{0.2} = 5$.',
          'Step 3: Calculate required $\\Delta G$: $\\Delta Y = \\Delta G \\times M_s \\implies 400 = \\Delta G \\times 5 \\implies \\Delta G = +\\$80\\text{ billion}$.',
          'Step 4: Calculate Tax Multiplier: $M_t = -\\frac{MPC}{MPS} = -\\frac{0.8}{0.2} = -4$.',
          'Step 5: Calculate required $\\Delta T$: $\\Delta Y = \\Delta T \\times M_t \\implies 400 = \\Delta T \\times (-4) \\implies \\Delta T = -\\$100\\text{ billion}$.'
        ],
        finalAnswer: '(a) Spending multiplier = 5. (b) Increase government spending by $80 billion. (c) Decrease taxes by $100 billion.',
        apScoringTip: 'Notice that tax cuts require a LARGER dollar amount ($100B vs $80B) because part of the tax cut is saved ($20B) rather than spent.'
      }
    ],
    diagrams: [
      {
        id: 'ad_as_recessionary_gap',
        title: 'AD-AS Graph: Recessionary Gap and Self-Correction',
        subtitle: 'Equilibrium Below Full Employment and Long-Run SRAS Right Shift',
        type: 'ad_as_graph',
        description: 'Macro AD-AS graph with vertical LRAS line at Yf. Intersection of AD and SRAS sits to the left of LRAS, showing the recessionary gap.',
        takeaway: 'In the long run, falling wages shift SRAS right, restoring potential GDP without government intervention.'
      }
    ],
    commonTraps: [
      'Assuming the spending multiplier and tax multiplier are equal. The spending multiplier is always 1 unit larger than the tax multiplier magnitude.',
      'Shifting $LRAS$ when aggregate demand increases. Shifts in $AD$ only change short-run output; $LRAS$ moves ONLY when productive capacity changes (capital stock, tech, human capital).',
      'Confusing a government budget deficit (annual shortfall of tax revenues vs spending) with the national debt (accumulation of all past deficits).'
    ],
    cramSheet: [
      '$MPC + MPS = 1$; Spending Multiplier = $1 / MPS$; Tax Multiplier = $-MPC / MPS$.',
      'Recessionary Gap: $Y < Y_f$. Fix with $\\uparrow G$ or $\\downarrow T$.',
      'Inflationary Gap: $Y > Y_f$. Fix with $\\downarrow G$ or $\\uparrow T$.',
      'Long-run self-correction: Nominal wages adjust, shifting $SRAS$ to restore $Y_f$.',
      'Balanced budget multiplier = 1.'
    ]
  },

  // ==========================================
  // UNIT 9: MACRO: FINANCIAL SECTOR & MONETARY POLICY
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Macro 3: Financial Sector, Money Market & Monetary Policy',
    examWeight: '15%–20% of Macro AP Exam',
    bigIdea: 'Central banks control the money supply and interest rates through monetary tools, impacting investment, aggregate demand, and the money market.',
    keyTheorems: [
      {
        name: 'Fractional Reserve Banking and the Money Multiplier',
        conditions: 'Commercial bank balance sheets (T-Accounts) and reserve requirements.',
        conclusion: 'Banks hold a fraction of demand deposits as Required Reserves ($RR = \\text{Deposit} \\times rr$) and loan out Excess Reserves ($ER$). The Simple Money Multiplier equals $1 / rr$. Maximum potential money creation equals $\\text{Excess Reserves} \\times \\text{Money Multiplier}$.',
        apTip: 'If a customer deposits $1,000 in cash into a bank, the IMMEDIATE money supply ($M1$) DOES NOT CHANGE! Cash in circulation drops by $1,000, and demand deposits rise by $1,000.'
      },
      {
        name: 'The Transmission Mechanism of Monetary Policy',
        conditions: 'Central Bank adjusting policy tools (e.g. Open Market Operations, Administered Rates).',
        conclusion: 'Expansionary Policy: Fed buys bonds $\\implies$ Bank reserves $\\uparrow$ $\\implies$ Nominal Interest Rates $\\downarrow$ $\\implies$ Investment & Interest-sensitive Consumption $\\uparrow$ $\\implies$ Aggregate Demand shifts RIGHT ($AD \\uparrow$) $\\implies$ Real GDP ($Y$) and Price Level ($PL$) increase.',
        apTip: 'Remember the acronym: Buy Big = Buy bonds, bigger money supply. Sell Small = Sell bonds, smaller money supply.'
      }
    ],
    formulas: [
      {
        name: 'Money Multiplier and Maximum Expansion',
        latex: '\\text{Money Multiplier} = \\frac{1}{rr}, \\quad \\Delta M1_{\\max} = \\text{Excess Reserves} \\times \\frac{1}{rr}',
        explanation: 'Where $rr$ is the reserve requirement ratio set by the central bank.'
      },
      {
        name: 'Bond Price and Interest Rate Inverse Relationship',
        latex: 'P_{\\text{bond}} \\propto \\frac{1}{\\text{Nominal Interest Rate}}',
        explanation: 'When interest rates rise, existing bond prices fall, and vice versa.'
      }
    ],
    sections: [
      {
        heading: '1. Central Bank Monetary Policy Toolkit Matrix',
        content: `Tools for expansionary vs. contractionary policy:

| Policy Tool | Expansionary Action (Fight Recession) | Contractionary Action (Fight Inflation) | Impact on Money Supply / Reserves |
| :--- | :--- | :--- | :--- |
| **Open Market Operations (OMO)** | **Buy Treasury Bonds** ("Buy = Bigger") | **Sell Treasury Bonds** ("Sell = Smaller") | Directly injects / drains reserves into banking system |
| **Discount Rate** | Lower the discount rate | Raise the discount rate | Lowers / raises cost of borrowing from the Fed |
| **Reserve Requirement ($rr$)** | Decrease reserve ratio | Increase reserve ratio | Frees up excess reserves / locks up lending |
| **Administered Rates (IORB)** | Lower Interest on Reserve Balances | Raise Interest on Reserve Balances | Primary modern tool controlling the policy rate |`
      }
    ,
      {
        heading: '2. Money Market vs. Loanable Funds & Central Bank Toolkit (CED 3.3-3.6)',
        content: `The financial sector, interest rate determination, and monetary policy transmission:

* **Money Market vs. Loanable Funds Market**:
  * **Money Market**: Determines the **nominal interest rate** ($i$) via money demand and fixed vertical money supply ($MS$) set by the central bank.
  * **Loanable Funds Market**: Determines the **real interest rate** ($r$) via national savings (supply) and private investment borrowing (demand).
* **Central Bank Modern Policy Toolkit**:
  * **Administered Rates Regime**: Sets the Policy Rate primarily by adjusting the **Interest on Reserve Balances (IORB)** rate and the Discount Rate.
  * Raising IORB incentivizes banks to hold reserves, raising the federal funds rate, decreasing investment ($I$) and shifting $AD$ left.
* **Fractional Reserve Banking Balance Sheets**:
  $$\\text{Money Multiplier} = \\frac{1}{\\text{Reserve Ratio } (rr)}$$
  $$\\text{Max Deposit Expansion} = \\text{Excess Reserves} \\times \\left(\\frac{1}{rr}\\right)$$`
      }
    ],
    workedExamples: [
      {
        title: 'T-Account Balance Sheet Analysis and Money Creation',
        topicRef: 'CED Macro 4.4 Banking and the Expansion of the Money Supply',
        question: 'First National Bank has $100,000 in demand deposits, $10,000 in required reserves, and $15,000 in excess reserves. The reserve requirement is 10%. (a) If Jane deposits $5,000 cash into her checking account, how much does the bank’s required reserves increase? (b) What is the maximum amount the bank can initially lend from Jane’s deposit? (c) What is the maximum possible expansion of the money supply throughout the entire banking system from this initial $5,000 deposit?',
        solutionSteps: [
          'Step 1: Required reserves on new deposit: $5,000 \\times 10\\% = \\$500$.',
          'Step 2: Initial lending by First National: The remainder is excess reserves: $\\$5,000 - \\$500 = \\$4,500$. First National can lend up to $4,500.',
          'Step 3: Calculate money multiplier: $M = \\frac{1}{rr} = \\frac{1}{0.10} = 10$.',
          'Step 4: System-wide expansion: Maximum money creation $= \\text{New Excess Reserves} \\times M = \\$4,500 \\times 10 = \\$45,000$.'
        ],
        finalAnswer: '(a) Required reserves increase by $500. (b) Bank can initially lend $4,500. (c) Maximum system-wide money creation = $45,000.',
        apScoringTip: 'Be careful! The cash deposit of $5,000 was already part of M1. The new money created is strictly the loans generated ($45,000).'
      }
    ],
    diagrams: [
      {
        id: 'money_market_interest_rates',
        title: 'The Money Market and Investment Demand Curves',
        subtitle: 'Vertical Money Supply ($M_s$) and Downward Sloping Money Demand ($M_d$)',
        type: 'money_market_graph',
        description: 'Side-by-side graph: Money market on left showing vertical MS shifting right, lowering nominal interest rate; right graph showing lower interest rate boosting investment demand.',
        takeaway: 'Central banks control money supply directly; shifting MS changes nominal interest rates and stimulates investment.'
      }
    ],
    commonTraps: [
      'Confusing the money market graph (nominal interest rate, vertical money supply) with the loanable funds graph (real interest rate, upward sloping supply of private savings).',
      'Forgetting that bond prices and interest rates move in OPPOSITE directions.',
      'Thinking a deposit increases the total money supply by the deposit amount. Currency in circulation drops by the exact same amount!'
    ],
    cramSheet: [
      'Money multiplier: $1 / rr$. Maximum creation = Excess Reserves $\\times (1 / rr)$.',
      'Fed buys bonds $\\implies$ Bank reserves $\\uparrow$ $\\implies$ Interest rate $\\downarrow$ $\\implies$ $AD \\uparrow$.',
      'Bond prices and interest rates move in OPPOSITE directions.',
      'Money market: Nominal interest rate on vertical axis, vertical $M_s$.',
      'Loanable funds market: Real interest rate on vertical axis, upward-sloping supply of savings.'
    ]
  },

  // ==========================================
  // UNIT 10: MACRO: LONG-RUN STABILIZATION, PHILLIPS CURVE & LOANABLE FUNDS
  // ==========================================
  {
    unitId: 'u10',
    unitNumber: 10,
    title: 'Macro 4: Long-Run Consequences, Phillips Curve & Crowding Out',
    examWeight: '12%–15% of Macro AP Exam',
    bigIdea: 'Stabilization policies create long-run consequences. Deficit-financed fiscal policy triggers crowding out in loanable funds, while the Phillips Curve models the short-run vs. long-run inflation-unemployment trade-off.',
    keyTheorems: [
      {
        name: 'The Phillips Curve Relationship (SRPC vs. LRPC)',
        conditions: 'Macroeconomic equilibrium and aggregate demand/supply shocks.',
        conclusion: 'The Short-Run Phillips Curve (SRPC) illustrates an inverse relationship between inflation and unemployment. A shift in $AD$ causes a MOVEMENT ALONG the $SRPC$. A shift in $SRAS$ (e.g. supply shock) SHIFTS the entire $SRPC$ in the opposite direction. In the long run, expected inflation equals actual inflation, making the Long-Run Phillips Curve (LRPC) vertical at the Natural Rate of Unemployment (NRU).',
        apTip: 'If AD increases: Real GDP $\\uparrow$, Unemployment $\\downarrow$, Price Level $\\uparrow \\implies$ MOVEMENT UP AND LEFT along the existing SRPC!'
      },
      {
        name: 'The Crowding-Out Effect in the Loanable Funds Market',
        conditions: 'Government runs a budget deficit financed by borrowing.',
        conclusion: 'When the government borrows to fund deficit spending, demand for loanable funds shifts right ($D_{LF} \\rightarrow$). This drives up the REAL interest rate ($r \\uparrow$). Higher real interest rates crowd out private business capital investment ($I \\downarrow$) and interest-sensitive consumption ($C \\downarrow$), weakening long-run economic growth.',
        apTip: 'Loanable Funds Graph: Vertical axis is the REAL Interest Rate (not nominal!); horizontal axis is Quantity of Loanable Funds.'
      }
    ],
    formulas: [
      {
        name: 'Quantity Theory of Money Equation',
        latex: 'M \\times V = P \\times Y',
        explanation: 'Where $M$ is money supply, $V$ is velocity of money, $P$ is price level, and $Y$ is real GDP. In the long run with constant $V$ and $Y$, $\%\\Delta M = \\%\\Delta P$ (Inflation).'
      },
      {
        name: 'Real Interest Rate in Loanable Funds Equilibrium',
        latex: 'S_{\\text{private}} + (T - G) + (M - X) = I',
        explanation: 'National savings equals national investment in closed economy.'
      }
    ],
    sections: [
      {
        heading: '1. Phillips Curve Movements vs. Shifts & Crowding Out Matrix',
        content: `Diagnostic matrix for Phillips Curve and Loanable Funds FRQ questions:

| Economic Event | AD / AS Impact | Movement or Shift on SRPC? | Loanable Funds Impact | Long-Run Capital Stock & Growth |
| :--- | :--- | :--- | :--- | :--- |
| **Expansionary Fiscal Policy ($G \\uparrow$)** | $AD$ shifts Right | **Movement UP and LEFT** along SRPC (Higher $\\pi$, Lower $u$) | $D_{LF}$ shifts Right $\\implies$ **Real $r \\uparrow$** | **Crowding Out**: Lower investment slows capital formation |
| **Contractionary Monetary Policy** | $AD$ shifts Left | **Movement DOWN and RIGHT** along SRPC (Lower $\\pi$, Higher $u$) | Supply of LF shifts Left $\\implies$ Real $r \\uparrow$ | Slows short-run investment; restores price stability |
| **Negative Supply Shock (Oil Spike)** | $SRAS$ shifts Left (Stagflation) | **ENTIRE SRPC SHIFTS RIGHT / OUTWARD** (Higher $\\pi$ AND Higher $u$) | Ambiguous | Negative supply shock lowers output and capital utilization |
| **Positive Productivity Shock (Tech)** | $SRAS$ & $LRAS$ shift Right | **ENTIRE SRPC SHIFTS LEFT / INWARD** (Lower $\\pi$ AND Lower $u$) | Increases savings $\\implies$ Real $r \\downarrow$ | **Outward shift in LRAS** and sustained economic growth |`
      }
    ,
      {
        heading: '2. Short-Run vs. Long-Run Phillips Curve & Crowding Out (CED 4.2-4.5)',
        content: `Inflation-unemployment trade-offs and government borrowing consequences:

* **The Phillips Curve Model**:
  * **Short-Run Phillips Curve (SRPC)**: Displays an inverse relationship between inflation and unemployment.
  * **Long-Run Phillips Curve (LRPC)**: Vertical at the Natural Rate of Unemployment (NRU).
  * **Movements vs. Shifts**:
    * A shift in Aggregate Demand ($AD$) causes a **movement along** the existing SRPC.
    * A shift in Aggregate Supply ($AS$) causes the **entire SRPC to shift in the opposite direction** (e.g. negative supply shock shifts SRPC outward to the right, causing stagflation!).
* **The Crowding-Out Effect**:
  $$\\text{Deficit Spending} \\rightarrow \\text{Government Borrows} \\rightarrow \\text{Demand for Loanable Funds } \\uparrow \\rightarrow \\text{Real Interest Rate } \\uparrow \\rightarrow \\text{Private Investment } \\downarrow$$
  * Crowded-out private capital investment reduces long-run economic growth and slows rightward shifts of the LRAS curve!`
      }
    ],
    workedExamples: [
      {
        title: 'Tracing Government Deficits to Loanable Funds and Economic Growth',
        topicRef: 'CED Macro 5.4 Crowding Out & Long-Run Economic Growth',
        question: 'The government increases spending on infrastructure without raising taxes, running a deficit. Explain the effect on: (a) Real interest rate in the loanable funds market, (b) Private business investment in physical capital, and (c) Long-run economic growth.',
        solutionSteps: [
          'Step 1: Loanable funds effect: To finance the deficit, the government issues Treasury bonds, increasing borrowing. Demand for loanable funds shifts RIGHT $\\implies$ **Real interest rate increases** ($r \\uparrow$).',
          'Step 2: Private investment effect: Higher borrowing costs make capital investments less profitable. Private business spending on machinery, tools, and factories decreases ($I \\downarrow$) $\\implies$ **Crowding Out occurs**.',
          'Step 3: Long-run economic growth effect: Slower accumulation of capital stock reduces future worker productivity $\\implies$ **Long-run economic growth rate slows** (LRAS shifts right at a slower rate).'
        ],
        finalAnswer: '(a) Real interest rate rises. (b) Private business investment falls (crowding out). (c) Long-run economic growth slows.',
        apScoringTip: 'Connect the chain of logic completely: Deficit $\\rightarrow$ Demand for Loanable Funds up $\\rightarrow$ Real interest rate up $\\rightarrow$ Investment down $\\rightarrow$ Capital stock growth slows.'
      }
    ],
    diagrams: [
      {
        id: 'phillips_curve_graph',
        title: 'The Phillips Curve: Short-Run Trade-off vs. Long-Run NRU',
        subtitle: 'SRPC Downward Slope vs. Vertical LRPC at Natural Rate of Unemployment',
        type: 'phillips_curve_graph',
        description: 'Graph showing downward-sloping SRPC curve intersecting vertical LRPC at the natural rate of unemployment, with stagflation shifting SRPC upward.',
        takeaway: 'AD changes move along SRPC; SRAS supply shocks shift the entire SRPC; LRPC is vertical in the long run.'
      }
    ],
    commonTraps: [
      'Confusing the Money Market (nominal interest rate) with the Loanable Funds Market (real interest rate).',
      'Shifting the LRPC when AD changes. Shifts in AD only move ALONG the SRPC; LRPC moves ONLY if the Natural Rate of Unemployment changes!',
      'Thinking inflation and unemployment always move in opposite directions. During Stagflation (supply shock), both rise together because SRPC shifts outward.'
    ],
    cramSheet: [
      'AD shift $\\implies$ Movement along SRPC. SRAS shift $\\implies$ Shift of the entire SRPC.',
      'LRPC is vertical at the Natural Rate of Unemployment (NRU).',
      'Government deficit $\\implies$ $D_{LF}$ shifts right $\\implies$ Real interest rate rises $\\implies$ Private investment is crowded out.',
      'Quantity Theory of Money: $M \\times V = P \\times Y$. High money growth causes high inflation.'
    ]
  },

  // ==========================================
  // UNIT 11: MACRO: OPEN ECONOMY, BALANCE OF PAYMENTS & FOREX
  // ==========================================
  {
    unitId: 'u11',
    unitNumber: 11,
    title: 'Macro 5: Open Economy, Balance of Payments & FOREX Market',
    examWeight: '10%–13% of Macro AP Exam',
    bigIdea: 'International trade and capital flows link nations through the Balance of Payments and the Foreign Exchange (FOREX) market, where currency values fluctuate based on relative interest rates, price levels, and incomes.',
    keyTheorems: [
      {
        name: 'The Balance of Payments Identity',
        conditions: 'Accounting for all international financial and trade transactions.',
        conclusion: '$\\text{Current Account (CA)} + \\text{Financial Account (FA)} = 0$. The Current Account tracks trade in goods/services, net investment income, and net unilateral transfers. The Financial/Capital Account tracks purchases and sales of financial assets (stocks, bonds, real estate). A deficit in one must be balanced by a surplus in the other.',
        apTip: 'If foreigners buy more US Treasury bonds, the US Financial Account goes into SURPLUS, which pushes the US Current Account (trade balance) into DEFICIT!'
      },
      {
        name: 'FOREX Currency Appreciation vs. Depreciation and Net Exports',
        conditions: 'Floating exchange rate markets determined by international currency supply and demand.',
        conclusion: 'When a currency **Appreciates** (gains value), domestic exports become relatively more expensive for foreigners, and foreign imports become cheaper for locals $\\implies$ Net Exports decrease ($X_n \\downarrow$), shifting Aggregate Demand LEFT ($AD \\downarrow$). When a currency **Depreciates** (loses value), exports become cheaper $\\implies$ Net Exports increase ($X_n \\uparrow$), shifting $AD$ RIGHT.',
        apTip: 'Higher domestic real interest rates attract foreign financial investors seeking higher returns. Foreigners demand domestic currency to buy domestic bonds $\\implies$ Domestic currency APPRECIATES!'
      }
    ],
    formulas: [
      {
        name: 'Balance of Payments Identity',
        latex: '\\text{Current Account} + \\text{Financial Account} = 0',
        explanation: 'Trade balance and net financial capital flows must mirror each other.'
      },
      {
        name: 'Exchange Rate and Net Exports Linkage',
        latex: '\\text{Currency Appreciates} \\implies \\text{Exports } \\downarrow, \\; \\text{Imports } \\uparrow \\implies X_n \\downarrow \\implies AD \\downarrow',
        explanation: 'Appreciation makes domestic goods expensive abroad, dampening net exports.'
      }
    ],
    sections: [
      {
        heading: '1. FOREX Determinants of Currency Appreciation vs. Depreciation Matrix',
        content: `What drives exchange rates and their domestic macroeconomic impact:

| Economic Driver | Shift in FOREX Market for US Dollar ($) | Impact on Value of Dollar | Impact on US Net Exports ($X_n$) | Impact on US Real GDP ($AD$) |
| :--- | :--- | :--- | :--- | :--- |
| **Higher US Real Interest Rates** | Demand for USD shifts Right ($D_{\\text{USD}} \\rightarrow$) as foreigners seek higher bond yields | **Appreciates** ($e \\uparrow$) | **Decreases** ($X_n \\downarrow$) (US goods become expensive) | $AD$ shifts Left ($AD \\downarrow$) |
| **Lower US Price Level (Lower Inflation)** | Foreigners buy more US goods $\\implies D_{\\text{USD}} \\rightarrow$; Americans buy fewer imports $\\implies S_{\\text{USD}} \\leftarrow$ | **Appreciates** ($e \\uparrow$) | **Increases** ($X_n \\uparrow$) | $AD$ shifts Right ($AD \\uparrow$) |
| **Rapid Foreign Economic Growth (Europe)** | Europeans have more disposable income to purchase US exports $\\implies D_{\\text{USD}} \\rightarrow$ | **Appreciates** ($e \\uparrow$) | **Increases** ($X_n \\uparrow$) | $AD$ shifts Right ($AD \\uparrow$) |
| **Higher US National Income** | Americans spend more on European imports $\\implies S_{\\text{USD}} \\rightarrow$ | **Depreciates** ($e \\downarrow$) | **Decreases** ($X_n \\downarrow$) | $AD$ dampens |
| **Foreign Tastes Shift Toward US Products** | Demand for US exports rises $\\implies D_{\\text{USD}} \\rightarrow$ | **Appreciates** ($e \\uparrow$) | **Increases** ($X_n \\uparrow$) | $AD$ shifts Right ($AD \\uparrow$) |`
      }
    ,
      {
        heading: '2. Balance of Payments & FOREX Determinants (CED 5.1-5.4)',
        content: `International trade accounts and foreign currency exchange rate determinants:

* **Balance of Payments Accounts**:
  * **Current Account (CA)**: Trade balance (exports $-$ imports), net investment income, and net unilateral transfers.
  * **Financial (Capital) Account (CFA)**: Foreign direct investment, purchases/sales of international financial assets (stocks, government bonds).
  * **Balance of Payments Identity**: In a floating exchange rate regime, $CA + CFA = 0$.
* **Determinants of Currency Appreciation vs. Depreciation**:
  * **Higher Domestic Real Interest Rates**: Attracts foreign financial capital inflows (financial account surplus) $\\implies$ demand for currency increases $\\implies$ currency **appreciates**.
  * **Higher Domestic Inflation**: Makes domestic goods relatively expensive $\\implies$ exports decrease and imports increase $\\implies$ currency **depreciates**.
* **Net Export Feedback Effect**:
  * When domestic currency appreciates, domestic exports become more expensive for foreigners and foreign imports become cheaper $\\implies$ **Net Exports ($X_n$) decrease**, shifting $AD$ left!`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Interest Rate Shocks on the FOREX Market and Net Exports',
        topicRef: 'CED Macro 6.3 Exchange Rates and International Trade',
        question: 'Suppose real interest rates in the United States rise relative to those in the European Union. (a) Explain how this affects the demand for US dollars in the foreign exchange market. (b) What happens to the value of the US dollar relative to the Euro? (c) How will this change in exchange rate impact US Net Exports ($X_n$)?',
        solutionSteps: [
          'Step 1: Capital flow motivation: European investors seek higher returns on US financial assets (bonds).',
          'Step 2: FOREX demand: To purchase US bonds, Europeans must first buy US dollars. Therefore, the **Demand for US Dollars shifts RIGHT** ($D_{\\$} \\rightarrow$).',
          'Step 3: Currency valuation: Increased demand raises the exchange rate $\\implies$ The **US dollar appreciates** against the Euro.',
          'Step 4: Net exports effect: An appreciated dollar makes American exports more expensive for Europeans and European imports cheaper for Americans. US exports decrease, imports increase $\\implies$ **US Net Exports decrease** ($X_n \\downarrow$).'
        ],
        finalAnswer: '(a) Demand for US dollars increases (shifts right). (b) The US dollar appreciates. (c) US Net Exports decrease.',
        apScoringTip: 'Remember the inverse currency rule: If the US dollar APPRECIATES relative to the Euro, then the Euro simultaneously DEPRECIATES relative to the dollar!'
      }
    ],
    diagrams: [
      {
        id: 'forex_market_graph',
        title: 'Foreign Exchange (FOREX) Market: Currency Appreciation',
        subtitle: 'Capital Inflows Shift Currency Demand Right, Raising Exchange Rate',
        type: 'forex_market_graph',
        description: 'FOREX graph with exchange rate on vertical axis, showing Demand for USD shifting right due to capital inflows, establishing a higher equilibrium exchange rate.',
        takeaway: 'Higher real interest rates attract foreign capital, appreciating the domestic currency and reducing net exports.'
      }
    ],
    commonTraps: [
      'Assuming an appreciating currency is always good for an economy. A strong currency hurts exporters and reduces aggregate demand!',
      'Thinking both currencies can appreciate at the same time. If Currency A appreciates, Currency B MUST depreciate relative to A.',
      'Confusing the Current Account with the Financial Account: Buying physical goods is Current Account; buying financial assets (stocks/bonds) is Financial Account.'
    ],
    cramSheet: [
      'Balance of Payments: Current Account + Financial Account = 0.',
      'Higher real interest rates $\\implies$ Capital inflows $\\implies$ Currency Appreciates.',
      'Currency Appreciates $\\implies$ Exports fall, Imports rise $\\implies$ Net Exports ($X_n$) decrease $\\implies$ $AD$ falls.',
      'Currency Depreciates $\\implies$ Exports rise, Imports fall $\\implies$ Net Exports ($X_n$) increase $\\implies$ $AD$ rises.'
    ]
  }
];
