// Dati del Quiz - Animali Marini
const quizData = [
    {
        animal: "Medusa",
        emoji: "🪼",
        image: "assets/images/medusa.jpg",
        question: "La medusa galleggia nel mare! Come si muove?",
        answers: ["Cammina sul fondo 🚶", "Nuota pulsando 💦", "Vola fuori dall'acqua ✈️"],
        correct: 1,
        funFact: "La medusa si muove aprendo e chiudendo il suo corpo come un ombrello! ☂️"
    },
    {
        animal: "Cavalluccio Marino",
        emoji: "🐴",
        image: "assets/images/cavalluccio-marino.jpg",
        question: "Il cavalluccio marino è speciale! Chi porta i piccoli?",
        answers: ["Il papà 👨", "La mamma 👩", "I nonni 👴"],
        correct: 0,
        funFact: "Il papà cavalluccio marino porta i piccoli nella sua pancia! È l'unico papà che lo fa! 🤰"
    },
    {
        animal: "Stella Marina",
        emoji: "⭐",
        image: "assets/images/stella-marina.jpg",
        question: "La stella marina è bellissima! Quante braccia ha?",
        answers: ["3 braccia", "5 braccia ⭐", "10 braccia"],
        correct: 1,
        funFact: "Se la stella marina perde un braccio, può farlo ricrescere! 🌟"
    },
    {
        animal: "Balena",
        emoji: "🐋",
        image: "assets/images/balena.jpg",
        question: "La balena è enorme! Qual è l'animale più grande del mare?",
        answers: ["La balena blu 🐋", "Lo squalo 🦈", "Il delfino 🐬"],
        correct: 0,
        funFact: "La balena blu è l'animale più grande del mondo! Anche più grande dei dinosauri! 🦕"
    },
    {
        animal: "Squalo",
        emoji: "🦈",
        image: "assets/images/squalo.jpg",
        question: "Lo squalo nuota velocissimo! Cosa ha di speciale in bocca?",
        answers: ["Denti che ricrescono 🦷", "Una lingua lunghissima 👅", "Niente denti"],
        correct: 0,
        funFact: "Gli squali hanno file e file di denti che continuano a crescere tutta la vita! 😮"
    },
    {
        animal: "Delfino",
        emoji: "🐬",
        image: "assets/images/delfino.jpg",
        question: "Il delfino è molto intelligente! Come parla con i suoi amici?",
        answers: ["Abbaia 🐕", "Fa fischi e clic 🎵", "Canta canzoni 🎤"],
        correct: 1,
        funFact: "I delfini parlano tra loro con fischi speciali e si chiamano per nome! 📞"
    },
    {
        animal: "Polpo",
        emoji: "🐙",
        image: "assets/images/polpo.jpg",
        question: "Il polpo è incredibile! Quanti tentacoli ha?",
        answers: ["6 tentacoli", "8 tentacoli 🐙", "10 tentacoli"],
        correct: 1,
        funFact: "Il polpo ha 3 cuori e può cambiare colore per nascondersi! 🎨"
    },
    {
        animal: "Tartaruga Marina",
        emoji: "🐢",
        image: "assets/images/tartaruga-marina.jpg",
        question: "La tartaruga marina vive tantissimo! Cosa ha sul dorso?",
        answers: ["Un guscio duro 🛡️", "Delle spine 🌵", "Delle piume 🪶"],
        correct: 0,
        funFact: "Le tartarughe marine possono vivere più di 100 anni! Sono nonne dell'oceano! 👵"
    },
    {
        animal: "Granchio",
        emoji: "🦀",
        image: "assets/images/granchio.jpg",
        question: "Il granchio cammina in modo buffo! Come si muove?",
        answers: ["In avanti ➡️", "Di lato 🦀", "All'indietro ⬅️"],
        correct: 1,
        funFact: "Il granchio cammina di lato! È l'unico animale che fa così! 😄"
    },
    {
        animal: "Pesce Pagliaccio",
        emoji: "🐠",
        image: "assets/images/pesce-pagliaccio.jpg",
        question: "Il pesce pagliaccio è arancione! Dove vive?",
        answers: ["Tra gli anemoni 🌺", "Nella sabbia 🏖️", "Nelle conchiglie 🐚"],
        correct: 0,
        funFact: "Il pesce pagliaccio vive tra gli anemoni che sembrano fiori ma pungono! Lui è immune! 🦸"
    }
];

// Messaggi di incoraggiamento per risposte sbagliate
const encouragementMessages = [
    "Oops! 🤗 Prova ancora, ce la puoi fare!",
    "Quasi! 💪 Riprova, sei bravissimo!",
    "Non è questa! 😊 Pensa bene e riprova!",
    "Mmm... 🤔 Prova un'altra risposta!",
    "Non preoccuparti! 🌟 Riprova, sono sicuro che ce la farai!",
    "Dai, riprova! 🎈 Sei molto vicino alla risposta giusta!"
];

// Variabili globali
let currentQuestion = 0;
let correctAnswers = 0;
let answeredQuestions = [];

// Elementi DOM
const animalGrid = document.getElementById('animal-grid');
const quizContainer = document.getElementById('quiz-container');
const resultsDiv = document.getElementById('results');
const questionTitle = document.getElementById('question-title');
const questionImage = document.getElementById('question-image');
const answersDiv = document.getElementById('answers');
const encouragementDiv = document.getElementById('encouragement');
const progressFill = document.getElementById('progress-fill');
const restartBtn = document.getElementById('restart-btn');
const backBtn = document.getElementById('back-btn');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

