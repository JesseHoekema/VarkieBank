const questions = [
    {
      question: "1moe + 11moe =",
      type: "text",
      correctAnswer: "12moe"
    },
    {
      question: "11moe + 11moe =",
      type: "text",
      correctAnswer: "22moe"
    },
    {
      question: "22moe + 11moe =",
      type: "text",
      correctAnswer: "33moe"
    },
    {
      question: "24moe - 4moe =",
      type: "text",
      correctAnswer: "20moe"
    },
    {
      question: "5moe + 8moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "12moe - 8moe =",
      type: "text",
      correctAnswer: "4moe"
    },
    {
      question: "6moe + 5moe =",
      type: "text",
      correctAnswer: "11moe"
    },
    {
      question: "11moe - 8moe =",
      type: "text",
      correctAnswer: "3moe"
    },
    {
      question: "5moe + 7moe =",
      type: "text",
      correctAnswer: "12moe"
    },
    {
      question: "13moe - 4moe =",
      type: "text",
      correctAnswer: "9moe"
    },
    {
      question: "5moe + 8moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "16moe - 7moe =",
      type: "text",
      correctAnswer: "9moe"
    },
    {
      question: "4moe + 9moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "7moe + 8moe =",
      type: "text",
      correctAnswer: "15moe"
    },
    {
      question: "14moe - 7moe =",
      type: "text",
      correctAnswer: "7moe"
    },
    {
      question: "8moe + 7moe =",
      type: "text",
      correctAnswer: "15moe"
    },
    {
      question: "12moe - 8moe =",
      type: "text",
      correctAnswer: "4moe"
    },
    {
      question: "6moe + 8moe =",
      type: "text",
      correctAnswer: "14moe"
    },
    {
      question: "13moe - 6moe =",
      type: "text",
      correctAnswer: "7moe"
    },
    {
      question: "9moe + 5moe =",
      type: "text",
      correctAnswer: "14moe"
    },
    {
      question: "16moe - 7moe =",
      type: "text",
      correctAnswer: "9moe"
    },
    {
      question: "8moe + 5moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "12moe - 8moe =",
      type: "text",
      correctAnswer: "4moe"
    },
    {
      question: "5moe + 8moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "17moe - 8moe =",
      type: "text",
      correctAnswer: "9moe"
    },
    {
      question: "15moe - 7moe =",
      type: "text",
      correctAnswer: "8moe"
    },
    {
      question: "7moe + 4moe =",
      type: "text",
      correctAnswer: "11moe"
    },
    {
      question: "16moe - 8moe =",
      type: "text",
      correctAnswer: "8moe"
    },
    {
      question: "15moe - 8moe =",
      type: "text",
      correctAnswer: "7moe"
    },
    {
      question: "18moe - 8moe =",
      type: "text",
      correctAnswer: "10moe"
    },
    {
      question: "14moe + 3moe =",
      type: "text",
      correctAnswer: "17moe"
    },
    {
      question: "16moe + 1moe =",
      type: "text",
      correctAnswer: "17moe"
    },
    {
      question: "5moe + 8moe =",
      type: "text",
      correctAnswer: "13moe"
    },
    {
      question: "12moe - 8moe =",
      type: "text",
      correctAnswer: "4moe"
    },
    {
      question: "24moe + 4moe =",
      type: "text",
      correctAnswer: "28moe"
    },
    {
      question: "30moe - 10moe =",
      type: "text",
      correctAnswer: "20moe"
    },
  ];

  let currentQuestionIndex = 0;
  let correctAnswers = 0;

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    if (currentQuestion.type === "text") {
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.id = "textAnswer";
      inputElement.placeholder = "Antwoord";
      optionsElement.appendChild(inputElement);
    }
  }

  function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.type === "text") {
      const userAnswer = document.getElementById("textAnswer").value.trim();

      if (!userAnswer) {
        alert("Voer een antwoord in voordat je doorgaat.");
        return;
      }

      const isCorrect = userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      if (isCorrect) {
        correctAnswers++;
      }
      displayResult(isCorrect);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showFinalResult();
    }
  }

  function displayResult(isCorrect) {
    const resultElement = document.getElementById("answerResult");
    resultElement.textContent = isCorrect ? "Correct antwoord!" : `Fout antwoord. Het juiste antwoord is: ${questions[currentQuestionIndex].correctAnswer}`;
    resultElement.style.color = isCorrect ? "green" : "red";
  }

  function showFinalResult() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h1>Eindresultaat</h1>
                               <p>Je hebt ${correctAnswers} van de ${questions.length} vragen correct beantwoord.</p>
                               <button onclick=(stortpunten())>Stort Punten</button>`;
  }
  function stortpunten() {
    sessionStorage.setItem('selectedItemPrice', correctAnswers);
    window.location = "stortgeld.html"
  }


  // Toon de eerste vraag bij het laden van de pagina
  showQuestion();