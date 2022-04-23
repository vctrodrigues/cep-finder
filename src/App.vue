<template>
  <app-header />
  <router-view />
  <div class="app-alert-wrap"></div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue';
</script>

<style lang="scss" src="@/styles/main.scss"></style>
