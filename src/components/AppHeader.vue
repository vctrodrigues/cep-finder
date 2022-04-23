<template>
  <nav class="app-header">
    <img src="@/assets/logo.png" alt="logo" class="app-mr--micro"/>
    <h3>CEP Finder</h3>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--app-size--micro) var(--app-size--none);

  z-index: 9;
  position: fixed;
  background-color: var(--app-color-white);

  img {
    height: var(--app-size--sm);
  }
}
</style>
