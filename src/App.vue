<template>
  <v-app>
    <v-app-bar app color="#b62f2f" dark>
      <div class="d-flex align-center">
        <a href="/">
          <v-img
            alt="Games"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="./assets/games.png"
            width="120"
          />
        </a>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="navigateTo('/flipCard')" text>
        <span class="mr-2">Memory Game</span>
      </v-btn>
      <v-btn @click="navigateTo('/whackTheMole')" text>
        <span class="mr-2">Whack The Mole</span>
      </v-btn>
      <v-btn @click="navigateTo('/fiveInARow')" text>
        <span class="mr-2">Five In A Row</span>
      </v-btn>
      <v-btn @click="navigateTo('/snake')" text>
        <span class="mr-2">Snake</span>
      </v-btn>
      <v-btn @click="navigateTo('/spaceInvaders')" text>
        <span class="mr-2">Space Invaders</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
  methods: {
    navigateTo(path) {
      this.$router.push(path);
      window.location.reload();
    }
  }
};
</script>
<style scoped>
</style>

