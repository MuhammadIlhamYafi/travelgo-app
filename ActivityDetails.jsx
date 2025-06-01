import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await API.get(`/api/v1/activity/${id}`);
        setActivity(res.data.data);
      } catch (error) {
        console.error('Error fetching activity', error);
      }
    };
    fetchActivity();
  }, [id]);

  if (!activity) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <img src={activity.imageUrl} alt={activity.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{activity.title}</h1>
      <p className="text-gray-700 mb-4">{activity.description}</p>
      <p className="text-blue-600 font-semibold">Price: Rp{activity.price}</p>
    </div>
  );
}

export default ActivityDetail;