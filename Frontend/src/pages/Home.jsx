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

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) {
    navigate("/login");
    return null;
  }
  
  const user = data?.user;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-lg p-6 w-[400px] shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome {user.fullName}
        </h1>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <button
          onClick={() => logoutMutation.mutate()}
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};