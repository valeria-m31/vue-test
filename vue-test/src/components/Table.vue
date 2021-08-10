<template>
  <v-container>

    <div class="table-toolbar">
      <v-btn @click="openDialog" class="generic-btn">Добавить</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="getContactsTree"
      :expanded.sync="expanded"
      :hide-default-footer="true"
      item-key="name"
      show-expand
      class="elevation-1"
      @update:sort-by="sortBy"
      @update:sort-desc="sortDesc"
    >
      <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
        <v-icon v-if="item.children.length" @click="expand(!isExpanded)">mdi-plus</v-icon>
      </template>

      <template v-slot:expanded-item="{ item }" id="app" class="expand-menu">
        <td :colspan="headers.length + 1" style="padding:0">
          <div v-for="(i, index) in item.children" v-bind:key="index">
            <tree-menu :name="i.name" :number="i.number" :children="i.children" :depth="0"></tree-menu>
          </div>
        </td>
      </template>
    </v-data-table>

    <contact-dialog v-model="isDialog" @save="save" @close-dialog="closeDialog" :items="contacts"/>
  </v-container>
</template>

<script>
import ContactDialog from './ContactDialog';
import TreeMenu from './TreeMenu';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  name: 'Table',
  components: {ContactDialog, TreeMenu},

  data: () => ({
    expanded: [],
    isDialog: false,
    headers: [
      {text: 'Имя', value: 'name'},
      {text: 'Номер', value: 'number'}
    ],
  }),

  async created() {
    await this.getContacts()
  },

  computed: {
    ...mapGetters(['getContactsTree']),
    ...mapState({
      contacts: state => state.contacts.contacts
    }),
  },

  methods: {
    ...mapActions(['createContact', 'getContacts']),
    ...mapMutations(['setSortBy', 'setSortDesc']),

    openDialog() {
      this.isDialog = true
    },

    closeDialog() {
      this.isDialog = false
    },

    async save(data) {
      await this.createContact(data)
    },

    sortBy(value) {
      this.setSortBy(value[0])
    },

    sortDesc(value) {
      this.setSortDesc(value[0])
    }
  }
}
</script>

<style>

</style>
