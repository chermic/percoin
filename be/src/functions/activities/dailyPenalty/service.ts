import { DynamoDB } from 'aws-sdk';
import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';
import { SERVICE_ACTIONS, SERVICE_CATEGORY, SERVICE_USER } from '../constants';
import { Activity } from '../types';

const DAILY_PENALTY = 80;
const ddb = new DynamoDB.DocumentClient();

const createServiceAction = (date: number) => ({
  date,
  totalScore: 0,
  user: SERVICE_USER,
  action: {
    isService: true,
    score: -DAILY_PENALTY,
    action: SERVICE_ACTIONS.DAILY_PENALTY,
    category: SERVICE_CATEGORY,
  },
});

export const dailyPenaltyService = async () => {
  try {
    const TableName = process.env.ACTIONS_LOG_TABLE ?? '';
    const scanResult = await ddb.scan({ TableName }).promise();
    console.log(
      '🚀 ~ file: service.ts ~ line 13 ~ dailyPenaltyService ~ scanResult',
      scanResult
    );
    if (!scanResult.Count) {
      return;
    }
    const items = (scanResult.Items! as Activity[]).sort(
      (a, b) => a.date - b.date
    );
    const now = Date.now();
    let lastElementDate = items[items.length - 1].date;
    while (differenceInCalendarDays(now, lastElementDate) >= 1) {
      const lastElementDateNextDay = startOfDay(
        addDays(lastElementDate, 1)
      ).getTime();
      items.push(createServiceAction(lastElementDateNextDay));
      lastElementDate = lastElementDateNextDay;
    }
    console.log(
      '🚀 ~ file: service.ts ~ line 24 ~ dailyPenaltyService ~ items',
      items
    );
    const dates: number[] = [];
    for (let i = 0; i < items.length - 1; i++) {
      const activity = items[i];
      const nextActivity = items[i + 1];
      const daysDifference = differenceInCalendarDays(
        activity.date,
        nextActivity.date
      );
      if (daysDifference < 1) {
        continue;
      }

      let currentDate = activity.date;
      while (currentDate < nextActivity.date) {
        const nextDay = addDays(currentDate, 1);
        const startOfNextDay = startOfDay(nextDay);
        currentDate = startOfNextDay.getTime();
        dates.push(currentDate);
      }
    }
    console.log(
      '🚀 ~ file: service.ts ~ line 25 ~ dailyPenaltyService ~ dates',
      dates
    );

    const serviceActions = dates.map(
      (date): Activity => createServiceAction(date)
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 58 ~ dailyPenaltyService ~ serviceActions',
      serviceActions
    );

    const newItems = items
      .concat(serviceActions)
      .sort((a, b) => a.date - b.date);
    for (let i = 1; i < newItems.length; i++) {
      const activity = newItems[i];
      const prevActivity = newItems[i - 1];
      activity.totalScore = prevActivity.totalScore + activity.action.score;
    }
    console.log(
      '🚀 ~ file: service.ts ~ line 62 ~ dailyPenaltyService ~ newItems',
      newItems
    );

    const result = await Promise.all(
      newItems.map((item) => ddb.put({ TableName, Item: item }).promise())
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 97 ~ dailyPenaltyService ~ result',
      result
    );
  } catch (e) {
    throw e;
  }
};
