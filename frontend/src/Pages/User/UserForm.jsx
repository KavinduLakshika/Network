import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config";

function UserForm() {
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmPassword: '',
    });

    const resetForm = () => {
        setFormData({
            userName: '',
            password: '',
            confirmPassword: '',
        });
        setError(null);
        setFormErrors({});
        navigate('/users');
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.userName.trim()) {
            errors.userName = "User Name is required.";
        }
        if (!formData.password) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await fetch(`${config.BASE_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    userPassword: formData.password,
                    userType: "Admin",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create user.');
            }

            const data = await response.json();
            resetForm();
            setError('User created successfully!');
            navigate('/users');
        } catch (error) {
            setError(error.message);
        }
    };


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="w-50">
                <form className="p-5 border rounded shadow bg-light" onSubmit={handleSubmit}>
                    <h4 className="display-6 text-center mb-4">User SignUp</h4>
                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    <div className="mb-4">
                        <label htmlFor="userName" className="form-label fw-bold">User Name</label>
                        <input
                            type="text"
                            id="userName"
                            className={`form-control ${formErrors.userName ? 'is-invalid' : ''}`}
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        {formErrors.userName && <div className="invalid-feedback">{formErrors.userName}</div>}
                    </div>

                    <div className="mb-4 position-relative">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <div className="input-group">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                                style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
                            >
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                    </div>

                    <div className="mb-4 position-relative">
                        <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{ borderRadius: "0 0.375rem 0.375rem 0" }}
                            >
                                {confirmPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        {formErrors.confirmPassword && (
                            <div className="invalid-feedback">{formErrors.confirmPassword}</div>
                        )}
                    </div>

                    <div className="text-center">
                        <button type="button" className="btn btn-danger me-2" onClick={resetForm}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
