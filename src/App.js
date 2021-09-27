import React from "react";
import { BrowserRouter, Route ,Redirect, Switch} from "react-router-dom";
import Home from "./routes/Home";
import TopBar from "./components/TopBar";
import UserSignUp from './routes/UserSignUp';
import UserLogin from './routes/UserLogin';
import Context from './context/context'
import "./firebase";
import Donors from "./routes/Donors";
import Donor from "./routes/Donor";
import MapDirection from "./components/MapDirection";
const App = () =>{
  return (
    <BrowserRouter>
    <Context>
        <TopBar/>
        <Switch className ="section">
        <Route exact path="/" component={Home} />
      <Route exact path="/login" component={UserLogin}/>
      <Route exact path="/signup" component={UserSignUp}/>
      <Route exact path="/donors" component={Donors}/>
      <Route exact path="/map" component={MapDirection}/>
      <Route exact path="/donor/:id" component={Donor}/>
      <Redirect  to="/"/>
      </Switch>
      </Context>

  </BrowserRouter>
  );
}

export default App;


  

  
