
document.addEventListener('DOMContentLoaded', function () {
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

    // Register functionality
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                return db.collection('users').doc(user.uid).set({
                    email: user.email,
                    moneyAmount: 0
                });
            })
            .then(() => {
                const container = document.getElementById('container');
                container.classList.remove("active");
            })
            .catch((error) => {
                console.error('Error during registration:', error);
                alert('Error: ' + error.message);
            });
    });

    // Login functionality
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                window.location.href = 'VarkieBank.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
});