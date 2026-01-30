

// ================= STUDENT INFO =================
let studentName = "";
let htmlScore = 0, cssScore = 0, jsScore = 0;
let timeLeft = 600;      // 600 seconds = 10 minutes
let timerInterval;      // will store setInterval reference


// ================= QUESTIONS =================
const htmlQ = [
  ["What does HTML stand for?","HyperText Markup Language","HighText Machine Language","Hyper Tool Multi Language",0],
  ["Which tag is used to create a hyperlink?","a","link","href",0],
  ["Which tag is used to display an image?","img","image","picture",0],
  ["Which attribute specifies the image path?","src","href","alt",0],
  ["Which is the largest heading tag?","h1","h6","head",0],
  ["Which tag creates a line break?","br","lb","break",0],
  ["Which tag creates an unordered list?","ul","ol","list",0],
  ["Which tag defines a table row?","tr","td","table",0],
  ["Which tag defines a table cell?","td","th","tr",0],
  ["Which attribute opens a link in new tab?","target='_blank'","new='tab'","open='new'",0],
  ["Which tag defines a form?","form","input","fieldset",0],
  ["Which input type hides typed text?","password","text","hidden",0],
  ["How do you write an HTML comment?","//","!-- --","/* */",1],
  ["Which tag defines document title?","title","meta","head",0],
  ["Which tag is used to embed JavaScript?","script","js","code",0],
  ["Which tag is used for video?","video","media","movie",0],
  ["Which tag is used for audio?","audio","sound","music",0],
  ["Which attribute adds extra info to elements?","class","style","id",0],
  ["Which input type is used for checkbox?","checkbox","check","option",0],
  ["Which tag creates a clickable button?","button","btn","input",0]
];

const cssQ = [
  ["What does CSS stand for?","Cascading Style Sheets","Creative Style Sheets","Colorful Style Sheets",0],
  ["Which property changes text color?","color","font-color","text-color",0],
  ["Which property sets background color?","background-color","bgcolor","color",0],
  ["Which property changes font size?","font-size","text-size","size",0],
  ["Which symbol selects a class?"," . "," # "," * ",0],
  ["Which symbol selects an id?","#",".","*",0],
  ["Which property aligns text?","text-align","align","float",0],
  ["Which property adds space inside element?","padding","margin","border",0],
  ["Which property adds space outside element?","margin","padding","spacing",0],
  ["Which property changes font style?","font-family","font-style","text-style",0],
  ["Which display hides element?","display:none","visibility:show","hidden",0],
  ["Which property makes text bold?","font-weight","text-bold","bold",0],
  ["Which property rounds corners?","border-radius","corner-radius","round",0],
  ["Which property sets element width?","width","size","length",0],
  ["Which property sets height?","height","length","size",0],
  ["Which property adds shadow?","box-shadow","border-shadow","shadow",0],
  ["Which value makes layout flexible?","flex","block","inline",0],
  ["Which property controls transparency?","opacity","transparent","alpha",0],
  ["Which property changes cursor?","cursor","pointer","mouse",0],
  ["Which unit is relative?","%","px","cm",0]
];

const jsQ = [
  ["JavaScript is a ___ language","Scripting","Markup","Styling",0],
  ["Which keyword declares a variable?","let","int","define",0],
  ["Which symbol is used for comments?","//","!-- --","##",0],
  ["Which keyword defines a constant?","const","var","let",0],
  ["Which function prints output?","console.log","print","echo",0],
  ["Which operator compares value and type?","===","==","=",0],
  ["Which keyword creates a function?","function","method","def",0],
  ["Which loop runs fixed times?","for","while","if",0],
  ["Which event occurs on button click?","onclick","onload","onchange",0],
  ["Which keyword stops a loop?","break","stop","exit",0],
  ["Which data type stores true/false?","boolean","number","string",0],
  ["Which array index starts first?","0","1","-1",0],
  ["Which method adds item to array?","push","add","append",0],
  ["Which method removes last item?","pop","remove","delete",0],
  ["Which object represents browser window?","window","document","screen",0],
  ["Which keyword handles errors?","try","catch","error",0],
  ["Which method converts to integer?","parseInt","toInt","Number()",0],
  ["Which keyword checks condition?","if","for","switch",0],
  ["Which operator is logical AND?","&&","||","!",0],
  ["Which method selects element by id?","getElementById","querySelectorAll","getById",0]
];

