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
      priority: 0,
      lastIndexOfSnake: 0
    };
  },
  methods: {
    startGame() {
      this.resetData();
      window.addEventListener("keydown", this.controlSnake);
    },
    resetData() {
      this.snake = [3622, 3623, 3624, 3625, 3626];
      this.turns = {};
      this.currentDirection = "";
      this.priority = 0;
      this.lastIndexOfSnake = this.snake.length - 1;
      clearInterval(this.interval);
      this.inter = 0;
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
      document
        .getElementById(this.snake[this.lastIndexOfSnake])
        .classList.add("snakeHead");
    },
    controlSnake(e) {
      document
        .getElementById(this.snake[this.lastIndexOfSnake])
        .classList.remove("snakeHead");
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.remove("snake")
      );
      //go to the right
      if (e.code === "ArrowRight") {
        this.goRight("ArrowRight");
      }
      //go to the left
      if (e.code === "ArrowLeft") {
        this.goLeft("ArrowLeft");
      }
      //go up
      if (e.code === "ArrowUp") {
        this.goUp("ArrowUp");
      }
      //go down
      if (e.code === "ArrowDown") {
        this.goDown("ArrowDown");
      }
    },
    goRight(ArrowRight) {
      if (this.currentDirection != "ArrowLeft") {
        this.currentDirection = ArrowRight;
        this.snake.shift();
        this.lastIndexOfSnake--;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
        this.snake.push(this.snake[this.lastIndexOfSnake] + 1);
        this.lastIndexOfSnake++;
        document
          .getElementById(this.snake[this.lastIndexOfSnake])
          .classList.add("snakeHead");
      }
    },
    goLeft(ArrowLeft) {
      if (this.currentDirection != "ArrowRight") {
        this.currentDirection = ArrowLeft;
        this.snake.shift();
        this.lastIndexOfSnake--;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
        this.snake.push(this.snake[this.lastIndexOfSnake] - 1);
        this.lastIndexOfSnake++;
        document
          .getElementById(this.snake[this.lastIndexOfSnake])
          .classList.add("snakeHead");
      }
    },
    goUp(ArrowUp) {
      if (this.currentDirection != "ArrowDown") {
        this.currentDirection = ArrowUp;
        this.snake.shift();
        this.lastIndexOfSnake--;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
        this.snake.push(this.snake[this.lastIndexOfSnake] - 100);
        this.lastIndexOfSnake++;
        document
          .getElementById(this.snake[this.lastIndexOfSnake])
          .classList.add("snakeHead");
      }
    },
    goDown(ArrowDown) {
      if (this.currentDirection != "ArrowUp") {
        this.currentDirection = ArrowDown;
        this.snake.shift();
        this.lastIndexOfSnake--;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
        this.snake.push(this.snake[this.lastIndexOfSnake] + 100);
        this.lastIndexOfSnake++;
        document
          .getElementById(this.snake[this.lastIndexOfSnake])
          .classList.add("snakeHead");
      }
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