import { withInfo } from 'storybook-addon-vue-info'

export default {
  title: 'VButton',
  decorators: [withInfo],
  parameters: {
    info: {},
    notes: 'This uses Vuetify.'
  }
}

export const SignOut = () => ({
  template: `<v-btn>SignOut</v-btn>`
})

export const Retry = () => ({
  template: `<v-btn>Retry</v-btn>`
})