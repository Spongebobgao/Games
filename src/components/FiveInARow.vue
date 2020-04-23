<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#ff9f80" dark>
            <h3>
              {{msg}}
              <br />Current Player:
              <span class="player">{{player}}</span>
              <span class="btn" @click="reRender">Play Again</span>
            </h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="board">
      <div v-for="m in 20" :key="m">
        <div
          v-for="n in 13"
          :key="n"
          :id="`${n.toString()+m}`"
          class="grid"
          @click="placePiece(`${n.toString()+m}`)"
        ></div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      player: "Player One",
      msg: "Five In A row",
      black: [],
      orange: [],
      clicked: []
    };
  },
  methods: {
    reRender() {
      window.location.reload();
    },
    placePiece(mn) {
      if (!this.clicked.includes(mn)) {
        if (this.player === "Player One") {
          document.getElementById(mn).classList.add("black");
          this.black.push({ color: "black", id: mn });
          this.clicked.push(mn);
          this.player = "Player Two";
          //everytime the player places a piece should check if there is a win
          this.checkForFive(mn);
        } else {
          document.getElementById(mn).classList.add("orange");
          this.orange.push({ mn: "orange" });
          this.clicked.push(mn);
          this.player = "Player One";
          this.checkForFive(mn);
        }
      }
    },
    checkForFive() {}
  }
};
</script>

<style scoped>
h3 {
  margin-left: 10px;
}
.board {
  display: flex;
  flex-wrap: wrap;
  margin: 0 50px 0 50px;
}
.grid {
  border: 0.5px solid #fac9bb;
  border-collapse: collapse;
  border-radius: 50%;
  background: #ffece6;
  height: 35px;
  width: 35px;
  cursor: pointer;
}
.btn {
  margin-left: 400px;
  font-size: 0.9rem;
  cursor: pointer;
  background: #cc3300;
  padding: 2px;
  border-radius: 10%;
}
/* the color of player 1 is black */
.black {
  background: black;
}
/* the color of player 2 is orange */
.orange {
  background: orange;
}
.player {
  font-style: italic;
  color: #cc3300;
}
</style>