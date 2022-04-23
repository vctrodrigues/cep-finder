<template>
  <div class="app-home">
    <div class="app-container">
      <div class="app-row app-align--center app-bb app-pb--xxs app-mb--xxs">
        <label class="app-mr--micro" for="cep">
          <span class="app-mr--nano">Pesquisar endereço:</span>
          <input
            v-model="cep"
            v-mask="'#####-###'"
            type="text"
            id="cep"
            placeholder="CEP"
            @keydown.enter="load"
          />
        </label>
        <button
          :class="{ 'app-button--disabled': !isValid }"
          @click="isValid ? load : false"
        >
          Pesquisar
        </button>
        <transition name="fade" appear>
          <span v-if="msg" class="app-ml--xxs">{{ msg }}</span>
        </transition>
      </div>
      <div class="app-row">
        <app-table :headers="headers" :items="locations">
          <template #body-actions="{ item }">
            <button class="app-button--error" @click="remove(item.cep)">
              Deletar
            </button>
          </template>
        </app-table>
      </div>
    </div>
  </div>

  <app-alert v-if="removedCep" warning @close="closeAlert">
    <div class="app-row">
      <span class="app-mr--micro">O cep "{{ removedCep }}" foi removido</span>
      <a href="" @keydown.enter="undoRemove" @click.prevent="undo">
        Desfazer
      </a>
    </div>
  </app-alert>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useLocation } from '@/services/location';
import { useLocationStore } from '@/stores/location';
import AppTable from '@/components/AppTable.vue';
import AppAlert from '@/components/AppAlert.vue';

const headers = computed(() => [
  {
    name: 'Rua',
    value: 'street',
  },
  {
    name: 'CEP',
    value: 'cep',
  },
  {
    name: 'Cidade',
    value: 'city',
  },
  {
    name: 'Estado',
    value: 'state',
  },
  {
    name: 'Complemento',
    value: 'complement',
  },
  {
    name: 'Ações',
    value: 'actions',
  },
]);

const removedCep = ref('');
const msg = ref('');
const cep = ref('');
const timeouts = ref({
  msgTimeout: -1,
  alertTimeout: -1,
});

const isValid = computed(() => !!cep.value);

const { getLocation } = useLocation();
const route = useRoute();

const { locations } = storeToRefs(useLocationStore());
const { addLocation, removeLocation, undoRemove } = useLocationStore();

function closeAlert() {
  removedCep.value = '';
}

function printMessage(_msg: string) {
  msg.value = _msg;
  cep.value = '';

  clearTimeout(timeouts.value.msgTimeout);

  timeouts.value.msgTimeout = setTimeout(() => {
    msg.value = '';
  }, 3000);
}

function load() {
  if (locations.value.some(({ cep: _cep }) => _cep === cep.value)) {
    printMessage(`CEP "${cep.value}" já cadastrado.`);
    return;
  }

  if (!cep.value) {
    printMessage('Você precisa digitar um CEP primeiro.');
    return;
  }

  getLocation(cep.value)
    .then(({ data }) => {
      if (data.erro) {
        printMessage(`CEP "${cep.value}" inválido`);
        return;
      }

      const {
        logradouro: street,
        localidade: city,
        uf: state,
        complemento: complement,
      } = data;

      addLocation({
        cep: data.cep,
        street,
        city,
        state,
        complement,
      });

      printMessage('Endereço adicionado com sucesso.');
    })
    .catch((err) => {
      console.error(err);
      printMessage(`Erro ao adicionar ${cep.value}`);
    });
}

function remove(_cep: string) {
  removeLocation(_cep);
  removedCep.value = _cep;

  clearTimeout(timeouts.value.alertTimeout);

  timeouts.value.alertTimeout = setTimeout(closeAlert, 3000);
}

function undo() {
  undoRemove();
  closeAlert();
}

onMounted(() => {
  cep.value = (route.params.cep as string) || '';

  if (cep.value) {
    load();
  }
});
</script>

<style lang="scss" scoped>
.app-home {
  display: flex;
  flex-direction: column;

  padding: var(--app-size--xxs);
  padding-top: var(--app-size--huge);
}
</style>
