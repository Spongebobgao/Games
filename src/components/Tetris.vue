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
        <div v-for="n in 20" :key="n+10" :id="`${(n+10)}${(m+10)}`"></div>
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
      score: 0,
      timeUsed: 0,
      occupiedDivsPerRow: {
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 0,
        29: 0,
        30: 0
      },
      shapeOnBoard: {
        square: [],
        stick: [],
        lshape: [],
        zshape: [],
        dotshape: []
      },
      currentOffSet: 100
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
      this.tranformTimes = 0;
      clearInterval(this.movedownInterval);
      const keys = Object.keys(this.allTheshapes);
      this.currentShape = keys[Math.floor(Math.random() * keys.length)];
      this.currentShapeArray = this.allTheshapes[this.currentShape];
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.add(this.currentShape);
      });
      this.setNewCurrentLeftAndRight();
      this.movedownInterval = setInterval(this.moveShape, 1000, 100);
    },
    setNewCurrentLeftAndRight() {
      switch (this.currentShape) {
        case "square":
          this.currentLeft = 4 * 20;
          this.currentRight = 4 * 20;
          break;
        case "stick":
          this.currentLeft = 3 * 20;
          this.currentRight = 3 * 20;
          break;
        case "lshape":
          this.currentLeft = 3 * 20;
          this.currentRight = 4 * 20;
          break;
        case "zshape":
          this.currentLeft = 3 * 20;
          this.currentRight = 4 * 20;
          break;
        case "dotshape":
          this.currentLeft = 4 * 20;
          this.currentRight = 3 * 20;
          break;
      }
    },
    moveShape(offset) {
      this.currentOffSet = offset;
      if (this.checkIfDivsAvailable(offset)) {
        offset = this.currentOffSet;
        this.currentShapeArray.forEach(element => {
          document.getElementById(element).classList.remove(this.currentShape);
        });
        this.currentShapeArray = this.currentShapeArray.map(
          element => (element = parseInt(element) + offset)
        );
        this.updateTheBoard(this.currentShapeArray);
      } else {
        this.newShape();
      }
      this.scoreAndUpdateBoard();
    },
    getElementsThatNeedToBeRemoved(shapeArray, shape, row) {
      let elementNeedToBeRemoved = [];
      shapeArray.forEach(element => {
        if (Math.floor(element / 100) == row) {
          document.getElementById(element).classList.remove(shape);
          elementNeedToBeRemoved.push(element);
        }
      });
      return elementNeedToBeRemoved;
    },
    removeElementNeedToBeRemoved(elementArray, shapeArray) {
      for (let i = 0; i < elementArray.length; i++) {
        this.occupiedDivsPerRow[Math.floor(elementArray[i] / 100)]--;
        let index = shapeArray.indexOf(elementArray[i]);
        shapeArray.splice(index, 1);
      }
      return shapeArray;
    },
    getElementsNeedToBeUpdated(shapeArray, shape, row) {
      let elementNeedToBeUpdated = [];
      shapeArray.forEach(element => {
        if (Math.floor(element / 100) == row) {
          elementNeedToBeUpdated.push(element);
          document.getElementById(element).classList.remove(shape);
          this.occupiedDivsPerRow[Math.floor(element / 100)]--;
          element = parseInt(element) + 100;
          document.getElementById(element).classList.add(shape);
          this.occupiedDivsPerRow[Math.floor(element / 100)]++;
        }
      });
      return elementNeedToBeUpdated;
    },
    updateElmentNeedToBeUpdated(elementArray, shapeArray) {
      for (let i = 0; i < elementArray.length; i++) {
        let index = shapeArray.indexOf(elementArray[i]);
        shapeArray[index] += 100;
      }
      return shapeArray;
    },
    scoreAndUpdateBoard() {
      let row = 30;
      while (row > 11) {
        if (this.occupiedDivsPerRow[row] == 10) {
          this.score += 1000;
          //loop shapeonboard remove elements that has the same row number as full row
          for (let shape in this.shapeOnBoard) {
            if (this.shapeOnBoard[shape].length > 0) {
              let elementNeedToBeRemoved = this.getElementsThatNeedToBeRemoved(
                this.shapeOnBoard[shape],
                shape,
                row
              );
              if (elementNeedToBeRemoved.length > 0) {
                this.shapeOnBoard[shape] = this.removeElementNeedToBeRemoved(
                  elementNeedToBeRemoved,
                  this.shapeOnBoard[shape],
                  shape
                );
              }
            }
          }
          let elementNeedToBeUpdated = [];
          for (let fullRow = row - 1; fullRow > 11; fullRow--) {
            for (let shape in this.shapeOnBoard) {
              if (this.shapeOnBoard[shape].length > 0) {
                elementNeedToBeUpdated = this.getElementsNeedToBeUpdated(
                  this.shapeOnBoard[shape],
                  shape,
                  fullRow
                );
              }
              if (elementNeedToBeUpdated.length > 0) {
                this.shapeOnBoard[shape] = this.updateElmentNeedToBeUpdated(
                  elementNeedToBeUpdated,
                  this.shapeOnBoard[shape]
                );
              }
            }
          }
          row = 30;
        } else {
          row--;
        }
      }
    },
    checkIfDivsAvailable(offset) {
      let newArray = this.currentShapeArray.slice(0, 4);
      let newArrayWithOffset = newArray.map(
        element => (element = parseInt(element) + offset)
      );
      let newArrayWithOffset100 = newArray.map(
        element => (element = parseInt(element) + 100)
      );
      for (let i = 0; i < newArray.length; i++) {
        if (
          Math.floor(newArray[i] / 100) === 30 ||
          (this.checkIfAvailableAfterOneMove(newArrayWithOffset) &&
            this.checkIfAvailableAfterOneMove(newArrayWithOffset100))
        ) {
          newArray.forEach(element => {
            this.occupiedDivsPerRow[Math.floor(element / 100)]++;
            this.shapeOnBoard[this.currentShape].push(element);
          });
          return false;
        } else if (
          this.checkIfAvailableAfterOneMove(newArrayWithOffset) &&
          !this.checkIfAvailableAfterOneMove(newArrayWithOffset100)
        ) {
          this.currentOffSet = 100;
          return true;
        }
      }
      return true;
    },
    checkIfAvailableAfterOneMove(newArray) {
      for (let shape in this.shapeOnBoard) {
        if (this.shapeOnBoard[shape].length > 0) {
          for (let i = 0; i < newArray.length; i++) {
            if (this.shapeOnBoard[shape].includes(newArray[i])) return true;
          }
        }
      }
      return false;
    },
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
        this.currentRight += 60;
        this.updateTheBoard(newArray);
        this.tranformTimes++;
      } else {
        this.tranformTimes = 0;
        element = this.currentShapeArray[0];
        if (this.currentLeft <= 60) {
          newArray = [element, element + 1, element + 2, element + 3];
          this.currentRight -= 60;
        } else {
          newArray = [element - 3, element - 2, element - 1, element];
          this.currentLeft -= 60;
        }
        this.updateTheBoard(newArray);
      }
    },
    transformLShape() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[0];
        newArray = [element, element + 1, element + 100, element + 200];
        this.tranformTimes++;
        this.updateTheBoard(newArray);
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
        this.updateTheBoard(newArray);
      } else if (this.tranformTimes === 2) {
        element = this.currentShapeArray[1];
        newArray = [element - 100, element, element + 100 - 1, element + 100];
        this.currentRight += 20;
        this.tranformTimes++;
        this.updateTheBoard(newArray);
      } else if (this.tranformTimes === 3) {
        element = this.currentShapeArray[3];
        if (this.currentLeft === 0) {
          newArray = [element - 100 - 1, element - 1, element, element + 1];
          this.currentRight -= 20;
        } else {
          newArray = [element - 100 - 2, element - 2, element - 1, element];
          this.currentLeft -= 20;
        }
        this.updateTheBoard(newArray);
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
        this.updateTheBoard(newArray);
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
        this.updateTheBoard(newArray);
        this.tranformTimes = 0;
      }
    },
    transformDotShape() {
      let element;
      let newArray;
      if (this.tranformTimes === 0) {
        element = this.currentShapeArray[2];
        newArray = [element - 100, element, element + 1, element + 100];
        this.updateTheBoard(newArray);
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
        this.updateTheBoard(newArray);
        this.tranformTimes++;
      } else if (this.tranformTimes === 2) {
        element = this.currentShapeArray[1];
        newArray = [element, element + 100 - 1, element + 100, element + 200];
        this.updateTheBoard(newArray);
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
        this.updateTheBoard(newArray);
        this.tranformTimes = 0;
      }
    },
    updateTheBoard(newArray) {
      this.currentShapeArray = newArray;
      this.currentShapeArray.forEach(element => {
        document.getElementById(element).classList.add(this.currentShape);
      });
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
        this.moveShape(100);
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
  background-color: #faf5db;
  /* border: rgb(174, 218, 226) 1px solid; */
}
.tetris-grid div {
  width: 20px;
  height: 20px;
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
.star {
  background-image: url("../assets/star.png");
}
</style>