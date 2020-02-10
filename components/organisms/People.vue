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
import { mapState } from 'vuex'
import Person from '~/components/molecules/Person.vue'

export default {
  components: { Person },
  computed: mapState(['people', 'board'])
}
</script>
