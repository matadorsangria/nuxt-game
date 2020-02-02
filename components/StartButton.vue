<template>
  <button @click="onClick(level)">{{ level.toUpperCase() }}</button>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick(level) {
      this.$emit('defaultOverlayHide');
      this.$store.dispatch('sound', 'bgm');
      this.$store.dispatch('setPeople', level);
    }
  }
}
</script>
