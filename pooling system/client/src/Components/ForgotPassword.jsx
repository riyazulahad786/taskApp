// import React from 'react'

function ForgotPassword() {
  return (
    <div className="container sign_up_container">
         <form className="signup_form">
         <h3 className="text-center" >Reset Password</h3>
         <hr className="w-50 mx-auto"/>

         <div>
            <label htmlFor="forgotPassword">Forgot Password</label>
            <input type="password" className="form-control" placeholder="Reset Password"/>
         </div>
         <div className="d-flex justify-content-end pt-3">
            <a href="/login">Login Here ?</a>
         </div>
         <div className="d-grid pt-4">
            <button className="btn btn-success">Send</button>
         </div>
         </form>
    </div>
  )
}

export default ForgotPassword