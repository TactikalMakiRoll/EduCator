<template>
  <div class="info">
    <img src="studentbg.png" alt="" class="info__image" />
    <div class="info__heading">
      <h1 class="info__heading-title">
        <span class="text-purple">Best courses</span> are waiting to enrich your skill
      </h1>
      <p class="info__description">
        Provides you with the latest online learning system and material that help your knowledge
        growing.
      </p>
    </div>
    <div class="info__scroll">☟</div>
  </div>
  <div class="courses">
    <div class="courses__header">
      <h2 class="courses__heading"><span class="text-purple">Discover new</span> courses</h2>
    </div>
    <div class="courses__list">
      <LoadingSpinner v-if="coursesLoading"></LoadingSpinner>
      <div
        v-else
        v-for="course in getCoursePage"
        class="course courses__item"
        @pointerenter="displayVideo(course, $event)"
        @pointerleave="hideVideo($event)"
      >
        <div class="course__image-container">
          <video class="course__image" autoplay muted></video>
          <img
            class="course__image"
            :src="course.previewImageLink + '/cover.webp'"
            alt="Course image"
          />
        </div>
        <div class="course__description">
          <div class="course__lesson-tag">
            <div class="play">
              <button class="play__btn">►</button>
              <span class="play__text">{{ course.lessonsCount }} lessons</span>
            </div>
            <p class="course__tag">{{ course.tags[0] }}</p>
          </div>
          <h3 class="course__heading">
            {{ course.title }}
          </h3>
          <p v-if="course.containsLockedLessons" class="course__free">🔒 Contains paid lessons</p>
          <p v-else="course.containsLockedLessons" class="course__free">This course is free</p>
          <div class="rating course__rating">
            <img
              class="rating__item"
              v-for="n in 5"
              :src="Math.floor(course.rating) >= n ? 'full-star.svg' : 'empty-star.svg'"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="courses__nav">
      <button
        class="courses__nav-button"
        :class="{
          'courses__nav-button--disabled': courseIndex < 10
        }"
        :disabled="courseIndex < 10"
        @click="prevPage"
      >
        ◄ prev
      </button>
      <button
        class="courses__nav-button"
        :class="{
          'courses__nav-button--disabled': coursesList.length - courseIndex < 10
        }"
        :disabled="coursesList.length - courseIndex < 10"
        @click="nextPage"
      >
        next ►
      </button>
    </div>
  </div>
</template>

<script setup>
import { getCourses } from '../scripts/coursesAPI';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { ref, computed } from 'vue';
import Hls from 'hls.js/dist/hls.min';

//variables for courses and pagination
const coursesLoading = ref(true);
const courseIndex = ref(0);
const coursesList = ref([]);

// get courses from API
async function fillCourses() {
  const res = await getCourses();
  coursesList.value = res.courses;
  coursesLoading.value = false;
}
fillCourses();

// display 10 at once
const getCoursePage = computed(() => {
  return coursesList.value.slice(courseIndex.value, courseIndex.value + 10);
});

// show video when cursor goes on an individual course
function displayVideo(course, event) {
  // hide the preview image and display video element
  event.target.children[0].children[0].style.display = 'block';
  event.target.children[0].children[1].style.display = 'none';

  try {
    //load video via HLS
    let hls = new Hls();
    hls.loadSource(course.meta.courseVideoPreview.link);
    hls.attachMedia(event.target.children[0].children[0]);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });

    //Error handling in case video is absent
    hls.on(Hls.Events.ERROR, function (e, data) {
      let errorType = data.type;
      let errorDetails = data.details;
      let errorFatal = data.fatal;

      switch (data.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
          // create an img element that says video is unavailable and append it
          event.target.children[0].children[0].style.display = 'none';
          let img = document.createElement('img');
          img.classList.add('course__image');
          img.classList.add('novideo');
          // img.style.zIndex = -1;
          img.src = 'video_unavailable.png';
          event.target.children[0].appendChild(img);
          break;
        default:
          break;
      }
    });
  } catch (error) {
    // create an img element that says video is unavailable and append it
    event.target.children[0].children[0].style.display = 'none';
    let img = document.createElement('img');
    img.classList.add('course__image');
    img.classList.add('novideo');
    // img.style.zIndex = -1;
    img.src = 'video_unavailable.png';
    event.target.children[0].appendChild(img);
  }
}

