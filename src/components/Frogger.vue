<template>
  <div>
    <div>
      <h2 class="frog-header">
        <pre>Score: {{score}}      Time Left: {{timeLeft}}      <span
  class="frog-btn"
  @click="startGame()"
>Start Game</span>
<span class="frog-btn" @click="move()">move</span></pre>
      </h2>
    </div>
    <div class="frog-board">
      <div v-for="m in 25" :key="m" class="frog-grid">
        <div v-for="n in 20" :key="n" :id="`${(n+10)}${(m+10)}`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 0,
      score: 0,
      child: null
    };
  },
  methods: {
    startGame() {
      let parentDiv = document.getElementsByClassName("frog-board")[0];
      this.child = document.createElement("div");
      parentDiv.appendChild(this.child);
      this.child.style.left = "359px";
      this.child.style.top = "20px";
      this.child.classList.add("longwood");
      let allElements = document.querySelectorAll(".frog-grid div");
      let water = [12, 13, 14, 15, 16, 17, 18, 19];
      let road = [22, 23, 24, 25, 26, 27, 28, 29];
      let grass = [11, 20, 21, 30];
      allElements.forEach(element => {
        if (water.includes(Math.floor(element.id / 100)))
          element.classList.add("water");
        else if (road.includes(Math.floor(element.id / 100)))
          element.classList.add("road");
        else if (grass.includes(Math.floor(element.id / 100)))
          element.classList.add("grass");
      });
    },
    move() {
      let left = this.child.style.left;
      if (left === "559px") {
        this.child.style.left =
          parseInt(left.slice(0, left.length - 2)) - 25 + "px";
      } else {
        this.child.style.left =
          parseInt(left.slice(0, left.length - 2)) + 25 + "px";
      }
    }
  }
};
</script>

<style>
.frog-header {
  background-color: rgb(127, 157, 255);
  box-shadow: 1px 1px 1px 1px rgb(112, 121, 248);
  position: relative;
  justify-content: center;
  margin-bottom: 5px;
}
.frog-board {
  display: flex;
  /* width: 70%; */
  flex-wrap: wrap;
  width: calc(100vw * 0.5);
  height: calc(100vh * 0.8);
  position: relative;
  justify-content: center;
  left: 25%;
}
.frog-grid {
  background-color: #dfcef0;
  width: 4%;
  height: 100%;
}
.frog-grid div {
  width: 100%;
  height: 5%;
  /* border: black 1px solid; */
}
.frog-btn {
  font-size: 0.9rem;
  cursor: pointer;
  background: #9a49eb;
  padding: 2px;
  border-radius: 10%;
}
.longwood {
  background-image: url("../assets/longwood.png");
  width: 75px;
  height: 25px;
  position: absolute;
}
.grass {
  background-image: url("../assets/grass.png");
}
.water {
  background-image: url("../assets/water.png");
}
.road {
  background-image: url("../assets/road.png");
}
</style>