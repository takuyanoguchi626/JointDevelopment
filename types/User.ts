type team = { projectId: number; teamName: string; status: string };

export type User = {
  userId?: number;
  name: string;
  email?: string;
  password?: string;
  joiningDate: string;
  experience: string; //presence(あり)absence(なし)
  engineerKinds: string;
  otherAvailableLang: Array<string>;
  introduction?: string;
  team2List?: Array<team>;
  teamList?: Array<team>; //自分が作成したプロジェクト
};
