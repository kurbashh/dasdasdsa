import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = () => {
    const scrollToPerformances = () => {
        const element = document.getElementById('performances');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

  const navigate = useNavigate(); // Хук для навигации
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/main-images/')
      .then((response) => response.json())
      .then((data) => {
        setImgs(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке фото для hero:', error);
      });
  }, []);

  // Функция для перехода на секцию "Перформансы"
  const navigateToPerformances = () => {
    scrollToPerformances() // Переход на якорь секции перформансов
  };

  return (
    <div className="slider-container">
      {/* <Slider {...settings}>
        {imgs.length > 0 ? (
          imgs.map((img, index) => ( */}
            <div className={`slide`}>
              <div className='back-img'>
                <img src={'/hero.jpg'} alt={`Slide`} /> {/* Отображаем изображение */}
              </div>
              <div className="content">
                <h2>Перед столетием</h2>
                <p>91 театральный сезон</p>
                <button onClick={navigateToPerformances}>ПОСМОТРЕТЬ АФИШУ</button> {/* Навигация при клике */}
              </div>
            </div>
          {/* ))
        ) : (
          <div>Загрузка...</div>
        )}
      </Slider> */}
    </div>
  );
};

export default SlickSlider;
