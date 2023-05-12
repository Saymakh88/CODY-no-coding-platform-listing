import { Search } from "@mui/icons-material";
import { InputAdornment, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import app_config from "../../config";
//import "../../stylesheets/browseplatform.css";
const BrowseSlides = () => {
  const [datalist, setDatalist] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = app_config.api_url;
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(url + "review/getall").then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setDatalist(data);
          setLoading(false);
        });
      }
    });
  };

  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const displayData = () => {
    if (!loading) {
      return datalist.map(
        ({
            websitename,
            url,
            heroimage,
            description,
          _id,
        }) => (
          <div key={_id} class="col-md-12 col-lg-4 mb-4 mb-lg-0 ">
              
            <div class="card cards">
              <NavLink className="ripple" to={"/main/pptviewer/" + _id}>
                {/* <img
                  src={url + heroimage}
                  class="card-img-top"
                  alt="Laptop"
                />
                 */}
              </NavLink>
              
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <p class="small">
                    <a href="#!" class="text-muted">
                      {url}
                    </a>
                  </p>
                  {/* <p class="small text-danger">
                    <s>$1099</s>
                  </p> */}
                </div>
                {/* <div class="d-flex justify-content-between mb-1">
                  <p class="mb-0">{description}</p></div> */}

                <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">{websitename}</h5>
                  {/* <h5 class="text-dark mb-0">FREE</h5> */}
                </div>
                <div class="d-flex justify-content-between mb-3">
                  <h6 class="mb-0">{description}</h6>
                  {/* <h5 class="text-dark mb-0">FREE</h5> */}
                </div>
                {/* <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">{plans}</h5>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">{offers}</h5>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                  <h5 class="mb-0">{links}</h5>
                  </div>
                <div class="d-flex justify-content-between mb-2">
                  <p class="text-muted mb-0">
                    <span class="fw-bold">FREE</span>
                  </p> */}
                  <div class="ms-auto text-warning">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div><hr/>

                  
                  {/* <Button onClick={e=>navigate("/main/platformdetail/" + _id)} variant="contained">Click For Full Details</Button> */}
                  {/* <div class="b"> */}
                  {/* <Button className="button" onClick={e=>navigate("/main/categorydetail/" + _id)} variant="contained">Click For Categories</Button> */}
                  
                {/* </div> */}
                
              </div>

            </div>
           </div>
        )
      );
    }
  };

  const applyfilter = () => {};

  return (
    <div >
              
     
    <div style={{ background: "#eee", height: "200vh" }}>
    <img src="https://cdn2.editmysite.com/images/landing-pages/global/home-com-forward/themes/design-xl.webp"></img>
      <header style={styles.header}>
        
        {/* <Typography className="text-center text-black" variant="h5">
          Neephur
        </Typography> */}
        <div>
      
        <Typography className="text-center text-black" variant="h2">
          All Reviews
        </Typography>

        {/* <div className="input-group mt-5">
          <input
            className="form-control"
            value={filter}
            label="Search Here"
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "active.active", mr: 1, my: 0.5 }} />
                </InputAdornment>
              ),
            }}
          />
          
          <button
            className="btn btn-primary"
            onClick={applyfilter}
            type="submit"
          >
            Search
          </button>
        </div> */}
        </div>
      </header>
      <div className="container">
        <div className="row">{displayData()}</div>
      </div>
    </div>
    </div>
  );
};


const styles = {
  header: {
    // background:
    //   "linear-gradient(to right, #0000009b, #000000ad), url(http://localhost:5000/images/browse_back.jpg)",
    padding: "2rem",
    textShadow: "2px 2px 3px #0000005c",
    height: "300px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default BrowseSlides;