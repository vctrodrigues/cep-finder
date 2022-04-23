<template>
  <div class="app-table">
    <table>
      <thead>
        <tr>
          <th v-for="{ value, name } in props.headers" :key="`header-${value}`">
            <slot :name="`header-${value}`">
              {{ name }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in props.items" :key="`item-${index}`">
          <td
            v-for="{ value } in props.headers"
            :key="`body-${value}-${index}`"
          >
            <slot :name="`body-${value}`" :item="item">
              {{ item[value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface Header {
  name: string;
  value: string;
}

const props = defineProps<{
  headers: Header[];
  items: object[];
}>();
</script>

<style lang="scss" scoped>
.app-table {
  width: 100%;
}
</style>
