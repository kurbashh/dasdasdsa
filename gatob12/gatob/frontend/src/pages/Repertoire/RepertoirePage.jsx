import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import translations from '@/localization';
import useLanguageStore from '@/store/useLanguageStore'; 

const RepertoirePage = () => {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = translations[language];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/repertory/')
      .then((response) => response.json())
      .then((data) => {
        setPerformances(data.performances);
        console.log();
      })
      .catch((error) => console.error('Error fetching performances:', error));
  }, []);

  return (
    <div className="repertoire-container">
      <h1>{t.performances}</h1>
      <div className="performances-list">
        {performances.map((performance) => (
          <div onClick={()=>{navigate(`${performance.id}`)}} key={performance.id} className="performance-card">
            <img src={`http://127.0.0.1:8000/media/${performance.image}`} alt={performance.title} className="performance-image" />
            <div className="performance-info">
              <h2>{performance.title}</h2>
              <p className="performance-duration">Продолжительность: {performance.duration}</p>
              <p className="performance-author">Композитор: {performance.author}</p>
              <p className="performance-subtitle">{performance.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepertoirePage;
