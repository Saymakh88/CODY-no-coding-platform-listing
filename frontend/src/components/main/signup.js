import "../../stylesheets/signup.css";
import * as React from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
//import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";
function Signup({ setOpenSignup}){
  const url = app_config.api_url;

  const signupform = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  const formSubmit = (values) => {
    console.log(values);

    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    // request on server and parse the json response
    fetch(url + "user/add", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "success") {
          Swal.fire({
            icon: "success",
            title: "Registered!",
            text: "Now Login to Continue",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong",
          });
        }
      });
  };

  return (
    
    <div class="main-w3layouts wrapper">
		{/* <h1 class="h">SignUp Form</h1> */}
		<div class="main-agileinfo">
      
			<div class="agileits-top">
      <h1 class="h">SignUp Form</h1>
      <Formik initialValues={signupform} onSubmit={formSubmit}>
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit} >
					 <Grid container spacing={5} >
              <Grid item xs={10} sm={6} >
                <TextField
                className="app"
                  // autoComplete="given-name"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  onChange={handleChange}
                  value={values.firstname}
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12} sm={6} >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"  
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={8} mx={4}>
                <FormControlLabel required className="app"
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept all Terms and Conditions" 
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item mx={13}>
                <Link href="/main/login" variant="body2 "class="link">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </form>
                )}
                </Formik>
		</div>
		</div>
		</div>
    

);
}

export default Signup;

