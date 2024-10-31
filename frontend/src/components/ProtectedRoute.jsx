import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({children}){
    // check if a person is logged in before accessing the routes below 
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=> {
        auth().catch(()=>setIsAuthorized(false))
    }, [])

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            // send a request to the backend with the refresh token to get a new access token 
            const res = api.post("api/token/refresh/", {refresh:refreshToken});

            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }

        }catch{
            console.log(error)
            setIsAuthorized(false)
        }

    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAuthorized(false);
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now ){
            await refreshToken()
        }else{
            setIsAuthorized(true)
        }

    }

    if(isAuthorized == null){
        return <div>Loading page ... </div>
    }

    return isAuthorized ? children :<Navigate to='/login' /> ;

}

export default ProtectedRoute

// in the auth function, we want to get the access token, check if it is expired and if not then automatically refresh the token. If it cant be refreshed then the user should be redirected to the root folder 