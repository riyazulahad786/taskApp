import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const register = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const registerUser = { ...user };
    registerUser[name] = value;
    setUser(registerUser);
    console.log(registerUser);
  };

  const onSignup = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      const register_url = "https://serverapp-2vre.onrender.com/auth/login";
      const response = await fetch(register_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response status is OK (200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result,"login")
      const userIds = result.userId;
      // const id= result._id
      console.log(userIds)
      const { jwtToken} = result;
      console.log(jwtToken,"jwtToken")
      navigate("/home");
      toast.success("Login successfully");
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("userId", userIds);
      // localStorage.setItem("id", id);


      // localStorage.setItem('loggedUser',firstName)

      console.log(result);
    } catch (error) {
      console.error("There was a problem with the signup operation:", error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <div className="form_container">
        <form className="form_group" onSubmit={onSignup}>
          <h3>Login</h3>
          <div className="form-group my-2">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={register}
              value={user.email}
            />
          </div>
          <div className="form-group my-2">
            <input
              type="text"
              placeholder="Password"
              className="form-control"
              name="password"
              value={user.password}
              onChange={register}
            />
          </div>
          <div className="mb-3 mt-3 d-grid">
            <button className="btn btn-primary">Login</button>
          </div>
        
          <div className="my-1 d-flex justify-content-center">
            <p>
              New user ? <a href="/register">Register</a>
            </p>
           
          </div>
         
        </form>
      </div>
    </div>
  );
}

export default Login;
