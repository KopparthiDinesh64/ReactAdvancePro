import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, IconButton, Typography, TextField, Button, Menu, MenuItem, Avatar } from "@mui/material";
import { FaUndo, FaRedo, FaTrashAlt, FaCrop, FaFont, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Dropzone from "react-dropzone";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { Rnd } from "react-rnd";

const ImageEditor = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [textSizes, setTextSizes] = useState([]);
  const [textPositions, setTextPositions] = useState([]);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const [emojiPositions, setEmojiPositions] = useState([]);
  const [cropper, setCropper] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [arrows, setArrows] = useState([]); // State to store arrows
  const [arrowPositions, setArrowPositions] = useState([]); // Position of arrows
  const [selectedArrowIndex, setSelectedArrowIndex] = useState(null); // For selecting an arrow
  const open = Boolean(anchorEl);
  const canvasRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [selectedEmojiIndex, setSelectedEmojiIndex] = useState(null);

  useEffect(() => {
    if (selectedImageIndex !== null && images[selectedImageIndex]) {
      const img = new Image();
      img.src = images[selectedImageIndex];
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "#f00";
        ctx.fillRect(10, 10, 150, 100);
        ctx.drawImage(img, 0, 0);
        drawTextOnCanvas();
      };
    }
  }, [selectedImageIndex, images, captions, textSizes, textPositions, emojis, canvasRef.current?.width, canvasRef.current?.height]);

  const drawTextOnCanvas = () => {
    if (selectedImageIndex !== null && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.src = images[selectedImageIndex];
      img.onload = () => {
        const canvas = canvasRef.current;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        if (captions[selectedImageIndex]) {
          ctx.font = `${textSizes[selectedImageIndex]}px Arial`;
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.fillText(
            captions[selectedImageIndex],
            textPositions[selectedImageIndex]?.x || 100,
            textPositions[selectedImageIndex]?.y || 100
          );
        }
      };
    }
  };

  const handleImageUpload = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
    setCaptions([...captions, ...new Array(newImages.length).fill("")]);
    setTextSizes([...textSizes, ...new Array(newImages.length).fill(30)]);
    setTextPositions([...textPositions, ...new Array(newImages.length).fill({ x: 100, y: 100 })]);
    setEmojis([...emojis, []]);
    setEmojiPositions([...emojiPositions, []]);

  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    setShowTextInput(false);
  };


  const handleDeleteImage = () => {
    if (selectedImageIndex !== null) {
      const newImages = images.filter((_, index) => index !== selectedImageIndex);
      const newCaptions = captions.filter((_, index) => index !== selectedImageIndex);
      const newTextSizes = textSizes.filter((_, index) => index !== selectedImageIndex);
      const newTextPositions = textPositions.filter((_, index) => index !== selectedImageIndex);
      const newEmojis = emojis.filter((_, index) => index !== selectedImageIndex);
      const newEmojiPositions = emojiPositions.filter((_, index) => index !== selectedImageIndex);
      setImages(newImages);
      setCaptions(newCaptions);
      setTextSizes(newTextSizes);
      setTextPositions(newTextPositions);
      setEmojis(newEmojis);
      setEmojiPositions(newEmojiPositions);
      setSelectedImageIndex(null);
    }
  };

  const handleUndo = () => {
    // Implement undo functionality
  };

  const handleRedo = () => {
    // Implement redo functionality
  };

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emoji) => {
    if (selectedImageIndex !== null) {
      const newEmoji = { char: emoji.emoji, x: cursorPos.x, y: cursorPos.y, size: 50, rotation: 0 };
      setEmojis((prev) => {
        const updatedEmojis = [...prev];
        updatedEmojis[selectedImageIndex] = [...(updatedEmojis[selectedImageIndex] || []), newEmoji];
        return updatedEmojis;
      });
      // Initialize emoji positions as well
      setEmojiPositions((prev) => {
        const updatedPositions = [...prev];
        updatedPositions[selectedImageIndex] = [
          ...(updatedPositions[selectedImageIndex] || []),
          { x: cursorPos.x, y: cursorPos.y },
        ];
        return updatedPositions;
      });
    }
  };

  const addArrow = (arrow) => {
    const newArrow = { ...arrow, rotation: 0 }; // Ensure rotation is initialized
    setArrows([...arrows, newArrow]);
    setArrowPositions([...arrowPositions, { x: 0, y: 0 }]); // Initialize positions
  };
  

  const handleTextInputToggle = () => {
    setShowTextInput((prev) => !prev);
  };

  const handleTextChange = (e) => {
    const updatedCaptions = [...captions];
    updatedCaptions[selectedImageIndex] = e.target.value;
    setCaptions(updatedCaptions);
  };



  const handleTextDrag = (e, data) => {
    const updatedTextPositions = [...textPositions];
    updatedTextPositions[selectedImageIndex] = { x: data.x, y: data.y };
    setTextPositions(updatedTextPositions);
    drawTextOnCanvas();
  };

  const handleEmojiDrag = (index, data) => {
    const updatedEmojiPositions = [...emojiPositions];
    updatedEmojiPositions[selectedImageIndex][index] = { x: data.x, y: data.y };
    setEmojiPositions(updatedEmojiPositions);
  };

  const handleSave = () => {
    if (selectedImageIndex !== null && canvasRef.current) {
      const canvasContainer = canvasRef.current.parentNode; // Capture the parent container, which includes the emojis and arrows
  
      html2canvas(canvasContainer, { useCORS: true }).then((canvas) => {
        const dataURL = canvas.toDataURL("image/png");
  
        const updatedImages = [...images];
        updatedImages[selectedImageIndex] = dataURL;
        setImages(updatedImages);
  
        // Clear the emojis and arrows for the current image
        const updatedEmojis = [...emojis];
        updatedEmojis[selectedImageIndex] = [];
        setEmojis(updatedEmojis);
  
        const updatedEmojiPositions = [...emojiPositions];
        updatedEmojiPositions[selectedImageIndex] = [];
        setEmojiPositions(updatedEmojiPositions);
  
        const updatedArrows = [...arrows];
        updatedArrows[selectedImageIndex] = [];
        setArrows(updatedArrows);
  
        const updatedArrowPositions = [...arrowPositions];
        updatedArrowPositions[selectedImageIndex] = [];
        setArrowPositions(updatedArrowPositions);
  
        // Trigger the image download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `edited_image_${selectedImageIndex}.png`;
        link.click();
      });
    }
  };
  
  

  const handleMouseMove = (e) => {
    if (showEmojiPicker && selectedImageIndex !== null) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursorPos({ x, y });
    }
  };
  const handleDoubleClick = (index) => {
    // Toggle selection: If the clicked emoji is already selected, deselect it
    setSelectedEmojiIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleArrowDoubleClick = (index) => {
    setSelectedArrowIndex(selectedArrowIndex === index ? null : index);
  };
  
  const handleDeleteEmoji = (emojiIndex) => {
    if (selectedImageIndex !== null) {
      const updatedEmojis = [...emojis];
      updatedEmojis[selectedImageIndex] = updatedEmojis[selectedImageIndex].filter((_, i) => i !== emojiIndex);
      setEmojis(updatedEmojis);

      const updatedEmojiPositions = [...emojiPositions];
      updatedEmojiPositions[selectedImageIndex] = updatedEmojiPositions[selectedImageIndex].filter((_, i) => i !== emojiIndex);
      setEmojiPositions(updatedEmojiPositions);

      // Clear selection after deleting
      setSelectedEmojiIndex(null);
    }
  };


  const handleResize = (e, direction, ref, delta, position) => {
    const newSize = {
      width: ref.offsetWidth,
      height: ref.offsetHeight
    };
    const updatedEmojis = [...emojis];
    updatedEmojis[selectedImageIndex][selectedEmojiIndex] = {
      ...updatedEmojis[selectedImageIndex][selectedEmojiIndex],
      size: newSize.width
    };
    setEmojis(updatedEmojis);
  };


  const handleRotateLeft = (index) => {
    setEmojis(prevEmojis => {
      const updatedEmojis = [...prevEmojis];
      updatedEmojis[selectedImageIndex][index].rotation = (updatedEmojis[selectedImageIndex][index].rotation || 0) - 15;
      return updatedEmojis;
    });
  };
  
  const handleRotateRight = (index) => {
    setEmojis(prevEmojis => {
      const updatedEmojis = [...prevEmojis];
      updatedEmojis[selectedImageIndex][index].rotation = (updatedEmojis[selectedImageIndex][index].rotation || 0) + 15;
      return updatedEmojis;
    });
  };
  const handleCropClick = () => {
    setIsCropping(true);
  };

  const handleCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const croppedImageUrl = URL.createObjectURL(blob);
        const updatedImages = [...images];
        updatedImages[selectedImageIndex] = croppedImageUrl;
        setImages(updatedImages);
        setIsCropping(false);
      });
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    handleClose();
    
    // Add the arrow with the selected option
    handleAddArrow('https://res.cloudinary.com/dineshbruceleedineshk/image/upload/v1725958225/Pngtree_vector_back_icon_4271690_rdzpu1.png', option);
  };

  const handleAddArrow = (src, label) => {
    if (selectedImageIndex !== null) {
      const newArrow = {
        src, // Arrow image URL
        label, // Name of the arrow indicator
        x: 100, // Initial position
        y: 100,
        size: 50, // Initial size
        rotation: 0 // Initial rotation
      };

      // Update the arrow states
      setArrows((prev) => {
        const updatedArrows = [...prev];
        updatedArrows[selectedImageIndex] = [...(updatedArrows[selectedImageIndex] || []), newArrow];
        return updatedArrows;
      });

      setArrowPositions((prev) => {
        const updatedPositions = [...prev];
        updatedPositions[selectedImageIndex] = [
          ...(updatedPositions[selectedImageIndex] || []),
          { x: 100, y: 100 }
        ];
        return updatedPositions;
      });
    }
  };

  // Handle drag for arrows
  const handleArrowDrag = (index, data) => {
    const updatedPositions = [...arrowPositions];
    updatedPositions[selectedImageIndex][index] = { x: data.x, y: data.y };
    setArrowPositions(updatedPositions);
  };

  // Handle resize for arrows
  const handleArrowResize = (index, direction, ref, delta, position) => {
    const updatedArrows = [...arrows];
    const arrow = updatedArrows[selectedImageIndex][index];
    
    // Determine the new width and height based on the resizing direction
    let newWidth = arrow.size.width;
    let newHeight = arrow.size.height;
  
    if (direction === 'top' || direction === 'bottom') {
      newHeight += delta.height;
    }
    if (direction === 'left' || direction === 'right') {
      newWidth += delta.width;
    }
  
    // Update the arrow's size
    updatedArrows[selectedImageIndex][index] = {
      ...arrow,
      size: { width: newWidth, height: newHeight }
    };
    
    setArrows(updatedArrows);
  };
  

  const handleArrowRotateLeft = (index) => {
    if (arrows[selectedImageIndex] && arrows[selectedImageIndex][index]) {
      const updatedArrows = [...arrows];
      updatedArrows[selectedImageIndex][index].rotation -= 20; // Rotate left
      setArrows(updatedArrows);
    }
  };
  
  const handleArrowRotateRight = (index) => {
    if (arrows[selectedImageIndex] && arrows[selectedImageIndex][index]) {
      const updatedArrows = [...arrows];
      updatedArrows[selectedImageIndex][index].rotation += 20; // Rotate right
      setArrows(updatedArrows);
    }
  };
  
  
  const handleDeleteArrow = (arrowIndex) => {
    if (selectedImageIndex !== null) {
      setArrows((prevArrows) => {
        const updatedArrows = [...prevArrows];
        updatedArrows[selectedImageIndex] = updatedArrows[selectedImageIndex].filter(
          (_, index) => index !== arrowIndex // Remove the specific arrow
        );
        return updatedArrows;
      });
  
      setArrowPositions((prevPositions) => {
        const updatedPositions = [...prevPositions];
        updatedPositions[selectedImageIndex] = updatedPositions[selectedImageIndex].filter(
          (_, index) => index !== arrowIndex // Remove the specific arrow's position
        );
        return updatedPositions;
      });
    }
  };
  
  

  return (
    <Box sx={{ p: 2, backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 3, marginTop: "150px" }}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <IconButton onClick={handleUndo} disabled={false}>
          <FaUndo />
        </IconButton>
        <IconButton onClick={handleRedo} disabled={false}>
          <FaRedo />
        </IconButton>
        <IconButton onClick={handleDeleteImage} disabled={selectedImageIndex === null}>
          <FaTrashAlt />
        </IconButton>
        <IconButton onClick={isCropping ? handleCrop : handleCropClick}>
          <FaCrop />
        </IconButton>

        <IconButton onClick={handleEmojiPickerToggle}>
          <FaSmile />
        </IconButton>
        <IconButton onClick={handleTextInputToggle}>
          <FaFont />
          </IconButton>
          <IconButton>
          <div>
      <IconButton onClick={handleClick}>
        <Button>Add Arrow</Button>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelectOption('Dent')}>Dent</MenuItem>
        <MenuItem onClick={() => handleSelectOption('Fade')}>Fade</MenuItem>
        <MenuItem onClick={() => handleSelectOption('Scratch')}>Scratch</MenuItem>
        <MenuItem onClick={() => handleSelectOption('Damage')}>Damage</MenuItem>
      </Menu>
    </div>
      </IconButton>

      {/* Render arrows using Rnd for drag, resize, and rotate */}
     
        <Button onClick={handleSave}>Save</Button>
      </Box>
      <hr/>

      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "55vh",
        }}
        onMouseMove={handleMouseMove}
      >
        {selectedImageIndex !== null && (
          <>
          
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
            />

{arrows[selectedImageIndex]?.map((arrow, index) => (
  <Rnd
    key={index}
    size={{ width: arrow.size, height: arrow.size }}
    position={arrowPositions[selectedImageIndex][index] || { x: 0, y: 0 }}
    onResizeStop={(e, direction, ref, delta, position) =>
      handleArrowResize(index, direction, ref, delta, position)
    }
    onDragStop={(e, data) => handleArrowDrag(index, data)}
    style={{
      position: "absolute",
      border: selectedArrowIndex === index ? "2px dashed #000" : "none",
      zIndex: 10, // Ensure it's above other elements
    }}
    enableResizing={{
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true,
    }}
  >
    <Box
      sx={{
        position: "relative",
        cursor: "move",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={arrow.src}
        alt={arrow.label}
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${arrow.rotation}deg)`,
        }}
        draggable={false} // Disable native browser dragging
        onDoubleClick={() => handleArrowDoubleClick(index)}
      />
      {/* Display the label below the arrow */}
      <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "65%", // Adjust to position the text below the image
              textAlign: "center",
              color: "#000",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: "4px 6px",
              fontSize: "12px",
              borderRadius: "4px",
            }}
            
          >
            {arrow.label}
          </Typography>
      {selectedArrowIndex === index && (
        <>
         

          <IconButton
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-20px",
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleDeleteArrow(index)}
          >
            X
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "-30%",
              left: "90%",
              transform: "translate(50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "black",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleArrowRotateLeft(index)}
          >
            <FaUndo />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              top: "-30%",
              right: "90%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "black",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleArrowRotateRight(index)}
          >
            <FaRedo />
          </IconButton>
        </>
      )}
    </Box>
  </Rnd>
))}




           {emojis[selectedImageIndex]?.map((emoji, index) => (
  <Rnd
    key={index}
    size={{ width: emoji.size, height: emoji.size }}
    position={emojiPositions[selectedImageIndex][index] || { x: 0, y: 0 }}
    onResizeStop={(e, direction, ref, delta, position) => handleResize(e, direction, ref, delta, position)}
    onDragStop={(e, data) => handleEmojiDrag(index, data)}
    style={{
      transform: `rotate(${emoji.rotation || 0}deg)`, // Rotate emoji
      position: "absolute",
      border: selectedEmojiIndex === index ? "2px dashed #000" : "none",
      borderRadius: "10px",
    }}
  >
    <Box
      sx={{
        position: "relative",
        cursor: "move",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: `${emoji.size}px`,
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          transform: `rotate(${emoji.rotation || 0}deg)`,  
        }}
        onDoubleClick={() => handleDoubleClick(index)}
      >
        {emoji.char}
      </Typography>

      {selectedEmojiIndex === index && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-20px",
              backgroundColor: "red",
              color: "white",
              fontSize: "10px",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleDeleteEmoji(index)}
          >
            X
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "-50%",
              left: "90%",
              transform: "translate(50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "black",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleRotateLeft(index)}
          >
            <FaUndo />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "-50%",
              right: "90%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              color: "black",
              fontSize: "16px",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              p: 0,
            }}
            onClick={() => handleRotateRight(index)}
          >
            <FaRedo />
          </IconButton>
        </>
      )}
    </Box>
  </Rnd>
))}


            {showTextInput && (
              <Draggable
                position={textPositions[selectedImageIndex]}
                onDrag={handleTextDrag}
                bounds="parent"
              >
                <TextField
                  variant="outlined"
                  size="small"
                  value={captions[selectedImageIndex] || ""}
                  onChange={handleTextChange}
                  style={{
                    position: "absolute",
                    top: textPositions[selectedImageIndex]?.y || 100,
                    left: textPositions[selectedImageIndex]?.x || 100,
                    cursor: "move",
                  }}
                />
              </Draggable>
            )}
          </>
        )}
      </Box>

      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed black",
              borderRadius: "10px",
              p: 2,
              textAlign: "center",
              mt: 2,
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <Typography>Drag and drop images, or click to select</Typography>
          </Box>
        )}
      </Dropzone>

      <Box sx={{ mt: 2, display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              m: 1,
              p: 1,
              border: selectedImageIndex === index ? "2px solid blue" : "2px solid transparent",
              cursor: "pointer",
            }}
            onClick={() => handleImageSelect(index)}
          >
            <img src={image} alt={`thumbnail-${index}`} style={{ width: "100px", height: "100px" }} />
          </Box>
        ))}
      </Box>

      {showEmojiPicker && (
        <Box ref={emojiPickerRef} sx={{ mt: 2 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
    </Box>
  );
};

export default ImageEditor;
