// AP Economics (Micro & Macro) Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–6)
// Authentic market equilibrium, elasticity formulas, production costs, game theory, AD-AS macro model, fiscal multiplier, and central bank monetary policy.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_ECONOMICS_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Micro 1: Supply, Demand & Elasticity',
    shortTitle: 'Micro 1: Supply & Demand',
    description: 'Market equilibrium, price elasticity of demand (PED), total revenue test, consumer/producer surplus, and deadweight loss from price controls/taxes',
    examWeight: '15–20% of AP Micro Exam',
    biome: {
      name: 'Equilibrium Agora & Elasticity Basin',
      icon: '⚖️',
      accentColor: '#14B8A6',
      secondaryColor: '#0D9488',
      groundGradient: 'from-teal-100 via-emerald-50 to-cyan-100',
      cardBorder: 'border-teal-500',
      trailColor: '#14b8a6',
      nodeRing: 'ring-teal-400/40',
      skyTint: 'from-teal-50 to-cyan-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'econ-u1-l1',
        topicNumber: 'Micro Topic 1.1 & 1.4',
        name: 'Elasticity & Deadweight Loss',
        subtitle: 'PED, Total revenue test, and tax incidence',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'ec1-l1-q1',
            stem: 'If a $10\\%$ increase in the price of movie tickets leads to a $25\\%$ decrease in the quantity of tickets demanded, what is the price elasticity of demand ($PED$), and is demand elastic or inelastic?',
            options: [
              '$PED = 2.5$; demand is elastic, so total revenue will decrease.',
              '$PED = 0.4$; demand is inelastic, so total revenue will increase.',
              '$PED = 2.5$; demand is unit elastic.',
              '$PED = -0.4$; demand is perfectly inelastic.'
            ],
            correctIndex: 0,
            explanation: '$PED = \\frac{|\\%\\Delta Q_d|}{|\\%\\Delta P|} = \\frac{25\\%}{10\\%} = 2.5$. Because $PED > 1$, demand is price elastic. By the total revenue test, when demand is elastic, price and total revenue move in opposite directions: raising price causes a larger percentage drop in quantity, reducing total revenue.',
            distractorTip: 'Total revenue test: Elastic = $P$ and $TR$ opposite; Inelastic = $P$ and $TR$ move together.'
          },
          {
            id: 'ec1-l1-q2',
            stem: 'When the government imposes an effective (binding) price ceiling on rental apartments below the free market equilibrium rent, what economic outcome occurs?',
            options: [
              'A persistent housing shortage (quantity demanded exceeds quantity supplied) and deadweight loss.',
              'A housing surplus with vacant apartments.',
              'Increased total producer surplus for landlords.',
              'An outward shift of the market supply curve.'
            ],
            correctIndex: 0,
            explanation: 'A binding price ceiling is set BELOW equilibrium price. At this artificially low price, quantity demanded rises while quantity supplied falls, creating an unresolved shortage and deadweight loss from mutually beneficial exchanges prevented.',
            distractorTip: 'Ceilings are binding BELOW equilibrium; Floors are binding ABOVE equilibrium.'
          },
          {
            id: 'ec1-l1-q3',
            stem: 'If demand for insulin is perfectly inelastic ($PED = 0$) and a per-unit excise tax of $2 per vial is imposed on suppliers, who bears the economic burden (incidence) of the tax?',
            options: [
              'Consumers bear $100\\%$ of the tax burden, because price rises by the exact $2 tax amount.',
              'Suppliers bear $100\\%$ of the tax burden.',
              'Consumers and producers split the burden $50/50$.',
              'The government incurs deadweight loss equal to tax revenue.'
            ],
            correctIndex: 0,
            explanation: 'Tax incidence depends on relative elasticity: the more inelastic side of the market pays more. When demand is perfectly inelastic (vertical demand curve), consumers have zero substitutes and cannot reduce quantity demanded, absorbing the entire tax burden with zero deadweight loss.',
            distractorTip: 'Inelastic side ALWAYS pays the tax!'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Micro 2: Production Costs & Perfect Competition',
    shortTitle: 'Micro 2: Perfect Competition',
    description: 'Explicit vs implicit costs, law of diminishing marginal returns, cost curves (MC, ATC, AVC), profit maximization (MR = MC), and shutdown rule',
    examWeight: '22–28% of AP Micro Exam',
    biome: {
      name: 'Marginal Cost Valley & Perfect Competition Plains',
      icon: '📈',
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
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'econ-u2-l1',
        topicNumber: 'Micro Topic 2.1 & 2.7',
        name: 'Cost Curves & Short-Run Shutdown Rule',
        subtitle: 'MR = MC, shutdown where P < AVC, and long-run zero economic profit',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ec2-l1-q1',
            stem: 'In the short run, a perfectly competitive firm should shut down immediately if the market price drops below which cost benchmark?',
            options: [
              'Average Variable Cost ($AVC$)',
              'Average Total Cost ($ATC$)',
              'Marginal Cost ($MC$)',
              'Average Fixed Cost ($AFC$)'
            ],
            correctIndex: 0,
            explanation: 'If $P < AVC$, the firm cannot even cover its day-to-day operating variable expenses (like wages and materials). Continuing to produce would add operating losses on top of its fixed costs. By shutting down, it limits losses strictly to fixed costs.',
            distractorTip: 'Short-run shutdown rule: $P < AVC$. Long-run exit rule: $P < ATC$.'
          },
          {
            id: 'ec2-l1-q2',
            stem: 'In long-run equilibrium in a perfectly competitive constant-cost industry, what is the economic profit of each individual firm?',
            options: [
              'Zero economic profit (normal profit), where $P = MR = MC = \\text{minimum } ATC$.',
              'Substantial positive monopoly rents.',
              'Negative economic profit subsidized by the state.',
              'Dependent on advertising expenditures.'
            ],
            correctIndex: 0,
            explanation: 'Low barriers to entry and exit ensure that if firms make positive economic profits, new firms enter, increasing market supply and lowering price until economic profit equals zero ($P = \\text{min } ATC$).',
            distractorTip: 'Zero economic profit means accounting profits are positive and sufficient to cover all opportunity costs of capital.'
          },
          {
            id: 'ec2-l1-q3',
            stem: 'Why does the Marginal Cost ($MC$) curve always intersect the Average Total Cost ($ATC$) and Average Variable Cost ($AVC$) curves at their respective minimum points?',
            options: [
              'Mathematical average-marginal rule: when marginal cost is below the average, it pulls the average down; when marginal cost is above the average, it pulls the average up.',
              'Because fixed costs equal zero at that intersection.',
              'Because total revenue is maximized at minimum cost.',
              'It only occurs under government price ceilings.'
            ],
            correctIndex: 0,
            explanation: 'Just like a semester GPA pulls down your cumulative GPA if your semester grade is lower: as long as each additional unit costs less than the average ($MC < ATC$), $ATC$ falls. When $MC > ATC$, $ATC$ rises. Thus, the turning minimum point must occur exactly where $MC = ATC$.',
            distractorTip: 'MC cuts ATC and AVC at their minimums.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Micro 3: Imperfect Competition & Game Theory',
    shortTitle: 'Micro 3: Monopolies & Game Theory',
    description: 'Monopolies, price discrimination, deadweight loss, monopolistic competition, and oligopoly game theory (Nash equilibrium)',
    examWeight: '15–22% of AP Micro Exam',
    biome: {
      name: 'Monopoly Citadel & Payoff Matrix',
      icon: '♟️',
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
        uniqueKey: 'econ-u3-l1',
        topicNumber: 'Micro Topic 3.1 & 3.5',
        name: 'Monopoly Pricing & Nash Equilibrium',
        subtitle: 'MR < P downward sloping demand, prisoner’s dilemma, and dominant strategy',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ec3-l1-q1',
            stem: 'Why does a single-price unregulated monopolist\'s Marginal Revenue ($MR$) curve lie strictly BELOW its downward-sloping Demand curve?',
            options: [
              'To sell an additional unit of output, the monopolist must lower the price not only for that unit but also on all previous units sold.',
              'Because monopolists face constant marginal costs.',
              'Because monopolists are price takers.',
              'Due to anti-trust regulatory caps.'
            ],
            correctIndex: 0,
            explanation: 'Unlike a competitive firm that can sell any quantity at market price ($MR = P$), a single-price monopolist must reduce price across all units to sell more. Thus, the revenue gained from the last unit is offset by the price drop on preceding units, making $MR < P$.',
            distractorTip: 'In perfect competition: $P = MR = D = AR$. In monopoly: $MR < P$.'
          },
          {
            id: 'ec3-l1-q2',
            stem: 'In game theory, what is a "dominant strategy" for a player in a payoff matrix?',
            options: [
              'A strategy that yields the best outcome for that player regardless of what decision the rival player chooses.',
              'A strategy that maximizes the joint combined profit of both firms.',
              'A strategy that only works if the other player cooperates.',
              'The outcome where neither firm makes an economic profit.'
            ],
            correctIndex: 0,
            explanation: 'A dominant strategy is an action that is strictly preferred by a player no matter which action the opponent undertakes.',
            distractorTip: 'A Nash Equilibrium is a state where neither player has an incentive to unilaterally deviate given the other\'s strategy.'
          },
          {
            id: 'ec3-l1-q3',
            stem: 'If an unregulated monopoly practices perfect (first-degree) price discrimination, charging every individual consumer their exact maximum willingness to pay:',
            options: [
              'Consumer surplus is completely eliminated and converted to profit, but deadweight loss becomes zero (allocative efficiency is achieved).',
              'Deadweight loss reaches its theoretical maximum.',
              'Consumer surplus is maximized.',
              'Output is halved compared to a single-price monopoly.'
            ],
            correctIndex: 0,
            explanation: 'In perfect price discrimination, $MR = D$ because price is not lowered for previous buyers. The firm produces up to $P = MC$ (allocatively efficient, zero deadweight loss), but captures $100\\%$ of the surplus as profit, leaving zero consumer surplus.',
            distractorTip: 'Surprising AP Concept: Perfect price discrimination produces ZERO deadweight loss, but leaves ZERO consumer surplus.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Macro 1: Economic Indicators (GDP & Inflation)',
    shortTitle: 'Macro 1: GDP & Inflation',
    description: 'GDP calculation (expenditure approach C+I+G+Xn), nominal vs real GDP, GDP deflator, CPI, and types of unemployment (frictional, structural, cyclical)',
    examWeight: '12–17% of AP Macro Exam',
    biome: {
      name: 'Macro Metric Observatory & CPI Peak',
      icon: '📊',
      accentColor: '#3B82F6',
      secondaryColor: '#1D4ED8',
      groundGradient: 'from-blue-100 via-sky-50 to-indigo-100',
      cardBorder: 'border-blue-500',
      trailColor: '#3b82f6',
      nodeRing: 'ring-blue-400/40',
      skyTint: 'from-blue-50 to-indigo-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'econ-u4-l1',
        topicNumber: 'Macro Topic 1.1 & 1.3',
        name: 'GDP Components & Unemployment Types',
        subtitle: 'Real vs Nominal GDP, frictional/structural/cyclical, and natural rate of unemployment',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'ec4-l1-q1',
            stem: 'Which transaction is counted in the official calculation of the United States Gross Domestic Product (GDP)?',
            options: [
              'A domestic consumer purchasing a newly manufactured laptop computer.',
              'An investor purchasing 100 shares of Apple stock on Wall Street.',
              'A family purchasing a 1950s historic residential home.',
              'A carpenter purchasing intermediate lumber to build kitchen cabinets.'
            ],
            correctIndex: 0,
            explanation: 'GDP includes only newly produced final goods and services within the country\'s borders. Used homes, purely financial asset transfers (stocks/bonds), and intermediate production goods (lumber) are excluded to prevent double counting.',
            distractorTip: 'Stocks are financial transfers, not new production. Intermediate goods are counted only in the final product.'
          },
          {
            id: 'ec4-l1-q2',
            stem: 'A coal miner in West Virginia loses his job because power plants transitioned permanently to solar and wind tech, and his mining skills do not match available green energy jobs. He is experiencing:',
            options: [
              'Structural unemployment',
              'Cyclical unemployment',
              'Frictional unemployment',
              'Seasonal unemployment'
            ],
            correctIndex: 0,
            explanation: 'Structural unemployment occurs when a worker\'s skills become obsolete due to permanent technological or structural shifts in the economy, leaving a geographic or educational mismatch.',
            distractorTip: 'Cyclical = caused by recession; Frictional = temporarily between jobs / newly graduated; Structural = skills obsolete.'
          },
          {
            id: 'ec4-l1-q3',
            stem: 'If Nominal GDP is $600\\,\\text{billion}$ and the GDP Deflator is $120$, what is the Real GDP?',
            options: [
              '$500\\,\\text{billion}$',
              '$720\\,\\text{billion}$',
              '$480\\,\\text{billion}$',
              '$600\\,\\text{billion}$'
            ],
            correctIndex: 0,
            explanation: '$\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100 = \\frac{600}{120} \\times 100 = 5 \\times 100 = 500\\,\\text{billion}$. Real GDP removes the distorting effect of price inflation.',
            distractorTip: 'Formula: $\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{Price Index}} \\times 100$.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Macro 2: AD-AS Model & Fiscal Policy',
    shortTitle: 'Macro 2: AD-AS & Fiscal Policy',
    description: 'Aggregate demand shifters, short-run vs long-run AS, recessionary vs inflationary gaps, spending multiplier (1 / [1-MPC]), and crowding-out effect',
    examWeight: '20–25% of AP Macro Exam',
    biome: {
      name: 'AD-AS Chasm & Keynesian Multiplier',
      icon: '🏛️',
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
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'econ-u5-l1',
        topicNumber: 'Macro Topic 2.2 & 2.6',
        name: 'The Multiplier & Output Gaps',
        subtitle: 'MPC, spending vs tax multipliers, and expansionary fiscal shifts',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'ec5-l1-q1',
            stem: 'If the Marginal Propensity to Consume ($MPC$) is $0.80$, how much total change in Aggregate Demand will result from a $50\\,\\text{billion}$ increase in government spending?',
            options: [
              '$250\\,\\text{billion}$ increase',
              '$200\\,\\text{billion}$ increase',
              '$50\\,\\text{billion}$ increase',
              '$40\\,\\text{billion}$ increase'
            ],
            correctIndex: 0,
            explanation: 'The spending multiplier is $k = \\frac{1}{1 - MPC} = \\frac{1}{1 - 0.80} = \\frac{1}{0.20} = 5$. Total shift in $\\text{AD} = \\Delta G \\times k = 50\\,\\text{billion} \\times 5 = 250\\,\\text{billion}$.',
            distractorTip: 'Notice the tax multiplier is always one less than spending multiplier: $k_{tax} = \\frac{-MPC}{1 - MPC} = \\frac{-0.8}{0.2} = -4$.'
          },
          {
            id: 'ec5-l1-q2',
            stem: 'When the economy is operating in a recessionary gap (current output $Y_1 < Y_f$), which fiscal policy action will close the gap and restore full employment output?',
            options: [
              'Increasing government purchases and/or decreasing personal taxes.',
              'Decreasing government spending to balance the budget.',
              'Raising corporate income taxes.',
              'Banning all exports.'
            ],
            correctIndex: 0,
            explanation: 'To close a recessionary gap, policymakers use expansionary fiscal policy: increasing government expenditures ($G$) or lowering taxes ($T$) to shift the Aggregate Demand curve rightward toward the Long-Run Aggregate Supply (LRAS) curve.',
            distractorTip: 'Recession = shift AD RIGHT (boost spending/cut taxes); Inflation = shift AD LEFT (cut spending/hike taxes).'
          },
          {
            id: 'ec5-l1-q3',
            stem: 'What is the "crowding-out effect" associated with deficit-financed expansionary fiscal policy?',
            options: [
              'Government deficit borrowing increases demand for loanable funds, driving up real interest rates and reducing private business investment and interest-sensitive consumer spending.',
              'High taxes force private businesses to close.',
              'Imports crowd out domestic manufacturing.',
              'Inflation eliminates all cash savings.'
            ],
            correctIndex: 0,
            explanation: 'When the government borrows to fund deficit spending, it shifts the demand for loanable funds right, driving up real interest rates. Higher borrowing costs "crowd out" private corporate capital investment, partially offsetting the expansionary fiscal stimulus.',
            distractorTip: 'Crowding-out links government deficits to higher real interest rates and reduced private investment.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Macro 3: Financial Sector & Monetary Policy',
    shortTitle: 'Macro 3: Monetary Policy',
    description: 'Money multiplier (1/RR), central bank monetary policy tools (reserve requirement, discount rate, open market operations, ample reserves IORB), and nominal vs real interest rates',
    examWeight: '15–20% of AP Macro Exam',
    biome: {
      name: 'Federal Reserve Vault & Bond Market',
      icon: '🏦',
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
        uniqueKey: 'econ-u6-l1',
        topicNumber: 'Macro Topic 3.1 & 3.4',
        name: 'Monetary Policy & The Money Multiplier',
        subtitle: 'Reserve ratio, Open Market Operations, and Interest on Reserve Balances (IORB)',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'ec6-l1-q1',
            stem: 'If the commercial banking system has a reserve requirement of $10\\%$ and the Federal Reserve buys $10\\,\\text{million}$ of Treasury bonds from commercial banks, what is the maximum potential increase in the money supply?',
            options: [
              '$100\\,\\text{million}$',
              '$10\\,\\text{million}$',
              '$50\\,\\text{million}$',
              '$1\\,\\text{billion}$'
            ],
            correctIndex: 0,
            explanation: 'The simple money multiplier is $M = \\frac{1}{RR} = \\frac{1}{0.10} = 10$. The entire $10\\,\\text{million}$ injection becomes excess reserves that banks can lend out: $\\Delta MS = 10\\,\\text{million} \\times 10 = 100\\,\\text{million}$.',
            distractorTip: 'Memory acronym: Buying bonds = Big money supply; Selling bonds = Small money supply.'
          },
          {
            id: 'ec6-l1-q2',
            stem: 'In an economy with an "ample reserves" banking regime, what is the Federal Reserve\'s primary administered interest rate tool used to steer the policy interest rate (federal funds rate)?',
            options: [
              'Interest on Reserve Balances (IORB)',
              'Open Market Operations buying commercial paper',
              'The reserve requirement ratio',
              'The marginal tax bracket'
            ],
            correctIndex: 0,
            explanation: 'In the updated College Board AP Macro curriculum, modern central banks operate in an "ample reserves" regime where the primary administered tool is the Interest on Reserve Balances (IORB) rate. Commercial banks will not lend reserves to other banks for less than what the Fed guarantees them on their reserve balances.',
            distractorTip: 'College Board Update: In ample reserves, IORB is the primary policy rate tool!'
          },
          {
            id: 'ec6-l1-q3',
            stem: 'According to the Fisher Equation, if the nominal interest rate on a loan is $7\\%$ and annual inflation is $3\\%$, what is the real interest rate earned by the lender?',
            options: [
              '$4\\%$',
              '$10\\%$',
              '$2.3\\%$',
              '$21\\%$'
            ],
            correctIndex: 0,
            explanation: 'Fisher Equation: $\\text{Real Interest Rate} = \\text{Nominal Interest Rate} - \\text{Inflation Rate} = 7\\% - 3\\% = 4\\%$.',
            distractorTip: 'Unanticipated inflation harms lenders (creditors) and benefits borrowers (debtors) because debt is repaid with less valuable dollars.'
          }
        ]
      }
    ]
  }
];
