import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Nav/Navbar.jsx'
import FilterInfoTitle from '../Components/FilterInfoTitle.jsx'
import DailyStoryCard from '../Components/DailyStoryCard.jsx'
import EmptyCard from '../Components/EmptyCard.jsx'
import axios from 'axios'

const Home = () => {
  const [allStory, setAllStory] = useState([])
  const baseURL = import.meta.env.VITE_BASE_URL
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${baseURL}/daily-story/get-allstory`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setAllStory(response.data.data.dailyStories)
      } catch (error) {
        console.error('Error fetching stories:', error)
      }
    }
    fetchStories()
  }, [])

  return (
    <>
      <Navbar />
      <div className='container mx-auto py-10'>
        <FilterInfoTitle />
        <div className='flex gap-7'>
          <div className='flex gap-1'>
            {allStory.length > 0 ? (
              allStory.map((story) => (
                <DailyStoryCard key={story._id} story={story} />
              ))
            ) : (
             <EmptyCard/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home