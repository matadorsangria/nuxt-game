<template>
  <article
    :class="{hover:isHover}"
    :style="styleArticle"
    @mouseenter="isHover = !isHover"
    @mouseleave="isHover = !isHover"
  >
    <p :class="person.classP" :style="styleP"><span :style="person.styleSpan"></span></p>
    <div class="person_hp" :style="person.styleHP">
      <div class="person_hp_indicator" :style="styleIndicator"></div>
    </div>
    <div class="person_info">
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{{ person.name }}</td>
          </tr>
          <tr>
            <th>HP</th>
            <td>{{ person.hp }} / {{ person.maxhp }}</td>
          </tr>
          <tr>
            <th>Distance</th>
            <td>{{ person.move }}</td>
          </tr>
          <tr>
            <th>Attack</th>
            <td>{{ person.power }}</td>
          </tr>
          <tr>
            <th>Range</th>
            <td>{{ person.attack }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    person: {
      type: Object,
      required: true
    },
    board: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      isHover: false
    };
  },
  computed: {
    styleArticle() {
      return {
        left : this.calcPosition(this.person.x),
        top  : this.calcPosition(this.person.y)
      }
    },
    styleP() {
      const personWidth = this.person.width;
      return {
        width : personWidth + 'px',
        height: personWidth + 'px',
        transform: `rotateY(${this.person.direction === 'right' ? 0 : 180}deg)`
      }
    },
    styleIndicator() {
      return {
        width : this.person.hp / this.person.maxhp * 100 + '%',
        backgroundColor : (this.person.hp / this.person.maxhp > 0.3) ? 'lime' : 'red'
      }
    }
  },
  created(){
    if(this.person.id === 1){
      this.moveFocus(this.person);
    }
  },
  methods: {
    ...mapActions(['moveFocus']),
    calcPosition(pos) {
      const squareWidth = this.board[0].width;
      return pos * squareWidth - (squareWidth + this.person.width - 1) / 2 + 'px';
    }
  }
}
</script>


<style scoped>
article {
position: absolute;
transition: all 0.6s;
}
article.hover {
z-index:100;
}
.stage .board.turn0 + .people article.current p span {
animation: current 0.7s linear infinite;
}
@keyframes current {
  0% { transform: translateY(0); }
  10% { transform: translateY(-1px);  }
  30% { transform: translateY(-2px); }
  50% { transform: translateY(-3px); }
  70% { transform: translateY(-2px); }
  90% { transform: translateY(-1px);  }
  100% { transform: translateY(0);  }
}
article p {
position: absolute;
margin: 0;
transition: transform 0.3s ease-out;
}
article p span {
display: block;
width: 100%;
height: 100%;
background-repeat: no-repeat;
}
article p.pengin span {
background-image:url(~assets/pengin.png);
}
article p.enemy1 span {
background-image:url(~assets/enemy1.png);
}
article p.enemy2 span {
background-image:url(~assets/enemy2.png);
}
article p.enemy3 span {
background-image:url(~assets/enemy3.png);
}
article.attacked p span {
animation: shake 0.3s linear;
}
@keyframes shake {
  0% { transform: translate(3px, 2px) rotate(0deg); }
  10% { transform: translate(-2px, -3px) rotate(-1deg); }
  20% { transform: translate(-4px, 0px) rotate(1deg); }
  30% { transform: translate(0px, 3px) rotate(0deg); }
  40% { transform: translate(2px, -2px) rotate(1deg); }
  50% { transform: translate(-2px, 3px) rotate(-1deg); }
  60% { transform: translate(-4px, 2px) rotate(0deg); }
  70% { transform: translate(3px, 2px) rotate(-1deg); }
  80% { transform: translate(-2px, -2px) rotate(1deg); }
  90% { transform: translate(2px, 4px) rotate(0deg); }
  100% { transform: translate(2px, -3px) rotate(-1deg); }
}
article.burned p {
position: relative;
animation: burn 1.6s linear;
}
article.burned p::after {
content: "";
display: block;
position: absolute;
left: -30px;
top: -30px;
width: 160px;
height: 160px;
background: url(~assets/burned.gif) no-repeat 0 0;
background-size: 160px 160px;
animation: burnP 1.6s linear;
}
@keyframes burn {
  0% { filter: brightness(100%); }
  100% { filter: brightness(20%); }
}
@keyframes burnP {
  0% { opacity: 0.6; }
  100% { opacity: 0.3; }
}
article.dead {
animation: die 0.3s linear forwards;
}
article.burnDead {
animation: die 1.6s linear forwards;
}
@keyframes die {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
article .person_hp {
position: absolute;
left: 0;
top: -15px;
width: 50px;
border: 1px solid #666;
background: #fff;
opacity: 1;
}
article.dead .person_hp {
animation: dieHP 0.3s linear forwards;
}
article.burnDead .person_hp {
animation: dieHP 1.6s linear forwards;
}
@keyframes dieHP {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
article .person_hp_indicator {
overflow: hidden;
height: 3px;
transition: all 0.3s;
}
article .person_info {
visibility: hidden;
opacity: 0;
position: absolute;
left: 40px;
bottom: 4px;
background: #fff;
white-space: nowrap;
font-size: 14px;
cursor: default;
transition: opacity 0.3s;
transition-delay: 0.8s;
}
article.hover .person_info {
visibility: visible;
opacity: 1;
box-shadow:1px 1px 4px rgba(0, 0, 0, .5);
font-family: 'Avenir', sans-serif;
}
article .person_info table {
width: 160px;
border-collapse: collapse;
}
article .person_info th,
article .person_info td {
padding: 4px;
border:1px solid #999;
text-align:left;
}
article .person_info th {
width: 1%;
padding-right: 10px;
white-space: nowrap;
font-weight: normal;
}
</style>
