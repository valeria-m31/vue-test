<template>
  <v-dialog :value="value" persistent max-width="600px">
    <v-card>
      <form @submit.prevent="addContact">
        <v-card-title>
          <span>Добавление пользователя</span>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="close"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-container class="dialog-field">
            <div>
              <span>Имя</span>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                hide-details="auto"
              ></v-text-field>
            </div>
            <div>
              <span>Телефон</span>
              <v-text-field
                v-model="number"
                :rules="phoneRules"
                v-mask="'+# ### ### ## ##'"
              ></v-text-field>
            </div>
            <div>
              <span>Начальник</span>
              <v-autocomplete
                v-model="supervisor"
                item-text="name"
                item-value="id"
                :items="items"
              ></v-autocomplete>
            </div>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn type="submit" class="generic-btn">
            Сохранить
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: "ContactDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    }
  },
  data: () => ({
    name: null,
    number: null,
    supervisor: null,

    nameRules: [
      value => !!value || 'Укажите имя',
    ],
    phoneRules: [
      value => !!value || 'Укажите номер телефона.',
      value => (value && value.length === 16) || 'Номер должен состоять из 11-ти цифр',
    ]
  }),
  validations: {
    name: { required },
    number: { minLength: minLength(16), required }
  },
  methods: {
    addContact() {
      if (this.$v.number.$invalid || this.$v.name.$invalid) {
        return
      } else {
        this.$emit('save', {
          id: new Date().getTime(),
          name: this.name,
          number: this.number,
          supervisor: this.supervisor,
        })
        this.close()
        }
    },

    close() {
      this.$emit('close-dialog')
      this.supervisor = null
      this.name = null
      this.number = null
    }
  }
}
</script>

<style scoped>

</style>
