import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const HomeRedirect=()=>{
    const token = localStorage.getItem("token")
    const navigate=useNavigate();

    useEffect(()=>{
        if(token){
            navigate("/dashboard")
        }else{
            navigate("/signin")
        }
    },[token,navigate])
};

export default HomeRedirect;