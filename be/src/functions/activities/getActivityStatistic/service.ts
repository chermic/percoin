import { DynamoDB } from '@common/lib/DynamoDB';
import { Converter } from 'aws-sdk/clients/dynamodb';
import { Activity } from '../types';
import { differenceInDays } from 'date-fns';

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
  const notServiceItems = items.filter(
    (activity) => !activity.action.isService
  );
  if (notServiceItems.length === 0) {
    return null;
  }

  const map: Record<string, number> = {};
  notServiceItems.forEach((item) => {
    const key = `${item.action.category}_${item.action.action}`;
    if (map[key] === undefined) {
      map[key] = 1;
    } else {
      map[key] += 1;
    }
  });
  console.log('🚀 ~ file: service.ts ~ line 32 ~ getFavoriteAction ~ map', map);

  const maxValueKey = getObjMaxValue(map);

  const [category, action] = maxValueKey.split('_');
  const favoriteAction = notServiceItems.find(
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

const getBestCourseActivity = (activities: Activity[]) => {
  if (activities.length === 0) {
    return null;
  }
  if (activities.length === 1) {
    return activities[1];
  }
  let maxActivity = activities[0];
  for (let i = 1; i < activities.length; i++) {
    const activity = activities[i];
    if (activity.totalScore > maxActivity.totalScore) {
      maxActivity = activity;
    }
  }

  return maxActivity;
};

const getIdlenessDay = (activities: Activity[]) => {
  if (activities.length === 0) {
    return null;
  }
  const sortedActivities = activities
    .sort((a, b) => a.date - b.date)
    .filter((activity) => !activity.action.isService);
  console.log(
    '🚀 ~ file: service.ts ~ line 83 ~ getIdlenessDay ~ sortedActivities',
    sortedActivities
  );

  if (sortedActivities.length === 0) {
    return null;
  }
  if (sortedActivities.length === 1) {
    const daysCount = differenceInDays(sortedActivities[0].date, Date.now());
    return {
      daysCount,
    };
  }

  let iddlenessDaysCount = 0;
  let iddlenessDay = sortedActivities[0];
  for (let i = 0; i < sortedActivities.length; i++) {
    const activity = sortedActivities[i];
    console.log(
      '🚀 ~ file: service.ts ~ line 92 ~ getIdlenessDay ~ activity',
      activity
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 103 ~ getIdlenessDay ~ iddlenessDay',
      iddlenessDay
    );

    const daysDifference = differenceInDays(iddlenessDay.date, activity.date);
    console.log(
      '🚀 ~ file: service.ts ~ line 95 ~ getIdlenessDay ~ daysDifference',
      daysDifference
    );
    if (daysDifference > iddlenessDaysCount) {
      iddlenessDaysCount = daysDifference;
      iddlenessDay = activity;
    }
  }

  if (iddlenessDaysCount > 0) {
    return {
      daysCount: iddlenessDaysCount,
    };
  }

  return null;
};

export const getActivitiStatisticService = async () => {
  try {
    const TableName = process.env.ACTIONS_LOG_TABLE ?? '';
    const db = new DynamoDB();
    const scanResult = await db.scan({ TableName });
    const activities = scanResult.Items?.map((item) =>
      Converter.unmarshall(item)
    );
    console.log(
      '🚀 ~ file: service.ts ~ line 45 ~ getFavoriteActivityService ~ items',
      activities
    );
    const bestCourseActivity = getBestCourseActivity(activities as Activity[]);
    console.log(
      '🚀 ~ file: service.ts ~ line 112 ~ getActivitiStatisticService ~ bestCourseActivity',
      bestCourseActivity
    );
    const idlenessDay = getIdlenessDay(activities as Activity[]);
    console.log(
      '🚀 ~ file: service.ts ~ line 109 ~ getActivitiStatisticService ~ idlenessDay',
      idlenessDay
    );
    const favoriteAction = getFavoriteAction(activities as Activity[]);
    console.log(
      '🚀 ~ file: service.ts ~ line 46 ~ getFavoriteActivityService ~ favoriteAction',
      favoriteAction
    );

    return {
      favoriteActivity: favoriteAction,
      idlenessDay,
      bestCourse: bestCourseActivity,
    };
  } catch (e) {
    throw e;
  }
};
