document.addEventListener('DOMContentLoaded', () => {
  // CMS content ophalen
  const heroLarge = document.getElementById('hero-large');
  const heroSmall = document.getElementById('hero-small');
  const headline = document.getElementById('headline');
  const subline = document.getElementById('subline');
  const startButton = document.getElementById('start-button');

  // Ophalen uit Swipe Pages blokken
  heroLarge.src = document.getElementById('cms-hero-large')?.src || '';
  heroSmall.src = document.getElementById('cms-hero-small')?.src || '';
  headline.textContent = document.getElementById('cms-headline')?.textContent || '';
  subline.textContent = document.getElementById('cms-subline')?.textContent || '';
  startButton.textContent = document.getElementById('cms-buttontext')?.textContent || '';

  // Kleuren instellen
  const mainColor = document.getElementById('cms-maincolor')?.textContent.trim() || '#2a36f7';
  const accentColor = document.getElementById('cms-accentcolor')?.textContent.trim() || '#ff7c00';

  document.documentElement.style.setProperty('--main-color', mainColor);
  document.documentElement.style.setProperty('--accent-color', accentColor);

  // Flow starten
  const startScreen = document.getElementById('start-screen');
  const progressBar = document.getElementById('progress-bar');
  const questionScreen = document.getElementById('question-screen');

  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    progressBar.style.display = 'block';
    questionScreen.style.display = 'block';
    loadQuestion(0);
  });

  // Vragen ophalen
  const questions = [];
  let questionIndex = 1;
  while (document.getElementById(`cms-q${questionIndex}`)) {
    const question = document.getElementById(`cms-q${questionIndex}`).textContent;
    const answer1 = document.getElementById(`cms-q${questionIndex}-a1`)?.textContent || '';
    const answer2 = document.getElementById(`cms-q${questionIndex}-a2`)?.textContent || '';
    questions.push({ question, answers: [answer1, answer2] });
    questionIndex++;
  }

  let currentQuestion = 0;

  function loadQuestion(index) {
    const q = questions[index];
    if (!q) {
      // Formulier tonen als vragen klaar zijn
      document.getElementById('question-screen').style.display = 'none';
      document.getElementById('form-short').style.display = 'block';
      return;
    }
    document.getElementById('question-text').textContent = q.question;
    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    q.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer;
      btn.addEventListener('click', () => {
        currentQuestion++;
        updateProgress();
        loadQuestion(currentQuestion);
      });
      answerButtons.appendChild(btn);
    });
  }

  function updateProgress() {
    const fill = document.getElementById('progress-fill');
    fill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  }

  // Short form verzenden
  document.getElementById('short-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-short').style.display = 'none';
    document.getElementById('form-long').style.display = 'block';
  });

  // Long form verzenden
  document.getElementById('long-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-long').style.display = 'none';
    document.getElementById('thank-you').style.display = 'block';
  });
});
