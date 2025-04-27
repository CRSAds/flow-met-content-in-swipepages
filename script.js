document.addEventListener('DOMContentLoaded', function() {
  // Ophalen Swipe Pages CMS blokken
  const getContent = (id) => document.getElementById(id)?.innerText?.trim() || '';

  // Hero en tekst vullen
  document.getElementById('cms-hero-large').src = getContent('cms-hero-large');
  document.getElementById('cms-hero-small').src = getContent('cms-hero-small');
  document.getElementById('cms-headline').innerText = getContent('cms-headline');
  document.getElementById('cms-subline').innerText = getContent('cms-subline');
  document.getElementById('startButton').innerText = getContent('cms-buttontext');

  // Vragen en antwoorden dynamisch laden
  const questions = [];
  let i = 1;
  while (document.getElementById(`cms-q${i}`)) {
    questions.push({
      question: getContent(`cms-q${i}`),
      answers: [
        getContent(`cms-q${i}-a1`),
        getContent(`cms-q${i}-a2`)
      ]
    });
    i++;
  }

  let currentQuestion = 0;

  function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    container.innerHTML = `
      <h2>${q.question}</h2>
      ${q.answers.map(answer => `<button class="choice-button">${answer}</button>`).join('')}
    `;
    document.querySelectorAll('.choice-button').forEach(button => {
      button.addEventListener('click', () => {
        currentQuestion++;
        updateProgressBar();
        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          // Formulier tonen
          container.innerHTML = `
            <div class="custom-form">
              <div class="form-group"><input type="text" placeholder="Voornaam"></div>
              <div class="form-group"><input type="text" placeholder="Achternaam"></div>
              <div class="form-group"><input type="email" placeholder="E-mail"></div>
              <div class="form-group"><input type="text" placeholder="Postcode"></div>
              <div class="form-group"><input type="text" placeholder="Straat & Huisnummer"></div>
              <div class="form-group"><input type="text" placeholder="Woonplaats"></div>
              <div class="form-group"><input type="tel" placeholder="Telefoonnummer"></div>
              <button class="form-button">Verzend</button>
            </div>
          `;
        }
      });
    });
  }

  function updateProgressBar() {
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
  }

  // Startknop
  document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('prelander').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'flex';
    document.getElementById('flow').style.display = 'block';
    showQuestion();
    updateProgressBar();
  });
});
