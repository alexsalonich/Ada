import React, { useState, useEffect } from 'react';
import { Home, Book, Play, User, Trophy, Clock, Target, TrendingUp } from 'lucide-react';

// Type definitions
const SUBJECTS = {
  math: {
    title: "Math",
    topics: [
      { id: "trig", name: "Trigonometry" },
      { id: "precalc", name: "Pre-Calculus" },
      { id: "calc1", name: "Calculus I" },
      { id: "linalg", name: "Linear Algebra" }
    ]
  },
  coding: {
    title: "Coding",
    topics: [
      { id: "code_puzzles", name: "Coding Puzzles" },
      { id: "debug", name: "Debug Quizzes" },
      { id: "mini_hack", name: "Mini-Hackathons" }
    ]
  },
  physics: {
    title: "Physics",
    topics: [
      { id: "phys_alg", name: "Algebra-Based" },
      { id: "phys_calc", name: "Calculus-Based" }
    ]
  },
  chem: {
    title: "Chemistry",
    topics: [
      { id: "chem1", name: "Chemistry I" },
      { id: "chem2", name: "Chemistry II" }
    ]
  }
};

// Question bank
const QUESTION_BANK = {
  trig: [
    {"rating":500,"q":"sin(0) = ?","a":["0","1","−1","√2/2"],"correct":0},
    {"rating":520,"q":"cos(0) = ?","a":["0","1","−1","√3/2"],"correct":1},
    {"rating":540,"q":"tan(0) = ?","a":["0","1","undefined","π"],"correct":0},
    {"rating":560,"q":"sin(90°) = ?","a":["0","1","√3/2","−1"],"correct":1},
    {"rating":580,"q":"cos(90°) = ?","a":["0","1","−1","0"],"correct":3},
    {"rating":600,"q":"tan(45°) = ?","a":["1","0","√3","1/√3"],"correct":0},
    {"rating":620,"q":"sin(30°) = ?","a":["1/2","√3/2","0","1"],"correct":0},
    {"rating":640,"q":"cos(60°) = ?","a":["1/2","√3/2","0","1"],"correct":0},
    {"rating":660,"q":"sin(π/6) = ?","a":["1/2","√3/2","0","1"],"correct":0},
    {"rating":680,"q":"cos(π/3) = ?","a":["1/2","√3/2","0","1"],"correct":0},
    {"rating":700,"q":"tan(π/4) = ?","a":["1","√3","1/√3","0"],"correct":0},
    {"rating":720,"q":"sin²x + cos²x = ?","a":["0","1","2","tan x"],"correct":1},
    {"rating":740,"q":"sin(−x) = ?","a":["−sin x","sin x","cos x","−cos x"],"correct":0},
    {"rating":760,"q":"cos(−x) = ?","a":["−cos x","cos x","sin x","−sin x"],"correct":1},
    {"rating":780,"q":"tan(−x) = ?","a":["−tan x","tan x","cot x","−cot x"],"correct":0},
    {"rating":800,"q":"sin(π − x) = ?","a":["sin x","−sin x","cos x","−cos x"],"correct":0},
    {"rating":820,"q":"cos(π − x) = ?","a":["−cos x","cos x","sin x","−sin x"],"correct":0},
    {"rating":840,"q":"tan(π − x) = ?","a":["tan x","−tan x","cot x","−cot x"],"correct":0},
    {"rating":860,"q":"sin(π/2 − x) = ?","a":["cos x","sin x","−cos x","−sin x"],"correct":0},
    {"rating":880,"q":"cos(π/2 − x) = ?","a":["sin x","−sin x","cos x","−cos x"],"correct":0},
    {"rating":900,"q":"tan(π/2 − x) = ?","a":["cot x","−cot x","tan x","−tan x"],"correct":0},
    {"rating":920,"q":"sec x = ?","a":["1/cos x","1/sin x","1/tan x","tan x"],"correct":0},
    {"rating":940,"q":"csc x = ?","a":["1/sin x","1/cos x","sin x","cos x"],"correct":0},
    {"rating":960,"q":"cot x = ?","a":["1/tan x","tan x","sin x/cos x","cos x/sin x"],"correct":3},
    {"rating":980,"q":"tan x = ?","a":["sin x / cos x","cos x / sin x","1/sin x","1/cos x"],"correct":0},
    {"rating":1000,"q":"sin(2x) = ?","a":["2sin x cos x","sin²x + cos²x","tan x","2tan x"],"correct":0},
    {"rating":1020,"q":"cos(2x) = ?","a":["cos²x − sin²x","2cos²x − 1","1 − 2sin²x","All of the above"],"correct":3},
    {"rating":1040,"q":"tan(2x) = ?","a":["2tan x/(1 − tan²x)","tan x","sin(2x)/cos(2x)","tan²x"],"correct":0},
    {"rating":1060,"q":"sin(A ± B) = ?","a":["sinA cosB ± cosA sinB","cosA cosB ± sinA sinB","sinA sinB ± cosA cosB","cosA sinB ± sinA cosB"],"correct":0},
    {"rating":1080,"q":"cos(A ± B) = ?","a":["cosA cosB ∓ sinA sinB","cosA sinB ± sinA cosB","sinA sinB ∓ cosA cosB","cosA cosB ± sinA sinB"],"correct":0},
    {"rating":1100,"q":"tan(A ± B) = ?","a":["(tanA ± tanB)/(1 ∓ tanA tanB)","tanA tanB","tanA ± tanB","(tanA − tanB)/(1 + tanA tanB)"],"correct":0},
    {"rating":1120,"q":"sin²x = ?","a":["(1 − cos2x)/2","(1 + cos2x)/2","(1 − sin2x)/2","(1 + sin2x)/2"],"correct":0},
    {"rating":1140,"q":"cos²x = ?","a":["(1 + cos2x)/2","(1 − cos2x)/2","(1 + sin2x)/2","(1 − sin2x)/2"],"correct":0},
    {"rating":1160,"q":"tan²x + 1 = ?","a":["sec²x","csc²x","cot²x","1"],"correct":0},
    {"rating":1180,"q":"cot²x + 1 = ?","a":["csc²x","sec²x","tan²x","1"],"correct":0},
    {"rating":1200,"q":"sin(3x) = ?","a":["3sin x − 4sin³x","4sin³x − 3sin x","2sin x cos2x","sin x + sin3x"],"correct":0},
    {"rating":1250,"q":"cos(3x) = ?","a":["4cos³x − 3cos x","3cos x − 4cos³x","cos x − sin x","4sin³x − 3sin x"],"correct":0},
    {"rating":1300,"q":"tan(3x) = ?","a":["(3tan x − tan³x)/(1 − 3tan²x)","tan³x − 3tan x","tan(2x)","3tan x/(1 − tan³x)"],"correct":0},
    {"rating":1350,"q":"sin(x)/cos(x) = ?","a":["tan x","cot x","sec x","csc x"],"correct":0},
    {"rating":1400,"q":"sin(π/4) = ?","a":["√2/2","1","0","√3/2"],"correct":0},
    {"rating":1450,"q":"Find x: sin x = 0.5, 0° ≤ x ≤ 180°","a":["30° or 150°","30° only","150° only","60° or 120°"],"correct":0},
    {"rating":1500,"q":"If sin x = 3/5, find cos x (acute x).","a":["4/5","−4/5","5/3","−3/5"],"correct":0},
    {"rating":1550,"q":"Find tan x if sin x=3/5 and cos x=4/5.","a":["3/4","4/3","5/4","−3/4"],"correct":0},
    {"rating":1600,"q":"If tan x = 1, x = ?","a":["45° + n·180°","90° + n·180°","0° + n·180°","n·π/2"],"correct":0},
    {"rating":1650,"q":"Find general solution of sin x = 0.","a":["x = nπ","x = π/2 + nπ","x = 2nπ","x = nπ/2"],"correct":0},
    {"rating":1700,"q":"Find general solution of cos x = 0.","a":["x = π/2 + nπ","x = nπ","x = 2nπ","x = nπ/3"],"correct":0},
    {"rating":1750,"q":"Find general solution of tan x = 0.","a":["x = nπ","x = π/2 + nπ","x = 2nπ","x = nπ/3"],"correct":0},
    {"rating":1800,"q":"Prove or find identity: sin(2x)/(1+cos(2x)) = ?","a":["tan x","cot x","sin x","cos x"],"correct":0},
    {"rating":1850,"q":"If cos(A+B)=3/5 and cos(A−B)=5/13, find sinA sinB.","a":["8/65","12/65","5/13","4/13"],"correct":1},
    {"rating":1900,"q":"Simplify: (1 − cos2x)/sin2x","a":["tan x","cot x","1","2tan x"],"correct":0},
    {"rating":1950,"q":"Convert to sine: cos(90° − θ) = ?","a":["sin θ","−sin θ","cos θ","−cos θ"],"correct":0},
    {"rating":2000,"q":"If sinA=3/5, cosB=12/13, A and B acute, find sin(A+B).","a":["63/65","56/65","33/65","119/130"],"correct":1}
  ],
  calc1: [
    { rating: 560, q: "What is d/dx(x²)?", a: ["x", "2x", "x²", "2"], correct: 1 },
    { rating: 590, q: "What is ∫x dx?", a: ["x", "x²/2", "2x", "ln(x)"], correct: 1 },
    { rating: 620, q: "What is the limit of (x²-1)/(x-1) as x→1?", a: ["0", "1", "2", "undefined"], correct: 2 },
    { rating: 650, q: "d/dx(eˣ) = ?", a: ["eˣ", "xeˣ⁻¹", "ln(x)", "1/x"], correct: 0 },
    { rating: 680, q: "What is d/dx(sin(x))?", a: ["-cos(x)", "cos(x)", "-sin(x)", "tan(x)"], correct: 1 },
    { rating: 710, q: "∫1/x dx = ?", a: ["ln(x)", "1/x²", "x²/2", "eˣ"], correct: 0 },
    { rating: 740, q: "Chain rule: d/dx(f(g(x))) = ?", a: ["f'(x)g'(x)", "f'(g(x))·g'(x)", "f(g'(x))", "g(f'(x))"], correct: 1 }
  ],
  code_puzzles: [
    { rating: 570, q: "What does 'return' do in a function?", a: ["Exits and gives back a value", "Prints output", "Loops back", "Declares variable"], correct: 0 },
    { rating: 600, q: "Time complexity of binary search?", a: ["O(n)", "O(log n)", "O(n²)", "O(1)"], correct: 1 },
    { rating: 630, q: "What is a stack?", a: ["FIFO structure", "LIFO structure", "Tree structure", "Graph"], correct: 1 },
    { rating: 660, q: "Which sorts in O(n log n)?", a: ["Bubble sort", "Merge sort", "Selection sort", "Insertion sort"], correct: 1 },
    { rating: 690, q: "What's a linked list node?", a: ["Array element", "Data + pointer", "Hash table", "Binary tree"], correct: 1 },
    { rating: 720, q: "DFS uses which structure?", a: ["Queue", "Stack", "Heap", "Array"], correct: 1 }
  ],
  chem1: [
    { rating: 550, q: "What is the chemical symbol for water?", a: ["H2O", "CO2", "O2", "H2"], correct: 0 },
    { rating: 580, q: "How many protons does carbon have?", a: ["4", "6", "8", "12"], correct: 1 },
    { rating: 610, q: "What is Avogadro's number?", a: ["6.02×10²³", "3.14", "9.81", "1.6×10⁻¹⁹"], correct: 0 },
    { rating: 640, q: "What type of bond shares electrons?", a: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: 1 },
    { rating: 670, q: "What is the pH of pure water?", a: ["0", "7", "14", "1"], correct: 1 },
    { rating: 700, q: "Which is an exothermic reaction?", a: ["Photosynthesis", "Combustion", "Melting ice", "Boiling water"], correct: 1 }
  ]
};

