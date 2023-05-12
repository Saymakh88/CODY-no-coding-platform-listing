//import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import app_config from "../../config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../../stylesheets/browseplatform.css";
import Update from "./update";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";

const ManagePlatform = () => {
  const url = app_config.api_url;

  const [platformData, setPlatformData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchData = () => {
    fetch(url + "platform/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlatformData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    fetch(url + "platform/delete/" + id, { method: "DELETE" }).then((res) => {
      console.log(res.status);
      fetchData();
    });
  };

  const updateData = (form) => {
    setShowForm(true);
    setFormData(form);
  };

  const displayUpdateForm = () => {
    if (showForm) {
      return;
      <Update formdata={formData}></Update>;
    }
  };

  const displayPlatforms = () => {
    if (!loading) {
      return platformData.map((platform) => (
        <Accordion>
          <AccordionSummary>{platform.title}</AccordionSummary>
          <AccordionDetails>
            {platform.description}
            {addPlanForm(platform._id)}
            {addOfferForm(platform._id)}
            <button
              onClick={(e) => deleteData(platform._id)}
              className="btn btn-danger"
            >
              {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
              <DeleteForeverIcon color="dark" />
            </button>
            <button className="btn btn-primary" onClick={updateData}>
              {/* <i class="fas fa-pen"></i> */}
              <EditIcon color="dark" />
            </button>
          </AccordionDetails>
        </Accordion>
      ));
    }
  };

  const addPlanForm = (plat_id) => {
    return (
      <Formik
        initialValues={{ name: "", validity: "", price: "" }}
        onSubmit={(formdata) => {
          fetch(url + "platform/pushupdate/" + plat_id, {
            method: "PUT",
            body: JSON.stringify({ plans: formdata }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Plan Added",
              });
            }
          });
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              className="w-100 mt-4 bg-white"
              label="Name"
              variant="filled"
              name="name"
              onChange={handleChange}
              value={values.name}
              required
            ></TextField>
            <TextField
              className="w-100 mt-4 bg-white"
              label="Validity"
              variant="filled"
              name="validity"
              onChange={handleChange}
              value={values.validity}
              required
            ></TextField>
            <TextField
              className="w-100 mt-4 bg-white"
              label="Price"
              variant="filled"
              name="price"
              onChange={handleChange}
              value={values.price}
              required
            ></TextField>
            <button className="btn btn-primary mt-5">Submit</button>
          </form>
        )}
      </Formik>
    );
  };

  const addOfferForm = (plat_id) => {
    return (
      <Formik
        initialValues={{ name: "", validity: "" }}
        onSubmit={(formdata) => {
          fetch(url + "platform/pushupdate/" + plat_id, {
            method: "PUT",
            body: JSON.stringify({ plans: formdata }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Plan Added",
              });
            }
          });
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              className="w-100 mt-4 bg-white"
              label="Name"
              variant="filled"
              name="name"
              onChange={handleChange}
              value={values.name}
              required
            ></TextField>
            <TextField
              className="w-100 mt-4 bg-white"
              label="Validity"
              variant="filled"
              name="validity"
              onChange={handleChange}
              value={values.validity}
              required
            ></TextField>

            <button className="btn btn-primary mt-5">Submit</button>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <div>
      <h1 className="text-center">Manage Your Platform</h1>
      <hr />

      {displayPlatforms()}
      <div className="mt-5">{displayUpdateForm()}</div>
    </div>
  );
};

export default ManagePlatform;
