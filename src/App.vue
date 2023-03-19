<script setup></script>

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

    <router-view></router-view>
  </div>
</template>

<style>
.header {
  padding-top: 2.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

@media screen and (max-width: 32.5em) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
}
@media screen and (max-width: 19.75em) {
  .header__account {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .header__account-btn + .header__account-btn {
    margin: 0;
  }
}
</style>
