import { useEffect, useState } from "react";

export function ListOfPendingBookedService() {
  const [details, setDetails] = useState([]);
  const [change, setChange] = useState(false);

  function ServiceDone(_id) {
    fetch(`https://pk-bike-service.herokuapp.com/admin/serviceDone/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
      },
      body: JSON.stringify()
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setChange(true);
      });
  }

  function GetAll() {
    fetch("https://pk-bike-service.herokuapp.com/admin/allpendingservice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
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
    <div className="service">
      {details.map((details) => (
        <div class="card border-success mb-3" style={{ maxWidth: "18rem" }}>
          <div class="card-header">email_id:{details.email_id}</div>
          <div class="card-body text-success">
            <h5 class="card-title">Customer Name:{details.username}</h5>
            <p class="card-text">
              <div>Service Name:{details.service_name}</div>
              <div>Service Price RS:{details.service_price}</div>
              <div>Service Status:{details.service_status}</div>
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => ServiceDone(details._id)}
            >
              Click If Service Done
            </button>
            <p class="card-text">
              <small class="text-muted">
                *once clicked mail will be send to customer stating service done
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
