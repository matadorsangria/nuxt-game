<template>
  <div v-if="isAuth">
    <div class="stage">
      <Board />
      <People />
    </div>
    <div class="overlay default" ref="defaultOverlay">
      <div>
        <p>
          <StartButton
            v-for="level in levels"
            :key="level"
            :level="level"
            @defaultOverlayHide="defaultOverlayHide"
          />
        </p>
        <p>※音が出ますのでご注意ください</p>
        <button @click="firebaseSignOut">サインアウト</button>
      </div>
    </div>
    <div class="overlay restart">
      <div>
        <p>
          <button @click="reload">やり直す</button>
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
