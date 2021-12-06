const { REACT_APP_API_KEY: API_KEY, REACT_APP_BASE_URL: BASE_URL } = process.env;

const pullData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  const data = await response.json();
  return data;
}


// eslint-disable-next-line
export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        items: await pullData(`/discover/tv?with_network=213&api_key=${API_KEY}`)
      },
      {
        slug: "trending",
        title: "Recomended for you",
        items: await pullData(`/trending/all/week?api_key=${API_KEY}`)
      },
      {
        slug: "topated",
        title: "On the rise",
        items: await pullData(`/movie/top_rated?api_key=${API_KEY}`)
      },
      {
        slug: "action",
        title: "Action",
        items: await pullData(`/discover/movie?with_genres=28&api_key=${API_KEY}`)
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: await pullData(`/discover/movie?with_genres=35&api_key=${API_KEY}`)
      },
      {
        slug: "horror",
        title: "Horror",
        items: await pullData(`/discover/movie?with_genres=27&api_key=${API_KEY}`)
      },
      {
        slug: "romance",
        title: "Romance",
        items: await pullData(`/discover/movie?with_genres=10749&api_key=${API_KEY}`)
      },
      {
        slug: "documentary",
        title: "Documentary",
        items: await pullData(`/discover/movie?with_genres=99&api_key=${API_KEY}`)
      },
    ]
  },
  getMovieInfo: async (id, type) => {
    let info = {};

    if(id) {
      // eslint-disable-next-line default-case
      switch (type) {
        case 'movie':
          info = await pullData(`/movie/${id}?api_key=${API_KEY}`)
        break;
      
        case 'tv':
          info = await pullData(`/tv/${id}?api_key=${API_KEY}`)
        break;
      }
    }
    return info;
  }
}
