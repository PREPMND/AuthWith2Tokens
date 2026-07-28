import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../api/auth-api";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() && !username.trim()) {
            alert("Please enter either an email or a username.");
            return;
        }

        if (!password.trim()) {
            alert("Please enter your password.");
            return;
        }

        const payload = {
            password,
        };

        if (email.trim()) {
            payload.email = email.trim();
        } else {
            payload.username = username.trim();
        }

        try {
            const response = await loginUser(payload);
            console.log(response);

            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Login failed");
        }
    };
    useEffect(() => {
        const checkUser = async () => {
            try {
                await getCurrentUser();
            } catch (error) {
                console.log(error.message)
                navigate("/login");
            }
        };

        checkUser();
    }, []);
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-2 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>
                <div className="text-center text-gray-500 font-medium">
                    OR
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 p-3"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                    Sign In
                </button>
            </form>
        </>
    );
};