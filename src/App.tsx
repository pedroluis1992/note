import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Task from './components/containers/task';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Theme from './components/theme/theme';
function App() {
  return (
    <Theme>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/about" element={<Task />} />
            <Route path="/users" element={<h1>Users</h1>} />
            <Route path="/" element={<h1>Home</h1>} />
          </Routes>
        </div>
      </Router>
    </Theme>

  );
}

export default App;
