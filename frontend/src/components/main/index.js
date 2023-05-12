import { Outlet } from "react-router-dom";
//import Login from "./login.js";
//import Header from "/header.js";
import Header from "./header.js";
import sidebar from "../sidebar";
// import Footer from "./footer.js";
const Main = () => {
  const options = [
    {
      name: "Add Review",
      link: "/main/addReview",
    },
  ];
  return (
    <>
      <Header></Header>
      {/* <Sidebar sidebarOptions={options} title={'User Dashboard'} > */}

      <Outlet />

      {/* </Sidebar> */}
      {/* <Footer></Footer> */}
    </>
  );
};
export default Main;
