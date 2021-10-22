import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { RazorPay } from "./RazorPay";

export function BookService() {
  let { _id } = useParams();
  const [username, setUserName] = useState("");
  const [emailid, setEmailId] = useState("");
  const [pay, setPay] = useState("");
  const [razorid, setRazorId] = useState("");

  const history = useHistory();

  const [rec, SetRec] = useState({});

  function BookMyService(name, price, e) {
    e.preventDefault();
    if (
      !emailid.includes("@") ||
      !emailid.includes(".") ||
      emailid.length < 8
    ) {
      alert("Email is not valid");
    } else if (emailid && username && pay === "Cash on delivery") {
      fetch("https://pk-bike-service.herokuapp.com/user/myservicebooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("usertoken")
        },
        body: JSON.stringify({
          email_id: emailid,
          username: username,
          service_name: name,
          service_price: price,
          Mode_Payment: pay,
          Payment_id: "no id for cash on delivery"
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);

          setEmailId("");
          setUserName("");
          setPay("");
          history.push("../servicelist");
        });
    } else if (
      emailid &&
      username &&
      pay === "online payment" &&
      razorid !== ""
    ) {
      fetch("https://pk-bike-service.herokuapp.com/user/myservicebooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("usertoken")
        },
        body: JSON.stringify({
          email_id: emailid,
          username: username,
          service_name: name,
          service_price: price,
          Mode_Payment: pay,
          Payment_id: razorid
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);

          setEmailId("");
          setUserName("");
          setPay("");
          setRazorId("");
          history.push("../servicelist");
        });
    } else {
      alert("Online payment not done ");
    }
  }

  function GetServiceData(_id) {
    fetch(`https://pk-bike-service.herokuapp.com/user/servicelist/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((data) => SetRec(data));
  }

  useEffect(() => {
    GetServiceData(_id);
  }, []);
  return (
    <div>
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
        {rec._id ? (
          <div>
            <div>
              <form className="Myform">
                <div className="form-group">
                  <label for="exampleInputEmail1">Email_id</label>
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
                  <label for="exampleInputEmail2">Customer Name</label>
                  <input
                    type="text"
                    onChange={(event) => setUserName(event.target.value)}
                    className="form-control"
                    value={username}
                    id="exampleInputEmail2"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail3">SERVICE NAME</label>
                  <input
                    type="text"
                    defaultValue={rec.service_name}
                    className="form-control"
                    id="exampleInputEmail3"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">SERVICE PRICE</label>
                  <input
                    type="text"
                    defaultValue={rec.service_price}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">
                    Select Payment Mode
                  </label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={(e) => setPay(e.target.value)}
                    value={pay}
                  >
                    <option>----------------------------- \/</option>
                    <option>Cash on delivery</option>
                    <option>online payment</option>
                  </select>
                </div>

                {pay === "online payment" ? (
                  <div>
                    <RazorPay
                      name={rec.service_name}
                      price={rec.service_price}
                      setRazorId={setRazorId}
                    />
                  </div>
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(e) =>
                    BookMyService(rec.service_name, rec.service_price, e)
                  }
                >
                  BOOK
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
