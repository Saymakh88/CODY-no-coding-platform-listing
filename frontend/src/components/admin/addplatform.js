import "../../stylesheets/signup.css";
import "../../stylesheets/addplatform.css";
import "../../stylesheets/signup.css";
import * as React from "react";
//import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../../config";
import { useState } from "react";
function AddPlatform({ setOpenAddPlatform }) {
  const url = app_config.api_url;
  const [hero, setHero] = useState("");
  const [PlatformFile, setPlatformFile] = useState("");

  const platformform = {
    title: "",
    description: "",
    category: "",
    heroimage: "",
    links: "",
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

    fetch(url + "platform/add", reqOp)
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
                  <h1 className="add"> Add Platfrom</h1>
                  <TextField
                    className="w-100 mt-4 bg-white"
                    label="Title"
                    variant="filled"
                    id="title"
                    onChange={handleChange}
                    value={values.title}
                    required
                  ></TextField>
                  <TextField
                    className="w-100 mt-4 bg-white"
                    label="Description"
                    variant="filled"
                    id="description"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={values.description}
                    required
                  ></TextField>

                  <TextField
                    className="w-100 mt-4 bg-white"
                    label="Category"
                    variant="filled"
                    id="category"
                    onChange={handleChange}
                    value={values.category}
                    required
                  ></TextField>

                  <input
                    onChange={uploadheroimage}
                    type="file"
                    className="form-control mt-4 mx-0"
                    title="Select heroimage"
                    required
                  />

                  <TextField
                    className="w-100 mt-4 bg-white"
                    label="Links"
                    variant="filled"
                    id="links"
                    onChange={handleChange}
                    value={values.links}
                  ></TextField>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4, mb: 2 }}
                  >
                    Add
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item mx={27}></Grid>
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
