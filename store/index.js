window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
const boardSize = [5, 4];

function getAvailableArr(state, p, scene) {
  const directionArr = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let availableArr = [];
  let availableObj = {};
  let distance = (scene === 'move') ? p.move : p.attack;
  for (let i = 0; i < distance; i++) {
    if(i === 0) {
      setAvailableObj(p.x, p.y);
    }else{
      availableArr.forEach((pos) => {
        setAvailableObj(pos[0], pos[1]);
      });
    }
    calcAvailable();
  }

  function setAvailableObj(startX, startY) {
    for (let j = 0; j < directionArr.length; j++) {
      let x = startX + directionArr[j][0],
        y = startY + directionArr[j][1];

      if(x > 0 && x <= boardSize[0] && y > 0 && y <= boardSize[1]) {
        if(!availableObj[x]) {
          availableObj[x] = {};
        }
        if(!availableObj[x][y]) {
          let person = getPersonFromSquare(state.people, getSquareFromPosition(state.board, x, y));
          if(person !== undefined){
            availableObj[x][y] = person.category ? 'enemy' : 'us';
          }else{
            availableObj[x][y] = 'focused';
          }
        }
      }
    }
    availableObj[p.x][p.y] = 'current';
  }

  function calcAvailable() {
    availableArr = [];
    Object.keys(availableObj).forEach((x) => {
      Object.keys(availableObj[x]).forEach((y) => {
        availableArr.push([Number(x), Number(y), availableObj[x][y]]);
      });
    });
  }

  return availableArr;
}

function getSquareFromPosition(board, x, y) {
  return board.filter((s) => s.x === x && s.y === y)[0];
}
function getSquareIndexFromPosition(board, x, y) {
  return board.findIndex((s) => s.x === x && s.y === y);
}
function getPersonFromId(people, id) {
  return people.filter((p) => p.id === id)[0];
}
function getPersonFromSquare(people, s) {
  return getPersonFromId(people, s.personId);
}
function getPersonIndexFromId(people, id) {
  return people.findIndex((p) => p.id === id);
}
function sound(filename) {
  // Audio 用の buffer を読み込む
  var getAudioBuffer = function(url, fn) {
    var req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';

    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          audioCtx.decodeAudioData(req.response, function(buffer) {
            // コールバックを実行
            fn(buffer);
          });
        }
      }
    };

    req.open('GET', url, true);
    req.send('');
  };

  // サウンドを再生
  var playSound = function(buffer) {
    if (audioCtx.state === 'closed') {
      audioCtx = null;
      audioCtx = new AudioContext();
    }
    // source を作成
    var source = audioCtx.createBufferSource();
    // buffer をセット
    source.buffer = buffer;
    // audioCtx に connect
    source.connect(audioCtx.destination);
    // 再生
    source.start(0);
  };

  getAudioBuffer('audio/' + filename + '.mp3', function(buffer) {
    playSound(buffer);
  });
}

