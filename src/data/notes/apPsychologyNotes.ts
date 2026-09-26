import { APUnitNote } from './types';

export const AP_PSYCHOLOGY_NOTES: APUnitNote[] = [
  // ==========================================
  // UNIT 1: BIOLOGICAL BASES OF BEHAVIOR
  // ==========================================
  {
    unitId: 'u1',
    unitNumber: 1,
    title: 'Biological Bases of Behavior',
    examWeight: '18%–24% of AP Exam',
    bigIdea: 'All human thought, emotion, and action originate in biological structures—specifically the electrochemical transmission of neurons and neuroendocrine systems.',
    keyTheorems: [
      {
        name: 'The All-or-None Principle of Neural Firing',
        conditions: 'Depolarization of a neuron membrane past threshold potential.',
        conclusion: 'An action potential is generated if and only if membrane depolarization reaches the threshold ($\\approx -55\\text{ mV}$ from resting $-70\\text{ mV}$). The neuron fires completely at full electrical amplitude or not at all; a stronger stimulus increases firing *frequency*, never individual action potential *intensity*.',
        apTip: 'Students frequently mistakenly claim that a harder pinch causes "bigger" electrical pulses. It causes MORE FREQUENT action potentials, not larger ones!'
      },
      {
        name: 'Brain Lateralization and Hemispheric Specialization',
        conditions: 'Severing the corpus callosum (Split-Brain Patients: Sperry & Gazzaniga).',
        conclusion: 'The left hemisphere specializes in language production (Broca’s area), language comprehension (Wernicke’s area), and sequential logic. The right hemisphere specializes in spatial processing, facial recognition, and emotional perception. Sensory and motor pathways are contralateral (opposite-sided).',
        apTip: 'If a word is flashed to the LEFT visual field of a split-brain patient, it travels to the RIGHT hemisphere. The patient cannot verbally name the object, but can draw or pick it up with their LEFT hand!'
      }
    ],
    formulas: [
      {
        name: 'Resting Membrane Potential & Action Threshold',
        latex: 'V_{\\text{rest}} \\approx -70\\text{ mV} \\xrightarrow{\\text{Depolarization Threshold } \\approx -55\\text{ mV}} V_{\\text{peak}} \\approx +40\\text{ mV}',
        explanation: 'Sodium ions ($\\text{Na}^+$) rush in during depolarization; potassium ions ($\\text{K}^+$) exit during repolarization.'
      }
    ],
    sections: [
      {
        heading: '1. Neurotransmitter Function and Malfunction Matrix',
        content: `Essential neurochemicals, behavioral roles, and clinical pathologies:

| Neurotransmitter | Primary Function | Deficit Pathology | Surplus Pathology |
| :--- | :--- | :--- | :--- |
| **Dopamine** | Reward pathway, pleasure, motor control | Parkinson’s Disease (tremors, rigidity) | Schizophrenia (hallucinations, delusions), addiction |
| **Serotonin** | Mood regulation, sleep, hunger, arousal | Major Depressive Disorder, anxiety | Serotonin Syndrome, shivering, seizures |
| **Acetylcholine (ACh)** | Muscle action, motor movement, memory | Alzheimer’s Disease (ACh-producing neurons deteriorate) | Severe muscle convulsions (spasms) |
| **GABA** | Primary *inhibitory* neurotransmitter (calms CNS) | Insomnia, tremors, seizures, severe anxiety | Extreme sedation, lethargy, respiratory depression |
| **Glutamate** | Primary *excitatory* neurotransmitter (learning & memory) | Cognitive fog, lethargy, poor memory consolidation | Migraines, seizures (excitotoxicity; avoids MSG) |
| **Norepinephrine** | Alertness, arousal, fight-or-flight response | Depressive moods, fatigue, lack of focus (ADHD) | Anxiety, hypertension, panic attacks |
| **Endorphins** | Natural opiate-like pain relief and euphoric runner’s high | Chronic pain sensitivity | Inability to feel physiological pain warning signals |`
      }
    ,
      {
        heading: '2. Brain Anatomy, Limbic System & Split-Brain Research (CED 1.3-1.4)',
        content: `Neuroanatomy, hemispheric lateralization, and endocrine integration:

* **Cerebral Cortex Lobes**:
  * **Frontal Lobe**: Prefrontal executive functioning, moral reasoning, planning, primary motor cortex, and **Broca's Area** (speech production, left hemisphere only).
  * **Parietal Lobe**: Somatosensory cortex processing tactile touch, pressure, temperature, and spatial positioning.
  * **Occipital Lobe**: Primary visual cortex processing shapes, angles, color, and visual perception.
  * **Temporal Lobe**: Primary auditory cortex, facial recognition (fusiform gyrus), and **Wernicke's Area** (language comprehension, left hemisphere only).
* **The Limbic System (Emotion & Memory)**:
  * **Hippocampus**: Encodes and consolidates conscious, declarative memories into long-term storage.
  * **Amygdala**: Regulates intense primal emotions, particularly fear detection, anger, and threat conditioning.
  * **Hypothalamus**: Maintains internal bodily homeostasis; regulates the 'Four Fs' (Fighting, Fleeing, Feeding, and Reproduction); commands the endocrine system via the pituitary master gland.
* **Split-Brain Research (Sperry & Gazzaniga)**:
  * Severing the **corpus callosum** prevents communication between cerebral hemispheres.
  * An image flashed to the **left visual field** travels to the **right hemisphere**: Patient can point to the object with the left hand, but **CANNOT verbally name it** (speech requires the left hemisphere)!`
      }
    ],
    workedExamples: [
      {
        title: 'Split-Brain Contralateral Visual Processing (FRQ Classic)',
        topicRef: 'CED 1.3 Brain Hemispheric Lateralization',
        question: 'A split-brain patient stares at a central fixation cross. The word "KEY" is flashed to the left visual field, and the word "RING" is flashed to the right visual field. (a) What word can the patient verbally report seeing? (b) Which hand can the patient use to select the physical object behind a screen without looking?',
        solutionSteps: [
          'Step 1: Trace right visual field ("RING"): Light falls on the left half of each retina and travels to the LEFT hemisphere.',
          'Step 2: Check language capability: The LEFT hemisphere contains Broca’s area (speech production). The patient can verbally say "RING".',
          'Step 3: Trace left visual field ("KEY"): Light travels to the RIGHT hemisphere.',
          'Step 4: Check motor control: The RIGHT hemisphere controls the LEFT hand (contralateral control). The patient can feel behind the screen and pick up the "KEY" with their LEFT hand.',
          'Step 5: Synthesize complete answer: Verbally states "RING"; physically picks up the "KEY" with the left hand.'
        ],
        finalAnswer: '(a) The patient verbally reports seeing "RING". (b) The patient picks up the "KEY" using their LEFT hand.',
        apScoringTip: 'Remember the formula: Right Visual Field $\\rightarrow$ Left Hemisphere $\\rightarrow$ Speech (can say it). Left Visual Field $\\rightarrow$ Right Hemisphere $\\rightarrow$ Left Hand (can draw/touch it).'
      }
    ],
    diagrams: [
      {
        id: 'neuron_synapse',
        title: 'Electrochemical Synaptic Transmission',
        subtitle: 'Vesicle Exocytosis, Reuptake Transporters, and Postsynaptic Receptors',
        type: 'synapse_diagram',
        description: 'Diagram showing terminal button releasing neurotransmitter molecules across the 20nm synaptic cleft to bind with ligand-gated receptors on the postsynaptic dendrite.',
        takeaway: 'Neural communication is electrical within the neuron (action potential) and chemical between neurons (neurotransmitters across the synapse).'
      }
    ],
    commonTraps: [
      'Believing we only use 10% of our brain. Neuroimaging (fMRI, PET) proves virtually the entire brain is active across various tasks.',
      'Confusing the sympathetic and parasympathetic nervous systems. Sympathetic = Fight or Flight (arouses; pupils dilate, heart rate spikes); Parasympathetic = Rest and Digest (calms; stimulates digestion).',
      'Confusing Broca’s Area (speech production in frontal lobe) with Wernicke’s Area (language comprehension in temporal lobe).'
    ],
    cramSheet: [
      'Action potential: All-or-None; $-70\\text{ mV} \\rightarrow -55\\text{ mV threshold} \\rightarrow +40\\text{ mV}$.',
      'Dopamine: High = Schizophrenia, Low = Parkinson’s.',
      'Serotonin: Low = Depression; Acetylcholine: Low = Alzheimer’s.',
      'Sympathetic = Arousal/Fight; Parasympathetic = Calming/Digest.',
      'Broca = Speech production; Wernicke = Language comprehension.'
    ]
  },

  // ==========================================
  // UNIT 2: COGNITION & MEMORY
  // ==========================================
  {
    unitId: 'u2',
    unitNumber: 2,
    title: 'Cognition & Memory',
    examWeight: '18%–24% of AP Exam',
    bigIdea: 'Human memory is constructive rather than photographic, operating through multi-stage encoding, storage, and retrieval vulnerable to cognitive heuristics and biases.',
    keyTheorems: [
      {
        name: 'Atkinson-Shiffrin Three-Stage Memory Model',
        conditions: 'Information processing from external environment into permanent storage.',
        conclusion: 'Sensory Memory (iconic <1s, echoic 3–4s) $\\xrightarrow{\\text{Selective Attention}}$ Short-Term/Working Memory (capacity $7 \\pm 2$ chunks, duration ~20–30s without rehearsal) $\\xrightarrow{\\text{Elaborative Rehearsal}}$ Long-Term Memory (virtually unlimited capacity and permanent duration).',
        apTip: 'Maintenance rehearsal (repeating a phone number) keeps data in working memory; elaborative rehearsal (connecting it to personal meaning) encodes it into long-term memory.'
      },
      {
        name: 'Elizabeth Loftus Misinformation Effect & Constructive Memory',
        conditions: 'Eyewitness testimony and memory retrieval following suggestive post-event information.',
        conclusion: 'Memory is not a video recording. Exposing witnesses to misleading post-event information (e.g. asking "How fast were the cars going when they *smashed* vs. *hit* each other?") reconstructs the original memory trace, leading participants to falsely recall non-existent broken glass.',
        apTip: 'Source Amnesia is attributing an event to the wrong source—believing you personally experienced something you merely heard in a story or dreamed.'
      }
    ],
    formulas: [
      {
        name: 'Ebbinghaus Forgetting Curve',
        latex: 'R = e^{-\\frac{t}{S}}',
        explanation: 'Retention ($R$) drops exponentially within the first 24–48 hours unless reinforced by spaced retrieval practice.'
      }
    ],
    sections: [
      {
        heading: '1. Long-Term Memory Taxonomy',
        content: `Classification of human long-term memory systems:

| Memory Category | Sub-Type | Anatomical Brain Structure | Concrete Example |
| :--- | :--- | :--- | :--- |
| **Explicit (Declarative)** | **Episodic** | Hippocampus & Prefrontal Cortex | Recalling what you ate for breakfast or your 16th birthday party |
| **Explicit (Declarative)** | **Semantic** | Hippocampus & Neocortex | Knowing that Paris is the capital of France or that $E=mc^2$ |
| **Implicit (Non-declarative)** | **Procedural** | Cerebellum & Basal Ganglia | Muscle memory for riding a bicycle, swimming, or typing |
| **Implicit (Non-declarative)** | **Conditioning** | Amygdala & Cerebellum | Flinching at the sound of a dentist's drill or salivating at food smells |`
      }
    ,
      {
        heading: '2. Heuristics, Cognitive Biases & Language Acquisition (CED 2.3-2.4)',
        content: `Problem-solving strategies, systemic cognitive distortions, and linguistic development:

* **Algorithms vs. Heuristics**:
  * **Algorithm**: Step-by-step exhaustive rule guaranteed to produce a correct solution (slow, resource-intensive).
  * **Heuristic**: Mental shortcut / 'rule of thumb' providing rapid problem-solving but prone to predictable errors.
* **Classic Cognitive Biases**:
  * **Availability Heuristic**: Estimating the frequency or likelihood of an event based on how easily examples come to mind (e.g. fearing plane crashes or shark attacks over car crashes due to vivid news coverage).
  * **Representativeness Heuristic**: Judging the probability of an event by comparing it to a prototype or stereotype while ignoring base-rate statistical realities.
  * **Confirmation Bias**: Actively seeking and remembering information that validates pre-existing beliefs while ignoring contradictory evidence.
  * **Functional Fixedness**: Inability to perceive an object being used for purposes other than its customary designed role.
* **Language Structural Hierarchy**:
  * **Phoneme**: Smallest distinctive unit of sound in a language (e.g. /k/, /a/, /t/).
  * **Morpheme**: Smallest unit of meaningful language (e.g. 'un-', 'break-', '-able').
  * **Noam Chomsky's Nativist Theory**: Humans possess an innate biological Language Acquisition Device (LAD) with universal grammar principles, opposing B.F. Skinner's purely behaviorist imitation model.`
      }
    ],
    workedExamples: [
      {
        title: 'Differentiating Proactive vs. Retroactive Interference',
        topicRef: 'CED 2.4 Retrieval Failure & Interference',
        question: 'Sarah studied Spanish for 3 years in middle school. Now in high school, she is enrolled in French. During her French exam, she accidentally writes Spanish words instead of French words. Which type of interference is occurring, and why?',
        solutionSteps: [
          'Step 1: Identify OLD learning: Spanish vocabulary.',
          'Step 2: Identify NEW learning: French vocabulary.',
          'Step 3: Identify what is being interfered with: Her ability to recall the NEW French vocabulary is impaired by the OLD Spanish.',
          'Step 4: Apply the PORN mnemonic: **P**ROACTIVE = **O**LD interferes with new; **R**ETROACTIVE = **N**EW interferes with old.',
          'Step 5: Conclude: Old Spanish blocks New French $\\implies$ **Proactive Interference**.'
        ],
        finalAnswer: 'Proactive Interference; past learning (Spanish) disrupts retrieval of recently learned information (French).',
        apScoringTip: 'Memorize the mnemonic PORN: Proactive = Old breaks new; Retroactive = New breaks old.'
      }
    ],
    diagrams: [
      {
        id: 'ebbinghaus_curve',
        title: 'Ebbinghaus Forgetting Curve & Spacing Effect',
        subtitle: 'Exponential Decay vs. Spaced Repetition Reinforcement',
        type: 'forgetting_curve',
        description: 'Graph showing rapid initial memory loss stabilizing over time, with spaced reviews flattening the decay curve to achieve near-100% permanent retention.',
        takeaway: 'Cramming causes rapid decay; distributed practice builds durable long-term memory traces.'
      }
    ],
    commonTraps: [
      'Confusing the availability heuristic with the representativeness heuristic. Availability = based on how easily examples come to mind (e.g. fearing plane crashes after seeing news). Representativeness = based on stereotypes or prototypical similarity (e.g. assuming a quiet glasses-wearer is a librarian).',
      'Confusing retrograde amnesia (cannot remember past memories before injury) with anterograde amnesia (cannot form new long-term explicit memories, like patient H.M.).',
      'Believing algorithm vs. heuristic: Algorithms guarantee a solution (step-by-step formula); heuristics are fast mental shortcuts prone to systematic bias.'
    ],
    cramSheet: [
      'PORN: Proactive (Old interferes with new) | Retroactive (New interferes with old).',
      'Implicit memory (procedural) = Cerebellum & Basal Ganglia.',
      'Explicit memory (episodic & semantic) = Hippocampus.',
      'Availability Heuristic = memory recency/vividness; Representativeness = prototype matching.',
      'Loftus: Leading questions alter memory reconstruction (Misinformation Effect).'
    ]
  },

  // ==========================================
  // UNIT 3: DEVELOPMENT & LEARNING
  // ==========================================
  {
    unitId: 'u3',
    unitNumber: 3,
    title: 'Development & Learning',
    examWeight: '16%–22% of AP Exam',
    bigIdea: 'Human cognition and behavior evolve across the lifespan through biological maturation, classical and operant conditioning, and social observational modeling.',
    keyTheorems: [
      {
        name: 'Classical Conditioning Principles (Ivan Pavlov)',
        conditions: 'Associative learning pairing a neutral stimulus with an unconditioned stimulus.',
        conclusion: 'An Unconditioned Stimulus (UCS: food) naturally triggers an Unconditioned Response (UCR: salivation). Repeatedly pairing a Neutral Stimulus (NS: bell) before the UCS turns the NS into a Conditioned Stimulus (CS), triggering a Conditioned Response (CR: salivation to bell alone).',
        apTip: 'The Unconditioned Response (UCR) and Conditioned Response (CR) are usually the exact same physiological behavior (e.g. salivation, fear); they differ ONLY in what stimulus triggers them!'
      },
      {
        name: 'Operant Conditioning & Schedules of Reinforcement (B.F. Skinner)',
        conditions: 'Shaping voluntary behavior via consequences (reinforcement vs. punishment).',
        conclusion: 'Positive adds a stimulus; Negative removes a stimulus. Reinforcement increases behavior; Punishment decreases behavior. Variable-Ratio schedules produce the highest rates of responding and greatest resistance to extinction (e.g. slot machines).',
        apTip: 'Negative reinforcement is NOT punishment! Negative reinforcement INCREASES a behavior by removing an unpleasant stimulus (e.g. taking an aspirin removes a headache, so you take aspirin again in the future).'
      }
    ],
    formulas: [
      {
        name: 'Operant Consequence Matrix Formula',
        latex: '\\text{Operant Effect} = (\\text{Positive [Add]} \\mid \\text{Negative [Remove]}) \\times (\\text{Reinforcement } [\\uparrow] \\mid \\text{Punishment } [\\downarrow])',
        explanation: 'Four quadrant matrix: Positive Reinforcement ($+\\uparrow$), Negative Reinforcement ($-\\uparrow$), Positive Punishment ($+\\downarrow$), Negative Punishment ($-\\downarrow$).'
      }
    ],
    sections: [
      {
        heading: '1. Developmental Stages Synthesis (Piaget, Erikson, Kohlberg)',
        content: `Cross-paradigm comparison of lifelong developmental milestones:

| Developmental Stage | Piaget (Cognitive) | Erikson (Psychosocial Crisis) | Kohlberg (Moral Reasoning) |
| :--- | :--- | :--- | :--- |
| **Infancy (0–2)** | **Sensorimotor**: Object permanence acquired (~8 mo), stranger anxiety | **Trust vs. Mistrust**: Needs met reliably by caregiver | N/A (Pre-moral) |
| **Early Childhood (2–7)** | **Preoperational**: Egocentrism, animism, lack conservation | **Autonomy vs. Shame** / **Initiative vs. Guilt** | **Preconventional**: Avoid punishment, gain tangible reward |
| **Middle Childhood (7–11)**| **Concrete Operational**: Conservation mastered, mathematical operations | **Industry vs. Inferiority**: Competence in peer tasks | **Conventional**: Gain social approval ("good boy/girl"), obey law/order |
| **Adolescence (12–18)** | **Formal Operational**: Abstract hypotheses, moral reasoning | **Identity vs. Role Confusion**: Refining sense of self | **Postconventional**: Social contract, universal ethical principles |
| **Adulthood (19+)** | Formal Operational continues; post-formal dialectical thought | **Intimacy vs. Isolation** $\\rightarrow$ **Generativity** $\\rightarrow$ **Integrity vs. Despair** | Postconventional: Autonomous ethical conscience |`
      }
    ,
      {
        heading: '2. Operant Reinforcement Schedules & Observational Learning (CED 3.2 & 3.4)',
        content: `Behavioral conditioning schedules and social learning dynamics:

* **The 4 Schedules of Partial Reinforcement**:
  * **Fixed-Ratio (FR)**: Reward delivered after an invariant, set number of responses (e.g. factory piecework bonus every 10 items; produces high response rates with brief post-reinforcement pauses).
  * **Variable-Ratio (VR)**: Reward delivered after an unpredictable, varying number of responses (e.g. slot machines, lottery tickets; produces the **highest, steepest rate of responding** and greatest resistance to extinction!).
  * **Fixed-Interval (FI)**: Reward delivered for first response after a fixed period of time (e.g. checking mail every 24 hours, studying before scheduled Friday exams; produces a distinctive **scalloped response curve**).
  * **Variable-Interval (VI)**: Reward delivered for first response after unpredictable time durations (e.g. checking phone notifications, fishing; produces slow, steady, persistent responding).
* **Albert Bandura's Social Learning Theory**:
  * Children observing aggressive adult models striking an inflatable Bobo Doll exhibited novel aggressive behaviors through **observational modeling**, even without receiving direct reinforcement!
  * Driven by internal **vicarious reinforcement** and biological mirror neuron systems.`
      }
    ],
    workedExamples: [
      {
        title: 'Classifying Operant Schedules and Conditioning Mechanisms',
        topicRef: 'CED 3.2 Operant Conditioning Schedules',
        question: 'Identify the reinforcement schedule in each scenario: (1) A telemarketer receives a commission after an unpredictable number of successful sales calls. (2) A student receives a grade every Friday after submitting weekly homework.',
        solutionSteps: [
          'Step 1: Scenario 1 - Check if reinforcer depends on number of responses or time elapsed: Depends on number of sales calls $\\implies$ Ratio schedule.',
          'Step 2: Check if predictability is constant or variable: Unpredictable number $\\implies$ **Variable-Ratio (VR)**.',
          'Step 3: Scenario 2 - Check dependency: Depends on time elapsed (every Friday) $\\implies$ Interval schedule.',
          'Step 4: Check predictability: Set, predictable time every week $\\implies$ **Fixed-Interval (FI)**.'
        ],
        finalAnswer: '(1) Variable-Ratio (VR) schedule. (2) Fixed-Interval (FI) schedule.',
        apScoringTip: 'Remember: Ratio = Number of behaviors; Interval = Clock/Time elapsed. Variable = Average/Unpredictable; Fixed = Set/Consistent.'
      }
    ],
    diagrams: [
      {
        id: 'reinforcement_schedules',
        title: 'Cumulative Response Graph for Reinforcement Schedules',
        subtitle: 'Variable-Ratio vs. Fixed-Ratio vs. Variable-Interval vs. Fixed-Interval',
        type: 'reinforcement_curves',
        description: 'Graph showing steep, steady response line for Variable-Ratio (slot machine), scalloped pause-and-burst curve for Fixed-Interval (studying before Friday exam).',
        takeaway: 'Variable-Ratio yields the highest sustained response rate and is the most resistant to extinction.'
      }
    ],
    commonTraps: [
      'Assuming "negative reinforcement" means punishment. Reinforcement always increases behavior; negative means removing something averse.',
      'Confusing Piaget’s assimilation with accommodation. Assimilation = interpreting new experiences into existing schemas (calling a moose a "cow"). Accommodation = changing the schema to incorporate new information (creating a separate "moose" category).',
      'Thinking Bandura’s Bobo doll experiment proved only that kids copy aggression. It proved vicarious reinforcement—children were more aggressive when the model was rewarded, and restrained when the model was punished.'
    ],
    cramSheet: [
      'Classical conditioning = involuntary associations (Pavlov); Operant = voluntary behaviors & consequences (Skinner).',
      'Positive = ADD; Negative = REMOVE; Reinforce = INCREASE; Punish = DECREASE.',
      'Schedules: VR (gambling, highest rate), FR (piecework), VI (pop quiz), FI (weekly paycheck).',
      'Piaget stages: Sensorimotor $\\rightarrow$ Preoperational $\\rightarrow$ Concrete $\\rightarrow$ Formal.',
      'Harlow monkey study: Contact comfort is preferred over food/nourishment alone.'
    ]
  },

  // ==========================================
  // UNIT 4: SOCIAL PSYCHOLOGY & PERSONALITY
  // ==========================================
  {
    unitId: 'u4',
    unitNumber: 4,
    title: 'Social Psychology & Personality',
    examWeight: '16%–22% of AP Exam',
    bigIdea: 'Social environments, group dynamics, attribution biases, and personality traits dynamically govern interpersonal behavior and conformity.',
    keyTheorems: [
      {
        name: 'The Fundamental Attribution Error (FAE)',
        conditions: 'Explaining the observed behaviors of others versus ourselves.',
        conclusion: 'When analyzing others’ behavior, observers systematically overestimate dispositional (internal personality) traits and underestimate situational (external environmental) factors. For our own failures, the Actor-Observer Bias and Self-Serving Bias cause us to blame external circumstances while crediting internal traits for our successes.',
        apTip: 'If someone cuts you off in traffic, thinking "They are a reckless jerk" is the Fundamental Attribution Error. Acknowledging "Maybe their passenger has a medical emergency" accounts for the situational factor.'
      },
      {
        name: 'Milgram Obedience & Asch Conformity Experiments',
        conditions: 'Social pressure from authority figures or unanimous peer groups.',
        conclusion: 'Solomon Asch proved ~75% of participants conform to an obviously incorrect unanimous group line judgment at least once. Stanley Milgram proved ~65% of normal adult participants delivered maximum lethal-level 450-volt shocks to an innocent learner under direct commands from an authoritative experimenter in a white lab coat.',
        apTip: 'Obedience drops dramatically when the authority figure is physically distant, when the victim is visible in the same room, or when an ally rebels.'
      }
    ],
    formulas: [
      {
        name: 'Cognitive Dissonance Resolution Model (Festinger)',
        latex: '\\Delta \\text{Dissonance} = |\\text{Belief} - \\text{Behavior}| \\implies \\text{Align Beliefs to Match Behavior}',
        explanation: 'When behavior conflicts with internal beliefs, individuals experience psychological discomfort and rationalize by altering their beliefs.'
      }
    ],
    sections: [
      {
        heading: '1. Group Dynamics and Social Influence Matrix',
        content: `Key social psychological phenomena:

| Phenomenon | Definition | Real-World / Experimental Example |
| :--- | :--- | :--- |
| **Social Facilitation** | Improved performance on simple/well-learned tasks in the presence of an audience | A skilled violinist plays faster and more accurately in front of a packed concert hall |
| **Social Loafing** | Tendency to exert less effort when pooling efforts toward a common group goal | Group project where one student slacks off because individual contributions are not measured |
| **Deindividuation** | Loss of self-awareness and self-restraint in anonymous, high-arousal group settings | Rioting fans overturning cars, cyberbullying behind anonymous usernames, KKK hoods |
| **Group Polarization** | Enhancement of a group's prevailing inclinations through mutual discussion | A group of moderately eco-friendly students becomes radical activists after discussing climate policy |
| **Groupthink** | Mode of thinking that occurs when desire for harmony overrides realistic appraisal | Bay of Pigs invasion, Challenger shuttle launch; dissenting voices remain silent |
| **Bystander Effect** | Tendency for any given bystander to be less likely to give aid if other bystanders are present | Kitty Genovese case; diffusion of responsibility ("Someone else will call 911") |`
      }
    ,
      {
        heading: '2. The Big Five Traits & Classic Social Influence Experiments (CED 4.3 & 4.4)',
        content: `Trait personality models and landmark social psychological paradigms:

* **The Big Five Personality Dimensions (OCEAN Trait Model)**:
  * **O - Openness to Experience**: Curiosity, intellectual exploration, and artistic appreciation vs. conventionality.
  * **C - Conscientiousness**: Self-discipline, organization, dependability, and goal-directed persistence.
  * **E - Extraversion**: Sociability, assertiveness, talkativeness, and outward energy stimulation.
  * **A - Agreeableness**: Empathy, trust, cooperativeness, and altruistic concern for others.
  * **N - Neuroticism**: Emotional instability, anxiety, vulnerability to stress, and negative emotionality.
* **Landmark Social Psychology Experiments**:
  * **Stanley Milgram (Obedience Study)**: Over $65\%$ of ordinary participants complied with instructions from a perceived legitimate authority figure to administer what they believed were dangerous $450\\text{V}$ electric shocks to an innocent confederate.
  * **Solomon Asch (Conformity Study)**: Over $75\%$ of participants conformed to an obviously erroneous majority line-judgment at least once, demonstrating **normative social influence** (desire to gain social approval and avoid rejection).
  * **Philip Zimbardo (Stanford Prison Experiment)**: Healthy college students randomly assigned to roles of guards or prisoners rapidly internalized simulated social roles, illustrating the power of situational demands and **deindividuation**.`
      }
    ],
    workedExamples: [
      {
        title: 'Evaluating the Big Five Personality Inventory (OCEAN)',
        topicRef: 'CED 4.4 Trait Theories of Personality',
        question: 'A candidate scores high in Openness and Conscientiousness, moderate in Extraversion, and low in Neuroticism. Describe their characteristic workplace behaviors.',
        solutionSteps: [
          'Step 1: Openness (High): Highly imaginative, curious, receptive to novel ideas, intellectual variety.',
          'Step 2: Conscientiousness (High): Organized, disciplined, dependable, detail-oriented, goal-driven.',
          'Step 3: Extraversion (Moderate): Balanced between collaborative team projects and quiet independent focus.',
          'Step 4: Neuroticism (Low): Emotionally stable, calm under intense pressure, resilient against anxiety.',
          'Step 5: Synthesize workplace profile: An innovative, highly organized, and emotionally composed project leader.'
        ],
        finalAnswer: 'A disciplined, creative, and calm professional who handles stress effectively and delivers structured innovation.',
        apScoringTip: 'Remember the OCEAN acronym: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.'
      }
    ],
    diagrams: [
      {
        id: 'bystander_diffusion',
        title: 'The Bystander Effect and Diffusion of Responsibility',
        subtitle: 'Probability of Helping as a Function of Group Size',
        type: 'bystander_curve',
        description: 'Bar graph showing lone bystanders helping within 45 seconds (85% intervention rate) dropping to under 30% when in groups of 5 or more.',
        takeaway: 'As group size grows, individual responsibility diffuses, paralyzing prosocial action.'
      }
    ],
    commonTraps: [
      'Confusing deindividuation with social loafing. Deindividuation = anonymous bad behavior (rioting); Social Loafing = slacking off on group work.',
      'Confusing foot-in-the-door (small request first $\\rightarrow$ larger request later) with door-in-the-face (unreasonable huge request first rejected $\\rightarrow$ compromise smaller request accepted).',
      'Assuming Milgram tested conformity. Milgram tested OBEDIENCE to authority; Asch tested CONFORMITY to peers.'
    ],
    cramSheet: [
      'Big Five (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
      'Milgram = Obedience (65% to 450V); Asch = Conformity (line test ~75% conformed).',
      'Fundamental Attribution Error: Blame personality for others, blame situation for self.',
      'Cognitive dissonance: Discomfort from conflicting beliefs and actions leads to changing beliefs.',
      'Bystander effect is caused by diffusion of responsibility and pluralistic ignorance.'
    ]
  },

  // ==========================================
  // UNIT 5: MENTAL & PHYSICAL HEALTH
  // ==========================================
  {
    unitId: 'u5',
    unitNumber: 5,
    title: 'Mental & Physical Health',
    examWeight: '18%–24% of AP Exam',
    bigIdea: 'Psychological disorders are classified via the DSM-5 through the biopsychosocial model and treated using evidence-based medical and psychotherapy modalities.',
    keyTheorems: [
      {
        name: 'The Biopsychosocial Model and Diathesis-Stress Theory',
        conditions: 'Etiology and onset of psychological disorders.',
        conclusion: 'Mental illness cannot be reduced to a single cause. The Diathesis-Stress model posits that an individual inherits a biological predisposition (diathesis: genetic vulnerability, neurochemical imbalance) that remains latent until triggered by environmental stress (trauma, poverty, grief).',
        apTip: 'Identical twins discordant for schizophrenia prove the Diathesis-Stress model: both possess the genetic vulnerability, but differing environmental stressors trigger symptoms.'
      },
      {
        name: 'Cognitive-Behavioral Therapy (CBT) Mechanics',
        conditions: 'Treating depression, anxiety, and obsessive-compulsive disorders (Aaron Beck & Albert Ellis).',
        conclusion: 'Psychological distress is maintained by cognitive distortions (catastrophizing, all-or-nothing thinking). CBT actively reframes maladaptive automatic thoughts and combines cognitive restructuring with behavioral activation and exposure therapy to break self-reinforcing cycles.',
        apTip: 'Systematic desensitization (Joseph Wolpe) treats phobias through classical counter-conditioning: pairing relaxation techniques with a graduated anxiety hierarchy.'
      }
    ],
    formulas: [
      {
        name: 'General Adaptation Syndrome (GAS) Stages',
        latex: '\\text{Stress Encounter} \\rightarrow \\text{1. Alarm (Fight/Flight)} \\rightarrow \\text{2. Resistance (Cortisol)} \\rightarrow \\text{3. Exhaustion (Immune Collapse)}',
        explanation: 'Hans Selye’s three-stage model showing the physical body’s physiological response to chronic stress.'
      }
    ],
    sections: [
      {
        heading: '1. DSM-5 Major Psychological Disorders Taxonomy',
        content: `Diagnostic criteria, symptom profiles, and clinical evidence:

| Disorder Category | Diagnostic Entity | Hallmark Symptoms | Primary Neurological / Etiological Factors |
| :--- | :--- | :--- | :--- |
| **Mood Disorders** | **Major Depressive Disorder (MDD)** | Depressed mood, anhedonia (loss of pleasure), fatigue, suicidal ideation for $>2$ weeks | Low serotonin & norepinephrine; hyperactive amygdala, shrunken hippocampus |
| **Mood Disorders** | **Bipolar Disorder** | Alternating periods of major depressive episodes and mania (hyperactivity, euphoria, flight of ideas) | Strong genetic heritability; treated with Lithium carbonate |
| **Anxiety Disorders** | **Generalized Anxiety Disorder (GAD)** | Chronic, unexplainable worry lasting $>6$ months, muscle tension, autonomic arousal | Deficiency in inhibitory neurotransmitter GABA; hyper-reactive autonomic nervous system |
| **Anxiety Disorders** | **Panic Disorder & Agoraphobia** | Recurrent unprovoked panic attacks (chest pain, choking) leading to fear of public spaces | Abrupt sympathetic surge; misinterpretation of physiological sensations |
| **Obsessive-Compulsive** | **OCD** | Obsessions (intrusive unwanted thoughts) causing anxiety relieved by Compulsions (repetitive rituals) | Hyperactive anterior cingulate cortex; orbitofrontal cortex dysfunction |
| **Psychotic Disorders** | **Schizophrenia** | Positive: Hallucinations (auditory), delusions (persecution/grandeur). Negative: Flat affect, catatonia | Excess dopamine receptor density ($D_2$); enlarged fluid-filled brain ventricles |
| **Trauma & Stress** | **PTSD** | Flashbacks, hypervigilance, nightmare reliving, emotional numbing $>1$ month | Persistent sympathetic activation, traumatic memory consolidation failure |`
      }
    ,
      {
        heading: '2. Stress Physiology (Selye\'s GAS) & Evidence-Based Therapies (CED 5.3-5.5)',
        content: `Somatic stress mechanisms and clinical therapeutic interventions:

* **Hans Selye's General Adaptation Syndrome (GAS)**:
  * **Stage 1: Alarm Reaction**: Immediate sympathetic nervous system 'fight-or-flight' surge; release of epinephrine, norepinephrine, and cortisol; heart rate and respiration escalate.
  * **Stage 2: Resistance**: Body remains on physiological high alert to cope with ongoing chronic stressor; glucose levels and blood pressure remain elevated while non-essential digestive functions suppress.
  * **Stage 3: Exhaustion**: Prolonged stress depletes bodily reserves; severe vulnerability to physical illness, immunosuppression, organ damage, and chronic depression.
* **Evidence-Based Therapeutic Approaches**:
  * **Cognitive-Behavioral Therapy (CBT - Beck & Ellis)**: Pinpoints and restructures irrational cognitive distortions (e.g. catastrophizing, black-and-white thinking) through collaborative cognitive reappraisal and behavioral activation.
  * **Behavioral Therapy (Wolpe)**: Systematic desensitization pairing progressive relaxation with an anxiety hierarchy to eliminate conditioned phobias through counterconditioning.
  * **Biological Psychopharmacology**:
    * **SSRIs (Selective Serotonin Reuptake Inhibitors)**: Prolong serotonin availability in the synaptic cleft to treat major depressive and anxiety disorders.
    * **Antipsychotics (Neuroleptics)**: Antagonize dopamine $D_2$ receptors to manage positive symptoms of schizophrenia.`
      }
    ],
    workedExamples: [
      {
        title: 'Prescribing Treatment Modalities for Clinical Presentations',
        topicRef: 'CED 5.5 Biomedical and Psychological Therapies',
        question: 'A patient presents with a paralyzing phobia of flying (aerophobia) that threatens their career. Compare how a psychoanalyst, a behavioral therapist, and a psychiatrist would approach treatment.',
        solutionSteps: [
          'Step 1: Psychoanalytic Approach (Freud): Trace the phobia back to repressed childhood trauma or unconscious psychosexual conflicts through free association and dream analysis.',
          'Step 2: Behavioral Approach (Wolpe/Watson): Treat the phobia as a learned conditioned response. Apply Systematic Desensitization: teach diaphragmatic breathing and progressively expose the patient from reading flight schedules up to virtual reality cockpit simulations.',
          'Step 3: Biomedical Approach (Psychiatrist): Treat the neurochemical symptom. Prescribe a fast-acting GABA agonist (e.g. benzodiazepine like Xanax) for situational use immediately before boarding.',
          'Step 4: Contrast efficacy: Behavioral therapy produces permanent extinction of the fear response; medication offers immediate short-term relief without addressing the conditioned trigger.'
        ],
        finalAnswer: 'Psychoanalysis seeks unconscious childhood origins; Behavioral therapy uses systematic desensitization; Biomedical therapy uses GABA-enhancing anxiolytics.',
        apScoringTip: 'On FRQs, never just name a therapy. Always explain the *exact mechanism* (e.g. "Systematic desensitization pairs relaxation with a fear hierarchy to extinguish the conditioned fear").'
      }
    ],
    diagrams: [
      {
        id: 'selve_gas_model',
        title: 'Hans Selye’s General Adaptation Syndrome (GAS)',
        subtitle: 'Physiological Resistance Over Time Under Chronic Stress',
        type: 'gas_curve',
        description: 'Waveform curve displaying immediate dip in Alarm stage, prolonged high plateau during Resistance, and catastrophic plunge into Exhaustion.',
        takeaway: 'Prolonged high cortisol during the Resistance stage eventually exhausts adrenal reserves, inducing systemic illness.'
      }
    ],
    commonTraps: [
      'Confusing obsessions and compulsions. Obsessions are intrusive THOUGHTS; Compulsions are repetitive physical/mental BEHAVIORS enacted to reduce the anxiety.',
      'Confusing positive and negative symptoms of schizophrenia. Positive symptoms are ADDED behaviors (hallucinations, delusions); Negative symptoms are SUBTRACTED normal behaviors (flat affect, catatonia, alogia).',
      'Confusing Bipolar I (full manic episodes) with Major Depression (unipolar; no mania).'
    ],
    cramSheet: [
      'Diathesis-Stress Model: Genetic predisposition + environmental trigger = disorder.',
      'Schizophrenia: Excess dopamine, enlarged ventricles, hallucinations (auditory most common).',
      'Depression: Low serotonin/norepinephrine; treated with SSRIs (Prozac, Zoloft).',
      'General Adaptation Syndrome (GAS): Alarm $\\rightarrow$ Resistance $\\rightarrow$ Exhaustion.',
      'OCD: Obsession = thought; Compulsion = repetitive behavior.'
    ]
  }
];
