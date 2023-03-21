<template>
  <EditUnicornModal
    :openModal="showEditModal"
    :unicorn="selectedUnicorn"
    :isEditMode="isEditMode"
    @close="hideEditModal"
    @submit="
      () => {
        getUnicorns();
        hideEditModal();
      }
    "
  ></EditUnicornModal>
  <DeleteUnicornModal
    :openModal="showDeleteModal"
    :unicornId="selectedUnicorn._id"
    :unicornName="selectedUnicorn.name"
    @close="hideDeleteModal"
    @submit="
      () => {
        getUnicorns();
        hideDeleteModal();
      }
    "
  ></DeleteUnicornModal>
  <q-page class="row q-px-lg q-py-md">
    <div class="col-12">
      <q-table
        title="CRUD Unicorns"
        :columns="columns"
        :rows="unicorns"
        :separator="'horizontal'"
      >
        <template v-slot:body-cell-actions="scoped">
          <q-td class="text-center">
            <q-icon
              class="action-icon edit-icon"
              name="edit"
              style="text-align: center"
              @click="openEditModal(scoped.row)"
            />
            <q-icon
              class="action-icon delete-icon"
              name="delete"
              style="text-align: center"
              @click="openDeleteModal(scoped.row)"
            />
          </q-td>
        </template>
      </q-table>

      <ul>
        <li v-for="unicorn in unicorns" :key="unicorn._id">
          {{ unicorn._id }} - {{ unicorn.name }}
        </li>
      </ul>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="openEditModal()" />
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import UnicornService from '../services/UnicornService';
import EditUnicornModal from '../components/EditUnicornModal.vue';
import DeleteUnicornModal from '../components/DeleteUnicornModal.vue';
import { IUnicorn } from '../types/Unicorn';

export default defineComponent({
  name: 'IndexPage',
  components: {
    EditUnicornModal,
    DeleteUnicornModal,
  },
  setup() {
    let state = reactive({
      unicorns: [] as IUnicorn[],
      showEditModal: false as boolean,
      showDeleteModal: false as boolean,
      selectedUnicorn: {} as IUnicorn,
      isEditMode: false as boolean,
    });

    const columns = [
      {
        name: 'name' as string,
        align: 'left',
        label: 'Name' as string,
        field: 'name' as string,
      },
      {
        name: 'age' as string,
        align: 'left',
        label: 'Age' as string,
        field: 'age' as string,
      },
      {
        name: 'color' as string,
        align: 'left',
        label: 'Colour' as string,
        field: 'colour' as string,
      },
      {
        name: 'actions' as string,
        align: 'center',
        label: 'Actions' as string,
        field: 'actions' as string,
      },
    ];

    const getUnicorns = () => {
      UnicornService.getUnicorns().then((data: IUnicorn[]) => {
        state.unicorns = data;
      });
    };

    const clearSelectedUnicorn = () => {
      state.selectedUnicorn.name = '';
      state.selectedUnicorn.age = '';
      state.selectedUnicorn.colour = '';
    };

    // const submitForm = async () => {
    //   try {
    //     UnicornService.createUnicorn({
    //       name: state.name,
    //       age: state.age,
    //       color: state.color,
    //     }).then((data) => {
    //       console.log('Unicorn created:', data);
    //       getUnicorns();
    //     });
    //     // Clear form fields after successful submission
    //     clearForm();
    //   } catch (error) {
    //     console.error('Error creating unicorn:', error);
    //   }
    // };

    let openEditModal = (unicorn: IUnicorn | null = null) => {
      state.showEditModal = true;
      if (unicorn) {
        state.selectedUnicorn = { ...unicorn };
        state.isEditMode = true;
      }
    };

    let hideEditModal = () => {
      state.showEditModal = false;
      state.isEditMode = false;
      clearSelectedUnicorn();
    };

    let openDeleteModal = (unicorn: IUnicorn): void => {
      state.showDeleteModal = true;
      state.selectedUnicorn = { ...unicorn };
    };

    let hideDeleteModal = () => {
      state.showDeleteModal = false;
      clearSelectedUnicorn();
    };

    onMounted(() => {
      getUnicorns();
    });

    return {
      ...toRefs(state),
      columns,
      getUnicorns,
      // submitForm,
      openEditModal,
      hideEditModal,
      openDeleteModal,
      hideDeleteModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.action-icon {
  font-size: medium;
}

.edit-icon {
  color: $primary;
  margin-right: 12px;
  cursor: pointer;
}

.delete-icon {
  color: $negative;
  cursor: pointer;
}
</style>
