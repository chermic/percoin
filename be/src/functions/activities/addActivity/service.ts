import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Activity } from '../types';

const dynamoDb = new DynamoDB();

const DEFAULT_SCORE_VALUE = 100_500;

const createFirstServiceItem = (date: number): Activity => {
  const firstServiceItem: Activity = {
    action: {
      action: 'start',
      category: 'service',
      isService: true,
      score: DEFAULT_SCORE_VALUE,
    },
    date: date - 1,
    totalScore: DEFAULT_SCORE_VALUE,
    user: 'service',
  };

  return firstServiceItem;
};

const isStartActivity = (activity: Activity): boolean =>
  activity.user === 'service' &&
  activity.action.isService &&
  activity.action.action === 'start' &&
  activity.action.category === 'service';

export const addActivityService = async (
  newActivity: Omit<Activity, 'totalScore'>
) => {
  try {
    const firstServiceItem = createFirstServiceItem(newActivity.date);
    const TableName = process.env.ACTIONS_LOG_TABLE ?? '';
    const itemsCount = await dynamoDb.scan({
      TableName,
      Select: 'COUNT',
      Limit: 1,
    });
    console.log('🚀 ~ file: service.ts ~ line 19 ~ itemsCount', itemsCount);
    if (itemsCount.Count === 0) {
      const Item = Converter.marshall({
        ...newActivity,
        totalScore: firstServiceItem.totalScore + newActivity.action.score,
      });

      await dynamoDb.putItem({
        TableName,
        Item: Converter.marshall(firstServiceItem),
      });
      const result = await dynamoDb.putItem({ TableName, Item });
    } else {
      const scanResult = await dynamoDb.scan({ TableName });
      if (!scanResult.Items || scanResult.Items.length === 0) {
        return;
      }
      const allItems = scanResult.Items?.map((activity) =>
        Converter.unmarshall(activity)
      ) as Activity[];
      console.log('🚀 ~ file: service.ts ~ line 34 ~ allItems', allItems);
      const sortedItems = allItems?.sort((a, b) => a.date - b.date);
      console.log('🚀 ~ file: service.ts ~ line 36 ~ sortedItems', sortedItems);
      let prevActivity: null | Activity = null;
      for (let i = 0; i < sortedItems.length; i++) {
        const activity = sortedItems[i];
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
      console.log(
        '🚀 ~ file: service.ts ~ line 48 ~ prevActivity',
        prevActivity
      );
      if (prevActivity) {
        const Item = Converter.marshall({
          ...newActivity,
          totalScore: prevActivity.totalScore + newActivity.action.score,
        });
        const result = await dynamoDb.putItem({ TableName, Item });
      } else {
        const existingStartServiceItem = allItems.find(isStartActivity);
        if (existingStartServiceItem) {
          console.log(
            '🚀 ~ file: service.ts ~ line 91 ~ existingStartServiceItem',
            existingStartServiceItem
          );
          const deletingItem = Converter.marshall({
            user: existingStartServiceItem.user,
            date: existingStartServiceItem.date,
          });
          await dynamoDb.dynamoDb
            .deleteItem({
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
        console.log(
          '🚀 ~ file: service.ts ~ line 72 ~ updatedItems',
          updatedItems
        );
        const dynamoDbItems = updatedItems.map((item) =>
          Converter.marshall(item)
        );
        console.log(
          '🚀 ~ file: service.ts ~ line 80 ~ dynamoDbItems',
          dynamoDbItems
        );
        await Promise.all(
          dynamoDbItems.map((item) =>
            dynamoDb.putItem({ TableName, Item: item })
          )
        );
      }
    }
  } catch (e) {
    throw e;
  }
};
