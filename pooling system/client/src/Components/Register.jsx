// import React from 'react'

function Register() {
  return (
    <div className="container sign_up_container">
      <form className="signup_form">
      <h3 className="text-center">Register</h3>
      <hr className="w-50 mx-auto"/>
       <div className="was-validated">
       <label htmlFor="username" className="form-label">
          Username
        </label>
        <input type="text" className="form-control" placeholder="username" required />
        <div className="invalid-feedback">
           <span>Please enter your username</span>
        </div>
       </div>

       <div className="was-validated">
       <label htmlFor="username" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" placeholder="email" required />
        <div className="invalid-feedback">
           <span>Please enter your email</span>
        </div>
       </div>
        
       <div className="was-validated">
       <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          required
        />
         <div className="invalid-feedback">
           <span>Please enter your email</span>
        </div>
       </div>

       
        <div className="d-flex justify-content-end">
            <a href="/login">Already have account ? Login here</a>
        </div>
        <div className="pt-4 d-grid">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
