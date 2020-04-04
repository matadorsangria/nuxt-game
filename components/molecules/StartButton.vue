<template>
  <v-btn :color="colorObj[level]" @click="onClick(level)">{{ level.toUpperCase() }}</v-btn>
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
  data() {
    return {
      colorObj: {
        easy: 'green',
        normal: 'yellow',
        hard: 'red'
      }
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
