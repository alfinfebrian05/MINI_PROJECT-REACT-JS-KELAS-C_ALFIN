import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  HomePage,
  Register,
  Login,
  AgentDashboard,
  OwnerListPage,
  DijualPage,
  DisewakanPage,
  DetailListing,
  ListingByType
} from '../pages';

function PrivateRouter(props) {
  const userData = JSON.parse(localStorage.getItem('dataUser')) || false;
  const authorizedStatus = userData.loggedIn || false;
  const { children } = props;

  if (!authorizedStatus) {
    alert('Silahkan login / register dahulu!');
    return <Navigate to="/login" replace={true} />;
  }
  alert(`Welcome ${userData.email} !`);
  return children;
}

PrivateRouter.propTypes = { children: PropTypes.element };

function LogOut() {
  const userData = JSON.parse(localStorage.getItem('dataUser'));
  localStorage.setItem(
    'dataUser',
    JSON.stringify({ email: '', password: '', loggedIn: false, userID: 0 })
  );
  alert('Logging out ...');
  return <Navigate to="/" replace={true} />;
}

function RootRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dijual" element={<DijualPage />} />
        <Route exact path="/disewakan" element={<DisewakanPage />} />
        <Route exact path="/:id" element={<DetailListing />} />
        <Route exact path="/dijual/:type" element={<ListingByType />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <AgentDashboard />
            </PrivateRouter>
          }
        />
        <Route
          path="/owner"
          element={
            <PrivateRouter>
              <OwnerListPage />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default RootRouter;
