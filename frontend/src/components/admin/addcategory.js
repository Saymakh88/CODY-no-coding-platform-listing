import "../../stylesheets/signup.css";
 import "../../stylesheets/addplatform.css";
 import "../../stylesheets/signup.css"
 import * as React from 'react';
 //import Avatar from '@mui/material/Avatar';
 import Button from '@mui/material/Button';
 import TextField from '@mui/material/TextField';
 //import Link from '@mui/material/Link';
 import Grid from '@mui/material/Grid';
 import { Formik } from "formik";
 import Swal from "sweetalert2";
 import app_config from "../../config";
 import { useState } from "react";
    function AddCategory({ setOpenAddCategory }) {
        const url = app_config.api_url;
        const [hero, setHero] = useState("");
        const [CategoryFile, setCategoryFile] = useState("");
   
 
   const categoryform = {
    overview: String,
    easeofuse: String,
    designs: String,
    support: String,
    pricing: String,
    heroimage:String,
     

   };
   const formSubmit = (values) => {
    console.log(values);
    values.heroimage = hero;
    values.file = CategoryFile;

    const reqOp = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(url + "category/add", reqOp)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message == "success") {
          Swal.fire({
            icon: "success",
            title: "Added Successfully!!",
          });
        }
      });
  };

  const uploadheroimage = (event) => {
    const formdata = new FormData();
    formdata.append("file", event.target.files[0]);

    const reqOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(url + "util/addfile", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHero(event.target.files[0].name);
      });
  };

  const uploadfile = (event) => {
    const formdata = new FormData();
    formdata.append("file", event.target.files[0]);

    const reqOptions = {
      method: "POST",
      body: formdata,
    };

    fetch(url + "util/createfile", reqOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategoryFile(event.target.files[0].name);
      });
  };

   return (
     
         <div>

<div class="main-w3layouts wrapper">
		<div class="main-agileinfo">
			<div class="agileits-top">
   <Formik initialValues={categoryform} onSubmit={formSubmit}>
                 {({ values, handleChange, handleSubmit }) => (
                   <form onSubmit={handleSubmit}>
           {/* <Avatar sx={{ m: 5,mx:40, bgcolor: 'secondary.main' }}> */}
             {/* <LockOutlinedIcon /> */}
           {/* </Avatar> */}
           <h1 className="add"> Add Category</h1>
           <TextField
                  className="w-100 mt-4 bg-white"
                  label="Overview"
                  variant="filled"
                  id="overview"
                  onChange={handleChange}
                  value={values.overview}
                required></TextField>
                <input
              
              onChange={uploadheroimage}
              type="file"
              className="form-control mt-4 mx-0"
              title="Select heroimage"
            required/>
                <TextField
                  
                  
                  className="w-100 mt-4 bg-white"
                  label="Ease Of Use"
                  variant="filled"
                  id="easeofuse"
                  onChange={handleChange}
                  value={values.easeofuse}
                required></TextField>
                <TextField
                  
                  
                  className="w-100 mt-4 bg-white"
                  label="Designs"
                  variant="filled"
                  id="designs"
                  onChange={handleChange}
                  value={values.designs}
                required></TextField>
                <TextField
                  
                  
                  className="w-100 mt-4 bg-white"
                  label="Support"
                  variant="filled"
                  id="support"
                  onChange={handleChange}
                  value={values.support}
                required></TextField><TextField
                  
                  
                className="w-100 mt-4 bg-white"
                label="Pricing"
                variant="filled"
                id="pricing"
                onChange={handleChange}
                value={values.pricing}
              required></TextField>
               
                
               
                
             <Button
             
             fullWidth
               type="submit"
               variant="contained"
               sx={{  mt: 4, mb: 2 }}
             >
               Add
             </Button>
             <Grid container justifyContent="flex-end">
               <Grid item mx={27}>
                 
               </Grid>
             </Grid>
             </form>
                 )}
                 </Formik>

        
       </div>
       </div>
       </div>
       </div>
       
 );
 }
 export default AddCategory;