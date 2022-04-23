import { ref } from 'vue';
import { defineStore } from 'pinia';

interface Location {
  street?: string;
  city: string;
  state: string;
  complement: string;
  cep: string;
}

interface RemovedLocation {
  index: number;
  location: Location;
}

export const useLocationStore = defineStore('location', () => {
  const locations = ref<Location[]>([]);
  const removedLocations = ref<RemovedLocation[]>([]);

  function addLocation(location: Location) {
    locations.value.push(location);
  }

  function removeLocation(cep: string) {
    const removedIndex = locations.value.findIndex(({ cep: _cep }) => cep === _cep);
    removedLocations.value.push({ index: removedIndex, location: locations.value[removedIndex] });
    locations.value.splice(removedIndex, 1);
  }

  function undoRemove() {
    const lastRemoved = removedLocations.value.pop();

    if (lastRemoved) {
      locations.value.splice(lastRemoved.index, 0, lastRemoved.location);
    }
  }

  return {
    locations,
    addLocation,
    removeLocation,
    undoRemove,
  };
});
