import React from "react";
import { useState } from "react";

function AddNewUser() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  function submit(e) {
    e.preventDefault();
    var data = { name, user };
    if (name && user) {
      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      alert("Fill all the details");
    }
    setName("");
    setUser("");
  }

  return (
    <>
      <form action="" onSubmit={submit}>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddNewUser;
