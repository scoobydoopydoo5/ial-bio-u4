import {
  Cat,
  Ghost,
  IceCream,
  Planet,
  SpeechBubble,
  Mug,
  Browser,
  File,
  Backpack,
  Astronaut,
  Chocolate,
  CreditCard,
  Cyborg,
  Folder,
  HumanCat,
  HumanDinosaur,
} from "react-kawaii";

export type KawaiiMood =
  | "sad"
  | "shocked"
  | "happy"
  | "blissful"
  | "lovestruck"
  | "excited"
  | "ko";

export type KawaiiCharacter =
  | "cat"
  | "ghost"
  | "iceCream"
  | "planet"
  | "speechBubble"
  | "mug"
  | "browser"
  | "file"
  | "backpack"
  | "astronaut"
  | "chocolate"
  | "creditCard"
  | "cyborg"
  | "folder"
  | "humanCat"
  | "humanDinosaur";

interface KawaiiMascotProps {
  character?: KawaiiCharacter;
  mood?: KawaiiMood;
  size?: number;
  color?: string;
  className?: string;
}

const characterColors: Record<KawaiiCharacter, string> = {
  cat: "#FFD882",
  ghost: "#E0E4E8",
  iceCream: "#FDA7DC",
  planet: "#A6E0FF",
  speechBubble: "#83D1FB",
  mug: "#A5D6A7",
  browser: "#61DAFB",
  file: "#FFB74D",
  backpack: "#CE93D8",
  astronaut: "#B2DFDB",
  chocolate: "#D2691E",
  creditCard: "#4FC3F7",
  cyborg: "#90A4AE",
  folder: "#FFCC80",
  humanCat: "#FFC0CB",
  humanDinosaur: "#A5D6A7",
};

export const KawaiiMascot = ({
  character = "ghost",
  mood = "happy",
  size = 100,
  color,
  className = "",
}: KawaiiMascotProps) => {
  const finalColor = color || characterColors[character];
  const props = { size, mood, color: finalColor };

  const renderCharacter = () => {
    switch (character) {
      case "cat":
        return <Cat {...props} />;
      case "ghost":
        return <Ghost {...props} />;
      case "iceCream":
        return <IceCream {...props} />;
      case "planet":
        return <Planet {...props} />;
      case "speechBubble":
        return <SpeechBubble {...props} />;
      case "mug":
        return <Mug {...props} />;
      case "browser":
        return <Browser {...props} />;
      case "file":
        return <File {...props} />;
      case "backpack":
        return <Backpack {...props} />;
      case "astronaut":
        return <Astronaut {...props} />;
      case "chocolate":
        return <Chocolate {...props} />;
      case "creditCard":
        return <CreditCard {...props} />;
      case "cyborg":
        return <Cyborg {...props} />;
      case "folder":
        return <Folder {...props} />;
      case "humanCat":
        return <HumanCat {...props} />;
      case "humanDinosaur":
        return <HumanDinosaur {...props} />;
      default:
        return <Ghost {...props} />;
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {renderCharacter()}
    </div>
  );
};

export const getRandomCharacter = (): KawaiiCharacter => {
  const characters: KawaiiCharacter[] = [
    "cat",
    "ghost",
    "iceCream",
    "planet",
    "speechBubble",
    "mug",
    "browser",
    "file",
    "backpack",
    "astronaut",
    "chocolate",
    "creditCard",
    "cyborg",
    "folder",
    "humanCat",
    "humanDinosaur",
  ];
  return characters[Math.floor(Math.random() * characters.length)];
};

export const getMoodFromAction = (
  action: "success" | "error" | "loading" | "idle" | "celebration"
): KawaiiMood => {
  switch (action) {
    case "success":
      return "blissful";
    case "error":
      return "sad";
    case "loading":
      return "shocked";
    case "celebration":
      return "excited";
    default:
      return "happy";
  }
};

export const kawaiiCharacters: KawaiiCharacter[] = [
  "cat",
  "ghost",
  "iceCream",
  "planet",
  "speechBubble",
  "mug",
  "browser",
  "file",
  "backpack",
  "astronaut",
  "chocolate",
  "creditCard",
  "cyborg",
  "folder",
  "humanCat",
  "humanDinosaur",
];
