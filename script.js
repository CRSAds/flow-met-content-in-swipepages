document.addEventListener('DOMContentLoaded', () => {
  const getContent = (id) => {
    const element = document.getElementById(id);
    return element ? element.innerText.trim() : '';
  };

  const getImage = (id) => {
    const img = document.getElementById(id);
    return img ? img.src : '';
  };

  const updateContent = () => {
    document.getElementById('headline').innerText = getContent('cms-headline');
    document.getElementById('subline').innerText = getContent('cms-subline');
    document.getElementById('startButton').innerText = getContent('cms-buttontext');
    document.getElementById('hero-large').src = getImage('cms-hero-large');
    document.getElementById('hero-small').src = getImage('cms-hero-small');
  };

  const questions = [];
  let currentQuestionIndex = 0;

  const loadQuestions = () => {
    let index = 1;
    while (true) {
      const question = getContent(`cms-q${index}`);
      if (!question) break;

      const answer1 = getContent(`cms-q${index}-a1`);
      const answer2 = getContent(`cms-q${index}-a2`);

      questions.push({ question, answers: [answer1, answer2] });
      index++;
    }
  };

  const showQuestion = () => {
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';

    if (currentQuestionIndex < questions.length) {
      const q = questions[currentQuestionIndex];
      const questionTitle = document.createElement('h2');
      questionTitle.innerText = q.question;
      questionTitle.className = 'question';
      container.appendChild(questionTitle);

      q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer;
        btn.className = 'answer-button';
        btn.onclick = () => {
          currentQuestionIndex++;
          updateProgress();
          showQuestion();
        };
        container.appendChild(btn);
      });
    } else {
      container.innerHTML = '<h2>Bedankt voor je deelname!</h2>';
    }
  };

  const updateProgress = () => {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
  };

  document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('prelander').style.display = 'none';
    document.getElementById('progressContainer').style.display = 'block';
    document.getElementById('flow').style.display = 'block';
    showQuestion();
  });

  updateContent();
  loadQuestions();
});
