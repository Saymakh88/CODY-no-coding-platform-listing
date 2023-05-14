import { Search } from "@mui/icons-material";
import { InputAdornment, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import app_config from "../../config";
import "../../stylesheets/comparison.css";

const Comparison = () => {
  const [datalist, setDatalist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState([]);

  const [platformArray, setPlatformArray] = useState([]);

  const url = app_config.api_url;
  const navigate = useNavigate();

  const fetchData = () => {
    fetch(url + "platform/getall").then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          setDatalist(data);
          setLoading(false);
        });
      }
    });
    setPlatformArray(JSON.parse(sessionStorage.getItem("platforms"))); 
  };

  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const compareCard = ({
    title,
    description,
    plans,
    offers,
    category,
    heroimage,
    links,
    _id,
  }) => {
    return (
      <div key={_id} className="col-md">
        <div className="card">
          <div className="card-body">
            <h1>{title}</h1>
            <p>{description}</p>
            {/* {plans}
            {offers} */}
          </div>
        </div>
      </div>
    );
  };
  const applyfilter = () => {};

  const showOptions = () => {
    if (!loading) {
      return (
        <div>
          <select className="form-control">
            <option>Select One</option>
            <option value="weebly">Weebly</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div className="row">{showOptions()}</div>
        </div>
      );
    }
  };

  const showCompareCards = () => {
    if (platformArray.length) {
      return platformArray.map((platform) => (
        <div className="row">{compareCard(platform)}</div>
      ));
    }
  };

  return <div>{showCompareCards()}</div>;
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

export default Comparison;
