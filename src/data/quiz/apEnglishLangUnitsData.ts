// AP English Language & Composition Units Data
// Comprehensive College Board CED aligned curriculum (Units 1–6)
// Authentic rhetorical analysis, argumentative structures, synthesis strategies, logical fallacies, stylistic devices, and prose revision.

import { UnitDefinition, UnitQuestLevel } from './apCalculusUnitsData';

export const ALL_AP_ENGLISH_LANG_UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitIndex: 1,
    unitId: 'u1',
    title: 'Unit 1: Rhetorical Situation & Claims',
    shortTitle: 'Unit 1: Rhetorical Situation',
    description: 'Exigence, audience, purpose, context, writer persona, and crafting defensible, nuanced thesis statements',
    examWeight: '11–15% of AP Exam',
    biome: {
      name: 'Orator’s Forum & Exigence Terrace',
      icon: '✍️',
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
        id: 101,
        unitIndex: 1,
        levelNumber: 1,
        uniqueKey: 'lang-u1-l1',
        topicNumber: 'Topic 1.1 & 1.3',
        name: 'The Rhetorical Situation (SPACE-CAT)',
        subtitle: 'Speaker, purpose, audience, context, exigence, and defensible claims',
        difficulty: 'Easy',
        rewardCoins: 30,
        questions: [
          {
            id: 'la1-l1-q1',
            stem: 'In rhetorical analysis, what is the "exigence" of a text or speech?',
            options: [
              'The specific real-world event, issue, or catalyst that urgent inspires or compels the author to write or speak at that precise moment.',
              'The list of citations and bibliographic references.',
              'The grammatical sentence structure of the conclusion.',
              'The author\'s financial compensation for publishing the work.'
            ],
            correctIndex: 0,
            explanation: 'Exigence is the spark or catalyst: the urgent need, defect, or obstacle in the world that prompts the rhetor to create discourse (e.g., Abraham Lincoln delivering the Gettysburg Address following a bloody battlefield slaughter).',
            distractorTip: 'Remember SPACE-CAT: Speaker, Purpose, Audience, Context, Exigence, Choices, Appeals, Tone.'
          },
          {
            id: 'la1-l1-q2',
            stem: 'Which thesis statement meets the AP English Language criteria for a "defensible claim"?',
            options: [
              '"While social media enhances community organizing, its algorithmic design deepens political polarization by insulating users from dissenting viewpoints."',
              '"Social media websites are accessed on smartphones every day."',
              '"Technology has existed throughout human history in many forms."',
              '"Everyone should stop using all electronic devices immediately because they are bad."'
            ],
            correctIndex: 0,
            explanation: 'A defensible thesis must take a clear, arguable stance that requires textual evidence and logical support, rather than stating an uncontested obvious fact or making an ungrounded hyperbolic generalization.',
            distractorTip: 'An AP thesis cannot be a simple fact ("Social media is popular"); it must be an arguable claim with a line of reasoning.'
          },
          {
            id: 'la1-l1-q3',
            stem: 'When analyzing how an author tailors a message to their target audience, why is it critical to consider the audience\'s shared values and presuppositions?',
            options: [
              'Because effective persuasion relies on appealing to beliefs and values the audience already holds to lead them toward accepting a new conclusion.',
              'To ensure the author uses only obscure Latin phrases.',
              'To disguise all factual errors in the argument.',
              'Because audiences never change their minds unless forced.'
            ],
            correctIndex: 0,
            explanation: 'Aristotelian rhetoric is reader-centric: a skilled writer frames arguments within the ethical, cultural, or intellectual presuppositions of the audience to establish rapport and earn assent.',
            distractorTip: 'Audience analysis dictates choice of evidence, tone, and rhetorical appeals.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 2,
    unitId: 'u2',
    title: 'Unit 2: Evidence & Appeals',
    shortTitle: 'Unit 2: Rhetorical Appeals',
    description: 'Ethos, pathos, logos, kairos, establishing credible lines of reasoning, and evaluating evidence types',
    examWeight: '13–18% of AP Exam',
    biome: {
      name: 'Amphitheater of Ethos & Pathos',
      icon: '⚖️',
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
        id: 201,
        unitIndex: 2,
        levelNumber: 1,
        uniqueKey: 'lang-u2-l1',
        topicNumber: 'Topic 2.1 & 2.4',
        name: 'Ethos, Pathos, Logos & Evidence',
        subtitle: 'Credibility, visceral appeals, deductive logic, and line of reasoning',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'la2-l1-q1',
            stem: 'In Martin Luther King Jr.\'s "Letter from Birmingham Jail," his references to St. Thomas Aquinas, St. Augustine, and biblical prophets primarily serve which rhetorical appeal?',
            options: [
              'Ethos, by establishing his deep theological authority and moral credibility with the critical white moderate clergymen.',
              'Logos, by providing statistical tables on economic growth.',
              'Pathos, by frightening readers with apocalyptic doom.',
              'Kairos, by explaining modern train schedules.'
            ],
            correctIndex: 0,
            explanation: 'By quoting Christian theologians revered by the white clergymen who criticized him, King establishes shared moral and intellectual authority (ethos), demonstrating that his nonviolent civil disobedience is grounded in centuries of mainstream Christian doctrine.',
            distractorTip: 'Ethos = credibility/character; Pathos = emotion/values; Logos = logic/facts.'
          },
          {
            id: 'la2-l1-q2',
            stem: 'In an AP argumentative essay, what constitutes a valid "line of reasoning"?',
            options: [
              'A coherent sequence of connected claims where each paragraph\'s topic sentence builds upon the previous one to logically substantiate the overarching thesis.',
              'A list of unrelated interesting facts organized chronologically.',
              'Repeating the thesis statement using identical wording at the start of every paragraph.',
              'Quoting long passages of text without commentary.'
            ],
            correctIndex: 0,
            explanation: 'The College Board rubric defines a line of reasoning as a logical progression of ideas: each claim connects back to the thesis, transitions logically from previous claims, and is explicitly tied together with cohesive commentary.',
            distractorTip: 'Evidence alone gets no credit without explicit COMMENTARY linking it to your line of reasoning.'
          },
          {
            id: 'la2-l1-q3',
            stem: 'What is the term for capitalizing on the opportune, fleeting, and strategic moment in time to deliver a persuasive speech?',
            options: [
              'Kairos',
              'Bathos',
              'Hubris',
              'Catharsis'
            ],
            correctIndex: 0,
            explanation: 'Kairos is the ancient Greek concept of the opportune, critical moment—the timeliness and situational suitability of a speech (saying the right thing at the exact right moment).',
            distractorTip: 'Kairos = the timeliness and situational urgency of the speech.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 3,
    unitId: 'u3',
    title: 'Unit 3: Synthesis of Multiple Sources',
    shortTitle: 'Unit 3: Synthesis Essay',
    description: 'Entering the academic conversation, synthesizing conflicting perspectives, source attribution, and avoiding mere summary',
    examWeight: '15–20% of AP Exam',
    biome: {
      name: 'Agora of Synthesis & Source Dialectic',
      icon: '📚',
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
        uniqueKey: 'lang-u3-l1',
        topicNumber: 'Topic 3.1 & 3.3',
        name: 'Synthesizing Divergent Sources',
        subtitle: 'Joining the conversation, qualifying positions, and source dialogue',
        difficulty: 'Medium',
        rewardCoins: 30,
        questions: [
          {
            id: 'la3-l1-q1',
            stem: 'In the AP Synthesis Essay (FRQ 1), what distinguishes a high-scoring synthesis essay from a low-scoring summary essay?',
            options: [
              'The student places multiple sources in direct dialogue with each other to support the student\'s own original argument, rather than marching through sources one by one.',
              'The essay quotes every single source word-for-word in order from Source A to Source F.',
              'The student agrees with all sources simultaneously without expressing an opinion.',
              'The essay summarizes the biography of each author.'
            ],
            correctIndex: 0,
            explanation: 'Top synthesis essays use sources as evidence in service of the STUDENT\'S OWN thesis. Low-scoring essays simply summarize Source A in paragraph 1, Source B in paragraph 2, failing to synthesize ideas.',
            distractorTip: 'Never let sources drive the paper; YOUR argument must drive the paper, with sources functioning as conversational evidence.'
          },
          {
            id: 'la3-l1-q2',
            stem: 'How should a writer effectively handle a credible counterargument presented in one of the provided prompt sources?',
            options: [
              'Concede its partial validity and then qualify or refute it using counter-evidence to strengthen the nuance of their own position.',
              'Ignore the counterargument completely so the reader doesn\'t notice it.',
              'Insult the intelligence of the author who proposed the counterargument.',
              'Change their entire thesis halfway through the essay to match the counterargument.'
            ],
            correctIndex: 0,
            explanation: 'Acknowledging, conceding, and refuting/qualifying counterarguments demonstrates sophistication, showing the reader that the writer understands the complexities of the issue.',
            distractorTip: 'The Sophistication point on the AP rubric is frequently earned through nuanced qualification of counter-perspectives.'
          },
          {
            id: 'la3-l1-q3',
            stem: 'According to AP Lang conventions, when citing provided sources in a synthesis essay, which citation method is acceptable?',
            options: [
              'Either in-text attribution by author name or parenthetical citation: e.g., "(Source A)".',
              'Only full formal Chicago Manual footnotes with page numbers.',
              'No citation is required because sources are provided in the test booklet.',
              'Students must invent realistic publisher dates.'
            ],
            correctIndex: 0,
            explanation: 'Students must cite sources either directly in text ("As economist Dr. Smith notes in Source B...") or with parenthetical notation ("...declined by 14% (Source B)").',
            distractorTip: 'You must cite at least THREE distinct sources to earn evidence points on the AP Synthesis rubric.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 4,
    unitId: 'u4',
    title: 'Unit 4: Argumentative Structure & Logic',
    shortTitle: 'Unit 4: Argument Structure',
    description: 'Classical oration model, Toulmin argument model, qualifying claims, and detecting logical fallacies (ad hominem, straw man, false dilemma)',
    examWeight: '15–20% of AP Exam',
    biome: {
      name: 'Pillars of Toulmin & Fallacy Bastion',
      icon: '🏛️',
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
        id: 401,
        unitIndex: 4,
        levelNumber: 1,
        uniqueKey: 'lang-u4-l1',
        topicNumber: 'Topic 4.1 & 4.4',
        name: 'Toulmin Model & Logical Fallacies',
        subtitle: 'Warrants, qualifiers, straw man, and false dichotomy',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'la4-l1-q1',
            stem: 'In Stephen Toulmin\'s model of argumentation, what is the role of the "warrant"?',
            options: [
              'The underlying assumption or principle that connects the evidence (data) to the overarching claim.',
              'The concluding paragraph of an essay.',
              'The dictionary definition of unfamiliar words.',
              'The legal permit required to publish a speech.'
            ],
            correctIndex: 0,
            explanation: 'The warrant is the implicit or explicit assumption that explains WHY the data/evidence logically proves the claim. If the audience rejects the warrant, the entire argument collapses.',
            distractorTip: 'Toulmin components: Claim (stance), Data (evidence), Warrant (reasoning connecting data to claim), Backing, Qualifier, Rebuttal.'
          },
          {
            id: 'la4-l1-q2',
            stem: 'A politician states: "Either we increase the municipal police budget by $50\\%$ immediately, or our city streets will descend into total lawless anarchy." This statement commits which logical fallacy?',
            options: [
              'False dilemma (false dichotomy / either-or fallacy)',
              'Ad hominem attack',
              'Straw man fallacy',
              'Post hoc ergo propter hoc'
            ],
            correctIndex: 0,
            explanation: 'A false dilemma fallaciously reduces a complex problem into only two extreme binary options, completely ignoring reasonable middle-ground alternatives.',
            distractorTip: 'Look out for "Either... or..." extremes that erase intermediate options.'
          },
          {
            id: 'la4-l1-q3',
            stem: 'When a debater mischaracterizes their opponent\'s nuanced policy proposal into a ridiculous, exaggerated caricature and then attacks that caricature, they have committed:',
            options: [
              'A straw man fallacy',
              'A red herring',
              'Slippery slope fallacy',
              'Bandwagon appeal (ad populum)'
            ],
            correctIndex: 0,
            explanation: 'A straw man fallacy involves distorting, oversimplifying, or misrepresenting an opponent\'s actual argument so that it is easy to knock down, rather than addressing the substantive claim.',
            distractorTip: 'Straw man = knocking down an exaggerated scarecrow instead of the real opponent.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 5,
    unitId: 'u5',
    title: 'Unit 5: Style, Diction & Syntax',
    shortTitle: 'Unit 5: Style & Syntax',
    description: 'Tone, figurative language, periodic vs loose sentences, parallelism, antithesis, juxtaposition, and stylistic voice',
    examWeight: '11–15% of AP Exam',
    biome: {
      name: 'Grove of Stylistic Cadence & Syntax',
      icon: '🖋️',
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
        id: 501,
        unitIndex: 5,
        levelNumber: 1,
        uniqueKey: 'lang-u5-l1',
        topicNumber: 'Topic 5.1 & 5.3',
        name: 'Syntactical Structures & Rhetorical Tropes',
        subtitle: 'Periodic sentences, parallel structure, and antithesis',
        difficulty: 'Hard',
        rewardCoins: 30,
        questions: [
          {
            id: 'la5-l1-q1',
            stem: 'Consider John F. Kennedy\'s famous sentence: "Ask not what your country can do for you; ask what you can do for your country." Which rhetorical device and syntactical structure is employed?',
            options: [
              'Chiasmus and antithesis, using parallel inverted grammatical structures to emphasize civic duty.',
              'Litotes, using understatement to minimize patriotic sacrifice.',
              'Anaphora, repeating phrases at the end of clauses.',
              'Loose cumulative sentence structure.'
            ],
            correctIndex: 0,
            explanation: 'Chiasmus inverts sentence structure in an A-B-B-A format (country/you vs you/country). Combined with antithesis (contrasting ideas in balanced phrases), it creates a memorable call to national service.',
            distractorTip: 'Chiasmus = grammatical criss-cross ("Never let a Fool Kiss You or a Kiss Fool You").'
          },
          {
            id: 'la5-l1-q2',
            stem: 'A sentence that withholds its main independent clause and central subject/verb until the very end, following multiple introductory dependent clauses, is called a:',
            options: [
              'Periodic sentence (used to build dramatic suspense and rhetorical climax).',
              'Loose (cumulative) sentence.',
              'Run-on sentence fragment.',
              'Compound-complex fragment.'
            ],
            correctIndex: 0,
            explanation: 'A periodic sentence places the main thought and grammatical completion at the end of the sentence (e.g., "Having crossed rivers, conquered mountains, and outlasted the freezing winter, the weary army finally reached home."). This builds suspense.',
            distractorTip: 'Loose sentence = main idea FIRST, followed by modifying details; Periodic sentence = main idea at the END.'
          },
          {
            id: 'la5-l1-q3',
            stem: 'Which sentence demonstrates correct parallel grammatical structure?',
            options: [
              'The candidate promised to reform public education, to revitalize urban infrastructure, and to protect natural waterways.',
              'The candidate promised reforming education, that he would build infrastructure, and to protect waterways.',
              'The candidate promised to reform education, urban infrastructure, and protecting waterways.',
              'The candidate promised educational reform, building infrastructure, and to protect water.'
            ],
            correctIndex: 0,
            explanation: 'Parallelism requires using the same grammatical pattern for coordinate elements: three parallel infinitive phrases ("to reform...", "to revitalize...", "to protect...").',
            distractorTip: 'Parallelism creates rhythm, balance, and forceful rhetorical clarity.'
          }
        ]
      }
    ]
  },
  {
    unitIndex: 6,
    unitId: 'u6',
    title: 'Unit 6: Multiple Choice: Reading & Revision',
    shortTitle: 'Unit 6: Reading & Revision',
    description: 'Deconstructing nonfiction arguments, analyzing rhetorical shifts, improving sentence transitions, and editing prose for concision',
    examWeight: '40–45% of AP Exam (MCQ Section)',
    biome: {
      name: 'Editing Atelier & Prose Chamber',
      icon: '🔍',
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
        uniqueKey: 'lang-u6-l1',
        topicNumber: 'Topic 6.1 & 6.4',
        name: 'AP MCQ Revision & Cohesion',
        subtitle: 'Transitions, concision, rhetorical shifts, and tone modulation',
        difficulty: 'Boss',
        rewardCoins: 50,
        questions: [
          {
            id: 'la6-l1-q1',
            stem: 'In an AP Lang "Writing Mode" multiple choice question, which transition word best establishes a relationship of unexpected contrast between two adjacent paragraphs?',
            options: [
              'Nevertheless,',
              'Consequently,',
              'Furthermore,',
              'Similarly,'
            ],
            correctIndex: 0,
            explanation: '"Nevertheless" signals concession and unexpected contrast (despite what was previously demonstrated). "Consequently" denotes causation; "Furthermore" denotes addition; "Similarly" denotes analogy.',
            distractorTip: 'Pay close attention to semantic logic when choosing transitional signposts.'
          },
          {
            id: 'la6-l1-q2',
            stem: 'When revising prose for concision and vigor, which revision best eliminates passive voice and empty nominalizations from: "The decision was made by the committee to conduct an investigation of the financial records"?',
            options: [
              '"The committee decided to investigate the financial records."',
              '"A financial record investigation decision was made by the committee."',
              '"It was the decision of the committee that records be investigated."',
              '"The committee was making the decision for record investigation."'
            ],
            correctIndex: 0,
            explanation: 'Transforming zombie nouns ("decision", "investigation") into active verbs ("decided", "investigate") and placing the agent ("committee") as the grammatical subject yields punchy, direct active prose.',
            distractorTip: 'Active voice is clearer, faster, and more engaging than bureaucratic passive voice.'
          },
          {
            id: 'la6-l1-q3',
            stem: 'In an analytic reading passage, an author shifts from an objective, detached historical summary in paragraphs 1–3 to an impassioned first-person polemic in paragraph 4. What is the rhetorical function of this shift?',
            options: [
              'To establish objective factual consensus first, before delivering an urgent moral indictment and personal call to direct action.',
              'To confuse the reader regarding who wrote the essay.',
              'To conceal the author\'s true lack of knowledge.',
              'To fulfill a word-count requirement.'
            ],
            correctIndex: 0,
            explanation: 'Rhetorical tonal shifts are intentional: establishing uncontested historical baseline facts first builds credibility (ethos/logos), priming the reader to accept the passionate moral conclusion (pathos).',
            distractorTip: 'Look for tonal pivot words like "Yet", "However", or shifts in pronoun usage (from "one/they" to "I/we").'
          }
        ]
      }
    ]
  }
];
