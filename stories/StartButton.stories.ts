import { withInfo } from 'storybook-addon-vue-info'
import StartButton from '../components/molecules/StartButton.vue';

export default {
  title: 'StartButton',
  decorators: [withInfo],
  parameters: {
    info: {},
    notes: 'This uses Vuetify.'
  }
}

export const Easy = () => ({
  components: { StartButton },
  template: `<p class="v-application"><start-button level="easy"></start-button></p>`
})

export const Normal = () => ({
  components: { StartButton },
  template: `<p class="v-application"><start-button level="normal"></start-button></p>`
})

export const Hard = () => ({
  components: { StartButton },
  template: `<p class="v-application"><start-button level="hard"></start-button></p>`
})
