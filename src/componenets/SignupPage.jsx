import { useState } from "react";
import "../styles/auth.css";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = (name, value, formData) => {
        let error = "";

        switch (name) {
            case "userName":
                if (!value.trim()) error = "Username is required";
                else if (value.length < 3) error = "Minimum 3 characters required";
                break;

            case "email":
                if (!value) error = "Email is required";
                else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
                break;

            case "phoneNumber":
                if (!value) error = "Phone number is required";
                else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
                break;

            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 6) error = "Minimum 6 characters required";
                break;

            case "confirmPassword":
                if (value !== formData.password) error = "Passwords do not match";
                break;

            default:
                break;
        }

        return error;
    };

    const validateAll = (formData) => {
        let newErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = "Username is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Must be 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters required";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleUserRegistration = async(e) => {
        e.preventDefault();

        const validationErrors = validateAll(userData);
        setErrors(validationErrors);

        // stop if errors exist
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        // ✅ success case
        console.log("Form submitted successfully:", userData);

        const {confirmPassword, ...payload} = userData;
        const response = await registerUser(payload);
        
        alert("Registration successful!");

        navigate("/dashboard");

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => {
            const updatedData = {
                ...prev,
                [name]: value
            }
            const error = validate(name, value, updatedData);
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    [name]: error
                }
            })
            return updatedData;
        })

    }

    return (
        <div className="auth-container">

            <div className="auth-card">
                <h2>Create your account</h2>
                <p>Start tracking and splitting expenses easily</p>

                <form className="auth-form" onSubmit={handleUserRegistration}>
                    <input type="text" placeholder="Full Name" required value={userData.userName} name="userName" onChange={handleInputChange} />
                    {errors.userName && <p className="error">{errors.userName}</p>}
                    <input type="email" placeholder="Email" required value={userData.email} name="email" onChange={handleInputChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <input type="tel" placeholder="Phone Number" required value={userData.phoneNumber} name="phoneNumber" onChange={handleInputChange} />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    <input type="password" placeholder="Password" required value={userData.password} name="password" onChange={handleInputChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <input type="password" placeholder="Confirm Password" required value={userData.confirmPassword} name="confirmPassword" onChange={handleInputChange} />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <button type="submit" className="btn primary full" >
                        Sign Up
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <span>Login</span>
                </div>
            </div>

        </div>
    );
}