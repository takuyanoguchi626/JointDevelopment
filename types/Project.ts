export type Project = {
  project_id: number;
  user_id: number; //投稿者
  post_date: Date;
  team_name: string;
  content: string;
  start_date: Date;
  end_date: Date;
  frequency_month_or_week: string;
  frequency_day: number;
};
