import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    loginSuccess,
    loginFailure,
    signupSuccess,
    signupFailure,
    logout,
} from "../feature/Auth/authSlice";


function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const { isAuthenticate, user, registerUsers = [], isSignupSuccess, error } =
        useSelector((state) => state.auth || {});

    // Handle navigation when signup succeeds
    useEffect(() => {
        if (isSignupSuccess) {
            setIsLogin(true); // Switch to login view
            setEmail(""); // Clear form
            setPassword("");
        }
    }, [isSignupSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            const action = isLogin ? loginFailure : signupFailure;
            dispatch(action("Email and password are required"));
            return;
        }

        if (password.length < 8) {
            const action = isLogin ? loginFailure : signupFailure;
            dispatch(action("Password must have at least 8 characters"));
            return;
        }

        if (!email.includes("@")) {
            const action = isLogin ? loginFailure : signupFailure;
            dispatch(action("Please enter a valid email"));
            return;
        }

        if (isLogin) {
            // Check if user exists
            const user = registerUsers.find(
                (u) => u.email.toLowerCase() === email.toLowerCase()
            );

            if (user) {
                dispatch(loginSuccess({ email: user.email, id: user.id }));
            } else {
                dispatch(loginFailure("Invalid email or password"));
            }
        } else {
            // Check if email is already in use
            if (
                registerUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())
            ) {
                dispatch(signupFailure("Email already in use"));
                return;
            }

            dispatch(signupSuccess({ email, password, id: Date.now() }));
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        setEmail("");
        setPassword("");
    };

    if (isAuthenticate) {
        return (
            <div className="auth-container">
                <p>Welcome, {user.email}!</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <button
                className="switch-login"
                onClick={() => {
                    setIsLogin(!isLogin);
                    setEmail("");
                    setPassword("");
                    dispatch(loginFailure(null)); // Clear error messages
                }}
            >
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
        </div>
    );
}

export default Auth;