// ================= RENDER FUNCTION =================
function renderQuiz(arr, box, prefix) {
  box.innerHTML = "";
  arr.forEach((q, i) => {
    box.innerHTML += `
      <div class="question">
        <p><b>${i + 1}. ${q[0]}</b></p>

        <label>
          <input type="radio" name="${prefix}${i}" value="0">
          ${q[1]}
        </label>

        <label>
          <input type="radio" name="${prefix}${i}" value="0">
          ${q[2]}
        </label>

        <label>
          <input type="radio" name="${prefix}${i}" value="0">
          ${q[3]}
        </label>
      </div>
    `;
  });

  // set correct answers safely
  arr.forEach((q, i) => {
    const options = document.getElementsByName(prefix + i);
    options[q[4]].value = "1";
  });
}

// ================= INITIALIZE QUIZ =================
renderQuiz(htmlQ,document.getElementById("htmlBox"),"h");
renderQuiz(cssQ,document.getElementById("cssBox"),"c");
renderQuiz(jsQ,document.getElementById("jsBox"),"j");

function startTimer(nextFunction){
  // stop any previous timer
  clearInterval(timerInterval);

  // reset time to 10 minutes
  timeLeft = 600;

  // show timer UI
  document.getElementById("timerBox").classList.remove("hidden");

  // start countdown
  timerInterval = setInterval(() => {

    // convert seconds to minutes & seconds
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    // update timer text
    document.getElementById("timer").innerText =
      `${min}:${sec < 10 ? "0" + sec : sec}`;

    // reduce time
    timeLeft--;

    // when time finishes
    if(timeLeft < 0){
      clearInterval(timerInterval);
      nextFunction();   // automatically move to next page
    }

  }, 1000);
}


// ================= FLOW =================
function startQuiz(){
  studentName=document.getElementById("name").value;
  if(!studentName){alert("Enter your name");return;}
  document.getElementById("registerPage").classList.add("hidden");
  document.getElementById("htmlPage").classList.remove("hidden");
  startTimer(goCSS);
  document.getElementById("quizTop").classList.remove("hidden");
setActiveTab("HTML");



}

function calcScore(arr,prefix){
  let s=0;
  arr.forEach((q,i)=>{
    const a=document.querySelector(`input[name=${prefix}${i}]:checked`);
    if(a && a.value=="1") s++;
  });
  return s;

}
function goCSS(){

  htmlScore = calcScore(htmlQ,"h");
  document.getElementById("htmlPage").classList.add("hidden");
  document.getElementById("cssPage").classList.remove("hidden");
  window.scrollTo(0,0);
   startTimer(goJS);
   setActiveTab("CSS");
window.scrollTo(0,0);

 

}
function goJS(){
  
  cssScore = calcScore(cssQ,"c");
  document.getElementById("cssPage").classList.add("hidden");
  document.getElementById("jsPage").classList.remove("hidden");
  window.scrollTo(0,0);
  startTimer(showResult);
  setActiveTab("JS");
window.scrollTo(0,0);

}
    

  

function getGrade(percent){
  if(percent >= 90) return "A+";
  if(percent >= 75) return "A";
  if(percent >= 60) return "B";
  if(percent >= 40) return "C";
  return "FAIL";
}


let userAnswers = [];

  userAnswers = [];
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);

    if (selected) {
      const ans = parseInt(selected.value);
      userAnswers.push(ans);

      if (ans === q.correct) score++;
    } else {
      userAnswers.push(null);
    }
  });

  document.getElementById("finalScore").innerText =
    "Total Score: " + score + " / " + quizData.length;

  hideAllPages();
  document.getElementById("resultPage").classList.remove("hidden");


