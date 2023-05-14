import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import app_config from "../../config";
// import "./viewplatformcss.css";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ViewPlatform = () => {
  const [platformDetails, setPlatformDetails] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(false);
  const url = app_config.api_url;
  const { id } = useParams();
  const getdataformBackEnd = () => {
    setLoading(true);
    fetch(url + "platform/getbyid/" + id)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setPlatformDetails(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getdataformBackEnd();
    getReviewdatafromBackend();
  }, []);

  const getReviewdatafromBackend = () => {
    setReviewLoading(true);
    fetch(url + "review/getbyplatform/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviewData(data);
        setReviewLoading(false);
      });
  };

  const displayReviewRating = () => {
    if (!reviewLoading) {
      return <div className="mt-4">
       <h1 className="text-2xl font-bold">Reviews</h1>
      {reviewData.map(({ _id,user:{name,username}, rating, review }) => (
        <div className="card flex flex-row mt-2">
          <div className="card-body">
            <div className="flex flex-row">
            <h5 className="card-title">{rating}</h5>
            <h3>{name}</h3>
            </div>
            <h4>{username}</h4>
            <p className="card-text">{review}</p>
          </div>
        </div>
      ))};
    </div>
    }
  };

  const submitRatingReview = async (values, { resetForm }) => {
    values.user = currentUser._id;
    console.log(values);
    const response = await fetch(url + "reviewrating/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Review Added Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Review Not Added",
      });
    }
    resetForm();
  };

  const popUpLogin=()=>{
    Swal.fire({
        icon:"info",
        title: "SignIn Required",
        text: "Please SignIn to Review the Platform",
      }).then((result)=>{
        if(result.isConfirmed){
          window.location.href="/main/login"
        }
      }
      );
  }

  const showDetails = () => {
    if (!loading) {
      return (
        <motion.div
          initial={{ opacity:0.2, x: "-100vh" }}
          animate={{opacity:1, x: 0 }}
          transition={{ delay:.5, duration: 1, type: "spring", stiffness: "400",damping:"80" }}
          className="container-fluid h-max mt-11"
        >
          <div className="flex flex-col md:flex-row justify-evenly ">
            <div className="ml-2">
              <h1 className="uppercase text-5xl font-serif underline text-teal-600 ">
                {platformDetails.title}
              </h1>
              <p className="text-zinc-700 mt-4 text-lg font-serif">
                {platformDetails.describe}
              </p>
            </div>
            <img
              className="rounded-lg shadow-lg mt-6 transition-transform h-fit md:w-1/2"
              src={url + "/" + platformDetails.thumbnail}
              alt="NoCode"
            />
          </div>
          <div className="flex justify-evenly w-full ">
            <div className="flex flex-col mt-10  w-96 outline mr-2 rounded-lg shadow-lg shadow-slate-600 px-2">
              <h1 className="text-2xl font-extrabold font-serif text-center text-red-900 border-b-2 border-b-black">
                Plan: &nbsp; &nbsp;
              </h1>
              <p className="text-xl font-serif  text-red-700 md:text-2xl">
                {platformDetails.plan}.
              </p>
            </div>
            <div className="flex flex-col  mt-10  w-96 outline ml-2 rounded-lg shadow-lg shadow-slate-600 px-2 ">
              <h1 className="text-2xl font-extrabold font-serif text-center text-blue-900  border-b-2 border-b-black">
                Offers: &nbsp; &nbsp;
              </h1>
              <p className="text-blue-700  text-2xl  font-serif ">
                {platformDetails.offer}.
              </p>
            </div>
          </div>
          <div className="my-10 ">
            <h2 className="text-slate-700 text-xl md:text-2xl font-bold font-serif ">
              Category:-({platformDetails.category}).
            </h2>
          </div>
          <hr></hr>
          {!currentUser ? (
            <div className="mt-2 mb-3 bg-green-800 w-fit rounded-lg">
              <button
                className=" px-2 py-1 text-white font-bold font-mono text-xl hover:bg-green-700 hover:rounded-lg hover:shadow-lg hover:shadow-slate-600"
               onClick={popUpLogin()}
                >
                Click Here To Login  & Give Rating  Review 
              </button>
                </div>
          ) : null}

          {currentUser ? (
            <div className="flex flex-row flex-wrap mt-10  w-2/3  ">
              <Formik
                initialValues={{
                  rating: "",
                  review: "",
                  platform: id,
                }}
                onSubmit={submitRatingReview}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form
                    className=" rounded-lg mb-10 w-2/3 "
                    onSubmit={handleSubmit}
                  >
                    <h1 className="text-2xl font-extrabold font-serif text-green-900">
                      Review & Rating: &nbsp; &nbsp;{" "}
                    </h1>
                    <div className="flex flex-row mt-3 mb-2 ">
                      {[0, 1, 2, 3, 4].map((star) => {
                        const ratingValue = star + 1;
                        return (
                          <label className=" rounded-sm ml-2">
                            <input
                              type="radio"
                              name="rating"
                              id="rating"
                              value={ratingValue}
                              onClick={handleChange}
                              style={{ display: "none" }}
                            />
                            <FaStar
                              className="star "
                              color={
                                ratingValue <= values.rating
                                  ? "#f5e102"
                                  : "#b0b0b0"
                              }
                              size="20px"
                            />
                          </label>
                        );
                      })}
                    </div>
                    <div className="flex flex-col mt-3">
                      <textarea
                        className="rounded-lg mx-2 mt-1 h-28 border-2 border-gray-700 focus:outline-none placeholder:text-zinc-700 text-green-800"
                        type="text"
                        placeholder="What's Your Feedback"
                        id="review"
                        name="review"
                        value={values.review}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="flex justify-center">
                      <button className="bg-blue-300 px-3 py-1 mt-3 rounded-md hover:shadow-md hover:shadow-zinc-600 hover:rounded-full text-zinc-800 mb-2 ">
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          ) : null}
        </motion.div>
      );
    }
  };

  return (
    <div className="container-fluid vh-100 flex flex-col md:flex-row">
      {showDetails()}
      {displayReviewRating()}
    </div>
  );
};
export default ViewPlatform;