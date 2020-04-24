<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#dcdcdc" dark>
            <h3>
              Snake:
              <span style="font-size:0.8rem">use ↑ → ↓ ← to control the direction</span>
              <br />
              <span>Score:</span>
              <span class="btn" @click="startGame">Start Game</span>
            </h3>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="board">
      <div v-for="n in 1218" :key="n" :id="`${n}`" class="grid"></div>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    startGame() {}
  }
};
</script>

<style scoped>
h3 {
  margin-left: 20px;
  color: #666;
}
.board {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 80%;
  height: 80%;
  margin-bottom: 10px;
}
.grid {
  border: 0.5px#f2f2f2 solid;
  background: #dcdcdc;
  width: 15px;
  height: 15px;
  cursor: pointer;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #f2f2f2;
}
.btn {
  float: right;
  font-size: 0.9rem;
  cursor: pointer;
  background: #b3b3b3;
  padding: 2px;
  border-radius: 10%;
  margin-right: 40px;
}
</style>