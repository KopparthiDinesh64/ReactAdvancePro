import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import './CardGallery.css';

const initialCardData = [
  { id: '1', title: 'Travel', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190167/TravelCard1_y3doza.jpg', path: '/travel' },
  { id: '2', title: 'Adventure', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190168/AdventureImage_z42eyl.jpg', path: '/adventure' },
  { id: '3', title: 'Personal Development', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190167/personal-development_dg9e5i.jpg', path: '/personal-development' },
  { id: '4', title: 'Career Goals', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190167/Carrer_Goals_tnsmdq.jpg', path: '/career-goals' },
  { id: '5', title: 'Health & Wellness', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190167/health_Wellness_r3blev.jpg', path: '/health-wellness' },
  { id: '6', title: 'Education', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/Education_kfwwyw.jpg', path: '/education' },
  { id: '7', title: 'Body Building', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/bodybulding_ajignu.jpg', path: '/WorkoutCard' },
  { id: '8', title: 'Financial', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/finance_i6z6si.jpg', path: '/financial' },
  { id: '9', title: 'Creative Projects', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/CreateProject_sdngi8.webp', path: '/creative-projects' },
  { id: '10', title: 'Community Service', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/communityservice_szxrkh.avif', path: '/community-service' },
  { id: '11', title: 'Lifestyle', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/lifestyles_hv4s4t.png', path: '/lifestyle' },
  { id: '12', title: 'Experiences', imageUrl: 'https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725190166/Experiances_ruzhuc.webp', path: '/experiences' },
];

function CardGallery(theme) {
  const [cardData, setCardData] = useState(initialCardData);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(cardData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCardData(items);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  const navigateToPage = () => {
    if (selectedCard) {
      navigate(selectedCard.path);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="cards" direction="horizontal">
          {(provided) => (
            <div
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ background: theme.background }}
            >
              {cardData.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      className="card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleCardClick(card)}
                    >
                      <img src={card.imageUrl} alt={card.title} />
                      <div className="card-text">{card.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedCard && (
        <div className="overlay">
          <div className="popup">
            <button className="close-button" onClick={closePopup}>X</button>
            <div className="image-container">
              <img src={selectedCard.imageUrl} alt={selectedCard.title} />
              <div className="overlay-content">
                <h2>{selectedCard.title}</h2>
                <button onClick={navigateToPage}>Go to {selectedCard.title} Page</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardGallery;
