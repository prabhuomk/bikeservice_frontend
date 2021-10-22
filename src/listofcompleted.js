import { useEffect, useState } from "react";

export function ListOfCompletedBookedService() {
  const [details, setDetails] = useState([]);

  function GetAll() {
    fetch("https://pk-bike-service.herokuapp.com/admin/allcompletedservice", {
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
  }, []);

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
          </div>
        </div>
      ))}
    </div>
  );
}
