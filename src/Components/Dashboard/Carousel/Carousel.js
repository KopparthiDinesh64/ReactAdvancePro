import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './Carousel.css';

const cardData = [
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724842188/budget_spliting_ictcyo.jpg",
      text: "Budget Splitting",
      link: "/SplittingPage"
  },
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724842285/bucketList_to9kzg.jpg",
      text: "Bucket List",
      link: "/CardGalleryPage"
  },
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724842592/travellingAgency_m2a0wh.jpg",
      text: "Traveling Agency",
      link: "/travel-agency"
  },
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1692609174/gallery_kgswnv.jpg",
      text: "Gallery",
      link: "/ImageEditor"
  },
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724842883/languageguide_fhszx1.jpg",
      text: "Language Guide",
      link: "/EmailForm"
  },
  {
      src: "https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1724843009/travellingDate_pi4ha6.jpg",
      text: "Traveling Date",
      link: "/travel-date"
  }
];

const DashboardCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : cardData.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev < cardData.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="carousel-container">
      <Carousel
        selectedItem={selectedIndex}
        onChange={index => setSelectedIndex(index)}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows
        autoPlay
        centerMode={true}
        centerSlidePercentage={20}
        dynamicHeight={false}
        emulateTouch
      >
        {cardData.map((item, index) => (
          <Card key={index} className="carousel-card">
            <CardMedia
              component="img"
              image={item.src}
              alt={`Slide ${index}`}
              className="card-media"
            />
            <CardContent className="card-content-overlay">
              <NavLink to={item.link} className="overlay-link" style={{ color: "white" }}>
                <Typography variant="h7" component="div" className="overlay-text">
                  {item.text}
                </Typography>
              </NavLink>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <button type="button" onClick={handlePrev} className="control-arrow control-prev" style={{backgroundColor:"#fafafa", borderStyle:"none"}}>
        &#10094; {/* Left arrow */}
      </button>
      <button type="button" onClick={handleNext} className="control-arrow control-next" style={{backgroundColor:"#fafafa", borderStyle:"none"}}>
        &#10095; {/* Right arrow */}
      </button>

    </div>
  );
}

export default DashboardCarousel;
