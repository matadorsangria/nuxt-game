<template>
  <li :class="className" @click="onClick"></li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    square: {
      type: Object,
      required: true
    }
  },
  computed: {
    className() {
      return this.square.layer;
    }
  },
  methods: {
    ...mapActions(['squareClick']),
    onClick() {
      this.squareClick(this.square);
    }
  }
}
</script>
