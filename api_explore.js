class Game {
    constructor(id, name, released, rating, platforms) {
      this.id = id;
      this.name = name;
      this.released = released;
      this.rating = rating;
      this.platforms = platforms;
    }
  }
  
  async function fetchGames() {
    const url = "https://api.rawg.io/api/games?key=" + "d1576c827942425a9583e050847d443f";
    const options = {
      method: "GET"
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results.map(result => new Game(
        result.id,
        result.name,
        result.released,
        result.rating,
        result.platforms.map(platform => platform.platform.name) // Extracting platform names
      ));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  function displayGames(games) {
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const headers = ['ID', 'Name', 'Released', 'Rating', 'Platforms'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    games.forEach(game => {
      const row = table.insertRow();
      Object.values(game).forEach(value => {
        const cell = row.insertCell();
        if (value instanceof Array) { // If value is an array (e.g., platforms)
          cell.textContent = value.join(', '); // Join platform names with comma and space
        } else {
          cell.textContent = value;
        }
      });
    });
  
    document.body.appendChild(table);
  }
  
  (async function () {
    const games = await fetchGames();
    displayGames(games);
  })();
  