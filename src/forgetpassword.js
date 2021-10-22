import { useState } from "react";

export function ForgetPassword() {
  const [emailid, setEmailId] = useState("");
  const [disable, setDisable] = useState(false);
  function GotForget(event) {
    event.preventDefault();
    setDisable(true);
    if (emailid) {
      fetch("https://pk-bike-service.herokuapp.com/user/myforgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email_id: emailid })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setEmailId("");
          setDisable(false);
        });
    } else {
      alert("enter all field");
      setDisable(false);
    }
  }

  return (
    <div>
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
        {disable === false ? (
          <button type="button" className="btn btn-primary" onClick={GotForget}>
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
    </div>
  );
}
