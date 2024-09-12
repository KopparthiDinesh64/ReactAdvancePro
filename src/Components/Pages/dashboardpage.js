import React from 'react';
import DashboardCarousel from '../Dashboard/Carousel/Carousel';
import DashboardCardCarousel from '../DashboardCard/DashboardCard';
import { Card} from '@mui/material';

const DashboardPage = ({ theme }) => {
  return (
    <div style={{ background: theme.background,color: theme.color, marginTop:"70px",padding:"30px" }}> 
    <Card style={{background: theme.background,color: theme.color, marginBottom:"50px",padding:"20px"}}>
    <h1>Explore Alpha</h1>
    <p>Alpha Hub is a versatile and comprehensive web application designed to cater to a wide range of user needs, offering an all-in-one platform for fitness, travel, finance management, and more. Developed with a user-centric approach, Alpha Hub provides a seamless experience by integrating multiple essential services into a single application.</p>
    </Card> 
      <DashboardCarousel style={{marginTop:"50px"}}/>
      <div style={{ marginTop: "74px" }}>
        <DashboardCardCarousel />
      </div>
    </div>
  );
};

export default DashboardPage;
