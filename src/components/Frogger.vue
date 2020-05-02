<template>
  <div>
    <div>
      <h2 class="frog-header">
        <pre>Score: {{score}}      Time Left: {{timeLeft}}      <span
  class="frog-btn"
  @click="startGame()"
>Start Game</span></pre>
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
      startPoint: 0,
      destination: 0,
      frogLeft: 0,
      frogTop: 0,
      water: [12, 13, 14, 15, 16, 17, 18, 19],
      road: [22, 23, 24, 25, 26, 27, 28, 29],
      grass: [11, 20, 21, 30]
    };
  },
  methods: {
    startGame() {
      window.addEventListener("keydown", this.moveFrog);
      //set up the board
      let allElements = document.querySelectorAll(".frog-grid div");
      allElements.forEach(element => {
        if (this.water.includes(Math.floor(element.id / 100)))
          element.classList.add("water");
        else if (this.road.includes(Math.floor(element.id / 100)))
          element.classList.add("road");
        else if (this.grass.includes(Math.floor(element.id / 100)))
          element.classList.add("grass");
      });
      let parentDiv = document.getElementsByClassName("frog-board")[0];
      //set up the water part
      setInterval(
        this.appendDivToWaterAndRoadPart,
        2000,
        parentDiv,
        "615px",
        "20px",
        "miniwood",
        "left",
        1000
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "25px",
        "45px",
        "shortwood",
        "right",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "530px",
        "70px",
        "longwood",
        "left",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "530px",
        "95px",
        "xlwood",
        "left",
        500
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        6000,
        parentDiv,
        "530px",
        "120px",
        "xlwood",
        "left",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "530px",
        "145px",
        "longwood",
        "left",
        700
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "25px",
        "165px",
        "shortwood",
        "right",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "0px",
        "190px",
        "miniwood",
        "right",
        1000
      );
      //set up the road part
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "0px",
        "265px",
        "car",
        "right",
        1000
      ),
        setInterval(
          this.appendDivToWaterAndRoadPart,
          3000,
          parentDiv,
          "25px",
          "290px",
          "tank",
          "right",
          600
        );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        2000,
        parentDiv,
        "530px",
        "315px",
        "rocket",
        "left",
        300
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "530px",
        "340px",
        "train",
        "left",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "0px",
        "365px",
        "car",
        "right",
        1000
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "25px",
        "390px",
        "tank",
        "right",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "530px",
        "415px",
        "rocket",
        "left",
        200
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        6000,
        parentDiv,
        "530px",
        "440px",
        "train",
        "left",
        600
      );
      this.startPoint = `${30}${Math.floor(Math.random() * 15) + 11}`;
      this.destination = `${11}${Math.floor(Math.random() * 15) + 11}`;
      console.log(this.startPoint, this.destination);
      document.getElementById(this.startPoint).classList.remove("grass");
      document.getElementById(this.destination).classList.remove("grass");
      document.getElementById(this.startPoint).classList.add("frog");
      document.getElementById(this.destination).classList.add("frog");
    },
    appendDivToWaterAndRoadPart(
      parentDiv,
      left,
      top,
      className,
      direction,
      time
    ) {
      let child = document.createElement("div");
      parentDiv.appendChild(child);
      child.style.left = left;
      child.style.top = top;
      child.classList.add(className);
      setInterval(this.moveAppendedDivs, time, parentDiv, child, direction);
    },
    moveAppendedDivs(parentDiv, child, direction) {
      let left = child.style.left;
      left = parseInt(left.slice(0, left.length - 2));
      if (direction === "right") {
        if (left > 560) {
          //parentDiv.remove(child);
          child.style.display = "none";
        } else {
          child.style.left = left + 25 + "px";
        }
      } else {
        if (left < 25) {
          //parentDiv.remove(child);
          child.style.display = "none";
        } else {
          child.style.left = left - 25 + "px";
        }
      }
    },
    moveFrog(e) {
      //go to the right
      if (e.code === "ArrowRight") {
        if (this.startPoint % 100 < 35) {
          document.getElementById(this.startPoint).classList.remove("frog");
          document.getElementById(this.startPoint).classList.add("grass");
          this.startPoint++;
          document.getElementById(this.startPoint).classList.remove("grass");
          document.getElementById(this.startPoint).classList.add("frog");
        }
      }
      //go to the left
      if (e.code === "ArrowLeft") {
        console.log(this.startPoint % 100);
        if (this.startPoint % 100 > 11) {
          document.getElementById(this.startPoint).classList.remove("frog");
          document.getElementById(this.startPoint).classList.add("grass");
          this.startPoint--;
          document.getElementById(this.startPoint).classList.remove("grass");
          document.getElementById(this.startPoint).classList.add("frog");
        }
      }
      // //go up
      // if (e.code === "ArrowUp") {
      // }
      // //go down
      // if (e.code === "ArrowDown") {
      // }
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
  background-blend-mode: multiply;
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
.xlwood {
  background-image: url("../assets/xlwood.png");
  width: 100px;
  height: 25px;
  position: absolute;
}
.longwood {
  background-image: url("../assets/longwood.png");
  width: 75px;
  height: 25px;
  position: absolute;
}
.shortwood {
  background-image: url("../assets/shortwood.png");
  width: 50px;
  height: 25px;
  position: absolute;
}
.miniwood {
  background-image: url("../assets/miniwood.png");
  width: 25px;
  height: 25px;
  position: absolute;
}
.car {
  background-image: url("../assets/car.png");
  width: 25px;
  height: 25px;
  position: absolute;
}
.tank {
  background-image: url("../assets/tank.png");
  width: 50px;
  height: 25px;
  position: absolute;
}
.rocket {
  background-image: url("../assets/rocket.png");
  width: 75px;
  height: 25px;
  position: absolute;
}
.train {
  background-image: url("../assets/train.png");
  width: 100px;
  height: 25px;
  position: absolute;
}
.frog {
  background-image: url("../assets/frog.png");
  background-color: white;
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