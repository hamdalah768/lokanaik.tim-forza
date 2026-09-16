import { readLocal, writeLocal } from "./utils.js";
const key = "lokanaik.learning.v1";
const modules = ["foto", "katalog", "keamanan"];
export function readProgress() {
  const raw = readLocal(key, {}),
    result = {};
  for (const id of modules) {
    const item = raw?.[id];
    const tasks =
      Array.isArray(item?.tasks) &&
      item.tasks.length === 3 &&
      item.tasks.every((v) => typeof v === "boolean")
        ? [...item.tasks]
        : [false, false, false];
    const correct = item?.correct === true;
    result[id] = {
      tasks,
      correct,
      completed: item?.completed === true && correct && tasks.every(Boolean),
    };
  }
  return result;
}
export function saveProgress(id, item) {
  if (!modules.includes(id)) return false;
  const data = readProgress();
  data[id] = {
    tasks: [...item.tasks],
    correct: item.correct === true,
    completed:
      item.completed === true && item.correct && item.tasks.every(Boolean),
  };
  return writeLocal(key, data);
}
export const resetProgress = () => writeLocal(key, {});
export const completedCount = () =>
  Object.values(readProgress()).filter((item) => item.completed).length;
export function rememberModule(id) {
  if (modules.includes(id)) writeLocal("lokanaik.lastModule.v1", id);
}
