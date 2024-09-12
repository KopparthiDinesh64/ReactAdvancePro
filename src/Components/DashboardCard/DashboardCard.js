import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import './DashboardCard.css'
import Sunshine from '../Background/Sunrise.gif';
import Beachboat from '../Background/beachboatgif.gif'
import { Button} from '@mui/material';

const CarouselContainer = styled.div`
  width: 100%;
  height: 150%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
`;

const Slide = styled.div`
  position: relative;
  background-color: #f5f5f5;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding: 10px;
`;

const SlideImage = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const SlideContent = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  z-index: 2;
`;

const SlideTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const SlideDescription = styled.p`
  font-size: 16px;
`;

const ExploreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const DestinationCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  text-align: center;
`;

const DestinationImage = styled.img`
  width: 200px;
  height: 220px;
  object-fit: cover;
`;

const DestinationContent = styled.div`
  padding: 10px;
  text-align: center;
`;

const DashboardCardCarousel = (theme) => {
  return (
    <CarouselContainer  style={{ background: theme.background}}>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop style={{ background: theme.background}}>
        <Slide>
          <SlideImage style={{backgroundImage: `url(${Sunshine})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height:"200%"}} />
          <SlideContent>
            <SlideTitle>Just Living is not enough...</SlideTitle>
            <SlideDescription>...one must have sunshine.</SlideDescription>
            <ExploreButton>Explore</ExploreButton>
          </SlideContent>
        </Slide>
        <Slide>
          <SlideImage style={{backgroundImage: `url(${Beachboat})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height:"200%"}}  />
          <SlideContent>
            <SlideTitle>Explore Destination</SlideTitle>
            <SlideDescription>Discover beautiful places.</SlideDescription>
            <ExploreButton>Explore</ExploreButton>
          </SlideContent>
        </Slide>
        <Slide>
          <SlideImage src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724936538/advtra_ynihsn.gif" alt="Slide 3" />
          <SlideContent>
            <SlideTitle>Adventure Awaits</SlideTitle>
            <SlideDescription>Discover amazing experiences.</SlideDescription>
            <ExploreButton>Explore</ExploreButton>
          </SlideContent>
        </Slide>
      </Carousel>

      <div style={{ display: 'flex',flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px' }}>
        <DestinationCard style={{ background: theme.background}}>
          <DestinationImage src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724937829/buna1_x5dw6w.jpg" alt="Destination 1" style={{backgroundSize:"cover", borderRadius:"20px"}} />
          <DestinationContent>
            <h3>Bunaken</h3>
            <Button style={{backgroundColor:"#090b5e",color:theme.color}}>Plan Now</Button>
          </DestinationContent>
        </DestinationCard>
        <DestinationCard style={{ background: theme.background}}>
          <DestinationImage src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724937828/bali_island_touz6v.jpg" alt="Destination 2"  style={{backgroundSize:"cover", borderRadius:"20px"}}/>
          <DestinationContent>
            <h3>Bali Island</h3>
            <Button style={{backgroundColor:"#090b5e",color:theme.color}}>Plan Now</Button>
          </DestinationContent>
        </DestinationCard>
        <DestinationCard style={{ background: theme.background}}>
          <DestinationImage src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724937809/manado_rih8fg.jpg" alt="Destination 3"  style={{backgroundSize:"cover", borderRadius:"20px"}}/>
          <DestinationContent>
            <h3>Manado</h3>
            <Button style={{backgroundColor:"#090b5e",color:theme.color}}>Plan Now</Button>
          </DestinationContent>
        </DestinationCard>
        <DestinationCard style={{ background: theme.background}}>
          <DestinationImage src="https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724935171/travelslide1_uqcsq2.jpg" alt="Destination 3"  style={{backgroundSize:"cover", borderRadius:"20px"}}/>
          <DestinationContent>
            <h3>Kerala</h3>
            <Button style={{backgroundColor:"#090b5e",color:theme.color}}>Plan Now</Button>
          </DestinationContent>
        </DestinationCard>
      </div>
    </CarouselContainer>
  );
};

export default DashboardCardCarousel;
