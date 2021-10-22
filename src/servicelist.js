import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function ListOfService() {
  const [details, setDetails] = useState([]);
  const history = useHistory();
  function GetAll() {
    fetch("https://pk-bike-service.herokuapp.com/user/listofservice", {
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
  }, []);

  return (
    <div className="service">
      {details.map((data) => (
        <div
          className="card"
          style={{ width: "18rem", backgroundColor: "sandybrown" }}
        >
          <img src={data.img_src} class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{data.service_name}</h5>
            <p className="card-text">{data.service_price}</p>
            <button
              className="btn btn-dark me-md-2"
              onClick={() => history.push(`/bookservice/${data._id}`)}
            >
              <i className="fa fa-cogs " aria-hidden="true"></i> BOOK
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
