import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Task from './components/containers/task';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Theme from './components/theme/theme';
import { MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
function App() {
  const [showBasic, setShowBasic] = useState(true);

  return (
    <Theme>
      <Router>
        <MDBNavbar expand='lg' light bgColor='white'>
          <MDBContainer fluid>
            <MDBNavbarToggler
              onClick={() => setShowBasic(!showBasic)}
              aria-controls='navbarExample01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <MDBIcon fas icon='bars' />
            </MDBNavbarToggler>
            <MDBCollapse show={true}>
              <MDBNavbarNav left className='mb-2 mb-lg-0'>
                <MDBNavbarItem active>
                  <MDBNavbarLink aria-current='page' href='#'>
                    <Link to="/">Home</Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarLink aria-current='page' href='#'>
                  <Link to="/about">Notas</Link>
                </MDBNavbarLink>
                <MDBNavbarLink aria-current='page' href='#'>
                  <Link to="/users">Users</Link>
                </MDBNavbarLink>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        <Routes>
          <Route path="/about" element={<Task />} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </Theme>

  );
}

export default App;
