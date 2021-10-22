import { useState } from "react";
import { useHistory } from "react-router-dom";

export function SignUp() {
  const [emailid, setEmailId] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  function CreateSignup(event) {
    setDisable(true);
    event.preventDefault();
    if (
      !emailid.includes("@") ||
      !emailid.includes(".") ||
      emailid.length < 8 ||
      password.length < 5
    ) {
      alert("Email is not valid or password length is less then 5 ");
      setDisable(false);
    } else if (emailid && password && firstname && lastname) {
      fetch("https://pk-bike-service.herokuapp.com/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_id: emailid,
          firstname: firstname,
          lastname: lastname,
          password: password
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setDisable(false);
          setEmailId("");
          setFirstName("");
          setLastName("");
          setPassword("");
          history.push("/login");
        });
    } else {
      alert("Please enter the fields");
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
        <br />
        <br />
        <div className="form-group">
          <label for="exampleInputEmail1">
            <b>EMAIL_ID</b>
          </label>
          <input
            type="email"
            onChange={(event) => setEmailId(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="enter your email id"
            value={emailid}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail2">
            <b>FIRST NAME</b>
          </label>
          <input
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            className="form-control"
            id="exampleInputEmail2"
            placeholder="enter your first name"
            value={firstname}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail3">
            <b>LAST NAME</b>
          </label>
          <input
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            className="form-control"
            placeholder="enter your last name"
            id="exampleInputEmail3"
            value={lastname}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputPassword1">
            <b>PASSWORD</b>
          </label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="enter password"
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        <br />
        <br />
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateSignup}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
    </div>
  );
}
