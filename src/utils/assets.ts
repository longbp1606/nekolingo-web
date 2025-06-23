// Import all images from assets and export them as constants organized by sub-folder

// Cat mascot and other root SVGs
import catMascot from '@/assets/cat-mascot.svg';
import languageModule from '@/assets/language-module.svg';
import progressIcon from '@/assets/progress-icon.svg';
import reactLogo from '@/assets/react.svg';

// Flag icons
import americaFlag from '@/assets/icons/flags/america.png';
import japanFlag from '@/assets/icons/flags/japan.png';
import vietnamFlag from '@/assets/icons/flags/vietnam.png';

// Symbol icons
import accountSymbol from '@/assets/icons/symbols/account.png';
import birdhouseSymbol from '@/assets/icons/symbols/birdhouse.png';
import dumbbellSymbol from '@/assets/icons/symbols/dumbbell.png';
import parchmentSymbol from '@/assets/icons/symbols/parchment.png';
import shopSymbol from '@/assets/icons/symbols/shop.png';
import trophySymbol from '@/assets/icons/symbols/trophy.png';

import topicSymbol from '@/assets/icons/adminSymbols/topics.png';
import grammarSymbol from '@/assets/icons/adminSymbols/grammar.png';
import vocabularySymbol from '@/assets/icons/adminSymbols/vocabulary.png';
import categorySymbol from '@/assets/icons/adminSymbols/cates.png';
import languageSymbol from '@/assets/icons/adminSymbols/language.png';
import courseSymbol from '@/assets/icons/adminSymbols/course.png';
import lessonSymbol from '@/assets/icons/adminSymbols/lesson.png';
import exerciseSymbol from '@/assets/icons/adminSymbols/exercise.png';

// Export root SVGs
export const rootSvgs = {
  catMascot,
  languageModule,
  progressIcon,
  reactLogo
};

// Export flag icons
export const flags = {
  america: americaFlag,
  japan: japanFlag,
  vietnam: vietnamFlag
};

// Export symbol icons
export const symbols = {
  account: accountSymbol,
  birdhouse: birdhouseSymbol,
  dumbbell: dumbbellSymbol,
  parchment: parchmentSymbol,
  shop: shopSymbol,
  trophy: trophySymbol
};

export const adminSymbols = {
  topic: topicSymbol,
  grammar: grammarSymbol,
  vocabulary: vocabularySymbol,
  category: categorySymbol,
  language: languageSymbol,
  course: courseSymbol,
  lesson: lessonSymbol,
  exercise: exerciseSymbol,
};

// Export all assets for convenience
export default {
  ...rootSvgs,
  flags,
  symbols,
  adminSymbols
};