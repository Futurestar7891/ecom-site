import { useState, useEffect,useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './Start.css'

const Start = () => {
  const images = useMemo(() => [
    'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/826349/pexels-photo-826349.jpeg?auto=compress&cs=tinysrgb&w=600',
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
          <NavLink to="/Carauselclick"><img src={image} alt={`Slide ${index + 1}`} /></NavLink>
        </div>
      ))}
    </div>
  );
};

export default Start;
