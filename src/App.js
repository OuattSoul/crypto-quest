import React, { useState, useEffect } from 'react';

function QuizApp() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Qu'est-ce qu'une cryptomonnaie ?",
      options: ['Un type de monnaie traditionnelle', 'Une monnaie numérique ou virtuelle qui utilise la cryptographie pour la sécurité', 'Une forme de monnaie émise par le gouvernement', 'Un jeton physique utilisé pour les transactions en ligne'],
      correctAnswer: 'Une monnaie numérique ou virtuelle qui utilise la cryptographie pour la sécurité'
    },
    {
      id: 2,
      question: "Qui est crédité de la création du Bitcoin ?",
      options: ['Vitalik Buterin', 'Charlie Lee', 'Satoshi Nakamoto', 'Elon Musk'],
      correctAnswer: 'Satoshi Nakamoto'
    },
    {
      id: 3,
      question: "Quelle technologie sous-tend les crypto-monnaies comme le Bitcoin ?",
      options: ['Informatique en nuage', 'Intelligence artificielle', 'Blockchain', 'Informatique quantique'],
      correctAnswer: 'Blockchain'
    },
    {
      id: 4,
      question: "Quelle est la caractéristique principale d'une blockchain ?",
      options: ['Elle est contrôlée par une autorité centrale', "C'est un registre décentralisé qui enregistre toutes les transactions", 'Elle est utilisée uniquement pour stocker des informations personnelles', "C'est une chaîne physique reliant plusieurs ordinateurs"],
      correctAnswer: "C'est un registre décentralisé qui enregistre toutes les transactions"
    },
    {
      id: 5,
      question: "Quelle a été la première transaction réelle utilisant le Bitcoin ?",
      options: ['Acheter une voiture', 'Acheter deux pizzas', "Payer un billet d'avion", 'Acheter une maison'],
      correctAnswer: 'Acheter deux pizzas'
    },
    {
      id: 6,
      question: "Laquelle des caractéristiques suivantes n'est PAS propre aux cryptomonnaies ?",
      options: ['Décentralisation', 'Cryptographie pour la sécurité', 'Forme physique', 'Utilisation de la technologie blockchain'],
      correctAnswer: 'Forme physique'
    },
    {
      id: 7,
      question: "Quelle cryptomonnaie a été créée par Charlie Lee ?",
      options: ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin'],
      correctAnswer: 'Litecoin'
    },
    {
      id: 8,
      question: "Quel problème le Bitcoin a-t-il résolu que les monnaies numériques précédentes n'avaient pas ?",
      options: ['Frais de transaction élevés', 'Problème de double dépense', 'Vitesses de transaction lentes', "Absence d'approbation réglementaire"],
      correctAnswer: 'Problème de double dépense'
    },
    {
      id: 9,
      question: "Quelle est la récompense pour avoir correctement répondu à 80 % des questions de cette étape ?",
      options: ['5 CQT', '10 CQT et le badge "Crypto Newbie"', '15 CQT', 'Aucune récompense'],
      correctAnswer: '10 CQT et le badge "Crypto Newbie"'
    },
    {
      id: 10,
      question: "Combien de jours les utilisateurs ont-ils pour compléter cette étape ?",
      options: ['7 Jours', '10 Jours', '15 Jours', "30 Jours"],
      correctAnswer: '15 Jours'
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showFinalScore, setShowFinalScore] = useState(false);

  useEffect(() => {
    if (isTimerRunning) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isTimerRunning, timer]);

  useEffect(() => {
    if (timer === 0 || answered) {
      setIsTimerRunning(false);
      setAnswered(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimer(30);
        setIsTimerRunning(true);
      } else {
        setShowFinalScore(true);
      }
    }
  }, [timer, answered, currentQuestion, questions]);

  const handleAnswerSubmit = (answer) => {
    setAnswered(true);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleResetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setTimer(30);
    setIsTimerRunning(false);
    setShowFinalScore(false);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {showFinalScore ? (
        <div>
          <p>Quiz complete! Your final score is {score} out of {questions.length}.</p>
          <button onClick={handleResetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <div>
          {isTimerRunning ? (
            <div>
              <p>Time remaining: {timer} seconds</p>
              <p>Score: {score}</p>
              <p>
                {questions[currentQuestion].question}
              </p>
              <ul>
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <button onClick={() => handleAnswerSubmit(option)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button onClick={() => setIsTimerRunning(true)}>Start Quiz</button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizApp;