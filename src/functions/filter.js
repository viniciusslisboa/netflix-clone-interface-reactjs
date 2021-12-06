import tmdb from '../TMDB';
import RandomNumber from './randomNumber';


async function prepare () {
  const list = await tmdb.getHomeList();

  let originals = list.filter(i=>i.slug === "originals");
  let randomNumber = RandomNumber(originals)
  let chosen = originals[0].items.results[randomNumber];
  if(chosen.backdrop_path === null) {
    let newNumber = RandomNumber(originals);
    let newChosen = originals[0].items.results[newNumber];
    return newChosen
  } else {
    return chosen
  }
  
  
  
}

export default prepare;