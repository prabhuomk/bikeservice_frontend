import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export function Reset() {
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { id } = useParams();
  const { token } = useParams();
  const [disable, setDisable] = useState(false);
  function CreateReset(event) {
    setDisable(true);
    event.preventDefault();
    if (password.length >= 5) {
      fetch(
        `https://pk-bike-service.herokuapp.com/user/resetpassword/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password: password })
        }
      )
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setDisable(false);
          setPassword("");
          history.push("/login");
        });
    } else {
      alert("password length should be greater or equal to 5");
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
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            value={password}
            id="exampleInputPassword1"
          />
        </div>
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateReset}
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
