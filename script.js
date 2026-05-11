// =====================================
// BERKEBUN CERIA
// JAVASCRIPT FULL
// =====================================


// =====================================
// AUDIO
// =====================================

const bgMusic =
  document.getElementById('bgMusic');

const correctSound =
  document.getElementById('correctSound');

const wrongSound =
  document.getElementById('wrongSound');

// TAMBAHAN AUDIO YEAY
const yeySound =
  document.getElementById('yeySound');

bgMusic.volume = 0.3;


function startGame() {

  bgMusic.play();

  currentColorQuestion = 0;

  score1 = 0;

  colorQuestions.sort(
    () => Math.random() - 0.5
  );

  loadColorQuestion();

  showPage('game1');
}

// =====================================
// SHOW PAGE
// =====================================

function showPage(pageId) {

  document.querySelectorAll('.page')
    .forEach((page) => {

      page.classList.remove('active');

    });

  document.getElementById(pageId)
    .classList.add('active');
}


// =====================================
// SOUND EFFECT
// =====================================

function playCorrect() {

  correctSound.currentTime = 0;

  correctSound.play();
}

function playWrong() {

  wrongSound.currentTime = 0;

  wrongSound.play();
}


// =====================================
// TOTAL SCORE
// =====================================

let totalScore = 0;

function addScore(score) {

  totalScore += score;
}


// =====================================
// GAME 1
// TEBAK WARNA
// =====================================


// =====================================
// DATA SOAL
// =====================================

const colorQuestions = [

  {
    image:
      'https://cdn-icons-png.flaticon.com/512/415/415733.png',

    question:
      'Apa warna apel?',

    answer:
      'Merah',

    choices: [
      'Merah',
      'Hijau',
      'Biru'
    ]
  },

  {
    image:
      'https://cdn-icons-png.flaticon.com/512/590/590685.png',

    question:
      'Apa warna stroberi?',

    answer:
      'Merah',

    choices: [
      'Ungu',
      'Kuning',
      'Merah'
    ]
  },

  {
    image:
      'assets/gambar/carrot.png',

    question:
      'Apa warna wortel?',

    answer:
      'Oranye',

    choices: [
      'Hijau',
      'Oranye',
      'Biru'
    ]
  },

  // =====================================
  // SOAL BARU
  // =====================================

  {
    image:
      'assets/gambar/eggplant.png',

    question:
      'Apa warna terong?',

    answer:
      'Ungu',

    choices: [
      'Ungu',
      'Hijau',
      'Merah'
    ]
  },

  {
    image:
      'assets/gambar/sunflower-bloom.png',

    question:
      'Apa warna bunga matahari?',

    answer:
      'Kuning',

    choices: [
      'Biru',
      'Kuning',
      'Hijau'
    ]
  },

  {
    image:
      'assets/gambar/broccoli.png',

    question:
      'Apa warna brokoli?',

    answer:
      'Hijau',

    choices: [
      'Hijau',
      'Oranye',
      'Merah'
    ]
  }

];


// =====================================
// WARNA BUTTON
// =====================================

const colorClassMap = {

  Merah:
    'choice-red',

  Hijau:
    'choice-green',

  Biru:
    'choice-blue',

  Kuning:
    'choice-yellow',

  Oranye:
    'choice-orange',

  Ungu:
    'choice-purple',

  Pink:
    'choice-pink',

  Coklat:
    'choice-brown'

};


// =====================================
// VARIABLE
// =====================================

let currentColorQuestion = 0;

let score1 = 0;


// =====================================
// LOAD QUESTION
// =====================================

function loadColorQuestion() {

  console.log(currentColorQuestion);

  const data =
    colorQuestions[currentColorQuestion];

  // IMAGE
  document.getElementById('colorImage').src =
    data.image;

  // QUESTION
  document.getElementById('colorQuestion')
    .innerText =
    data.question;

  // CHOICES
  renderChoices(data);

}


// =====================================
// RENDER PILIHAN
// =====================================

function renderChoices(data){

  const choicesContainer =
    document.getElementById('colorChoices');

  choicesContainer.innerHTML = '';

  data.choices.forEach((choice) => {

    const button =
      document.createElement('button');

    button.innerText = choice;

    // CLASS DASAR
    button.classList.add(
      'choice-btn'
    );

    // CLASS WARNA
    const colorClass =
      colorClassMap[choice];

    if(colorClass){

      button.classList.add(colorClass);

    }

    // EVENT CLICK
    button.onclick = () => {

      checkAnswer(choice, data.answer);

    };

    choicesContainer.appendChild(button);

  });

}


