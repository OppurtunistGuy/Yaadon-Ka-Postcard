export interface ReaderExperience {
  bookKey: string;
  title: string;
  author: string;
  coverUrl: string;
  genres: string[];
  feelings: Array<'Fast & gripping' | 'Thought-provoking' | 'Emotional' | 'Immersive' | 'Relaxing'>;
  effort: 'Easy escape' | 'Some focus' | 'Deep dive';
  priorities: Array<'Story' | 'Characters' | 'Ideas' | 'Writing'>;
  experienceTags: string[];
  whySurfaced: string;
  readerSignal: string;
  mismatch?: string;
  about: string;
  experiences: {
    title: string;
    description: string;
  }[];
  consensus: string;
  previewSnippet?: string;
  affiliateLinks: {
    googleBooks?: string;
    appleBooks?: string;
    amazon?: string;
  };
}

export const CURATED_READER_EXPERIENCES: Record<string, ReaderExperience> = {
  'silent-patient': {
    bookKey: 'silent-patient',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg',
    genres: ['Thriller', 'Psychology', 'Mystery'],
    feelings: ['Fast & gripping', 'Emotional'],
    effort: 'Easy escape',
    priorities: ['Story', 'Characters'],
    experienceTags: ['Fast-paced', 'Psychological twist', 'Suspenseful'],
    whySurfaced: 'Matches your preference for a gripping, character-driven mystery with immediate momentum.',
    readerSignal: 'Readers frequently describe the pacing as difficult to put down, with a shock twist at the climax.',
    mismatch: 'Some readers find the clinical therapy setup slightly formulaic in the middle chapters.',
    about: 'Alicia Berenson, a famous painter, shoots her husband five times in the face and never speaks another word. Theo Faber, a criminal psychotherapist, takes a job at the secure facility determined to get her to speak.',
    experiences: [
      {
        title: 'Tight narrative momentum',
        description: 'Readers report short chapters and alternating diary entries create a relentless page-turning rhythm.'
      },
      {
        title: 'Unreliable perspective',
        description: 'Readers highlight the psychological tension as you constantly question what the narrator is withholding.'
      }
    ],
    consensus: 'A high-speed psychological thriller with an infamous twist that rewards fans of suspense.',
    previewSnippet: 'Alicia Berenson was thirty-three years old when she killed her husband. Gabriel had been dead for six days when the police arrived...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/1250301696',
      googleBooks: 'https://books.google.com/books?id=silent-patient',
      appleBooks: 'https://books.apple.com/us/book/the-silent-patient/id1382485121'
    }
  },

  'dune': {
    bookKey: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg',
    genres: ['Sci-Fi', 'Fantasy'],
    feelings: ['Immersive', 'Thought-provoking'],
    effort: 'Deep dive',
    priorities: ['Ideas', 'Story'],
    experienceTags: ['Rich world-building', 'Political intrigue', 'Philosophical'],
    whySurfaced: 'Fits your desire for a deep, immersive dive into complex ideas and expansive world-building.',
    readerSignal: 'Readers consistently discuss the depth of the political, ecological, and cultural setting of Arrakis.',
    mismatch: 'Readers frequently describe the opening 100 pages as dense, with heavy terminology and gradual momentum.',
    about: 'Set on the desert planet Arrakis, young Paul Atreides must navigate political betrayal, ecological survival, and religious prophecies surrounding the precious spice Melange.',
    experiences: [
      {
        title: 'Slow build with strong payoff',
        description: 'Readers note that initial patience is required to learn the vocabulary, but the climax is epic and rewarding.'
      },
      {
        title: 'Ecology and power dynamics',
        description: 'Readers praise how deeply the book explores resource scarcity, religious manipulation, and feudal politics.'
      },
      {
        title: 'Demanding prose and terminology',
        description: 'Unfamiliar terms and layered exposition can make the early chapters harder to follow.'
      }
    ],
    consensus: 'A demanding opening with exceptional world-building that rewards patient, immersive readers.',
    previewSnippet: 'A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0441172717',
      googleBooks: 'https://books.google.com/books?id=dune-herbert',
      appleBooks: 'https://books.apple.com/us/book/dune/id358334460'
    }
  },

  'atomic-habits': {
    bookKey: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535115320i/40121378.jpg',
    genres: ['Psychology', 'Contemporary'],
    feelings: ['Thought-provoking', 'Relaxing'],
    effort: 'Some focus',
    priorities: ['Ideas', 'Writing'],
    experienceTags: ['Actionable', 'Behavioral science', 'Clear & structured'],
    whySurfaced: 'Surfaced because of your interest in practical ideas delivered in structured, bite-sized concepts.',
    readerSignal: 'Readers praise the practical 4-step framework (Cue, Craving, Response, Reward) for immediate application.',
    mismatch: 'If you are looking for deep academic research or narrative stories, the format may feel slightly repetitive.',
    about: 'An operational guide to building good habits and breaking bad ones, drawing on cognitive science and behavioral psychology to explain how 1% improvements accumulate.',
    experiences: [
      {
        title: 'Direct and actionable takeaways',
        description: 'Readers appreciate the clear diagrams, chapter summaries, and immediate real-world utility.'
      },
      {
        title: 'System over motivation',
        description: 'Readers frequently quote the core insight: you do not rise to the level of your goals, you fall to the level of your systems.'
      }
    ],
    consensus: 'An accessible, highly structured self-improvement book focused on systems over willpower.',
    previewSnippet: 'Changes that seem small and unimportant at first will compound into remarkable results if you are willing to stick with them for years...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0735211299',
      googleBooks: 'https://books.google.com/books?id=atomic-habits',
      appleBooks: 'https://books.apple.com/us/book/atomic-habits/id1393608149'
    }
  },

  'the-alchemist': {
    bookKey: 'the-alchemist',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/4671.jpg',
    genres: ['Fantasy', 'Contemporary'],
    feelings: ['Emotional', 'Relaxing'],
    effort: 'Easy escape',
    priorities: ['Story', 'Ideas'],
    experienceTags: ['Philosophical fable', 'Inspirational', 'Reflective'],
    whySurfaced: 'Fits your mood for a gentle, reflective fable with simple prose and inspiring themes.',
    readerSignal: 'Readers cherish the parable-like tone and spiritual reflections on following one\'s "Personal Legend".',
    mismatch: 'Readers who dislike simple allegories or explicit spiritual morals may find it overly simplistic.',
    about: 'Santiago, an Andalusian shepherd boy, journeys from Spain to the Egyptian desert in search of a treasure buried near the Pyramids, discovering wisdom along the way.',
    experiences: [
      {
        title: 'Poetic simplicity',
        description: 'Readers describe the prose as light and fable-like, easy to read in a single sitting.'
      },
      {
        title: 'Symbolic encounters',
        description: 'Readers mention that the characters serve as symbolic guides rather than deeply fleshed-out figures.'
      }
    ],
    consensus: 'A short, gentle philosophical fable that resonates strongly when you are seeking inspiration.',
    previewSnippet: 'The boy\'s name was Santiago. Dust was settling as he arrived with his herd at an abandoned church...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0062315005',
      googleBooks: 'https://books.google.com/books?id=alchemist-coelho'
    }
  },

  '1984': {
    bookKey: '1984',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/5470.jpg',
    genres: ['Sci-Fi', 'Psychology'],
    feelings: ['Thought-provoking', 'Immersive'],
    effort: 'Some focus',
    priorities: ['Ideas', 'Characters'],
    experienceTags: ['Dystopian', 'Chilling', 'Political satire'],
    whySurfaced: 'Matches your desire for a thought-provoking exploration of surveillance, truth, and psychological control.',
    readerSignal: 'Readers emphasize the haunting relevance of concepts like Doublethink, Newspeak, and Big Brother.',
    mismatch: 'The oppressive atmospheric tone and bleak world can feel emotionally heavy and claustrophobic.',
    about: 'Winston Smith works at the Ministry of Truth altering historical records in Oceania, a totalitarian state under constant surveillance by Big Brother.',
    experiences: [
      {
        title: 'Chilling psychological atmosphere',
        description: 'Readers report feeling a lingering sense of paranoia and hyper-awareness long after finishing.'
      },
      {
        title: 'Demeaning power structures',
        description: 'Readers note that Part 3 is intense and uncompromising in its portrayal of totalitarian interrogation.'
      }
    ],
    consensus: 'A stark, intellectually vital dystopian classic that stays with readers for years.',
    previewSnippet: 'It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0451524934',
      googleBooks: 'https://books.google.com/books?id=1984-orwell'
    }
  },

  'project-hail-mary': {
    bookKey: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg',
    genres: ['Sci-Fi', 'Mystery'],
    feelings: ['Fast & gripping', 'Immersive'],
    effort: 'Some focus',
    priorities: ['Story', 'Writing'],
    experienceTags: ['Problem-solving', 'Humorous sci-fi', 'Unexpected friendship'],
    whySurfaced: 'Surfaced for its blend of high-stakes science problem-solving and engaging, fast-paced storytelling.',
    readerSignal: 'Readers rave about the heartwarming friendship dynamics and ingenious scientific survival puzzles.',
    mismatch: 'If you dislike internal technical monologue or quippy main characters, the voice may feel slightly repetitive.',
    about: 'Ryland Grace is the sole survivor on a desperate, last-chance mission to save Earth from an extinction-level stellar parasite, waking up with amnesia in another star system.',
    experiences: [
      {
        title: 'Optimistic science-first problem solving',
        description: 'Readers love how scientific experimentation is depicted as an exciting survival tool.'
      },
      {
        title: 'Unforgettable companion character',
        description: 'Readers consistently highlight Rocky, an alien engineer, as one of the best sci-fi companions in recent literature.'
      }
    ],
    consensus: 'A thrilling, optimistic sci-fi adventure driven by humor, ingenuity, and heart.',
    previewSnippet: 'What is two plus two? Something in my brain tells me the answer is four. But why do I know that? Who am I?...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0593135202',
      googleBooks: 'https://books.google.com/books?id=project-hail-mary'
    }
  },

  'tomorrow-and-tomorrow': {
    bookKey: 'tomorrow-and-tomorrow',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg',
    genres: ['Contemporary'],
    feelings: ['Emotional', 'Immersive'],
    effort: 'Some focus',
    priorities: ['Characters', 'Writing'],
    experienceTags: ['Creative partnership', 'Complex friendship', 'Gaming culture'],
    whySurfaced: 'Matches your preference for character-driven narratives focusing on creative collaboration and human connection.',
    readerSignal: 'Readers praise the decades-spanning relationship between Sam and Sadie and the poetic exploration of video game design as art.',
    mismatch: 'Readers expecting a traditional romantic relationship may feel frustrated by the complex platonic friction.',
    about: 'Spanning thirty years, two childhood friends collaborate to build an indie video game studio, navigating fame, tragedy, betrayal, and creative genius.',
    experiences: [
      {
        title: 'Nuanced platonic bond',
        description: 'Readers appreciate the realistic, non-romantic intimacy and creative rivalry between the leads.'
      },
      {
        title: 'Nostalgic digital artistry',
        description: 'Readers note that even non-gamers resonate deeply with the metaphors of play and second chances.'
      }
    ],
    consensus: 'A rich, emotionally resonant novel about art, friendship, and the games we play.',
    previewSnippet: 'Before Sam Masur emerged from the subway platform, he saw Sadie Green sitting on a bench in the winter sun...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0593321200'
    }
  },

  'klara-and-the-sun': {
    bookKey: 'klara-and-the-sun',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603206535i/54120280.jpg',
    genres: ['Sci-Fi', 'Psychology'],
    feelings: ['Thought-provoking', 'Emotional'],
    effort: 'Some focus',
    priorities: ['Writing', 'Ideas'],
    experienceTags: ['Subtle', 'Artificial intelligence', 'Poignant'],
    whySurfaced: 'Selected for your focus on elegant writing, quiet observation, and deep philosophical questions.',
    readerSignal: 'Readers highlight Klara\'s unique innocent perspective as an Artificial Friend observing human devotion and grief.',
    mismatch: 'The narrative is understated and slow-paced; readers seeking action-packed sci-fi may find it too quiet.',
    about: 'Klara, an Artificial Friend with extraordinary observational qualities, watches the behavior of shoppers and passersby from her store window, hoping to be chosen by a human child.',
    experiences: [
      {
        title: 'Gentle, observant perspective',
        description: 'Readers praise Ishiguro\'s ability to convey profound emotion through a polite, synthetic narrator.'
      },
      {
        title: 'Ethical questions of love and replacement',
        description: 'Readers reflect on what it means to be unique in a world of technological replication.'
      }
    ],
    consensus: 'A delicate, poignant story of artificial intelligence that questions the nature of the human heart.',
    previewSnippet: 'In the window, I had a good view of the street. I could watch the sun\'s patterns as it crossed between the buildings...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/059331817X'
    }
  },

  'thinking-fast-and-slow': {
    bookKey: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg',
    genres: ['Psychology'],
    feelings: ['Thought-provoking'],
    effort: 'Deep dive',
    priorities: ['Ideas'],
    experienceTags: ['Cognitive bias', 'Behavioral economics', 'Dense & rigorous'],
    whySurfaced: 'Surfaced for its profound exploration of human decision-making and cognitive shortcuts.',
    readerSignal: 'Readers view System 1 (fast, intuitive) and System 2 (slow, analytical) as a landmark mental framework.',
    mismatch: 'Very dense reading with numerous experimental studies; requires steady concentration to digest.',
    about: 'Nobel laureate Daniel Kahneman summarizes decades of research into cognitive biases, heuristics, and the two systems that drive the way we think.',
    experiences: [
      {
        title: 'Challenging self-reflection',
        description: 'Readers find themselves spotting cognitive biases in their daily decisions while reading.'
      },
      {
        title: 'Academic yet accessible examples',
        description: 'Readers note that while dense, the thought experiments make abstract concepts tangible.'
      }
    ],
    consensus: 'A foundational cognitive science work best tackled slowly and methodically.',
    previewSnippet: 'The premise of this book is that it is easier to recognize other people\'s mistakes than our own...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0374533555'
    }
  },

  'midnight-library': {
    bookKey: 'midnight-library',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg',
    genres: ['Contemporary', 'Fantasy'],
    feelings: ['Emotional', 'Relaxing'],
    effort: 'Easy escape',
    priorities: ['Story', 'Ideas'],
    experienceTags: ['Parallel lives', 'Comforting', 'Second chances'],
    whySurfaced: 'Recommended for an easy, uplifting story exploring regrets, alternative life paths, and hope.',
    readerSignal: 'Readers find the concept of a library between life and death comforting and quick to read.',
    mismatch: 'Some readers feel the self-help themes become slightly repetitive or predictable toward the end.',
    about: 'Between life and death there is a library where every book offers a chance to try another life Nora Seed could have lived if she had made different choices.',
    experiences: [
      {
        title: 'Accessible mental health theme',
        description: 'Readers connect with the gentle exploration of regret and self-acceptance.'
      },
      {
        title: 'Bite-sized episodic chapters',
        description: 'Readers describe it as a quick, comforting weekend read.'
      }
    ],
    consensus: 'A warm, accessible fantasy that encourages letting go of life regrets.',
    previewSnippet: 'Nineteen minutes before she decided to die, Nora Seed sat on her sofa waiting for her cat to come home...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0525559477'
    }
  },

  'sapiens': {
    bookKey: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1703329310i/23692271.jpg',
    genres: ['Psychology', 'Contemporary'],
    feelings: ['Thought-provoking', 'Immersive'],
    effort: 'Some focus',
    priorities: ['Ideas'],
    experienceTags: ['Macro-history', 'Shared fictions', 'Sweeping perspective'],
    whySurfaced: 'Fits your request for big-picture ideas about human history, culture, and social evolution.',
    readerSignal: 'Readers emphasize the "Cognitive Revolution" and the concept of "shared myths" (money, religion, corporations) as mind-shifting.',
    mismatch: 'Historians note that broad generalizations trade off granular historical specificity.',
    about: 'A sweeping narrative of how Homo sapiens conquered Earth through cognitive revolutions, agricultural shifts, and scientific unification.',
    experiences: [
      {
        title: 'Sweeping narrative style',
        description: 'Readers praise how complex anthropological spans are woven into an engaging, accessible story.'
      },
      {
        title: 'Provocative re-framing',
        description: 'Readers frequently debate Harari\'s claim that wheat domesticated humans rather than vice versa.'
      }
    ],
    consensus: 'An engaging, big-picture reinterpretation of human civilization.',
    previewSnippet: 'About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0062316095'
    }
  },

  'educated': {
    bookKey: 'educated',
    title: 'Educated',
    author: 'Tara Westover',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg',
    genres: ['Psychology', 'Contemporary'],
    feelings: ['Emotional', 'Fast & gripping'],
    effort: 'Some focus',
    priorities: ['Story', 'Characters'],
    experienceTags: ['Memoir', 'Resilience', 'Family dynamics'],
    whySurfaced: 'Matches your interest in emotional, gripping true stories of resilience and self-invention.',
    readerSignal: 'Readers express total immersion and shock at Tara\'s survival of survivalist isolation to earning a PhD.',
    mismatch: 'Contains intense depictions of family trauma and physical danger that can be difficult to read.',
    about: 'Born to survivalists in the mountains of Idaho, Tara Westover was isolated from society and didn\'t set foot in a classroom until age seventeen, eventually teaching herself enough to enter college.',
    experiences: [
      {
        title: 'Gripping memoir pacing',
        description: 'Readers report reading this non-fiction memoir like a high-tension suspense novel.'
      },
      {
        title: 'Complex cost of education',
        description: 'Readers resonate with the pain of severing family ties to gain self-determination.'
      }
    ],
    consensus: 'A powerful, gripping memoir about the price of knowledge and self-creation.',
    previewSnippet: 'My strongest memory is not a memory. It\'s something I imagined, then came to remember as if it had happened...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0399590501'
    }
  },

  'mans-search-for-meaning': {
    bookKey: 'mans-search-for-meaning',
    title: 'Man\'s Search for Meaning',
    author: 'Viktor E. Frankl',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/4069.jpg',
    genres: ['Psychology'],
    feelings: ['Thought-provoking', 'Emotional'],
    effort: 'Some focus',
    priorities: ['Ideas', 'Writing'],
    experienceTags: ['Existential', 'Logotherapy', 'Profound'],
    whySurfaced: 'Surfaced for its profound psychological insights into finding purpose even in the darkest circumstances.',
    readerSignal: 'Readers re-read this book for its enduring perspective on human suffering, freedom, and personal responsibility.',
    mismatch: 'The first half details horrific Nazi concentration camp conditions, which is deeply somber.',
    about: 'Psychiatrist Viktor Frankl chronicles his experiences in Auschwitz and introduces Logotherapy, his belief that primary human drive is the pursuit of meaning.',
    experiences: [
      {
        title: 'Enduring inner freedom',
        description: 'Readers highlight Frankl\'s principle: the last of human freedoms is to choose one\'s attitude in any set of circumstances.'
      },
      {
        title: 'Short but heavy impact',
        description: 'Readers note that despite its short length (under 200 pages), every chapter carries immense weight.'
      }
    ],
    consensus: 'A timeless, deeply moving testament to human purpose and resilience.',
    previewSnippet: 'This book does not claim to be an account of facts and events but of personal experiences, experiences which millions of prisoners suffered...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/080701429X'
    }
  },

  'where-the-crawdads-sing': {
    bookKey: 'where-the-crawdads-sing',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582135294i/36931564.jpg',
    genres: ['Mystery', 'Contemporary'],
    feelings: ['Immersive', 'Emotional'],
    effort: 'Easy escape',
    priorities: ['Story', 'Characters'],
    experienceTags: ['Atmospheric nature', 'Coming-of-age', 'Murder mystery'],
    whySurfaced: 'Recommended for its atmospheric coastal setting and heartwarming story of a young girl living in isolation.',
    readerSignal: 'Readers fall in love with the vivid nature descriptions of the North Carolina marshlands.',
    mismatch: 'The court trial mystery aspect in the second half feels somewhat generic compared to the rich marsh survival story.',
    about: 'Kya Clark, known as the "Marsh Girl", grows up isolated in the marshes of Barking Reach, North Carolina. When a handsome local is found dead, Kya becomes the chief suspect.',
    experiences: [
      {
        title: 'Lush natural prose',
        description: 'Readers describe feeling transportive sensory immersion in the marsh wildlife.'
      },
      {
        title: 'Heartbreaking resilience',
        description: 'Readers connect with Kya\'s yearning for human connection despite years of abandonment.'
      }
    ],
    consensus: 'An atmospheric blend of coming-of-age isolation and southern murder mystery.',
    previewSnippet: 'Marsh is not swamp. Marsh is a space of light, where grass grows in water, and water flows into the sky...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/0735219095'
    }
  },

  'evelyn-hugo': {
    bookKey: 'evelyn-hugo',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664458703i/32620332.jpg',
    genres: ['Contemporary', 'Mystery'],
    feelings: ['Fast & gripping', 'Emotional'],
    effort: 'Easy escape',
    priorities: ['Story', 'Characters'],
    experienceTags: ['Old Hollywood', 'Glamour & secret love', 'Unapologetic lead'],
    whySurfaced: 'Matches your desire for a fast, glamorous story driven by ambitious characters and hidden secrets.',
    readerSignal: 'Readers admire Evelyn Hugo as one of the most unapologetic, complex female protagonists in fiction.',
    mismatch: 'The framing storyline involving modern reporter Monique is less compelling than Evelyn\'s historical recount.',
    about: 'Aging Hollywood movie icon Evelyn Hugo chooses unknown magazine reporter Monique Grant to write her final, tell-all biography, detailing her seven marriages and her true secret love.',
    experiences: [
      {
        title: 'High-octane page turner',
        description: 'Readers cite the juicy studio secrets and moral complexity as impossible to put down.'
      },
      {
        title: 'Authentic queer romance',
        description: 'Readers praise the emotional core of the novel, which goes beyond Hollywood ambition into sacrifice.'
      }
    ],
    consensus: 'A glamorous, emotionally charged Hollywood memoir with a unforgettable protagonist.',
    previewSnippet: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life...',
    affiliateLinks: {
      amazon: 'https://www.amazon.com/dp/1501161938'
    }
  }
};
