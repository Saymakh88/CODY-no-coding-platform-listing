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

  const { category } = useParams();
  const [pptData, setPptData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviewList, setReviewList] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const url = app_config.api_url;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [ratingText, setRatingText] = useState("");

  const fetchData = () => {
    fetch(url + "category/getbycategory/" + category).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setPptData(data);
          fetchRatings(data.category);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchRatings = (category) => {
    fetch(url + "category/getbyitem/" + category).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setReviewList(data);
          setReviewLoading(false);
        });
      }
    });
  };

  const addRating = () => {
    fetch(url + "category/add", {
      method: "POST",
      body: JSON.stringify({
        rating: 4,
        text: reviewText,
        user: currentUser._id,
        slide: pptData._id,
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
    if (!reviewLoading) {
      return reviewList.map(({ rating, text, user }) => (
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
      return reviewList.map(
        ({
            overview,
            easeofuse,
            designs,
            support,
            pricing,
            heroimage,
          _category,
        }) => (
          <div className="container" style={{ padding: "4rem" }}>
            <div className="card">
              <div className="card-body">
                <h5>overview</h5>
                <p>{overview}</p>
                <div className="ripple">
                  {/* <img
                    src={url + "/static/uploads/" + heroimage}
                    className="img-fluid mt-5"
                    alt={pptData.title}
                  /> */}
                   <img
                  src={url + heroimage}
                  class="card-img-top"
                  alt="Laptop"
                />
                </div>
                <h5>Ease Of Use</h5>
                <p class="small">
                    <h6 class="text-muted">
                      {easeofuse}
                    </h6>
                  </p>
                  
                  {/* <p>{description}</p> */}

{/* 
                <a
                  href={url + "/uploads/" + pptData.file}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-danger btn-lg float-end"
                >
                  Download Slide
                </a> */}
                {/* <p>
                  {"https://view.officeapps.live.com/op/embed.aspx?src=" +
                    url +
                    "/uploads/" +
                    pptData.file}
                </p> */}
                  <h5>Design</h5>
                <p>{designs}</p>
               
                <h5>Support</h5>
              
                <p>{support}</p>
                <h5>Pricing</h5>
                
                 <p>{pricing}</p>
                

</div>
</div>
</div>
        )
      );
    }
  };

    return <div style={{ background: "#eee" }}>{displayData()}</div>;
};

export default PPTViewer;
