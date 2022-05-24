import { RecruitLang } from "./recruitLang";

export type Project = {
  projectId?: number;
  userId: number; //投稿者
  postDate: string; //投稿日
  teamName: string;
  content: string; //プロジェクト概要
  contentDetail: string; //プロジェクト詳細（募集要項）
  recruitLang: RecruitLang; //どのエンジニアを何人募集希望なのか
  startDate: string;
  endDate: string;
  frequencyMonthOrWeek: string;
  frequencyDay: number;
  projectUserList?: Array<number>; //メンバーの{id,name}一覧
};
