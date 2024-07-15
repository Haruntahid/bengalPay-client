import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
