import React, { useState } from 'react'
import './movieRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// eslint-disable-next-line
export default ({title, items}) => {
  // eslint-disable-next-line
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 0) {
      x = 0;
    }
    setScrollX(x)
  }
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;
    if(window.innerWidth - listW > x) {
      x = (window.innerWidth - listW ) - 60
    }
    setScrollX(x) 
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>
      <div className="movieRow--listarea">
          <div className="movieRow--list" style={{ marginLeft: scrollX, width: items.results.length * 150}}>
            {items.results.length > 0 && items.results.map((el, key) => (
              // eslint-disable-next-line
              <div key={key} className="movieRow--item">
                 <img src={`https://image.tmdb.org/t/p/w300${el.poster_path}`} alt={el.original_title}  />
              </div>
            ))}
          </div>


        
      </div>
    </div>
  );
}