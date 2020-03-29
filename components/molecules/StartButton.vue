<template>
  <v-btn @click="onClick(level)" :color="colorObj[level]">{{ level.toUpperCase() }}</v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      colorObj: {
        easy: 'green',
        normal: 'yellow',
        hard: 'red'
      }
    }
  },
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
