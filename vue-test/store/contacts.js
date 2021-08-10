import list_to_tree from '../service/tree'
import sort_array from '../service/sort'

export default {
  state: {
    contacts: [],
    sortBy: null,
    sortDesc: false,
  },
  getters: {
    getContactsTree: state => {
      let contacts = state.contacts
      if (state.sortBy) {
        contacts = sort_array(state.contacts, state.sortBy, state.sortDesc);
      }
      let supervisors = list_to_tree(contacts)
      return supervisors
    },
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts
    },

    setSortBy(state, sortBy) {
      state.sortBy = sortBy
    } ,

    setSortDesc(state, sortDesc) {
      state.sortDesc = sortDesc
    }
  },
  actions: {
    initContacts({commit}) {
      return Promise.resolve()
          .then(() => {window.localStorage.setItem('contacts', JSON.stringify([]))})
          .then(() => {commit('setContacts', [])})
    },

    getContacts({ commit, dispatch }) {
      let contacts = []
      return Promise.resolve()
        .then(() => {contacts = window.localStorage.getItem('contacts')})
        .then(() => {
          if (contacts) {
            commit('setContacts', JSON.parse(contacts))
          } else {
            dispatch('initContacts')
          }
        })
    },

    async createContact({dispatch, state}, data) {
      let contactsArray = state.contacts;
      contactsArray.push(data)
      await window.localStorage.setItem('contacts', JSON.stringify(contactsArray));
      dispatch('getContacts')
    }
  }
}
