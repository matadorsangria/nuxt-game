import { configure, addDecorator, addParameters } from '@storybook/vue'
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import Vue from 'vue';
import Vuex from 'vuex'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '../assets/css/main.scss';

Vue.use(Vuex)
Vue.use(Vuetify);

addDecorator(() => {
  return {
    template: `<story/>`,
    store: new Vuex.Store({
      state: {
        scene: 'movefocus',
        turn: 0,
        board: [
          {
            id: 1,
            personId: 1,
            x: 1,
            y: 1,
            direction: 1,
            width: 160,
            style: {
              width: '160px',
              height: '160px'
            }
          }
        ]
      },
      actions: {
        moveFocus: () => {},
        setPeople: () => {},
        sound: () => {},
        squareClick: () => {}
      }
    })
  }
})

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  },
});

configure(require.context('../stories', true, /\.stories\.js$/), module);