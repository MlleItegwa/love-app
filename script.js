/* ================= PAGE CONTROL ================= */

function showPage(id){

  document.querySelectorAll('.page').forEach(p=>{
    p.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  if(id==="page6"){
    launchConfetti();
  }
}


/* ================= NO BUTTON ================= */

const noBtn=document.getElementById("noBtn");

noBtn.addEventListener("mouseover",()=>{

  noBtn.style.position="absolute";

  noBtn.style.left=Math.random()*80+"%";
  noBtn.style.top=Math.random()*80+"%";

});


/* ================= NAVIGATION ================= */

function startApp() {
  const music = document.getElementById("bgMusic");

  music.play().catch(err => {
    console.log("Music blocked:", err);
  });

  goPuzzle(); // Continue to puzzle
}

function goPuzzle(){

  // Start music
  const music = document.getElementById("bgMusic");

  if (music && music.paused) {
    music.play().catch(err => {
      console.log("Music blocked:", err);
    });
  }

  // Go to puzzle
  showPage("page2");
}


function showFunny(){
  showPage("page4");
}

function goTired(){
  showPage("page3");
}

function openGift(){
  showPage("page7");
}

function openLetter(){
  showPage("page8");
}


/* ================= CONFETTI ================= */

function launchConfetti(){

  let end=Date.now()+3000;

  (function frame(){

    confetti({
      particleCount:6,
      spread:80
    });

    if(Date.now()<end){
      requestAnimationFrame(frame);
    }

  })();
}


/* ================= PUZZLE ================= */

const puzzle=document.getElementById("puzzle");

let pieces=[];
let order=[];


for(let i=0;i<9;i++){

  let div=document.createElement("div");

  div.className="piece";
  div.draggable=true;

  let x=i%3;
  let y=Math.floor(i/3);

  div.style.backgroundImage="url('accessories/puzzle.jpeg')";
  div.style.backgroundPosition=`-${x*100}px -${y*100}px`;

  div.dataset.id=i;

  pieces.push(div);
  order.push(i);
}


order.sort(()=>Math.random()-0.5);


order.forEach(i=>{
  puzzle.appendChild(pieces[i]);
});


let dragItem=null;


document.querySelectorAll('.piece').forEach(piece=>{

  piece.addEventListener("dragstart",()=>{
    dragItem=piece;
  });

  piece.addEventListener("dragover",e=>{
    e.preventDefault();
  });

  piece.addEventListener("drop",()=>{

    if(dragItem===piece) return;

    let temp=dragItem.style.backgroundPosition;

    dragItem.style.backgroundPosition=
      piece.style.backgroundPosition;

    piece.style.backgroundPosition=temp;

    let id=dragItem.dataset.id;

    dragItem.dataset.id=piece.dataset.id;

    piece.dataset.id=id;

    checkPuzzle();

  });

});


function checkPuzzle(){

  let solved=true;

  document.querySelectorAll('.piece').forEach((p,i)=>{

    if(Number(p.dataset.id)!==i){
      solved=false;
    }

  });

  if(solved){

    setTimeout(()=>{
      alert("Pas mal 😘");
      showPage("page3");
    },500);

  }
}


/* ================= QUIZ ================= */

let qIndex=0;
let answersLog=[];


/* ====== TES 12 QUESTIONS ====== */

const quiz=[

{
q: "Quelle valeur fondamentale tu tiens au-dessus de tout ?",
    o: ["Loyauté", "Intégrité", "Compassion", "Sagesse"],
},

{
 q: "Qu’est-ce qui te motive à continuer même dans les moments difficiles ?",
    o: ["La foi / prière", "L’ambition / les objectifs", "L’amour pour la famille", "La confiance en soi"],
},

{
 q: "Comment tu gères l’échec ou les revers ?",
    o: ["Elle réfléchit en silence", "Elle en parle avec quelqu’un en qui elle a confiance", "Elle apprend et avance", "Tout ce qui précède"],
},

{
 q: "Qu’est-ce que tu as le plus peur de perdre ?",
    o: ["Les relations proches", "Son indépendance", "Ses rêves / son potentiel", "Son identité"],
},

{
q: "Comment est-ce que tu montres ton amour et ton attention aux autres ?",
    o: ["Par des actions concrètes", "En écoutant profondément", "En donnant conseils et soutien", "Par de petites attentions réfléchies"],
},

{
q: "Qu’est-ce qui te fait te sentir vraiment comprise ?",
    o: ["Une conversation honnête", "Une connexion émotionnelle", "Des expériences partagées", "Le silence qui donne un sentiment de sécurité"],
},

{
 q: "Lequel de ces mots décrit le mieux ta force émotionnelle ?",
    o: ["Résiliente", "Patiente", "Empathique", "Tout ce qui précède"],
},

{
q: "Quelle est ta plus grande source de paix intérieure ?",
    o: ["La foi / la prière", "La solitude / la réflexion", "Aider les autres", "L’expression créative"],
},

{
q: "Comment définirais-tu la vraie amitié ?",
    o: ["Respect et honnêteté mutuels", "Soutien émotionnel en toutes circonstances", "Joie et croissance partagées", "Tout ce qui précède"],
},

{
q: "Qu’est-ce qui t'apporte la plus grande joie ?",
    o: ["Atteindre ses objectifs", "Aider quelqu’un à grandir", "Être authentiquement elle-même", "Des liens significatifs"],
},

{
q: "Si tu pouvais donner une leçon au monde, ce serait…",
    o: ["Aimer profondément", "Rester fidèle à soi-même", "Continuer à grandir malgré la peur", "Tout ce qui précède"],
},

{
q: "Qu’est-ce qui te rend irremplaçable en tant qu’amie ?",
    o: ["Ta profondeur émotionnelle", "Ta loyauté et sa confiance", "Ta capacité à comprendre sans mots", "L’amour et l’histoire que tu portes"],
}

];


function startQuiz(){

  showPage("page5");

  qIndex=0;
  answersLog=[];

  loadQ();

}


function loadQ(){

  if(qIndex>=quiz.length){

    sendEmail();
    showPage("page6");

    return;
  }


  const q=quiz[qIndex];


  // Slide animation only on box
  const box = document.querySelector(".quiz-box");

if(box){
  box.classList.remove("slide");
  void box.offsetWidth;
  box.classList.add("slide");
}


  document.getElementById("question").innerText=q.q;


  let ops=document.getElementById("options");

  ops.innerHTML="";


  q.o.forEach(opt=>{

    let btn=document.createElement("button");

    btn.className="option";

    btn.innerText=opt;


    btn.onclick=()=>{

      answersLog.push({
        question:q.q,
        answer:opt
      });

      qIndex++;

      loadQ();

    };


    ops.appendChild(btn);

  });

}


/* ================= EMAIL ================= */

function sendEmail(){

  let text="Résultats du Quiz 💙\n\n";


  answersLog.forEach((a,i)=>{

    text+=`${i+1}. ${a.question}\n`;
    text+=`Réponse: ${a.answer}\n\n`;

  });


  emailjs.send(
    "service_8pwulyh",
    "template_lulrx8r",
    {
      message:text
    }
  ).then(()=>{

    console.log("Email envoyé 💌");

  }).catch(err=>{

    console.log("Erreur email:",err);

  });

}
