function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const emojis = ["🐶", "🐱", "🐰", "🦊", "🐼", "🐵", "🐸", "🐷"];
const cards = shuffle([...emojis, ...emojis]); // duplicate & shuffle

const board = document.getElementById("game-board");

let flippedCards = [];
let matchedCards = [];

cards.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.innerText = "❓";

  card.addEventListener("click", () => {
    if (
      card.classList.contains("flipped") ||
      flippedCards.length === 2 ||
      matchedCards.includes(index)
    ) return;

    card.innerText = emoji;
    card.classList.add("flipped");
    flippedCards.push({ index, card, emoji });

    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.emoji === second.emoji) {
        matchedCards.push(first.index, second.index);
        flippedCards = [];
      } else {
        setTimeout(() => {
          first.card.innerText = "❓";
          second.card.innerText = "❓";
          first.card.classList.remove("flipped");
          second.card.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }

    if (matchedCards.length === cards.length) {
      setTimeout(() => {
        alert("🎉 You won the game!");
        location.reload();
      }, 500);
    }
  });

  board.appendChild(card);
});
