export default function sort_array(contacts, sortBy, sortDesc) {
  if (sortDesc) {
    return contacts.sort((a,b) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0))
  } else {
    return contacts.sort((a,b) => (a[sortBy] < b[sortBy]) ? 1 : ((b[sortBy] < a[sortBy]) ? -1 : 0))
  }
}
