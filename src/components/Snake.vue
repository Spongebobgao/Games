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
              <span>Score: {{score}}</span>
              <span class="snake-btn" @click="startGame">Start Game</span>
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
    <div class="snake-board">
      <div v-for="m in 42" :key="m+10">
        <div v-for="n in 29" :key="n+10" :id="`${(n+10)}${(m+10)}`" class="snake-grid"></div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      snake: [1111, 1112, 1113],
      snakeInterval: null,
      collisionInterval: null,
      currentDirection: "ArrowRight",
      offset: 1,
      collision: false,
      score: 0,
      startBtnPressCount: 0
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
      let element = document.querySelector(".snake-btn");
      if (this.startBtnPressCount === 0) {
        this.resetData();
        element.textContent = "Pause";
        window.addEventListener("keydown", this.controlSnake);
      } else if (this.startBtnPressCount > 0) {
        if (this.startBtnPressCount % 2 === 1) {
          clearInterval(this.snakeInterval);
          element.textContent = "Resume";
        } else {
          this.setSnakeIntervals(this.currentDirection, this.offset);
          element.textContent = "Pause";
        }
      }
      this.startBtnPressCount++;
    },
    resetData() {
      this.removeSnake();
      this.snake = [1111, 1112, 1113];
      this.currentDirection = "ArrowRight";
      this.offset = 1;
      this.score = 0;
      this.collision = false;
      this.snakeInterval = null;
      this.startBtnPressCount = 0;
      this.setSnakeIntervals("ArrowRight", 1);
      this.collisionInterval = setInterval(
        this.checkCollision,
        1000,
        this.offset
      );
      this.snake.forEach(snake =>
        document.getElementById(snake).classList.add("snake")
      );
      document
        .getElementById(this.snake[this.snake.length - 1])
        .classList.add("snakeHead");
      this.randomPosition();
    },
    removeSnake() {
      clearInterval(this.snakeInterval);
      clearInterval(this.collisionInterval);
      this.snake.forEach(snake =>
        document
          .getElementById(snake)
          .classList.remove("snake", "snakeHead", "red")
      );
      let elements = document.getElementsByClassName("purple");
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++)
          elements[i].classList.remove("purple");
      }
    },
    randomPosition() {
      //id: 1111-3952
      let row = Math.floor(Math.random() * 29) + 11;
      let col = Math.floor(Math.random() * 42) + 11;
      let position = `${row}${col}`;
      while (this.snake.includes(position)) {
        row = Math.floor(Math.random() * 29) + 11;
        col = Math.floor(Math.random() * 42) + 11;
        position = `${row}${col}`;
      }
      document.getElementById(position).classList.add("purple");
    },
    controlSnake(e) {
      //go to the right
      if (!this.collision) {
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
      }
    },
    allDirections(Arrow, offset) {
      clearInterval(this.snakeInterval);
      clearInterval(this.collisionInterval);
      this.checkCollision(offset);
      if (this.collision) {
        this.killSnake(offset);
        document.getElementById("content").innerHTML = "Game Over";
        document.getElementById("myModal").style.display = "block";
      } else {
        this.collision = false;
        let head = this.snake[this.snake.length - 1];
        let newHead = head + offset;
        let headElement = document.getElementById(head).classList;
        let newHeadElement = document.getElementById(newHead).classList;
        if (newHeadElement.contains("purple")) {
          this.score++;
          this.randomPosition();
          this.snake.push(newHead);
          newHeadElement.remove("purple");
          newHeadElement.add("snakeHead");
          headElement.remove("snakeHead");
          headElement.add("snake");
        } else {
          document.getElementById(this.snake.shift()).classList.remove("snake");
          headElement.remove("snakeHead");
          headElement.add("snake");
          this.snake.push(newHead);
          newHeadElement.add("snakeHead");
        }
        this.currentDirection = Arrow;
        this.offset = offset;
        this.setSnakeIntervals(this.currentDirection, this.offset);
        this.collisionInterval = setInterval(
          this.checkCollision,
          1000,
          this.offset
        );
      }
    },
    setSnakeIntervals(Arrow, offset) {
      this.snakeInterval = setInterval(this.allDirections, 300, Arrow, offset);
    },
    checkCollision(offset) {
      //check if there is collision if move ahead
      let head = this.snake[this.snake.length - 1] + offset;
      let smallSnake = this.snake.slice(1, this.snake.length - 2);
      if (
        smallSnake.includes(head) ||
        head / 100 < 11 ||
        head / 100 > 40 ||
        head % 100 < 11 ||
        head % 100 > 52
      ) {
        this.collision = true;
      }
    },
    killSnake(offset) {
      let head = this.snake[this.snake.length - 1] + offset;
      if (
        head / 100 < 11 ||
        head / 100 > 40 ||
        head % 100 < 11 ||
        head % 100 > 52
      ) {
        document
          .getElementById(this.snake[this.snake.length - 1])
          .classList.add("red");
      } else {
        document
          .getElementById(this.snake[this.snake.length - 1] + offset)
          .classList.add("red");
      }
    }
  }
};
</script>

<style >
h3 {
  margin-left: 20px;
  color: #666;
}
.snake-board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
}
.snake-grid {
  border: 0.5px#f2f2f2 solid;
  background: #dcdcdc;
  width: 15px;
  height: 15px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #f2f2f2;
}
.snake-btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: #b3b3b3;
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
.red {
  background-color: red;
}
.purple {
  background-color: purple;
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
  z-index: 5;
}
.modal-content {
  background-color: #fff5ee;
  opacity: 0.8;
  margin: auto;
  padding: 20px;
  border: 1px solid #fff5ee;
  width: 45%;
  color: #994000;
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
  color: #994000;
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