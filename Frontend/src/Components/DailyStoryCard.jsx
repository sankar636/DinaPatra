import React from 'react'
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

const DailyStoryCard = ({ story }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/daily-story/${story._id}`); // Ensure correct route
  };

  return (
    <div
      className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer"
      onClick={handleCardClick} // Add click handler
    >
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-56 object-cover rounded-lg"
      />

      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
      >
        <FaHeart
          className={`icon-btn ${story.isFavourite ? "text-red-500" : "text-white"
            } hover:text-red-500`}
        />
      </button>

      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-[16px] font-medium">{story.title}</h6>

            <span className="text-xs text-slate-500">
              {story.date ? moment(story.date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DailyStoryCard