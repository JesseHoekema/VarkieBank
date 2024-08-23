let score = 0;
let container = document.getElementById('container');
let house = document.getElementById('house');
let package = document.getElementById('package');
let scoreDisplay = document.getElementById('score');

// Random positie genereren voor het huis
generateHouse();

// Event listeners toevoegen
package.addEventListener('dragstart', dragStart);
house.addEventListener('dragover', dragOver);
house.addEventListener('drop', drop);
scoreBtn.addEventListener('click', stortPunten);

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData('text');
  let draggedElement = document.getElementById(data);

  // Plaats het pakket op de plek waar het is neergezet
  draggedElement.style.left = (event.clientX - container.offsetLeft - draggedElement.offsetWidth / 2) + 'px';
  draggedElement.style.top = (event.clientY - container.offsetTop - draggedElement.offsetHeight / 2) + 'px';

  // Controleer of het pakket direct bovenop het huis is geplaatst
  let packageRect = draggedElement.getBoundingClientRect();
  let houseRect = house.getBoundingClientRect();

  if (isOnHouse(packageRect, houseRect)) {
    score += 8; // Voeg 8 punten toe voor succesvolle levering
    scoreDisplay.textContent = 'Score: ' + score;
    generateHouse(); // Genereer een nieuw huis op een willekeurige positie
  }
}

function isOnHouse(packageRect, houseRect) {
  return (
    packageRect.left >= houseRect.left &&
    packageRect.right <= houseRect.right &&
    packageRect.top >= houseRect.top &&
    packageRect.bottom <= houseRect.bottom
  );
}

function generateHouse() {
  // Genereer willekeurige positie voor het huis binnen het containergebied
  let maxX = container.offsetWidth - house.offsetWidth;
  let maxY = container.offsetHeight - house.offsetHeight;

  let randomX = Math.floor(Math.random() * maxX);
  let randomY = Math.floor(Math.random() * maxY);

  house.style.left = randomX + 'px';
  house.style.top = randomY + 'px';
}

function stortPunten() {
  // Sla de score op in sessionStorage
  sessionStorage.setItem('selectedItemPrice', score);

  // Stuur gebruiker naar een andere pagina (bijvoorbeeld 'aankoop.html') om de punten te storten
  window.location.href = 'stortgeld.html';
}