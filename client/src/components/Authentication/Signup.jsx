import { useState } from "react";
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Button,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        pic: "",
    }
    const [formData, setFormData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formData;

        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.warn("Please fill all required fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const form = new FormData();
            form.append("name", formData.name.trim());
            form.append("email", formData.email.trim());
            form.append("password", formData.password);
            form.append("password", formData.password);
            if (formData.pic) {
                form.append("pic", formData.pic)
            }
            const response = await axios.post("/api/user/register", form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            toast.success("Registration successful!");
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem("token", token)
            setFormData(initialState);
            fileInputRef.current.value = "";
            navigate("/chats")

        } catch (err) {
            console.error(err);
            toast.error(
                err.response?.data?.message || "Something went wrong!"
            );
        } finally {
            setLoading(false)
        }

    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="email">Email address</InputLabel>
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

            {/* Confirm Password with show/hide toggle */}
            <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel shrink htmlFor="pic">Profile Picture</InputLabel>
                <Input
                    id="pic"
                    name="pic"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    inputRef={fileInputRef}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.startsWith("image/")) {
                            setFormData({ ...formData, pic: file });
                        } else {
                            alert("Please upload a valid image file.");
                        }
                    }}
                />
            </FormControl>
            {formData.pic && (
                <Box mt={2}>
                    <img
                        src={URL.createObjectURL(formData.pic)}
                        alt="Profile Preview"
                        width="100"
                        height="100"
                        style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                </Box>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
        </Box>
    );
};

export default Signup;
