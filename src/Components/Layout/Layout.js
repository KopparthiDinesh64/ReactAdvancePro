import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SiginUp/Siginup';
import EmailForm from '../EmailJSComponent/Email';
import TableComponent from '../ExportTable/ExcelTable';
import Navbar from '../Dashboard/Navbar/Navbar';
import UserList from '../SplitMoney/SplitMoney';
import DashboardCarousel from '../Dashboard/Carousel/Carousel';
import DashboardPage from '../Pages/dashboardpage';
import DashboardCardCarousel from '../DashboardCard/DashboardCard';
import SplittingPage from '../Pages/SplitingbudgetPage';
import CardGallery from '../CardGallery/CardGallery';
import CardGalleryPage from '../Pages/cardGalleryPage';
import WorkoutAnimation from '../WorkoutApp/WorkoutAnimat';
import WorkoutCard from '../WorkoutCards/WorkoutCards';
import ImageEditor from '../EditingComponent/EditingComponent';
import "./Layout.css"
import { blue } from '@mui/material/colors';

const themes = {
  light: {
    background: 'white',
    color: '#000',
  },
  blue: {
    background: '#5b89f5',
    color: '#fff',
  },
  dark: {
    background: '#424242',
    color: '#fff',
  },
};


const Layout = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(themes.light);

  const excludeNavbarPaths = ['/', '/signup'];

  return (
    <>
      {!excludeNavbarPaths.includes(location.pathname) && (
        <>
          <Navbar theme={theme} setTheme={setTheme}/>
         
        </>
      )}
      
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Dashboard" element={<DashboardCarousel theme={theme} />} />
      <Route path="/DashboardCard" element={<DashboardCardCarousel theme={theme} />} />
      <Route path="/EmailForm" element={<EmailForm />} />
      <Route path="/TableForm" element={<TableComponent />} />
      <Route path="/UserList" element={<UserList theme={theme} />} />
      <Route path="/dashboardPage" element={<DashboardPage theme={theme} />} /> {/* Correctly passing theme */}
      <Route path="/SplittingPage" element={<SplittingPage theme={theme}/>} />
      <Route path="/CardGallery" element={<CardGallery theme={theme}/>}/>
      <Route path="/CardGalleryPage" element={<CardGalleryPage/>}/>
      <Route path="/WorkoutAnimation" element={<WorkoutAnimation/>}/>
      <Route path="/WorkoutCard" element={<WorkoutCard/>}/>
      <Route path="/ImageEditor" element={<ImageEditor/>}/>
</Routes>

    </>
  );
};

export default Layout;
