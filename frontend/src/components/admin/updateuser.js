//import { Button, FormControl, MenuItem, TextField } from "@material-ui/core";
import { Formik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
import app_config from "../../config";
import Swal from "sweetalert2";
import { useState } from "react";
//import "../stylesheets/createport.css";

const UpdateUsers = (props) => {
  // function CreatePort({ setOpenCreatePort }) {
  const url = app_config.api_url;
  const [hero, setHero] = useState("");
  const [usersFile, setUsersFile] = useState("");

  const formSubmit = (values) => {
    console.log(values);
    values.heroimage = hero;
    values.file = usersFile;

    const reqOp = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(url + "users/update/" + props.formdata._id, reqOp)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message == "success") {
          Swal.fire({
            icon: "success",
            firstname: " Updated Successfully!!",
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
        setUsersFile(event.target.files[0].name);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-">
          {/* <div className="card"> */}
          {/* <div className="card-body"> */}

          <h3>Update Data</h3>
          <hr />

          <Formik initialValues={props.formdata} onSubmit={formSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className="w-100 mt-4"
                  label="First Name"
                  variant="filled"
                  id="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                ></TextField>
                <TextField
                  multiline
                  rows={5}
                  className="w-100 mt-4"
                  label="Last Name"
                  variant="filled"
                  id="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                ></TextField>
                {/* <FormControl className="w-100 mt-4" variant="filled">
                                           <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={''}>None</MenuItem>
                                                <MenuItem value={'Movie'}>Movie</MenuItem>
                                                <MenuItem value={'WebSeries'}>Web Series</MenuItem>
                                                <MenuItem value={'TVShows'}>TV Series</MenuItem>
                                            </Select>
                                        </FormControl> */}
 <TextField
                  className="w-100 mt-4"
                  label="Email"
                  variant="filled"
                  id="email
                  "
                  onChange={handleChange}
                  value={values.email
                  }
                ></TextField> <TextField
                className="w-100 mt-4"
                label="Password"
                variant="filled"
                id="password
                "
                onChange={handleChange}
                value={values.password
                }
              ></TextField>


                {/* <input onChange={uploadVideo} type="file" className="form-control mt-4" firstname="Select Video File" /> */}

                <Button
                  className="mt-5"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;