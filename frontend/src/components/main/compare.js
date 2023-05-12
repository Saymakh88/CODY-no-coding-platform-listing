import { Avatar, Rating, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import app_config from "../../config";

const PPTViewer = () => {
  const [pptLink, setPptLink] = useState(
    "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx"
  );

  const navigate = useNavigate();

  const { compare } = useParams();
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [compareList, setCompareList] = useState([]);
  const [compareLoading, setCompareLoading] = useState(true);
  const [compareText, setCompareText] = useState("");
  const url = app_config.api_url;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [ratingText, setRatingText] = useState("");

  const fetchData = () => {
    fetch(url + "compare/getbycompare/" + compare).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setCompareData(data);
          fetchRatings(data.compare);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchRatings = (compare) => {
    fetch(url + "compare/getbyitem/" + compare).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setCompareList(data);
          setCompareLoading(false);
        });
      }
    });
  };

  const addRating = () => {
    fetch(url + "compare/add", {
      method: "POST",
      body: JSON.stringify({
        rating: 4,
        text: compareText,
        user: currentUser._id,
        slide: compareData._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Review💬 Added");
      }
    });
  };

  const displayRatings = () => {
    if (!compareLoading) {
      return compareList.map(({ rating, text, user }) => (
        <div className="card">
          <div className="card-body">
            <Avatar alt="User" />
            <span>{/* <b>{user.name}</b> */}</span>
            <Rating name="simple-controlled" value={rating} />
            <h5 className="text-dark">{text}</h5>
          </div>
        </div>
      ));
    }
  };

  const displayData = () => {
    if (!loading) {
      return compareList.map(
        ({
          overview,
          easeofuse,
          heroimage,
          pricingplans,
          pricingoffers,
          feature,
          conclusion,
          
        }) => (
<div className="container" style={{ padding: "4rem" }}>
            <div className="card">
              <div className="card-body">
                <p>{overview}</p>
                <p class="small">
                    <h6 class="text-muted">
                      {easeofuse}
                    </h6>
                  </p>
                  <div className="ripple">
                  
                   <img
                  src={url + heroimage}
                  class="card-img-top"
                  alt="Laptop"
                />
                </div>
                  <h3>{pricingplans}</h3>
                  <div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <h3>{pricingoffers}</h3>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
                  
<p>{feature}</p>
<p>{conclusion}</p>

                <h4 className="text-muted">Review</h4>
                <hr />
                <Rating name="simple-controlled" value={4} />
                <TextField
                  label="Write Something .."
                  fullWidth
                  className="mt-2"
                  multiline
                  rows={3}
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-3 float-end"
                  // onClick={addRating}
                  onClick={e=>navigate("/main/browsereview/" )} 
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        //    </div>
        )
      );
    }
  };

    return <div style={{ background: "#eee" }}>{displayData()}</div>;
};

export default PPTViewer;