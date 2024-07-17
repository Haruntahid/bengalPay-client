import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserTable from "./UserTable";
import noData from "../../assets/noData.png";

function Pending() {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-account"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pending`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
      </div>
    );
  return (
    <>
      <p className="text-center my-5 text-3xl font-medium">
        Total Pending Accounts{" "}
        <span className="bg-green-200 text-green-color px-3 py-1">
          {data.length}
        </span>
      </p>
      {data.length > 0 ? (
        <>
          <UserTable data={data} refetch={refetch} />
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center h-[70vh]">
            <img className="w-[30%]" src={noData} alt="" />
            <p className="text-5xl text-red-500 font-bold mt-5">No Data!</p>
          </div>
        </>
      )}
    </>
  );
}

export default Pending;
