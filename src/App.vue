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

      <v-btn href="/flipCard" text>
        <span class="mr-2">Games</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <!-- <Home /> -->
      <FlipCard />
    </v-content>
  </v-app>
</template>

<script>
//import Home from "./components/Home";
import FlipCard from "./components/FlipCard";
export default {
  name: "App",

  components: {
    // Home,
    FlipCard
  },

  data: () => ({
    methods: {}
  })
};
</script>
<style scoped>
</style>

