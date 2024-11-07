import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from '@/components/HeroSlider/HeroSlider';
import translations from '@/localization'; // Импортируем переводы
import useLanguageStore from '@/store/useLanguageStore'; // Используем Zustand для текущего языка

const HomePage = () => {
  const [performances, setPerformances] = useState([]);
  const [backstages, setBackstages] = useState([]);
  const navigate = useNavigate();

  const { language } = useLanguageStore(); // Достаем текущий язык из Zustand
  const t = translations[language]; // Выбираем переводы на основе текущего языка

  const scrollToPerformances = () => {
    const element = document.getElementById('performances');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Получение данных для перформансов
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/performances/')
      .then((response) => response.json())
      .then((data) => {
        setPerformances(data);
        console.log(data);
        
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных о перформансах:', error);
      });
  }, []);

  // Получение данных для закулисных статей
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/backstages/')
      .then((response) => response.json())
      .then((data) => {
        setBackstages(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных о закулисных статьях:', error);
      });
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="slider-container">
          <div className={`slide`}>
            <div className='back-img'>
              <img src={'/hero.jpg'} alt={`Slide`} />
            </div>
            <div className="content">
              <h2>{t.heroTitle}</h2>
              <p>{t.heroSubtitle}</p>
              <button onClick={scrollToPerformances}>{t.viewPerformances}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Info1 Section */}
      <section className="info-section info1">
        <div className="info-content">
          <h2>{t.classicPerformancesTitle}</h2>
          <p>{t.classicPerformancesDescription}</p>
        </div>
      </section>

      {/* Performances Section */}
      <section id='performances' className="performances-section">
        <h2>{t.performancesTitle}</h2>
        {performances.length > 0 ? (
          <Slider {...sliderSettings}>
            {performances.map((performance) => (
              <div key={performance.id} className="performance-slide" onClick={() => navigate(`/performances/${performance.id}`)}>
                <div className="performance-card">
                  <img
                    src={performance.image_carousel[0]?.file}
                    alt={performance.title}
                    className="performance-image"
                  />
                  <div className="performance-info">
                    <h3>{performance.title}</h3>
                    <p>{t.performanceDate}: {new Date(performance.datetime1).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>{t.loading}</p>
        )}
      </section>

      {/* Info2 Section */}
      <section className="info-section info2">
        <div className="info-content">
          <div className="text-and-image-container">
            <div className="text-content">
              <h2>{t.aboutTheatreTitle}</h2>
              <p>{t.aboutTheatreDescription}</p>
              <button onClick={() => navigate('/about')} className="read-more-button">{t.readMoreAboutTheatre}</button>
            </div>
            <div className="image-content">
              <img src="/home1.jpg" alt="Театр им. Абая" />
            </div>
          </div>
        </div>
      </section>

      {/* Backstages Section */}
      <section className="backstages-section">
        <h2>{t.backstagesTitle}</h2>
        {backstages.length > 0 ? (
          <Slider {...sliderSettings}>
            {backstages.map((backstage) => (
              <div key={backstage.id} onClick={()=>{navigate(`performances/backstages/${backstage.id}`)}} className="backstage-slide">
               
                <div className="backstage-card">
                  <img
                    src={backstage.main_image}
                    alt={backstage.title}
                    className="backstage-image"
                  />
                  <div className="backstage-info">
                    <h3>{backstage.title}</h3>
                    <p>{backstage.description}</p>
                    <p>{t.backstageDate}: {new Date(backstage.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>{t.loading}</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
