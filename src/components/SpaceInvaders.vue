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
              <span class="space-btn" @click="startGame">Start Game</span>
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
    <div class="space-board">
      <div v-for="m in 26" :key="m+10">
        <div v-for="n in 17" :key="n+10" :id="`${(n+10)}${(m+10)}`" class="space-grid"></div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      weaponPosition: 0,
      invaders: { blacks: [], purples: [], blues: [], reds: [], greens: [] },
      fireInterval: null,
      invaderInterval: null,
      score: 0,
      currentDirection: "right",
      movedDown: true,
      current: 0,
      lazers: {
        2711: [],
        2712: [],
        2713: [],
        2714: [],
        2715: [],
        2716: [],
        2717: [],
        2718: [],
        2719: [],
        2720: [],
        2721: [],
        2722: [],
        2723: [],
        2724: [],
        2725: [],
        2726: [],
        2727: [],
        2728: [],
        2729: [],
        2730: [],
        2731: [],
        2732: [],
        2733: [],
        2734: [],
        2735: [],
        2736: []
      }
    };
  },
  methods: {
    startGame() {
      this.resetData();
      window.addEventListener("keydown", this.moveweaponPosition);
    },
    resetData() {
      this.movedDown = true;
      this.score = 0;
      clearInterval(this.invaderInterval);
      clearInterval(this.fireInterval);
      if (this.weaponPosition != 0)
        document
          .getElementById(this.weaponPosition)
          .classList.remove("weaponPosition");
      this.weaponPosition = `${27}${Math.floor(Math.random() * 16) + 11}`;
      document
        .getElementById(this.weaponPosition)
        .classList.add("weaponPosition");
      if (this.invaders.blacks.length > 0) {
        for (let color in this.invaders) {
          this.invaders[color].forEach(one =>
            document.getElementById(one).classList.remove(color)
          );
        }
      }
      for (let i = 0; i < 16; i++) {
        this.invaders.blacks[i] = `${11}${i + 11}`;
        this.invaders.purples[i] = `${12}${i + 11}`;
        this.invaders.blues[i] = `${13}${i + 11}`;
        this.invaders.reds[i] = `${14}${i + 11}`;
        this.invaders.greens[i] = `${15}${i + 11}`;
      }
      for (let color in this.invaders) {
        this.invaders[color].forEach(one =>
          document.getElementById(one).classList.add(color)
        );
      }
      this.currentDirection = "right";
      this.invaderInterval = setInterval(this.moveInvaders, 1000);
      this.fireInterval = setInterval(this.fire, 300);
      //setInterval(this.moveLazer, 1000);
    },
    //every second there will be a lazer out from current weaponPosition
    fire() {
      for (let position in this.lazers) {
        if (position == this.weaponPosition) {
          if (this.lazers[position].length > 0) {
            this.lazers[position] = this.moveLazer(this.lazers[position]);
            let newElement = this.weaponPosition - 100;
            this.lazers[position].push(newElement);
            this.addLazerClass(this.lazers[position]);
          } else {
            let newElement = parseInt(this.weaponPosition) - 100;
            this.lazers[position].unshift(newElement);
            this.addLazerClass(this.lazers[position]);
          }
        } else {
          if (this.lazers[position].length > 0) {
            this.lazers[position] = this.moveLazer(this.lazers[position]);
            this.addLazerClass(this.lazers[position]);
          }
        }
      }
    },
    moveLazer(array) {
      console.log(array);
      array.forEach(lazer =>
        document.getElementById(lazer).classList.remove("lazer")
      );
      array = array.map(lazer => parseInt(lazer) - 100);
      array = array.filter(lazer => lazer / 100 >= 11);
      return array;
    },
    addLazerClass(array) {
      array.forEach(lazer =>
        document.getElementById(lazer).classList.add("lazer")
      );
    },
    moveweaponPosition(e) {
      if (e.code === "ArrowLeft") {
        if (this.weaponPosition % 100 > 11) {
          let element = document.getElementById(this.weaponPosition--);
          element.classList.remove("weaponPosition");
          document
            .getElementById(this.weaponPosition)
            .classList.add("weaponPosition");
        }
      }
      if (e.code === "ArrowRight") {
        if (this.weaponPosition % 100 < 36) {
          let element = document.getElementById(this.weaponPosition++);
          element.classList.remove("weaponPosition");
          document
            .getElementById(this.weaponPosition)
            .classList.add("weaponPosition");
        }
      }
    },
    moveAllRowsDown() {
      for (let color in this.invaders) {
        this.invaders[color].forEach(one =>
          document.getElementById(one).classList.remove(color)
        );
        this.invaders[color] = this.invaders[color].map(
          one => (one = parseInt(one) + 100)
        );
        this.invaders[color].forEach(one =>
          document.getElementById(one).classList.add(color)
        );
      }
    },
    // moveAllRowsToLeft() {
    //   for (let color in this.invaders) {
    //     this.invaders[color].forEach(invader =>
    //       document.getElementById(invader).classList.remove(color)
    //     );
    //     this.invaders[color] = this.invaders[color].map(
    //       invader => (invader = invader - 1)
    //     );
    //     this.invaders[color].forEach(invader =>
    //       document.getElementById(invader).classList.add(color)
    //     );
    //   }
    // },
    // moveAllRowsToRight() {
    //   for (let color in this.invaders) {
    //     this.invaders[color].forEach(invader =>
    //       document.getElementById(invader).classList.remove(color)
    //     );
    //     this.invaders[color] = this.invaders[color].map(
    //       invader => (invader = parseInt(invader) + 1)
    //     );
    //     this.invaders[color].forEach(invader =>
    //       document.getElementById(invader).classList.add(color)
    //     );
    //   }
    // },
    moveAllRowsLeftOrRight(offset) {
      for (let color in this.invaders) {
        this.invaders[color].forEach(invader =>
          document.getElementById(invader).classList.remove(color)
        );
        this.invaders[color] = this.invaders[color].map(
          invader => (invader = parseInt(invader) + offset)
        );
        this.invaders[color].forEach(invader =>
          document.getElementById(invader).classList.add(color)
        );
      }
    },
    moveInvaders() {
      if (this.currentDirection === "right") {
        if (
          this.invaders.blacks[0] % 100 === 11 &&
          this.invaders.blacks[0] / 100 != 11 &&
          !this.movedDown
        ) {
          this.movedDown = true;
          this.moveAllRowsDown();
        } else {
          this.moveAllRowsLeftOrRight(1);
          if (
            this.invaders.blacks[this.invaders.blacks.length - 1] % 100 ===
            36
          ) {
            this.currentDirection = "left";
            this.movedDown = false;
          }
        }
      }
      if (this.currentDirection === "left") {
        if (
          this.invaders.blacks[this.invaders.blacks.length - 1] % 100 === 36 &&
          !this.movedDown
        ) {
          this.movedDown = true;
          this.moveAllRowsDown();
        } else {
          this.moveAllRowsLeftOrRight(-1);
          if (this.invaders.blacks[0] % 100 === 11) {
            this.currentDirection = "right";
            this.movedDown = false;
          }
        }
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
.space-board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 82%;
  height: 80%;
  margin-bottom: 10px;
  border: 1px #0cc solid;
  background-color: #e6ffff;
}
.space-grid {
  border: 0.5px#f2f2f2 solid;
  background-color: #e6ffff;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-blend-mode: multiply;
}
.space-btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: #033;
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
.weaponPosition {
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
  transition: transform 1s linear;
}
</style>