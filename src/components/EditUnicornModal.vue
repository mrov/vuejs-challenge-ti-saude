<template>
  <q-dialog v-model="showModal">
    <q-card style="min-width: 350px; padding: 10px 25px">
      <h5 v-if="isEditMode" style="margin: 10px 0px">Edit {{ name }}</h5>
      <h5 v-if="!isEditMode" style="margin: 10px 0px">Create Unicorn</h5>
      <q-separator />
      <q-card-section class="q-pt-lg q-pb-lg">
        <q-form @submit.prevent="submitForm">
          <q-input v-model="name" label="Name" :rules="nameRules"></q-input>
          <q-input v-model="age" label="Age" :rules="ageRules"></q-input>
          <q-input v-model="colour" label="Color" :rules="colorRules"></q-input>
          <q-card-actions align="right">
            <q-btn label="Cancel" color="negative" @click="hideModal"></q-btn>
            <q-btn type="submit" label="Save" color="positive"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, onUpdated, reactive, ref, Ref, toRefs } from 'vue';
import UnicornService from '../services/UnicornService';
export default defineComponent({
  name: 'EditUnicornModal',

  props: {
    openModal: Boolean,
    // Object of type IUnicorn
    unicorn: { type: Object },
    isEditMode: Boolean,
  },

  setup(props, { emit }) {
    let state = reactive({ showModal: false });

    let unicorn = {
      name: ref('') as Ref,
      age: ref('') as Ref,
      colour: ref('') as Ref,
    };

    const nameRules = [(val: string) => !!val || 'Name is required'];
    const ageRules = [
      (val: string) => !!val || 'Age is required',
      (val: string) => /^\d+$/.test(val) || 'Age must be a number',
    ];
    const colorRules = [(val: string) => !!val || 'color is required'];

    const clearForm = () => {
      unicorn.name.value = '';
      unicorn.age.value = '';
      unicorn.colour.value = '';
    };

    const submitForm = async () => {
      if (props.isEditMode) {
        await UnicornService.updateUnicorn({
          _id: props.unicorn?._id,
          name: unicorn.name.value,
          age: unicorn.age.value,
          colour: unicorn.colour.value,
        });
      } else {
        await UnicornService.createUnicorn({
          name: unicorn.name.value,
          age: unicorn.age.value,
          colour: unicorn.colour.value,
        });
      }
      clearForm();
      emit('submit');
    };

    const hideModal = () => {
      state.showModal = false;
      emit('close');
    };

    onUpdated(() => {
      state.showModal = props.openModal;
      if (props.isEditMode) {
        unicorn.name.value = props.unicorn?.name;
        unicorn.age.value = props.unicorn?.age;
        unicorn.colour.value = props.unicorn?.colour;
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(unicorn),
      nameRules,
      ageRules,
      colorRules,
      submitForm,
      hideModal,
    };
  },
});
</script>
