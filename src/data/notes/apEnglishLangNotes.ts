import { APUnitNote } from './types';

export const AP_ENGLISH_LANG_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: RHETORICAL SITUATION & CLAIMS
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Rhetorical Situation & Claims',
    examWeight: '11%–15% of AP Exam',
    bigIdea: 'Writers make deliberate choices based on the rhetorical situation (exigence, audience, purpose, context, speaker) to convey defensible claims.',
    keyTheorems: [
      {
        name: 'The SPACE-CAT Rhetorical Framework',
        conditions: 'Deconstructing any non-fiction argument or rhetorical passage.',
        conclusion: 'Analysis requires identifying: Speaker (persona & credibility), Purpose (action desired from reader), Audience (beliefs & biases), Context (historical/social setting), Exigence (the catalyst/spark), Choices (stylistic devices), Appeals (ethos/pathos/logos), Tone (author attitude).',
        apTip: 'Exigence is NOT just the topic. Exigence is the immediate problem, event, or urgency that compelled the author to speak or write at that exact moment.'
      },
      {
        name: 'Defensible Thesis Construction',
        conditions: 'Formulating the central claim for rhetorical analysis or argumentative essays.',
        conclusion: 'A defensible thesis must take a stance that could be reasonably contested, specifying rhetorical choices and the author’s ultimate purpose/message rather than merely summarizing the passage.',
        apTip: 'Never write "The author uses diction and rhetorical questions to persuade the audience." Diction is just words! Specify the *type* of diction (e.g. "somber, militaristic diction") and state *what* the audience is persuaded to believe.'
      }
    ],
    formulas: [
      {
        name: 'Rhetorical Analysis Thesis Formula',
        latex: '\\text{Context/Exigence} + \\text{Specific Rhetorical Choices} \\rightarrow \\text{Core Message / Ultimate Purpose}',
        explanation: 'In response to [Exigence], [Speaker] employs [Choice 1] and [Choice 2] in order to [Action/Conviction desired in Audience].'
      }
    ],
    sections: [
      {
        heading: '1. SPACE-CAT Component Matrix',
        content: `Complete breakdown of rhetorical situation elements:

| Element | Guiding Question | Critical Distinction |
| :--- | :--- | :--- |
| **Speaker** | Who is conveying the message? | Distinct from the actual person; examine their persona, values, and established authority. |
| **Purpose** | What reaction does the writer want? | What the author wants the audience to *do*, *think*, or *feel* after reading. |
| **Audience** | Who are the intended recipients? | Identify their prior knowledge, socio-economic background, vulnerabilities, and potential resistance. |
| **Context** | What historical currents surround the text? | The broader political, cultural, or philosophical environment of the era. |
| **Exigence** | What spark demanded this speech/text now? | The immediate catalyst that made silence impossible. |
| **Choices** | How did the author construct arguments? | Structural moves, juxtaposition, syntax pacing, analogies, and shifts. |
| **Appeals** | How is connection established? | Ethos (character/trust), Pathos (emotion/values), Logos (reason/evidence). |
| **Tone** | What is the author's emotional stance? | Shifts in tone across the text signal transitions in argument or emotional climax. |`
      }
    ,
      {
        heading: '2. Exigence, Audience Orientation & Defensible Thesis Design (Skill 1.A-1.B, 3.A)',
        content: `Deconstructing the rhetorical situation and engineering arguable thesis statements:

* **The Core Rhetorical Situation Triangle**:
  * **Speaker**: Persona, credentials, and moral character presented to the audience.
  * **Audience**: Specific demographic group with distinct values, predispositions, vulnerabilities, and prejudices.
  * **Message**: Core argument and claims advanced by the text.
  * **Purpose**: Concrete action, emotional shift, or intellectual realization the speaker seeks to produce in the audience.
  * **Exigence**: The immediate historical spark, crisis, or urgent defect that compelled the author to speak or write at that exact moment!
  * **Context**: Broad historical, political, and cultural climate shaping the text.
* **Engineering a Defensible Thesis**:
  * A thesis must take a clear, arguable stance that a reasonable reader could dispute (never a statement of accepted fact or a plot summary).
  * **Closed Thesis Formula**: 'By juxtaposing [Choice A] and establishing [Choice B], [Speaker] exposes [Insight] in order to compel [Audience] to [Action].'`
      }
    ],
    workedExamples: [
      {
        title: 'Formulating a Sophisticated Rhetorical Analysis Thesis',
        topicRef: 'CED 1.2 Rhetorical Analysis Essay (Q2)',
        question: 'Analyze how Florence Kelley utilizes rhetorical choices in her 1905 speech before the National American Woman Suffrage Association to oppose child labor laws.',
        solutionSteps: [
          'Step 1: Identify Exigence: The horrific working conditions of young girls in textile mills while women lack the voting franchise to enact legislative reform.',
          'Step 2: Identify Rhetorical Choices: Repetitive juxtaposition of children working through the night while adult consumers sleep, alongside persistent oxymorons and statistical appeals.',
          'Step 3: Connect to Purpose: To awaken moral culpability in enfranchised citizens and mobilize suffragists toward legislative boycott.',
          'Step 4: Synthesize into Thesis: "In her 1905 address, Florence Kelley strategically juxtaposes the grueling nocturnal labor of adolescent girls with the comfortable slumber of privileged adults, and deploys stinging statistical evidence to expose society’s collective guilt, ultimately rallying suffragists to harness consumer power and enact child labor reform."'
        ],
        finalAnswer: 'A high-scoring thesis identifying 2 distinct choices (juxtaposition, statistical appeals) tied directly to Kelley’s legislative and moral purpose.',
        apScoringTip: 'Earn the thesis point on Row A by ensuring your claim cannot be answered with a simple "yes" or "no" and offers an analytical roadmap.'
      }
    ],
    commonTraps: [
      'Labeling devices without explaining function (e.g. saying "the author uses a metaphor" without explaining what ideas the metaphor connects for the audience).',
      'Confusing tone with mood. Tone is the author’s attitude toward the subject; mood is the emotional atmosphere felt by the reader.',
      'Paraphrasing the passage sequentially instead of organizing paragraphs around rhetorical functions.'
    ],
    cramSheet: [
      'SPACE-CAT: Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, Tone.',
      'Thesis must name specific strategies and the author’s intended purpose.',
      'Exigence is the catalyst that prompted the text, not just the general topic.',
      'Explain the "So What?": Always link the choice to audience reaction.'
    ]
  },

  // ==========================================
  // UNIT 2: EVIDENCE & APPEALS (ETHOS, PATHOS, LOGOS)
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Evidence & Rhetorical Appeals',
    examWeight: '12%–16% of AP Exam',
    bigIdea: 'Arguments achieve persuasiveness by integrating diverse evidence types with ethical, emotional, and logical appeals.',
    keyTheorems: [
      {
        name: 'The Classical Triad of Rhetorical Appeals',
        conditions: 'Evaluating persuasive mechanics in non-fiction argumentation.',
        conclusion: '(1) Ethos establishes moral character, expertise, and good faith; (2) Pathos evokes empathy, outrage, fear, or patriotic pride; (3) Logos establishes logical coherence through deductive syllogisms, empirical data, and causal reasoning.',
        apTip: 'Never write "The author uses ethos." Ethos is not a tool you pick up; it is an impression created! Write "The author establishes ethos by highlighting their decades of field experience."'
      },
      {
        name: 'Evidence Sufficiency and Validity',
        conditions: 'Evaluating the strength of support for claims.',
        conclusion: 'Effective evidence must be: (1) Sufficient in quantity, (2) Representative rather than cherry-picked, (3) Relevant to the claim, and (4) Timely and credible.',
        apTip: 'Anecdotal evidence creates emotional connection (Pathos), but requires empirical or statistical support (Logos) to survive skeptical scrutiny.'
      }
    ],
    formulas: [
      {
        name: 'Toulmin Argument Model',
        latex: '\\text{Claim} \\xleftarrow{\\text{Qualifier}} \\text{Data (Evidence)} + \\text{Warrant (Underlying Assumption)}',
        explanation: 'Data supports the Claim only when the Warrant (the bridge) is accepted by the audience.'
      }
    ],
    sections: [
      {
        heading: '1. Types of Evidence & Strategic Deployment',
        content: `Comparative guide to evidence types in AP essays:

| Evidence Type | Primary Strength | Vulnerability / Limitation | Ideal Context |
| :--- | :--- | :--- | :--- |
| **Statistical / Empirical** | Irrefutable scale; builds unimpeachable Logos | Can feel dry, detached, or easily manipulated | Policy arguments, economic analyses, scientific claims |
| **Historical Precedent** | Demonstrates past outcomes of similar choices | Situations may not be perfectly analogous | Constitutional debates, foreign policy, societal trends |
| **Personal Anecdote** | Evokes immediate empathy; humanizes abstract data | Can be dismissed as atypical or unrepresentative | Introductions, emotional appeals, individual rights |
| **Expert Testimony** | Confers instant credibility (Ethos); specialized insight | Subject to authority bias if consensus is disputed | Complex technical subjects, ethical quandaries |
| **Analogical Evidence** | Clarifies complex or unfamiliar ideas through comparison | Analogy breaks down if key dissimilarities exist | Conceptual explanations, philosophical debate |`
      }
    ,
      {
        heading: '2. Strategic Deployment of Appeals & Line of Reasoning (Skill 3.B, 4.A-4.B)',
        content: `Classical rhetorical appeals and structural logical progression:

* **The Classical Triad of Rhetorical Appeals**:
  * **Ethos (Character & Authority)**: Building perceived trustworthiness, expertise, and moral integrity; establishing shared communal values with the audience.
  * **Logos (Logic & Reason)**: Constructing rational arguments via statistical data, empirical testimony, inductive generalizations, and deductive syllogisms.
  * **Pathos (Emotional Resonance)**: Appealing to core human emotions (empathy, righteous indignation, patriotism, fear, shared grief) to motivate visceral audience engagement.
* **Building a Cohesive Line of Reasoning**:
  * An essay's **Line of Reasoning** is the logical trajectory connecting successive claims:
    $$\\text{Thesis} \\rightarrow \\text{Claim 1 (Evidence + Commentary)} \\rightarrow \\text{Transition} \\rightarrow \\text{Claim 2} \\rightarrow \\text{Conclusion}$$
  * Maintain explicit connective tissue between paragraphs using logical transition markers:
    * Contrast: 'Conversely', 'Notwithstanding', 'Whereas'.
    * Concession: 'Admittedly', 'Granted that', 'Even while conceding'.
    * Amplification: 'Furthermore', 'More decisively', 'Compounding this reality'.`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Evidence Function in Synthesis Prompts',
        topicRef: 'CED 2.3 Synthesis Argument Construction',
        question: 'How does an author effectively integrate an excerpt about automated labor from an academic journal alongside a worker’s personal narrative?',
        solutionSteps: [
          'Step 1: Identify role of the academic journal: Establishes macro-economic trends and empirical data on displaced jobs (Logos).',
          'Step 2: Identify role of the personal narrative: Illustrates the human cost, psychological disorientation, and family strain (Pathos).',
          'Step 3: Synthesize connection: The narrative grounds the abstract statistics into tangible human consequences, while the journal ensures the story is not seen as an isolated fluke.',
          'Step 4: Draft commentary: "By pairing macro-level statistical models from Oxford economists with the poignant narrative of a laid-off machinist, the author demonstrates both systemic breadth and individual emotional devastation."'
        ],
        finalAnswer: 'Seamless integration where qualitative emotion and quantitative authority mutually reinforce the core claim.',
        apScoringTip: 'In the Synthesis essay (Q1), you must cite at least 3 distinct sources and converse *between* them rather than summarizing them one by one.'
      }
    ],
    commonTraps: [
      'Treating Ethos, Pathos, and Logos as physical devices instead of rhetorical appeals.',
      'Dropping long quotes into an essay without analysis (the "quote dump" trap). Always embed quotes and spend twice as much text analyzing them.',
      'Failing to establish the warrant—assuming the reader automatically agrees that the evidence proves the claim.'
    ],
    cramSheet: [
      'Ethos = credibility; Pathos = emotion/values; Logos = logic/facts.',
      'Toulmin Model: Claim $\\rightarrow$ Data $\\rightarrow$ Warrant (connection) $\\rightarrow$ Backing.',
      'Embed quotes smoothly into your own sentence syntax.',
      'Commentary must explain *how* the evidence proves the specific claim.'
    ]
  },

  // ==========================================
  // UNIT 3: SYNTHESIS OF MULTIPLE SOURCES
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Synthesis of Multiple Sources',
    examWeight: '13%–17% of AP Exam',
    bigIdea: 'Advanced argumentation requires conversing between multiple perspectives, reconciling divergent evidence, and carving out an independent stance.',
    keyTheorems: [
      {
        name: 'The Dinner Table Metaphor of Synthesis',
        conditions: 'Writing the AP English Language Question 1 (Synthesis Essay).',
        conclusion: 'Sources should be treated as guests at a dinner table debating a controversial issue. The writer acts as the host who facilitates dialogue, pointing out where Source A agrees with Source B, where Source C exposes a flaw in Source A, and introducing the writer’s own nuanced conclusion.',
        apTip: 'Never dedicate Paragraph 1 to Source A, Paragraph 2 to Source B, and Paragraph 3 to Source C! Organize paragraphs by sub-arguments, citing multiple sources within each paragraph.'
      },
      {
        name: 'Attribution & Academic Integrity',
        conditions: 'Incorporating secondary sources into a timed synthesis essay.',
        conclusion: 'Every direct quote, paraphrased data point, or unique concept from the prompt packet must be explicitly attributed using either parenthetical citations (e.g. `[Source A]`) or signal phrases (e.g. `According to Dr. Ellis in Source B...`).',
        apTip: 'College Board requires citing at least 3 sources to earn points on Row B (Evidence & Commentary). Citing 4 sources provides insurance against misinterpretation.'
      }
    ],
    formulas: [
      {
        name: 'Source Synthesis Structure',
        latex: '\\text{Sub-Claim} \\rightarrow \\text{Source A Evidence} \\xleftrightarrow{\\text{Comparison / Contrast}} \\text{Source B Evidence} \\rightarrow \\text{Writer Commentary}',
        explanation: 'Put sources into conversation before delivering your own analytical verdict.'
      }
    ],
    sections: [
      {
        heading: '1. Scoring Rubric Guide for Synthesis Essay (Q1)',
        content: `Three-row analytic rubric breakdown:

| Rubric Row | Max Points | Core Requirement | How to Secure Maximum Score |
| :--- | :--- | :--- | :--- |
| **Row A: Thesis** | 1 pt | Responds to prompt with a defensible claim establishing a line of reasoning | Avoid repeating the prompt; assert a clear policy direction or philosophical judgment. |
| **Row B: Evidence & Commentary** | 4 pts | Incorporates at least 3 sources with comprehensive commentary | Show relationships between sources; explain *why* and *how* the evidence advances your thesis. |
| **Row C: Sophistication** | 1 pt | Demonstrates nuanced understanding, complex context, or vivid prose | Acknowledge complexities/tensions, recognize alternative interpretations, or craft an exceptional voice. |`
      }
    ,
      {
        heading: '2. The Source Conversation Table & Attribution Protocols (Skill 4.C, 6.A-6.C)',
        content: `Mastering Synthesis Essay (FRQ 1) architecture and source integration:

* **The 'Dinner Table Conversation' Mental Model**:
  * You are the host of a sophisticated dinner party; the prompt sources are your invited guests.
  * Your task is to initiate an argument and have the sources **converse with and qualify one another**:
    * 'While Source A champions technological automation for efficiency, Source C warns of displacement, creating a tension that Source E resolves through retraining.'
  * You must synthesize a **minimum of 3 sources** to support your own independent argument.
* **Seamless Source Attribution & Preventing 'Quote Bombs'**:
  * **Quote Bomb Trap**: Dropping a raw, unintroduced direct quote as an isolated standalone sentence.
  * **Integrated Attribution Formula**:
    * Signal Phrase + Context + Embedded Snippet + Analytical Commentary:
    * *As social theorist Robert Putnam observes, civic institutions serve as 'essential social capital' (Source B), demonstrating that communal participation precedes economic prosperity.*`
      }
    ],
    workedExamples: [
      {
        title: 'Constructing a Multi-Source Body Paragraph',
        topicRef: 'CED 3.2 Synthesizing Differing Perspectives',
        question: 'Synthesize sources on whether cursive handwriting should continue to be mandated in elementary school curricula.',
        solutionSteps: [
          'Step 1: Frame paragraph claim: Cursive instruction develops neurological pathways, yet digital typing provides indispensable workforce readiness.',
          'Step 2: Introduce cognitive evidence: Cite Source B (neuroscience study showing fine motor benefits of cursive).',
          'Step 3: Introduce opposing practical evidence: Cite Source E (survey of employers showing 98% prioritize touch-typing over handwritten cursive).',
          'Step 4: Synthesize tension in commentary: While Source B validly champions cognitive stimulation, Source E proves that an uncompromising focus on cursive squanders curriculum hours needed for digital literacy. Therefore, schools should retain cursive strictly as an early motor exercise rather than a prolonged testing metric.'
        ],
        finalAnswer: 'A synthesis paragraph balancing cognitive science and modern economic utility with nuanced compromise.',
        apScoringTip: 'Synthesizing two sources in a single paragraph immediately elevates your commentary to the 3–4 point range on Row B.'
      }
    ],
    commonTraps: [
      'Writing an essay that sounds like a book report summarizing one source at a time.',
      'Citing only 2 sources (automatic cap on Row B score). Always use at least 3, ideally 4.',
      'Letting the sources take over your paper. Your voice and argument must lead; sources exist only to serve your thesis.'
    ],
    cramSheet: [
      'Always cite at least 3 prompt sources (cite 4 for safety).',
      'Organize by themes/arguments, never by individual source documents.',
      'Put sources in dialogue: "While Source A asserts X, Source C complicates this by showing Y."',
      'Maintain your independent voice as the author throughout.'
    ]
  },

  // ==========================================
  // UNIT 4: ARGUMENTATIVE STRUCTURE & LOGIC
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Argumentative Structure & Logic',
    examWeight: '14%–18% of AP Exam',
    bigIdea: 'Robust arguments employ coherent lines of reasoning, anticipate counter-arguments, and avoid common logical fallacies.',
    keyTheorems: [
      {
        name: 'The Classical Argumentative Architecture',
        conditions: 'Organizing a persuasive essay or speech (Exordium to Peroratio).',
        conclusion: 'Six classical stages: (1) Exordium (Introduction & Hook), (2) Narratio (Background facts), (3) Partitio (Thesis & line of reasoning), (4) Confirmatio (Body paragraphs proving claims), (5) Refutatio (Concession & rebuttal), (6) Peroratio (Conclusion & resonant call to action).',
        apTip: 'A concession without a rebuttal weakens your argument! Always concede gracefully ("While critics reasonably argue X...") and immediately rebut with stronger evidence ("...this perspective overlooks Y").'
      },
      {
        name: 'Inductive vs. Deductive Reasoning',
        conditions: 'Building logical lines of reasoning.',
        conclusion: 'Inductive reasoning moves from specific observations to broad probabilistic generalizations (risk of hasty generalization). Deductive reasoning moves from universal premises through a syllogism to an inescapable specific conclusion (valid if premises are true).',
        apTip: 'Deductive Syllogism: Major Premise (All humans are mortal) + Minor Premise (Socrates is human) $\\implies$ Conclusion (Socrates is mortal).'
      }
    ],
    formulas: [
      {
        name: 'Concession and Rebuttal Structure',
        latex: '\\text{Concession (Admit valid counterpoint)} + \\text{Pivot Turn} + \\text{Rebuttal (Demonstrate superior claim)}',
        explanation: 'Although [Counter-Perspective], nevertheless [Primary Argument] because [Compelling Justification].'
      }
    ],
    sections: [
      {
        heading: '1. Logical Fallacies Master Catalog',
        content: `Major logical fallacies tested on AP English Language MCQs and avoided in FRQs:

| Fallacy | Definition | Illustrative Example |
| :--- | :--- | :--- |
| **Ad Hominem** | Attacking the person’s character rather than addressing their argument | "You cannot trust Dr. Smith’s climate data because he drives a gas-guzzling truck." |
| **Straw Man** | Oversimplifying or misrepresenting an opponent’s stance to make it easy to attack | "Those advocating for public transit want to ban all personal automobiles." |
| **False Dilemma (Either/Or)** | Presenting two extreme options as the only possibilities, ignoring middle ground | "Either we cut education spending in half, or our city faces bankruptcy." |
| **Post Hoc Ergo Propter Hoc** | Assuming that because event B followed event A, event A caused event B | "Right after the mayor was elected, it rained. He clearly brought an end to the drought." |
| **Slippery Slope** | Claiming a minor initial step will inevitably trigger a catastrophic chain reaction | "If students are allowed to use phones at lunch, academic discipline will crumble entirely." |
| **Hasty Generalization** | Drawing a universal conclusion from an insufficient or unrepresentative sample size | "My grandfather smoked two packs a day and lived to 95; smoking isn't harmful." |
| **Bandwagon (Ad Populum)** | Claiming a proposition is true or right simply because it is popular | "Millions of people believe this conspiracy, so there must be truth to it." |`
      }
    ,
      {
        heading: '2. Classical, Rogerian & Toulmin Argument Architectures (Skill 5.A, 7.A-7.B)',
        content: `Structural rhetorical frameworks for organizing complex persuasive essays:

* **Classical (Aristotelian) Argument**:
  1. **Exordium**: Captures reader attention and establishes ethical goodwill.
  2. **Narratio**: Contextual background information explaining the origin of the controversy.
  3. **Partitio**: Clear statement of the central thesis claim.
  4. **Confirmatio**: Body paragraphs presenting sub-claims, evidence, and rigorous commentary.
  5. **Refutatio**: Anticipating and systematically refuting counterarguments.
  6. **Peroratio**: Eloquent concluding summary and passionate call to action.
* **Toulmin Argumentation Model**:
  * **Claim**: The contentious assertion being argued.
  * **Grounds (Data)**: Empirical facts and evidence supporting the claim.
  * **Warrant**: The underlying implicit assumption connecting the evidence to the claim.
  * **Backing**: Additional justification validating the warrant.
  * **Qualifier**: Language limiting the scope of the claim ('in most cases', 'under specific economic conditions').
  * **Rebuttal**: Acknowledgment of conditions where the claim does not hold true.
* **Rogerian Argument (Seeking Common Ground)**:
  * Best for deeply polarized, emotionally fraught topics; summarizes the opponent's perspective fairly before identifying mutually beneficial compromise zones.`
      }
    ],
    workedExamples: [
      {
        title: 'Drafting an Argument Essay with High-Yield Concession (Q3)',
        topicRef: 'CED 4.1 Free-Response Argumentation',
        question: 'Write an argumentative paragraph defending or challenging the assertion that adversity develops character.',
        solutionSteps: [
          'Step 1: Formulate qualified stance: Adversity can forge resilience, but catastrophic trauma often permanently degrades human flourishing.',
          'Step 2: Provide historical/literary evidence: Contrast Abraham Lincoln’s political and personal setbacks with the intergenerational trauma of economic displacement.',
          'Step 3: Construct concession: Concede that moderate adversity builds emotional fortitude and psychological adaptability.',
          'Step 4: Execute rebuttal: However, romanticizing all suffering ignores institutional poverty and abuse, which stunt potential rather than elevating character.',
          'Step 5: Synthesize line of reasoning: "While moderate hardships undoubtedly teach perseverance, romanticizing adversity as a universal crucible overlooks destructive trauma; systematic deprivation breaks the human spirit far more often than it ennobles it."'
        ],
        finalAnswer: 'A qualified, mature argument avoiding binary oversimplification.',
        apScoringTip: 'Qualified arguments ("under specific circumstances X is true, but when Y occurs, Z results") consistently earn the Row C Sophistication point over absolutist claims.'
      }
    ],
    commonTraps: [
      'Using absolute language like "always," "never," "everyone," or "nobody." Qualified words like "frequently," "often," and "many" are logically defensible.',
      'Ignoring the counter-argument completely, which leads to simplistic arguments that score low on sophistication.',
      'Committing fallacies in your own writing—especially slippery slopes and false dilemmas.'
    ],
    cramSheet: [
      'Classical Structure: Exordium $\\rightarrow$ Narratio $\\rightarrow$ Partitio $\\rightarrow$ Confirmatio $\\rightarrow$ Refutatio $\\rightarrow$ Peroratio.',
      'Always qualify arguments: Avoid "always" and "never".',
      'Concession + Rebuttal: Acknowledge the counter-argument, then prove your claim holds more weight.',
      'Recognize common fallacies: Ad Hominem, Straw Man, False Dilemma, Slippery Slope.'
    ]
  },

  // ==========================================
  // UNIT 5: STYLE, DICTION & SYNTAX
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Style, Diction & Syntax',
    examWeight: '12%–16% of AP Exam',
    bigIdea: 'Stylistic choices—including word choice, sentence structure, figurative tropes, and tonal shifts—shape authorial voice and amplify rhetorical impact.',
    keyTheorems: [
      {
        name: 'The Rhetorical Power of Syntax',
        conditions: 'Analyzing sentence structure, rhythm, and pacing in prose.',
        conclusion: 'Writers manipulate syntax to control reader pacing and emphasize ideas: (1) Periodic sentences delay the main clause until the end to build suspense; (2) Cumulative (loose) sentences state the main idea first, then accumulate descriptive details; (3) Parallelism creates cadence and equal conceptual weight; (4) Chiasmus inverts phrasing for memorable emphasis.',
        apTip: 'Short, staccato sentences surrounded by lengthy compound-complex sentences create dramatic emphasis. Always analyze the *contrast* in sentence lengths.'
      },
      {
        name: 'Denotation vs. Connotation in Diction',
        conditions: 'Evaluating lexical choices and authorial tone.',
        conclusion: 'Denotation is the dictionary definition of a word; connotation is the cultural, emotional, and psychological associations it evokes. Shifting from neutral denotation to loaded connotation reveals implicit bias and steers audience emotion.',
        apTip: 'Consider the differences between "house," "home," and "shack." All share the same denotation (a dwelling), but evoke starkly contrasting emotional responses.'
      }
    ],
    formulas: [
      {
        name: 'Syntactic Balance Rule',
        latex: '\\text{Parallelism: } A + B + C \\text{ (same grammatical category)}',
        explanation: 'Example: "to think clearly, to speak boldly, and to act decisively" (infinitive verbs in series).'
      }
    ],
    sections: [
      {
        heading: '1. Rhetorical Tropes and Schemes Classification',
        content: `Master table of stylistic devices:

| Device Category | Term | Definition | Illustrative Example |
| :--- | :--- | :--- | :--- |
| **Scheme (Word Order)** | **Anaphora** | Repetition of a word/phrase at the start of successive clauses | "We shall fight on the beaches, we shall fight on the landing grounds..." |
| **Scheme (Word Order)** | **Epistrophe** | Repetition of a word/phrase at the end of successive clauses | "...government of the people, by the people, for the people." |
| **Scheme (Word Order)** | **Antithesis** | Juxtaposition of contrasting ideas in parallel grammatical structures | "Ask not what your country can do for you—ask what you can do for your country." |
| **Scheme (Word Order)** | **Polysyndeton** | Deliberate use of multiple conjunctions in close succession | "We lived and laughed and loved and died." (Slows pacing, emphasizes weight) |
| **Scheme (Word Order)** | **Asyndeton** | Deliberate omission of conjunctions between words/clauses | "I came, I saw, I conquered." (Accelerates pacing, conveys decisive energy) |
| **Trope (Figurative)** | **Metonymy** | Substituting the name of an attribute for the entity itself | "The pen is mightier than the sword" (Pen = written word; sword = military force) |
| **Trope (Figurative)** | **Synecdoche** | Using a physical part to represent the entire whole | "All hands on deck" (Hands = sailors/workers) |`
      }
    ,
      {
        heading: '2. Syntactic Schemes, Periodic Sentences & Tone Shifts (Skill 7.B-7.C)',
        content: `Macro-syntactic architecture and precise analytical vocabulary:

* **Sentence Architecture Typologies**:
  * **Cumulative (Loose) Sentence**: Opens with the main independent clause followed by accumulating modifiers (feels natural, conversational, descriptive).
  * **Periodic Sentence**: Suspends the main grammatical clause until the very end, building mounting suspense and rhetorical gravitas:
    * *'Unarmed, outnumbered, and shivering in the Valley Forge winter, Washington's soldiers persevered.'*
* **Rhetorical Syntactic Schemes**:
  * **Anaphora**: Repetition of words at the beginning of successive clauses (creates rhythmic, anthemic intensity).
  * **Antithesis**: Juxtaposition of sharply contrasting ideas in balanced parallel structures (*'Ask not what your country can do for you; ask what you can do for your country'*).
  * **Asyndeton vs. Polysyndeton**: Omitting conjunctions (hurried, breathless pace) vs. overusing conjunctions (deliberate, overwhelming accumulation).
* **Tracking Tone Shifts**:
  * Tone is the author's attitude toward the subject or audience.
  * Locate tonal shift indicators: transitional adverbs ('Yet', 'Conversely'), changes in sentence length, or shifts in diction register (from academic detached to raw impassioned).`
      }
    ],
    workedExamples: [
      {
        title: 'Analyzing Tone Shifts via Diction in Rhetorical Analysis',
        topicRef: 'CED 5.2 Identifying Tonal Progression',
        question: 'Identify the tone shift in an excerpt that begins with cold, bureaucratic terminology ("the aforementioned subjects will be processed according to schedule") and concludes with intimate, visceral imagery ("our children will weep into empty cradles").',
        solutionSteps: [
          'Step 1: Analyze early diction: "processed," "aforementioned," "schedule" $\\implies$ Clinical, detached, bureaucratic tone.',
          'Step 2: Analyze late diction: "children," "weep," "empty cradles" $\\implies$ Visceral, agonized, elegiac tone.',
          'Step 3: Identify the shift: The author transitions from sterile institutional critique to immediate human tragedy.',
          'Step 4: Explain rhetorical function: This shift strips away the illusion of administrative neutrality, forcing the audience to confront the horrific emotional reality masked by sanitized political language.'
        ],
        finalAnswer: 'A transition from clinical detachment to raw, emotive grief that unmasks administrative cruelty.',
        apScoringTip: 'Highlighting and explaining *tone shifts* is one of the most reliable ways to demonstrate sophisticated analytical insight.'
      }
    ],
    commonTraps: [
      'Simply listing devices without explaining their effect (the "device hunting" trap).',
      'Describing tone as simply "positive" or "negative." Use precise adjectives like "reverent," "cynical," "wistful," or "indignant."',
      'Confusing metonymy with metaphor. Metonymy relies on association; metaphor relies on comparison.'
    ],
    cramSheet: [
      'Anaphora = repeat at start; Epistrophe = repeat at end.',
      'Asyndeton = no conjunctions (fast); Polysyndeton = many conjunctions (slow, heavy).',
      'Periodic sentence = main idea at the very end (suspense).',
      'Never use broad tone words like "happy" or "sad"; use "euphoric", "somber", "satirical".'
    ]
  },

  // ==========================================
  // UNIT 6: MULTIPLE CHOICE: READING & REVISION
  // ==========================================
  {
    unitId: 'u6',
    unitNumber: 6,
    title: 'Multiple Choice: Reading & Revision',
    examWeight: '18%–22% of AP Exam',
    bigIdea: 'The AP Lang MCQ exam tests dual competencies: analytical reading of complex historical texts and writer-as-editor revision strategies.',
    keyTheorems: [
      {
        name: 'The Two Halves of the AP Lang MCQ Section',
        conditions: 'Taking Section I of the AP English Language and Composition Exam (45 Questions, 60 Minutes).',
        conclusion: 'Section I consists of: (1) Reading Questions (approx. 23–25 questions on 2–3 nonfiction passages): Tests comprehension of rhetorical strategies, argument structure, and word-in-context; (2) Writing/Revision Questions (approx. 20–22 questions on 3–4 draft passages): Tests your ability to act as an editor, improving thesis clarity, paragraph transitions, evidence strength, and syntactic cohesion.',
        apTip: 'Writing questions are faster to answer than Reading questions! Manage your time so you do not run out of minutes before reaching the high-efficiency revision passages.'
      },
      {
        name: 'The Rule of Contextual Sentence Placement',
        conditions: 'Solving "Where should sentence X be added?" or "Which transition word best connects sentences Y and Z?"',
        conclusion: 'A successfully placed sentence must link backward to the preceding idea through reference pronouns or semantic echo, and launch forward to the subsequent sentence without introducing abrupt thematic breaks.',
        apTip: 'Watch out for transition traps: "However" signals contrast, "Moreover" signals continuation, "Consequently" signals cause-and-effect. Test the relationship before choosing.'
      }
    ],
    formulas: [
      {
        name: 'MCQ Time Management Equation',
        latex: '\\frac{60 \\text{ minutes}}{45 \\text{ questions}} \\approx 1.33 \\text{ min/question} \\implies 13\\text{–}15 \\text{ min per passage set}',
        explanation: 'Spend ~15 min on Reading passage sets and ~10-12 min on Writing/Revision passage sets.'
      }
    ],
    sections: [
      {
        heading: '1. Writing / Revision Question Types & Decision Rules',
        content: `Standard question stems and winning strategies:

| Revision Task | Typical Question Stem | Winning Editorial Rule |
| :--- | :--- | :--- |
| **Adding a Thesis** | "Which choice best introduces the main argument of the passage?" | Pick the option that previews a line of reasoning, matches all subsequent paragraphs, and is defensible. |
| **Transition Selection** | "Which choice provides the most effective transition between sentences 4 and 5?" | Identify the logical relationship: Contrast (however), Addition (furthermore), Cause (therefore), or Concession (admittedly). |
| **Combining Sentences** | "Which choice most effectively combines sentences 8 and 9?" | Eliminate options with passive voice, unnecessary wordiness, comma splices, or dangling modifiers. Favor clarity and concise subordination. |
| **Evidence Enhancement** | "The writer wants to add evidence to support the claim in sentence 12. Which choice best accomplishes this?" | Select evidence that directly answers the claim with specific empirical data or concrete precedent, avoiding vague generalities. |
| **Deleting Text** | "Should the writer keep or delete the underlined sentence?" | Keep if it directly supports the paragraph’s topic; delete if it is an irrelevant digression or disrupts flow. |`
      }
    ,
      {
        heading: '2. MCQ Reading Comprehension vs. Revision Strategies (Skill 1.B, 2.B, 6.B)',
        content: `Strategic decision rules for the 45-question AP Lang Multiple Choice section:

* **Part 1: Reading Questions (Questions 1-22 to 25, ~2 passages)**:
  * Tests rhetorical comprehension of complex non-fiction texts (published 1600s-present).
  * **Strategy**: Read actively for the author's thesis, tone, and line of reasoning before checking questions.
  * Look for the **function** of sentences: *Why did the author place this anecdote here?* (Options often begin with active verbs: 'To qualify', 'To contextualize', 'To undermine').
* **Part 2: Writing / Revision Questions (Questions 23 to 45, ~3 passages)**:
  * You act as an expert editor revising a draft student essay.
  * **Decision Rules**:
    * **Sentence Addition/Deletion**: Keep sentences that provide relevant evidence directly developing the immediate paragraph topic; delete sentences that digress or introduce off-topic information.
    * **Transitions**: Identify the exact logical relationship between sentences: addition ('Furthermore'), contrast ('However'), or cause-and-effect ('Consequently').
    * **Syntactic Combining**: Choose options that eliminate passive voice, reduce wordiness, and create clean parallel structures.`
      }
    ],
    workedExamples: [
      {
        title: 'Mastering a Complex Reading MCQ Word-in-Context Item',
        topicRef: 'CED 6.1 Deconstructing Authorial Meaning',
        question: 'In a 19th-century essay, an author writes that an opposing statesman displayed "admirable dexterity in evading the constitutional dilemma." What does "dexterity" mean in this context?',
        solutionSteps: [
          'Step 1: Analyze literal definition: Physical skill or agility with one’s hands.',
          'Step 2: Read surrounding context: The statesman is "evading" a constitutional problem, avoiding a direct confrontation with the law.',
          'Step 3: Evaluate tone: The author is critiquing the evasion, meaning "admirable dexterity" is used with dry, sarcastic irony.',
          'Step 4: Conclude contextual meaning: Dexterity here means mental cleverness, adroitness, or manipulative evasion—not genuine virtue or physical grace.'
        ],
        finalAnswer: 'Clever political maneuvering or adroit evasion (used ironically).',
        apScoringTip: 'On historical prose questions, never pick the most common modern dictionary definition without verifying tone and historical context.'
      }
    ],
    commonTraps: [
      'Picking an answer choice that is factually true in real life, but not supported anywhere in the provided text.',
      'Selecting a revision sentence that sounds sophisticated but introduces a tangential topic not developed in the paragraph.',
      'Rushing through the passage and answering questions from memory. Always re-read 2 lines above and below the cited line number!'
    ],
    cramSheet: [
      '45 questions in 60 minutes: ~14 minutes per passage set.',
      'Reading questions test author intent, word-in-context, and structural function.',
      'Writing questions test grammar, transitions, thesis strength, and sentence placement.',
      'For transitions: Identify the relationship first (contrast, causality, addition) before looking at the choices.'
    ]
  },

  // ==========================================
  // UNIT 7: RHETORICAL ANALYSIS (FRQ 2 MASTERY)
  // ==========================================
  {
    unitId: 'u7',
    unitNumber: 7,
    title: 'Rhetorical Analysis & Analytical Verbs (FRQ 2)',
    examWeight: '14%–18% of AP Exam',
    bigIdea: 'High-scoring rhetorical analysis moves chronologically through the text, analyzing what the author DOES rather than merely what the author SAYS, deploying precise rhetorical action verbs.',
    keyTheorems: [
      {
        name: 'Functional Analysis vs. Device Hunting',
        conditions: 'Deconstructing an author’s craft in the Rhetorical Analysis Essay (Q2).',
        conclusion: 'Scorers penalize "device hunting" (merely pointing out metaphors, polysyndeton, or rhetorical questions). High-scoring essays explain how the author’s choices function chronologically to shift audience mindset, overcome resistance, and fulfill the exigence.',
        apTip: 'Never organize paragraphs by device (e.g. Paragraph 1: Diction, Paragraph 2: Repetition). Organize chronologically: Paragraph 1: How the author establishes early rapport; Paragraph 2: How the author intensifies moral urgency; Paragraph 3: How the author rallies the audience to action.'
      },
      {
        name: 'The Rhetorical Power Verbs Hierarchy',
        conditions: 'Formulating analytical claims about authorial strategy.',
        conclusion: 'Replace generic verbs like "uses," "shows," "mentions," and "says" with active rhetorical verbs: juxtaposes, excoriates, validates, lampoons, implores, delineates, subverts, galvanizes, lionizes.',
        apTip: 'Formula: [Author] [Active Verb] [Concept A] with [Concept B] in order to [Audience Reaction].'
      }
    ],
    formulas: [
      {
        name: 'Rhetorical Action Statement Formula',
        latex: '\\text{[Speaker]} + \\text{[Rhetorical Action Verb]} + \\text{[Strategic Textual Move]} + \\text{to [Alter Audience Belief]}',
        explanation: 'Example: "Kelley deliberately juxtaposes adolescent nocturnal toil with adult luxury to evoke moral culpability in enfranchised voters."'
      }
    ],
    sections: [
      {
        heading: '1. Rhetorical Choices vs. Analytical Verbs vs. Audience Effect Matrix',
        content: `Master taxonomy of rhetorical moves and precise vocabulary:

| Authorial Move | Active Rhetorical Verb | Textual Mechanism | Intended Audience Effect |
| :--- | :--- | :--- | :--- |
| **Contrasting Ideas** | *Juxtaposes, contrasts, bifurcates* | Places two opposing concepts side-by-side | Highlights stark moral hypocrisy, inequality, or urgency |
| **Severe Critique** | *Excoriates, reproaches, censures, castigates* | Harsh, unapologetic moral condemnation | Shatters complacency and forces immediate self-reckoning |
| **Urgent Request** | *Implores, entreats, beseeches, petitions* | Emotive supplication grounded in vulnerability | Evokes deep empathy, humanitarian duty, and moral obligation |
| **Mockery / Satire** | *Lampoons, satirizes, ridicules, derides* | Uses irony, hyperbole, or caricature | Exposes absurdity, discredits opponents, and provokes critical thought |
| **Clarifying Structure** | *Delineates, elucidates, demarcates* | Step-by-step analytical exposition | Reassures skeptics through crystalline, incontrovertible logic (Logos) |
| **Challenging Norms** | *Subverts, destabilizes, dismantles* | Inverts conventional wisdom or expectations | Unsettles traditional dogma and opens minds to radical alternatives |
| **Inspiring Action** | *Galvanizes, rallies, mobilizes* | Resonant calls to collective identity | Translates emotional conviction into tangible political or social action |`
      }
    ,
      {
        heading: '2. Chronological Textual Tracking vs. Feature Hunting (Skill 2.A, 4.A)',
        content: `High-scoring FRQ 2 (Rhetorical Analysis) execution methodology:

* **The 'Feature Hunting' Death Trap**:
  * Organizing essays around isolated literary devices (Paragraph 1 on Diction, Paragraph 2 on Metaphor, Paragraph 3 on Pathos).
  * This guarantees low scores because it isolates devices from their rhetorical function and fails to demonstrate how the author's argument develops over time!
* **Best-Practice Chronological Architecture**:
  * Trace the speaker's argument as it unfolds chronologically across three distinct movements:
    1. **Beginning (Orientation/Exigence)**: How the speaker establishes common ground, defines the immediate crisis, and builds moral credibility.
    2. **Middle (Development/Pivot)**: How the speaker shifts to emotional urgency, contrasts conflicting viewpoints, or presents empirical evidence.
    3. **End (Climax/Call to Action)**: How the speaker resolves tensions, offers a unified vision of the future, and compels immediate audience action.
* **Active Rhetorical Verbs to Deploy**:
  * Avoid weak passive verbs (*'The author uses diction to show...'*)
  * Use active power verbs: *delineates, subverts, galvanizes, repudiates, elucidates, lionizes, excoriates, contextualizes*!`
      }
    ],
    workedExamples: [
      {
        title: 'Drafting a Chronological FRQ 2 Body Paragraph',
        topicRef: 'CED 7.1 Chronological Functional Movement',
        question: 'Analyze how an author shifts from establishing initial common ground to delivering an uncompromising moral indictment.',
        solutionSteps: [
          'Step 1: Frame topic sentence around chronological movement: "After establishing shared patriotic reverence in the opening lines, the speaker pivots abruptly to excoriate the audience’s complicity in systemic injustice."',
          'Step 2: Embed text evidence smoothly: Citing the speaker’s shift from \\"fellow countrymen\\" to \\"your hypocritical celebrations.\\"',
          'Step 3: Analyze the rhetorical function: By initially disarming the audience’s defensive biases with flattery, the speaker lowers their guard, making the subsequent moral indictment hit with amplified psychological force.',
          'Step 4: Connect to ultimate purpose: This calculated pivot ensures the audience cannot deflect guilt, compelling them to re-examine their hollow declarations of freedom.'
        ],
        finalAnswer: 'A high-scoring paragraph analyzing the functional progression and audience psychology rather than isolated static figures of speech.',
        apScoringTip: 'Tracing shifts (tone shifts, perspective shifts, structural shifts) is the hallmark of upper-tier Row B (3–4 points) and Row C Sophistication.'
      }
    ],
    commonTraps: [
      'Writing "The author uses diction." Diction is just words! Always describe the nature of the diction: "sacred, biblical diction" or "clinical, bureaucratic diction."',
      'Writing a summary of the passage line by line without analyzing why the author made those specific choices.',
      'Forgetting the audience: Every rhetorical choice must connect back to how it alters the thoughts, feelings, or actions of the specific target listeners.'
    ],
    cramSheet: [
      'Organize FRQ 2 chronologically (Beginning ➔ Middle ➔ End) or by major functional shifts.',
      'Replace "uses" with active verbs: juxtaposes, excoriates, implores, delineates, subverts, galvanizes.',
      'Always answer the "So What?": Choice ➔ Function ➔ Audience Reaction ➔ Author’s Ultimate Purpose.',
      'Earn Row A (Thesis) by specifying choices and linking them directly to the author’s message.'
    ]
  },

  // ==========================================
  // UNIT 8: ARGUMENTATIVE ESSAY (FRQ 3 MASTERY)
  // ==========================================
  {
    unitId: 'u8',
    unitNumber: 8,
    title: 'Argumentative Writing & Evidence (FRQ 3)',
    examWeight: '14%–18% of AP Exam',
    bigIdea: 'The Argument Essay (Q3) tests your ability to take a defensible stance on an abstract claim, substantiating it with varied, specific evidence from history, literature, science, and current events.',
    keyTheorems: [
      {
        name: 'The CHELPS / REHUGO Evidence Architecture',
        conditions: 'Brainstorming diverse, specific evidence for Question 3.',
        conclusion: 'Top-scoring essays draw evidence from multiple distinct societal domains rather than relying solely on personal high school anecdotes: (C) Current Events, (H) History, (E) Experience, (L) Literature / Philosophy, (P) Politics / Pop Culture, (S) Science / Technology.',
        apTip: 'Historical and philosophical evidence carries the highest rhetorical weight. Grounding an abstract prompt in the American Civil Rights movement or the Industrial Revolution immediately signals academic maturity.'
      },
      {
        name: 'The Defend, Challenge, Qualify Strategic Spectrum',
        conditions: 'Selecting your stance on the prompt’s central assertion.',
        conclusion: 'While you can purely Defend (100% agree) or purely Challenge (100% disagree), Qualifying (agreeing under specific conditions while disputing others) provides the most natural path to nuanced analysis and the Row C Sophistication point.',
        apTip: 'Qualified Thesis Formula: "Although [Assertion] holds true regarding [Context A], it fundamentally fails in [Context B] because [Underlying Reason]."'
      }
    ],
    formulas: [
      {
        name: 'High-Yield Qualified Thesis Formula',
        latex: '\\text{Although } [\\text{Admit Counter-Reality}], \\text{ nevertheless } [\\text{Defend/Challenge Stance}] \\text{ because } [\\text{Core Line of Reasoning}]',
        explanation: 'Avoids absolutist binary thinking and sets up a robust line of reasoning with built-in concession.'
      }
    ],
    sections: [
      {
        heading: '1. CHELPS Evidence Taxonomy & Deployment Matrix',
        content: `How to select and deploy persuasive evidence domains on FRQ 3:

| Domain | Source Code | Best Used For | Exemplar Evidence Cases |
| :--- | :--- | :--- | :--- |
| **Current Events** | **C** | Demonstrating modern real-world urgency and relevance | Artificial intelligence regulation, climate policy summits, social media data privacy |
| **History** | **H** | Providing macro-scale precedent with documented long-term outcomes | Fall of Roman Republic, Civil Rights Act of 1964, Gilded Age labor movements |
| **Experience** | **E** | Humanizing arguments with vivid authenticity (use sparingly as sole proof) | Experiencing linguistic barriers in an immigrant family, working minimum-wage retail |
| **Literature** | **L** | Illustrating psychological, ethical, or archetypal truths | Orwell’s *1984* (surveillance), Miller’s *The Crucible* (mass hysteria), Fitzgerald’s *Gatsby* (materialism) |
| **Politics / Philosophy** | **P** | Grounding arguments in constitutional law and governance theories | Locke’s social contract, Machiavelli’s political pragmatism, Citizens United ruling |
| **Science / Technology** | **S** | Establishing empirical consensus and technological disruption | CRISPR gene editing ethics, neurobiology of screen addiction, renewable energy grids |`
      }
    ,
      {
        heading: '2. The CHELPS Evidence Taxonomies & Nuanced Qualification (Skill 3.C, 4.C)',
        content: `Brainstorming diverse, sophisticated evidence for FRQ 3 (Argument Essay):

* **The CHELPS Brainstorming Matrix**:
  * **C - Current Events**: Contemporary geopolitical conflicts, Supreme Court rulings, climate policy debates.
  * **H - History**: American Revolution, Gilded Age labor strikes, Civil Rights movement, Cold War containment.
  * **E - Economics & Environmental Science**: Free trade vs. protectionism, Tragedy of the Commons, resource allocation.
  * **L - Literature & Philosophy**: Classic texts (*1984*, *The Crucible*, *The Great Gatsby*), John Locke, Machiavelli.
  * **P - Pop Culture & Personal Experience**: Digital social media algorithms, modern artistic movements (use personal experience sparingly and elevated).
  * **S - Science & Tech**: Artificial intelligence ethics, genetic engineering, space exploration.
* **The Art of Nuanced Qualification**:
  * Immature arguments take an extreme, absolute 'all-or-nothing' binary stance.
  * Sophisticated writers **qualify their claims**, specifying under what conditions the assertion holds true and where its limitations lie:
    * *'While technological automation undeniably boosts aggregate industrial productivity, it simultaneously exacerbates localized structural unemployment, demanding state-sponsored worker retraining rather than unchecked laissez-faire adoption.'*`
      }
    ],
    workedExamples: [
      {
        title: 'Crafting a Sophisticated Qualified Argument (Q3)',
        topicRef: 'CED 8.2 Defend, Challenge, Qualify Mastery',
        question: 'Write a thesis and supporting outline responding to the prompt: "Is safety more valuable than freedom?"',
        solutionSteps: [
          'Step 1: Avoid simplistic binary: Saying safety is ALWAYS better or freedom is ALWAYS better is naive and historically false.',
          'Step 2: Establish qualified stance: Civil society requires a baseline of safety to exercise meaningful freedom, but surrendering fundamental liberties for total security inevitably breeds authoritarian tyranny.',
          'Step 3: Deploy Historical Evidence (Body 1): The post-9/11 USA PATRIOT Act—illustrating how fear justified indefinite detention and warrantless surveillance, eroding 4th Amendment rights without guaranteeing safety.',
          'Step 4: Deploy Philosophical / Political Evidence (Body 2): John Locke’s Social Contract—citizens surrender the unfettered liberty of the state of nature specifically to establish a government that protects property and bodily security; thus, safety is a prerequisite for liberty.',
          'Step 5: Concession & Rebuttal: Concede that emergency wartime measures may temporarily prioritize physical preservation (e.g. Abraham Lincoln suspending habeas corpus), but rebut that such measures must remain temporary exceptions rather than permanent precedents.'
        ],
        finalAnswer: 'A high-scoring, nuanced argument balancing philosophical governance theory with specific historical legal precedent.',
        apScoringTip: 'Specific details matter! Writing "after 9/11 people were scared" scores low. Writing "the passage of the 2001 USA PATRIOT Act expanded Title II electronic surveillance" scores high.'
      }
    ],
    commonTraps: [
      'Using hypothetical or fabricated evidence (e.g. "Imagine a guy named Bob..."). Real historical, literary, or current events are required.',
      'Writing an essay based entirely on generic personal anecdotes without demonstrating broad knowledge of the world.',
      'Drifting off topic: Always connect your evidence directly back to the key terms of the prompt in your commentary.'
    ],
    cramSheet: [
      'Use CHELPS (Current events, History, Experience, Literature, Politics, Science) to brainstorm.',
      'Qualifying your argument ("true in context X, but dangerous in context Y") is the most defensible approach.',
      'Provide specific details: Names, dates, legislation, and book titles over vague generalities.',
      'Spend at least 2 sentences of commentary for every sentence of evidence.'
    ]
  },

  // ==========================================
  // UNIT 9: CRAFTING NUANCED ARGUMENTS (ROW C SOPHISTICATION)
  // ==========================================
  {
    unitId: 'u9',
    unitNumber: 9,
    title: 'Nuance, Voice & The Sophistication Rubric',
    examWeight: '10%–14% of AP Exam',
    bigIdea: 'The coveted Row C Sophistication Point (1 point) is earned not by fancy vocabulary, but by demonstrating complex understanding, situating claims in broader contexts, and maintaining a compelling authorial voice.',
    keyTheorems: [
      {
        name: 'The Official College Board Row C Criteria',
        conditions: 'Earning the final point on the 6-point analytic scoring rubric for all three FRQ essays.',
        conclusion: 'A response may earn the sophistication point in one of three ways: (1) Crafting a nuanced argument by consistently identifying and exploring complexities or tensions; (2) Articulating the broader context or significance of the argument or rhetorical choices; (3) Employing a style that is consistently vivid, persuasive, and rhetorically compelling.',
        apTip: 'Sophistication is NOT a "check the box" award! It cannot be earned with a single clever sentence in your conclusion. Scorers must see depth of thought sustained throughout the entire essay.'
      },
      {
        name: 'The Mechanics of Genuine Qualification',
        conditions: 'Developing complexity in argumentative reasoning.',
        conclusion: 'Genuine qualification does not mean being wishy-washy. It means identifying the precise boundary conditions where your argument holds and where competing values legitimately prevail, resolving the tension with superior analysis.',
        apTip: 'Use concession transition frames: "Admittedly, proponents of [X] rightly observe [Y]; nevertheless, this logic falters when applied to [Z] because..."'
      }
    ],
    formulas: [
      {
        name: 'Sophistication Synthesis Equation',
        latex: '\\text{Specific Claim} + \\text{Broader Historical/Philosophical Context} + \\text{Unresolved Tension/Concession} \\implies \\text{Row C Earned}',
        explanation: 'Ground your specific topic in enduring human, cultural, or ethical dilemmas.'
      }
    ],
    sections: [
      {
        heading: '1. Row C Scoring Criteria & Decision Rules Matrix',
        content: `What College Board readers look for when awarding the Sophistication Point:

| Pathway | What EARNS the Point | What FAILS to Earn the Point |
| :--- | :--- | :--- |
| **Pathway 1: Broader Context** | Connecting the prompt to enduring philosophical, systemic, or historical debates (e.g. framing a local censorship issue within the tradition of Milton’s *Areopagitica*) | Dropping a random historical reference in the final sentence without weaving it into the essay’s line of reasoning |
| **Pathway 2: Exploring Tensions & Complexities** | Acknowledging legitimate counter-arguments, analyzing trade-offs, and explaining why competing values clash under specific real-world conditions | Simply inserting a standard "Some people disagree, but they are wrong" concession paragraph |
| **Pathway 3: Vivid & Persuasive Prose** | Sustained, mature sentence variety, precise and evocative diction, fresh metaphors, and effortless syntactic transitions | "Thesaurus abuse"—cramming arcane SAT words into awkward, run-on sentences that obscure meaning |`
      }
    ,
      {
        heading: '2. The 3 Pathways to Earning the Row C Sophistication Point (Rubric Row C)',
        content: `Deconstructing the official College Board criteria for the coveted Row C point:

* **Official Scoring Standard for Sophistication (1 Point)**:
  * Demonstrates an elevated, complex understanding of the rhetorical situation or subject matter, and/or displays a consistently persuasive, mature writing style throughout the entire response.
* **The 3 Official Scoring Pathways**:
  * **Pathway 1: Crafting a Nuanced Argument**:
    * Grappling with complexities, identifying unresolved tensions within the issue, and qualifying claims rather than defending simplistic absolutes.
  * **Pathway 2: Situating the Text in Broader Cultural/Historical Context**:
    * Linking the immediate argument to overarching philosophical movements, historical patterns, or broad socio-political implications beyond the prompt excerpt.
  * **Pathway 3: Mature, Engaging Prose Style**:
    * Employing vivid, precise diction, varied sentence structures (periodic sentences, parallelism), and a confident authorial voice free from formulaic template constraints.
* **Key Rubric Caveats**:
  * A single clever metaphor or a token sentence in the conclusion does NOT earn sophistication; the complexity must permeate the entire essay!`
      }
    ],
    workedExamples: [
      {
        title: 'Elevating an Adequate Argument to a Sophisticated Argument',
        topicRef: 'CED 9.1 Achieving Rubric Sophistication',
        question: 'Compare an adequate body paragraph with a sophisticated revision on the topic of technological surveillance.',
        solutionSteps: [
          'Step 1: Analyze adequate draft: "Surveillance by tech companies is bad because it takes away privacy. For example, apps track our location and sell it to advertisers. This makes people feel watched, which is a violation of human rights."',
          'Step 2: Diagnose weakness: Simplistic assertion, generic evidence, lacks line of reasoning, ignores why users willingly accept tracking.',
          'Step 3: Infuse complexity and tension: Why do consumers surrender privacy? For digital convenience, free services, and personalized efficiency.',
          'Step 4: Draft sophisticated revision: "The crisis of modern digital surveillance is not merely predatory corporate overreach, but a voluntary Faustian bargain struck by the consumer. In exchange for the algorithmic convenience of instant navigation and curated content, modern citizens willingly surrender biometric and locational autonomy. As philosopher Shoshana Zuboff delineates in her critique of surveillance capitalism, this dynamic privatizes human experience as raw behavioral data, subverting democratic self-determination not through authoritarian force, but through comfortable habituation."'
        ],
        finalAnswer: 'The revision contextualizes the problem historically, acknowledges user complicity, cites specialized scholarship, and features sophisticated syntactic flow.',
        apScoringTip: 'Show that you understand the underlying motives of both sides. When you explain WHY an opponent thinks the way they do, your essay instantly achieves academic sophistication.'
      }
    ],
    commonTraps: [
      'The "Thesaurus Trap": Using overly grand words incorrectly. Clarity and precision always trump decorative vocabulary.',
      'Tacking on a generic philosophical quote at the very end of your conclusion hoping to trick the reader into giving Row C.',
      'Contradicting yourself instead of qualifying: Make sure your concession does not disprove your own central thesis!'
    ],
    cramSheet: [
      'Row C is earned through: (1) Broader context, (2) Exploring tensions/complexities, or (3) Exceptional rhetorical style.',
      'Sophistication must be sustained throughout the essay, not a single one-off phrase.',
      'Explain the trade-offs: Almost no complex issue in modern society has an easy, black-and-white solution.',
      'Write with a confident, distinct authorial voice.'
    ]
  }
];

