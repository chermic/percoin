import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { endOfDay, startOfDay } from 'date-fns';
import { SERVICE_ACTIONS, SERVICE_CATEGORY, SERVICE_USER } from '../constants';
import { Activity } from '../types';

const dynamoDb = new DocumentClient();

const DEFAULT_SCORE_VALUE = 100_500;

const getActionslogTableName = () => process.env.ACTIONS_LOG_TABLE ?? '';

const createFirstServiceItem = (date: number): Activity => {
  const firstServiceItem: Activity = {
    action: {
      action: SERVICE_ACTIONS.START,
      category: SERVICE_CATEGORY,
      isService: true,
      score: DEFAULT_SCORE_VALUE,
    },
    date: date - 1,
    totalScore: DEFAULT_SCORE_VALUE,
    user: SERVICE_USER,
  };

  return firstServiceItem;
};

const isStartActivity = (activity: Activity): boolean =>
  activity.user === SERVICE_USER &&
  activity.action.isService &&
  activity.action.action === SERVICE_ACTIONS.START &&
  activity.action.category === SERVICE_CATEGORY;

const getItemIfPreviousExists = (
  newActivity: Omit<Activity, 'totalScore'>,
  items: Activity[]
): Activity | null => {
  let prevActivity: null | Activity = null;
  for (let i = 0; i < items.length; i++) {
    const activity = items[i];
    if (
      activity.date < newActivity.date &&
      ((prevActivity &&
        prevActivity.date < activity.date &&
        activity.date < newActivity.date) ||
        prevActivity === null)
    ) {
      prevActivity = activity;
    }
  }
  console.log('🚀 ~ file: service.ts ~ line 48 ~ prevActivity', prevActivity);
  if (!prevActivity) {
    return null;
  }

  const Item = {
    ...newActivity,
    totalScore: prevActivity.totalScore + newActivity.action.score,
  };
  return Item;
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const addActivityService = async (
  newActivity: Omit<Activity, 'totalScore'>
) => {
  try {
    const firstServiceItem = createFirstServiceItem(
      Math.floor(
        getRandomNumber(
          startOfDay(new Date(newActivity.date)).getTime(),
          endOfDay(new Date(newActivity.date)).getTime()
        )
      )
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 79 ~ firstServiceItem',
      firstServiceItem
    );
    const TableName = getActionslogTableName();
    const itemsCount = await dynamoDb
      .scan({
        TableName,
        Select: 'COUNT',
        Limit: 1,
      })
      .promise();
    console.log('🚀 ~ file: service.ts ~ line 19 ~ itemsCount', itemsCount);
    if (itemsCount.Count === 0) {
      const Item = {
        ...newActivity,
        totalScore: firstServiceItem.totalScore + newActivity.action.score,
      };

      await dynamoDb
        .put({
          TableName,
          Item: firstServiceItem,
        })
        .promise();
      const result = await dynamoDb.put({ TableName, Item }).promise();
      return;
    }

    const scanResult = await dynamoDb.scan({ TableName }).promise();
    const allItems = scanResult.Items as Activity[];
    console.log('🚀 ~ file: service.ts ~ line 34 ~ allItems', allItems);
    const sortedItems = allItems?.sort((a, b) => a.date - b.date);
    console.log('🚀 ~ file: service.ts ~ line 36 ~ sortedItems', sortedItems);
    const newItem = getItemIfPreviousExists(newActivity, sortedItems);
    if (newItem) {
      console.log('🚀 ~ file: service.ts ~ line 115 ~ newItem', newItem);
      const result = await dynamoDb.put({ TableName, Item: newItem }).promise();
      return;
    }

    const existingStartServiceItem = allItems.find(isStartActivity);
    if (existingStartServiceItem) {
      console.log(
        '🚀 ~ file: service.ts ~ line 91 ~ existingStartServiceItem',
        existingStartServiceItem
      );
      const deletingItem = {
        user: existingStartServiceItem.user,
        date: existingStartServiceItem.date,
      };
      await dynamoDb
        .delete({
          TableName,
          Key: deletingItem,
        })
        .promise();
    }
    console.log(
      '🚀 ~ file: service.ts ~ line 84 ~ firstServiceItem',
      firstServiceItem
    );
    const notServiceItems = sortedItems.filter(
      (item) => !isStartActivity(item)
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 96 ~ notServiceItems',
      notServiceItems
    );
    const updatedItems: Activity[] = [
      firstServiceItem,
      {
        ...newActivity,
        totalScore: firstServiceItem.totalScore + newActivity.action.score,
      },
    ];
    for (let i = 0; i < notServiceItems.length; i++) {
      const activity = notServiceItems[i];

      updatedItems.push({
        ...activity,
        totalScore:
          updatedItems[updatedItems.length - 1].totalScore +
          activity.action.score,
      });
    }
    console.log('🚀 ~ file: service.ts ~ line 72 ~ updatedItems', updatedItems);
    await Promise.all(
      updatedItems.map((item) =>
        dynamoDb.put({ TableName, Item: item }).promise()
      )
    );
  } catch (e) {
    throw e;
  }
};