// Elo utilities
const expected = (player, opp) => 1 / (1 + Math.pow(10, (opp - player) / 400));

const updateElo = (player, qRating, correct, K = 24, min = 100) => {
  const E = expected(player, qRating);
  const S = correct ? 1 : 0;
  return Math.max(min, Math.round(player + K * (S - E)));
};

const pickQuestion = (bank, playerElo, target = 100, step = 50, max = 300) => {
  const avail = bank.filter(q => !q._used);
  if (!avail.length) return null;

  let window = target;
  let candidates = [];
  while (window <= max && candidates.length === 0) {
    candidates = avail.filter(q => Math.abs(q.rating - playerElo) <= window);
    if (!candidates.length) window += step;
  }
  if (!candidates.length) candidates = avail;
  const chosen = candidates[Math.floor(Math.random() * candidates.length)];
  chosen._used = true;
  return chosen;
};

export default function AdaptiveEloQuiz() {
  const [screen, setScreen] = useState('home');
  const [topicElos, setTopicElos] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Quiz state
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startElo, setStartElo] = useState(0);
  const [lastDelta, setLastDelta] = useState(0);
  const [matchComplete, setMatchComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const getTopicElo = (topicId) => topicElos[topicId] || 600;

  const getOverallElo = () => {
    const allTopics = Object.values(SUBJECTS).flatMap(s => s.topics.map(t => t.id));
    const sum = allTopics.reduce((acc, id) => acc + getTopicElo(id), 0);
    return Math.round(sum / allTopics.length);
  };

  const startQuiz = (topicId) => {
    const bank = QUESTION_BANK[topicId];
    if (!bank || bank.length === 0) {
      alert('No questions available for this topic');
      return;
    }

    // Reset used flags
    bank.forEach(q => q._used = false);

    setSelectedTopic(topicId);
    setQuizActive(true);
    setQuestionCount(0);
    setTimeLeft(30);
    setStartElo(getTopicElo(topicId));
    setLastDelta(0);
    setMatchComplete(false);
    loadNextQuestion(topicId);
  };

  const loadNextQuestion = (topicId) => {
    const bank = QUESTION_BANK[topicId];
    const playerElo = getTopicElo(topicId);
    const question = pickQuestion(bank, playerElo);
    
    if (!question || questionCount >= 5) {
      setMatchComplete(true);
      setQuizActive(false);
      return;
    }

    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const correct = answerIndex === currentQuestion.correct;
    const currentElo = getTopicElo(selectedTopic);
    const newElo = updateElo(currentElo, currentQuestion.rating, correct);
    const delta = newElo - currentElo;
    
    setTopicElos(prev => ({ ...prev, [selectedTopic]: newElo }));
    setLastDelta(delta);
    setQuestionCount(prev => prev + 1);

    setTimeout(() => {
      if (questionCount + 1 >= 5) {
        setMatchComplete(true);
        setQuizActive(false);
      } else {
        loadNextQuestion(selectedTopic);
      }
    }, 1500);
  };

  useEffect(() => {
    if (quizActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizActive) {
      setMatchComplete(true);
      setQuizActive(false);
    }
  }, [quizActive, timeLeft]);

  const renderHome = () => (
    <div className="p-4 space-y-6">
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-blue-600 mb-2">{getOverallElo()}</div>
        <div className="text-gray-600">Overall Elo Rating</div>
      </div>

      <div className="grid gap-4">
        <button
          onClick={() => setScreen('play')}
          className="bg-blue-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-blue-700 transition"
        >
          <div className="flex items-center gap-3">
            <Play className="w-8 h-8" />
            <div className="text-left">
              <div className="text-xl font-bold">Play</div>
              <div className="text-sm opacity-90">Test your skills</div>
            </div>
          </div>
          <Trophy className="w-6 h-6" />
        </button>

        <button
          onClick={() => setScreen('learn')}
          className="bg-purple-600 text-white p-6 rounded-xl flex items-center justify-between hover:bg-purple-700 transition"
        >
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8" />
            <div className="text-left">
              <div className="text-xl font-bold">Learn</div>
              <div className="text-sm opacity-90">Study materials</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderPlay = () => {
    if (selectedSubject) {
      const subject = SUBJECTS[selectedSubject];
      return (
        <div className="p-4">
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-4 text-blue-600 font-medium"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-2xl font-bold mb-4">{subject.title}</h2>
          <div className="space-y-3">
            {subject.topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => startQuiz(topic.id)}
                className="w-full bg-white border-2 border-gray-200 p-4 rounded-xl hover:border-blue-400 transition"
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="font-bold text-lg">{topic.name}</div>
                    <div className="text-sm text-gray-500">
                      {QUESTION_BANK[topic.id]?.length || 0} questions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {getTopicElo(topic.id)}
                    </div>
                    <div className="text-xs text-gray-500">Elo</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Choose a Subject</h2>
        <div className="space-y-3">
          {Object.entries(SUBJECTS).map(([key, subject]) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key)}
              className="w-full bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-blue-400 transition text-left"
            >
              <div className="font-bold text-xl mb-1">{subject.title}</div>
              <div className="text-sm text-gray-500">
                {subject.topics.length} topics
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (matchComplete) {
      const endElo = getTopicElo(selectedTopic);
      const delta = endElo - startElo;
      const topicName = Object.values(SUBJECTS)
        .flatMap(s => s.topics)
        .find(t => t.id === selectedTopic)?.name;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 mx-auto mb-3 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Match Complete!</h2>
              <div className="text-gray-600">{topicName}</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Start Elo:</span>
                <span className="font-bold text-lg">{startElo}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">End Elo:</span>
                <span className="font-bold text-lg">{endElo}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Change:</span>
                  <span className={`font-bold text-xl ${delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {delta >= 0 ? '+' : ''}{delta}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setMatchComplete(false);
                setSelectedSubject(null);
                setScreen('play');
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      );
    }

    if (!currentQuestion) return null;

    return (
      <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white z-40">
        <div className="p-4 space-y-4 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Question: {currentQuestion.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-600">You: {getTopicElo(selectedTopic)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Progress: {questionCount + 1}/5</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="font-bold text-orange-500">{timeLeft}s</span>
              </div>
            </div>
            {lastDelta !== 0 && (
              <div className={`mt-2 text-center font-bold ${lastDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                Last: {lastDelta > 0 ? '+' : ''}{lastDelta}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">{currentQuestion.q}</h3>
            <div className="space-y-3">
              {currentQuestion.a.map((answer, idx) => {
                let bgColor = 'bg-gray-50 hover:bg-gray-100';
                if (showFeedback) {
                  if (idx === currentQuestion.correct) {
                    bgColor = 'bg-green-100 border-green-500';
                  } else if (idx === selectedAnswer) {
                    bgColor = 'bg-red-100 border-red-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-xl border-2 transition ${bgColor} ${
                      showFeedback ? 'cursor-not-allowed' : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium text-left">{answer}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLearn = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Learn</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <Book className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <p className="text-gray-600">
          Learning modules coming soon! Practice your skills in Play mode.
        </p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
          <div className="text-5xl font-bold mb-2">{getOverallElo()}</div>
          <div className="text-sm opacity-90">Overall Elo Rating</div>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-3">Topic Ratings</h3>
          <div className="space-y-2">
            {Object.values(SUBJECTS).flatMap(subject =>
              subject.topics.map(topic => (
                <div key={topic.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-xl font-bold text-blue-600">
                    {getTopicElo(topic.id)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Adaptive Elo Quiz
          </h1>
        </div>
      </header>

      <main className="pb-4">
        {screen === 'home' && renderHome()}
        {screen === 'play' && !quizActive && renderPlay()}
        {screen === 'learn' && renderLearn()}
        {screen === 'profile' && renderProfile()}
      </main>

      {quizActive && renderQuiz()}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20">
        <div className="flex justify-around p-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'learn', icon: Book, label: 'Learn' },
            { id: 'play', icon: Play, label: 'Play' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setScreen(id);
                setSelectedSubject(null);
              }}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${
                screen === id ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}