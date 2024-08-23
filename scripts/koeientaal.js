const questions = [
    {
      question: "hoe schrijf je: ik ben moe",
      type: "text",
      correctAnswer: "ikmoe benmoe moemoe"
    },
    {
      question: "hoe schrijf je: koeien zijn lief",
      type: "text",
      correctAnswer: "koeienmoe zijnmoe liefmoe"
    },
    {
      question: "is ikmoe ben liefmoe goed?",
      type: "multiple",
      options: ["Nee", "Ja"],
      correctAnswer: "Nee"
    },
    {
      question: "hoe schrijf je: ik ben een koe",
      type: "text",
      correctAnswer: "ikmoe benmoe eenmoe koemoe"
    },
    {
      question: "hoe schrijf je: hallo",
      type: "text",
      correctAnswer: "hallomoe"
    },
    {
      question: "hoe schrijf je: mama",
      type: "text",
      correctAnswer: "mamamoe"
    },
    {
      question: "hoe schrijf je: papa",
      type: "text",
      correctAnswer: "papamoe"
    },
    {
      question: "hoe schrijf je: ik kom wat later",
      type: "text",
      correctAnswer: "ikmoe kommoe watmoe latermoe"
    },
    {
      question: "hoe schrijf je: ben ik te laat?",
      type: "text",
      correctAnswer: "benmoe ikmoe temoe laat?moe"
    },
    {
      question: "hoe schrijf je: opa",
      type: "text",
      correctAnswer: "opamoe"
    },
    {
      question: "hoe schrijf je: oma",
      type: "text",
      correctAnswer: "omamoe"
    },
    {
      question: "hoe schrijf je: een koe zegt",
      type: "text",
      correctAnswer: "eenmoe koemoe zegtmoe"
    },
    {
      question: "hoe schrijf je: ik hou van jou",
      type: "text",
      correctAnswer: "ikmoe houmoe vanmoe joumoe"
    },
    {
      question: "is ikmoe benmoe 9 jaarmoe oudmoegoed?",
      type: "multiple",
      options: ["Ja", "Nee"],
      correctAnswer: "Nee"
    },
    {
      question: "is hallomoe ikmoe benmoe timmoe goed?",
      type: "multiple",
      options: ["Ja", "Nee"],
      correctAnswer: "Ja"
    },
    {
      question: "is hallomoe ikmoe vraag moe goed?",
      type: "multiple",
      options: ["Ja", "Nee"],
      correctAnswer: "Nee"
    },
    {
      question: "hoe schrijf je: ik heb een vraag",
      type: "text",
      correctAnswer: "ikmoe hebmoe eenmoe vraagmoe"
    },
    {
      question: "hoe schrijf je: ik hou van jou",
      type: "text",
      correctAnswer: "ikmoe houmoe vanmoe joumoe"
    },
    {
      question: "is ikmoe moet poepenmoe goed?",
      type: "multiple",
      options: ["Ja", "Nee"],
      correctAnswer: "Nee"
    },
    {
      question: "hoe schrijf je: hoe laat is het?",
      type: "text",
      correctAnswer: "hoemoe laatmoe ismoe het?moe"
    },
    // Voeg hier meer vragen toe zoals het bovenstaande formaat
  ];

  let currentQuestionIndex = 0;
  let correctAnswers = 0;

  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    if (currentQuestion.type === "multiple") {
      currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerHTML = `<input type="radio" name="answer" value="${option}" id="option${index}">
                                   <label for="option${index}">${option}</label>`;
        optionsElement.appendChild(optionElement);
      });
    } else if (currentQuestion.type === "text") {
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

      displayResult(userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase());
      if (userAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
        correctAnswers++;
      }
    } else {
      const selectedOption = document.querySelector('input[name="answer"]:checked');

      if (!selectedOption) {
        alert("Selecteer een antwoord voordat je doorgaat.");
        return;
      }

      const userAnswer = selectedOption.value;

      displayResult(userAnswer === currentQuestion.correctAnswer);
      if (userAnswer === currentQuestion.correctAnswer) {
        correctAnswers++;
      }
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