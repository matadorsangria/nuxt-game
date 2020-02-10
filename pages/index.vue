<template>
  <div v-if="isAuth">
    <div class="stage">
      <board></board>
      <people></people>
    </div>
    <div class="overlay default" ref="defaultOverlay">
      <div>
        <p>
          <startButton
            v-for="level in levels"
            :key="level"
            :level="level"
            @defaultOverlayHide="defaultOverlayHide"
          ></startButton>
        </p>
        <p>※音が出ますのでご注意ください</p>
        <signOutButton></signOutButton>
      </div>
    </div>
    <div class="overlay restart">
      <div>
        <p>
          <restartButton></restartButton>
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import 'firebaseui-ja/dist/firebaseui.css';
import Board from '~/components/organisms/Board.vue'
import People from '~/components/organisms/People.vue'
import StartButton from '~/components/atoms/StartButton.vue'
import RestartButton from '~/components/atoms/RestartButton.vue'
import SignOutButton from '~/components/atoms/SignOutButton.vue'

export default {
  components: {
    'board': Board,
    'people': People,
    'startButton': StartButton,
    'restartButton': RestartButton,
    'signOutButton': SignOutButton
  },
  data: () => ({
    isAuth: false
  }),
  computed: mapGetters(['levels']),
  created(){
    this.$store.dispatch('firebaseSignIn').then(user => {
      if (user !== null) {
        this.isAuth = true;
        this.$store.dispatch('setUserId', user.uid);
        this.$store.dispatch('setBoard');
      } else {
        this.isAuth = false;
        this.$store.dispatch('showLoginForm');
      }
    });
  },
  methods: {
    defaultOverlayHide() {
      this.$refs.defaultOverlay.style.display = 'none';
    }
  }
}
</script>


<style scoped>
.stage {
position: relative;
background: url(~assets/burned.gif) no-repeat 0 -5000px;
}
.overlay {
position: fixed;
left: 0;
top: 0;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
background-color: #fff;
text-align: center;
}
.overlay button {
margin: 0 5px;
}
.overlay.restart {
display: none;
}
</style>
