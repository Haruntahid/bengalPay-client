import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

function GetUserData() {
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["get-user-data"],
    queryFn: async () => {
      const res = await axiosSecure.get("/get-user");
      return res.data;
    },
  });

  if (isLoading)
    <div className="flex justify-center items-center h-[80vh]">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-green-color"></div>
    </div>;
  return {
    userData,
    isLoading,
  };
}

export default GetUserData;
