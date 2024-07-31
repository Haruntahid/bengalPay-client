import { useQuery } from "@tanstack/react-query";
import transactionHistory from "../../assets/Transactions History.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GetUserData from "../reusable/GetUserData";
import { FaCopy } from "react-icons/fa";

function Transactions() {
  const { userData } = GetUserData();
  const id = userData._id;
  console.log(id);

  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["transaction-history"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transaction-history/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleCopy = (trxId) => {
    navigator.clipboard.writeText(trxId);
    alert("Transaction ID copied to clipboard!");
  };

  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={transactionHistory} alt="" />
        <p className="text-green-color text-2xl font-semibold">
          Transaction History
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((transaction) => (
          <div
            key={transaction._id}
            className="flex justify-between items-center border p-4 rounded-lg shadow-md"
          >
            <div>
              <p className="text-lg font-semibold">{transaction.type}</p>
              <p className="text-sm">{transaction.receiver}</p>
              <p className="text-sm flex items-center gap-2">
                {transaction.trxId}
                <FaCopy
                  className="cursor-pointer"
                  onClick={() => handleCopy(transaction.trxId)}
                />
              </p>
              <p className="text-xs text-gray-500">{transaction.date}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{transaction.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
