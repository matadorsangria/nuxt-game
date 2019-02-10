<template>
  <div id="people" class="people">
    <person
      v-for="person in people"
      :key="person.id"
      :person="person"
      :board="board"
      :class="person.class"
    ></person>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Person from '~/components/Person.vue'

export default {
  computed: mapState(['people', 'board']),
  components: {
    'person': Person
  }
}
</script>
