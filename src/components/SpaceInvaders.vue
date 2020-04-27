<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#008080" dark>
            <h3>
              Space Invaders:
              <span style="font-size:0.8rem">use → ← to control the directions</span>
              <br />
              <span>Score: {{score}}</span>
              <span class="btn" @click="startGame">Start Game</span>
            </h3>
            <!-- <div id="myModal" class="modal">
              <div class="modal-content">
                <span class="startOver" @click="startOver">Play Again</span>
                <span @click="closeModal" class="close">&times;</span>
                <p id="content"></p>
            </div>-->
            <!-- </div> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="board">
      <div v-for="m in 26" :key="m+10">
        <div v-for="n in 17" :key="n+10" :id="`${(n+10)}${(m+10)}`" class="grid"></div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      weapon: 0,
      firstRow: [],
      secondRow: [],
      thirdRow: [],
      fourthRow: [],
      fifthRow: [],
      weaponInterval: null,
      invaderInterval: null,
      score: 0,
      currentDirection: "right",
      movedDown: false
    };
  },
  methods: {
    startGame() {
      this.resetData();
      window.addEventListener("keydown", this.moveWeapon);
    },
    resetData() {
      this.movedDown = true;
      if (this.weapon != 0)
        document.getElementById(this.weapon).classList.remove("weapon");
      this.weapon = `${27}${Math.floor(Math.random() * 16) + 11}`;
      document.getElementById(this.weapon).classList.add("weapon");
      for (let i = 0; i < 16; i++) {
        this.firstRow[i] = `${11}${i + 11}`;
        this.secondRow[i] = `${12}${i + 11}`;
        this.thirdRow[i] = `${13}${i + 11}`;
        this.fourthRow[i] = `${14}${i + 11}`;
        this.fifthRow[i] = `${15}${i + 11}`;
      }
      this.firstRow.forEach(one =>
        document.getElementById(one).classList.add("blacks")
      );
      this.secondRow.forEach(one =>
        document.getElementById(one).classList.add("purples")
      );
      this.thirdRow.forEach(one =>
        document.getElementById(one).classList.add("blues")
      );
      this.fourthRow.forEach(one =>
        document.getElementById(one).classList.add("reds")
      );
      this.fifthRow.forEach(one =>
        document.getElementById(one).classList.add("greens")
      );
      this.currentDirection = "right";
      this.invaderInterval = setInterval(this.moveInvaders, 1000);
    },
    moveWeapon(e) {
      if (e.code === "ArrowLeft") {
        if (this.weapon % 100 > 11) {
          document.getElementById(this.weapon--).classList.remove("weapon");
          document.getElementById(this.weapon).classList.add("weapon");
        }
      }
      if (e.code === "ArrowRight") {
        if (this.weapon % 100 < 36) {
          document.getElementById(this.weapon++).classList.remove("weapon");
          document.getElementById(this.weapon).classList.add("weapon");
        }
      }
    },
    moveRowDown(array, color) {
      array.forEach(one =>
        document.getElementById(one).classList.remove(color)
      );
      array = array.map(one => (one = parseInt(one) + 100));
      array.forEach(one => document.getElementById(one).classList.add(color));
      return array;
    },
    moveAllRowsDown() {
      this.firstRow = this.moveRowDown(this.firstRow, "blacks");
      this.secondRow = this.moveRowDown(this.secondRow, "purples");
      this.thirdRow = this.moveRowDown(this.thirdRow, "blues");
      this.fourthRow = this.moveRowDown(this.fourthRow, "reds");
      this.fifthRow = this.moveRowDown(this.fifthRow, "greens");
    },
    moveRowToLeft(array, color) {
      document.getElementById(array.pop()).classList.remove(color);
      let newElement = parseInt(array[0]) - 1;
      array.unshift(newElement);
      document.getElementById(newElement).classList.add(color);
    },
    moveAllRowsToLeft() {
      this.moveRowToLeft(this.firstRow, "blacks");
      this.moveRowToLeft(this.secondRow, "purples");
      this.moveRowToLeft(this.thirdRow, "blues");
      this.moveRowToLeft(this.fourthRow, "reds");
      this.moveRowToLeft(this.fifthRow, "greens");
    },
    moveRowToRight(array, color) {
      document.getElementById(array.shift()).classList.remove(color);
      let newElement = parseInt(array[array.length - 1]) + 1;
      array.push(newElement);
      document.getElementById(newElement).classList.add(color);
    },
    moveAllRowsToRight() {
      this.moveRowToRight(this.firstRow, "blacks");
      this.moveRowToRight(this.secondRow, "purples");
      this.moveRowToRight(this.thirdRow, "blues");
      this.moveRowToRight(this.fourthRow, "reds");
      this.moveRowToRight(this.fifthRow, "greens");
    },
    moveInvaders() {
      if (this.currentDirection === "right") {
        if (
          this.firstRow[0] % 100 === 11 &&
          this.firstRow[0] / 100 != 11 &&
          !this.movedDown
        ) {
          this.movedDown = true;
          this.moveAllRowsDown();
        } else {
          this.moveAllRowsToRight();
          if (this.firstRow[this.firstRow.length - 1] % 100 === 36) {
            this.currentDirection = "left";
            this.movedDown = false;
          }
        }
      }
      if (this.currentDirection === "left") {
        if (
          this.firstRow[this.firstRow.length - 1] % 100 === 36 &&
          !this.movedDown
        ) {
          this.movedDown = true;
          this.moveAllRowsDown();
        } else {
          this.moveAllRowsToLeft();
          if (this.firstRow[0] % 100 === 11) {
            this.currentDirection = "right";
            this.movedDown = false;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
h3 {
  margin-left: 20px;
  color: #fff;
}
.board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 82%;
  height: 80%;
  margin-bottom: 10px;
  border: 1px #0cc solid;
  background-color: #e6ffff;
}
.grid {
  border: 0.5px#f2f2f2 solid;
  background-color: #e6ffff;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-blend-mode: multiply;
}
.btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: #033;
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
.weapon {
  background-image: url("../assets/weapon.jpg");
}
.purples {
  background-image: url("../assets/purple.jpg");
}
.greens {
  background-image: url("../assets/green.png");
}
.blues {
  background-image: url("../assets/blue.png");
}
.reds {
  background-image: url("../assets/red.png");
}
.blacks {
  background-image: url("../assets/black.png");
}
.lazer {
  background-image: url("../assets/lazer.png");
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
  background-color: rgb(0, 128, 128, 0.5);
  opacity: 0.8;
  margin: auto;
  padding: 20px;
  border: 1px solid #0cc;
  width: 45%;
  color: white;
  font-size: 2rem;
  text-align: center;
  font-family: "Alfa Slab one";
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