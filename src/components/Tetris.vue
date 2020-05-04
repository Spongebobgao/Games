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
              <v-spacer></v-spacer>
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
      <div v-for="m in 10" :key="m+10" class="tetris-grid">
        <div v-for="n in 20" :key="n+10" :id="`${(n+10)}${(m+10)}`">{{n+10}}{{m+10}}</div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      allTheshapes: {
        square: [1115, 1116, 1215, 1216],
        stick: [1114, 1115, 1116, 1117],
        lshape: [1114, 1214, 1215, 1216],
        zshape: [1115, 1116, 1214, 1215],
        dotshape: [1116, 1215, 1216, 1217]
      },
      currentShapeArray: null,
      currentShape: null,
      movedownInterval: null,
      tranformTimes: 0,
      currentLeft: 0,
      currentRight: 0,
      currentBottom: 0,
      score: 0,
      timeUsed: 0
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
      this.newShape();
    },
    newShape() {
      //const keys = Object.keys(this.allTheshapes);
      //this.currentShape = keys[Math.floor(Math.random() * keys.length)];
      this.tranformTimes = 0;
      this.currentShape = "dotshape";
      this.setNewCurrentLeftAndRight();
      this.currentShapeArray = this.allTheshapes[this.currentShape];
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.add(this.currentShape);
      });
      this.movedownInterval = setInterval(this.moveShape, 2000, 100);
    },
    setNewCurrentLeftAndRight() {
      switch (this.currentShape) {
        case "square":
          this.currentLeft = 4 * 20;
          this.currentRight = 4 * 20;
          this.currentBottom = 18 * 20;
          break;
        case "stick":
          this.currentLeft = 3 * 20;
          this.currentRight = 3 * 20;
          this.currentBottom = 19 * 20;
          break;
        case "lshape":
          this.currentLeft = 3 * 20;
          this.currentRight = 4 * 20;
          this.currentBottom = 18 * 20;
          break;
        case "zshape":
          this.currentLeft = 3 * 20;
          this.currentRight = 4 * 20;
          this.currentBottom = 18 * 20;
          break;
        case "dotshape":
          this.currentLeft = 4 * 20;
          this.currentRight = 3 * 20;
          this.currentBottom = 18 * 20;
          break;
      }
    },
    moveShape(offset) {
      // this.checkIfShapeHitBottom();
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.remove(this.currentShape);
      });
      this.currentShapeArray = this.currentShapeArray.map(
        element => (element = parseInt(element) + offset)
      );
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.add(this.currentShape);
      });
      this.currentBottom -= 20;
      // if (this.currentBottom === 0) {
      //   clearInterval(this.movedownInterval);
      //   this.newShape();
      // }
    },
    // checkIfShapeHitBottom() {
    //   if (Math.floor(this.currentShapeArray.slice(0, 4)[3] / 100) === 27) {
    //     clearInterval(this.movedownInterval);
    //     this.newShape();
    //   }
    // },
    transformShape() {
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.remove(this.currentShape);
      });
      switch (this.currentShape) {
        case "stick":
          this.transformStick();
          break;
        case "lshape":
          this.transformLShape();
          break;
        case "zshape":
          this.transformZSahpe();
          break;
        case "dotshape":
          this.transformDotShape();
          break;
      }
    },
    transformStick() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[0];
        newArray = [element, element + 100, element + 200, element + 300];
        this.currentLeft -= 3 * 20;
        this.currentRight += 3 * 20;
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
          this.tranformTimes++;
        });
      } else {
        this.tranformTimes = 0;
        if (this.currentRight <= 3 * 20) {
          element = this.currentShapeArray[3];
          newArray = [element - 3, element - 2, element - 1, element];
        } else {
          element = this.currentShapeArray[0];
          newArray = [element, element + 1, element + 2, element + 3];
          this.currentLeft += 3 * 20;
          this.currentRight -= 3 * 20;
        }
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
      }
    },
    transformLShape() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[0];
        newArray = [element, element + 1, element + 100, element + 200];
        this.tranformTimes++;
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.currentRight += 20;
      } else if (this.tranformTimes === 1) {
        element = this.currentShapeArray[2];
        if (this.currentLeft === 0) {
          newArray = [element, element + 1, element + 2, element + 2 + 100];
          this.currentRight -= 20;
        } else {
          newArray = [element - 1, element, element + 1, element + 100 + 1];
          this.currentLeft -= 20;
        }
        this.tranformTimes++;
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
      } else if (this.tranformTimes === 2) {
        element = this.currentShapeArray[1];
        newArray = [element - 100, element, element + 100 - 1, element + 100];
        this.currentRight += 20;
        this.tranformTimes++;
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
      } else if (this.tranformTimes === 3) {
        element = this.currentShapeArray[3];
        if (this.currentLeft === 0) {
          newArray = [element - 100 - 1, element - 1, element, element + 1];
          this.currentRight -= 20;
        } else {
          newArray = [element - 100 - 2, element - 2, element - 1, element];
          this.currentLeft -= 20;
        }
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.tranformTimes = 0;
      }
    },
    transformZSahpe() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[0];
        newArray = [
          element,
          element + 100,
          element + 100 + 1,
          element + 200 + 1
        ];
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.currentLeft += 20;
        this.tranformTimes++;
      } else {
        element = this.currentShapeArray[1];
        if (this.currentLeft === 0) {
          newArray = [
            element + 1 - 100,
            element + 2 - 100,
            element,
            element + 1
          ];
          this.currentRight -= 20;
        } else {
          newArray = [element, element + 1, element + 100 - 1, element + 100];
          this.currentLeft -= 20;
        }
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.tranformTimes = 0;
      }
    },
    transformDotShape() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[2];
        newArray = [element - 100, element, element + 1, element + 100];
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.currentLeft += 20;
        this.tranformTimes++;
      } else if (this.tranformTimes === 1) {
        element = this.currentShapeArray[1];
        if (this.currentLeft === 0) {
          newArray = [element, element + 1, element + 2, element + 1 + 100];
          this.currentRight -= 20;
        } else {
          newArray = [element - 1, element, element + 1, element + 100];
          this.currentLeft -= 20;
        }
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.tranformTimes++;
      } else if (this.tranformTimes === 2) {
        element = this.currentShapeArray[1];
        newArray = [element, element + 100 - 1, element + 100, element + 200];
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.tranformTimes++;
        this.currentRight += 20;
      } else if (this.tranformTimes === 3) {
        element = this.currentShapeArray[3];
        if (this.currentLeft === 0) {
          newArray = [element - 100, element - 1, element, element + 1];
          this.currentRight - 20;
        } else {
          newArray = [element - 1 - 100, element - 2, element - 1, element];
          this.currentLeft -= 20;
        }
        this.currentShapeArray = newArray;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.add(this.currentShape);
        });
        this.tranformTimes = 0;
      }
    },
    moveAndTranform(e) {
      if (e.code === "ArrowLeft") {
        if (this.currentLeft > 0) {
          this.moveShape(-1);
          this.currentLeft -= 20;
          this.currentRight += 20;
        }
      }
      if (e.code === "ArrowRight") {
        if (this.currentRight > 0) {
          this.moveShape(1);
          this.currentLeft += 20;
          this.currentRight -= 20;
        }
      }
      if (e.code === "ArrowDown") {
        if (this.currentBottom > 0) {
          this.currentBottom -= 20;
          this.moveShape(100);
        }
      }
      if (e.code === "ArrowUp" && this.currentShape != "square") {
        this.transformShape();
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
  width: 200px;
  height: 400px;
  background-color: #fff099;
  /* border: rgb(174, 218, 226) 1px solid; */
}
.tetris-grid div {
  width: 20px;
  height: 20px;
  /* border: rgb(174, 218, 226) 1px solid; */
  font-size: 0.5rem;
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