function checkAnswer(choice, answer){

  // BENAR
  if(choice === answer){

    playCorrect();

    document.getElementById('feedback1')
      .innerText =
      '✅ Benar! Hebat!';

    score1 += 10;

    addScore(10);

    document.getElementById('score1')
      .innerText =
      score1;

    currentColorQuestion++;

    setTimeout(() => {

      document.getElementById('feedback1')
        .innerText = '';

      // NEXT QUESTION
      if(
        currentColorQuestion <
        colorQuestions.length
      ){

        // INI YANG KURANG
        loadColorQuestion();

      }

      // FINISH
      else{

        showPage('game2');

      }

    }, 1200);

  }

  // SALAH
  else{

    playWrong();

    document.getElementById('feedback1')
      .innerText =
      '❌ Salah, coba lagi!';

  }

}


// =====================================
// GAME 2
// =====================================

let selectedLeft = null;
let selectedRight = null;

let matchedCount = 0;
let score2 = 0;


const matchAnswers = {

  apple: 'apple',
  strawberry: 'strawberry',
  carrot: 'carrot',
  garlic: 'garlic',
  pumpkin: 'pumpkin',
  avocado: 'avocado'

};


// =====================================
// PILIH TITIK KIRI
// =====================================

document.querySelectorAll('.left-dot')
  .forEach((dot) => {

    dot.addEventListener('click', () => {

      document.querySelectorAll('.left-dot')
        .forEach((d) => {

          d.classList.remove('active-dot');

        });

      dot.classList.add('active-dot');

      selectedLeft =
        dot.dataset.name;

      checkMatchGame2();

    });

  });


// =====================================
// PILIH TITIK KANAN
// =====================================

document.querySelectorAll('.right-dot')
  .forEach((dot) => {

    dot.addEventListener('click', () => {

      document.querySelectorAll('.right-dot')
        .forEach((d) => {

          d.classList.remove('active-dot');

        });

      dot.classList.add('active-dot');

      selectedRight =
        dot.dataset.name;

      checkMatchGame2();

    });

  });


// =====================================
// BUAT GARIS
// =====================================

function createLine(leftDot, rightDot) {

  const line =
    document.createElement('div');

  line.classList.add('match-line');

  document.querySelector('.match-game')
    .appendChild(line);


  const leftRect =
    leftDot.getBoundingClientRect();

  const rightRect =
    rightDot.getBoundingClientRect();

  const parentRect =
    document.querySelector('.match-game')
      .getBoundingClientRect();


  const x1 =
    leftRect.left +
    leftRect.width / 2 -
    parentRect.left;

  const y1 =
    leftRect.top +
    leftRect.height / 2 -
    parentRect.top;

  const x2 =
    rightRect.left +
    rightRect.width / 2 -
    parentRect.left;

  const y2 =
    rightRect.top +
    rightRect.height / 2 -
    parentRect.top;


  const length =
    Math.sqrt(
      ((x2 - x1) ** 2) +
      ((y2 - y1) ** 2)
    );

  const angle =
    Math.atan2(
      y2 - y1,
      x2 - x1
    ) * 180 / Math.PI;


  line.style.width =
    `${length}px`;

  line.style.left =
    `${x1}px`;

  line.style.top =
    `${y1}px`;

  line.style.transform =
    `rotate(${angle}deg)`;

}


// =====================================
// CEK PASANGAN
// =====================================

function checkMatchGame2() {

  if (!selectedLeft || !selectedRight)
    return;


  // BENAR
  if (
    matchAnswers[selectedLeft] ===
    selectedRight
  ) {

    playCorrect();

    matchedCount++;

    score2 += 10;

    addScore(10);

    document.getElementById('score2')
      .innerText =
      score2;

    document.getElementById('feedback2')
      .innerText =
      '✅ Cocok! Hebat!';


    const leftDot =
      document.querySelector(
        `.left-dot[data-name="${selectedLeft}"]`
      );

    const rightDot =
      document.querySelector(
        `.right-dot[data-name="${selectedRight}"]`
      );


    // GARIS
    createLine(leftDot, rightDot);


    leftDot.classList.add('correct-dot');
    rightDot.classList.add('correct-dot');


    leftDot.style.pointerEvents =
      'none';

    rightDot.style.pointerEvents =
      'none';


    selectedLeft = null;
    selectedRight = null;


    document.querySelectorAll('.dot')
      .forEach((d) => {

        d.classList.remove('active-dot');

      });


    // SELESAI
    if (matchedCount === 6) {

      setTimeout(() => {

        showPage('game3');

      }, 1200);

    }

  }

  // SALAH
  else {

    playWrong();

    document.getElementById('feedback2')
      .innerText =
      '❌ Salah pasangan!';


    document.querySelectorAll('.dot')
      .forEach((d) => {

        d.classList.add('wrong-dot');

      });


    setTimeout(() => {

      selectedLeft = null;
      selectedRight = null;

      document.querySelectorAll('.dot')
        .forEach((d) => {

          d.classList.remove(
            'active-dot',
            'wrong-dot'
          );

        });

    }, 700);

  }

}


