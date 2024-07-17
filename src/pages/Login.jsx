import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/login", data);
      if (response.data.token) {
        toast.success("Login Successful");
        login(response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center text-green-color">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Email or Phone
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Must Provide Email or Phone",
                })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.name
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.name && (
                <span className="text-rose-500">{errors.name.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">PIN</label>
              <input
                type="password"
                id="pin"
                {...register("pin", { required: "Pin is required for Login" })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.pin
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.pin && (
                <span className="text-rose-500">{errors.pin.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-color text-white py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-5">
            New Here?{" "}
            <Link className="text-green-color font-semibold" to={"/register"}>
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
