import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { registerUser ,loginUser} from "../Api/auth-api.jsx";

export const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            await loginUser({
                username:data.username,
                email: data.email,
                password: data.password,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(
                error?.response?.data?.message ||
                "Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border rounded-lg p-3"
                            {...register("fullName", {
                                required: "Full name is required",
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.fullName?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full border rounded-lg p-3"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.username?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border rounded-lg p-3"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-lg p-3"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.password?.message}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;