// =====================================
// GAME 3
// MEMORY GAME
// =====================================

const memoryItems = [

  '🍎',
  '🍎',

  '🥕',
  '🥕',

  '🍅',
  '🍅',

  '🌽',
  '🌽'

];

memoryItems.sort(() => Math.random() - 0.5);

const memoryGrid =
  document.getElementById('memoryGrid');

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matchedPairs = 0;

let score3 = 0;


// BUAT KARTU
memoryItems.forEach((emoji) => {

  const card =
    document.createElement('div');

  card.classList.add('memory-card');

  card.innerText = '❓';

  card.dataset.emoji = emoji;


  card.addEventListener('click', () => {

    if (lockBoard) return;

    if (card.innerText !== '❓') return;


    card.innerText = emoji;


    if (!firstCard) {

      firstCard = card;

      return;
    }


    secondCard = card;

    lockBoard = true;


    if (
      firstCard.dataset.emoji ===
      secondCard.dataset.emoji
    ) {

      playCorrect();

      score3 += 10;

      addScore(10);

      matchedPairs++;

      document.getElementById('score3')
        .innerText =
        score3;

      document.getElementById('feedback3')
        .innerText =
        '✅ Pasangan cocok!';


      firstCard = null;

      secondCard = null;

      lockBoard = false;


      if (matchedPairs === 4) {

        setTimeout(() => {

          showPage('game4');

        }, 1200);

      }

    }

    else {

      playWrong();

      document.getElementById('feedback3')
        .innerText =
        '❌ Belum cocok, coba lagi!';


      setTimeout(() => {

        firstCard.innerText = '❓';

        secondCard.innerText = '❓';

        firstCard = null;

        secondCard = null;

        lockBoard = false;

      }, 1000);

    }

  });

  memoryGrid.appendChild(card);

});


// =====================================
// GAME 4 - GARDEN SIMULATION SYSTEM
// =====================================

// DOM ELEMENTS
const soil = document.getElementById('soil');
const seedContainer = document.getElementById('seedContainer');
const plantContainer = document.getElementById('plantContainer');
const waterEffect = document.getElementById('waterEffect');
const basket = document.getElementById('basket');
const harvestFruits = document.getElementById('harvestFruits');
const sun = document.getElementById('sun');
const plantStem = document.getElementById('plantStem');
const plantFruit = document.getElementById('plantFruit');

const btnSoil = document.getElementById('btnSoil');
const btnSeed = document.getElementById('btnSeed');
const btnWater = document.getElementById('btnWater');
const btnSun = document.getElementById('btnSun');
const btnHarvest = document.getElementById('btnHarvest');

const seedOptions = document.getElementById('seedOptions');
const seedChoices = document.querySelectorAll('.seed-choice');

// PLANT DATA
const plantData = {
  stroberi: { fruit: '🍓', name: 'Stroberi' },
  wortel: { fruit: '🥕', name: 'Wortel' },
  jagung: { fruit: '🌽', name: 'Jagung' }
};

// GAME STATE
let game4Step = 0;
let score4 = 0;
let selectedPlant = null;
let harvestCount = 0;

// =====================================
// RESET GARDEN
// =====================================

function resetGarden() {
  game4Step = 0;
  score4 = 0;
  selectedPlant = null;
  harvestCount = 0;

  soil.classList.add('hidden');
  seedContainer.classList.add('hidden');
  plantContainer.classList.add('hidden');
  basket.classList.add('hidden');
  seedOptions.classList.add('hidden');
  sun.classList.add('hidden');
  harvestFruits.innerHTML = '';

  btnSoil.disabled = false;
  btnSeed.disabled = true;
  btnWater.disabled = true;
  btnSun.disabled = true;
  btnHarvest.disabled = true;

  document.getElementById('feedback4').innerText = '';
  document.getElementById('score4').innerText = '0';
}

// =====================================
// PREPARE SOIL
// =====================================

btnSoil.addEventListener('click', () => {
  if (game4Step !== 0) {
    playWrong();
    document.getElementById('feedback4').innerText = '❌ Ikuti urutan: Tanah → Bibit → Siram → Panas → Panen!';
    return;
  }

  playCorrect();

  soil.classList.remove('hidden');
  btnSoil.disabled = true;
  btnSeed.disabled = false;
  game4Step = 1;

  score4 += 10;
  addScore(10);
  document.getElementById('score4').innerText = score4;
  document.getElementById('feedback4').innerText = '🪴 Tanah berhasil disiapkan!';
});

// =====================================
// OPEN SEED SELECTION
// =====================================

btnSeed.addEventListener('click', () => {
  if (game4Step !== 1) {
    playWrong();
    document.getElementById('feedback4').innerText = '❌ Siapkan tanah dulu!';
    return;
  }

  playCorrect();
  seedOptions.classList.remove('hidden');
  document.getElementById('feedback4').innerText = '🌱 Pilih bibit yang ingin ditanam!';
});

