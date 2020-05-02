<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#008080" dark>
            <h3>
              Space Invaders:
              <span
                style="font-size:0.8rem"
              >use → ← to control the directions, ↑ to fire</span>
              <br />
              <span>Score: {{score}}</span>
              <span class="space-btn" @click="startGame">Start Game</span>
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
      invaderInterval: null,
      lazerInterval: null,
      score: 0,
      currentDirection: "right",
      movedDown: true,
      currentLazer: 0,
      speed: 0.8,
      startGamePressed: 0
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
      let element = document.querySelector(".space-btn");
      if (this.startGamePressed === 0) {
        this.resetData();
        window.addEventListener("keydown", this.moveweaponPosition);
        window.addEventListener("keyup", this.fire);
        element.textContent = "Pause";
      } else {
        if (this.startGamePressed % 2 === 1) {
          clearInterval(this.invaderInterval);
          element.textContent = "Resume";
        } else {
          this.invaderInterval = setInterval(
            this.moveInvaders,
            1000 * this.speed
          );
          element.textContent = "Pause";
        }
      }
      this.startGamePressed++;
    },
    resetData() {
      this.startGamePressed = 0;
      this.currentLazer = 0;
      this.speed = 0.8;
      this.movedDown = true;
      this.score = 0;
      clearInterval(this.invaderInterval);
      clearInterval(this.lazerInterval);
      if (this.weaponPosition != 0)
        document
          .getElementById(this.weaponPosition)
          .classList.remove("weaponPosition");
      this.weaponPosition = `${27}${Math.floor(Math.random() * 16) + 11}`;
      document
        .getElementById(this.weaponPosition)
        .classList.add("weaponPosition");
      for (let color in this.invaders) {
        if (this.invaders[color].length > 0) {
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
      this.invaderInterval = setInterval(this.moveInvaders, 1000 * this.speed);
    },
    fire(e) {
      if (e.code === "ArrowUp") {
        if (this.currentLazer === 0) {
          this.currentLazer = parseInt(this.weaponPosition) - 100;
          document.getElementById(this.currentLazer).classList.add("lazer");
          this.lazerInterval = setInterval(this.moveLazer, 50);
        }
      }
    },
    moveLazer() {
      this.checkIfLazerHitInvader();
      document.getElementById(this.currentLazer).classList.remove("lazer");
      this.currentLazer -= 100;
      if (this.currentLazer / 100 >= 11) {
        document.getElementById(this.currentLazer).classList.add("lazer");
        this.checkIfLazerHitInvader();
      } else {
        this.currentLazer = 0;
        clearInterval(this.lazerInterval);
      }
    },
    checkIfLazerHitInvader() {
      for (let color in this.invaders) {
        if (this.invaders[color].length > 0) {
          if (this.invaders[color].includes(this.currentLazer)) {
            clearInterval(this.lazerInterval);
            let temp = parseInt(this.currentLazer) + 100;
            if (!this.checkIfNeedDeleteLazer(temp)) {
              this.invaders[color] = this.invaders[color].filter(
                invader => invader != this.currentLazer
              );
              document
                .getElementById(this.currentLazer)
                .classList.remove("lazer", color);
              document.getElementById(this.currentLazer).classList.add("boom");
              let temp = this.currentLazer;
              setTimeout(
                () => document.getElementById(temp).classList.remove("boom"),
                200
              );
              this.currentLazer = 0;
              this.score++;
              if (this.score === 80) {
                document.getElementById("content").innerHTML = "You Win";
                document.getElementById("myModal").style.display = "block";
              }
            }
          }
        }
      }
    },
    checkIfNeedDeleteLazer(temp) {
      for (let invader in this.invaders) {
        if (this.invaders[invader].length > 0) {
          if (this.invaders[invader].includes(temp)) {
            document
              .getElementById(this.currentLazer)
              .classList.remove("lazer");
            this.currentLazer = 0;
            return true;
          }
        }
      }
      return false;
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
    moveAllInvadersDown() {
      for (let color in this.invaders) {
        if (this.invaders[color].length > 0) {
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
      }
    },
    moveAllInvadersLeftOrRight(offset) {
      for (let color in this.invaders) {
        if (this.invaders[color].length > 0) {
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
      }
    },
    checkIfInvadersWin() {
      for (let color in this.invaders) {
        if (this.invaders[color].length > 0) {
          if (this.invaders[color].includes(this.weaponPosition)) {
            clearInterval(this.lazerInterval);
            clearInterval(this.invaderInterval);
            document.getElementById(this.weaponPosition).classList.add("boom");
            document.getElementById("content").innerHTML = "Game over";
            document.getElementById("myModal").style.display = "block";
          }
        }
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
          this.moveAllInvadersDown();
          clearInterval(this.invaderInterval);
          this.speed -= 0.1;
          this.invaderInterval = setInterval(
            this.moveInvaders,
            1000 * this.speed
          );
        } else {
          this.moveAllInvadersLeftOrRight(1);
          if (
            this.invaders.blacks[this.invaders.blacks.length - 1] % 100 ===
            36
          ) {
            this.currentDirection = "left";
            this.movedDown = false;
          }
        }
        this.checkIfInvadersWin();
      }
      if (this.currentDirection === "left") {
        if (
          this.invaders.blacks[this.invaders.blacks.length - 1] % 100 === 36 &&
          !this.movedDown
        ) {
          this.movedDown = true;
          this.moveAllInvadersDown();
        } else {
          this.moveAllInvadersLeftOrRight(-1);
          if (this.invaders.blacks[0] % 100 === 11) {
            this.currentDirection = "right";
            this.movedDown = false;
          }
        }
      }
      this.checkIfInvadersWin();
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
  background-color: #e6ffff;
}
.space-grid {
  background-color: #e6ffff;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-blend-mode: multiply;
  border-radius: 50%;
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
}
.boom {
  background-image: url("../assets/bomb.png");
}
</style>