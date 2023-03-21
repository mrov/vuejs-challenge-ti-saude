<template>
  <q-dialog v-model="showModal">
    <q-card style="min-width: 350px; padding: 10px 25px">
      <h5 style="margin: 10px 0px">Delete {{ unicornName }}</h5>
      <q-separator />

      <q-card-section class="q-pt-lg q-pb-lg">
        <p>Are you sure that you want to delete {{ unicornName }} ?</p>
        <q-form @submit.prevent="submitForm">
          <q-card-actions align="right">
            <q-btn
              label="Cancel"
              color="white"
              text-color="black"
              @click="hideModal"
            ></q-btn>
            <q-btn type="submit" label="Delete" color="negative"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import UnicornService from 'src/services/UnicornService';
import { defineComponent, onUpdated, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'DeleteUnicornModal',
  props: {
    openModal: Boolean,
    // Object of type IUnicorn
    unicornId: String,
    unicornName: String,
    isEditMode: Boolean,
  },

  setup(props, { emit }) {
    let state = reactive({ showModal: false });

    const submitForm = async () => {
      if (props.unicornId) {
        await UnicornService.deleteUnicorn(props.unicornId);
      }
      emit('submit');
    };

    const hideModal = () => {
      state.showModal = false;
      emit('close');
    };

    onUpdated(() => {
      state.showModal = props.openModal;
    });

    return {
      ...toRefs(state),
      submitForm,
      hideModal,
    };
  },
});
</script>
