<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#ffd700" dark>
            <h3>
              Tetris:
              <span
                style="font-size:0.8rem"
              >use → ↓ ← to control the directions, ↑ to transform</span>
              <br />
              <span>Score: {{score}}</span>
              <br />
              <span>Time: {{timeUsed}}</span>
              <span class="tetris-btn" @click="startGame">Start Game</span>
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
    <div class="tetris-board">
      <div v-for="m in 17" :key="m+10" class="tetris-grid">
        <div v-for="n in 17" :key="n+10" :id="`${(n+10)}${(m+10)}`"></div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      allTheshapes: {
        square: [1119, 1120, 1219, 1220],
        stick: [1117, 1118, 1119, 1120],
        lshape: [1118, 1218, 1219, 1220],
        zshape: [1118, 1119, 1217, 1218],
        dotshape: [1119, 1218, 1219, 1220]
      },
      currentShape: null,
      currentIndex: null,
      movedownInterval: null
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
      window.addEventListener("keydown", this.moveAndTranform);
      this.initShape();
    },
    initShape() {
      const keys = Object.keys(this.allTheshapes);
      this.currentIndex = keys[Math.floor(Math.random() * keys.length)];
      this.currentShape = this.allTheshapes[this.currentIndex];
      this.currentShape.forEach(element => {
        document.getElementById(element).classList.add(this.currentIndex);
      });
      this.movedownInterval = setInterval(this.moveShape, 1000);
    },
    moveShape() {
      this.currentShape.forEach(element => {
        document.getElementById(element).classList.remove(this.currentIndex);
      });
      this.currentShape = this.currentShape.map(
        element => (element = parseInt(element) + 100)
      );
      this.currentShape.forEach(element => {
        document.getElementById(element).classList.add(this.currentIndex);
      });
    },
    moveAndTranform(e) {
      if (e.code === "ArrowLeft") {
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.remove(this.currentIndex);
        });
        this.currentShape = this.currentShape.map(
          element => (element = parseInt(element) - 1)
        );
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.add(this.currentIndex);
        });
      }
      if (e.code === "ArrowRight") {
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.remove(this.currentIndex);
        });
        this.currentShape = this.currentShape.map(
          element => (element = parseInt(element) + 1)
        );
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.add(this.currentIndex);
        });
      }
      if (e.code === "ArrowDown") {
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.remove(this.currentIndex);
        });
        this.currentShape = this.currentShape.map(
          element => (element = parseInt(element) + 100)
        );
        this.currentShape.forEach(element => {
          document.getElementById(element).classList.add(this.currentIndex);
        });
      }
    }
  }
};
</script>
<style >
h3 {
  margin-left: 20px;
  color: #fff;
}
.tetris-board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 54%;
  height: 80%;
  margin-bottom: 10px;
  background-color: #fff099;
  /* border: rgb(174, 218, 226) 1px solid; */
}
.tetris-grid div {
  width: 25px;
  height: 25px;
  /* border: rgb(174, 218, 226) 1px solid; */
}
.tetris-btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: rgb(216, 117, 5);
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
.square {
  background-color: teal;
  border: rgb(174, 218, 226) 1px solid;
}
.stick {
  background-color: rgb(128, 36, 0);
  border: rgb(174, 218, 226) 1px solid;
}
.lshape {
  background-color: rgb(117, 0, 128);
  border: rgb(174, 218, 226) 1px solid;
}
.zshape {
  background-color: rgb(0, 23, 128);
  border: rgb(174, 218, 226) 1px solid;
}
.dotshape {
  background-color: rgb(0, 128, 28);
  border: rgb(174, 218, 226) 1px solid;
}
</style>