import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import banner from "../image/model/twe.jpg";
import "../css/signup.css";
import axios from "axios";

const FanSignUp = () => {
  const navigate = useNavigate();
  const [info] = useState("please enter your details");
  //mapping around the usertype array ----->>>>> selecting
  // const AddUserType = userType.map(Add => Add)

  // handling User Type Selection 
  // const handleUserType = (e) => {
  //   let userT = userType[e.target.value]

  //   //pushing gender option to the main user array.
  //   setUser({...user, status: userT})
  // }

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    passwordmatch: "",
    displayName: "",
    status: "user",
  });


  const handleSignUp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const API_URL = "https://xfansbend.herokuapp.com/api/clients";
      const fanRegister = async () => {
        const response = await axios.post(API_URL, user);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
           navigate("/fan-login");
          console.log("res is true")
        }
        return response.data;
      };
      

      const detailsRequired =
        user.password &&
        user.email &&
        user.firstName &&
        user.lastName &&
        user.passwordmatch &&
        user.userName;
        // user.status;
      //navigating user to login page.......
     if (!user.email) {
        window.alert("kindly enter your email")
      } else if (!user.firstName) {
        window.alert("Kindly input your password")
      } else if (!user.lastName) {
        window.alert("kindly input your last name")
      } else if (!user.userName) {
        window.alert("kindly input your username ")
      } else if (user.password !== user.passwordmatch) {
        window.alert("password does not match")
      } else if (detailsRequired && user.password === user.passwordmatch) {
        fanRegister()
        // console.log(user.status)

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          userName: "",
          password: "",
          passwordmatch: "",
        });
      } 
      else {
        window.alert(info);
      }
    },
    [info, navigate, user]
  );

  return (
    <>
      <Header />
      <div className="signup">
        <div className="signup-left">
          <img src={banner} alt="" />
        </div>

        <div className="signup-right">
          <div className="signup-head">
            <h1>FAN REGISTRATION</h1>
            <p>Sign up to interact with your idols.</p>
          </div>

          <span>
            <hr /> * <hr />
          </span>

          <form>
            <div className="form-flex">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={handleSignUp}
                value={user.firstName}
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={handleSignUp}
                value={user.lastName}
              />
            </div>
            <div className="form-flex">
              <input
                type="text"
                name="displayName"
                id="displayName"
                placeholder="Display Name"
                onChange={handleSignUp}
                value={user.displayName}
                autoComplete="off"
              />
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="User Name"
                onChange={handleSignUp}
                value={user.userName}
                autoComplete="off"
              />
            </div>
            <input
              type="email"
              name="email"
              className="email"
              id="email"
              placeholder="Email"
              onChange={handleSignUp}
              value={user.email}
            />

            <div className="form-flex"></div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleSignUp}
                value={user.password}
                required
              />
              <input
                type="password"
                name="passwordmatch"
                id="matchpassword"
                placeholder="Confirm Password"
                onChange={handleSignUp}
                value={user.passwordmatch}
              />
            {/* <label htmlFor="status-type">What are you reqistering for? </label>
            <select onChange={e => handleUserType(e)}  name="status" id="status-type" className="signup-select">
            {
                    AddUserType.map((address, key) => <option value={key} >{address} </option>)
                }
            </select> */}

            <button type="submit" onClick={handleSubmit}>
              Create Account
            </button>
          </form>
          <div className="form-others">
            <p>
              Already Have an account? <span> <Link to="/login">Log In.</Link></span>
            </p>
            <p>
              Are you a Model, <span>  <Link to="/model-signup">Sign Up here</Link></span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FanSignUp;
