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
            <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="startOver" @click="startOver">Play Again</span>
                <span @click="closeModal" class="close">&times;</span>
                <p id="content"></p>
              </div>
            </div>
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
      priority: 0,
      collision: false
    };
  },
  methods: {
    startOver() {
      this.startGame();
      this.closeModal();
    },
    closeModal() {
      document.getElementById("myModal").style.display = "none";
    },
    startGame() {
      this.resetData();
      this.setIntervals(this.currentDirection, this.offset);
      window.addEventListener("keydown", this.controlSnake);
    },
    resetData() {
      this.removeSnake();
      this.snake = [3622, 3623, 3624, 3625, 3626];
      this.turns = {};
      this.currentDirection = "ArrowRight";
      this.offset = 1;
      this.priority = 0;
      this.collision = false;
      clearInterval(this.interval);
      this.inter = 0;
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.add("snakeHead");
    },
    removeSnake() {
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.remove("snakeHead");
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.remove("snake")
      );
    },
    controlSnake(e) {
      clearInterval(this.interval);
      if (!this.collision) {
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
      }
    },
    allDirections(Arrow, offset) {
      this.collision = this.checkCollision(offset);
      if (this.collision) {
        document.getElementById("content").innerHTML = "Game Over";
        document.getElementById("myModal").style.display = "block";
        clearInterval(this.interval);
      } else {
        this.removeSnake();
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
      }
    },
    setIntervals(Arrow, offset) {
      this.interval = setInterval(this.allDirections, 1000, Arrow, offset);
    },
    checkCollision(offset) {
      //check if there is collision if move head
      let head = this.snake[this.snake.length - 1] + offset;
      let tail = this.snake[1];
      return (
        head === tail ||
        head / 100 < 11 ||
        head / 100 > 40 ||
        head % 100 < 11 ||
        head % 100 > 52
      );
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
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 70px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.3); /* Black w/ opacity */
}
.modal-content {
  background-color: #666;
  opacity: 0.8;
  margin: auto;
  padding: 20px;
  border: 1px solid #666;
  width: 45%;
  color: white;
  font-size: 2rem;
  text-align: center;
  font-family: "Alfa Slab One";
}
.startOver {
  font-size: 1rem;
  float: left;
  cursor: pointer;
}
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus,
.startOver:hover,
.startOver:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>