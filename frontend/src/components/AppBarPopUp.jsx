import { useNavigate } from "react-router-dom";
import Button from "./Button";
import LogoutButton from "./LogoutButton";

const AppbarPoPUp=()=>{
    const navigate = useNavigate();
    return<div className="absolute px-5 mb-2 top-14 mt-10 right-0 w-40 bg-slate-100 rounded-lg shadow-lg z-50 p-2 ">
        <Button text={"My Profile"} onClick={()=>{
            navigate("/profile")
        }}></Button>
        <div className="px-4 py-2">
            <LogoutButton/>
        </div>
    </div>
}

export default AppbarPoPUp;