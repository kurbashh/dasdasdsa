import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import translations from '@/localization'; // Подключаем файл переводов
import useLanguageStore from '@/store/useLanguageStore'; // Подключаем Zustand store для локализации

const RepertoireDetailPage = () => {
  const { id } = useParams();
  const [performanceData, setPerformanceData] = useState(null);
  const [showAllPerformers, setShowAllPerformers] = useState(false); // Состояние для показа всех исполнителей
  const { language } = useLanguageStore(); // Получаем текущий язык из Zustand
  const t = translations[language]; // Выбираем переводы на основе выбранного языка

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/repertory/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPerformanceData(data);
      })
      .catch((error) => console.error('Ошибка при загрузке:', error));
  }, [id]);

  if (!performanceData) {
    return <div>{t.loading}</div>; // Локализованный текст для "Загрузка..."
  }

  const { performance, image_urls, performers, creatives } = performanceData;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  // Показываем первые 8 исполнителей, если не нажата кнопка "Показать больше"
  const visiblePerformers = showAllPerformers ? performers : performers.slice(0, 8);

  return (
    <div className="repertoire-detail-page-container">
      <h1 className="repertoire-performance-title">{performance.title}</h1>

      <div className="repertoire-content">
        {/* Слайдер изображений */}
        <Slider {...sliderSettings} className="repertoire-performance-slider">
          {image_urls.map((image) => (
            <div key={image.id} className="repertoire-slider-image">
              <img src={`http://127.0.0.1:8000/media/${image.file}`} alt="Performance" />
            </div>
          ))}
        </Slider>

        {/* Исполнители справа от слайдера */}
        <div className="repertoire-performers-section">
          <h2>{t.roles}</h2> {/* Локализованный заголовок "Роли" */}
          <div className="repertoire-performers-list">
            {visiblePerformers.map((performer) => (
              <div key={performer.id} className="repertoire-performer-card">
                <p>{performer.role}</p>
              </div>
            ))}
          </div>

          {/* Кнопка "Показать больше" */}
          {performers.length > 8 && (
            <button onClick={() => setShowAllPerformers(!showAllPerformers)} className="show-more-button">
              {showAllPerformers ? t.showLess : t.showMore} {/* Локализованные кнопки */}
            </button>
          )}
        </div>
      </div>

      {/* Креативная команда снизу */}
      <div className="repertoire-creatives-section">
        <h2>{t.creativeTeam}</h2> {/* Локализованный заголовок "Креативная команда" */}
        <div className="repertoire-creatives-list">
          {creatives.map((creative) => (
            <div key={creative.id} className="repertoire-creative-card">
              <strong>{creative.role}</strong>: {creative.description || t.noDescription}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepertoireDetailPage;