function showResult() {
  // Hide quiz navigation and timer
  document.getElementById("quizTop").classList.add("hidden");
  clearInterval(timerInterval);
  document.getElementById("timerBox").classList.add("hidden");

  // Calculate JavaScript score
  jsScore = calcScore(jsQ, "j");

  // Hide JS quiz page, show result page
  document.getElementById("jsPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");
  window.scrollTo(0, 0);

  // Populate result table
  document.getElementById("hC").innerText = htmlScore;
  document.getElementById("hW").innerText = 20 - htmlScore;
  document.getElementById("hM").innerText = htmlScore;
  document.getElementById("hP").innerText = ((htmlScore / 20) * 100).toFixed(2) + "%";

  document.getElementById("cC").innerText = cssScore;
  document.getElementById("cW").innerText = 20 - cssScore;
  document.getElementById("cM").innerText = cssScore;
  document.getElementById("cP").innerText = ((cssScore / 20) * 100).toFixed(2) + "%";

  document.getElementById("jC").innerText = jsScore;
  document.getElementById("jW").innerText = 20 - jsScore;
  document.getElementById("jM").innerText = jsScore;
  document.getElementById("jP").innerText = ((jsScore / 20) * 100).toFixed(2) + "%";

  // Total score and pass/fail
  const total = htmlScore + cssScore + jsScore;
  const status = document.getElementById("passFailStatus");

  if (total >= 24) {
    status.innerHTML = "✅ PASS — Congratulations!";
    status.style.color = "green";
  } else {
    status.innerHTML = "❌ FAIL — Try Again";
    status.style.color = "red";
  }

  // Grades per subject
  const hPercent = (htmlScore / 20) * 100;
  const cPercent = (cssScore / 20) * 100;
  const jPercent = (jsScore / 20) * 100;

  document.getElementById("hG").innerText = getGrade(hPercent);
  document.getElementById("cG").innerText = getGrade(cPercent);
  document.getElementById("jG").innerText = getGrade(jPercent);

  // Add button to go to Preview Page
  // Remove previous button if exists
  const existingBtn = document.getElementById("previewBtn");
  if (existingBtn) existingBtn.remove();

  document.getElementById("resultPage").appendChild(previewBtn);
}

function showPreview() {
  document.getElementById("resultPage").classList.add("hidden");
  document.getElementById("previewPage").classList.remove("hidden");

  const box = document.getElementById("previewContent");
  box.innerHTML = "";

  buildPreview(htmlQ, previewAnswers.html, "HTML", box);
  buildPreview(cssQ, previewAnswers.css, "CSS", box);
  buildPreview(jsQ, previewAnswers.js, "JavaScript", box);

  window.scrollTo(0, 0);
}

function buildPreview(arr, answers, title, box) {
  box.innerHTML += `<h3>${title}</h3>`;

  arr.forEach((q, i) => {
    const correctIndex = q[4];
    const userIndex = answers[i];

    box.innerHTML += `
      <div style="margin-bottom:15px; padding:15px; border:1px solid #ccc;">
        <p><b>${i + 1}. ${q[0]}</b></p>
        <p>Your Answer:
          <span style="color:${userIndex === correctIndex ? 'green' : 'red'}">
            ${userIndex !== null ? q[userIndex + 1] : "Not Answered"}
          </span>
        </p>
        <p>Correct Answer:
          <span style="color:green">${q[correctIndex + 1]}</span>
        </p>
      </div>
    `;
  });
}


function showCertificate() {
  document.getElementById("previewPage").classList.add("hidden");
  document.getElementById("certificatePage").classList.remove("hidden");

  document.getElementById("certName").innerText = studentName;
  document.getElementById("finalScore").innerText =
    "Total Score: " + (htmlScore + cssScore + jsScore) + " / 60";

  document.getElementById("certDate").innerText =
    new Date().toLocaleDateString();

  window.scrollTo(0, 0);
}

