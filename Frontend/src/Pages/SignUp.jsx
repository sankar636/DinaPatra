import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateEmail } from '../utils/helper.js'
import { useSelector } from 'react-redux'
const SignUp = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    
    const { loading, currentUser } = useSelector((state) => state.auth)// this (auth) comes from the store

    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!username) {
            setError("Please enter your name.")
            return
          }
      
          if (!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return
          }
      
          if (!password) {
            setError("Please enter your password.")
            return
          }
      
          setError(null)

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        const baseURL = import.meta.env.VITE_BASE_URL
        try {
            const response = await axios.post(`${baseURL}/api/v1/auth/signup`,newUser)

            if(response.status === 200 ){
                const data = response.data
                console.log("Data",data);
                
                navigate('/login')
            }
        } catch (error) {
            console.log("Error While SignUp the User",error);
            setError("Something went wrong while signup the user")
        }
    }

    useEffect(() => {
        if(!loading && currentUser){
            navigate('/home')
        }
    },[currentUser])   
    return (
        <div className="h-screen bg-cyan-50 overflow-hidden relative">
          <div className="login-ui-box right-10 -top-40" />
    
          <div className="container h-screen flex items-center justify-center px-20 mx-auto">
            <div className="w-2/4 h-[90vh] flex items-end bg-[url('https://images.pexels.com/photos/731217/pexels-photo-731217.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center rounded-lg p-10 z-50">
              <div>
                <h4 className="text-5xl text-white font-semibold leading-[58px]">
                  Create Your <br /> Daily Stories
                </h4>
    
                <p className="text-[15px]  leading-6 pr-7 mt-4 text-orange-100 font-semibold">
                  Record your Daily experiences and memories in your Life journey
                </p>
              </div>
            </div>
    
            <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
              <form onSubmit={handleSignUp}>
                <h4 className="text-2xl font-semibold mb-7">Create Your Account</h4>
    
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="input-box"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
    
                <input
                  type="email"
                  placeholder="Email"
                  className="input-box"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
    
                {/* <PasswordInput
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                /> */}
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='password'/>
    
                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
    
                {loading ? (
                  <p className="animate-pulse w-full text-center btn-primary">
                    LOADING...
                  </p>
                ) : (
                  <button type="submit" className="btn-primary">
                    SIGN UP
                  </button>
                )}
    
                <p className="text-xs text-slate-500 text-center my-4">Or</p>
    
                <button
                  type="submit"
                  className="btn-primary btn-light"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      )
}

export default SignUp