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
      <div v-for="n in 260" :key="n" :id="n" class="grid" @click="placePiece(n)"></div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      player: "Player One",
      msg: "Connect Four"
    };
  },
  methods: {
    reRender() {
      window.location.reload();
    },
    placePiece(n) {
      if (this.player === "Player One") {
        document.getElementById(n).classList.add("black");
        this.player = "Player Two";
      } else {
        document.getElementById(n).classList.add("orange");
        this.player = "Player One";
      }
    }
  }
};
</script>

<style>
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
.black {
  background: black;
}
.orange {
  background: orange;
}
.player {
  font-style: italic;
  color: #cc3300;
}
</style>