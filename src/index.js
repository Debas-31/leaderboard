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
      <input type="text" placeholder= "Your name">
      <input type="number" placeholder= "Your score">
      <input type="submit" value="Submit">
    </form>
</main>
`;
document.body.innerHTML = innerBody;