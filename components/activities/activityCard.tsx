import Image from 'next/image';
import { useMapUserIdToUsername } from '../../hooks';
import { relativeTimeFromDates } from '../../lib/helper';
import { activityType } from '../../types/all';

const ActivityCard = ({ activity }: { activity: activityType }) => {
    const username = useMapUserIdToUsername(activity.user_id);
    return (
        <div className="p-2  text-gray-300 font-light flex gap-4 items-center bg-bg m-1 rounded-xl">
            <div className="flex aspect-w-1 overflow-hidden w-10 h-10 rounded-full bg-impact">
                <Image
                    layout="fill"
                    src={
                        `https://cshhlpsxxvoyacgyjyqd.supabase.co/storage/v1/object/public/avatars/${activity.user_id}` ||
                        '/profile_2.svg'
                    }
                    alt={activity.user_id || 'username'}
                />
            </div>
            <div className="flex flex-grow flex-col ">
                <div className="text-sm text-white flex justify-between">
                    {username}{' '}
                    <div className="text-xs text-gray-300 font-extralight">
                        {relativeTimeFromDates(new Date(activity.created_at))}
                    </div>
                </div>
                <div>Posted a new {activity.type}</div>
            </div>
        </div>
    );
};

export default ActivityCard;
