<template>
  <li :class="className" @click="onClick"></li>
</template>

<script>
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
    onClick() {
      this.$store.dispatch('squareClick', this.square);
    }
  }
}
</script>
