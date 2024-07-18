import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import cashOut from "../../assets/cashout.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GetUserData from "../reusable/GetUserData";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function CashOutForm({ onSubmit }) {
  const axiosSecure = useAxiosSecure();
  const [step, setStep] = useState(1);
  const [manualInput, setManualInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [balanceError, setBalanceError] = useState("");
  const [cashOutMoney, setCashOutMoney] = useState();
  const [remainingBalance, setRemainingBalance] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["all-agents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agent");
      return res.data;
    },
  });

  const { userData, loading = isLoading } = GetUserData();
  const id = userData._id;
  console.log(userData);

  const handleNextStep = (data) => {
    if (step === 1) {
      console.log(data);

      const avilableForCashout =
        userData.balance - (userData.balance * 1.5) / 100;
      const cashOutFee = (parseInt(data.amount) * 1.5) / 100;
      const totalCharge = parseInt(data.amount) + cashOutFee;

      console.log(cashOutFee);
      console.log(totalCharge);
      setCashOutMoney(avilableForCashout);
      setRemainingBalance(userData.balance - totalCharge);

      if (data.amount > avilableForCashout) {
        setBalanceError("Insufficient Balance");
      } else if (data.amount < 0) {
        setBalanceError("Transaction amount cannot be negative.");
      } else {
        setStep(2);
        setCashOutMoney();
      }
    } else {
      const sendData = { ...data, id, remainingBalance, type: "cash out" };

      axiosSecure.patch("/transaction", sendData).then((res) => {
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
      console.log(sendData);
      onSubmit(data);
    }
  };

  const handleSelectChange = (option) => {
    setSelectedAgent(option);
    setManualInput(option ? option.value : "");
    setValue("recipient", option ? option.value : "");
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setManualInput(inputValue);
    const matchedAgent = agents.find((agent) => agent.phone === inputValue);
    setSelectedAgent(
      matchedAgent
        ? { value: matchedAgent.phone, label: matchedAgent.name.toUpperCase() }
        : null
    );
    setValue("recipient", inputValue);

    // Check if entered phone number exists in agents
    if (!matchedAgent) {
      setError("recipient", {
        type: "manual",
        message: "No agent found with this phone number",
      });
    } else {
      setError("recipient", null); // Clear error if agent found
    }
  };

  const agentOptions = agents.map((agent) => ({
    value: agent.phone,
    label: `${agent.phone} - ${agent.name.toUpperCase()}`,
  }));

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={cashOut} alt="" />
        <p className="text-green-color text-2xl font-semibold">Cash Out</p>
      </div>
      <div className="border border-green-color p-3 my-5 rounded-lg">
        <p className="text-center mb-3 text-xl text-rose-400">Conditions</p>
        <ol className="text-rose-400">
          <li>1. Consumer can only cash out through an Agent</li>
          <li>
            2. For each cash out, a{" "}
            <span className="text-green-color font-semibold">1.5%</span> fee
            will be deducted
          </li>
        </ol>
      </div>
      {cashOutMoney && (
        <p className="text-center py-1 my-3 text-rose-400 border border-green-color rounded-lg">
          Available For Cash Out{" "}
          <span className="text-green-color font-semibold">{cashOutMoney}</span>{" "}
          tk
        </p>
      )}
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
                Agent Number
              </label>
              <input
                type="text"
                placeholder="Agent Number"
                id="manual-input"
                value={manualInput}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-[2px] rounded-md focus:outline-none focus:border-green-color"
              />
              <Select
                options={agentOptions}
                onChange={handleSelectChange}
                value={selectedAgent}
                placeholder="Select Agent Number"
                isClearable
                className="mt-2"
              />
              <input
                type="hidden"
                {...register("recipient", {
                  required: "Agent Number is required",
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
            {balanceError && (
              <p className="my-2 text-red-500">{balanceError}</p>
            )}
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

export default CashOutForm;
