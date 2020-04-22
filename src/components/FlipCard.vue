<template>
  <div>
    <h1>
      Score:
      <span class="score">{{score}}</span>
    </h1>
    <h2>{{msg}}</h2>
    <div class="board">
      <img
        v-for="n in 16"
        :id="`${n-1}`"
        class="card"
        src="../assets/background.jpg"
        @click="flipCard(n-1)"
        :key="n"
      />
    </div>
    <button type="button" @click="reRender" class="btn">Play again</button>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  created() {
    this.allTheCards.sort(() => Math.random() - 0.5);
  },
  data() {
    return {
      allTheCards: [
        {
          name: "bear",
          img: require("../assets/bear.png")
        },
        {
          name: "bird",
          img: require("../assets/bird.png")
        },
        {
          name: "cat",
          img: require("../assets/cat.jpg")
        },
        {
          name: "elephant",
          img: require("../assets/elephant.jpeg")
        },
        {
          name: "fox",
          img: require("../assets/fox.jpg")
        },
        {
          name: "lion",
          img: require("../assets/lion.png")
        },
        {
          name: "pig",
          img: require("../assets/pig.jpg")
        },
        {
          name: "tiger",
          img: require("../assets/tiger.png")
        },
        {
          name: "bear",
          img: require("../assets/bear.png")
        },
        {
          name: "bird",
          img: require("../assets/bird.png")
        },
        {
          name: "cat",
          img: require("../assets/cat.jpg")
        },
        {
          name: "elephant",
          img: require("../assets/elephant.jpeg")
        },
        {
          name: "fox",
          img: require("../assets/fox.jpg")
        },
        {
          name: "lion",
          img: require("../assets/lion.png")
        },
        {
          name: "pig",
          img: require("../assets/pig.jpg")
        },
        {
          name: "tiger",
          img: require("../assets/tiger.png")
        }
      ],
      cardChosen: [],
      cardChosenId: [],
      allChosenId: [],
      score: 0,
      msg: "Let's Play",
      src: null
    };
  },
  methods: {
    //flip card
    flipCard(id) {
      if (!this.allChosenId.includes(id) && !this.cardChosenId.includes(id)) {
        this.src = this.allTheCards[id].img;
        console.log(typeof this.src);
        this.cardChosen.push(this.allTheCards[id].name);
        document.getElementById(id).setAttribute("src", this.src);
        this.cardChosenId.push(id);
        if (this.cardChosen.length === 2) {
          setTimeout(this.checkMatch, 200);
        }
      }
    },
    //check if the cards are match
    checkMatch() {
      var cards = document.querySelectorAll("img");
      const optionOneId = this.cardChosenId[0];
      const optionTwoId = this.cardChosenId[1];
      if (this.cardChosen[0] === this.cardChosen[1]) {
        this.allChosenId.push(optionOneId);
        this.allChosenId.push(optionTwoId);
        this.msg = "You found a match!";
        cards[optionOneId].setAttribute(
          "src",
          require("../assets/correct.jpg")
        );
        cards[optionTwoId].setAttribute(
          "src",
          require("../assets/correct.jpg")
        );
        this.score++;
      } else {
        this.msg = "Please try again!";
        cards[optionOneId].setAttribute(
          "src",
          require("../assets/background.jpg")
        );
        cards[optionTwoId].setAttribute(
          "src",
          require("../assets/background.jpg")
        );
      }
      this.cardChosen = [];
      this.cardChosenId = [];
      if (this.score === this.allTheCards.length / 2) {
        this.msg = "Congratulations! You found all the matches!";
      }
    },
    reRender() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}
.board {
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  height: 400px;
  margin: auto;
}
.btn {
  margin-left: 600px;
  margin-top: 20px;
  height: 2rem;
  background: #b8860b;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 2px 2px 2px 2px grey;
}
.card {
  cursor: pointer;
  box-shadow: 5px 5px 5px 5px grey;
}
</style>