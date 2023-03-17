<template>
  <div class="container">
    <header class="header">
      <div class="header__logo logo">
        <img class="logo__icon" src="logoicon.svg" alt="Logo, link to home page" />
        <span class="logo__text">EduCator</span>
      </div>
      <div class="header__account">
        <button class="header__account-btn">Login</button>
        <button class="header__account-btn">Sign up</button>
      </div>
    </header>
    <div class="info">
      <div class="info__heading">
        <h1><span class="text-purple">Best courses</span> are waiting to enrich your skill</h1>
        <p class="info__description">
          Provides you with the latest online learning system and material that help your knowledge
          growing.
        </p>
      </div>
    </div>
    <div class="courses">
      <div class="courses__header">
        <h2 class="courses__heading"><span class="text-purple">Discover new</span> courses</h2>
        <!-- <button class="courses__advanced-filter">
          <img src="filter.svg" alt="" />
        </button> -->
      </div>
      <div class="courses__list">
        <div class="course courses__item">
          <div class="course__image-container">
            <img class="course__image" src="courseph.jpg" alt="Course image" />
            <!-- <video class="course__image" src="coursevidph.mp4" autoplay muted></video> -->
          </div>
          <div class="course__description">
            <div class="course__lesson-tag">
              <div class="play">
                <button class="play__btn">►</button>
                <span class="play__text">10 lessons</span>
              </div>
              <p class="course__tag">Productivity</p>
            </div>
            <h3 class="course__heading">
              Python for Financial Analysis Next and Algorithmic Trading
            </h3>
            <p class="course__free">🔒 Contains paid lessons</p>
            <div class="rating course__rating">
              <img class="rating__item" src="full-star.svg" alt="" />
              <img class="rating__item" src="empty-star.svg" alt="" />
              <img class="rating__item" src="empty-star.svg" alt="" />
              <img class="rating__item" src="empty-star.svg" alt="" />
              <img class="rating__item" src="empty-star.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.header {
  padding-top: 2.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.header__account-btn {
  background-color: transparent;
  color: var(--clr-text-main);
  border: 2px solid white;
  border-radius: 50px;
  font-weight: bold;
  padding: 0.75rem 2rem;
}

.header__account-btn:hover {
  cursor: pointer;
  background-color: blueviolet;
  border-color: transparent;
}

.header__account-btn + .header__account-btn {
  margin-left: 1rem;
}

.info {
  background-image: url(studentbg.png);
  background-repeat: no-repeat;
  background-position: right 10% bottom;
  background-size: auto 90%;
  padding: 4rem 0;
}

.info__heading {
  max-width: 50%;
  font-size: 2em;
}
.info__description {
  color: var(--clr-text-accent);
  font-size: 0.5em;
}

.courses {
  margin-top: 3rem;
}

/* .courses__header {
  display: flex;
} */

.courses__heading {
  font-size: 2.5em;
  position: relative;
}

.courses__list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.courses__item {
  flex-basis: 32.5rem;
  border: 2px solid rgba(83, 65, 127, 1);
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
}

.course__description {
  padding: 2rem;
  background-color: rgba(55, 26, 116, 1);
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
  font-size: 2rem;
  margin: 1rem 0;
}

.course__free {
  margin: 0;
  padding: 1rem 0;
  border-top: 1px solid rgba(93, 71, 144, 1);
  border-bottom: 1px solid rgba(93, 71, 144, 1);
  text-align: center;
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
</style>
