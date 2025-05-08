import React, { useState } from 'react'
import Navbar from '../Components/Nav/Navbar.jsx'


const Home = () => {

  const [filterType, setFilterType] = useState("")
  const [filterDate, setFilterDate] = useState({ from: null, to: null })

  const resetFilter = () => {

  }

  return (
    <>
      <Navbar
        // searchQuery={searchQuery}
        // setSearchQuery={setSearchQuery}
        // onSearchNote={onSearchStory}
        // handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-10">
        <FilterInfoTitle
          filterType={filterType}
          // filterDate={dateRange}
          onClear={() => {
            resetFilter()
          }}
        />

        <div className="flex gap-7">
          <div className="flex-1">
            {/* {allStories.length > 0 ? ( */}
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item._id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  )
                })}
              </div>
            {/* ) : ( */}
              <EmptyCard
                imgSrc={
                  "https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                // message={getEmptyCardMessage(filterType)}
                // setOpenAddEditModal={() =>
                //   setOpenAddEditModal({
                //     isShown: true,
                //     type: "add",
                //     data: null,
                //   })
                // }
              />
            {/* )} */}
          </div>

          <div className="w-[320px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  // captionLayout="dropdown"
                  // mode="range"
                  // selected={dateRange}
                  // onSelect={handleDayClick}
                  // pagedNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add & Edit Travel Story Modal */}
      <Modal
        // isOpen={openAddEditModal.isShown}
        // onRequestClose={() => { }}
        // style={{
        //   overlay: {
        //     backgroundColor: "rgba(0,0,0,0.2)",
        //     zIndex: 999,
        //   },
        // }}
        // appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditTravelStory
          // storyInfo={openAddEditModal.data}
          // type={openAddEditModal.type}
          // onClose={() => {
          //   setOpenAddEditModal({ isShown: false, type: "add", data: null })
          // }}
          // getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View travel story modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null)
          }}
        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-[#05b6d3] hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }}
      >
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  )
}

export default Home