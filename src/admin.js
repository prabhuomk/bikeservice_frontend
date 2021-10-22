import { useState } from "react";
import { useHistory } from "react-router-dom";

export function MyAdmin({ setAdminToken }) {
  const [adminid, setAdminId] = useState("");

  const [password, setPassword] = useState("");
  const [change, setChange] = useState(true);

  const history = useHistory();

  function AdminSignUp(event) {
    event.preventDefault();
    if (adminid && password.length >= 5) {
      fetch("https://pk-bike-service.herokuapp.com/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ admin_id: adminid, password: password })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setAdminId("");
          setPassword("");
        });
    } else {
      alert(
        "enter all fields and password length should be greater or equal to 5"
      );
    }
  }
  function AdminLogin(event) {
    event.preventDefault();
    fetch("https://pk-bike-service.herokuapp.com/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ admin_id: adminid, password: password })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("admintoken", data.token);
          setAdminToken(data.token);

          alert(data.message);
          setAdminId("");
          setPassword("");
          history.push("/createservice");
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <div>
      <br />
      <br />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setChange(true)}
      >
        Click to signup
      </button>
      <span> </span>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setChange(false)}
      >
        Click to login
      </button>

      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">ADMIN ID</label>
          <input
            type="text"
            onChange={(event) => setAdminId(event.target.value)}
            className="form-control"
            value={adminid}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">PASSWORD</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        {change === true ? (
          <button
            type="button"
            className="btn btn-danger"
            onClick={AdminSignUp}
          >
            SINGUP
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-success"
            onClick={AdminLogin}
          >
            LOGIN
          </button>
        )}
      </form>
      <br />
      <p>
        <b>NOTE:</b> for <b>signup</b> Admin_id can only be "pk1" or "pk2" or
        "pk3" , already Admin_id "pk1" has been used for signup
      </p>
      <p>
        hence use other two id or do <b>login </b>using
        <b> Admin_id = "pk1" and password = "pk007"</b>
      </p>
    </div>
  );
}
