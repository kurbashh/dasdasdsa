import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import translations from '@/localization'; // Импортируем переводы
import useLanguageStore from '@/store/useLanguageStore'; // Для работы с языками

const PerformanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Для возврата на главную страницу
  const { language } = useLanguageStore(); // Получаем текущий язык
  const t = translations[language]; // Выбираем переводы на основе языка

  const [performance, setPerformance] = useState(null);
  const [showMoreHistory, setShowMoreHistory] = useState(false); // Для истории
  const [showMoreBackground1, setShowMoreBackground1] = useState(false); // Для первой части фона
  const [showMoreBackground2, setShowMoreBackground2] = useState(false); // Для второй части фона

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/performances/${id}/`)
      .then((response) => response.json())
      .then((data) => setPerformance(data))
      .catch((error) => console.error('Ошибка при загрузке перформанса:', error));
  }, [id]);

  if (!performance) {
    return <div>{t.loading}</div>; // Локализованная загрузка
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

  const toggleShowMoreHistory = () => {
    setShowMoreHistory(!showMoreHistory);
  };

  const toggleShowMoreBackground1 = () => {
    setShowMoreBackground1(!showMoreBackground1);
  };

  return (
    <div className="performance-detail-container">
      {/* Левая колонка: информация о перформансе */}
      <div className="left-column">
        <h1>{performance.title}</h1>

        <Slider {...sliderSettings} className="image-carousel">
          {performance.image_carousel.map((image) => (
            <div key={image.id} className="carousel-slide">
              <img src={image.file} alt="Performance Image" />
            </div>
          ))}
        </Slider>

        <div className="section">
          <h2>{t.description}</h2>
          <p>{performance.subtitle}</p>
        </div>

        <div className="section">
          <h2>{t.history}</h2>
          <p>
            {showMoreHistory
              ? performance.history
              : performance.history?.slice(0, 300) + '...'}
          </p>
          <button onClick={toggleShowMoreHistory} className="show-more-button">
            {showMoreHistory ? t.showLess : t.showMore}
          </button>
        </div>

        <div className="section">
          <h2>{t.libretto}</h2>
          <p>
            {showMoreBackground1
              ? performance.background1
              : performance.background1?.slice(0, 300) + '...'}
          </p>
          <button onClick={toggleShowMoreBackground1} className="show-more-button">
            {showMoreBackground1 ? t.showLess : t.showMore}
          </button>
        </div>
      </div>

      {/* Правая колонка: основные детали */}
      <div className="right-column">
        <div className="details-section">
          <h3>{t.dateAndTime}</h3>
          <p>
            {new Date(performance.datetime1).toLocaleString(language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="details-section">
          <h3>{t.composer}</h3>
          <p>{performance.author}</p>
        </div>

        <div className="details-section">
          <h3>{t.premiere}</h3>
          <p>{new Date(performance.premier).toLocaleDateString()}</p>
        </div>

        <div className="details-section">
          <h3>{t.genre}</h3>
          <p>{performance.type}</p>
        </div>

        <div className="details-section">
          <h3>{t.duration}</h3>
          <p>{performance.duration}</p>
        </div>

        <div className="details-section">
          <h3>{t.rolesAndPerformers}</h3>
          <p>{performance.dop_info}</p>
        </div>

        {/* Кнопка "Купить билет" */}
        <div className="ticket-button-container">
          <button className="buy-ticket-button" onClick={() => alert('Redirect to ticket purchase')}>
            {t.buyTicket}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDetailPage;
