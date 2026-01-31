import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/my");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="h-9 px-4 text-white bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
