import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useLanguageStore from '@/store/useLanguageStore'; // Подключаем Zustand store
import translations from '@/localization'; // Импортируем переводы

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для дропдауна меню
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // Состояние для селектора языка
  const { language, setLanguage } = useLanguageStore(); // Достаем текущий язык и функцию для его изменения
  const location = useLocation();
  const navigate = useNavigate();

  const t = translations[language]; // Выбираем переводы на основе выбранного языка

  // Определяем, является ли текущая страница главной или страницей "О театре"
  const isHomePage = location.pathname === '/' || location.pathname === '/about';

  // Обработчик клика на меню
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen); // Открыть/закрыть меню при клике
    if (isLanguageMenuOpen) {
      setIsLanguageMenuOpen(false); // Закрыть селектор языков, если он открыт
    }
  };

  // Обработчик выбора в меню
  const handleMenuSelect = (path) => {
    setIsMenuOpen(false); // Закрыть меню после выбора
    if (path === 'performances') {
      const element = document.getElementById('performances');
      if (element && location.pathname === '/') {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById('performances');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Даем время для навигации на главную, затем скроллим
      }
    } else {
      navigate(path);
    }
  };

  // Обработчик для меню выбора языка
  const handleLanguageMenuClick = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen); // Открыть/закрыть селектор языка
    if (isMenuOpen) {
      setIsMenuOpen(false); // Закрыть основное меню, если оно открыто
    }
  };

  // Обработчик выбора языка
  const handleLanguageSelect = (lang) => {
    setLanguage(lang); // Меняем язык через Zustand store
    setIsLanguageMenuOpen(false); // Закрыть меню после выбора
  };

  return (
    <nav className={`navbar ${isHomePage ? 'navbar-light' : 'navbar-dark'}`}>
      <div className="navbar-logo">
        <img
          src={isHomePage ? '/logoWhite.png' : '/logoBlack.png'}
          alt="Logo"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className='nav-selectors'>
        <div className="navbar-menu">
          <button className="menu-button" onClick={handleMenuClick}>
            {t.menu} {/* Меню на основе выбранного языка */}
          </button>
          {isMenuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleMenuSelect('/')}>{t.home}</li>
              <li onClick={() => handleMenuSelect('performances')}>{t.repertoire}</li> {/* Афиша */}
              <li onClick={() => handleMenuSelect('/performances/repertoire')}>{t.performances}</li>
              <li onClick={() => handleMenuSelect('/about')}>{t.about}</li>
            </ul>
          )}
        </div>

        {/* Селектор языка */}
        <div className="navbar-menu">
          <button className="menu-button" onClick={handleLanguageMenuClick}>
            {language} {/* Выводим текущий выбранный язык */}
          </button>
          {isLanguageMenuOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleLanguageSelect('RU')}>RU</li>
              <li onClick={() => handleLanguageSelect('EN')}>EN</li>
              <li onClick={() => handleLanguageSelect('KZ')}>KZ</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
