// Wacht tot pagina geladen is
document.addEventListener('DOMContentLoaded', function() {
  
  // CMS content uitlezen
  const cmsContent = document.getElementById('cms-content');
  const cmsElements = cmsContent ? cmsContent.querySelectorAll('[id]') : [];

  const cmsData = {};
  cmsElements.forEach(el => {
    cmsData[el.id] = el.innerText.trim();
  });

  // Content vullen op startscherm
  document.getElementById('hero-large').src = cmsData['cms-hero-large'] || '';
  document.getElementById('headline').innerText = cmsData['cms-headline'] || '';
  document.getElementById('subline').innerText = cmsData['cms-subline'] || '';
  document.getElementById('start-button').innerText = cmsData['cms-buttontext'] || '';

  // Progressbar vullen
  document.getElementById('hero-small').src = cmsData['cms-hero-small'] || '';
  document.getElementById('progress-title').innerText = "Op weg naar je prijs";

  // Kleuren instellen
  const mainColor = cmsData['cms-maincolor'] || '#1B68E9';
  const accentColor = cmsData['cms-accentcolor'] || '#F55623';
  document.documentElement.style.setProperty('--main-color', mainColor);
  document.documentElement.style.setProperty('--accent-color', accentColor);

  // Dynamisch vragen ophalen
  const questions = [];
  let index = 1;
  while (cmsData[`cms-q${index}`]) {
    questions.push({
      question: cmsData[`cms-q${index}`],
      answers: [
        cmsData[`cms-q${index}-a1`] || '',
        cmsData[`cms-q${index}-a2`] || ''
      ]
    });
    index++;
  }

  // Flow logica
  let currentQuestion = 0;

  const startScreen = document.getElementById('start-screen');
  const progressBar = document.getElementById('progress-bar');
  const questionScreen = document.getElementById('question-screen');
  const formShort = document.getElementById('form-short');
  const formLong = document.getElementById('form-long');
  const thankYou = document.getElementById('thank-you');

  const startButton = document.getElementById('start-button');
  const questionText = document.getElementById('question-text');
  const answerButtons = document.getElementById('answer-buttons');

  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    progressBar.style.display = 'flex';
    showQuestion();
  });

  function showQuestion() {
    if (currentQuestion < questions.length) {
      questionScreen.style.display = 'block';
      formShort.style.display = 'none';
      formLong.style.display = 'none';
      thankYou.style.display = 'none';

      questionText.innerText = questions[currentQuestion].question;
      answerButtons.innerHTML = '';

      questions[currentQuestion].answers.forEach(answer => {
        if (answer) {
          const btn = document.createElement('button');
          btn.innerText = answer;
          btn.classList.add('answer-button');
          btn.addEventListener('click', nextStep);
          answerButtons.appendChild(btn);
        }
      });

      updateProgress();
    } else {
      questionScreen.style.display = 'none';
      formShort.style.display = 'block';
    }
  }

  function nextStep() {
    currentQuestion++;
    showQuestion();
  }

  function updateProgress() {
    const progress = ((currentQuestion) / (questions.length + 2)) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
  }

  // Short form submit
  document.getElementById('short-form').addEventListener('submit', function(e) {
    e.preventDefault();
    formShort.style.display = 'none';
    formLong.style.display = 'block';
    updateProgress();
  });

  // Long form submit
  document.getElementById('long-form').addEventListener('submit', function(e) {
    e.preventDefault();
    formLong.style.display = 'none';
    thankYou.style.display = 'block';
    updateProgress();
  });

});
