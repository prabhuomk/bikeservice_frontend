import { useEffect, useState } from "react";
export function Testimonial() {
  const [details, setDetails] = useState([]);
  const [username, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [change, setChange] = useState(false);
  const [disable, setDisable] = useState(false);

  function PostComment(event) {
    setDisable(true);
    event.preventDefault();
    if (username && comment) {
      fetch("https://pk-bike-service.herokuapp.com/user/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("usertoken")
        },
        body: JSON.stringify({ username: username, comments: comment })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setUserName("");
          setComment("");
          setChange(true);
          setDisable(false);
        });
    } else {
      alert("enter all field");
      setDisable(false);
    }
  }

  function GetAll() {
    fetch("https://pk-bike-service.herokuapp.com/user/listcomments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }
  useEffect(() => {
    GetAll();
  }, [change]);

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
      <div>
        <form className="Myform">
          <div className="form-group">
            <label for="exampleInputEmail1">Customer Name</label>
            <input
              type="text"
              onChange={(event) => setUserName(event.target.value)}
              className="form-control"
              value={username}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">
              Comment about our service
            </label>
            <textarea
              className="form-control"
              onChange={(event) => setComment(event.target.value)}
              value={comment}
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          {disable === false ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={PostComment}
            >
              Submit
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </form>
      </div>

      <div className="service">
        {details.map((data) => (
          <div className="card">
            <div className="card-header">{data.username}</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{data.comments}</p>
                <footer className="blockquote-footer">
                  {" "}
                  <i className="fa fa-wrench fa-2x" aria-hidden="true"></i>
                  <cite title="Source Title">PK's Bike service</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
