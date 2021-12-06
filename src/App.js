import React, { useEffect, useState } from 'react';
import './App.css';
import tmdb from './TMDB';
import MovieRow from './components/movieRow';
import FeaturedMovie from './components/featuredMovie';
import prepare from './functions/filter';
import filterOverview from './functions/filterOverview';
import Header from './components/header'


// eslint-disable-next-line
export default () => {
  const [movieList, setMovieList] = useState([]);
  // eslint-disable-next-line
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackheader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // pull list
      const list = await tmdb.getHomeList();
      setMovieList(list);

      // pull featured data
      // eslint-disable-next-line
      let chosen = await prepare();
      let overview = chosen.overview === "" ? filterOverview() : chosen.overview
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      chosenInfo.overview = overview
      setFeaturedData(chosenInfo)

    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackheader(true)
      } else {
        setBlackheader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])


    return (
      <div className="page">
        <Header black={blackHeader} />
        {featuredData && 
          <FeaturedMovie item={featuredData} />
        }
       
        
        <section className="lists">
          {movieList.map((element, key) => (
            <MovieRow key={key} title={element.title} items={element.items} />
          ))}
        </section>
        <footer>
          <div>
            Feito com <span role="img" aria-label="hearth">❤️</span> por Vinícius
          </div>
          <div>
            Direitos de imagem para <a href="https://netflix.com" rel="noreferrer" target="_blank">Netflix</a>
          </div>
          <div>
            Dados extraídos do serviço <a href="https://themoviedb.org" rel="noreferrer" target="_blank">TheMoviedb.org</a>
          </div>
        </footer>

        {movieList.length <= 0 && 
          <div className="loading">
           <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" style={{width: window.innerWidth, height: window.innerHeight}} />
          </div>
        }
      </div>   
      
    );
  
}

