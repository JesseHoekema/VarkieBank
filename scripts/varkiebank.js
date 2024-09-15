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

// Firebase initialiseren
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Haal de huidige gebruiker op en toon hun e-mail
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('userEmail').textContent = user.email;
    // Haal het moneyAmount op uit Firestore voor de huidige gebruiker
    const userId = user.uid;
    db.collection('users').doc(userId).get().then((doc) => {
      if (doc.exists) {
        const moneyAmount = doc.data().moneyAmount || 0;
        document.getElementById('displayMoney').value = `€${moneyAmount.toFixed(2)}`;
      } else {
        console.log("Geen document gevonden!");
        document.getElementById('displayMoney').value = 'Geen saldo beschikbaar';
      }
    }).catch((error) => {
      console.log("Fout bij ophalen van het saldo:", error);
      document.getElementById('displayMoney').value = 'Fout bij ophalen saldo';
    });

    // Haal transactiegeschiedenis op uit Firestore
    db.collection('users').doc(userId).collection('transactions').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        appendTransaction(doc.data().description);
      });
    }).catch((error) => {
      console.error("Fout bij het ophalen van transacties:", error);
    });
  } else {
    // Gebruiker is niet ingelogd, stuur ze naar de loginpagina
    window.location.href = 'login.html';
  }
});

function appendTransaction(transaction) {
  const transactionsList = document.getElementById('transactions');
  const transactionItem = document.createElement('li');
  transactionItem.textContent = transaction;
  transactionsList.appendChild(transactionItem);
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = 'login.html'; // Redirect na uitloggen
  }).catch((error) => {
    console.error('Fout bij uitloggen:', error);
  });
}

function changePassword() {
  const user = auth.currentUser;
  const emailAddress = user.email;

  auth.sendPasswordResetEmail(emailAddress).then(() => {
    alert('Er is een e-mail verzonden naar ' + emailAddress + ' om je wachtwoord te wijzigen.');
  }).catch((error) => {
    console.error('Fout bij het verzenden van e-mail voor wachtwoordwijziging:', error);
  });
}
// Function to clear all transactions for the current user
function clearTransactions() {
auth.onAuthStateChanged(user => {
if (user) {
  const userId = user.uid;

  // Reference to the transactions subcollection
  const transactionsRef = db.collection('users').doc(userId).collection('transactions');

  // Get all documents in the transactions subcollection
  transactionsRef.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      alert('Geen transacties gevonden.');
      return;
    }

    // Create a batch to delete all documents
    const batch = db.batch();

    querySnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Commit the batch
    return batch.commit();
  }).then(() => {
    location.reload();
  }).catch(error => {
    console.error('Error clearing transactions: ', error);
    alert('Er is een fout opgetreden bij het verwijderen van transacties.');
  });
} else {
  alert('Je bent niet ingelogd.');
}
});
}

// Navigatie functies blijven hetzelfde
function stort() { window.location="ad.html"; }
function verdien() { window.location.href="cookie_clicker.html"; }
function winkel() { window.location.href="winkel.html"; }
function aankopen() { window.location.href="aankopen.html"; }
function werken() { window.location.href="werken.html"; }
function school() { window.location.href="koeienleren.html"; }
function cadeukaart() { window.location.href="cadeukaart.html"; }
function geldsturen() { window.location.href="stuurvarkies.html"; }