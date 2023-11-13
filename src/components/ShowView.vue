<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['show'])
const router = useRouter()
const imgBaseUrl = ref('https://image.tmdb.org/t/p/w185')
const movieID = computed(() => props.show.id)

const hover = ref(false)
const longTitle = ref(false)
const longName = ref(false)

const checkTitle = () => {
  if (props.show.title) {
    if (props.show.title.length > 22) {
      longTitle.value = true
    }
  }
}

const checkName = () => {
  if (props.show.name) {
    if (props.show.name.length > 22) {
      longName.value = true
    }
  }
}

const getShowInfos = async () => {
  if (props.show.title) {
    router.push({ name: 'movieInfos', params: { id: movieID.value } })
  }

  if (props.show.name) {
    router.push({ name: 'tvInfos', params: { id: movieID.value } })
  }

}

checkTitle()
checkName()

</script>

<template>
  <div class="col-6 col-md-4 col-lg-2 position-relative bg-transparent mb-4 p-0" @mouseover="hover = true"
    @mouseleave="hover = false">

    <div @click="getShowInfos" style="cursor: pointer;" class="me-lg-4 me-2 position-relative">
      <div class="bg-info h-100 w-100 rounded" :class="{ hoverAni: hover }"></div>
      <font-awesome-icon :icon="['fas', 'circle-play']" class="fs-1 hiddenAni" :class="{ playAni: hover }" />
      <img :src="imgBaseUrl + props.show.poster_path" class="rounded w-100" alt="...">
    </div>
    
    <p v-if="!longTitle" class=" mt-1 mb-1">{{ props.show.title }}</p>
    <p v-if="!longName" class="mt-1 mb-1">{{ props.show.name }}</p>
    <p v-if="longTitle" class="mt-1 mb-1">{{ props.show.title.substring(0, 19) }}...</p>
    <p v-if="longName" class="  mt-1 mb-1">{{ props.show.name.substring(0, 19) }}...</p>

    <div class="text-white-50 position-relative">
      <span v-if="props.show.release_date" class="">{{ props.show.release_date.substring(0,4) }} </span>
      <span v-if="!props.show.media_type && props.show.release_date"
        class="border border-info rounded-1 px-1 position-absolute" style="font-size: 13px; right: 12%;">MOVIE</span>
      <span v-if="props.show.first_air_date" class="">{{ props.show.first_air_date.substring(0, 4) }} </span>
      <span v-if="!props.show.media_type && props.show.first_air_date"
        class="border border-info rounded-1 px-1 position-absolute" style="font-size: 13px; right: 12%;">TV</span>
      <span v-if="props.show.media_type" class="border border-info rounded-1 px-1 position-absolute"
        style="font-size: 13px; right: 12%;">{{ props.show.media_type.toUpperCase() }}</span>
    </div>

  </div>
</template>

<style scoped>
.hoverAni {
  opacity: 0.5;
  position: absolute;
  z-index: 0;
}

.hiddenAni {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 40%;
  transform: translateY(200%);
  transition: all 0.6s;

}

.playAni {
  opacity: 1;
  z-index: 1;
  transform: translateY(0);
  transition: all 0.6s;
}</style>