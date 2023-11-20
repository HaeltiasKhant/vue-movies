<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const search = ref('')

const navigateSearch = async() => {
  if(search.value) {
    router.push({ name: 'search', params: { type: 'movie', searchName : search.value, page: 1}})
  }
  else return
}

const goToHomePage = () => {
  router.push('/home')
}

</script>

<template>
  <div class="container text-start text-light">
    
    <transition appear name="bounce" >
      <div class="d-flex flex-column justify-content-center align-items-center mt-lg-5 mt-3">
        <font-awesome-icon class=" fs-1" :icon="['fas', 'film']" />
        <h1  class="fs-1 text-light">Fakelixer</h1>
      </div>  
    </transition>
      
    <div class="position-relative my-2" role="search">

      <transition appear name="drop">
        <input @keyup.enter="navigateSearch" v-model="search" class="form-control pe-5 py-lg-3 py-2 fs-lg-5"
         type="text" placeholder="Enter name..." aria-label="Search" name="search">
      </transition>
      
      <div @click="navigateSearch" class="fs-5" style="position: absolute; right: 2%; bottom: 22%; cursor: pointer;"><font-awesome-icon
          :icon="['fas', 'magnifying-glass']" class="text-info" /></div>
    </div>

    <transition appear name="button">
      <div @click="goToHomePage" class="d-flex justify-content-center mt-lg-5 mt-3">
        <button class="btn btn-info fs-4 fw-medium py-3 px-5 mb-5 text-light border-light border-2 rounded-pill">View Full Site
          <font-awesome-icon class="" :icon="['fas', 'right-long']" /></button>
      </div>
    </transition>

    <transition appear name="infos">
      <div>
        <h5>What is Fakelixer?</h5>
        <p class="mb-lg-5 mb-4"> 
          Fakelixer is a free streaming website where you can watch movies and tv series online with multiple genres highlights
          such as Action, Comedy, Shooting, Sport, History, Thriller,... Fakelixer updates new HD Movies and Shows Daily so you
          will never miss your favorite title.
        </p>
      </div>
      
    </transition>
    
    <transition appear name="infos">
    <div>
      <h5>Watch Movies online free on Fakelixer</h5>
      <p class="mb-lg-5 mb-4">
        We start at the beginning of 2019 and been growing steadily. Free streaming, HD quality, fast download speed from
        the best video hosts like vidcloud, hydrax, mp4upload, vidstream, streamtape, mycloud are what make our users happy
        with our streaming service. Your Favorite Movies and Shows are always ready for live streaming and downloading from
        all around the world. When the first and main Fakelixer domain is down, many poor-quality copies were made to
        resemble the official website but with LOW quality, So please bookmark our Fakelixer official website and follow our
        Twitter page here to stay updated.
      </p>
    </div>
    </transition>
    
    <transition appear name="infos">
    <div>
      <h5>Is Fakelixer Safe? Is it Legal to use Fakelixer?</h5>
      <p class="mb-lg-5 mb-4"> 
        One of the biggest fears while streaming movies for free is safety. It is only wise to be selective when it comes to
        which sites to visit. However, you can put your worries at rest as Fakelixer has been one of the safest destinations
        for cinema freaks. And here are reasons why the site has got millions of visitors on a monthly basis.
      </p>
    </div>
    </transition>
    
    <h5>Why Fakelixer should be your movies streaming site?</h5>
    <transition appear name="infos" >
      <ul class="text-light mt-lg-4">
      <li>
        <p>1. Safety</p>
        <p>One of the most basic lessons you don’t want to learn the hard way on the Internet is not putting down your private
           information/credit card number if not necessary. But as no account or registration is needed to watch free movies on 
          Fakelixer, you can rest assured the site is safe. </p>
      </li>
      <li>
        <p>2. Extensive content library</p>
        <p>One of Fakelixer’ biggest strengths is its collection of movies and TV shows in the best resolution possible (normally HD).
           No matter what you are looking for, be it the latest releases or your old childhood classics, high budget Hollywood movies
            or regional indies, you are highly likely to find it at Fakelixer.  </p>
      </li>
      <li>
        <p>3. Streaming experience</p>
        <p>It is free, fast, and seamless. Normally you can only pick one but Fakelixer ticks all the three boxes. Although the website
           is free of charge, you are actually provided premium watching experience with fast loading times and little to no buffering. </p>
      </li>
      <li>
        <p>4. Device compatibility</p>
        <p>Fakelixer is mobile-friendly and Chromecast supported so you can stream movies and TV shows with any device available.  </p>
      </li>
      <li>
        <p>5. Ads and popups</p>
        <p>They are vital to any streaming site's survival but Fakelixer doesn't seem greedy. You will encounter ads and popups here and there
           but overall, the watching experience is fairly seamless.  </p>
      </li>
      <li>
        <p>6. Great customer care</p>
        <p>At Fakelixer, we have great customer care. If a link is broken or you cannot find the movie of interest, simply make a request.
           Our team will do our best to fulfil our wishes as it normally takes only a couple of days for us to update the links. </p>
      </li>
    </ul>
    </transition>

    <p>Please help us to spread the words and let your friends know about Fakelixer. Thank you</p>

  </div>

  <transition appear name="button">
    <div @click="goToHomePage" class="d-flex justify-content-center my-lg-5 my-4">
      <button class="btn btn-info fs-4 fw-medium py-3 px-4 text-light border-light border-2 rounded-pill">Go to Fakelixer
        <font-awesome-icon class="" :icon="['fas', 'right-long']" /></button>
    </div>
  </transition>
  
  <footer class="text-center text-light py-2 container-fluid">
    <div class="d-lg-inline-flex justify-content-end mb-lg-2 mb-4">
 
      <ul class="nav nav-underline">
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-light p-0" aria-current="page" href="/home">Andriod app</a>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-light p-0" aria-current="page" href="/home">Terms of service</a>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-light p-0" aria-current="page" href="/home">Contact us</a>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-light p-0" aria-current="page" href="/home">Free movie apps</a>
        </li>
        <li class="nav-item pe-lg-4">
          <a class="nav-link text-light p-0" aria-current="page" href="/home">Sitemap</a>
        </li>
      </ul>

    </div>
    <p class="fw-medium mx-auto" style="max-width: 840px; color: #bebdbd; font-size: small;">Fakelixer is a Free Movies streaming site
       with zero ads. We let you watch movies online without having to register or paying,
       with over 10000 movies and TV-Series. You can also Download full movies from Fakelixer and watch it later if you want.</p>
    <p>&copy; Fakelixer</p>
  </footer>
</template>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.8s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.drop-enter-active {
  transition: all 0.6s ease-out;
  transition-delay: 0.3s;
}
.drop-enter-from{
  transform: translateY(-200%);
  opacity: 0;
}

.button-enter-active {
  animation: button-in 0.8s;
  animation-delay: 0.6s;
  opacity: 0;
}

@keyframes button-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.infos-enter-active {
  transition: all 0.8s ease;
  transition-delay: 0.8s;
}

.infos-enter-from{
  opacity: 0;
  transform: translateY(200%);
}
</style>