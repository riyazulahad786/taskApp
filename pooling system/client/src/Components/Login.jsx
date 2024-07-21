// import React from 'react'

function Login() {
  return (
    <div className="container login_wrapper">
      <form className="login_form">
        <h3>Login</h3>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>
        <div className="d-flex justify-content-end">
          <a href="/forgotPassword" className="form-label pt-4">
            {" "}
            Forgot Password
          </a>
        </div>
        <div className="d-flex justify-content-end mt-1">
          <a href="/register">New user? click here to register</a>
        </div>
        <div className="d-grid mt-4">
          <button className="btn btn-success">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
