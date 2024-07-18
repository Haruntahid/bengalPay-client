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
  return {
    userData,
    isLoading,
  };
}

export default GetUserData;
