import './style.css';

const innerBody = `<header>
<h1>Leaderboard</h1>
</header>
<main>
  <section class = "recent-content">
      <div class = "recent-score">
      <h2>Recent scores</h2>
      <button type = "button">Refresh</button>
      </div>
      <ul class = recent-list>
        <li>Name: 100</li>
        <li>Name: 20</li>
        <li>Name: 50</li>
        <li>Name: 78</li>
        <li>Name: 125</li>
        <li>Name: 77</li>
        <li>Name: 42</li>
      </ul>
  </section>
  <section class="add-score">
    <h2>Add your score</h2>
    <form action "#">
      <input id="name" type="text" placeholder= "Your name">
      <input id="score" type="number" placeholder= "Your score">
      <input id="submit" type="submit" value="Submit">
    </form>
</main>
`;
document.body.innerHTML = innerBody;

const gameIdFromStorage = () => {
  const localStorageID = localStorage.getItem('ID')? JSON.parse(localStorage.getItem('ID')) : null;
  return localStorageID;
};
const saveGameOnLocalStorage = () => {
  const data = {
    name: 'My new game'
  };
  if(!gameIdFromStorage()){
    window.addEventListener('load', async() => {
      const { result } = await createGame(`${baseURL}games`, data);
      const gameID = result.substr(14, 20);
      localStorage.setItem('ID', JSON.stringify(gameID));
    });
  }
};

const newScore = () => {
  const data = {
    user: '',
    score: ''
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

  submitData.addEventListener('click', async(e) => {
    e.preventDefault();
    const url = `${baseURL}games/${gameIdFromStorage()}/scores`;
    await createScores(url, data);
    player.value = '';
    playerScore.value = '';
    window.location.reload();
  });
};
