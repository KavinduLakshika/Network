function Successful() {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="p-5 border rounded shadow-lg bg-white" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <div className="mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              fill="currentColor"
              className="bi bi-check-circle-fill text-success"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.93 10.481l3.977-3.977a.75.75 0 1 0-1.06-1.06L6.5 8.939 5.157 7.596a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0z" />
            </svg>
          </div>
          <h1 className="fw-bold text-success">Success!</h1>
          <p className="text-muted">
            Your account has been successfully completed.
          </p>
        </div>
        <div className="text-center">
          <a href="/" className="btn btn-primary px-4 py-2">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Successful;
