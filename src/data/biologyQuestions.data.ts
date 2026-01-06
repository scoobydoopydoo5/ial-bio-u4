/* =========================================================
   TYPES
========================================================= */

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: number;
  topic: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  markingPoints: string[][]; // Each group = 1 mark
  baseXP: number;
}

/* =========================================================
   XP CONFIG
========================================================= */

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 5,
  Hard: 8,
};

/* =========================================================
   QUESTIONS
========================================================= */

export const biologyQuestions: Question[] = [
  {
    id: 1,
    topic: "Photosynthesis",
    difficulty: "Medium",
    question: "Why do thylakoid membranes contain many types of pigments?",
    answer:
      "To absorb light over a wide range of wavelengths, maximizing photosynthesis.",
    markingPoints: [
      ["absorb", "absorption"],
      ["light"],
      ["wavelengths", "range"],
      ["photosynthesis"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 2,
    topic: "Photosynthesis",
    difficulty: "Hard",
    question: "Explain the role of light energy in photosynthesis.",
    answer:
      "Light excites electrons in chlorophyll, producing ATP and NADPH and enabling photolysis of water.",
    markingPoints: [
      ["light"],
      ["excite", "excited", "excitation"],
      ["electron", "electrons"],
      ["ATP"],
      ["NADPH"],
      ["photolysis", "water"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 3,
    topic: "Ecosystems",
    difficulty: "Hard",
    question: "What is net primary productivity (NPP)?",
    answer:
      "Energy stored by producers after respiration, available to the next trophic level.",
    markingPoints: [
      ["energy", "biomass", "chemical energy"],
      ["producer", "plant", "autotroph"],
      ["respiration", "respired", "respiratory"],
      ["trophic", "consumer", "food level"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 4,
    topic: "Ecology",
    difficulty: "Medium",
    question: "Why does ecological succession occur in stages?",
    answer:
      "Each stage improves the habitat, allowing new species to colonize.",
    markingPoints: [
      ["habitat"],
      ["improve", "modify", "change"],
      ["species", "colonize", "appear"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 5,
    topic: "Climate Change",
    difficulty: "Easy",
    question: "What type of radiation is trapped by greenhouse gases?",
    answer: "Infrared radiation.",
    markingPoints: [["infrared"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  // NEW QUESTIONS START HERE
  {
    id: 6,
    topic: "Cell Biology",
    difficulty: "Medium",
    question: "What is the function of mitochondria?",
    answer: "Mitochondria produce ATP via cellular respiration.",
    markingPoints: [
      ["mitochondria"],
      ["ATP"],
      ["cellular respiration", "respiration"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 7,
    topic: "Genetics",
    difficulty: "Hard",
    question: "Explain the difference between dominant and recessive alleles.",
    answer:
      "Dominant alleles express their trait when present; recessive alleles only express when both alleles are recessive.",
    markingPoints: [
      ["dominant"],
      ["recessive"],
      ["trait", "express", "expression"],
      ["both alleles", "homozygous"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 8,
    topic: "Evolution",
    difficulty: "Medium",
    question: "What is natural selection?",
    answer:
      "The process where organisms with advantageous traits survive and reproduce more successfully.",
    markingPoints: [
      ["organisms", "species"],
      ["advantageous traits", "adaptation"],
      ["survive", "reproduce"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 9,
    topic: "Human Anatomy",
    difficulty: "Easy",
    question: "Which organ pumps blood throughout the body?",
    answer: "The heart.",
    markingPoints: [["heart"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 10,
    topic: "Cell Biology",
    difficulty: "Hard",
    question: "Describe the role of ribosomes in a cell.",
    answer: "Ribosomes synthesize proteins using mRNA as a template.",
    markingPoints: [
      ["ribosomes"],
      ["protein synthesis", "proteins"],
      ["mRNA", "template"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 11,
    topic: "Microbiology",
    difficulty: "Medium",
    question: "Why are viruses considered non-living?",
    answer:
      "Because they cannot reproduce independently and lack cellular structure.",
    markingPoints: [
      ["cannot reproduce", "replication"],
      ["non-living"],
      ["no cells", "cellular structure"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 12,
    topic: "Ecology",
    difficulty: "Hard",
    question: "Explain the role of keystone species in an ecosystem.",
    answer:
      "Keystone species have a disproportionate effect on the ecosystem, maintaining structure and diversity.",
    markingPoints: [
      ["keystone species"],
      ["ecosystem", "environment"],
      ["structure", "diversity"],
      ["disproportionate effect", "impact"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 13,
    topic: "Plant Biology",
    difficulty: "Medium",
    question: "What is transpiration in plants?",
    answer: "Loss of water vapor from leaves through stomata.",
    markingPoints: [["transpiration"], ["water vapor"], ["leaves", "stomata"]],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 14,
    topic: "Human Physiology",
    difficulty: "Medium",
    question: "How does insulin regulate blood sugar?",
    answer:
      "Insulin allows cells to take up glucose, lowering blood sugar levels.",
    markingPoints: [
      ["insulin"],
      ["glucose", "sugar"],
      ["cells", "uptake"],
      ["blood sugar", "levels"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 15,
    topic: "Genetics",
    difficulty: "Easy",
    question: "What is DNA composed of?",
    answer:
      "DNA is composed of nucleotides containing a sugar, phosphate, and base.",
    markingPoints: [
      ["DNA"],
      ["nucleotide", "nucleotides"],
      ["sugar"],
      ["phosphate"],
      ["base"],
    ],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 16,
    topic: "Photosynthesis",
    difficulty: "Medium",
    question: "What is the main product of the Calvin cycle?",
    answer: "G3P (glyceraldehyde-3-phosphate).",
    markingPoints: [["G3P", "glyceraldehyde-3-phosphate"]],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 17,
    topic: "Evolution",
    difficulty: "Hard",
    question: "Explain the concept of genetic drift.",
    answer:
      "Genetic drift is the random change in allele frequencies in a population.",
    markingPoints: [
      ["genetic drift"],
      ["random change", "chance"],
      ["allele frequencies"],
      ["population"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 18,
    topic: "Microbiology",
    difficulty: "Easy",
    question: "What is the shape of a typical bacterium?",
    answer: "Bacteria can be rod-shaped, spherical (cocci), or spiral.",
    markingPoints: [
      ["rod-shaped", "bacillus"],
      ["spherical", "cocci"],
      ["spiral", "spirillum"],
    ],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 19,
    topic: "Ecology",
    difficulty: "Medium",
    question: "What is a food web?",
    answer: "A network of interconnected food chains in an ecosystem.",
    markingPoints: [["food web"], ["food chains"], ["ecosystem"]],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 20,
    topic: "Plant Biology",
    difficulty: "Hard",
    question: "How do CAM plants conserve water?",
    answer:
      "They fix CO₂ at night and minimize water loss during the day via stomata.",
    markingPoints: [
      ["CAM plants"],
      ["CO2 fixation", "fix CO2"],
      ["stomata"],
      ["water conservation", "water loss"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  }, // Add these to biologyQuestions array

  // ======================= QUESTIONS 21-40 =======================
  {
    id: 21,
    topic: "Human Anatomy",
    difficulty: "Medium",
    question: "What is the function of the liver in the human body?",
    answer:
      "The liver detoxifies chemicals, metabolizes drugs, produces bile, and stores glycogen.",
    markingPoints: [
      ["detoxify", "detoxification"],
      ["metabolize", "drugs"],
      ["bile"],
      ["glycogen", "store"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 22,
    topic: "Cell Biology",
    difficulty: "Easy",
    question: "Which part of the cell contains genetic material?",
    answer: "The nucleus contains DNA, which is the genetic material.",
    markingPoints: [["nucleus"], ["DNA"], ["genetic material"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 23,
    topic: "Genetics",
    difficulty: "Medium",
    question: "What is the difference between homozygous and heterozygous?",
    answer:
      "Homozygous has identical alleles, heterozygous has different alleles for a gene.",
    markingPoints: [
      ["homozygous", "identical alleles"],
      ["heterozygous", "different alleles"],
      ["gene"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 24,
    topic: "Evolution",
    difficulty: "Medium",
    question: "Define adaptation in biology.",
    answer:
      "Adaptation is a heritable trait that increases an organism’s chance of survival and reproduction.",
    markingPoints: [
      ["adaptation"],
      ["heritable trait"],
      ["survival", "reproduction"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 25,
    topic: "Plant Biology",
    difficulty: "Easy",
    question: "What are stomata?",
    answer: "Stomata are pores on leaves that allow gas exchange.",
    markingPoints: [["stomata"], ["pores"], ["gas exchange"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 26,
    topic: "Human Physiology",
    difficulty: "Hard",
    question: "Explain how the kidneys regulate water balance.",
    answer:
      "Kidneys filter blood, reabsorb water and ions, and excrete excess water as urine to maintain homeostasis.",
    markingPoints: [
      ["filter blood", "filtration"],
      ["reabsorb water", "reabsorption"],
      ["urine", "excretion"],
      ["homeostasis"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 27,
    topic: "Microbiology",
    difficulty: "Medium",
    question: "What is the function of bacterial flagella?",
    answer:
      "Flagella help bacteria move (motility) and sometimes sense their environment.",
    markingPoints: [
      ["flagella"],
      ["motility", "movement"],
      ["sense", "environment"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 28,
    topic: "Ecology",
    difficulty: "Hard",
    question: "What is biomagnification?",
    answer:
      "Biomagnification is the increase in concentration of toxins as they move up a food chain.",
    markingPoints: [
      ["biomagnification"],
      ["toxins", "pollutants"],
      ["food chain", "trophic level"],
      ["increase", "accumulate"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 29,
    topic: "Photosynthesis",
    difficulty: "Easy",
    question: "What gas do plants release during photosynthesis?",
    answer: "Oxygen is released as a by-product of photosynthesis.",
    markingPoints: [["oxygen"], ["photosynthesis"], ["by-product"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 30,
    topic: "Cell Biology",
    difficulty: "Medium",
    question: "What is the role of the endoplasmic reticulum?",
    answer:
      "Rough ER synthesizes proteins, and smooth ER synthesizes lipids and detoxifies chemicals.",
    markingPoints: [
      ["rough ER", "protein synthesis"],
      ["smooth ER", "lipid synthesis", "detoxification"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 31,
    topic: "Genetics",
    difficulty: "Hard",
    question: "What is a Punnett square used for?",
    answer:
      "A Punnett square predicts the probability of offspring inheriting specific alleles.",
    markingPoints: [
      ["Punnett square"],
      ["probability"],
      ["offspring"],
      ["alleles", "inheritance"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 32,
    topic: "Evolution",
    difficulty: "Medium",
    question: "Explain convergent evolution.",
    answer:
      "Convergent evolution occurs when unrelated species develop similar traits due to similar environments.",
    markingPoints: [
      ["convergent evolution"],
      ["unrelated species"],
      ["similar traits"],
      ["environment", "conditions"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 33,
    topic: "Plant Biology",
    difficulty: "Medium",
    question: "What is the function of xylem and phloem?",
    answer:
      "Xylem transports water, and phloem transports nutrients like sugars in plants.",
    markingPoints: [
      ["xylem", "water transport"],
      ["phloem", "nutrient transport", "sugar transport"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 34,
    topic: "Human Anatomy",
    difficulty: "Hard",
    question: "Describe the pathway of air from the nose to the alveoli.",
    answer:
      "Air passes through the nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.",
    markingPoints: [
      ["nose"],
      ["pharynx"],
      ["larynx"],
      ["trachea"],
      ["bronchi", "bronchioles"],
      ["alveoli"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 35,
    topic: "Microbiology",
    difficulty: "Easy",
    question: "What is a pathogen?",
    answer: "A pathogen is an organism that causes disease.",
    markingPoints: [["pathogen"], ["disease"], ["organism"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
  {
    id: 36,
    topic: "Ecology",
    difficulty: "Medium",
    question: "What is an ecological niche?",
    answer:
      "An ecological niche is the role and position a species has in its ecosystem.",
    markingPoints: [
      ["niche"],
      ["role", "position"],
      ["ecosystem"],
      ["species"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 37,
    topic: "Photosynthesis",
    difficulty: "Hard",
    question: "Describe the function of NADP+ in photosynthesis.",
    answer:
      "NADP+ accepts electrons to form NADPH during the light-dependent reactions.",
    markingPoints: [
      ["NADP+"],
      ["accept electrons", "electron carrier"],
      ["NADPH"],
      ["light-dependent reactions"],
    ],
    baseXP: XP_BY_DIFFICULTY.Hard,
  },
  {
    id: 38,
    topic: "Cell Biology",
    difficulty: "Medium",
    question: "What is osmosis?",
    answer:
      "Osmosis is the diffusion of water across a semipermeable membrane.",
    markingPoints: [
      ["osmosis"],
      ["water"],
      ["semipermeable membrane"],
      ["diffusion"],
    ],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 39,
    topic: "Genetics",
    difficulty: "Medium",
    question: "What is codominance?",
    answer:
      "Codominance occurs when both alleles contribute equally to the phenotype.",
    markingPoints: [["codominance"], ["alleles"], ["phenotype"]],
    baseXP: XP_BY_DIFFICULTY.Medium,
  },
  {
    id: 40,
    topic: "Evolution",
    difficulty: "Easy",
    question: "Who proposed the theory of evolution by natural selection?",
    answer:
      "Charles Darwin proposed the theory of evolution by natural selection.",
    markingPoints: [["Charles Darwin"], ["natural selection"], ["evolution"]],
    baseXP: XP_BY_DIFFICULTY.Easy,
  },
];
