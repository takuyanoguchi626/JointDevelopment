export type User = {
  name: string;
  Email: string;
  hireDate: Date;
  experience: boolean;
  kindOfEngineer: string;
  langList: Array<string>;
  selfIntroduction?: string;
  projectTeamIdList?: Array<number>;
};
