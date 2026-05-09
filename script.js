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


// =====================================
// START GAME
// =====================================

function startGame() {

  bgMusic.play();

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
      'assets/gambar/carrot_766022.png',

    question:
      'Apa warna wortel?',

    answer:
      'Oranye',

    choices: [
      'Hijau',
      'Oranye',
      'Biru'
    ]
  }

];

let currentColorQuestion = 0;

let score1 = 0;


// LOAD QUESTION
function loadColorQuestion() {

  const data =
    colorQuestions[currentColorQuestion];

  document.getElementById('colorImage').src =
    data.image;

  document.getElementById('colorQuestion')
    .innerText =
    data.question;

  const choicesContainer =
    document.getElementById('colorChoices');

  choicesContainer.innerHTML = '';


  data.choices.forEach((choice) => {

    const button =
      document.createElement('button');

    button.innerText = choice;


    button.onclick = () => {

      // BENAR
      if (choice === data.answer) {

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
          if (
            currentColorQuestion <
            colorQuestions.length
          ) {

            loadColorQuestion();

          }

          // FINISH GAME 1
          else {

            alert('🎉 Game 1 selesai!');

            showPage('game2');
          }

        }, 1200);

      }

      // SALAH
      else {

        playWrong();

        document.getElementById('feedback1')
          .innerText =
          '❌ Salah, coba lagi!';
      }

    };

    choicesContainer.appendChild(button);

  });

}

loadColorQuestion();


// =====================================
// GAME 2
// =====================================

let selectedLeft = null;
let selectedRight = null;

let matchedCount = 0;
let score2 = 0;


