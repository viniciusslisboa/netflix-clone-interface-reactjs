import React from 'react';
import './featuredMovie.css';

// eslint-disable-next-line
export default ({item}) => {
  let firstDate = new Date(item.first_air_date);
  let genres = [];
  for(let i in item.genres) {
    genres.push(item.genres[i].name);
  }
  let qtdWord = item.overview.split(' ').length
  let shortdescription = item.overview.substring(0, 390)
  return (
    <div>
      <section className="featured" style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
      }}>
       <div className="featured--vertical">
         <div className="featured--horizontal">
           <div className="featured--name">{item.name}</div>
           <div className="featured--info">
             <div className="featured--points">{item.vote_average} points</div>
             <div className="featured--year">{firstDate.getFullYear()}</div>
             <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? "s" : ""}</div>
           </div>
           <div className="featured--overview">{qtdWord > 80 ? `${shortdescription}...` : item.overview}</div>
           <div className="featured--buttons">
             <a href={`/watch/${item.id}`} className="featured--watch">⁪◄ watch</a>
             <a href={`/list/add/${item.id}`} className="featured--addList">+ Minha Lista</a>
           </div>
           <div className="featured--genres"><strong>Genêros: </strong>{genres.join(', ' ,' ')}</div>
         </div>
       </div>

      </section>
    </div>

  );
}