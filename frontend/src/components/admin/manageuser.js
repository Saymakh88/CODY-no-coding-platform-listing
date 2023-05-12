//import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import app_config from "../../config";
import UpdateUser from "./updateuser";


const ManageUser = () => {
  const url = app_config.api_url;

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchData = () => {
    fetch('users/getall')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsersData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    fetch(url + "users/delete/" + id, { method: "DELETE" })
    .then((res) => {
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
      return <UpdateUser formdata={formData}></UpdateUser>;
    }
  };

  const displayUsers = () => {
    if (!loading) {
      return usersData.map(({users}) => (
        <tr>
          <td>{users.firstname}</td>
          <td>{new Date(users.created).toLocaleDateString()}</td>
          <td>
            <button
              onClick={(e) => deleteData(users._id)}
              className="btn btn-danger"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
          <td>
            <button className="btn btn-primary" onClick={updateData}>
              <i class="fas fa-pen"></i>
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <h1 className="text-center">Manage User</h1>
      <hr/>

      <table className="table table-light">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Created On</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{displayUsers()}</tbody>
      </table>
      <div className="mt-5">{displayUpdateForm()}</div>
     </div>
  );
};

export default ManageUser;