// hide the video when cursor goes off an individual course
function hideVideo(event) {
  // hide the video and show preview again
  event.target.children[0].children[1].style.display = 'block';
  event.target.children[0].children[0].style.display = 'none';

  //remove image element if video was not loaded
  let noVideoImage = document.getElementsByClassName('novideo');
  for (let i = 0; i < noVideoImage.length; i++) {
    noVideoImage[i].remove();
  }
}

function nextPage() {
  courseIndex.value += 10;
}
function prevPage() {
  courseIndex.value -= 10;
}
</script>

<style>
.logo {
  display: flex;
  align-items: center;
}

.logo:hover {
  cursor: pointer;
}

.logo:hover > .logo__text {
  color: white;
}

.logo__icon {
  width: 1.5rem;
  height: 1.5rem;

  padding: 0.5rem;
  margin-right: 1rem;

  background-color: rgba(127, 86, 218, 1);
  border-radius: 5px;
}

.logo__text {
  font-size: 2em;
  font-weight: bold;
}

.info {
  /* background-image: url(studentbg.png);
  background-repeat: no-repeat;
  background-position: right 10% bottom;
  background-size: auto 90%;
  padding: 4rem 0; */
  position: relative;
}

.info__image {
  position: absolute;
  height: 45vh;
  right: 5%;
  z-index: -1;
}

.info__heading {
  max-width: 50%;
}

.info__heading-title {
  font-size: 3.5em;
}

.info__description {
  color: var(--clr-text-accent);
}

.info__scroll {
  font-size: 5em;
  text-align: center;
  margin: 3rem 0 1rem 0;

  position: relative;
  top: 20px;
  animation: arrow-bounce 2s infinite;
}

@keyframes arrow-bounce {
  0% {
    top: 20px;
  }
  50% {
    top: 40px;
  }
  100% {
    top: 20px;
  }
}

.courses {
  margin-top: 3rem;
}

.courses__heading {
  font-size: 2.5em;
  position: relative;
}

.courses__list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.courses__item {
  flex-basis: 32.5rem;
  border: 2px solid rgba(83, 65, 127, 1);
  background-color: rgba(55, 26, 116, 1);
  border-radius: 20px;
  overflow: hidden;
}

.courses__item:hover {
  cursor: pointer;
  border: 2px solid rgb(122, 99, 179);
}

.course__image-container {
  min-height: 16.875rem;
  width: 100%;
  position: relative;
}

.course__image {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.course__description {
  padding: 2rem;
  text-align: center;
}

.play__btn {
  background-color: rgba(122, 102, 236, 1);
  color: white;
  border-radius: 50%;
  padding: 0.5rem 0.6rem;
  margin-right: 0.5rem;
  border: none;
}

.play__btn:hover {
  cursor: pointer;
}

.play__text {
  color: var(--clr-text-accent);
}

.course__lesson-tag {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course__tag {
  padding: 0.55rem 1.625rem;
  margin: 0;
  background-color: rgba(93, 71, 144, 1);
  border-radius: 30px;
}

.course__heading {
  font-size: 2em;
  margin: 1rem 0;
}

.course__free {
  margin: 0;
  padding: 1rem 0;
  border-top: 1px solid rgba(93, 71, 144, 1);
  border-bottom: 1px solid rgba(93, 71, 144, 1);
}

.rating {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.rating__item {
  width: 2rem;
  height: 2rem;
}
.course__rating {
  margin-top: 1rem;
}

.courses__nav {
  margin: 2rem 0;
  display: flex;
  justify-content: space-evenly;
}

.courses__nav-button {
  background-color: blueviolet;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
  border-radius: 20px;
  padding: 0.75rem 2rem;
  margin-right: 0.5rem;
  border: none;
}

.courses__nav-button--disabled {
  background-color: rgb(99, 99, 99);
}

.courses__nav-button:hover:not(.courses__nav-button--disabled) {
  background-color: rgba(122, 102, 236, 1);
  cursor: pointer;
}

@media screen and (max-width: 75em) {
  .info__heading-title {
    font-size: 2em;
  }
}

@media screen and (max-width: 62.5em) {
  .info,
  .courses {
    text-align: center;
  }
  .info__image,
  .info__scroll {
    display: none;
  }
  .info__heading {
    max-width: 100%;
  }
}

@media screen and (max-width: 32.5em) {
  .courses__item {
    flex-basis: 100%;
  }

  .course__image-container {
    min-height: 10rem;
  }

  .course__heading {
    font-size: 1.5em;
  }
}
@media screen and (max-width: 26em) {
  .course__lesson-tag {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
