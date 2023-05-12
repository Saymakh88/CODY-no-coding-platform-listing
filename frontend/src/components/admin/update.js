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

const Update = (props) => {
  // function CreatePort({ setOpenCreatePort }) {
  const url = app_config.api_url;
  const [hero, setHero] = useState("");
  const [platformFile, setPlatformFile] = useState("");

  const formSubmit = (values) => {
    console.log(values);
    values.heroimage = hero;
    values.file = platformFile;

    const reqOp = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    fetch(url + "platform/update/" + props.formdata._id, reqOp)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message == "success") {
          Swal.fire({
            icon: "success",
            title: " Updated Successfully!!",
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
                  label="Title"
                  variant="filled"
                  id="title"
                  onChange={handleChange}
                  value={values.title}
                ></TextField>
                <TextField
                  multiline
                  rows={5}
                  className="w-100 mt-4"
                  label="Description"
                  variant="filled"
                  id="description"
                  onChange={handleChange}
                  value={values.description}
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
                  label="Plans"
                  variant="filled"
                  id="plans
                  "
                  onChange={handleChange}
                  value={values.plans
                  }
                ></TextField> <TextField
                className="w-100 mt-4"
                label="Offers"
                variant="filled"
                id="offers
                "
                onChange={handleChange}
                value={values.offers
                }
              ></TextField>
               <TextField
                  className="w-100 mt-4"
                  label="Category"
                  variant="filled"
                  id="category
                  "
                  onChange={handleChange}
                  value={values.category}
                  ></TextField>
                  
                <input
                  onChange={uploadheroimage}
                  type="file"
                  className="form-control mt-4"
                  title="Select heroimage"
                />
                <TextField
                  className="w-100 mt-4"
                  label="Links"
                  variant="filled"
                  id="links
                  "
                  onChange={handleChange}
                  value={values.links
                  }
                ></TextField>


                {/* <input onChange={uploadVideo} type="file" className="form-control mt-4" title="Select Video File" /> */}

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

export default Update;