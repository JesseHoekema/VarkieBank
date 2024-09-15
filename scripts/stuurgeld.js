// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyYvZz5iFrvfTyxkrGr31eyXEBVwP19t8",
    authDomain: "chatgpt-login-form.firebaseapp.com",
    projectId: "chatgpt-login-form",
    storageBucket: "chatgpt-login-form.appspot.com",
    messagingSenderId: "296337753854",
    appId: "1:296337753854:web:b050ebfe6cba224a1b87af"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

  // Function to send money
  function sendMoney(recipientEmail, amount) {
    const resultElement = document.getElementById('result');
    const currentUser = auth.currentUser;

    if (!currentUser) {
      resultElement.textContent = 'Je moet ingelogd zijn om geld te versturen.';
      return;
    }

    // Get current user (sender)
    const senderDocRef = db.collection('users').doc(currentUser.uid);

    // Get the recipient by email
    db.collection('users').where('email', '==', recipientEmail).get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          resultElement.textContent = 'Geen gebruiker gevonden met dit e-mailadres.';
          return;
        }

        const recipientDoc = querySnapshot.docs[0];
        const recipientData = recipientDoc.data();

        // Update the recipient's moneyAmount
        const newRecipientMoney = recipientData.moneyAmount + amount;

        // Update the sender's moneyAmount
        senderDocRef.get().then((senderSnapshot) => {
          const senderData = senderSnapshot.data();
          const newSenderMoney = senderData.moneyAmount - amount;

          if (newSenderMoney < 0) {
            resultElement.textContent = 'Onvoldoende saldo om dit bedrag te versturen.';
            return;
          }

          // Begin batch write to ensure atomic updates
          const batch = db.batch();

          // Update recipient's moneyAmount
          batch.update(recipientDoc.ref, { moneyAmount: newRecipientMoney });

          // Update sender's moneyAmount
          batch.update(senderDocRef, { moneyAmount: newSenderMoney });

          // Commit the batch update
          return batch.commit();
        })
        .then(() => {
          resultElement.textContent = `Succes! Je hebt €${amount} overgemaakt aan ${recipientEmail}.`;
          window.location.href = "VarkieBank.html"
        })
        .catch(error => {
          console.error('Error bij het verwerken van de transactie:', error);
          resultElement.textContent = 'Er is een fout opgetreden bij het verwerken van de transactie.';
        });
      })
      .catch(error => {
        console.error('Error bij het zoeken van de ontvanger:', error);
        resultElement.textContent = 'Er is een fout opgetreden bij het zoeken van de ontvanger.';
      });
  }

  // Event listener for form submission
  document.getElementById('sendMoneyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const recipientEmail = document.getElementById('recipientEmail').value;
    const amount = parseFloat(document.getElementById('amount').value);
    sendMoney(recipientEmail, amount);
  });

  // Authentication check
  auth.onAuthStateChanged(user => {
    if (!user) {
      alert('Je moet ingelogd zijn om toegang te krijgen tot deze pagina.');
      window.location.href = 'login.html'; // Redirect naar login pagina als de gebruiker niet ingelogd is
    }
  });