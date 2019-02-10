<template>
  <div>
    <div class="stage">
      <board></board>
      <people></people>
    </div>
    <div class="overlay default">
      <div>
        <p>
          <startButton level="easy"></startButton>
          <startButton level="normal"></startButton>
          <startButton level="hard"></startButton>
        </p>
        <p>※音が出ますのでご注意ください</p>
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
</template>

<script>
import Board from '~/components/Board.vue'
import People from '~/components/People.vue'
import StartButton from '~/components/StartButton.vue'
import RestartButton from '~/components/RestartButton.vue'

export default {
  components: {
    'board': Board,
    'people': People,
    'startButton': StartButton,
    'restartButton': RestartButton
  },
  created: function(){
    this.$store.dispatch('setBoard');
  }
}
</script>


<style scoped>
.stage {
position: relative;
background: url(~/assets/burned.gif) no-repeat 0 -5000px;
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
