<script setup>
import { useMovieStore } from '../stores/counter';
import { ref, computed, watch } from 'vue';
import ShowView from '../components/ShowView.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const movieStore = useMovieStore()

const movieID = computed(() => route.params.id)
const details = computed(() => movieStore.details)
const casts = computed(() => movieStore.movieCasts)
const similarMovies = computed(() => movieStore.similars)
const videos = computed(() => movieStore.videos)
const IMDBRating = computed(() => movieStore.imdbRating)
const imgBaseUrl = ref('https://image.tmdb.org/t/p/w185')

const trailerKey = ref('')
const trailerURL = ref('')

const getmovie = async() => {

  movieStore.isLoading = true

  await movieStore.getVideos('movie', movieID.value)

  for(let video in videos.value) {
    const name = videos.value[video].name
    if(name == "Official Trailer") {
      trailerKey.value = videos.value[video].key
    }
  }

  trailerURL.value = `https://www.youtube.com/watch?v=${trailerKey.value}`

  await movieStore.getDetails('movie', movieID.value)
  await movieStore.getMovieCasts( movieID.value)
  await movieStore.getSimilars('movie',  movieID.value)
  await movieStore.getIMDBrating(details.value.imdb_id)

  movieStore.isLoading = false
}

watch(route, async() => {

  getmovie()

})

getmovie()
</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="text-light mx-lg-5" v-else>
    <video width="" height="" class="mb-2 mt-lg-4 mt-1 " controls style=" min-width: 100%">
      <source src="" type="video/mp4">
      <source src="" type="video/ogg">
    Your browser does not support the video tag.
    </video>

    <div class=" card text-black border-0 p-lg-5 p-1">
      <div class="row g-0 bg-light rounded ">

        <div class="col-lg-2 ">
          <img :src="imgBaseUrl + details.poster_path" :alt="details.title" class="rounded  object-fit-cover">
        </div>

        <div class="col-lg-9">
          <div class="card-body p-0">

            <h5 class="card-title fs-2 my-2 ">{{ details.title }}</h5>

            <div class="d-flex align-items-center mb-2">
              <a :href="trailerURL">
                <button type="button" class="btn btn-outline-dark fs-6 me-2 ">
                  <font-awesome-icon :icon="['fas', 'video']" /> Trailer
                </button>
              </a>

              <span  class=" border border-dark rounded" style="padding: 5px;">Hd</span>

              <span class="ms-3 text-warning fw-bold">IMDB: {{ IMDBRating.imdbRating }}</span>

            </div>
          
            <p class="card-text fw-light">{{ details.overview }}</p>

            <div class="row">
              <div class="col-lg-6">

                <p class="card-text mb-0"><span class="fw-normal">Released:</span> <span class="fw-light"> {{
                  details.release_date }}</span></p>

                <p class="card-text mb-0"><span class="fw-normal">Genre:</span> <span class="fw-light"
                    v-for="genre in details.genres"> {{ genre.name }}, </span></p>

                <p class="card-text mb-0"><span class="fw-normal">Casts:</span> <span class="fw-light"
                    v-for="cast in casts.slice(0, 6)">{{ cast.name }}, </span></p>

              </div>

              <div class="col-lg-6">

                <p class="card-text mb-0"><span class="fw-normal">Duration:</span> <span class="fw-light"> {{
                  details.runtime }} min</span></p>

                <p class="card-text mb-0"><span class="fw-normal">Country:</span> <span class="fw-light"
                    v-for="country in details.production_countries"> {{ country.name }}, </span></p>

                <p class="card-text mb-0"><span class="fw-normal">Production:</span> <span class="fw-light"
                    v-for="company in details.production_companies"> {{ company.name }}, </span></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 

  
    <p class="mt-4 mb-2 fs-2">You may also like</p>

    <div class="row g-0">
      <ShowView v-for="show in similarMovies.slice(0, 12)" :key="show.id" :show="show" />
    </div>
  </div>
</template>