function printCertificate() {
  window.print();
}
function setActiveTab(subject){
  document.getElementById("tabHTML").classList.remove("active");
  document.getElementById("tabCSS").classList.remove("active");
  document.getElementById("tabJS").classList.remove("active");

  if(subject==="HTML") document.getElementById("tabHTML").classList.add("active");
  if(subject==="CSS") document.getElementById("tabCSS").classList.add("active");
  if(subject==="JS") document.getElementById("tabJS").classList.add("active");
}
function openPreview() {
  document.getElementById("resultPage").classList.add("hidden");
  document.getElementById("previewPage").classList.remove("hidden");

  const box = document.getElementById("previewContent");
  box.innerHTML = "";

  renderCorrectAnswers(htmlQ, "HTML", box);
  renderCorrectAnswers(cssQ, "CSS", box);
  renderCorrectAnswers(jsQ, "JavaScript", box);

  window.scrollTo(0, 0);
}

function renderCorrectAnswers(arr, title, box) {
  box.innerHTML += `<h3 style="margin-top:40px;">${title} Answers</h3>`;

  for (let i = 0; i < arr.length; i++) {
    const q = arr[i];
    const correct = q[4];

    box.innerHTML += `
      <div style="border:1px solid #ccc; padding:16px; margin:16px 0; border-radius:8px;">
        <p><b>${i + 1}. ${q[0]}</b></p>

        <p style="${correct === 0 ? 'color:green;font-weight:bold;' : ''}">
          A) ${q[1]} ${correct === 0 ? '✔ Correct' : ''}
        </p>

        <p style="${correct === 1 ? 'color:green;font-weight:bold;' : ''}">
          B) ${q[2]} ${correct === 1 ? '✔ Correct' : ''}
        </p>

        <p style="${correct === 2 ? 'color:green;font-weight:bold;' : ''}">
          C) ${q[3]} ${correct === 2 ? '✔ Correct' : ''}
        </p>
      </div>
    `;
  }
}

function renderPreview(arr, prefix, title, box) {
  box.innerHTML += `<h2>${title}</h2>`;

  arr.forEach((q, i) => {
    const selected = document.querySelector(
      `input[name=${prefix}${i}]:checked`
    );

    let yourAnswer = "Not Answered";
    if (selected) {
      yourAnswer = q[parseInt(selected.value) + 1];
    }

    const correctAnswer = q[q[4] + 1];

    box.innerHTML += `
      <div style="border:1px solid #ccc; padding:15px; margin:15px 0;">
        <p><b>${i + 1}. ${q[0]}</b></p>
        <p>Your Answer: <span style="color:#ff5722">${yourAnswer}</span></p>
        <p>Correct Answer: <span style="color:green">${correctAnswer}</span></p>
      </div>
    `;
  });
}
function goCertificate() {
  document.getElementById("previewPage").classList.add("hidden");
  document.getElementById("certificatePage").classList.remove("hidden");
}
function openPreviewPage() {
  document.getElementById("resultPage").style.display = "none";
  document.getElementById("previewPage").style.display = "block";

  loadPreview("previewHTML", htmlQuestions, "HTML");
  loadPreview("previewCSS", cssQuestions, "CSS");
  loadPreview("previewJS", jsQuestions, "JavaScript");
}

function loadPreview(containerId, questions, title) {
  let box = document.getElementById(containerId);
  box.innerHTML = `<h2>${title} Answers</h2>`;

  questions.forEach((q, index) => {
    box.innerHTML += `
      <div style="margin-bottom:20px">
        <p><b>${index + 1}. ${q.question}</b></p>
        ${q.options.map((opt, i) => `
          <p style="color:${i === q.correct ? 'green' : 'black'}">
            ${opt}
          </p>
        `).join("")}
      </div>
    `;
  });
}


