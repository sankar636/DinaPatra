import React from 'react'
import moment from "moment"
import { FaLocationDot } from "react-icons/fa6"
import { FaHeart } from "react-icons/fa"

const DailyStoryCard = ({ story }) => {
  console.log("Story", story);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-56 object-cover rounded-lg"
        // onClick={onClick}
      />

      <button
        className="w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4"
        // onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn ${story.isFavourite ? "text-red-500" : "text-white"
            } hover:text-red-500`}
        />
      </button>

      <div className="p-4" /*onClick={onClick}*/>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-[16px] font-medium">{story.title}</h6>

            <span className="text-xs text-slate-500">
              {story.date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DailyStoryCard