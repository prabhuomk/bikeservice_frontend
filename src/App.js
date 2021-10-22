import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { Header } from "./header.js";
import { HomePage } from "./homepage.js";
import { SignUp } from "./signup.js";
import { Login } from "./login.js";
import { ForgetPassword } from "./forgetpassword.js";
import { Reset } from "./resetpassword.js";
import { Activate } from "./accountactivate.js";
import { MyAdmin } from "./admin.js";
import { ListOfService } from "./servicelist.js";
import { BookService } from "./bookservice.js";
import { Testimonial } from "./testimonial.js";
import { NewService } from "./newservice.js";
import { EditService } from "./editservice.js";
import { ListOfPendingBookedService } from "./listofpending";
import { ListOfCompletedBookedService } from "./listofcompleted";
import { DashBoard } from "./Dashboard.js";
import { useState } from "react";
export default function App() {
  const usertkn = !localStorage.getItem("usertoken") && "";
  const [userToken, setUserToken] = useState(usertkn);
  const admintkn = !localStorage.getItem("admintoken") && "";
  const [adminToken, setAdminToken] = useState(admintkn);

  return (
    <div className="App">
      <Header
        userToken={userToken}
        setUserToken={setUserToken}
        adminToken={adminToken}
        setAdminToken={setAdminToken}
      />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login setUserToken={setUserToken} />
        </Route>

        <Route path="/admin">
          <MyAdmin setAdminToken={setAdminToken} />
        </Route>
        <Route path="/servicelist">
          <ListOfService />
        </Route>
        <Route path="/createservice">
          <NewService />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/pendingservice">
          <ListOfPendingBookedService />
        </Route>
        <Route path="/completedservice">
          <ListOfCompletedBookedService />
        </Route>

        <Route path="/comment">
          <Testimonial />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/bookservice/:_id">
          <BookService />
        </Route>
        <Route path="/editservice/:_id">
          <EditService />
        </Route>

        <Route path="/account-activation/:email_id/:token">
          <Activate />
        </Route>
        <Route path="/password-reset/:id/:token">
          <Reset />
        </Route>
      </Switch>
    </div>
  );
}
