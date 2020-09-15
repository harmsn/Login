import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
function App() {
  return (
    <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>
  );
}

export default App;
