<template>
  <div>
    <div :style="indent" @click="toggleChildren" class="label-wrapper">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td class="icon-plus">
                <v-icon v-if="children.length">mdi-plus</v-icon>
              </td>
              <td>{{name}}</td>
              <td class="phone">{{number}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <template v-if="hasChildren">
      <tree-menu
        v-for="(child, index) in children"
        v-bind:key="index"
        :children="child.children"
        :name="child.name"
        :number="child.number"
        :depth="depth + 1"
      >
      </tree-menu>
    </template>
  </div>
</template>
<script>
  export default {
    props: ['name', 'number', 'children', 'depth'],
    name: 'tree-menu',

    data: () => ({
      hasChildren: false
    }),

    computed: {
      indent() {
        return { padding: `0 0 0 ${(this.depth + 1) * 20}px` }
      }
    },

    methods: {
      toggleChildren() {
        this.hasChildren = !this.hasChildren;
      }
    }
  }
</script>

<style scoped>

</style>
