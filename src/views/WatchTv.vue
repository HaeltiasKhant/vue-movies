<script setup>
import { useMovieStore } from '../stores/counter';
import { ref, computed, watch } from 'vue';
import ShowView from '../components/ShowView.vue';
import { useRoute, useRouter } from 'vue-router';

const movieStore = useMovieStore()
const route = useRoute()
const router = useRouter()

const tvID = computed(() => route.params.id)
const videos = computed(() => movieStore.videos)
const details = computed(() => movieStore.details)
const casts = computed(() => movieStore.tvCasts)
const seasonInfos = computed(() => movieStore.seasonInfos)
const episodeInfos = computed(() => movieStore.episodeInfos)
const similarTvs = computed(() => movieStore.similars)
const tvExternalIDs = computed(() => movieStore.tvExternalIDs)
const IMDBRating = computed(() => movieStore.imdbRating)

const imgBaseUrl = ref('https://image.tmdb.org/t/p/w185')
const trailerKey = ref('')
const trailerURL = ref('')

const getSeason = async(num) => {
  router.push({ name: 'watchTv', params: { id: tvID.value, ssNum: num, epiNum: 1}})
}

const getTV = async () => {

  movieStore.isLoading = true

  await movieStore.getVideos('tv', tvID.value)

  for (let video in videos.value) {
    const name = videos.value[video].name
    if (name == "Official Trailer") {
      trailerKey.value = videos.value[video].key
    }
  }

  trailerURL.value = `https://www.youtube.com/watch?v=${trailerKey.value}`

  await movieStore.getDetails('tv', tvID.value)
  await movieStore.getTVCasts(tvID.value)
  await movieStore.getSeasonInfos(tvID.value, route.params.ssNum)
  await movieStore.getEpisodeInfos(tvID.value, route.params.ssNum, route.params.epiNum)
  await movieStore.getTvExternalIDs(tvID.value)
  await movieStore.getIMDBrating(tvExternalIDs.value.imdb_id)
  await movieStore.getSimilars('tv', tvID.value)

  movieStore.isLoading = false
}

watch(route, () => {

  getTV()

})

getTV()

</script>

<template>
  <div v-if="movieStore.isLoading" class="d-flex justify-content-center text-white my-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <p class="text-light fs-6 mt-lg-3 ms-lg-3">
    You are watching {{ details.name }}/season {{ seasonInfos.season_number}}/episode {{ route.params.epiNum }}
  </p>

  <div class="text-light mx-lg-5 mx-1">
    <video width="" height="" class="mb-2 mt-lg-4 mt-1  " controls style=" min-width: 100%">
      <source src="" type="video/mp4">
      <source src="" type="video/ogg">
      Your browser does not support the video tag.
    </video>

    <div class=" bg-light text-black border rounded-3 p-lg-3">
      <div class="dropdown mt-1 mb-1 mb-lg-3 ms-1 ">

        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ seasonInfos.name }}
        </button>

        <ul class="dropdown-menu " style="min-width: 140px;">
          <li class="" v-for="season in details.seasons" @click="getSeason(season.season_number)"><button
              class="dropdown-item " type="button">{{ season.name }}</button></li>
        </ul>
      </div>

      <div class="row my-2 g-0">
      
        <router-link class="col col-lg-3 col-md-4 px-2 col-12 mb-3" v-for="(episode, i) in seasonInfos.episodes"
          :to="{ name: 'watchTv', params: { id: tvID, ssNum: seasonInfos.season_number, epiNum: episode.episode_number } }" :key="episode.id" >
          <button :class="{ active: i == parseInt(route.params.epiNum) - 1 }" class="btn btn-outline-dark w-100 text-start p-2">
            <font-awesome-icon :icon="['fas', 'play']" class="mx-2" />Eps {{ episode.episode_number }}: {{ episode.name }}
          </button>
        </router-link>
      </div>
    </div>

    <div class=" card text-black border-0 p-lg-5 p-1 mt-lg-4 mt-2">
      <div class="row g-0 bg-light rounded ">

        <div class="col-lg-2 me-2">
          <img :src="imgBaseUrl + seasonInfos.poster_path" :alt="details.name" class="rounded  object-fit-cover">
        </div>

        <div class="col-lg-9">

          <div class="card-body p-0">

            <h5 class="card-title fs-2 my-2 ">{{ details.name }} , Season - {{ seasonInfos.season_number }}</h5>

            <div class="d-flex align-items-center mb-2">
              <a :href="trailerURL">
                <button type="button" class="btn btn-outline-dark fs-6 me-2 ">
                  <font-awesome-icon :icon="['fas', 'video']" /> Trailer
                </button>
              </a>

              <span class=" border border-dark rounded" style="padding: 5px;">Hd</span>

              <span class="ms-3 text-warning fw-bold">IMDB: {{ IMDBRating.imdbRating }}</span>

            </div>

            <p class="card-text fw-light">{{ episodeInfos.overview }}</p>

            <div class="row">
              <div class="col-lg-6">

                <p class="card-text mb-0"><span class="fw-normal">Released:</span> <span class="fw-light"> {{
                  episodeInfos.air_date }}</span></p>

                <p class="card-text mb-0"><span class="fw-normal">Genre:</span> <span class="fw-light"
                    v-for="genre in details.genres"> {{ genre.name }}, </span></p>

                <p class="card-text mb-0"><span class="fw-normal">Casts:</span> <span class="fw-light"
                    v-for="cast in casts.slice(0, 6)">{{ cast.name }}, </span></p>

              </div>

              <div class="col-lg-6">
                <p class="card-text mb-0"><span class="fw-normal">Duration:</span> <span class="fw-light"> {{
                  episodeInfos.runtime }} min</span></p>

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
      <ShowView v-for="show in similarTvs.slice(0, 12)" :key="show.id" :show="show" />
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: black;
  
}</style>