import { formatALBResult } from '@common/lib/alUtils';
import { dailyPenaltyService } from './service';

const dailyPenaltyApi = async (event) => {
  console.log('🚀 ~ file: api.ts ~ line 4 ~ event', event);
  try {
    await dailyPenaltyService();
  } catch (e) {
    console.log(
      '🚀 ~ file: api.ts ~ line 11 ~ dailyPenaltyApi ~ e',
      JSON.stringify(e)
    );
    return formatALBResult({
      statusCode: 400,
      body: { error: JSON.stringify(e), message: e?.message },
    });
  }
};

export const handler = dailyPenaltyApi;
