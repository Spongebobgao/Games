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
      snake: [3622, 3623, 3624],
      lastKeyPressed: "",
      snakeHead: 0
    };
  },
  methods: {
    startGame() {
      window.addEventListener("keydown", this.controlSnake);
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
    },
    controlSnake(e) {
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.remove("snake")
      );
      //go to the right
      if (e.code === "ArrowRight") {
        this.snake = this.snake.map(value => {
          return value + 1;
        });
        console.log(this.snake.toString());
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
      }
      //go to the left
      if (e.code === "ArrowLeft") {
        this.snake = this.snake.map(value => {
          return value - 1;
        });
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
      }
      //go up
      if (e.code === "ArrowUp") {
        this.snakeHead = this.snake[this.snake.length - 1];
        this.snake[this.snake.length - 1] -= 100;
        this.snake[0] += 1;
        this.snake[1] += 1;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
      }
      //go down
      if (e.code === "ArrowDown") {
        this.snakeHead = this.snake[this.snake.length - 1];
        this.snake[this.snake.length - 1] += 100;
        this.snake[0] += 1;
        this.snake[1] += 1;
        this.snake.forEach(snake =>
          document.getElementById(snake).classList.add("snake")
        );
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
}
</style>