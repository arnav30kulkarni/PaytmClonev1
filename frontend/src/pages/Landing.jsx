import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-300">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md text-center">

        <div className="text-4xl font-bold mb-4">Payment Application</div>

        <img src={logo} alt="Dashboard" className="w-32 h-32 mb-4" />

        <div className="text-lg font-medium mb-6 px-2">
          Welcome to the Payment application! To proceed, click the button below.
        </div>

        <button
          type="button"
          onClick={() => navigate("/my")}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Get Started!
        </button>
      </div>
    </div>
  );
};

export default Landing;
