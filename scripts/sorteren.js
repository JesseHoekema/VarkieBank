let score = 0;

    function generatePackage() {
      let package = document.getElementById('package');
      let random = Math.random();

      if (random < 0.5) {
        package.src = 'assets/red_package.png';
        package.dataset.color = 'red';
      } else {
        package.src = 'assets/blue_package.png';
        package.dataset.color = 'blue';
      }
    }

    function checkColor(color) {
      let packageColor = document.getElementById('package').dataset.color;

      if (packageColor === color) {
        score += 2;
        document.getElementById('scoreValue').textContent = score;
      }
      else {
        alert("Verkeerd!")
      }

      generatePackage();
    }

    function storeScore() {
      sessionStorage.setItem('selectedItemPrice', score);
      window.location = "stortgeld.html"
    }

    // Initial setup
    generatePackage();