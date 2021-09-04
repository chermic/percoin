export type Action = {
  score: number;
  category: string;
  action: string;
  isService: boolean;
};

export type Activity = {
  user: string;
  date: number;
  action: Action;
  totalScore: number;
};
