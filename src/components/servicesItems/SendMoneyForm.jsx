import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import sendMoney from "../../assets/send-money.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function SendMoneyForm({ onSubmit }) {
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [step, setStep] = useState(1);
  const { user } = useContext(AuthContext);
  const id = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["send-balance"],
    queryFn: async () => {
      const res = await axiosSecure.get("/balance");
      return res.data;
    },
  });

  const handleNextStep = (data) => {
    if (step === 1) {
      const { amount } = data;

      // receivers phone number check (register on bengal pay or not)
      axiosSecure.post("/phone-check", data).then((res) => {
        if (res.data === "valid") {
          setError("You can't Send Money to Agent/Admin Number");
          return;
        }
        if (res.data === "Not Found") {
          setError("This Phone Number is Not Register On Bengal Pay");
          return;
        }

        const ammount = parseInt(amount);

        // Check if the amount to send is less than 50 taka
        if (ammount < 50) {
          setError(
            "Transaction failed: Minimum transaction amount is 50 taka."
          );
          return;
        }

        // Apply transaction fee for amounts over 100 taka
        let remainingAmount;
        let totalAmount;

        // Balance between 50 - 100
        if (ammount > 50 && ammount <= 100) {
          remainingAmount = userData.balance - ammount;
          if (remainingAmount <= 0) {
            setError("Insufficient Balance");
            return;
          }
          setRemainingBalance(remainingAmount);
        }

        if (ammount > 100) {
          const fee = 5;
          totalAmount = ammount + fee;
          remainingAmount = userData.balance - totalAmount;

          console.log(remainingAmount);

          // Check balance
          if (remainingAmount <= 0) {
            setError("Insufficient Balance");
            return;
          }

          setRemainingBalance(remainingAmount);
          console.log(
            `Transaction processed successfully: Amount ${ammount} taka, Fee ${fee} taka deducted, Total ${totalAmount} taka. Remaining ${remainingAmount}`
          );
        }

        // Proceed to step 2 if all conditions are met
        setStep(2);
        setError("");
      });
    } else {
      const sendData = { ...data, remainingBalance, id };

      // password check
      axiosSecure.post("/password-check", sendData).then((res) => {
        console.log(res.data);
        if (res.data === "Not Found") {
          setError("This Phone Number is Not Register on Bengal Pay");
        }
        console.log(res.data.message);
        if (res.data.message === "success") {
          onSubmit({ ...data, remainingBalance, user });
          // send money
          axiosSecure.patch("/send-money", sendData).then((res) => {
            if (res.data.transactionId) {
              Swal.fire({
                title: "Transaction Successful",
                html: `
                  <p><strong>Transaction ID:</strong> ${res.data.transactionId}</p>
                  <p><strong>Recipient:</strong> ${res.data.recipient}</p>
                  <p><strong>Amount:</strong> ${res.data.amount} Taka</p>
                  <p><strong>Remaining Balance:</strong> ${res.data.remainingBalance} Taka</p>
                `,
                icon: "success",
                confirmButtonText: "OK",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
              });
            }
          });
        } else {
          setError("Wrong Pin");
        }
      });

      console.log(sendData);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={sendMoney} alt="" />
        <p className="text-green-color text-2xl font-semibold">Send Money</p>
      </div>
      <div className="border border-green-color p-3 my-5 rounded-lg">
        <p className="text-center mb-3 text-xl text-rose-400">Conditions</p>
        <ol className="text-rose-400">
          <li>1. Minimum transaction amount is 50 taka</li>
          <li>2. Every transaction over 100 Taka has a 5 Taka fee.</li>
          <li>
            3. Send Money is only applicable for registered{" "}
            <span className="text-green-color">Consumer</span> accounts on
            Bengal Pay. It is not applicable for Admin or Agent accounts .
          </li>
        </ol>
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
            {error && <p className="my-2 text-red-500">{error}</p>}
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
            {error && <p className="my-2 text-red-500">{error}</p>}
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
