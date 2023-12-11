<script setup>
import { ref, computed, watch } from 'vue';
import ShowView from '../components/ShowView.vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/counter';

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()

const movieID = computed(() => route.params.id)
const details = computed(() => movieStore.details)
const casts = computed(() => movieStore.movieCasts)
const similarMovies = computed(() => movieStore.similars)
const videos = computed(() => movieStore.videos)
const IMDBRating = computed(() => movieStore.imdbRating)

const imgBaseUrl = ref('https://image.tmdb.org/t/p/w185')
const trailerKeys = ref([])
const trailerKey = ref('')
const trailerURL = ref('')

const getmovie = async() => {

  if(!movieID.value) return

  movieStore.isLoading = true

  await movieStore.getVideos('movie', movieID.value)
  await movieStore.getDetails('movie', movieID.value)
  await movieStore.getMovieCasts(movieID.value)
  await movieStore.getSimilars('movie', movieID.value)
  await movieStore.getIMDBrating(details.value.imdb_id)

  for (let video in videos.value) {
    const type = videos.value[video].type
    if(type == "Trailer") {
      trailerKeys.value.push(videos.value[video].key)
      trailerKey.value = trailerKeys.value[trailerKeys.value.length - 1]
    } else {
      trailerKeys.value.push(videos.value[video].key)
      trailerKey.value = trailerKeys.value[trailerKeys.value.length - 1]
    }
  }

  trailerURL.value = `https://www.youtube.com/watch?v=${trailerKey.value}`

  movieStore.isLoading = false
}

watch(route, () => {

  getmovie()
  
})

getmovie()

</script>

<template>
  <div class="container-fluid text-white" v-if="movieStore.isLoading">
    <div class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

  <div class="container text-white mb-5" v-else>
    <div class="row my-2">
      <div class="col-lg-4 col-12 position-relative p-0">
        
        <div class="bg-info h-100 w-100 position-absolute bg-opacity-25 rounded">
          <router-link :to="{name: 'watchMovie', params: { id: movieID} }">
            <font-awesome-icon :icon="['fas', 'circle-play']" class="position-absolute top-50 start-50 translate-middle fs-1"/>
          </router-link>
        </div>
        <img :src="imgBaseUrl + details.poster_path" :alt="details.title" class="rounded w-100 h-100 object-fit-cover">

      </div>

      <div class="col-lg-8 col-12 card text-black border border-info border-3 p-1">

        <div class="card-body p-2">
   
          <router-link :to="{name: 'watchMovie', params: { id: movieID} }">
            <button type="button" class="btn btn-info rounded-3  my-2">
              <font-awesome-icon :icon="['fas', 'play']" /> Watch now
            </button> 
          </router-link>
          
          <h5 class="card-title fs-2 mb-lg-3 ">{{ details.title }}</h5>

          <div class="d-flex align-items-center mb-lg-4 mb-2">
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

    <p class="mt-4 mb-2 fs-2">You may also like</p>

    <div class="row g-0">
      <ShowView v-for="show in similarMovies.slice(0, 12)" :key="show.id" :show="show" />
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.colorRed {
  color: red;
}
</style>