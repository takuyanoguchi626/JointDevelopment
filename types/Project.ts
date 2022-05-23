import { isFirstDayOfMonth } from "date-fns";
import { RecruitLang } from "./recruitLang";

export type Project = {
  projectId?: number;
  userId: number; //投稿者
  postDate: string;
  teamName: string;
  content: string;
  startDate: string;
  endDate: string;
  frequencyMonthOrWeek: string;
  frequencyDay: number;
  projectUserList?: Array<number>;
  contentDetail?: string;
  recruitLang?: RecruitLang;
};
