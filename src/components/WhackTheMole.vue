<template>
  <div>
    <div class="text">
      <h1 class="msg">
        {{msg}}
        <br />
        <span class="msg">Score:</span>
        <br />
        {{score}}
        <br />
        <span class="msg">Time Left:</span>
        <br />
        {{timeLeft}}
      </h1>
    </div>
    <div class="game">
      <button type="button" @click="start" class="btn">Start Game</button>
      <div class="board">
        <div v-for="n in 9" :key="n" :id="`${n}`" @click="whackTheMole(n)" class="grid"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Whack The Mole",
      score: 0,
      timeLeft: 60,
      id: 0,
      placeMole: null,
      countTime: null
    };
  },
  methods: {
    start() {
      if (this.placeMole || this.countTime) {
        clearInterval(this.placeMole);
        clearInterval(this.countTime);
        this.msg = "Whack The Mole";
        this.score = 0;
        this.timeLeft = 60;
        this.id = 0;
        this.setIntervals();
      } else {
        this.setIntervals();
      }
    },
    setIntervals() {
      let thisAlias = this;
      this.placeMole = setInterval(function() {
        thisAlias.placeTheMole();
      }, 500);
      this.countTime = setInterval(function() {
        if (thisAlias.timeLeft > 0) {
          thisAlias.timeLeft--;
        } else {
          thisAlias.msg = "Your score is: " + thisAlias.score;
        }
      }, 1000);
    },
    whackTheMole(n) {
      if (this.id === n) {
        this.score++;
      }
    },
    placeTheMole() {
      document
        .querySelectorAll(".grid")
        .forEach(className => className.classList.remove("mole"));
      if (this.timeLeft > 0) {
        let position = Math.floor(Math.random() * 9) + 1;
        document.getElementById(position).classList.add("mole");
        this.id = position;
      }
    }
  }
};
</script>

<style scoped>
.text {
  display: inline-block;
  width: 30%;
  margin: 10px 50px;
}
.game {
  display: inline-block;
  width: 60%;
}
.board {
  width: 450px;
  height: 450px;
  display: flex;
  flex-wrap: wrap;
}
.grid {
  border: 1px#e59a9a solid;
  background: #efc2c2;
  width: 150px;
  height: 150px;
  cursor: pointer;
}
.msg {
  color: #b62f2f;
  font-style: italic;
}
.btn {
  margin: 20px 180px;
  height: 2rem;
  background: #b62f2f;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 2px 2px #e59a9a;
  padding: 5px;
}
.mole {
  background: url("../assets/mole.png");
  background-color: #efc2c2;
  background-blend-mode: multiply;
}
</style>