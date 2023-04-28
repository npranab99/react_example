import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GetUser() {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  const [userId, setUserId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getuser();
  }, []);
  function getuser() {
    fetch("http://localhost:5000/user").then((event) => {
      event.json().then((resp) => {
        setData(resp);
      });
    });
  }
  function deleteUser(id) {
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getuser();
      });
    });
  }
  function selectUser(id) {
    var userToBeEdited = data.find((user) => user.id === id);

    console.warn(userToBeEdited);

    setName(userToBeEdited.name);
    setUser(userToBeEdited.user);
    setUserId(userToBeEdited.id);
  }

  function updateUser(e) {
    e.preventDefault();
    let item = { name, user, userId };
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        //console.warn(resp);
        getuser();
      });
    });
    setName("");
    setUser("");
  }

  return (
    <>
      <Link to="/add_user">
        <button>Add User</button>
      </Link>

      <input
        placeholder="Search Here"
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />
      <table border="1">
        <tbody>
          <tr>
            <td>Name</td>
            <td>User Name</td>
            <td>Action</td>
          </tr>

          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search);
            })
            .map((e, i) => (
              <tr key={i}>
                <td>{e.name}</td>
                <td>{e.user}</td>
                <td>
                  <button onClick={() => deleteUser(e.id)}>Delete</button>
                </td>
                <td>
                  <button onClick={() => selectUser(e.id)}>Edit</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label>User Name</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />

        <button onClick={updateUser}>Update</button>
      </div>
    </>
  );
}
export default GetUser;
