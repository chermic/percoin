import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Activity } from '../types';

const getObjMaxValue = (map: Record<string, number>): string => {
  console.log('🚀 ~ file: service.ts ~ line 6 ~ getObjMaxValue ~ map', map);
  let maxValue = 0;
  let maxKey = '';
  Object.keys(map).forEach((key) => {
    if (map[key] > maxValue) {
      maxValue = map[key];
      maxKey = key;
    }
  });
  console.log(
    '🚀 ~ file: service.ts ~ line 17 ~ getObjMaxValue ~ maxKey',
    maxKey
  );
  return maxKey;
};

const getFavoriteAction = (items: Activity[]) => {
  if (items.length === 0) {
    return null;
  }

  const map: Record<string, number> = {};
  items.forEach((item) => {
    const key = `${item.action.category}_${item.action.action}`;
    if (map[key] === undefined) {
      map[key] = 0;
    } else {
      map[key] += 1;
    }
  });

  const maxValueKey = getObjMaxValue(map);

  const [category, action] = maxValueKey.split('_');
  const favoriteAction = items.find(
    (item) => item.action.category === category && item.action.action === action
  );
  console.log(
    '🚀 ~ file: service.ts ~ line 33 ~ getFavoriteAction ~ favoriteAction',
    favoriteAction
  );

  if (favoriteAction) {
    return favoriteAction;
  }
};

export const getFavoriteActivityService = async () => {
  try {
    const TableName = process.env.ACTIONS_LOG_TABLE;
    const db = new DynamoDB();
    const scanResult = await db.scan({ TableName });
    const items = scanResult.Items.map((item) => Converter.unmarshall(item));
    console.log(
      '🚀 ~ file: service.ts ~ line 45 ~ getFavoriteActivityService ~ items',
      items
    );
    const favoriteAction = getFavoriteAction(items as Activity[]);
    console.log(
      '🚀 ~ file: service.ts ~ line 46 ~ getFavoriteActivityService ~ favoriteAction',
      favoriteAction
    );

    return favoriteAction;
  } catch (e) {
    throw e;
  }
};
