import { defineStore } from 'pinia'
import axios from 'axios';

export const useMovieStore = defineStore('moviestore', {
  state: () => ({
    trendings: [],
    latestMovies: [],
    latestTVs: [],
    populars: [],
    topRateds: [],
    searcheds: [],
    details: [],
    videos: [],
    movieCasts: [],
    tvCasts: [],
    seasonInfos: [],
    episodeInfos: [],
    similars: [],
    tvExternalIDs: [],
    imdbRating: [],
    isLoading: false,
    totalPages: 0,
  }),

  actions: {
    async getTrendings(type) {
      this.trendings = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };
      try {
        const response = await axios.request(options)
        this.trendings = response.data.results
      }catch(err) {
        console.log(err)
      }
    },

    async getLatestMovies() {
      this.latestMovies = []
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };
      try {
        const response = await axios.request(options)
        this.latestMovies = response.data.results
      }catch(err) {
        console.log(err)
      }
    },

    async getLatestTVs() {
      this.latestTVs = []
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.latestTVs = response.data.results
      }catch(err) {
        console.log(err)
      }
    },

    async getPopulars(type, num) {
      this.populars = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${num}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.populars = response.data.results
      }catch(err) {
        console.log(err)
      }
    },

    async getTopRateds(type, num) {
      this.topRateds = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=${num}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.topRateds = response.data.results
      }catch(err) {
        console.log(err)
      }
    },

    async getsearcheds(type, name, page) {
      this.searcheds = []
      this.total_pages = ''
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/${type}?query=${name}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      }
      
      try{
        const response = await axios.request(options)
        this.searcheds = response.data.results
        this.totalPages = response.data.total_pages
      } catch(err) {
        console.log(err)
      }
    },

    async getDetails(type, id) {
      this.details = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/${id}?`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try{
        const response = await axios.request(options)
        this.details = response.data
      } catch(err) {
        console.log(err)
      }
    },

    async getVideos(type, id) {
      this.videos = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try{
        const response = await axios.request(options)
        this.videos = response.data.results
      } catch(err) {
        console.log(err)
      }
    },

    async getMovieCasts(id) {
      this.movieCasts = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}/credits?`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
       const response = await axios.request(options)
        this.movieCasts = response.data.cast 
      } catch(err) {
        console.log(err)
      }
    },

    async getTVCasts(id) {
      this.tvCasts = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?language=en-US'`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.tvCasts = response.data.cast
      } catch(err) {
        console.log(err)
      }
    },

    async getSeasonInfos(id, num) {
      this.seasonInfos = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/season/${num}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.seasonInfos = response.data
      } catch(err) {
        console.log(err)
      }
    },

    async getEpisodeInfos(id, ssNum, epNum) {
      this.episodeInfos = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/season/${ssNum}/episode/${epNum}?language=en-US`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try {
        const response = await axios.request(options)
        this.episodeInfos = response.data
      } catch(err) {
        console.log(err)
      }
    },

    async getSimilars(type, id) {
      this.similars = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/${type}/${id}/similar?`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try{
        const response = await axios.request(options)
        this.similars = response.data.results
      } catch(err) {
        console.log(err)
      }
    },

    async getTvExternalIDs(id) {
      this.tvExternalIDs = []
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${id}/external_ids`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE5Nzg5MmNjMWFlOGZjNTU0ODZmYjgxMzdjYzFkYSIsInN1YiI6IjY0ZmJlNTc1ZWZlYTdhMDBhYWQ1NDYyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TR8h9YvMXeTckhHCcJgSa6So6rAGOx7NDsL9e9RY6uo'
        }
      };

      try{
        const response = await axios.request(options)
        this.tvExternalIDs = response.data
      } catch(err) {
        console.log(err)
      }
    },

    async getIMDBrating(id) {
      this.imdbRating = []
      const options = {
        method: 'GET',
        url: `https://www.omdbapi.com/?i=${id}&apikey=686b4a1b`,
        headers: {
          accept: 'application/json',
        }
      };

      try{
        const response = await axios.request(options)
        this.imdbRating = response.data
      } catch(err) {
        console.log(err)
      }
    }
  }
})
