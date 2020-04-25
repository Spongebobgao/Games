<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#dcdcdc" dark>
            <h3>
              Snake:
              <span style="font-size:0.8rem">use ↑ → ↓ ← to control the direction</span>
              <br />
              <span>Score:</span>
              <span class="btn" @click="startGame">Start Game</span>
            </h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="board">
      <div v-for="m in 42" :key="m+10">
        <div v-for="n in 29" :key="n+10" :id="`${(n+10)}${(m+10)}`" class="grid"></div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      snake: [3622, 3623, 3624, 3625, 3626],
      turns: {},
      interval: 0,
      currentDirection: "",
      offset: 0,
      priority: 0
    };
  },
  methods: {
    startGame() {
      this.resetData();
      this.setIntervals(this.currentDirection, this.offset);
      window.addEventListener("keydown", this.controlSnake);
    },
    resetData() {
      this.snake = [3622, 3623, 3624, 3625, 3626];
      this.turns = {};
      this.currentDirection = "ArrowRight";
      this.offset = 1;
      this.priority = 0;
      clearInterval(this.interval);
      this.inter = 0;
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.add("snakeHead");
    },
    controlSnake(e) {
      clearInterval(this.interval);
      //go to the right
      if (e.code === "ArrowRight") {
        if (this.currentDirection != "ArrowLeft") {
          this.allDirections("ArrowRight", 1);
        }
      }
      //go to the left
      if (e.code === "ArrowLeft") {
        if (this.currentDirection != "ArrowRight") {
          this.allDirections("ArrowLeft", -1);
        }
      }
      //go up
      if (e.code === "ArrowUp") {
        if (this.currentDirection != "ArrowDown") {
          this.allDirections("ArrowUp", -100);
        }
      }
      //go down
      if (e.code === "ArrowDown") {
        if (this.currentDirection != "ArrowUp") {
          this.allDirections("ArrowDown", 100);
        }
      }
      this.setIntervals(this.currentDirection, this.offset);
    },
    allDirections(Arrow, offset) {
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.remove("snakeHead");
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.remove("snake")
      );
      this.snake.shift();
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
      this.snake.push(this.snake[this.snake.length - 1] + offset);
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.add("snakeHead");
      this.currentDirection = Arrow;
      this.offset = offset;
    },
    setIntervals(Arrow, offset) {
      this.interval = setInterval(this.allDirections, 1000, Arrow, offset);
    }
  }
};
</script>

<style scoped>
h3 {
  margin-left: 20px;
  color: #666;
}
.board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
}
.grid {
  border: 0.5px#f2f2f2 solid;
  background: #dcdcdc;
  width: 15px;
  height: 15px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #f2f2f2;
}
.btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: #b3b3b3;
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
.snake {
  background: #090;
  border-radius: 25%;
}
.snakeHead {
  background: url("../assets/snakeHead.jpg");
  background-color: #090;
  background-blend-mode: multiply;
  border-radius: 50%;
}
</style>