import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// import { useAuth0 } from "@auth0/auth0-react";

function Register() {
  // const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const register_url = 'https://serverapp-2vre.onrender.com/auth/signup';
      const response = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result,"register")
      navigate('/login');
      toast.success("User Registered successfully");
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the signup operation:', error);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const register_url = 'https://serverapp-2vre.onrender.com/auth/google-signup';
      const res = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tokenId: response.credential })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log(result,"google register")
      navigate('/login');
      toast.success("User Registered with Google successfully");
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the Google signup operation:', error);
      toast.error("Something went wrong with Google sign up");
    }
  };

  return (
    <div>
      <div className="form_container">
        <form className="form_group" onSubmit={onSignup}>
          <h3>Register</h3>
          <div className="form-group my-2">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              onChange={handleInputChange}
              value={user.firstName}
            />
          </div>
          <div className="form-group my-2">
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              onChange={handleInputChange}
              value={user.lastName}
            />
          </div>
          <div className="form-group my-2">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={handleInputChange}
              value={user.email}
            />
          </div>
          <div className="form-group my-2">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={handleInputChange}
              value={user.password}
            />
          </div>
          <div className="form-group my-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="confirmPassword"
              onChange={handleInputChange}
              value={user.confirmPassword}
            />
          </div>
          <div className="mt-3 d-grid">
            <button type="submit" className="btn btn-primary">Signup</button>
          </div>
          <div className="my-1 d-flex justify-content-center">
            <p>
              Already have an Account? <a href="/login">Login</a>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={(error) => {
                console.error('Google login failed:', error);
                toast.error("Google login failed");
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
