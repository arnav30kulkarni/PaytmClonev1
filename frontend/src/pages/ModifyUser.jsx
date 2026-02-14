import axios from "axios";
import HomeRedirect from "./HomeRedirect";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";

const Modify = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <HomeRedirect />;
  }

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const updateData = {};

      if (firstname.trim() !== "") {
        updateData.firstname = firstname;
      }

      if (lastname.trim() !== "") {
        updateData.lastname = lastname;
      }

      if (password.trim() !== "") {
        updateData.password = password;
      }

      if (Object.keys(updateData).length === 0) {
        alert("Please enter at least one field to update");
        return;
      }

      await axios.put(
        "http://localhost:4500/api/v1/user/",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User updated successfully!");
      navigate("/profile");

    } catch (error) {
      console.error(error.response?.data || error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-80 h-max rounded-lg bg-white shadow p-2 px-4 text-center">
          <Heading text={"Modify Information"} />
          <Subheading text={"Change any details below"} />

          <Inputbox
            label={"Firstname"}
            placeholder={"Enter new firstname"}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Inputbox
            label={"Lastname"}
            placeholder={"Enter new lastname"}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Inputbox
            label={"Password"}
            placeholder={"Enter new password"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-3">
            <Button text={"Update"} onClick={handleUpdate} />
          </div>

          <div className="mt-1">
            <Button text={"Back"} onClick={() => navigate("/profile")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modify;
