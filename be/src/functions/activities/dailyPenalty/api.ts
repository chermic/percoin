import { ALHandler } from '@common/types/AWSHandler';

const dailyPenaltyApi: ALHandler = (event) => {
  console.log('🚀 ~ file: api.ts ~ line 4 ~ event', event);
};

export const handler = dailyPenaltyApi;
