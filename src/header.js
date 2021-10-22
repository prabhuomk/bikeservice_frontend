import { useHistory } from "react-router-dom";
export function Header({ userToken, setUserToken, adminToken, setAdminToken }) {
  const history = useHistory();
  const Logout = () => {
    localStorage.setItem("usertoken", "");
    setUserToken("");

    alert("logged-out-successfully");
    history.push("/");
  };
  const LogoutAdmin = () => {
    localStorage.setItem("admintoken", "");
    setAdminToken("");

    alert("logged-out-successfully");
    history.push("/");
  };

  return (
    <div>
      <nav
        className="navbar navbar-light bg-success"
        style={{ padding: "10px" }}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          PK's <i className="fa fa-motorcycle fa-2x" aria-hidden="true"></i>{" "}
          SERVICING
          <i className="fa fa-wrench fa-2x" aria-hidden="true"></i>
        </a>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {userToken === "" && adminToken === "" ? (
            <>
              <button
                className="btn btn-light me-md-2"
                onClick={() => history.push("/")}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i> HOME
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/signup")}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i>SIGNUP
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/login")}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i> LOGIN
              </button>
              <button
                className="btn btn-light"
                onClick={() => history.push("/admin")}
              >
                <i className="fa fa-cogs " aria-hidden="true"></i> ADMIN
              </button>
            </>
          ) : (
            <>
              {userToken !== "" ? (
                <>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/dashboard")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i> Dashboard
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/servicelist")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i> SERVICE
                  </button>

                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/comment")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i>
                    TESTIMONIAL
                  </button>
                  <button className="btn btn-light" onClick={Logout}>
                    <i className="fa fa-cogs " aria-hidden="true"></i>user
                    logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/createservice")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i>
                    Create/Edit Service
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/pendingservice")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i>Pending
                    Booked Service
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => history.push("/completedservice")}
                  >
                    <i className="fa fa-cogs " aria-hidden="true"></i>Completed
                    Booked Service
                  </button>
                  <button className="btn btn-light" onClick={LogoutAdmin}>
                    <i className="fa fa-cogs " aria-hidden="true"></i>admin
                    logout
                  </button>
                </>
              )}
            </>
          )}
          ;
        </div>
      </nav>
    </div>
  );
}
