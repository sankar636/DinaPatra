import React from 'react'

const DailyStoryCard = ({ story }) => {
  return (
    <div className="border p-4 rounded shadow">
      <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{story.title}</h3>
      <p className="text-sm text-gray-600">{story.quote}</p>
      <p className="text-sm mt-1">{new Date(story.visitedDate).toLocaleDateString()}</p>
    </div>
  )
}

export default DailyStoryCard