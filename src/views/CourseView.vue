<template>
  <div class="course-view" v-if="courseLoaded">
    <div class="course-view__display">
      <h2 class="course-view__heading">{{ courseInfo.title }}</h2>
      <video v-if="!videoAbsent" controls ref="videoPlayer" class="course-view__video"></video>
      <img v-else class="course-view__video" :src="getImagePlaceholder" />
      <h3 class="course-view__lesson-name">{{ courseInfo.lessons[currentLessonIndex].title }}</h3>
    </div>
    <div class="course-view__list course-list">
      <h3 class="course-list__heading">Course Content</h3>
      <div class="course-list__items">
        <div
          v-for="(lesson, index) in courseInfo.lessons"
          class="course-list__item"
          :class="{
            'course-list__item--active': currentLessonIndex === index,
            'course-list__item--locked': lesson.status === 'locked'
          }"
          @click="
            () => {
              if (lesson.status === 'unlocked') {
                currentLessonIndex = index;
                loadVideo();
              }
            }
          "
        >
          <h4 class="course-list__item-heading">{{ lesson.order + '. ' + lesson.title }}</h4>
          <div v-if="lesson.status === 'locked'" class="locked-overlay">🔒</div>
        </div>
      </div>
    </div>
  </div>
  <LoadingSpinner v-else></LoadingSpinner>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getCourse } from '../scripts/coursesAPI';
import Hls from 'hls.js/dist/hls.min';
import LoadingSpinner from '../components/LoadingSpinner.vue';
const props = defineProps({
  id: String
});
const courseInfo = ref({});
const courseLoaded = ref(false);
const videoAbsent = ref(false);
const videoPlayer = ref(null);

const currentLessonIndex = ref(0);

const getImagePlaceholder = computed(() => {
  return courseInfo.value.lessons[currentLessonIndex.value].previewImageLink + '.webp';
});

async function getCourseInfo() {
  courseInfo.value = await getCourse(props.id);
  loadVideo();
  courseLoaded.value = true;
}

function loadVideo() {
  try {
    //load video via HLS
    let hls = new Hls();
    hls.loadSource(courseInfo.value.lessons[currentLessonIndex.value].link);
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      console.log(courseInfo.value.lessons[currentLessonIndex.value].link);
      video.play();
    });

    //Error handling in case video is absent
    hls.on(Hls.Events.ERROR, function (e, data) {
      let errorType = data.type;
      let errorDetails = data.details;
      let errorFatal = data.fatal;

      switch (data.details) {
        case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
          videoAbsent.value = true;
          break;
        default:
          break;
      }
    });
  } catch (error) {
    videoAbsent.value = true;
  }
}

onMounted(() => {
  getCourseInfo();
});
</script>

<style>
.course-view {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 2rem;
}
.course-view__display {
  flex: 1;
}
.course-view__heading {
  font-size: 2em;
}
.course-view__lesson-name {
  font-size: 1.5em;
}
.course-view__video {
  aspect-ratio: 16/9;
  background-color: black;
  width: 100%;
}

.course-view__list {
  background: #4776e6; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #34106e, #183069);
  background: linear-gradient(to bottom, #34106e, #183069);
}
.course-list {
  text-align: center;
  min-width: 25%;
}
.course-list__heading {
  font-size: 2em;
}
.course-list__items {
  border-top: 2px solid #5d369c;
  height: 75vh;
  overflow-y: scroll;
}
.course-list__item {
  border-bottom: 2px solid white;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}
.course-list__item--active {
  background: #b263e0; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #5507d3, #4f0558);
  background: linear-gradient(to bottom, #5507d3, #4f0558);
}

.locked-overlay {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  font-size: 3em;
  line-height: 2em;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  text-align: center;
  vertical-align: middle;
}

.course-list__item-heading {
  font-size: 1.5em;
  margin: 0;
  padding: 2.5rem 0;
}

.course-list__item:hover:not(.course-list__item--active, .course-list__item--locked) {
  filter: brightness(120);
  cursor: pointer;
}

.course-list__item .course-list__item--locked:hover {
  filter: brightness(70);
  cursor: pointer;
}

.course-list__items::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 62.5em) {
  .course-view {
    flex-direction: column;
  }
}

@media screen and (max-width: 32.5em) {
}
@media screen and (max-width: 26em) {
}
</style>
