import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import translations from '@/localization';
import useLanguageStore from '@/store/useLanguageStore';

const BackstageDetailPage = () => {
  const { id } = useParams();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [backstage, setBackstage] = useState(null);
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    // Fetch the backstage data
    fetch(`http://127.0.0.1:8000/api/backstages/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setBackstage(data);
        if (data.performance) {
          // Fetch the performance data
          fetch(`http://127.0.0.1:8000/api/performances/${data.performance}/`)
            .then((response) => response.json())
            .then((performanceData) => setPerformance(performanceData))
            .catch((error) => console.error('Ошибка при загрузке перформанса:', error));
        }
      })
      .catch((error) => console.error('Ошибка при загрузке бэкстейджа:', error));
  }, [id]);

  if (!backstage) {
    return <div>{t.loading}</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  return (
    <div className="backstage-detail-container">
      {/* Левая колонка: основное изображение и описание */}
      <div className="left-column">
        <h1>{backstage.title}</h1>

        <div className="image-container">
          <img src={backstage.main_image} alt="Main Backstage" />
        </div>

        <div className="section">
          <h2>{t.description}</h2>
          <p>{backstage.description}</p>
        </div>


        {/* Performance Slider */}
        {performance && (
          <div className="section">

            <Slider {...sliderSettings} className="backstage-carousel">
              {performance.image_carousel.map((image) => (
                <div key={image.id} className="backstage-carousel-slide">
                  <img src={image.file} alt="Performance Image" />
                </div>
              ))}
            </Slider>
            <p className='backstage-carousel-desc'>{performance.subtitle}</p>
          </div>
        )}
      </div>

      {/* Правая колонка: детали и информация */}
      <div className="right-column">
        <div className="details-section">
          <h3>{t.dateAndTime}</h3>
          <p>{new Date(backstage.date).toLocaleDateString(language)}</p>
        </div>

        <div className="details-section">
        </div>

        {performance && (
          <>
            <div className="details-section">
              <h3>{t.duration}</h3>
              <p>{performance.duration}</p>
            </div>

            <div className="details-section">
              <h3>{t.composer}</h3>
              <p>{performance.author}</p>
            </div>

            <div className="details-section">
              <h3>{t.genre}</h3>
              <p>{performance.type}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BackstageDetailPage;
