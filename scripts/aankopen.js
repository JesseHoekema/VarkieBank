// Firebase configuratie
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

  // Get Firebase services
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Functie om gekochte items op te halen en te tonen
  function displayPaidItems() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const container = document.getElementById('paidItemsContainer');

        // Ophalen van de aankopen van de gebruiker uit Firestore
        db.collection('users').doc(userId).collection('purchases').get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const itemName = data.name;
            const itemPrice = data.price;

            // Maak een div voor elk item
            let div = document.createElement('div');
            div.classList.add('item');
            
            let itemTitle = document.createElement('h3');
            itemTitle.textContent = `${itemName}`;
            
            let itemAmount = document.createElement('p');
            itemAmount.innerHTML = `<img src="assets/Piggy_Tokens.webp" width="20px"> ${itemPrice}`;

            div.appendChild(itemTitle);
            div.appendChild(itemAmount);
            container.appendChild(div);
          });
        }).catch((error) => {
          console.error('Error getting documents: ', error);
          alert('Er is een fout opgetreden bij het ophalen van je aankopen.');
        });
      } else {
        alert('Je bent niet ingelogd.');
      }
    });
  }

  // Roep de functie aan om gekochte items te tonen wanneer de pagina geladen is
  displayPaidItems();