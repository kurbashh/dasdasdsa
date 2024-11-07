import React from 'react';
import translations from '@/localization'; // Импортируем переводы
import useLanguageStore from '@/store/useLanguageStore'; // Используем Zustand для текущего языка

const AboutPage = () => {
  const { language } = useLanguageStore(); // Достаем текущий язык из Zustand
  const t = translations[language]; // Выбираем переводы на основе текущего языка

  return (
    <>
      <div className="slider-container">
        <div className={`slide`}>
          <div className='back-img'>
            <img src={'/hero.jpg'} alt={`Slide`} />
          </div>
        </div>
      </div>
      <section className="about-page-container">

        <div className="about-intro">
          <h1>{t.aboutTheatreHistory}</h1>
          <p>{t.aboutTheatreIntro}</p>
          <p>{t.aboutTheatreFirstPerformance}</p>
          <p>{t.aboutTheatreConstruction}</p>
          <p>{t.aboutTheatreOpening}</p>
          <p>{t.aboutTheatreRenovation}</p>
          <p>{t.aboutTheatreConclusion}</p>
        </div>

        <div className="about-museum">
          <h2>{t.aboutMuseumTitle}</h2>
          <p>{t.aboutMuseumIntro}</p>
          <p>{t.aboutMuseumFirstExhibit}</p>
          <p>{t.aboutMuseumSecondExhibit}</p>
          <p>{t.aboutMuseumThirdExhibit}</p>
          <p>{t.aboutMuseumConclusion}</p>
        </div>

      </section>
    </>
  );
};

export default AboutPage;
