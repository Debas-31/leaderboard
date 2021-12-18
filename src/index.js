import { fetchScore, createScores, createGame } from './api.js';
import './style.css';

const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const innerBody = `<header>
<h1>Leaderboard</h1>
</header>
<main>
  <section class = "recent-content">
      <div class = "recent-score">
      <h2>Recent scores</h2>
      <input id="refresh" type="button" value="Refresh">
      </div>
      <ul class = recent-list>
      </ul>
  </section>
  <section class="add-score">
    <h2>Add your score</h2>
    <form action "#">
      <input id="name" name = "name" type="text"  maxlength="30"  placeholder= "Your name">
      <input id="score" name="score" type="number" maxlength="30" placeholder= "Your score">
      <input id="submit" type="submit" value="Submit">
    </form>
  </section>
</main>
<footer>
  <p>Copyright &copy;2021&nbsp;&nbsp;Designed by: Dbus</p>
</footer>
`;
document.body.innerHTML = innerBody;

const gameIdFromStorage = () => {
  const localStorageID = localStorage.getItem('ID') ? JSON.parse(localStorage.getItem('ID')) : null;
  return localStorageID;
};
const saveGameOnLocalStorage = () => {
  const data = {
    name: 'My new game',
  };
  if (!gameIdFromStorage()) {
    window.addEventListener('load', async () => {
      const { result } = await createGame(`${baseURL}games`, data);
      const gameID = result.substr(14, 20);
      localStorage.setItem('ID', JSON.stringify(gameID));
    });
  }
};

const newScore = () => {
  const data = {
    user: '',
    score: '',
  };
  const player = document.getElementById('name');
  const playerScore = document.getElementById('score');
  const submitData = document.getElementById('submit');

  player.addEventListener('change', (e) => {
    data.user = e.target.value;
  });
  playerScore.addEventListener('change', (e) => {
    data.score = e.target.value;
  });

  submitData.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = `${baseURL}games/${gameIdFromStorage()}/scores`;
    await createScores(url, data);
    player.value = '';
    playerScore.value = '';
    window.location.reload();
  });
};

const getScores = async () => {
  const ulTag = document.querySelector('.recent-list');
  const liTag = document.createElement('li');
  const smallTag1 = document.createElement('small');
  const smallTag2 = document.createElement('small');
  const url = `${baseURL}games/${gameIdFromStorage()}/scores/`;
  const { result } = await fetchScore(url);
  result.forEach((item) => {
    smallTag1.textContent = `${item.user}:`;
    smallTag2.textContent = item.score;
    liTag.appendChild(smallTag1);
    liTag.appendChild(smallTag2);
    ulTag.appendChild(liTag.cloneNode(true));
  });
};

const refresh = document.querySelector('#refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});
getScores();
saveGameOnLocalStorage();
newScore();