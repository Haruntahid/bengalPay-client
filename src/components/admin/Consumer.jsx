import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UserTable from "./UserTable";

function Consumer() {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["consumers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/consumers`);
      return res.data;
    },
  });

  if (isLoading) return <p>loading....</p>;
  return (
    <>
      <p>Total Consumers {data.length}</p>
      <UserTable data={data} refetch={refetch} />
    </>
  );
}

export default Consumer;
