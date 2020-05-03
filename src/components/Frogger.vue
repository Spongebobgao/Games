<template>
  <div>
    <div>
      <h2 class="frog-header">
        <pre>Time Left: {{timeLeft}}      <span class="frog-btn" @click="startGame()">Start Game</span></pre>
      </h2>
    </div>
    <div class="frog-board">
      <div v-for="m in 25" :key="m" class="frog-grid">
        <div v-for="n in 20" :key="n" :id="`${(n+10)}${(m+10)}`"></div>
      </div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="startOver" @click="startOver">Play Again</span>
          <span @click="closeModal" class="close">&times;</span>
          <p id="content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 60,
      startPoint: 0,
      destination: 0,
      frogLeft: 0,
      frogTop: 0,
      destinationLeft: 0,
      frog: null,
      allClasses: {
        water: [12, 13, 14, 15, 16, 17, 18, 19],
        road: [22, 23, 24, 25, 26, 27, 28, 29],
        grass: [11, 20, 21, 30]
      }
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
      window.addEventListener("keydown", this.moveFrog);
      //set up the board
      this.timeLeft = 60;
      setInterval(() => {
        if (this.timeLeft > 0) this.timeLeft--;
      }, 1000);
      let allElements = document.querySelectorAll(".frog-grid div");
      allElements.forEach(element => {
        if (this.allClasses.water.includes(Math.floor(element.id / 100)))
          element.classList.add("water");
        else if (this.allClasses.road.includes(Math.floor(element.id / 100)))
          element.classList.add("road");
        else if (this.allClasses.grass.includes(Math.floor(element.id / 100)))
          element.classList.add("grass");
      });
      let parentDiv = document.getElementsByClassName("frog-board")[0];
      //set up the water part
      setInterval(
        this.appendDivToWaterAndRoadPart,
        2000,
        parentDiv,
        "600px",
        "25px",
        "miniwood",
        "left",
        1000
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "25px",
        "50px",
        "shortwood",
        "right",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "525px",
        "75px",
        "longwood",
        "left",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "525px",
        "100px",
        "xlwood",
        "left",
        500
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        6000,
        parentDiv,
        "525px",
        "125px",
        "xlwood",
        "left",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "525px",
        "150px",
        "longwood",
        "left",
        700
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "25px",
        "175px",
        "shortwood",
        "right",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "0px",
        "200px",
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
        "275px",
        "car",
        "right",
        1000
      ),
        setInterval(
          this.appendDivToWaterAndRoadPart,
          3000,
          parentDiv,
          "25px",
          "300px",
          "tank",
          "right",
          600
        );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        2000,
        parentDiv,
        "525px",
        "325px",
        "rocket",
        "left",
        300
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        5000,
        parentDiv,
        "525px",
        "350px",
        "train",
        "left",
        600
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "0px",
        "375px",
        "car",
        "right",
        1000
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        4000,
        parentDiv,
        "25px",
        "400px",
        "tank",
        "right",
        800
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        3000,
        parentDiv,
        "525px",
        "425px",
        "rocket",
        "left",
        200
      );
      setInterval(
        this.appendDivToWaterAndRoadPart,
        6000,
        parentDiv,
        "525px",
        "450px",
        "train",
        "left",
        600
      );
      this.startPoint = `${30}${Math.floor(Math.random() * 15) + 11}`;
      this.destination = `${11}${Math.floor(Math.random() * 15) + 11}`;
      document.getElementById(this.destination).classList.remove("grass");
      document.getElementById(this.destination).classList.add("home");
      this.destinationLeft = ((this.destination % 100) - 10 - 1) * 25;
      this.frogLeft = ((this.startPoint % 100) - 10 - 1) * 25;
      this.frogTop = 19 * 25;
      this.frog = document.createElement("div");
      parentDiv.appendChild(this.frog);
      this.frog.style.left = this.frogLeft + "px";
      this.frog.style.top = this.frogTop + "px";
      this.frog.classList.add("frog");
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
      let top = parseInt(child.style.top.slice(0, left.length - 2));
      left = parseInt(left.slice(0, left.length - 2));
      this.checkIfFrogGotHit(left, top);
      if (direction === "right") {
        if (left > 550) {
          child.style.display = "none";
        } else {
          child.style.left = left + 25 + "px";
        }
      } else {
        if (left < 25) {
          child.style.display = "none";
        } else {
          child.style.left = left - 25 + "px";
        }
      }
    },
    checkIfFrogGotHit(left, top) {
      //check the road aera top 265 bottom 465
      if (this.frogTop > 275 && this.frogTop === top) {
        if (this.frogLeft === left) {
          document.getElementById("content").innerHTML = "Game Over";
          document.getElementById("myModal").style.display = "block";
        }
      } else if (
        (this.frogTop > 25) & (this.frogTop < 200) &&
        this.frogTop === top
      ) {
        if (this.frogLeft === left) {
          document.getElementById("content").innerHTML = "Game Over";
          document.getElementById("myModal").style.display = "block";
        }
      }
    },
    moveFrog(e) {
      //go to the right
      if (e.code === "ArrowRight") {
        if (this.frogLeft < 600) {
          this.moveFrogAllDirections(25, 0);
        }
      }
      //go to the left
      if (e.code === "ArrowLeft") {
        if (this.frogLeft >= 25) {
          this.moveFrogAllDirections(-25, 0);
        }
      }
      //go up
      if (e.code === "ArrowUp") {
        if (this.frogTop >= 25) {
          this.moveFrogAllDirections(0, -25);
        }
      }
      //go down
      if (e.code === "ArrowDown") {
        if (this.frogTop < 475) {
          this.moveFrogAllDirections(0, 25);
        }
      }
      if (this.frogLeft === this.destinationLeft && this.frogTop === 0) {
        document.getElementById("content").innerHTML = "You Win";
        document.getElementById("myModal").style.display = "block";
      }
    },
    moveFrogAllDirections(left, top) {
      this.frogTop = this.frogTop + top;
      this.frogLeft = this.frogLeft + left;
      this.frog.style.left = this.frogLeft + "px";
      this.frog.style.top = this.frogTop + "px";
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
  /* width: calc(100vw * 0.5);
  height: calc(100vh * 0.8); */
  width: 625px;
  height: 500px;
  position: relative;
  justify-content: center;
  left: 25%;
  background-image: url("../assets/frog-board.png");
}
.frog-grid {
  width: 4%;
  height: 100%;
}
.frog-grid div {
  /* width: 100%;
  height: 5%; */
  width: 25px;
  height: 25px;
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
  width: 25px;
  height: 25px;
  position: absolute;
  z-index: 3;
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
.home {
  background-image: url("../assets/home.png");
}
</style>