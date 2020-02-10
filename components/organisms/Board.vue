<template>
  <div id="board" :class="`board turn${turn} scene_${scene}`">
    <ul :style="boardStyle">
      <square
        v-for="(square, index) in board"
        :key="index"
        :square="square"
        :style="square.style"
      ></square>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Square from '~/components/molecules/Square.vue'

export default {
  components: {
    'square': Square
  },
  computed: mapState(['board', 'boardStyle', 'turn', 'scene'])
}
</script>


<style scoped>
ul {
box-sizing: border-box;
display: flex;
flex-wrap: wrap;
border: 1px solid #999;
border-width: 0 1px 1px 0;
}
ul li {
box-sizing: border-box;
border: 1px solid #999;
border-width: 1px 0 0 1px;
}
ul li.current {
background: #ffd;
}
.scene_movefocus ul li.us,
.scene_movefocus ul li.enemy {
background: #eee;
}
.scene_movefocus ul li.focused {
background: #ddffff;
cursor: pointer;
}
.scene_movefocus ul li.focused:hover {
box-shadow:0px 0px 6px 3px #aff inset;
}
.scene_attackfocus ul li.focused {
background: #eee;
}
.scene_attackfocus.turn0 ul li.us {
background: #eee;
}
.scene_attackfocus.turn1 ul li.us {
background: #fdf;
}
.scene_attackfocus.turn0 ul li.enemy {
background: #fdf;
cursor: pointer;
}
.scene_attackfocus.turn1 ul li.enemy {
background: #eee;
}
.scene_attackfocus ul li.enemy:hover {
box-shadow:0px 0px 6px 3px #faf inset;
}
</style>
