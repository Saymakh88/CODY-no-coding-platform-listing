import "../../stylesheets/login.css";
import app_config from "../../config";
import Swal from "sweetalert2";
import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // const [signupOpen,setOpenSignup] =useState(false);

  const url = app_config.api_url;
  const navigate = useNavigate();

  const loginform = {
    email: "",
    password: "",
  };
  const formSubmit = (values) => {
    console.log(values);
    fetch(url + "admin/getbyemail/" + values.email)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);

          if (data.password === values.password) {
            console.log("login success");

            Swal.fire({
              icon: "success",
              title: "Login Success",
            });

            sessionStorage.setItem("admin", JSON.stringify(data));
            navigate("/admin/manageplatform");
            return;
          }
        }

        Swal.fire({
          icon: "error",
          title: "Email or Password Incorrect",
        });
      });
  };

  return (
    <div class="login-box">
      <h2>Login</h2>
      <Formik initialValues={loginform} onSubmit={formSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="mt-5 w-100 bg text-white">Email*</label>
            <input
              className="form-control"
              type="email"
              onChange={handleChange}
              value={values.email}
              name="email"
              required
            />

            <label className="mt-4 bg text-white">Password*</label>
            <input
              className="form-control"
              onChange={handleChange}
              value={values.password}
              type="password"
              name="password"
              requied
            />

            <button
              type="submit"
              className="mt-5 btn btn-primary w-100 "
              href="/admin/dashboard"
            >
              Login Now
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;
