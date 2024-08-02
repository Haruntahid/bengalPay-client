import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GetUserData from "../reusable/GetUserData";
import cashInReq from "../../assets/cashInReq.png";
import { TbCoinTaka } from "react-icons/tb";
import Swal from "sweetalert2";

function CashInReq() {
  const { userData, isLoading: userDataLoading } = GetUserData();
  const axiosSecure = useAxiosSecure();

  const {
    data: cashReq = [],
    isLoading: cashReqLoading,
    refetch,
  } = useQuery({
    queryKey: ["cash-in-req-agent-get", userData?.phone],
    queryFn: async () => {
      if (!userData?.phone) return []; // Return empty if phone is not available
      const res = await axiosSecure.get(`/cash-in-req/${userData.phone}`);
      return res.data;
    },
    enabled: !!userData?.phone, // Only run if userData.phone is available
  });

  // Handle the cash in
  const handleCashIn = (id) => {
    axiosSecure.patch(`/cash-in/${id}`).then((res) => {
      if (res.data.transactionId) {
        Swal.fire({
          icon: "success",
          title: "Cash In Successful!",
          showConfirmButton: true,
        });
        refetch();
      }
      if (res.data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Insufficient balance!",
        });
      }
    });
  };

  if (userDataLoading || cashReqLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );

  return (
    <div className="w-[85%]">
      <div className="flex items-center justify-center my-8 gap-3">
        <img className="w-10 h-10" src={cashInReq} alt="Cash In Requests" />
        <p className="text-green-color text-2xl font-semibold">
          Cash In Requests{" "}
          <span className="bg-green-100 px-2">{cashReq.length}</span>
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {cashReq.length === 0 ? (
          <p>No cash-in requests available</p>
        ) : (
          cashReq.map((cash) => (
            <div
              key={cash._id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <div>
                <p className="text-2xl font-semibold">{cash.requester}</p>
                <p className="text-lg inline-flex items-center gap-1">
                  <TbCoinTaka /> {cash.amount} tk
                </p>
              </div>
              <div className="text-right">
                <button
                  onClick={() => handleCashIn(cash._id)}
                  className="bg-green-color text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CashInReq;
