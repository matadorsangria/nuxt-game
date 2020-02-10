<template>
  <button @click="onClick(level)">{{ level.toUpperCase() }}</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    level: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(['sound', 'setPeople']),
    onClick(level) {
      this.$emit('defaultOverlayHide');
      this.sound('bgm');
      this.setPeople(level);
    }
  }
}
</script>
