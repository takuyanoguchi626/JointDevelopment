import { RecruitLang } from "./recruitLang";
import { ProjectUser } from "./ProjectUser";

export type Project = {
  projectId?: number; //プロジェクトID
  userId: number; //投稿者のID
  postDate: string; //投稿日
  teamName: string; //チーム名
  content: string; //プロジェクト概要
  contentDetail?: string; //プロジェクト詳細（募集要項）
  recruitLang: RecruitLang; //どのエンジニアを何人募集希望なのか
  startDate: string; //プロジェクト開始日
  endDate: string; //プロジェクト終了日
  frequencyMonthOrWeek: string; //活動頻度の単位（月or週）
  frequencyDay: number; //活動頻度の回数
  projectUserList: Array<ProjectUser>; //メンバーの{id,name,kind}一覧
};
