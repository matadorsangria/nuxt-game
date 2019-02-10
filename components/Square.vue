<template>
  <li :class="className" @click="onClick"></li>
</template>

<script>
export default {
  name: 'Square',
  computed: {
    className: function() {
      return this.square.layer;
    }
  },
  props: ['square'],
  methods: {
    onClick: function() {
      this.$store.dispatch('squareClick', this.square);
    }
  }
}
</script>
