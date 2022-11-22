import { useQuery } from '@tanstack/react-query';
import fetcher from '../../lib/fetcher';
import { activityType } from '../../types/all';

const fetchActivities = async () => {
  const res = await fetcher<activityType[]>('/activities');
  return res;
};

const useActivities = () => {
  return useQuery(['activities'], fetchActivities);
};
export { fetchActivities, useActivities };
