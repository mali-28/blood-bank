import React from "react";
import { BrowserRouter, Route ,Redirect, Switch} from "react-router-dom";
import Home from "./routes/Home";
import TopBar from "./components/TopBar";
import UserSignUp from './routes/UserSignUp';
import UserLogin from './routes/UserLogin';
import Context from './context/context'
import "./firebase";
import Donors from "./routes/Donors";
import Map from "./routes/Map";
import Donor from "./routes/Donor";
const App = () =>{
  return (
    <BrowserRouter>
    <Context>
        <TopBar/>
        <Switch>
        <Route exact path="/" component={Home} />
      <Route exact path="/login" component={UserLogin}/>
      <Route exact path="/signup" component={UserSignUp}/>
      <Route exact path="/donors" component={Donors}/>
      <Route exact path="/map" component={Map}/>
      <Route exact path="/donor/:id" component={Donor}/>
      <Redirect  to="/"/>
      </Switch>
      </Context>

  </BrowserRouter>
  );
}

export default App;


  

  
