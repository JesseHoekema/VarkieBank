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

  document.addEventListener('DOMContentLoaded', function () {
    const selectedItemPrice = parseInt(sessionStorage.getItem('selectedItemPrice')) || 0;
    document.getElementById('itemPrice').textContent = `${selectedItemPrice}`;
  });

  function confirmPurchase() {
    const selectedItemPrice = parseInt(sessionStorage.getItem('selectedItemPrice')) || 0;
    const itemName = sessionStorage.getItem('selectedItemName') || "Onbekend";

    auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;

        db.collection('users').doc(userId).get().then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            const storedMoney = userData.moneyAmount || 0;

            if (storedMoney < selectedItemPrice) {
              alert('Je hebt niet genoeg geld om dit artikel te kopen!');
            } else {
              const newMoneyAmount = storedMoney - selectedItemPrice;
              let paidProducts = userData.paidProducts || [];
              paidProducts.push({ name: itemName });

              // Update user data in Firestore
              db.collection('users').doc(userId).update({
                moneyAmount: newMoneyAmount,
                paidProducts: paidProducts
              }).then(() => {
                // Create purchase record
                const now = new Date();
                const formattedDate = now.toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });

                const purchase = {
                  name: itemName,
                  price: selectedItemPrice,
                  timestamp: now
                };

                // Add purchase record to 'purchases' subcollection
                db.collection('users').doc(userId).collection('purchases').add(purchase).then(() => {
                  // Create transaction description
                  const transactionDescription = `- €${selectedItemPrice} ${itemName} Gekocht ${formattedDate}`;

                  // Create transaction record
                  const transaction = {
                    description: transactionDescription,
                    timestamp: now
                  };

                  // Add transaction record to 'transactions' subcollection
                  db.collection('users').doc(userId).collection('transactions').add(transaction).then(() => {
                    // Check and set Floppa Coin
                    if (itemName === "Floppa Coin") {
                      db.collection('users').doc(userId).update({
                        floppaCoin: true
                      }).then(() => {
                        convertCredits()
                        setTimeout(() => {
                          alert('Aankoop voltooid! Bedankt voor je aankoop.');
                          sessionStorage.removeItem('selectedItemPrice');
                          sessionStorage.removeItem('selectedItemName');
                          window.location.href = 'VarkieBank.html';
                        }, 1000);
                      }).catch((error) => {
                        console.error('Error updating floppaCoin status: ', error);
                        alert('Er is een fout opgetreden bij het bijwerken van de Floppa Coin status.');
                      });
                    } else {
                      convertCredits()
                      setTimeout(() => {
                        alert('Aankoop voltooid! Bedankt voor je aankoop.');
                        sessionStorage.removeItem('selectedItemPrice');
                        sessionStorage.removeItem('selectedItemName');
                        window.location.href = 'VarkieBank.html';
                      }, 1000);
                    }
                  }).catch((error) => {
                    console.error('Error adding transaction: ', error);
                    alert('Er is een fout opgetreden bij het registreren van de transactie.');
                  });
                }).catch((error) => {
                  console.error('Error adding purchase: ', error);
                  alert('Er is een fout opgetreden bij het registreren van de aankoop.');
                });
              }).catch((error) => {
                console.error('Error updating user data: ', error);
                alert('Er is een fout opgetreden bij het bijwerken van je gegevens.');
              });
            }
          } else {
            alert('Gebruiker niet gevonden.');
          }
        }).catch((error) => {
          console.error('Error getting user data: ', error);
          alert('Er is een fout opgetreden bij het ophalen van je gegevens.');
        });
      } else {
        alert('Je bent niet ingelogd.');
      }
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
