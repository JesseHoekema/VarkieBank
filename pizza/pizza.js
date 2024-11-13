// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyYvZz5iFrvfTyxkrGr31eyXEBVwP19t8",
    authDomain: "chatgpt-login-form.firebaseapp.com",
    databaseURL: "https://chatgpt-login-form-default-rtdb.firebaseio.com",
    projectId: "chatgpt-login-form",
    storageBucket: "chatgpt-login-form.appspot.com",
    messagingSenderId: "296337753854",
    appId: "1:296337753854:web:b050ebfe6cba224a1b87af"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  let clickCount = 0;

  function floppaSkin() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;

        db.collection('users').doc(userId).get().then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            if (userData.floppaCoin === true) {
              let clickAmount = 100;
              const coin = document.getElementById("cookie");
              clickCount += clickAmount;
              document.getElementById('clicks').textContent = clickCount;
              var audio = new Audio('/assets/sounds/clickpizza.mp3');
              audio.play();
            } else {
                window.location.href = "/VarkieBank.html"
            }
          } else {
            alert('Gebruiker niet gevonden.');
          }
        }).catch(error => {
          console.error('Error getting user data: ', error);
          alert('Er is een fout opgetreden bij het ophalen van je gegevens.');
        });
      } else {
        alert('Je bent niet ingelogd.');
      }
    });
  }

  function saveClicks() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;
        const valuePerClick = 1; // Aantal euro's per klik
        const totalMoney = clickCount * valuePerClick;

        db.collection('users').doc(userId).get().then(doc => {
          if (doc.exists) {
            const userData = doc.data();
            const storedMoney = userData.moneyAmount || 0;
            const newMoneyAmount = parseFloat(storedMoney) + totalMoney;

            db.collection('users').doc(userId).update({
              moneyAmount: newMoneyAmount
            }).then(() => {
              sessionStorage.setItem('clickCount', clickCount);
              alert('Aantal klikken opgeslagen!');
              window.location.href = '/weergave.html';
            }).catch(error => {
              console.error('Error updating user data: ', error);
              alert('Er is een fout opgetreden bij het opslaan van klikken.');
            });
          } else {
            alert('Gebruiker niet gevonden.');
          }
        }).catch(error => {
          console.error('Error getting user data: ', error);
          alert('Er is een fout opgetreden bij het ophalen van je gegevens.');
        });
      } else {
        alert('Je bent niet ingelogd.');
      }
    });
  }

  function toggleHeight() {
    var header = document.getElementById("mainHeader");
    var p = document.getElementById("p");
    var logo = document.getElementById("logo");
    p.style.display = p.style.display === "none" ? "block" : "none";
    logo.style.display = logo.style.display === "none" ? "block" : "none";
    header.style.height = header.style.height === "50px" ? "100px" : "50px";
  }
  function playPizza() {
    var audio = new Audio('/assets/sounds/pizza.mp3');
    audio.play();
    audio.loop()
  }
  playPizza()