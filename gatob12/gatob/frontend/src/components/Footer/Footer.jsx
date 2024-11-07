import React from 'react';
import { Link } from 'react-router-dom';
import useLanguageStore from '@/store/useLanguageStore'; // Используем Zustand для текущего языка
import translations from '@/localization'; // Импортируем переводы

const Footer = () => {
  const { language } = useLanguageStore(); // Достаем текущий язык из Zustand
  const t = translations[language]; // Выбираем переводы на основе текущего языка

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Логотип и краткое описание */}
        <div className="footer-about">
          <img src="/logo_white.png" alt="Logo" className="footer-logo" />
          <p className="footer-description">
            {t.footerDescription}
          </p>
        </div>

        {/* Навигационные ссылки */}
        <div className="footer-links">
          <h4>{t.navigation}</h4>
          <ul>
            <li><Link to="/">{t.home}</Link></li>
            <li><Link to="/performances/repertoire">{t.performances}</Link></li>
            <li><Link to="/backstage">{t.backstage}</Link></li>
          </ul>
        </div>

        {/* Контакты */}
        <div className="footer-contact">
          <h4>{t.contactInfo}</h4>
          <p>{t.phone}: +7 (123) 456-7890</p>
          <p>Email: info@ballet.com</p>
        </div>

        {/* Социальные сети */}
        <div className="footer-social">
          <h4>{t.socialMedia}</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/facebook.svg" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/inst.svg" alt="Instagram" />
            </a>
            <a href="https://telegram.com" target="_blank" rel="noopener noreferrer">
              <img src="/tg.svg" alt="Telegram" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 {t.companyName}. {t.allRightsReserved}</p>
      </div>
    </footer>
  );
};

export default Footer;
