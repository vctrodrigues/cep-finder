<template>
  <teleport to=".app-alert-wrap">
    <transition name="slide-up" appear>
      <div :class="classes">
        <font-awesome-icon
          class="app-alert__close app-mr--micro"
          icon="times"
          size="lg"
          @click="emit('close')"
        />
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

const emit = defineEmits<{ (e: 'close'): void }>();

const props = defineProps<{
  error?: boolean;
  warning?: boolean;
}>();

const classes = computed(
  () =>
    `app-alert app-row app-align--center app-alert--${
      props.error ? 'error' : props.warning ? 'warning' : 'success'
    }`,
);
</script>

<style lang="scss" scoped>
.app-alert {
  padding: var(--app-size--xxs) var(--app-size--xs);
  width: 360px;
  max-width: calc(100% - var(--app-size--xxs));

  position: fixed;
  z-index: 2;

  bottom: var(--app-size--xxs);
  left: 50%;
  margin-left: -180px;

  border-radius: var(--app-size--micro);

  .app-alert__close {
    cursor: pointer;
  }

  &.app-alert--error {
    background-color: var(--app-color-error-light);
    border: 1px solid var(--app-color-error-dark);
  }

  &.app-alert--warning {
    background-color: var(--app-color-warning);
    border: 1px solid var(--app-color-warning-dark);
  }

  &.app-alert--success {
    background-color: var(--app-color-success);
    border: 1px solid var(--app-color-success-dark);
  }
}
</style>
