import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import Profile from './Profile.jsx'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { signOut } from '../../store/authSlice.js'


const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const token = localStorage.getItem('token')
    const baseURL = import.meta.env.VITE_BASE_URL
    // useEffect(() => {
        const onLogout = async () => {
            try {
                const response = await axios.post(`${baseURL}/user/signout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if(response.status === 200){
                    localStorage.removeItem('token')
                    dispatch(signOut())
                    navigate('/login')
                }
            } catch (error) {
                console.log("Error While logout the User", error);
            }
        }
    // }, [])

    return (
        <div className="bg-white flex items-center justify-between px-10 py-2 drop-shadow sticky top-0 z-10">
            <Link to={"/home"}>
                <h1 className="font-bold text-2xl sm:text-2xl flex flex-wrap">
                    <span className="text-blue-400">Dina</span>
                    <span className="text-blue-800">Patra</span>
                </h1>
            </Link>

            <SearchBar
            // value={searchQuery}
            // // onChange={(e) => {
            // //     setSearchQuery(e.target.value)
            // // }}
            // handleSearch={handleSearch}
            // onClearSearch={onClearSearch}
            />

            <Profile
            onLogout={onLogout} 
            />
        </div>
    )
}

export default Navbar