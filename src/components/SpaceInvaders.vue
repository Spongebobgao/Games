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
      weapon: 2711
    };
  },
  methods: {
    startGame() {
      document.getElementById(this.weapon).classList.add("weapon");
      window.addEventListener("keydown", this.moveWeapon);
    },
    moveWeapon(e) {
      if (e.code === "ArrowLeft") {
        document.getElementById(this.weapon--).classList.remove("weapon");
        document.getElementById(this.weapon).classList.add("weapon");
      }
      if (e.code === "ArrowRight") {
        document.getElementById(this.weapon++).classList.remove("weapon");
        document.getElementById(this.weapon).classList.add("weapon");
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