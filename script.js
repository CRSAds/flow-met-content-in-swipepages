// Eerst: helper functie om te wachten op #cms-content
function waitForCmsContent(callback) {
  const checkExist = setInterval(() => {
    if (document.getElementById('cms-content')) {
      clearInterval(checkExist);
      callback();
    }
  }, 100);
}

// Start pas nadat cms-content geladen is
document.addEventListener('DOMContentLoaded', function () {
  waitForCmsContent(function () {

    console.log("✅ CMS-content gevonden, flow wordt gestart");

    // Content uitlezen
    const heroLarge = document.getElementById('hero-large');
    const heroSmall = document.getElementById('hero-small');
    const headline = document.getElementById('headline');
    const subline = document.getElementById('subline');
    const startButton = document.getElementById('start-button');
    const questionText = document.getElementById('question-text');
    const answerButtons = document.getElementById('answer-buttons');
    const progressFill = document.getElementById('progress-fill');

    const heroLargeCms = document.getElementById('hero-large-cms');
    const heroSmallCms = document.getElementById('hero-small-cms');
    const headlineCms = document.getElementById('headline-cms');
    const sublineCms = document.getElementById('subline-cms');
    const buttonCms = document.getElementById('button-cms');

    const questionBlocks = Array.from(document.querySelectorAll('[id^="question-"]'));
    const answerBlocks = Array.from(document.querySelectorAll('[id^="answers-"]'));

    const flowContainer = document.getElementById('dynamic-flow');
    const startScreen = document.getElementById('start-screen');
    const progressBar = document.getElementById('progress-bar');
    const questionScreen = document.getElementById('question-screen');
    const formShort = document.getElementById('form-short');
    const formLong = document.getElementById('form-long');
    const thankYou = document.getElementById('thank-you');

    // Vul de startpagina vanuit CMS
    if (heroLargeCms && heroLarge) heroLarge.src = heroLargeCms.src;
    if (heroSmallCms && heroSmall) heroSmall.src = heroSmallCms.src;
    if (headlineCms && headline) headline.textContent = headlineCms.textContent;
    if (sublineCms && subline) subline.textContent = sublineCms.textContent;
    if (buttonCms && startButton) startButton.textContent = buttonCms.textContent;

    // Variabelen
    let currentQuestion = 0;
    const totalSteps = questionBlocks.length + 2; // vragen + shortform + longform
    let currentStep = 0;

    function showSection(section) {
      startScreen.style.display = 'none';
      progressBar.style.display = 'none';
      questionScreen.style.display = 'none';
      formShort.style.display = 'none';
      formLong.style.display = 'none';
      thankYou.style.display = 'none';
      section.style.display = 'block';
    }

    function updateProgress() {
      currentStep++;
      const progress = (currentStep / totalSteps) * 100;
      progressFill.style.width = progress + '%';
    }

    function loadQuestion(index) {
      if (index < questionBlocks.length) {
        const question = questionBlocks[index];
        const answers = answerBlocks[index];

        if (question && answers) {
          questionText.textContent = question.textContent;
          answerButtons.innerHTML = '';

          answers.querySelectorAll('button').forEach(btn => {
            const clone = btn.cloneNode(true);
            clone.addEventListener('click', () => {
              nextStep();
            });
            answerButtons.appendChild(clone);
          });
        }
      }
    }

    function nextStep() {
      currentQuestion++;
      updateProgress();

      if (currentQuestion <= questionBlocks.length) {
        loadQuestion(currentQuestion - 1);
      } else if (currentQuestion === questionBlocks.length + 1) {
        showSection(formShort);
      } else if (currentQuestion === questionBlocks.length + 2) {
        showSection(formLong);
      } else {
        showSection(thankYou);
      }
    }

    // Start Button
    startButton.addEventListener('click', function () {
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('progress-bar').style.display = 'flex';
      document.getElementById('question-screen').style.display = 'block';
      loadQuestion(currentQuestion);
      updateProgress();
    });

    // Short Form Submit
    document.getElementById('short-form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      nextStep();
    });

    // Long Form Submit
    document.getElementById('long-form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      showSection(thankYou);
      updateProgress();
    });

  });
});
