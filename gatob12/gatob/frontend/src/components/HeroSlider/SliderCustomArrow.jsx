import React from 'react'; // Подключим стили для стрелок

const SliderCustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={`${className} custom-arrow ${direction}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {/* {direction === 'left' ? (
        <span>&lsaquo;</span> // Стрелка влево
      ) : (
        <span>&rsaquo;</span> // Стрелка вправо
      )} */}
    </div>
  );
};

export default SliderCustomArrow;