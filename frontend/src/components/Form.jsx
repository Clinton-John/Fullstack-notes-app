import React from "react";
import { useState } from "react";
import api from '../api'
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/Form.css'
import LoadingIndicator from "./LoadingIndicator";


function Form({route, method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault()

        try{
            const res = await api.post(route, {username, password})

            if (method === 'login') {
                if (res.data.access && res.data.refresh) {  // Check tokens exist
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    navigate("/");  // Redirect to homepage on successful login
                } else {
                    console.error("Login failed: Tokens missing");
                }
            } else {
                navigate("/login");  // Redirect to login after registration
            }


        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }

    }
    const name = method === "login" ? "Login" : "Register"
    return (
        <form action="" onSubmit={handleSubmit} className="form-container" >
            <h1 > {name} </h1>
            <input 
                className="form-input"
                type="text"
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}

            <button className="form-button" type="submit" >
                {name}
            </button>

        </form>
    )

}

export default Form