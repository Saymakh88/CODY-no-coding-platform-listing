import "../../stylesheets/signup.css";
 //import "../../stylesheets/addplatform.css";
 import "../../stylesheets/signup.css"
 import * as React from 'react';
 //import Avatar from '@mui/material/Avatar';
 import Button from '@mui/material/Button';
 import TextField from '@mui/material/TextField';
 import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
 import Grid from '@mui/material/Grid';
 import { Formik } from "formik";
 import Swal from "sweetalert2";
 import app_config from "../../config";
 import { useState } from "react";
    function AddPlatform({ setOpenAddPlatform }) {
        const url = app_config.api_url;
        const [hero, setHero] = useState("");
        const [PlatformFile, setPlatformFile] = useState("");
   
 
   const platformform = {
     overview: "",
     easeofuse: "",
     heroimage:"",
     pricingplans: "",
     pricingoffers: "",
     feature: "",
     conclusion: "",
     

   };
   const formSubmit = (values) => {
    console.log(values);
    values.heroimage = hero;
    values.file = PlatformFile;

    const reqOp = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(url + "compare/add", reqOp)
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
        setPlatformFile(event.target.files[0].name);
      });
  };

   return (
     
         <div>

<div class="main-w3layouts wrapper">
		<div class="main-agileinfo">
			<div class="agileits-top">
   <Formik initialValues={platformform} onSubmit={formSubmit}>
                 {({ values, handleChange, handleSubmit }) => (
                   <form onSubmit={handleSubmit}>
           {/* <Avatar sx={{ m: 5,mx:40, bgcolor: 'secondary.main' }}> */}
             {/* <LockOutlinedIcon /> */}
           {/* </Avatar> */}
           <h1 className="add"> Add Comparison</h1>
           <TextField
                  className="w-100 mt-4 bg-white"
                  label="Overview"
                  variant="filled"
                  id="overview"
                  onChange={handleChange}
                  value={values.overview}
                required></TextField>
                
                <TextField
                  
                  
                  className="w-100 mt-4 bg-white"
                  label="Easeofuse"
                  variant="filled"
                  id="easeofuse"
                  onChange={handleChange}
                  value={values.easeofuse}
                required></TextField>
                 <input
              
              onChange={uploadheroimage}
              type="file"
              className="form-control mt-4 mx-0"
              overview="Select heroimage"
            required/>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">PricingPlans</InputLabel>
          <Input
            id="pricingplans"
            value={values.pricingplans}
            onChange={handleChange('pricingplans')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          /></FormControl>
                 <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">PricingOffers</InputLabel>
          <Input
            id="pricingoffers"
            value={values.pricingoffers}
            onChange={handleChange('pricingoffers')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          </FormControl><TextField
                  
                  
                className="w-100 mt-4 bg-white"
                label="Feature"
                variant="filled"
                id="feature"
                onChange={handleChange}
                value={values.feature}
              required></TextField>
               
                
               

                                <TextField
                  className="w-100 mt-4 bg-white"
                  label="Conclusion"
                  variant="filled"
                  id="conclusion"
                  onChange={handleChange}
                  value={values.conclusion}
                ></TextField>
                
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
 export default AddPlatform;