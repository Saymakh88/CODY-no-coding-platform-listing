import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Admin from "./components/admin";
import Signin from "./components/main/adminLogin";
import Dashboard from "./components/admin/dashboard";
import AddPlatform from "./components/admin/addplatform";
import AddCategory from "./components/admin/addcategory";
import ManagePlatform from "./components/admin/manageplatform";
import ManageUser from "./components/admin/manageuser";
import AddCompare from "./components/admin/addcompare";
import Main from "./components/main";
import Signup from "./components/main/signup";
import Login from "./components/main/login";
//import Header from "./components/main/header";
import BrowsePlatform from "./components/main/browseplatform";
import BrowseCompare from "./components/main/browsecompare";
import BrowseReview from "./components/main/browsereview";
import UserDashboard from "./components/main/userdashboard";
import PlatformDetail from "./components/main/platformdetail";
import CategoryDetail from "./components/main/categorydetail";
import Home from "./components/main/home";
import Compare from "./components/main/compare";
import Footer from "./components/main/footer";
import AddReview from "./components/main/AddReview";
import User from "./components/user";
import { Provider } from "./Context";
import Comparison from "./components/main/comparison";
import AdminLogin from "./components/main/adminLogin";
import AdminAuthorisor from "./components/adminAuth";
import Authorisor from "./components/authenticator";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider>
          {/* <Header></Header> */}
          <Routes>
            <Route
              element={
                <AdminAuthorisor>
                  <Admin />
                </AdminAuthorisor>
              }
              path="admin"
            >
              <Route element={<Dashboard />} path="dashboard" />
              <Route element={<AddPlatform />} path="addplatform" />
              <Route element={<AddCompare />} path="addcompare" />
              <Route element={<AddCategory />} path="addcategory" />
              <Route element={<ManagePlatform />} path="manageplatform" />
              <Route element={<ManageUser />} path="manageuser" />
            </Route>

            <Route element={<Main />} path="main">
              <Route element={<Signup />} path="signup" />
              <Route element={<Login />} path="login" />
              <Route element={<AdminLogin />} path="adminlogin" />
              {/* <Route element={<Header />} path="header" /> */}
              <Route element={<Home />} path="home" />
              <Route element={<Footer />} path="footer" />
              <Route element={<AddReview />} path="addreview" />
              {/* <Route element={<Compare />} path="compare" /> */}
              <Route element={<Comparepla />} path="compare" />
              <Route element={<UserDashboard />} path="userdashboard" />
              <Route element={<BrowsePlatform />} path="browseplatform" />
              <Route element={<BrowseCompare />} path="browsecompare" />
              <Route element={<BrowseReview />} path="browsereview" />
              <Route element={<PlatformDetail />} path="platformdetail/:id" />
              <Route element={<CategoryDetail />} path="categorydetail/:id" />
              <Route element={<Comparison />} path="comparison" />
            </Route>
            <Route
              element={
                <Authorisor>
                  <User />
                </Authorisor>
              }
              path="user"
            ></Route>
            <Route element={<Navigate to="/main/home" />} path="/"></Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