// =====================================
// PLANT SEED
// =====================================

seedChoices.forEach((choice) => {
  choice.addEventListener('click', () => {
    selectedPlant = choice.dataset.plant;

    playCorrect();
    seedOptions.classList.add('hidden');

    // SET FRUIT EMOJI BASED ON PLANT TYPE
    plantFruit.textContent = plantData[selectedPlant].fruit;

    // SHOW SEED IN SOIL
    seedContainer.classList.remove('hidden');

    btnSeed.disabled = true;
    btnWater.disabled = false;
    game4Step = 2;

    score4 += 10;
    addScore(10);
    document.getElementById('score4').innerText = score4;
    document.getElementById('feedback4').innerText = '🫘 Bibit berhasil ditanam di dalam tanah!';
  });
});

// =====================================
// WATER PLANT
// =====================================

btnWater.addEventListener('click', () => {
  if (game4Step !== 2) {
    playWrong();
    document.getElementById('feedback4').innerText = '❌ Tanam bibit dulu!';
    return;
  }

  playCorrect();
  btnWater.disabled = true;
  document.getElementById('feedback4').innerText = '💧 Tanaman sedang disiram...';

  // HIDE SEED, SHOW SPROUTING PLANT & WATER EFFECT
  seedContainer.classList.add('hidden');
  plantContainer.classList.remove('hidden');
  waterEffect.classList.remove('hidden');

  // REMOVE WATER EFFECT AFTER ANIMATION
  setTimeout(() => {
    waterEffect.classList.add('hidden');

    btnSun.disabled = false;
    game4Step = 3;

    score4 += 10;
    addScore(10);
    document.getElementById('score4').innerText = score4;
    document.getElementById('feedback4').innerText = '🌱 Tanaman menyerap air dan mulai tumbuh!';
  }, 1500);
});

// =====================================
// SUN EXPOSURE (GROWTH)
// =====================================

btnSun.addEventListener('click', () => {
  if (game4Step !== 3) {
    playWrong();
    document.getElementById('feedback4').innerText = '❌ Siram tanaman dulu!';
    return;
  }

  playCorrect();

  // SHOW SUN AND TRIGGER GROWTH
  sun.classList.remove('hidden');
  sun.classList.add('active');

  // APPLY STEM GROWTH ANIMATION
  plantStem.style.animation = 'stemGrowMore 1.2s ease forwards';

  // MOVE FRUIT HIGHER AS PLANT GROWS
  plantFruit.style.animation = 'none';
  plantFruit.offsetHeight;
  plantFruit.style.animation = 'fruitGrow .8s ease forwards';

  btnSun.disabled = true;
  document.getElementById('feedback4').innerText = '☀️ Sinar matahari membuat tanaman tumbuh lebih tinggi!';

  // WAIT FOR GROWTH ANIMATION
  setTimeout(() => {
    sun.classList.remove('active');

    btnHarvest.disabled = false;
    game4Step = 4;

    score4 += 10;
    addScore(10);
    document.getElementById('score4').innerText = score4;
    document.getElementById('feedback4').innerText = '🌿 Tanaman tumbuh dengan sempurna dan siap dipanen!';
  }, 2200);
});

// =====================================
// HARVEST
// =====================================

btnHarvest.addEventListener('click', () => {
  if (game4Step !== 4) {
    playWrong();
    document.getElementById('feedback4').innerText = '❌ Berikan sinar matahari dulu!';
    return;
  }

  playCorrect();

  yeySound.currentTime = 0;
  yeySound.play();

  // HIDE PLANT, SHOW BASKET
  plantContainer.classList.add('hidden');
  basket.classList.remove('hidden');

  // ADD FRUIT TO BASKET
  const fruitEmoji = plantData[selectedPlant].fruit;
  const fruitDiv = document.createElement('div');
  fruitDiv.className = 'harvest-fruit-item';
  fruitDiv.textContent = fruitEmoji;
  harvestFruits.appendChild(fruitDiv);

  harvestCount++;
  btnHarvest.disabled = true;

  score4 += 10;
  addScore(10);
  document.getElementById('score4').innerText = score4;
  document.getElementById('feedback4').innerText = '🧺 Buah berhasil dipanen ke dalam keranjang!';

  // GAME COMPLETE
  setTimeout(() => {
    let stars = '⭐';

    if (totalScore >= 80) {
      stars = '⭐⭐⭐';
    } else if (totalScore >= 50) {
      stars = '⭐⭐';
    }

    document.querySelector('.stars').innerText = stars;
    document.getElementById('finalScore').innerText = totalScore;
    document.querySelector('.finish-box').style.display = 'block';
  }, 1200);
});