<template>
  <div v-if="isAuth">
    <div class="stage">
      <Board />
      <People />
    </div>
    <div class="overlay default" ref="defaultOverlay">
      <div>
        <p class="v-application">
          <StartButton
            v-for="level in levels"
            :key="level"
            :level="level"
            @defaultOverlayHide="defaultOverlayHide"
          />
        </p>
        <p class="sound-alert">※音が出ますのでご注意ください</p>
        <v-btn @click="firebaseSignOut">サインアウト</v-btn>
      </div>
    </div>
    <div class="overlay restart">
      <div>
        <p>
          <v-btn @click="reload">やり直す</v-btn>
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import 'firebaseui-ja/dist/firebaseui.css';
import Board from '~/components/organisms/Board.vue'
import People from '~/components/organisms/People.vue'
import StartButton from '~/components/molecules/StartButton.vue'

export default {
  components: { Board, People, StartButton },
  data: () => ({
    isAuth: false
  }),
  computed: mapGetters(['levels']),
  created(){
    this.firebaseSignIn().then(user => {
      if (user !== null) {
        this.isAuth = true;
        this.setUserId(user.uid);
        this.setBoard();
      } else {
        this.isAuth = false;
        this.showLoginForm();
      }
    });
  },
  methods: {
    ...mapActions([ 'firebaseSignIn', 'firebaseSignOut', 'setUserId', 'setBoard', 'showLoginForm' ]),
    defaultOverlayHide() {
      this.$refs.defaultOverlay.style.display = 'none';
    },
    reload() {
      location.reload();
    }
  }
}
</script>


<style scoped lang="scss">
.stage {
  position: relative;
  background: url(~assets/burned.gif) no-repeat 0 -5000px;

  @media screen and (max-width:640px) {
    transform: scale(0.4);
  }
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

  &.restart {
    display: none;
  }
  button {
    margin: 0 10px;
  }
  .sound-alert {
    padding: 10px 0 20px;
  }
}
</style>
