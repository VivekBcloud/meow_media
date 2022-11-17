import React from 'react';
import { useActivities } from '../../hooks';
import ActivityCard from './activityCard';

const Activites = () => {
    const { data: activities, isLoading } = useActivities();
    return (
        <div className="p-2 ">
            <div className="px-2 text-sm font-light">Recent Activites</div>
            <div>
                {isLoading
                    ? 'loading'
                    : Array.isArray(activities) &&
                      activities.map((activity) => (
                          <ActivityCard key={activity.id} activity={activity} />
                      ))}
            </div>
        </div>
    );
};

export default Activites;
