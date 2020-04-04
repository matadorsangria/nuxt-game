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
  @Prop({type: String, required: true})
  level!: Level

  colorObj = {
    easy: 'green',
    normal: 'yellow',
    hard: 'red'
  }

  onClick(level: Level) {
    this.$emit('defaultOverlayHide');
    // @ts-ignore
    this.sound('bgm');
    // @ts-ignore
    this.setPeople(level);
  }
}
</script>
