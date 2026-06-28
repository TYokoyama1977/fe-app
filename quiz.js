let questions = [];
let current = 0;

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];

  const questionDiv = document.getElementById("question");
  const questionImage = document.getElementById("questionImage");
  const choicesDiv = document.getElementById("choices");
  const resultDiv = document.getElementById("result");

  resultDiv.textContent = "";
  choicesDiv.innerHTML = "";

  // 文章問題
  if (q.type === "text") {
    questionDiv.textContent = q.question;
    questionImage.style.display = "none";
  }

  // 画像問題
  else if (q.type === "image") {
    questionDiv.textContent = "";
    questionImage.src = q.question;
    questionImage.style.display = "block";
  }

  // 選択肢の表示
  q.choices.forEach((choice, index) => {
    const btn = document.createElement("div");
    btn.className = "choice";
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const q = questions[current];
  const resultDiv = document.getElementById("result");

  if (selected === q.answer) {
    resultDiv.textContent = "〇 正解！";
  } else {
    resultDiv.textContent = "× 不正解";
  }
}
