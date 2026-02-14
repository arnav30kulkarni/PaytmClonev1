import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeRedirect from "./HomeRedirect";
import Button from "../components/Button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) return <HomeRedirect />;

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/v1/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="text-center mt-16">Loading...</div>;
  if (!user) return <div className="text-center mt-16">User not found</div>;

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-start pt-16">
      <div className="flex flex-col items-center bg-white w-80 rounded-lg shadow-lg p-6">
        <div className="rounded-full bg-slate-400 h-16 w-16 flex items-center justify-center text-white text-2xl mb-6">
          U
        </div>

        <div className="w-full mb-3 text-left">
          <p className="font-semibold">Firstname:</p>
          <p className="text-gray-700">{user.firstname}</p>
        </div>

        <div className="w-full mb-3 text-left">
          <p className="font-semibold">Lastname:</p>
          <p className="text-gray-700">{user.lastname}</p>
        </div>

        <div className="w-full mb-6 text-left">
          <p className="font-semibold">Username:</p>
          <p className="text-gray-700">{user.username}</p>
        </div>

        <div className="flex w-full justify-between">
          <Button text="Modify User" onClick={() => navigate("/modify")} />
          <Button text="Back" onClick={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
