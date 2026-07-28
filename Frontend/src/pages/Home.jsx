import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUser, logoutUser } from "../api/auth-api.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  if (isLoading) return <h1 className="flex justify-center items-center h-[100vh]">Loading...</h1>;

  if (isError) {
    navigate("/login");
    return null;
  }
  
  const user = data?.user;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-evenly">
      <h1 className="text-2xl font-bold mb-4">
          Welcome {user.fullName}
        </h1>
      <div className="border rounded-lg bg-fuchsia-50 p-6 *:text-[18px] *:pb-2 w-[90%] h-full shadow-md">
        

        <p className="">
          <span className="mr-2 font-[800]">Username:</span>{user.username}
        </p>

        <p>
          <span className="mr-2 font-[800]">Email:</span>{user.email}
        </p>

        <button
          onClick={() => logoutMutation.mutate()}
          className="mt-5 bg-red-500 hover:bg-red-600 hover:scale-[1.05] transition-all duration-300 ease-in-out text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};