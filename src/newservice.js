import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export function NewService() {
  const [details, setDetails] = useState([]);
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState(false);
  const [verify, setVerify] = useState(false);
  const [disable, setDisable] = useState(false);

  const history = useHistory();

  function CreateService(event) {
    setDisable(true);
    event.preventDefault();
    if (src && name && price) {
      fetch("https://pk-bike-service.herokuapp.com/admin/addservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("admintoken")
        },
        body: JSON.stringify({
          img_src: src,
          service_name: name,
          service_price: price
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setSrc("");
          setName("");
          setPrice("");
          setChange(true);
          setDisable(false);
        });
    } else {
      alert("fill properly - price should be integer and src shold be a url");
      setDisable(false);
    }
  }
  function GetAll() {
    fetch("https://pk-bike-service.herokuapp.com/user/listofservice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          localStorage.getItem("usertoken") ||
          localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }
  useEffect(() => {
    GetAll();
  }, [change, verify]);

  function DeleteService(_id) {
    fetch(`https://pk-bike-service.herokuapp.com/admin/editservice/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("admintoken")
      }
    })
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setVerify(true);
      });
  }

  return (
    <div>
      <br />
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">
            <b>Image Url</b>
          </label>
          <input
            type="text"
            onChange={(event) => setSrc(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="enter the image url"
            value={src}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail2">
            <b>Service Name</b>
          </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            className="form-control"
            id="exampleInputEmail2"
            placeholder="enter service name"
            value={name}
            aria-describedby="emailHelp"
          />
        </div>
        <br />
        <div className="form-group">
          <label for="exampleInputEmail3">
            <b>Service Price</b>
          </label>
          <input
            type="number"
            onChange={(event) => setPrice(event.target.value)}
            className="form-control"
            id="exampleInputEmail3"
            placeholder="enter the price amount(integer)"
            value={price}
            aria-describedby="emailHelp"
          />
        </div>

        <br />
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateService}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
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
                onClick={() => history.push(`/editservice/${data._id}`)}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i> EDIT
              </button>
              <button
                className="btn btn-dark me-md-2"
                onClick={() => DeleteService(data._id)}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i>DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
