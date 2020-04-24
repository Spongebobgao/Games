<template>
  <v-card max-width="800" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#ff9f80" dark>
            <h3>
              Five In A row
              <br />Current Player:
              <span class="player">{{player}}</span>
              <span class="btn" @click="reRender">Play Again</span>
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
      <div v-for="m in 20" :key="m+10">
        <div
          v-for="n in 13"
          :key="n+10"
          :id="`${(n+10)}${(m+10)}`"
          class="grid"
          @click="placePiece(n+10,m+10)"
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
      pickedPieces: {},
      clicked: {}
    };
  },
  methods: {
    startOver() {
      this.reRender();
      this.closeModal();
    },
    closeModal() {
      document.getElementById("myModal").style.display = "none";
    },
    reRender() {
      for (var nm in this.clicked) {
        document.getElementById(nm).style.background = "#ffece6";
      }
      this.pickedPieces = {};
      this.clicked = {};
      this.player = "Player One";
    },
    placePiece(n, m) {
      let nm = `${n}${m}`;
      if (!(nm in this.clicked)) {
        if (this.player === "Player One") {
          document.getElementById(nm).style.backgroundColor = "black";
          this.clicked[nm] = { clicked: true };
          this.pickedPieces[nm] = { color: "black" };
          //everytime the player places a piece should check if there is a win
          this.player = "Player Two";
          this.checkForFive(nm, "Player One");
        } else {
          document.getElementById(nm).style.backgroundColor = "orange";
          this.clicked[nm] = { clicked: true };
          this.pickedPieces[nm] = {
            color: "orange",
            row: n,
            column: m
          };
          this.player = "Player One";
          this.checkForFive(nm, "Player Two");
        }
      }
    },
    //check row, column and diagonals, n is row m is column
    checkForFive(nm, player) {
      //check for same row
      this.fullCheck(nm, player, 1);
      //check the same column
      this.fullCheck(nm, player, 100);
      //check the top-left to bottom right diagonal
      this.fullCheck(nm, player, 101);
      //check the top-right to bottom left diagonal
      this.fullCheck(nm, player, 99);
    },
    fullCheck(nm, player, offset) {
      let count = 1;
      nm = parseInt(nm);
      let temp = nm - offset;
      if (player === "Player One") {
        while (temp in this.pickedPieces && count < 5) {
          if (this.pickedPieces[temp].color === "black") {
            count++;
            temp -= offset;
          } else break;
        }
        temp = nm + offset;
        while (temp in this.pickedPieces && count < 5) {
          if (this.pickedPieces[temp].color === "black") {
            count++;
            temp += offset;
          } else break;
        }
      } else {
        while (temp in this.pickedPieces && count < 5) {
          if (this.pickedPieces[temp].color === "orange") {
            count++;
            temp -= offset;
          } else break;
        }
        temp = nm + offset;
        while (temp in this.pickedPieces && count < 5) {
          if (this.pickedPieces[temp].color === "orange") {
            count++;
            temp += offset;
          } else break;
        }
      }
      // if (count === 5) this.msg = player + " win";
      if (count === 5) {
        document.getElementById("content").innerHTML = player + " Win";
        document.getElementById("myModal").style.display = "block";
      }
    }
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
/* the color of player 2 is orange */
.player {
  font-style: italic;
  color: #cc3300;
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
  background-color: #b62f2f;
  opacity: 0.8;
  margin: auto;
  padding: 20px;
  border: 1px solid #cc3300;
  border-radius: 15%;
  width: 60%;
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