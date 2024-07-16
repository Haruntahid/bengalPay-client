import { useState } from "react";
import { useForm } from "react-hook-form";
import sendMoney from "../../assets/send-money.png";

// eslint-disable-next-line react/prop-types
function SendMoneyForm({ onSubmit }) {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNextStep = (data) => {
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={sendMoney} alt="" />
        <p className="text-green-color text-2xl font-semibold">Send Money</p>
      </div>
      <div className="flex justify-between mb-4">
        <div
          className={`w-1/2 text-center ${
            step === 1 ? "font-bold text-green-600" : "text-gray-400"
          }`}
        >
          Step 1
        </div>
        <div
          className={`w-1/2 text-center ${
            step === 2 ? "font-bold text-green-600" : "text-gray-400"
          }`}
        >
          Step 2
        </div>
      </div>
      <div className="relative mb-8">
        <div className="absolute left-0 w-full h-1 bg-gray-300"></div>
        <div
          className={`absolute left-0 h-1 bg-green-600 transition-all duration-300 ${
            step === 1 ? "w-1/2" : "w-full"
          }`}
        ></div>
      </div>

      <form onSubmit={handleSubmit(handleNextStep)} className="mb-8">
        {step === 1 && (
          <>
            <div className="mb-4">
              <label htmlFor="recipient" className="block text-gray-700 mb-2">
                Recipient Number
              </label>
              <input
                type="text"
                placeholder="Recipient Number"
                id="recipient"
                {...register("recipient", {
                  required: "Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Must be a number",
                  },
                  minLength: {
                    value: 11,
                    message: "Must be 11 characters",
                  },
                  maxLength: {
                    value: 11,
                    message: "Must be 11 characters",
                  },
                })}
                className="w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color"
              />
              {errors.recipient && (
                <span className="text-rose-500">
                  {errors.recipient.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="Amount"
                id="amount"
                {...register("amount", { required: "Amount is required" })}
                className="w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color"
              />
              {errors.amount && (
                <span className="text-rose-500">{errors.amount.message}</span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit(handleNextStep)}
              className="w-full bg-green-color text-white py-2 rounded"
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="pin" className="block text-gray-700 mb-2">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                {...register("pin", { required: "PIN is required" })}
                className="w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color"
              />
              {errors.pin && (
                <span className="text-rose-500">{errors.pin.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-green-color text-white py-2 rounded"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default SendMoneyForm;
