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


// Function to edit username
function editUsername() {
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        const userRef = db.collection('users').doc(uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                const currentUsername = userData.username;

                // Show an input field to edit the username

                // Handle the new username submission
                    const newUsername = document.getElementById('newUsername').value;
                    if (newUsername && newUsername !== currentUsername) {
                        userRef.update({ username: newUsername }).then(() => {
                            window.location.href = 'VarkieBank.html'
                            
                        }).catch((error) => {
                            console.error('Error updating username: ', error);
                        });
                    } else {
                        alert('Please enter a new username.');
                    }
            }
        }).catch((error) => {
            console.error('Error getting user data: ', error);
        });
    }
};
