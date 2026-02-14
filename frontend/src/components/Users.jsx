import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import GetRandomColor from "./AvatarColor";
import useDebounce from "../hooks/useDebounce";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const debouncedFilter = useDebounce(filter, 400);

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/v1/user/bulk?filter=" + debouncedFilter)
      .then((response) => {
        const usersWithColor = (response.data.users || []).map((user) => ({
          ...user,
          color: GetRandomColor(),
        }));

        setUsers(usersWithColor);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, [debouncedFilter]);

  return (
    <div className="flex flex-col ml-4 mr-4 px-2 py-2">
      <div className="text-black mt-4 text-xl font-bold">
        Users:
      </div>

      <div className="flex flex-col text-black mt-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-3 border rounded border-b-slate-200 shadow w-full"
          placeholder="Search..."
        />
      </div>

      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <User key={user.id || user._id} user={user} />
          ))
        ) : (
          <div className="mt-4 text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  const firstName = user?.firstname || "";
  const lastName = user?.lastname || "";
  const initial = firstName ? firstName[0].toUpperCase() : "?";

  return (
    <div className="flex justify-between mt-2">
      <div className="flex">
        <div
          className={`rounded-full h-12 w-12 ${user.color} flex justify-center items-center mr-2`}
        >
          <div className="text-xl text-white">
            {initial}
          </div>
        </div>

        <div className="pl-2 flex flex-col justify-center">
          <div className="font-bold text-lg px-1">
            {firstName} {lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Button
          onClick={() => {
            navigate(
              "/send?id=" +
                (user.id || user._id) +
                "&name=" +
                firstName +
                " " +
                lastName
            );
          }}
          text="Send Money"
        />
      </div>
    </div>
  );
}

export default Users;
