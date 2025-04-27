document.addEventListener("DOMContentLoaded", () => {
  // CMS content onzichtbaar maken
  const cmsContent = document.getElementById('cms-content');
  if (cmsContent) {
    cmsContent.style.display = 'none';
  }

  // Flow container vullen
  const flowContainer = document.getElementById('flow-container');

  // Basis flow starten
  const startScreen = `
    <div class="start-screen">
      <img src="${document.getElementById('cms-hero-large').src}" alt="Hero groot">
      <h1>${document.getElementById('cms-headline').innerText}</h1>
      <p>${document.getElementById('cms-subline').innerText}</p>
      <button id="startButton">${document.getElementById('cms-buttontext').innerText}</button>
    </div>
  `;
  flowContainer.innerHTML = startScreen;

  // Kleur styling
  const mainColor = document.getElementById('cms-maincolor').innerText.trim();
  const accentColor = document.getElementById('cms-accentcolor').innerText.trim();

  document.documentElement.style.setProperty('--main-color', mainColor);
  document.documentElement.style.setProperty('--accent-color', accentColor);

  // Klik op Start -> vragen tonen
  document.getElementById('startButton').addEventListener('click', () => {
    showQuestions();
  });

  function showQuestions() {
    const question1 = document.getElementById('cms-q1').innerText;
    const answer1a = document.getElementById('cms-q1-a1').innerText;
    const answer1b = document.getElementById('cms-q1-a2').innerText;

    const questionHTML = `
      <div class="question-block">
        <h2>${question1}</h2>
        <button class="answer-button">${answer1a}</button>
        <button class="answer-button">${answer1b}</button>
      </div>
    `;
    flowContainer.innerHTML = questionHTML;
  }
});
