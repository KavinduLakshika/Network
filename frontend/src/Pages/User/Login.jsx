import { useState } from "react";
import config from "../../../config";

function Login({ onLogin }) {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      tempErrors.userName = "User name is required.";
      isValid = false;
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required.";
      isValid = false;
    }

    setError(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setProcessing(true);

    if (validate()) {
      const postData = {
        userName: formData.userName,
        userPassword: formData.password,
      };

      try {
        const response = await fetch(`${config.BASE_URL}/userLogin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const data = await response.json();

        if (!response.ok || data.message_type === "error") {
          setError({ general: data.message || "An error occurred during login." });
          return;
        }

        const { userName, userStatus } = data.user;
        onLogin(userName, data.token, userStatus);
      } catch (error) {
        setError({ general: `Failed to log in. Please check your credentials. ${error.message}` });
      } finally {
        setProcessing(false);
      }
    } else {
      setProcessing(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-50">
        <form className="p-5 border rounded shadow bg-light" onSubmit={handleSubmit}>
          <h4 className="display-6 text-center mb-4">User Login</h4>
          {error?.general && <div className="alert alert-danger text-center">{error.general}</div>}

          <div className="mb-4">
            <label htmlFor="userName" className="form-label fw-bold">User Name</label>
            <input
              type="text"
              id="userName"
              className="form-control"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            {error?.userName && <div className="text-danger">{error.userName}</div>}
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <div className="input-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
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
            {error?.password && <div className="text-danger">{error.password}</div>}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-info px-4"
              disabled={processing}
            >
              {processing ? "Processing..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
