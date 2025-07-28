import { get, post, patch, remove } from "./apiCaller";

export enum QuestType {
  Complete = "Complete",
  Time = "Time",
  Result = "Result",
  XP = "XP",
}

export enum RewardType {
  XP = "xp",
  Heart = "heart",
  Freeze = "freeze",
  Gem = "gem",
}

export type RewardDto = {
  type: RewardType;
  amount: number;
};

export type CreateQuest = {
  title: string;
  icon: string;
  reward: RewardDto;
  type: QuestType;
  condition: number;
  score?: number;
};

export type UpdateQuest = {
  title: string;
  icon: string;
  reward: RewardDto;
  type: QuestType;
  condition: number;
  score?: number;
};

export const getQuestDaily = () => {
  return get("/api/quest/daily");
};

export const generateQuestDaily = () => {
  return post("/api/quest/daily");
};

export const getQuest = () => {
  return get("/api/quest");
};

export const getQuestDetail = (id: string) => {
  return get(`/api/quest/${id}`);
};

export const createQuest = (quest: CreateQuest) => {
  return post(`/api/quest`, quest);
};

export const updateQuest = (id: string, quest: UpdateQuest) => {
  return patch(`/api/quest/${id}`, quest);
};

export const deleteQuest = (id: string) => {
  return remove(`/api/quest/${id}`);
};
