import { useState } from "react";
import { useHistory } from "react-router-dom";

export function Login({ setUserToken }) {
  const [emailid, setEmailId] = useState("");

  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  function CreateLogin(event) {
    setDisable(true);
    event.preventDefault();
    if (emailid && password) {
      fetch("https://pk-bike-service.herokuapp.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id: emailid, password: password })
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.email_id) {
            localStorage.setItem("usertoken", data.token);
            setUserToken(data.token);
            alert(data.message);
            setEmailId("");
            setPassword("");
            setDisable(false);
            history.push("/servicelist");
          } else {
            alert(data.message);
            setDisable(false);
          }
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://www.kindpng.com/picc/m/169-1697033_motorcycle-bike-work-illustration-bike-mechanic-logo-png.png")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh"
      }}
    >
      <br />
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">Email_Id</label>
          <input
            type="email"
            onChange={(event) => setEmailId(event.target.value)}
            className="form-control"
            value={emailid}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        <h6
          onClick={() => history.push("/forgetpassword")}
          style={{ cursor: " pointer", color: "blue" }}
        >
          Forget Password
        </h6>
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateLogin}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
        <div>DEMO Credentials</div>
        <div>EmailId= pk@gmail.com</div>
        <div>Password= prabhu007</div>
      </form>
    </div>
  );
}
