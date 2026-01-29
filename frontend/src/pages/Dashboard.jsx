import { useEffect } from "react";
import Appbar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useState } from "react";


const Dashboard=()=>{

    const[balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get("http://localhost:4500/api/v1/account/balance",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
            .then((res)=>{
                setBalance(res.data.balance)
            })
            .catch(err=>{
                console.log(err.response?.data)
            })
    })
    return(
        <>
        <div className="flex-col justify-center mt-8 mr-4 ml-4 shadow">
            <Appbar/>
        </div>
        <div className="flex-col justify-center text-left">
            <Balance value={balance}></Balance>
        </div>
        <div>
            <Users></Users>
        </div>
        </>
    )
}

export default Dashboard;