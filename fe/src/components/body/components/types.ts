export type Action = {
  score: number;
  category: string;
  action: string;
};

export type Activity = {
  user: string;
  date: number;
  action: Action;
};
