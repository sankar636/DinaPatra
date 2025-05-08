import React from 'react'
import { getInitials } from '../../utils/helper.js'
import { useSelector } from 'react-redux'


const Profile = (props) => {
    // console.log(props);    
    const { currentUser } = useSelector((state) => state.auth)
    // console.log(currentUser);
    // console.log(getInitials(currentUser?.username));

    return (
        <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-full text-2xl font-semibold bg-slate-100">
                {getInitials(currentUser?.username)}
            </div>

            <div>
                <p className="text-lg ml-[7px] font-medium">{currentUser?.username || ""}</p>

                <button
                    onClick={props.onLogout}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full shadow-md hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                >
                    Logout
                </button>

            </div>
        </div>
    )
}

export default Profile