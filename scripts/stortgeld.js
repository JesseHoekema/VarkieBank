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
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;

      // Load the saved score from sessionStorage
      let score = sessionStorage.getItem('selectedItemPrice');
      if (score) {
        document.getElementById('scoreDisplay').textContent = score;
      }

      document.getElementById('depositButton').addEventListener('click', function() {
        if (score) {
          score = parseFloat(score);
          
          // Get the user's current moneyAmount from Firestore
          getMoneyAmount(userId).then((moneyAmount) => {
            moneyAmount = parseFloat(moneyAmount) || 0;
            const newAmount = moneyAmount + score;

            // Update the user's moneyAmount in Firestore
            updateMoneyAmount(userId, newAmount).then(() => {
              // Add transaction record to Firestore
              addTransaction(userId, score).then(() => {
                convertCredits()
                setTimeout(() => {
                  sessionStorage.removeItem('selectedItemPrice');
                  alert('Storting voltooid! Bedankt voor het storten.');
                  window.location.href = 'VarkieBank.html';
                }, 2000);
              }).catch((error) => {
                console.error('Error adding transaction:', error);
                alert('Er is een fout opgetreden bij het toevoegen van de transactie.');
              });
            }).catch((error) => {
              console.error('Error updating money amount:', error);
              alert('Er is een fout opgetreden bij het storten.');
            });
          }).catch((error) => {
            console.error('Error retrieving money amount:', error);
            alert('Er is een fout opgetreden bij het ophalen van het saldo.');
          });
        } else {
          alert('Er zijn geen Varkies om te storten.');
        }
      });
    } else {
      window.location.href = 'login.html';
    }
  });

  // Function to get moneyAmount from Firestore
  function getMoneyAmount(userId) {
    return db.collection('users').doc(userId).get().then((doc) => {
      if (doc.exists) {
        return doc.data().moneyAmount;
      } else {
        throw new Error('User data not found');
      }
    });
  }

  // Function to update moneyAmount in Firestore
  function updateMoneyAmount(userId, newAmount) {
    return db.collection('users').doc(userId).update({
      moneyAmount: newAmount
    });
  }

  // Function to add a transaction record to Firestore
  function addTransaction(userId, amount) {
    const transaction = `+ €${amount.toFixed(2)} gestort (${new Date().toLocaleString()})`;
    return db.collection('users').doc(userId).collection('transactions').add({
      description: transaction,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  function updateCredits(amountToAdd) {
    const user = auth.currentUser;
    const creditsText = document.getElementById('creditsText');

    if (user) {
        const uid = user.uid;
        const userRef = db.collection('users').doc(uid);

        userRef.get().then((doc) => {
            const userData = doc.data();
            const currentCredits = userData.credits || 0; // Als credits niet bestaan, begin bij 0
            const newCredits = currentCredits + amountToAdd;

            // Update de credits in Firestore
            userRef.update({ credits: newCredits }).then(() => {
                console.log(`Je nieuwe credits: ${newCredits}`)
            });
        }).catch((error) => {
            console.error('Fout bij het bijwerken van credits: ', error);
        });
    }
}

function convertCredits() {
  let score = sessionStorage.getItem('selectedItemPrice');

  if (score < 10) {
    score = parseInt(score, 10);
    updateCredits(score);
  } else {
    // Zorg dat score een nummer is
    score = parseInt(score, 10);
    let lastDigit = score % 10; // Haal de laatste cijfer door de rest te nemen
    console.log("Last digit:", lastDigit);
    updateCredits(lastDigit);

    // Hier kun je verder werken met lastDigit
  }
}