// Configura canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const animalCards = document.querySelectorAll('.animal-card');
    animalCards.forEach(card => {
        card.addEventListener('click', () => {
            currentQuestion = parseInt(card.dataset.animal);
            startQuiz();
        });
    });

    restartBtn.addEventListener('click', restartQuiz);
    backBtn.addEventListener('click', goBackToGrid);
});

// Torna alla griglia degli animali
function goBackToGrid() {
    quizContainer.classList.add('hidden');
    animalGrid.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Avvia il quiz
function startQuiz() {
    animalGrid.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    correctAnswers = 0;
    answeredQuestions = Array(10).fill(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showQuestion();
}

// Mostra la domanda
function showQuestion() {
    const question = quizData[currentQuestion];
    
    // Aggiorna barra di progresso
    const progress = (answeredQuestions.filter(a => a).length / 10) * 100;
    progressFill.style.width = progress + '%';
    
    questionTitle.textContent = `${question.emoji} ${question.question}`;
    questionImage.src = question.image;
    questionImage.alt = question.animal;
    
    // Nascondi messaggio di incoraggiamento
    encouragementDiv.classList.add('hidden');
    
    // Crea i bottoni delle risposte
    answersDiv.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index, button));
        answersDiv.appendChild(button);
    });
}

// Seleziona una risposta
function selectAnswer(selectedIndex, button) {
    const question = quizData[currentQuestion];
    const allButtons = answersDiv.querySelectorAll('.answer-btn');
    
    // Disabilita tutti i bottoni temporaneamente
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        // RISPOSTA CORRETTA! 🎉
        button.classList.add('correct');
        
        // Lancia i coriandoli!
        launchConfetti();
        
        // Segna la domanda come completata
        if (!answeredQuestions[currentQuestion]) {
            answeredQuestions[currentQuestion] = true;
            correctAnswers++;
            
            // Aggiorna barra di progresso
            const progress = (answeredQuestions.filter(a => a).length / 10) * 100;
            progressFill.style.width = progress + '%';
        }
        
        // Mostra fatto divertente
        encouragementDiv.textContent = `🎉 Esatto! ${question.funFact}`;
        encouragementDiv.style.background = 'linear-gradient(135deg, #d4fc79, #96e6a1)';
        encouragementDiv.style.borderColor = '#4caf50';
        encouragementDiv.style.color = '#2e7d32';
        encouragementDiv.classList.remove('hidden');
        
        // Vai alla prossima domanda o mostra risultati
        setTimeout(() => {
            if (answeredQuestions.filter(a => a).length === 10) {
                showResults();
            } else {
                goToNextUnanswered();
            }
        }, 3000);
        
    } else {
        // RISPOSTA SBAGLIATA - Incoraggiamento
        button.classList.add('incorrect');
        
        // Mostra messaggio carino
        const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
        encouragementDiv.textContent = randomMessage;
        encouragementDiv.style.background = 'linear-gradient(135deg, #ffeaa7, #fdcb6e)';
        encouragementDiv.style.borderColor = '#f39c12';
        encouragementDiv.style.color = '#d35400';
        encouragementDiv.classList.remove('hidden');
        
        // Riabilita i bottoni dopo un momento per riprovare
        setTimeout(() => {
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('incorrect');
            });
            encouragementDiv.classList.add('hidden');
        }, 2000);
    }
}

// Vai alla prossima domanda non risposta
function goToNextUnanswered() {
    let nextQuestion = (currentQuestion + 1) % 10;
    let attempts = 0;
    
    // Trova la prossima domanda non ancora completata
    while (answeredQuestions[nextQuestion] && attempts < 10) {
        nextQuestion = (nextQuestion + 1) % 10;
        attempts++;
    }
    
    currentQuestion = nextQuestion;
    showQuestion();
}

// Lancia i coriandoli
function launchConfetti() {
    const colors = ['#1c4aef', '#d98e94', '#45b7d1', '#ffd93d', '#6bcf7f', '#ff9ff3'];
    const confettiCount = 100;
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: -20,
            r: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 4 - 2,
            rotation: Math.random() * 360
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        let stillFalling = false;
        
        confetti.forEach(c => {
            c.y += c.speedY;
            c.x += c.speedX;
            c.rotation += 5;
            
            if (c.y < confettiCanvas.height) {
                stillFalling = true;
                
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.r / 2, -c.r / 2, c.r, c.r);
                ctx.restore();
            }
        });
        
        if (stillFalling) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

// Mostra i risultati
function showResults() {
    quizContainer.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
    
    // Lancia coriandoli finali
    setTimeout(() => launchConfetti(), 300);
    setTimeout(() => launchConfetti(), 800);
    setTimeout(() => launchConfetti(), 1300);
    
    let message = `
        🌊 WOW! Hai risposto correttamente a tutte e 10 le domande! 🌊
        <br><br>
        Sei un vero esperto degli animali marini! 🐠🐙🐢
        <br><br>
        Hai scoperto 10 cose fantastiche sull'oceano oggi! 🧠✨
    `;
    
    document.getElementById('score-message').innerHTML = message;
    
    // Scroll in alto
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Riavvia il quiz
function restartQuiz() {
    resultsDiv.classList.add('hidden');
    animalGrid.classList.remove('hidden');
    currentQuestion = 0;
    correctAnswers = 0;
    answeredQuestions = Array(10).fill(false);
    
    // Resetta barra di progresso
    progressFill.style.width = '0%';
    
    // Scroll all'inizio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}