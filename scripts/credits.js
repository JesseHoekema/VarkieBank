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

function checkCredits() {
  const user = auth.currentUser;
  const creditsText = document.getElementById('creditsText');

  if (user) {
      const uid = user.uid;
      const userRef = db.collection('users').doc(uid);

      userRef.get().then((doc) => {
          if (doc.exists) {
              const userData = doc.data();

              if (userData.credits === undefined) {
                  // Credits aanmaken als het niet bestaat
                  userRef.set({ credits: 0 }, { merge: true }).then(() => {
                      console.log("Credits zijn ingesteld op 0.");
                  });
              } else {
                  // Tekst aanpassen als credits al bestaat
                  creditsText.innerText = `${userData.credits}`;
              }
          } else {
              // Nieuw document aanmaken als het niet bestaat
              userRef.set({ credits: 0 }).then(() => {
                console.log("Credits zijn ingesteld op 0.");
              });
          }
      }).catch((error) => {
          console.error('Fout bij het ophalen van gebruikersgegevens: ', error);
      });
  }
}

function buyItem(name, price, reward) {
    const user = auth.currentUser;
const creditsText = document.getElementById('creditsText');

if (user) {
    const uid = user.uid;
    const userRef = db.collection('users').doc(uid);

    userRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();

            if (userData.credits === undefined) {
                // Credits aanmaken als het niet bestaat
                userRef.set({ credits: 0 }, { merge: true }).then(() => {
                    console.log("Credits zijn ingesteld op 0.");
                }).catch((error) => {
                    console.error("Fout bij het instellen van credits:", error);
                });
            } else {
                // Controleer of gebruiker genoeg credits heeft
                if (userData.credits >= price) {
                    const newCredits = userData.credits - price; // Bereken nieuwe credits

                    // Update credits in Firebase
                    userRef.update({ credits: newCredits }).then(() => {
                        console.log("Credits succesvol geüpdatet!");

                        // Sla de geselecteerde prijs lokaal op
                        sessionStorage.setItem('selectedItemPrice', reward);

                        // Optioneel: Update lokaal de credits
                        creditsText.textContent = `Credits: ${newCredits}`;

                        // Stuur gebruiker naar een andere pagina
                        window.location.href = 'stortgeld.html';
                    }).catch((error) => {
                        console.error("Fout bij het updaten van credits in Firebase:", error);
                        alert("Er is iets misgegaan bij het verwerken van de aankoop.");
                    });
                } else {
                    alert("Niet Genoeg VarkieCredits!");
                }
            }
        } else {
            // Nieuw document aanmaken als het niet bestaat
            userRef.set({ credits: 0 }).then(() => {
                console.log("Credits zijn ingesteld op 0.");
            }).catch((error) => {
                console.error("Fout bij het aanmaken van een nieuw document:", error);
            });
        }
    }).catch((error) => {
        console.error("Fout bij het ophalen van gebruikersgegevens:", error);
    });
} else {
    console.error("Geen gebruiker ingelogd.");
    alert("Je moet ingelogd zijn om een aankoop te doen.");
}

}

function customAmountLoad() {
    input = document.getElementById("VarkieAmount").value
    amount = document.getElementById("VarkieHash");
    afterAmount = input * 10

    amount.innerHTML = `<img src="assets/credits.png" height="20px" draggable="false"> ${afterAmount}`;
}
function customAmount() {
    input = document.getElementById("VarkieAmount").value
    amount = document.getElementById("VarkieHash");
    afterAmount = input * 10

    const user = auth.currentUser;
    const creditsText = document.getElementById('creditsText');
    
    if (user) {
        const uid = user.uid;
        const userRef = db.collection('users').doc(uid);
    
        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
    
                if (userData.credits === undefined) {
                    // Credits aanmaken als het niet bestaat
                    userRef.set({ credits: 0 }, { merge: true }).then(() => {
                        console.log("Credits zijn ingesteld op 0.");
                    }).catch((error) => {
                        console.error("Fout bij het instellen van credits:", error);
                    });
                } else {
                    // Controleer of gebruiker genoeg credits heeft
                    if (userData.credits >= afterAmount) {
                        const newCredits = userData.credits - afterAmount; // Bereken nieuwe credits
    
                        // Update credits in Firebase
                        userRef.update({ credits: newCredits }).then(() => {
                            console.log("Credits succesvol geüpdatet!");
    
                            // Sla de geselecteerde prijs lokaal op
                            sessionStorage.setItem('selectedItemPrice', input);
    
                            // Optioneel: Update lokaal de credits
                            creditsText.textContent = `Credits: ${newCredits}`;
    
                            // Stuur gebruiker naar een andere pagina
                            window.location.href = 'stortgeld.html';
                        }).catch((error) => {
                            console.error("Fout bij het updaten van credits in Firebase:", error);
                            alert("Er is iets misgegaan bij het verwerken van de aankoop.");
                        });
                    } else {
                        alert("Niet Genoeg VarkieCredits!");
                    }
                }
            } else {
                // Nieuw document aanmaken als het niet bestaat
                userRef.set({ credits: 0 }).then(() => {
                    console.log("Credits zijn ingesteld op 0.");
                }).catch((error) => {
                    console.error("Fout bij het aanmaken van een nieuw document:", error);
                });
            }
        }).catch((error) => {
            console.error("Fout bij het ophalen van gebruikersgegevens:", error);
        });
    } else {
        console.error("Geen gebruiker ingelogd.");
        alert("Je moet ingelogd zijn om een aankoop te doen.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
      checkCredits(); // This will run the function after 2 seconds
  }, 500); // 2000ms = 2 seconds
});