export const state = () => ({
  board: [],
  boardStyle: {},
  people: [],
  currentPerson: 1,
  turn: 0,
  scene: 'movefocus',
  phase: 1,
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setBoard (state) {
    const squareWidth = 160;
    let board = [];
    for (let i = 1; i <= boardSize[1]; i++) {
      for (let j = 1; j <= boardSize[0]; j++) {
        board.push({
          x: j,
          y: i,
          layer: null,
          width: squareWidth,
          style: {
            width: squareWidth + 'px',
            height: squareWidth + 'px',
          }
        });
      }
    }
    state.board = board;
    state.boardStyle = {width: boardSize[0] * squareWidth + 1 + 'px'};
  },
  setPeople (state, level) {
    const personWidth = 100;
    const peopleData = {
      'easy' : [
        {id: 1, name: 'pengin', x: 1, y: 1, direction: 'right', category: 0, class: 'pengin', move: 4, attack: 3, hp: 200, power: 4, hover: false},
        {id: 2, name: 'enemy1', x: boardSize[0], y: boardSize[1], direction: 'left', category: 1, class: 'enemy1', move: 3, attack: 4, attackType: 'fire', hp: 10, power: 60, hover: false},
      ],
      'normal' : [
        {id: 1, name: 'pengin', x: 1, y: 1, direction: 'right', category: 0, class: 'pengin', move: 4, attack: 3, hp: 200, power: 4, hover: false},
        {id: 2, name: 'enemy1', x: boardSize[0], y: boardSize[1], direction: 'left', category: 1, class: 'enemy1', move: 3, attack: 4, attackType: 'fire', hp: 10, power: 60, hover: false},
        {id: 3, name: 'enemy2', x: boardSize[0] - 1, y: boardSize[1], direction: 'left', category: 1, class: 'enemy2', move: 3, attack: 2, hp: 5, power: 15, hover: false},
      ],
      'hard' : [
        {id: 1, name: 'pengin', x: 1, y: 1, direction: 'right', category: 0, class: 'pengin', move: 4, attack: 3, hp: 200, power: 4, hover: false},
        {id: 2, name: 'enemy1', x: boardSize[0], y: boardSize[1], direction: 'left', category: 1, class: 'enemy1', move: 3, attack: 4, attackType: 'fire', hp: 10, power: 60, hover: false},
        {id: 3, name: 'enemy2', x: boardSize[0] - 1, y: boardSize[1], direction: 'left', category: 1, class: 'enemy2', move: 3, attack: 2, hp: 5, power: 15, hover: false},
        {id: 4, name: 'enemy3', x: boardSize[0], y: boardSize[1] - 1, direction: 'left', category: 1, class: 'enemy3', move: 3, attack: 2, hp: 5, power: 15, hover: false},
      ],
    };
    const people = peopleData[level];
    people.forEach((p) => p.maxhp = p.hp );
    people.forEach((p) => {
      state.board.filter((s, index) => s.x === p.x && s.y === p.y)[0].personId = p.id;
      p.width = personWidth;
      p.classP = p.class;
      p.styleSpan = {
        backgroundSize: personWidth + 'px ' + personWidth + 'px',
      };
      p.styleHP = {
        width : personWidth + 'px'
      };
    });
    state.people = people;
  },
  moveFocus (state, person) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    state.people.forEach((p) => {
      p.class = [];
    });
    getAvailableArr(state, person, 'move').forEach((pos) => {
      getSquareFromPosition(state.board, pos[0], pos[1]).layer = pos[2];
    });
    state.turn = person.category;
    state.scene = 'movefocus';
    person.class = ['current'];
  },
  move (state, target) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    let p = getPersonFromId(state.people, state.currentPerson);
    let phase = state.phase;
    if(state.currentPerson === state.people.length - 1) {
      phase++;
    }
    delete getSquareFromPosition(state.board, p.x, p.y).personId;
    p.x = target.x;
    p.y = target.y;
    getSquareFromPosition(state.board, p.x, p.y).personId = p.id;
    state.scene = 'move';
    state.phase = phase;
  },
  attackFocus (state, person) {
    state.board.forEach((s) => {
      s.layer = null;
    });
    getAvailableArr(state, person, 'attack').forEach((pos) => {
      getSquareFromPosition(state.board, pos[0], pos[1]).layer = pos[2];
    });
    person.class = 'current';
    state.scene = 'attackfocus';
  },
  attack (state, action) {
    attackAsync().then(function() {
      const currentPersonId = getPersonIndexFromId(state.people, state.currentPerson);
      let currentPerson;
      if(currentPersonId !== state.people.length - 1){
        currentPerson = state.people[currentPersonId + 1].id;
      }else{
        currentPerson = 1;
      }
      state.currentPerson = currentPerson;
    });

    function attackAsync() {
      return new Promise(function(resolve, reject) {
        if(action.target !== null){
          const target = getPersonFromSquare(state.people, action.target);
          const _me = getPersonFromId(state.people, action.me);
          const _class = (_me.attackType === 'fire') ? 'burned' : 'attacked';
          sound(_class);
          target.hp -= _me.power;
          if (target.x < _me.x) {
            _me.direction = 'left';
          } else if(target.x > _me.x) {
            _me.direction = 'right';
          }
          if(target.hp > 0){
            target.class = _class;
            resolve();
          }else{
            const _deadClass = (_me.attackType === 'fire') ? 'burnDead' : 'dead';
            const _time = (_deadClass === 'burnDead') ? 1400 : 400;
            target.class = _class + ' ' + _deadClass;
            setTimeout(function(){
              state.people.splice(getPersonIndexFromId(state.people, target.id), 1);
              resolve();
            }, _time);
          }
        }else{
          resolve();
        }
      });
    }
  }
}

export const actions = {
  setBoard ({commit}) {
    commit('setBoard');
  },
  setPeople ({commit}, level) {
    commit('setPeople', level);
  },
  moveFocus ({commit}, person) {
    commit('moveFocus', person);
  },
  squareClick ({commit, state}, square) {
    if(state.scene === 'movefocus') {
      if(square.layer === 'focused'){
        commit('move', square);
        setTimeout(function(){
          _attackFocus(state);
        }, 800);
      }else if(square.layer === 'current'){
        _attackFocus(state);
      }
    }else{
      if(square.layer === (state.turn ? 'us' : 'enemy')){
        commit('attack', {me:state.currentPerson, target:square});
        const person = getPersonFromId(state.people, state.currentPerson);
        const _attackTime = (person.attackType === 'fire') ? 1000 : 0;
        setTimeout(function(){
          const nextPerson = getPersonFromId(state.people, state.currentPerson);
          let categoryArr = [0, 0];
          state.people.forEach((p) => {
            categoryArr[p.category]++;
          });
          if(categoryArr[0] === 0){
            audioCtx.close();
            audioCtx = null;
            alert('YOU LOSE...');
            document.querySelector('.restart').style.display = 'flex';
          }else if(categoryArr[1] === 0){
            audioCtx.close().then(function() {
              sound('win');
              setTimeout(function() {
                alert('YOU WIN!');
                document.querySelector('.restart').style.display = 'flex';
              }, 500);
            });
          }else{
            _next(nextPerson);
          }
        }, _attackTime + 600);
      }
    }

    function _attackFocus(state) {
      const person = getPersonFromId(state.people, state.currentPerson);
      const attackArea = getAvailableArr(state, person, 'attack');
      commit('attackFocus', person);
      if(attackArea.filter((pos) => pos[2] === (state.turn ? 'us' : 'enemy'))[0] === undefined) {
        commit('attack', {me:state.currentPerson, target: null});
        setTimeout(function(){
          const nextPerson = getPersonFromId(state.people, state.currentPerson);
          _next(nextPerson);
        }, 200);
      }else if(person.category === 1) {
        setTimeout(function(){
          let focusedList = document.querySelectorAll('.board li.us');
          let num = Math.floor(focusedList.length * Math.random());
          focusedList[num].click();
        }, 500);
      }
    }

    function _next(nextPerson) {
      commit('moveFocus', nextPerson);
      if(nextPerson.category === 1) {
        setTimeout(function(){
          let focusedList = document.querySelectorAll('.board li.focused');
          let num = Math.floor(focusedList.length * Math.random());
          focusedList[num].click();
        }, 500);
      }
    }
  },
  sound ({commit}, filename) {
    sound(filename);
  }
}

export const strict = false
