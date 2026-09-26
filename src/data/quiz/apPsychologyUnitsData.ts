// AP Psychology Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–5)
// Authentic psychological concepts, biological mechanisms, empirical experiments, cognitive models, and clinical diagnostic standards.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_PSYCHOLOGY_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Biological Bases of Behavior',
    shortTitle: 'Unit 1: Biological Bases',
    description: 'Neuron anatomy, action potentials, neurotransmitters, brain structures, split-brain research, and endocrine regulation',
    examWeight: '15–25% of AP Exam',
    biome: {
      name: 'Synaptic Valley & Cortical Peaks',
      icon: '🧠',
      accentColor: '#EC4899',
      secondaryColor: '#DB2777',
      groundGradient: 'from-pink-100 via-rose-50 to-purple-100',
      cardBorder: 'border-pink-500',
      trailColor: '#ec4899',
      nodeRing: 'ring-pink-400/40',
      skyTint: 'from-pink-50 to-rose-50/30'
    },
    levels: [
      {
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'psych-u1-l1',
        topicNumber: 'Topic 1.1',
        name: 'Neural Conduction & Action Potential',
        subtitle: 'Resting potential, depolarization, and all-or-none principle',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy1-l1-q1',
            stem: 'During an action potential, what rapid ionic movement causes the initial depolarization phase of the neuronal membrane?',
            options: [
              'Sodium ions ($Na^+$) rush into the cell through voltage-gated channels.',
              'Potassium ions ($K^+$) flood out of the cell into the extracellular fluid.',
              'Chloride ions ($Cl^-$) exit the cell through ligand-gated channels.',
              'Calcium pumps actively pump sodium out of the axon terminal.'
            ],
            correctIndex: 0,
            explanation: 'When the neuron reaches threshold (-55 mV), voltage-gated sodium channels open rapidly, allowing positive sodium ions ($Na^+$) to rush in down their electrochemical gradient, depolarizing the interior of the cell up to +30 mV.',
            distractorTip: 'Remember: $Na^+$ rushes IN to depolarize; $K^+$ leaves OUT to repolarize.'
          },
          {
            id: 'psy1-l1-q2',
            stem: 'Which statement accurately describes the "all-or-none" law of neural transmission?',
            options: [
              'An axon fires at full electrical strength if the threshold is met, regardless of how intense the stimulus is above threshold.',
              'Stronger stimuli cause larger individual electrical spikes along the axon.',
              'Neurons fire half-strength action potentials if a stimulus is subthreshold.',
              'Action potentials slow down in velocity when neurotransmitter levels are depleted.'
            ],
            correctIndex: 0,
            explanation: 'The all-or-none law states that an action potential occurs at constant magnitude and speed once threshold is reached. Stimulus intensity is encoded by frequency (rate of firing), not spike amplitude.',
            distractorTip: 'AP Trap: Stronger stimulus = higher frequency of firing, NOT bigger action potentials!'
          },
          {
            id: 'psy1-l1-q3',
            stem: 'Multiple sclerosis is a neurodegenerative disorder characterized by the immune system attacking and degrading which critical neural structure?',
            options: [
              'Myelin sheath',
              'Dendritic spines',
              'Soma cell body',
              'Synaptic vesicles'
            ],
            correctIndex: 0,
            explanation: 'Myelin is a fatty insulating layer formed by glial cells (Schwann cells/oligodendrocytes) that speeds up salutatory conduction. Degradation of the myelin sheath impairs signal transmission, causing motor and sensory deficits.',
            distractorTip: 'Nodes of Ranvier are the gaps between myelin sheaths where action potentials regenerate.'
          }
        ]
      },
      {
        id: 102,
        unitIndex: 1,
        levelNumber: 2,
        uniqueKey: 'psych-u1-l2',
        topicNumber: 'Topic 1.2',
        name: 'Neurotransmitters & Neuromodulators',
        subtitle: 'Dopamine, Serotonin, GABA, Glutamate & Acetylcholine',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy1-l2-q1',
            stem: 'Which neurotransmitter is the primary inhibitory neurotransmitter in the central nervous system, functioning to prevent hyper-excitation and seizure activity?',
            options: [
              'GABA (gamma-aminobutyric acid)',
              'Glutamate',
              'Dopamine',
              'Norepinephrine'
            ],
            correctIndex: 0,
            explanation: 'GABA is the chief inhibitory neurotransmitter in the mammalian brain, opening chloride channels to hyperpolarize the post-synaptic membrane. Glutamate is the chief excitatory neurotransmitter.',
            distractorTip: 'Remember: GABA = inhibitory (calming); Glutamate = excitatory (memory & arousal).'
          },
          {
            id: 'psy1-l2-q2',
            stem: 'A loss of dopamine-producing neurons in the substantia nigra leads to motor tremors and rigidity characteristic of:',
            options: [
              'Parkinson\'s disease',
              'Alzheimer\'s disease',
              'Schizophrenia',
              'Huntington\'s disease'
            ],
            correctIndex: 0,
            explanation: 'Parkinson\'s disease is caused by the death of dopamine-generating neurons in the substantia nigra. Conversely, excessive dopamine receptor activity is implicated in the positive symptoms of schizophrenia.',
            distractorTip: 'Alzheimer\'s is primarily linked to acetylcholine (ACh) depletion and beta-amyloid plaques.'
          },
          {
            id: 'psy1-l2-q3',
            stem: 'Drugs that block the reuptake of serotonin (SSRIs) in the synaptic cleft produce which direct pharmacological effect?',
            options: [
              'They increase the concentration and duration of serotonin available to stimulate postsynaptic 5-HT receptors.',
              'They destroy presynaptic vesicles containing excess neurotransmitter.',
              'They irreversibly bind to postsynaptic receptor sites as competitive antagonists.',
              'They convert serotonin molecules into endorphins within synaptic gaps.'
            ],
            correctIndex: 0,
            explanation: 'SSRIs (Selective Serotonin Reuptake Inhibitors) inhibit the serotonin transporter (SERT) protein on the presynaptic terminal, keeping serotonin in the synaptic cleft longer to repeatedly stimulate postsynaptic receptors.',
            distractorTip: 'An agonist mimics/enhances neurotransmitter action; an antagonist blocks it.'
          }
        ]
      },
      {
        id: 103,
        unitIndex: 1,
        levelNumber: 3,
        uniqueKey: 'psych-u1-l3',
        topicNumber: 'Topic 1.3',
        name: 'Brain Structures & Lateralization',
        subtitle: 'Limbic system, lobes, Broca/Wernicke & split-brain studies',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy1-l3-q1',
            stem: 'In Roger Sperry and Michael Gazzaniga\'s split-brain experiments, if a patient whose corpus callosum is severed sees an image of an apple in their left visual field, what are they able to do?',
            options: [
              'They cannot verbally name the apple, but can successfully pick it up with their left hand.',
              'They can immediately say "apple" aloud because language is housed in the right hemisphere.',
              'They can pick up the apple using only their right hand.',
              'They cannot visually recognize or draw the apple with either hand.'
            ],
            correctIndex: 0,
            explanation: 'Images in the left visual field project to the right occipital lobe. The right hemisphere controls the left hand (can pick up/draw the apple). However, because speech centers (Broca\'s area) reside in the left hemisphere and the corpus callosum is severed, the patient cannot verbally name the object.',
            distractorTip: 'Left visual field $\\to$ Right hemisphere $\\to$ Left hand action (non-verbal).'
          },
          {
            id: 'psy1-l3-q2',
            stem: 'Damage to the ventromedial prefrontal cortex and hippocampus would most directly impair which two psychological functions?',
            options: [
              'Emotional decision-making/impulse regulation and consolidation of new explicit memories.',
              'Basic cardiac rhythm regulation and visual spatial depth perception.',
              'Receptive language comprehension and fine motor finger articulation.',
              'Thermoregulation and auditory pitch discrimination.'
            ],
            correctIndex: 0,
            explanation: 'The hippocampus is essential for consolidating explicit declarative memories (as demonstrated by patient H.M.). The ventromedial prefrontal cortex mediates emotional regulation, impulse control, and value-based decision making (as seen in Phineas Gage).',
            distractorTip: 'Patient H.M. lost his hippocampus and could not form new declarative long-term memories (anterograde amnesia).'
          },
          {
            id: 'psy1-l3-q3',
            stem: 'A patient suffers a stroke and exhibits fluent, grammatically flowing speech that is devoid of actual meaning ("word salad") and cannot comprehend verbal instructions. Which region was damaged?',
            options: [
              'Wernicke\'s area in the left temporal lobe',
              'Broca\'s area in the left frontal lobe',
              'Motor strip in the parietal lobe',
              'Somatosensory cortex in the postcentral gyrus'
            ],
            correctIndex: 0,
            explanation: 'Wernicke\'s aphasia (receptive aphasia) causes impaired language comprehension and meaningless fluent speech. Broca\'s aphasia causes broken, halting speech with preserved comprehension.',
            distractorTip: 'Broca\'s = Broken speech; Wernicke\'s = "What did they say?" / Word salad.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Cognition & Memory',
    shortTitle: 'Unit 2: Cognition',
    description: 'Memory models (Atkinson-Shiffrin), forgetting, problem-solving heuristics, cognitive biases, language acquisition, and intelligence',
    examWeight: '13–17% of AP Exam',
    biome: {
      name: 'Archive of Mnemosyne & Neural Pathways',
      icon: '💡',
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
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'psych-u2-l1',
        topicNumber: 'Topic 2.1',
        name: 'Memory Encoding, Storage & Retrieval',
        subtitle: 'Atkinson-Shiffrin model, working memory & explicit vs implicit memory',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy2-l1-q1',
            stem: 'Remembering how to ride a bicycle or play a memorized piano chord progression without conscious recall relies primarily on which memory system?',
            options: [
              'Implicit (procedural) memory, processed by the cerebellum and basal ganglia.',
              'Explicit (episodic) memory, processed by the hippocampus.',
              'Semantic memory, processed exclusively in the occipital lobe.',
              'Sensory iconic memory, maintained in the thalamus.'
            ],
            correctIndex: 0,
            explanation: 'Procedural memory is non-declarative/implicit memory for motor skills and habits, processed by the cerebellum and basal ganglia without requiring conscious, effortful retrieval.',
            distractorTip: 'Explicit = facts/events (Hippocampus); Implicit = skills/classical conditioning (Cerebellum/Basal Ganglia).'
          },
          {
            id: 'psy2-l1-q2',
            stem: 'In George Miller\'s classic memory research, what is the estimated capacity of short-term (working) memory for unchunked items?',
            options: [
              '$7 \\pm 2$ items',
              '$15 \\pm 3$ items',
              'Unlimited capacity for 24 hours',
              '$2 \\pm 1$ items'
            ],
            correctIndex: 0,
            explanation: 'George Miller identified the "magical number seven, plus or minus two" ($7 \\pm 2$) as the typical capacity limit for items held in short-term memory without chunking.',
            distractorTip: 'Chunking (organizing items into familiar, manageable units like phone numbers) expands effective STM capacity.'
          },
          {
            id: 'psy2-l1-q3',
            stem: 'If an AP Psychology student studies German terms in the afternoon and then finds that this new German vocabulary interferes with recalling previously learned Spanish words, they are experiencing:',
            options: [
              'Retroactive interference',
              'Proactive interference',
              'Anterograde amnesia',
              'Source misattribution'
            ],
            correctIndex: 0,
            explanation: 'Retroactive interference occurs when NEW information interferes with the recall of OLD information. (Proactive interference is when OLD information interferes with learning/recalling NEW information).',
            distractorTip: 'Use PORN: Proactive = Old interferes with new; Retroactive = New interferes with old.'
          }
        ]
      },
      {
        id: 202,
        unitIndex: 2,
        levelNumber: 2,
        uniqueKey: 'psych-u2-l2',
        topicNumber: 'Topic 2.2',
        name: 'Heuristics, Biases & Problem Solving',
        subtitle: 'Availability, representativeness, framing, and mental sets',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy2-l2-q1',
            stem: 'A traveler refuses to board a commercial flight after seeing dramatic news footage of an airplane crash, choosing instead to drive even though statistical crash risk is far higher in cars. This judgment error is an example of:',
            options: [
              'The availability heuristic',
              'The representativeness heuristic',
              'Functional fixedness',
              'Belief perseverance'
            ],
            correctIndex: 0,
            explanation: 'The availability heuristic estimates the likelihood of an event based on how easily vivid instances come to mind (mental availability). Dramatic plane crashes are memorable and readily retrieved from memory.',
            distractorTip: 'Availability = vivid recall / news memory; Representativeness = matching a stereotype or prototype.'
          },
          {
            id: 'psy2-l2-q2',
            stem: 'A person assumes that a quiet, bespectacled individual who enjoys reading poetry is far more likely to be an Ivy League classics professor than a truck driver, ignoring the base rate of both professions. This illustrates:',
            options: [
              'The representativeness heuristic',
              'The framing effect',
              'Confirmation bias',
              'Hindsight bias'
            ],
            correctIndex: 0,
            explanation: 'The representativeness heuristic leads people to judge probabilities based on how closely an exemplar resembles a prototype, ignoring baseline statistical probabilities (base rates).',
            distractorTip: 'Truck drivers outnumber Ivy League classics professors by orders of magnitude.'
          },
          {
            id: 'psy2-l2-q3',
            stem: 'Failing to see that a heavy coin can be used as an impromptu flathead screwdriver to tighten a loose screw is a textbook manifestation of:',
            options: [
              'Functional fixedness',
              'Divergent thinking',
              'Algorithm exhaustion',
              'The anchoring bias'
            ],
            correctIndex: 0,
            explanation: 'Functional fixedness is a cognitive bias that limits a person to using an object only in the way it is traditionally used, impeding creative problem-solving.',
            distractorTip: 'Duncker\'s candle problem is the landmark experiment demonstrating functional fixedness.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Development & Learning',
    shortTitle: 'Unit 3: Development & Learning',
    description: 'Classical conditioning, operant conditioning schedules, social learning, Piaget cognitive stages, Erikson psychosocial crises, and Kohlberg moral reasoning',
    examWeight: '17–25% of AP Exam',
    biome: {
      name: 'Cradle of Conditioning & Lifespan Grove',
      icon: '🌱',
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
        id: 301,
        unitIndex: 3,
        levelNumber: 1,
        uniqueKey: 'psych-u3-l1',
        topicNumber: 'Topic 3.1',
        name: 'Classical Conditioning Principles',
        subtitle: 'UCS, UCR, CS, CR, extinction, and spontaneous recovery',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy3-l1-q1',
            stem: 'In Ivan Pavlov\'s original experiments, the meat powder that naturally triggered salivation in dogs without prior training represents the:',
            options: [
              'Unconditioned stimulus (UCS)',
              'Conditioned stimulus (CS)',
              'Conditioned response (CR)',
              'Neutral reinforcer'
            ],
            correctIndex: 0,
            explanation: 'The meat powder is an Unconditioned Stimulus (UCS) because it naturally, automatically triggers a biological response (salivation = UCR) without prior conditioning.',
            distractorTip: 'The bell or metronome starts as a Neutral Stimulus (NS) and becomes the Conditioned Stimulus (CS).'
          },
          {
            id: 'psy3-l1-q2',
            stem: 'If Pavlov\'s dogs stop salivating to the bell after it is repeatedly presented without meat powder, but then salivate again after a 24-hour rest period when the bell is rung, this reappearance is called:',
            options: [
              'Spontaneous recovery',
              'Stimulus generalization',
              'Higher-order conditioning',
              'Latent learning'
            ],
            correctIndex: 0,
            explanation: 'Spontaneous recovery is the sudden reappearance of an extinguished conditioned response following a rest interval, proving that extinction suppresses rather than erases the conditioned association.',
            distractorTip: 'Extinction is NOT unlearning; it is active inhibition of the conditioned response.'
          },
          {
            id: 'psy3-l1-q3',
            stem: 'In John Watson and Rosalie Rayner\'s controversial "Little Albert" study, Albert\'s learned fear of a white rat spread to white rabbits, fur coats, and Santa masks. This demonstrates:',
            options: [
              'Stimulus generalization',
              'Stimulus discrimination',
              'Negative reinforcement',
              'Insight learning'
            ],
            correctIndex: 0,
            explanation: 'Stimulus generalization occurs when stimuli similar to the conditioned stimulus (white furry objects) elicit the same conditioned response (fear/crying).',
            distractorTip: 'Discrimination is learning to respond ONLY to the specific CS and not to similar stimuli.'
          }
        ]
      },
      {
        id: 302,
        unitIndex: 3,
        levelNumber: 2,
        uniqueKey: 'psych-u3-l2',
        topicNumber: 'Topic 3.2',
        name: 'Operant Conditioning & Schedules',
        subtitle: 'Positive/negative reinforcement, punishment, and reinforcement schedules',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy3-l2-q1',
            stem: 'Buckling your seatbelt to stop an annoying, continuous beeping noise inside your car is a real-world example of:',
            options: [
              'Negative reinforcement',
              'Positive punishment',
              'Negative punishment',
              'Classical counter-conditioning'
            ],
            correctIndex: 0,
            explanation: 'Negative reinforcement strengthens a behavior by removing an aversive stimulus (unpleasant beeping). Reinforcement always INCREASES behavior; punishment always DECREASES behavior.',
            distractorTip: 'Negative reinforcement is NOT punishment! Reinforcement = increase behavior; Negative = remove a stimulus.'
          },
          {
            id: 'psy3-l2-q2',
            stem: 'A casino slot machine rewards gamblers with a jackpot after an unpredictable, varying number of lever pulls. This operates on which schedule of reinforcement?',
            options: [
              'Variable-ratio schedule',
              'Fixed-ratio schedule',
              'Variable-interval schedule',
              'Fixed-interval schedule'
            ],
            correctIndex: 0,
            explanation: 'A variable-ratio schedule delivers reinforcement after an unpredictable number of responses, producing the highest rate of steady responding and the greatest resistance to extinction.',
            distractorTip: 'Ratio = number of responses; Interval = elapsed time. Variable-ratio produces the "gambling addiction" curve.'
          },
          {
            id: 'psy3-l2-q3',
            stem: 'In Albert Bandura\'s famous Bobo Doll experiment, children who observed an adult model violently punching and kicking an inflatable doll were significantly more likely to:',
            options: [
              'Imitate the novel aggressive actions and verbal insults toward the doll without direct reinforcement.',
              'Avoid touching the doll altogether due to fear of retribution.',
              'Exhibit increased empathy toward other playmates.',
              'Only punch the doll if offered monetary rewards beforehand.'
            ],
            correctIndex: 0,
            explanation: 'Bandura demonstrated observational learning (vicarious learning): children acquired novel aggressive behaviors purely through observation and modeling, challenging pure behaviorist reward-only models.',
            distractorTip: 'Bandura emphasized reciprocal determinism and mirror neurons in observational learning.'
          }
        ]
      },
      {
        id: 303,
        unitIndex: 3,
        levelNumber: 3,
        uniqueKey: 'psych-u3-l3',
        topicNumber: 'Topic 3.3',
        name: 'Developmental Stages & Moral Reasoning',
        subtitle: 'Piaget, Erikson, Kohlberg & Ainsworth attachment styles',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy3-l3-q1',
            stem: 'A 5-year-old child believes that pouring liquid from a short, wide glass into a tall, thin glass creates "more" juice. According to Jean Piaget, this child lacks:',
            options: [
              'Conservation, characteristic of the preoperational stage.',
              'Object permanence, characteristic of the sensorimotor stage.',
              'Abstract deductive logic, characteristic of the formal operational stage.',
              'Egocentric role-taking, characteristic of the concrete operational stage.'
            ],
            correctIndex: 0,
            explanation: 'Conservation is the understanding that quantity remains constant despite changes in outward shape or container. Children in the preoperational stage (ages 2–7) lack conservation due to centration and irreversibility.',
            distractorTip: 'Concrete operational children (ages 7–11) master conservation.'
          },
          {
            id: 'psy3-l3-q2',
            stem: 'In Lawrence Kohlberg\'s theory of moral development, an individual who argues Heinz should steal the medicine because "laws against stealing are secondary to universal human rights to life" is reasoning at the:',
            options: [
              'Postconventional level',
              'Conventional level',
              'Preconventional level',
              'Autonomous ego level'
            ],
            correctIndex: 0,
            explanation: 'Postconventional moral reasoning is based on abstract universal ethical principles and human dignity that transcend societal laws. Preconventional is based on punishment/reward; conventional is based on social rules/approval.',
            distractorTip: 'Carol Gilligan critiqued Kohlberg for male bias, arguing women often emphasize care and relationship networks.'
          },
          {
            id: 'psy3-l3-q3',
            stem: 'In Mary Ainsworth\'s Strange Situation protocol, an infant who explores the playroom when mother is present, is distressed upon her departure, and is quickly comforted upon her return exhibits:',
            options: [
              'Secure attachment',
              'Insecure-avoidant attachment',
              'Insecure-resistant (ambivalent) attachment',
              'Disorganized attachment'
            ],
            correctIndex: 0,
            explanation: 'Secure attachment is characterized by using the primary caregiver as a secure base for exploration, displaying appropriate separation protest, and seeking/receiving comforting upon reunion.',
            distractorTip: 'Avoidant infants ignore the parent upon return; ambivalent infants cling yet hit/push away angrily.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Social Psychology & Personality',
    shortTitle: 'Unit 4: Social & Personality',
    description: 'Attribution theory, conformity, obedience, group dynamics, prejudice, Big Five traits, and psychoanalytic defense mechanisms',
    examWeight: '15–22% of AP Exam',
    biome: {
      name: 'Agora of Social Influence & Trait Nexus',
      icon: '👥',
      accentColor: '#F59E0B',
      secondaryColor: '#D97706',
      groundGradient: 'from-amber-100 via-orange-50 to-yellow-100',
      cardBorder: 'border-amber-500',
      trailColor: '#f59e0b',
      nodeRing: 'ring-amber-400/40',
      skyTint: 'from-amber-50 to-orange-50/30'
    },
    levels: [
      {
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'psych-u4-l1',
        topicNumber: 'Topic 4.1',
        name: 'Attribution & Cognitive Dissonance',
        subtitle: 'Fundamental attribution error, self-serving bias, and Festinger',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy4-l1-q1',
            stem: 'When another driver suddenly cuts you off in traffic, you immediately assume they are an aggressive, reckless jerk, ignoring the possibility that they may be rushing to an emergency room. You have committed:',
            options: [
              'The fundamental attribution error',
              'The self-serving bias',
              'The false consensus effect',
              'Deindividuation'
            ],
            correctIndex: 0,
            explanation: 'The fundamental attribution error is the tendency when analyzing others\' behavior to overestimate dispositional (personality) factors and underestimate situational constraints.',
            distractorTip: 'Self-serving bias applies to ourselves: attributing our successes to traits and our failures to situations.'
          },
          {
            id: 'psy4-l1-q2',
            stem: 'Leon Festinger\'s classic cognitive dissonance study revealed that participants paid only $1 to tell a confederate that a boring task was fun reported genuinely enjoying the task more than participants paid $20. Why?',
            options: [
              'They experienced high dissonance from lying for only $1, resolving it by changing their internal attitude to align with their behavior.',
              'They felt deep gratitude to the experimenter for the $1 reward.',
              'The $20 participants developed clinical paranoia.',
              'The $1 group worked under hypnosis.'
            ],
            correctIndex: 0,
            explanation: 'Participants paid $20 had sufficient external justification for lying. Those paid only $1 had insufficient justification, generating intense psychological dissonance that they resolved by altering their private attitude.',
            distractorTip: 'Cognitive dissonance: When actions clash with attitudes, we change our attitudes to reduce mental discomfort.'
          },
          {
            id: 'psy4-l1-q3',
            stem: 'In Solomon Asch\'s line judgment studies, what factor most dramatically reduced participant conformity with an incorrect majority?',
            options: [
              'Having just one dissenting ally in the group who gave the correct answer.',
              'Doubling the financial reward for accuracy.',
              'Increasing the group size from 6 to 12 confederates.',
              'Informing participants that their vision was superior.'
            ],
            correctIndex: 0,
            explanation: 'Asch found that the presence of even a single dissenting ally reduced conformity rates by over 75%, breaking the unanimity of social pressure.',
            distractorTip: 'Unanimity is far more powerful in inducing conformity than group size beyond 3–4 members.'
          }
        ]
      },
      {
        id: 402,
        unitIndex: 4,
        levelNumber: 2,
        uniqueKey: 'psych-u4-l2',
        topicNumber: 'Topic 4.2',
        name: 'Obedience, Groups & Personality Traits',
        subtitle: 'Milgram, bystander effect, Big Five (OCEAN), and Freud defense mechanisms',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy4-l2-q1',
            stem: 'In Stanley Milgram\'s original Yale obedience experiments, what percentage of ordinary adult participants complied with the experimenter\'s demands to administer the maximum 450-volt shock to the learner?',
            options: [
              'Approximately 65%',
              'Less than 2%',
              'Exactly 100%',
              'Approximately 25%'
            ],
            correctIndex: 0,
            explanation: 'Milgram found that 65% (26 of 40) of participants administered the full 450-volt shock despite the learner\'s screams and eventual silence, demonstrating the terrifying power of perceived legitimate authority.',
            distractorTip: 'Prior to the study, 40 psychiatrists predicted that less than 1% of participants (only psychopaths) would go to 450V.'
          },
          {
            id: 'psy4-l2-q2',
            stem: 'In the Big Five (Five-Factor) Model of personality, which trait is characterized by high levels of organization, self-discipline, reliability, and goal-directed persistence?',
            options: [
              'Conscientiousness',
              'Openness to experience',
              'Agreeableness',
              'Neuroticism'
            ],
            correctIndex: 0,
            explanation: 'Conscientiousness reflects self-discipline, organization, dependability, and structured deliberation. (OCEAN: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).',
            distractorTip: 'Neuroticism reflects emotional instability and anxiety; Extraversion reflects sociability.'
          },
          {
            id: 'psy4-l2-q3',
            stem: 'A high school student who harbors intense, unconscious hatred toward their sibling overcompensates by showering them with excessive, smothered affection. Which Freudian defense mechanism is at work?',
            options: [
              'Reaction formation',
              'Projection',
              'Sublimation',
              'Displacement'
            ],
            correctIndex: 0,
            explanation: 'Reaction formation occurs when the ego unconsciously transforms unacceptable impulses into their exact opposites. Projection would be accusing the sibling of being full of hatred.',
            distractorTip: 'Sublimation redirects taboo impulses into socially productive outlets (like aggressive energy into martial arts).'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Mental & Physical Health',
    shortTitle: 'Unit 5: Mental Health & Therapy',
    description: 'Psychological disorders (DSM-5), etiology, therapeutic modalities (CBT, psychoanalysis, humanistic), and biomedical treatments',
    examWeight: '15–20% of AP Exam',
    biome: {
      name: 'Sanctuary of Healing & Equilibrium',
      icon: '🌿',
      accentColor: '#06B6D4',
      secondaryColor: '#0891B2',
      groundGradient: 'from-cyan-100 via-sky-50 to-teal-100',
      cardBorder: 'border-cyan-500',
      trailColor: '#06b6d4',
      nodeRing: 'ring-cyan-400/40',
      skyTint: 'from-cyan-50 to-teal-50/30'
    },
    levels: [
      {
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'psych-u5-l1',
        topicNumber: 'Topic 5.1',
        name: 'Clinical Disorders & DSM-5 Diagnostic Criteria',
        subtitle: 'Depression, Bipolar, Anxiety, Schizophrenia & OCD',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy5-l1-q1',
            stem: 'Which clinical symptom is classified as a "positive symptom" of schizophrenia rather than a negative symptom?',
            options: [
              'Auditory hallucinations and persecutory delusions',
              'Flat affect (blunted emotional expression)',
              'Avolition (severe lack of initiative or motivation)',
              'Social withdrawal and catatonic stupor'
            ],
            correctIndex: 0,
            explanation: 'In clinical psychopathology, "positive symptoms" refer to behavioral additions/excesses (hallucinations, delusions, disorganized speech), whereas "negative symptoms" refer to behavioral deficits (flat affect, avolition, alogia).',
            distractorTip: 'Positive does NOT mean good; it means something added to normal functioning.'
          },
          {
            id: 'psy5-l1-q2',
            stem: 'In Obsessive-Compulsive Disorder (OCD), repetitive ritualistic behaviors like washing hands 50 times in an hour represent:',
            options: [
              'Compulsions designed to temporarily neutralize distress caused by intrusive obsessions.',
              'Delusional episodes triggered by parietal lobe lesions.',
              'Somatic motor tics unrelated to anxiety.',
              'Manic flights of ideas.'
            ],
            correctIndex: 0,
            explanation: 'Obsessions are intrusive, distressing thoughts or urges; compulsions are repetitive behaviors or mental acts performed to relieve or prevent the anxiety caused by the obsessions.',
            distractorTip: 'Obsessions = Thoughts; Compulsions = Actions/Behaviors.'
          },
          {
            id: 'psy5-l1-q3',
            stem: 'A patient experiences sudden, unexpected episodes of intense terror accompanied by a racing heart, trembling, shortness of breath, and fear of dying, without any identifiable environmental trigger. The most likely diagnosis is:',
            options: [
              'Panic disorder',
              'Generalized anxiety disorder',
              'Agoraphobia without panic',
              'Major depressive episode'
            ],
            correctIndex: 0,
            explanation: 'Panic disorder is characterized by recurrent, unexpected panic attacks and persistent concern about having additional attacks. Generalized Anxiety Disorder involves chronic, diffuse, non-acute worry lasting at least 6 months.',
            distractorTip: 'Panic attacks peak within minutes and feel like a heart attack.'
          }
        ]
      },
      {
        id: 502,
        unitIndex: 5,
        levelNumber: 2,
        uniqueKey: 'psych-u5-l2',
        topicNumber: 'Topic 5.2',
        name: 'Therapeutic Modalities & Stress Physiology',
        subtitle: 'CBT, Client-Centered (Rogers), SSRIs & Selye’s GAS model',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'psy5-l2-q1',
            stem: 'Aaron Beck\'s Cognitive Therapy focuses primarily on identifying and dismantling which psychological vulnerability in depressed patients?',
            options: [
              'Negative cognitive triad (catastrophic automatic beliefs regarding the self, the world, and the future).',
              'Unconscious childhood fixations in the oral stage.',
              'Underactive mirror neurons in the occipital lobe.',
              'Inadequate token economy reinforcement schedules.'
            ],
            correctIndex: 0,
            explanation: 'Beck hypothesized that depression results from habitual cognitive distortions centered on the negative triad: negative views of oneself, one\'s current experiences, and one\'s future.',
            distractorTip: 'CBT combines cognitive restructuring (Beck) with behavioral exposure/activation.'
          },
          {
            id: 'psy5-l2-q2',
            stem: 'In Carl Rogers\' humanistic Person-Centered Therapy, which three therapist conditions are considered essential and sufficient for therapeutic growth?',
            options: [
              'Unconditional positive regard, empathy, and genuineness (congruence).',
              'Dream analysis, free association, and transference interpretation.',
              'Systematic desensitization, flooding, and token reinforcers.',
              'Hypnosis, EMDR, and bilateral stimulation.'
            ],
            correctIndex: 0,
            explanation: 'Carl Rogers posited that personal growth occurs when the therapist provides a climate of unconditional positive regard, active empathic understanding, and personal genuineness/authenticity.',
            distractorTip: 'Free association and transference are psychoanalytic (Freud), NOT humanistic.'
          },
          {
            id: 'psy5-l2-q3',
            stem: 'According to Hans Selye\'s General Adaptation Syndrome (GAS), what is the correct chronological sequence of stages the body undergoes when subjected to prolonged, chronic stress?',
            options: [
              'Alarm reaction $\\to$ Resistance $\\to$ Exhaustion',
              'Resistance $\\to$ Alarm reaction $\\to$ Homeostasis',
              'Fight-or-flight $\\to$ Exhaustion $\\to$ Resistance',
              'Denial $\\to$ Appraisal $\\to$ Coping'
            ],
            correctIndex: 0,
            explanation: 'Selye\'s GAS model consists of: (1) Alarm (sympathetic nervous system activation), (2) Resistance (sustained cortisol release to cope), and (3) Exhaustion (depletion of bodily reserves, leading to illness).',
            distractorTip: 'Memory acronym: ARE (Alarm, Resistance, Exhaustion).'
          }
        ]
      }
    ]
  }
];
