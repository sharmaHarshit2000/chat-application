import { useState } from "react";
import {
    Box,
    Input,
    InputLabel,
    FormControl,
    InputAdornment,
    IconButton,
    Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (!email.trim() || !password.trim()) {
            toast.warn("Please fill the email and password");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", { email: email.trim(), password: password.trim() });
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            setFormData({ email: "", password: "" })
            toast.success(`Welcome back, ${response.data.name}`)
            navigate("/chats")
        } catch (err) {
            console.log(err.message || err.response?.data?.message);
            toast.error(err.response?.data?.message || "Login failed")

        } finally {
            setLoading(false)
        }

    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3 }}>
                {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
                onClick={() =>
                    setFormData({ email: "guest@example.com", password: "123456" })
                }
                color="error"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
            >
                Get Guest User Credentials
            </Button>
        </Box>
    );
};

export default Login;
