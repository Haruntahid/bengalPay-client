import { useState } from "react";
import { useForm } from "react-hook-form";
import cashIn from "../../assets/cashin.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Select from "react-select";
import GetUserData from "../reusable/GetUserData";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function CashInForm({ onSubmit }) {
  const axiosSecure = useAxiosSecure();
  const [manualInput, setManualInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [step, setStep] = useState(1);
  const [allError, setAllError] = useState("");
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
  const requester = userData.phone;

  const handleNextStep = (data) => {
    if (step === 1) {
      if (data.amount <= 0) {
        setAllError("Amount cannot be 0 or negative.");
        return;
      }
      console.log(data);
      setStep(2);
    } else {
      const sendData = {
        ...data,
        id,
        requester,
        type: "cash in",
        status: "pending",
      };
      // check the password
      axiosSecure.post("/password-check", sendData).then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          onSubmit({ ...data });

          //cashIn req post on db
          axiosSecure.post("/cash-in-req", sendData).then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Cash In Request Successful!",
                showConfirmButton: true,
              });
            }
          });
        } else {
          setAllError("Wrong Pin");
        }
      });
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
        <img className="w-10 h-10" src={cashIn} alt="" />
        <p className="text-green-color text-2xl font-semibold">Cash In</p>
      </div>
      <div className="border border-green-color p-3 my-5 rounded-lg">
        <p className="text-center mb-3 text-xl text-rose-400">Conditions</p>
        <ol className="text-rose-400">
          <li>1. Consumer can only cash in through an Agent</li>
          <li>
            2. Initially, the cash-in request is pending; once approved by the
            <span className="text-green-color font-semibold"> Agent, </span> the
            amount is added to the main balance.
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
            {allError && <p className="my-2 text-red-500">{allError}</p>}
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
            {allError && <p className="my-2 text-red-500">{allError}</p>}
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

export default CashInForm;
