const app = document.getElementById('values');

const row1 = document.createElement('div');
row1.setAttribute('class', 'row');

const row2 = document.createElement('div');
row2.setAttribute('class', 'row');

const valuesTitleContainer = document.createElement('div');
valuesTitleContainer.setAttribute('class', 'values-title');

const valuesTitle = document.createElement('h2');
valuesTitle.textContent = "Valores";

valuesTitleContainer.appendChild(valuesTitle);
row1.appendChild(valuesTitleContainer);
app.appendChild(row1);
app.appendChild(row2);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div');
      card.setAttribute('class', 'col span-1-of-4 values-box');

      const h3 = document.createElement('h3');
      h3.textContent = movie.title;

      const p = document.createElement('p');
      p.setAttribute('class', 'text');
      movie.description = movie.description.substring(0, 100);
      p.textContent = `${movie.description}...`;

      row2.appendChild(card);
      card.appendChild(h3);
      card.appendChild(p);
    });
  } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
  }
}

request.send();