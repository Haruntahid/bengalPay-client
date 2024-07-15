import { useState } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";

function Register() {
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Hash the PIN using bcrypt
      const hashedPin = await bcrypt.hash(data.pin, 10); // 10 is the saltRounds

      // Now you can send `hashedPin` to your backend API
      const formData = {
        ...data,
        pin: hashedPin,
        // Combine +880 with user input for phone number
        phone: ` 0${data.phone}`,
      };

      console.log(formData); // For testing, you should send this data to your backend instead
    } catch (error) {
      console.error("Error hashing PIN:", error);
    }
  };

  const pin = watch("pin");
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-4xl font-bold mb-6 text-center text-green-color">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
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
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.email
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              />
              {errors.email && (
                <span className="text-rose-500">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="phone"
                  value="+880"
                  readOnly
                  className="px-3 py-2 border focus:outline-none bg-gray-200 text-gray-700 w-16"
                />
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must be 10 digits",
                    },
                  })}
                  className={`w-full px-3 py-2 border-[2px] focus:outline-none focus:border-green-color ${
                    errors.phone
                      ? "border-rose-500 focus:ring-rose-500"
                      : "focus:ring-blue-400"
                  }`}
                />
              </div>
              {errors.phone && (
                <span className="text-rose-500">{errors.phone.message}</span>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="pin" className="block text-gray-700 mb-2">
                PIN
              </label>
              <input
                type={showPin ? "text" : "password"}
                id="pin"
                {...register("pin", {
                  required: "PIN is required",
                  pattern: {
                    value: /^\d{5}$/,
                    message: "PIN must be a 5-digit number",
                  },
                })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.pin
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2"
              >
                {showPin ? "Hide" : "Show"}
              </button>
              {errors.pin && (
                <span className="text-rose-500">{errors.pin.message}</span>
              )}
            </div>

            <div className="mb-4 relative">
              <label htmlFor="confirmPin" className="block text-gray-700 mb-2">
                Confirm PIN
              </label>
              <input
                type={showConfirmPin ? "text" : "password"}
                id="confirmPin"
                {...register("confirmPin", {
                  required: "Confirm PIN is required",
                  validate: (value) => value === pin || "PINs do not match",
                })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.confirmPin
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="absolute right-3 top-1/2"
              >
                {showConfirmPin ? "Hide" : "Show"}
              </button>
              {errors.confirmPin && (
                <span className="text-rose-500">
                  {errors.confirmPin.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="accountType" className="block text-gray-700 mb-2">
                Account Type
              </label>
              <select
                id="accountType"
                {...register("accountType", {
                  required: "Account type is required",
                })}
                className={`w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color ${
                  errors.accountType
                    ? "border-rose-500 focus:ring-rose-500"
                    : "focus:ring-blue-400"
                }`}
              >
                <option value="">Select an option</option>
                <option value="Consumer">Consumer</option>
                <option value="Agent">Agent</option>
              </select>
              {errors.accountType && (
                <span className="text-rose-500">
                  {errors.accountType.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-color text-white py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link className="text-green-color font-semibold" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
