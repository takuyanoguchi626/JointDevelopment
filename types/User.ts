export type User = {
  user_id?: number;
  name: string;
  Email: string;
  password?: string;
  hireDate: Date;
  experience: string; //presence(あり)absence(なし)
  kindOfEngineer: string;
  langList: Array<string>;
  selfIntroduction?: string;
  projectTeamIdList?: Array<number>;
  recruitedProjectIdList?: Array<number>; //自分がリーダーのPJで、応募されたPJのIDのリスト
};
