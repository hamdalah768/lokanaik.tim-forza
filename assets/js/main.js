import { setupCommon, setupHome } from "./common.js";
import { setupSearch } from "./search.js";
import { setupLearningHub, setupLesson } from "./learning.js";
import { setupStories } from "./stories.js";
import { setupStudio } from "./studio.js";
import { setupAccount } from "./account.js";
setupCommon();
const initialize = {
  beranda: setupHome,
  pencarian: setupSearch,
  belajar: setupLearningHub,
  materi: setupLesson,
  cerita: setupStories,
  studio: setupStudio,
  akun: setupAccount,
};
initialize[document.body.dataset.sitePage]?.();
document.documentElement.dataset.appReady = "true";
