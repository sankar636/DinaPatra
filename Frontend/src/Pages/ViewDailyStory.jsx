import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewDailyStory = () => {
  const { storyId } = useParams(); // Get the story ID from the URL
  const [story, setStory] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${baseURL}/daily-story/${storyId}`, { // Correct endpoint
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStory(response.data.data); // Ensure correct data structure
      } catch (error) {
        console.error('Error fetching story details:', error);
      }
    };

    fetchStory();
  }, [storyId]);

  if (!story) {
    return <p>Loading story details...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <img src={story.image} alt={story.title} className="w-full h-96 object-cover rounded-lg mb-4" />
      <p className="text-lg text-gray-700">{story.description}</p>
      <p className="text-sm text-gray-500 mt-2">Date: {story.date}</p>
    </div>
  );
};

export default ViewDailyStory;