// JAWABAN
const matchAnswers = {

  apple: 'apple',
  strawberry: 'strawberry',
  carrot: 'carrot'

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
    if (matchedCount === 3) {

      setTimeout(() => {

        alert('🎉 Game 2 selesai!');

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

          alert('🎉 Game 3 selesai!');

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
// GAME 4 NEW GARDEN SYSTEM
// =====================================

const soil =
  document.getElementById('soil');

const seedArea =
  document.getElementById('seedArea');

const waterEffect =
  document.getElementById('waterEffect');

const plant =
  document.getElementById('plant');

const harvestResult =
  document.getElementById('harvestResult');

const harvestFruit =
  document.getElementById('harvestFruit');

const harvestText =
  document.getElementById('harvestText');

const closeHarvest =
  document.getElementById('closeHarvest');

const btnSoil =
  document.getElementById('btnSoil');

const btnSeed =
  document.getElementById('btnSeed');

const btnWater =
  document.getElementById('btnWater');

const btnHarvest =
  document.getElementById('btnHarvest');

const seedOptions =
  document.getElementById('seedOptions');

const seedChoices =
  document.querySelectorAll('.seed-choice');

let game4Step = 0;

let score4 = 0;

let selectedPlant = null;


// =====================================
// DATA TANAMAN
// =====================================

const plantData = {

  stroberi: {

    fruit: '🍓',

    seed:
      `
      <div class="seed-row">
        🫘 🫘 🫘
      </div>
      `,

    sprout:
      `
      <div class="sprout-row">
        🌱 🌱 🌱
      </div>
      `,

    text:
      'Selamat kamu berhasil memanen buah stroberi 🍓'

  },

  wortel: {

    fruit: '🥕',

    seed:
      `
      <div class="seed-row">
        🫘 🫘 🫘
      </div>
      `,

    sprout:
      `
      <div class="sprout-row">
        🌱 🌱 🌱
      </div>
      `,

    text:
      'Selamat kamu berhasil memanen wortel 🥕'

  },

  jagung: {

    fruit: '🌽',

    seed:
      `
      <div class="seed-row">
        🫘 🫘 🫘
      </div>
      `,

    sprout:
      `
      <div class="sprout-row">
        🌱 🌱 🌱
      </div>
      `,

    text:
      'Selamat kamu berhasil memanen jagung 🌽'

  }

};


// =====================================
// PILIH TANAH
// =====================================

btnSoil.addEventListener('click', () => {

  if (game4Step !== 0) {

    playWrong();

    document.getElementById('feedback4')
      .innerText =
      '❌ Pilih sesuai urutan ya!';

    return;
  }

  playCorrect();

  soil.classList.remove('hidden');

  btnSoil.disabled = true;

  btnSeed.disabled = false;

  game4Step = 1;

  score4 += 10;

  addScore(10);

  document.getElementById('score4')
    .innerText =
    score4;

  document.getElementById('feedback4')
    .innerText =
    '🪴 Tanah berhasil disiapkan!';

});


// =====================================
// BUKA POPUP PILIH BIBIT
// =====================================

btnSeed.addEventListener('click', () => {

  if (game4Step !== 1) {

    playWrong();

    document.getElementById('feedback4')
      .innerText =
      '❌ Siapkan tanah dulu!';

    return;
  }

  playCorrect();

  // TAMPILKAN POPUP PILIHAN
  seedOptions.classList.remove('hidden');

  document.getElementById('feedback4')
    .innerText =
    '🌱 Pilih bibit lalu tanam ke tanah!';

});


// =====================================
// PILIH BIBIT
// =====================================

seedChoices.forEach((choice) => {

  choice.addEventListener('click', () => {

    selectedPlant =
      choice.dataset.plant;

    const selectedData =
      plantData[selectedPlant];

    playCorrect();

    // TUTUP POPUP
    seedOptions.classList.add('hidden');

    // MASUKKAN BIJI
    seedArea.innerHTML =
      selectedData.seed;

    seedArea.classList.remove('hidden');

    // RESET ANIMASI
    seedArea.style.animation =
      'none';

    seedArea.offsetHeight;

    // ANIMASI TANAM
    seedArea.style.animation =
      'seedPlant .9s ease';

    btnSeed.disabled = true;

    btnWater.disabled = false;

    game4Step = 2;

    score4 += 10;

    addScore(10);

    document.getElementById('score4')
      .innerText =
      score4;

    document.getElementById('feedback4')
      .innerText =
      '🫘 Bibit berhasil ditanam di tanah!';

  });

});


// =====================================
// SIRAM TANAMAN
// =====================================

btnWater.addEventListener('click', () => {

  if (game4Step !== 2) {

    playWrong();

    document.getElementById('feedback4')
      .innerText =
      '❌ Tanam bibit dulu!';

    return;
  }

  playCorrect();

  waterEffect.classList.remove('hidden');

  btnWater.disabled = true;

  document.getElementById('feedback4')
    .innerText =
    '💧 Tanaman sedang disiram...';


  setTimeout(() => {

    waterEffect.classList.add('hidden');

    // TUNAS MUNCUL
    seedArea.innerHTML =
      plantData[selectedPlant].sprout;

    seedArea.style.animation =
      'none';

    seedArea.offsetHeight;

    seedArea.style.animation =
      'growPlant .8s ease';

    btnHarvest.disabled = false;

    game4Step = 3;

    score4 += 10;

    addScore(10);

    document.getElementById('score4')
      .innerText =
      score4;

    document.getElementById('feedback4')
      .innerText =
      '🌱 Tanaman mulai tumbuh!';

  }, 1800);

});


// =====================================
// PANEN
// =====================================

btnHarvest.addEventListener('click', () => {

  if (game4Step !== 3) {

    playWrong();

    document.getElementById('feedback4')
      .innerText =
      '❌ Siram tanaman dulu!';

    return;
  }

  playCorrect();

  yeySound.currentTime = 0;
  yeySound.play();

  btnHarvest.disabled = true;

  const result =
    plantData[selectedPlant];

  // HILANGKAN TUNAS
  seedArea.classList.add('hidden');

  // TAMPILKAN HASIL PANEN
  plant.classList.remove('hidden');

  plant.innerHTML =
    result.fruit;

  // RESET ANIMASI
  plant.style.animation =
    'none';

  plant.offsetHeight;

  plant.style.animation =
    'growPlant .7s ease';

  // POPUP HASIL
  harvestFruit.innerHTML =
    result.fruit;

  harvestText.innerHTML =
    result.text;

  harvestResult.classList.remove('hidden');

  score4 += 10;

  addScore(10);

  document.getElementById('score4')
    .innerText =
    score4;

  document.getElementById('feedback4')
    .innerText =
    '🏆 Hebat! Kamu berhasil panen!';


  setTimeout(() => {

    let stars = '⭐';

    if (totalScore >= 80) {

      stars = '⭐⭐⭐';

    }

    else if (totalScore >= 50) {

      stars = '⭐⭐';

    }

    document.querySelector('.stars')
      .innerText =
      stars;

    document.getElementById('finalScore')
      .innerText =
      totalScore;

    document.querySelector('.finish-box')
      .style.display =
      'block';

  }, 1200);

});


// =====================================
// TUTUP POPUP PANEN
// =====================================

closeHarvest.addEventListener('click', () => {

  harvestResult.classList.add('hidden');

});