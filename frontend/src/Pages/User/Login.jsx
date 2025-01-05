import { useState } from "react";

function Login() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userName.trim() || !formData.password.trim()) {
      setError("Both fields are required.");
    } else {
      setError(null);
      console.log("Login successful", formData);
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
          {error && <div className="alert alert-danger text-center">{error}</div>}

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
            />
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
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-info px-4">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;