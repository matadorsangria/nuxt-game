<template>
  <v-btn :color="colorObj[level]" @click="onClick(level)">{{ level.toUpperCase() }}</v-btn>
</template>

<script lang="ts">
import { Level } from 'original'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions(['sound', 'setPeople'])
  }
})
export default class StartButtonVue extends Vue {
  sound!: (filename: string) => void
  setPeople!: (level: Level) => void

  @Prop({type: String, required: true})
  level!: Level

  colorObj = {
    easy: 'green',
    normal: 'yellow',
    hard: 'red'
  }

  onClick(level: Level) {
    this.$emit('defaultOverlayHide');
    this.sound('bgm');
    this.setPeople(level);
  }
}
</script>
