document.addEventListener('DOMContentLoaded', () => {
  // Haal alle CMS data op
  const heroLarge = document.getElementById('cms-hero-large')?.querySelector('img')?.src || '';
  const heroSmall = document.getElementById('cms-hero-small')?.querySelector('img')?.src || '';
  const headline = document.getElementById('cms-headline')?.innerText || '';
  const subline = document.getElementById('cms-subline')?.innerText || '';
  const buttontext = document.getElementById('cms-buttontext')?.innerText || 'Start';
  const mainColor = document.getElementById('cms-maincolor')?.innerText || '#1B68E9';
  const accentColor = document.getElementById('cms-accentcolor')?.innerText || '#F55623';

  // Vul de startpagina
  document.getElementById('hero-large').src = heroLarge;
  document.getElementById('headline').innerText = headline;
  document.getElementById('subline').innerText = subline;
  document.getElementById('start-button').innerText = buttontext;

  // Progressbar kleur
  document.querySelector('.progress-fill').style.backgroundColor = accentColor;

  // Startknop
  document.getElementById('start-button').addEventListener('click', startSurvey);

  // Functies
  let currentQuestion = 0;
  let questions = [];

  function startSurvey() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('progress-bar').style.display = 'flex';
    document.getElementById('question-screen').style.display = 'block';
    loadQuestions();
    showQuestion();
  }

  function loadQuestions() {
    let i = 1;
    while (true) {
      const question = document.getElementById(`cms-q${i}`);
      const answer1 = document.getElementById(`cms-q${i}-a1`);
      const answer2 = document.getElementById(`cms-q${i}-a2`);
      if (!question) break;
      questions.push({
        text: question.innerText,
        answers: [
          answer1?.innerText || 'Ja',
          answer2?.innerText || 'Nee'
        ]
      });
      i++;
    }
  }

  function showQuestion() {
    if (currentQuestion >= questions.length) {
      showFormShort();
      return;
    }
    const q = questions[currentQuestion];
    document.getElementById('question-text').innerText = q.text;
    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';

    q.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('answer-button');
      button.addEventListener('click', () => {
        currentQuestion++;
        updateProgress();
        showQuestion();
      });
      answerButtons.appendChild(button);
    });
  }

  function updateProgress() {
    const percentage = (currentQuestion / (questions.length + 2)) * 100;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
  }

  function showFormShort() {
    document.getElementById('question-screen').style.display = 'none';
    document.getElementById('form-short').style.display = 'block';
  }
});
