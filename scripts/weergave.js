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

  document.addEventListener('DOMContentLoaded', function () {
    const displayClicks = document.getElementById('clicks');
    const storedClicks = sessionStorage.getItem('clickCount') || 0;

    if (storedClicks !== null) {
      displayClicks.textContent = storedClicks;
    } else {
      displayClicks.textContent = '0';
    }
  });

  function saveMoney() {
    const displayClicks = parseFloat(document.getElementById('clicks').textContent);
    if (isNaN(displayClicks) || displayClicks <= 0) {
      alert('Voer een geldig bedrag in om te storten.');
      return;
    }

    // Get the currently authenticated user
    const user = auth.currentUser;
    if (!user) {
      alert('Je moet ingelogd zijn om te storten.');
      window.location.href = 'login.html';
      return;
    }

    const userId = user.uid;

    // Update the user's moneyAmount in Firestore
    getMoneyAmount(userId).then((moneyAmount) => {
      moneyAmount = parseFloat(moneyAmount) || 0;
      const newAmount = moneyAmount + displayClicks;

      return updateMoneyAmount(userId, newAmount);
    }).then(() => {
      // Add transaction record to Firestore
      return addTransaction(userId, displayClicks);
    }).then(() => {
      sessionStorage.removeItem('clickCount');
      alert('Storting voltooid! Bedankt voor het storten.');
      window.location.href = 'VarkieBank.html';
    }).catch((error) => {
      console.error('Error:', error);
      alert('Er is een fout opgetreden bij het storten.');
    });
  }

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