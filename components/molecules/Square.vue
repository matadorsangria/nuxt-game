<template>
  <li :class="className" @click="onClick"></li>
</template>

<script lang="ts">
import { Square } from 'original'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { mapActions } from 'vuex'

@Component({
  methods: {
    ...mapActions(['squareClick'])
  }
})
export default class SquareVue extends Vue {
  squareClick!: (square: Square) => void

  @Prop({type: Object, required: true})
  square!: Square
  
  get className() {
    return this.square.layer;
  }

  onClick() {
    this.squareClick(this.square);
  }
}
</script>
