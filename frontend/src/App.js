import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DocumentComponent from "./pages/document"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/page/:pageNumber" component={DocumentComponent} />
        <Route exact path="/" component={DocumentComponent} />
      </Switch>
    </Router>
  ); 
};

export default App;
