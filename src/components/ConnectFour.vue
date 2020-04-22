<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#ff9f80" dark>
            <h2>
              {{msg}}
              <br />
              Current Player: {{player}}
              <span class="btn" @click="call">Play Again</span>
            </h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="board">
      <div v-for="n in 256" :key="n" :id="n" class="grid"></div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      player: "Lin",
      msg: "Connect Four"
    };
  },
  methods: {
    call() {
      alert("ok");
    }
  }
};
</script>

<style>
h2 {
  margin-left: 10px;
}
.board {
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
}
.grid {
  border: 0.5px solid #ff9f80;
  border-collapse: collapse;
  background: #ffece6;
  height: 35px;
  width: 35px;
}
.btn {
  margin-left: 450px;
  font-size: 0.9rem;
  cursor: pointer;
  background: #cc3300;
  padding: 5px;
  border-radius: 10%;
}
</style>