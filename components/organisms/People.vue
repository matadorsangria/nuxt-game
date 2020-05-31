<template>
  <div id="people" class="people">
    <Person
      v-for="person in people"
      :key="person.id"
      :person="person"
      :board="board"
      :class="person.class"
    />
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { mapState } from 'vuex'
import Person from '../molecules/Person.vue'

@Component({
  components: {
    Person
  },
  computed: {
    ...mapState(['people', 'board'])
  }
})
export default class PeopleVue extends Vue {}
</script>
