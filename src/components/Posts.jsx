import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

const Posts = () => {
  // variable for initail data from api
  const [data, setData] = useState([]);

  // for showimg add user form
  const [showUserForm, setShowUserForm] = useState(false);

  // for adding a new user with default values as empty
  const [user, setAddUser] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  // api call to get users
  const fetchUsers = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setData(res.data);
  };

  // calling api on intial load of component
  useEffect(() => {
    fetchUsers();
  }, []);

  // method for deleting a user
  const deleteUser = async (id) => {
    const res = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    console.log(res);

    // since it isnt a real api, i am just filtering the data to remove the user
    setData((prevData) => prevData.filter((user) => user.id !== id));
  };

  // method for handling input change in add user form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser((prev) => ({ ...prev, [name]: value }));
  };

  // method for adding a new user
  const addUser = () => {
    if (!user.name || !user.email) return alert("Name and Email are required!");
    setData([
      ...data,
      {
        id: data.length + 1,
        ...user,
      },
    ]);

    //  emptying the form and hiding the form after hitting save
    setAddUser({
      name: "",
      email: "",
      phone: "",
      website: "",
    });
    setShowUserForm(false);
  };

  // rendering the users data
  return (
    <div className="users-container">
      <div className="header">
        <h1 className="title">Users</h1>
        <button className="add-btn" onClick={() => setShowUserForm(true)}>
          Add User
        </button>
      </div>
      <div className="users-grid">
        {data?.map((user) => (
          <div key={user.id} className="user-card">
            <button className="dlt-btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
            <div className="user-info">
              <h2 className="user-name">{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phone}</p>
              <p className="user-website">{user.website}</p>
            </div>
          </div>
        ))}
      </div>

      {/* showing the add user form based on condition */}
      {showUserForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowUserForm(false)}
            >
              ✖
            </button>
            <h2>Add User</h2>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
            <input
              type="text"
              name="website"
              value={user.website}
              onChange={handleChange}
              placeholder="Enter Website"
            />
            <button className="save-btn" onClick={addUser}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
