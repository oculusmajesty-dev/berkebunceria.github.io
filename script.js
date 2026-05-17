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

bgMusic.volume = 0.15;


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

  updatePageVoice(pageId);
}

function getSpeechVoice() {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const exactIdVoices = voices.filter((voice) =>
    voice.lang && voice.lang.toLowerCase() === 'id-id'
  );
  if (exactIdVoices.length) return exactIdVoices[0];

  const idVoices = voices.filter((voice) => {
    const lang = voice.lang ? voice.lang.toLowerCase() : '';
    const name = voice.name ? voice.name.toLowerCase() : '';
    return lang.includes('id') || name.includes('id');
  });
  if (idVoices.length) return idVoices[0];

  return voices[0];
}

function speakText(text) {
  if (!window.speechSynthesis) return;

  // KECILKAN BACKGROUND MUSIC
  bgMusic.volume = 0.03;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = 'id-ID';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.voice = getSpeechVoice();

  // SETELAH SUARA SELESAI, BALIKKAN VOLUME MUSIC
  utterance.onend = () => {
    bgMusic.volume = 0.15;
  };

  window.speechSynthesis.speak(utterance);
}

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

function updatePageVoice(pageId) {
  if (pageId === 'game1') {
    if (colorQuestions[currentColorQuestion]) {
      setGame1Instruction(colorQuestions[currentColorQuestion]);
      speakText(document.getElementById('game1Instruction').innerText);
    }
  } else if (pageId === 'game2') {
    setGame2Instruction();
    speakText(document.getElementById('game2Instruction').innerText);
  } else if (pageId === 'game3') {
    setGame3Instruction();
    speakText(document.getElementById('game3Instruction').innerText);
  } else if (pageId === 'game4') {
    setGame4Instruction();
    speakText(document.getElementById('game4Instruction').innerText);
  }
}

function setGame1Instruction(data) {
  const subject = data.name || 'objek';
  const choices = data.choices.join(', ');
  const instruction = `Lihat gambar ini. Ya, ini adalah ${subject}. Apa warna ${subject}? Pilihan: ${choices}.`;
  document.getElementById('game1Instruction').innerText = instruction;
}

function setGame2Instruction() {
  const instruction = 'Lihat gambar di kiri dan bayangan di kanan. Klik titik kiri lalu titik kanan yang cocok untuk menemukan pasangan yang benar.';
  document.getElementById('game2Instruction').innerText = instruction;
}

function setGame3Instruction() {
  const instruction = 'Buka kotak dan cari dua gambar yang sama. Jika cocok, kotak akan tetap terbuka. Ayo cari semua pasangannya!';
  document.getElementById('game3Instruction').innerText = instruction;
}

function setGame4Instruction() {
  let instruction = 'Ikuti urutan berkebun: siapkan tanah, pilih bibit, siram, panaskan, lalu panen.';
  if (game4Step === 1) {
    instruction = 'Tanah sudah siap. Sekarang pilih bibit yang ingin kamu tanam.';
  } else if (game4Step === 2) {
    instruction = 'Bibit sudah ditanam. Saatnya siram tanaman agar tumbuh.';
  } else if (game4Step === 3) {
    instruction = 'Tanaman sudah disiram. Berikan sinar matahari agar tumbuh lebih besar.';
  } else if (game4Step === 4) {
    instruction = 'Tanaman sudah matang! Klik panen untuk mengambil hasilnya.';
  }
  document.getElementById('game4Instruction').innerText = instruction;
}

function replayInstruction(pageId) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  if (pageId === 'game1') {
    speakText(document.getElementById('game1Instruction').innerText);
  } else if (pageId === 'game2') {
    speakText(document.getElementById('game2Instruction').innerText);
  } else if (pageId === 'game3') {
    speakText(document.getElementById('game3Instruction').innerText);
  } else if (pageId === 'game4') {
    speakText(document.getElementById('game4Instruction').innerText);
  }
}


// =====================================
// SOUND EFFECT
// =====================================

function playCorrect() {
  correctSound.currentTime = 0;
  correctSound.volume = 0.3;
  correctSound.play();
}

function playWrong() {
  wrongSound.currentTime = 0;
  wrongSound.volume = 0.2;
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

    name:
      'apel',

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

    name:
      'stroberi',

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

    name:
      'wortel',

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

    name:
      'terong',

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

    name:
      'bunga matahari',

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

    name:
      'brokoli',

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

  // INSTRUCTION TEXT
  setGame1Instruction(data);

  // CHOICES
  renderChoices(data);

  if (document.getElementById('game1').classList.contains('active')) {
    speakText(document.getElementById('game1Instruction').innerText);
  }
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

    const correctText = `✅ Benar! ${answer} adalah warna yang tepat.`;
    document.getElementById('feedback1')
      .innerText =
      correctText;
    speakText(`Benar! ${answer} adalah warna yang tepat.`);

    score1 += 10;

    addScore(10);

    document.getElementById('score1')
      .innerText =
      score1;

    setTimeout(() => {

      document.getElementById('feedback1')
        .innerText = '';

      if (currentColorQuestion < colorQuestions.length - 1) {
        currentColorQuestion++;
        loadColorQuestion();
      } else {
        showPage('game2');
      }

    }, 1200);

  }

  // SALAH
  else{

    playWrong();

    const wrongText = '❌ Oops, coba lagi!';
    document.getElementById('feedback1')
      .innerText =
      wrongText;
    speakText('Oops, coba lagi!');

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

const finishTitle = document.getElementById('finishTitle');
const finishText = document.getElementById('finishText');
const harvestImage = document.getElementById('harvestImage');
const saveHarvest = document.getElementById('saveHarvest');

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
  plantContainer.classList.remove('enlarged');
  plantStem.classList.remove('grown');
  plantFruit.classList.remove('grown');
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
  setGame4Instruction();
  speakText('Tanah berhasil disiapkan. Sekarang pilih bibit yang ingin kamu tanam.');
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
    setGame4Instruction();
    speakText('Bibit telah ditanam. Sekarang sirami tanaman agar tumbuh.');
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
  plantContainer.classList.add('enlarged');
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
    setGame4Instruction();
    speakText('Tanaman telah disiram dan mulai tumbuh. Sekarang berikan sinar matahari.');
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
  plantStem.classList.add('grown');
  plantFruit.classList.add('grown');

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
    setGame4Instruction();
    speakText('Tanaman sudah tumbuh lebih besar dan siap untuk dipanen. Klik tombol panen!');
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
    const plantName = selectedPlant ? plantData[selectedPlant].name : 'tanaman';
    const fruitEmoji = selectedPlant ? plantData[selectedPlant].fruit : '🌿';

    finishTitle.innerText = `🎉 Selamat! Kamu berhasil memanen ${plantName}!`;
    harvestImage.textContent = fruitEmoji;
    finishText.innerText = `Kamu merawat ${plantName} dengan baik dan mendapatkan hasil panen yang segar.`;

    let stars = '⭐';
    if (totalScore >= 80) {
      stars = '⭐⭐⭐';
    } else if (totalScore >= 50) {
      stars = '⭐⭐';
    }

    document.querySelector('.stars').innerText = stars;
    document.getElementById('finalScore').innerText = totalScore;
    document.querySelector('.finish-box').style.display = 'block';
    speakText(`Selamat! Kamu berhasil memanen ${plantName}.`);
  }, 1200);
});

saveHarvest.addEventListener('click', () => {
  saveHarvest.disabled = true;
  saveHarvest.innerText = 'Berhasil Tersimpan ✅';
  finishText.innerText =
    'Hasil panenmu sudah berhasil disimpan!';

  finishText.classList.add('saved');
  speakText(
    'Hasil panenmu sudah berhasil disimpan.'
  );
  setTimeout(() => {

    // TUTUP POPUP
    document.querySelector('.finish-box')
      .style.display = 'none';

    // TAMPILKAN HASIL AKHIR
    const finalResultBox =
      document.getElementById('finalResultBox');
    finalResultBox.classList.remove('hidden');
    document.getElementById('finalTotalScore')
      .innerText = totalScore;
  }, 1800);
});

const navNextButtons = document.querySelectorAll('.nav-next');
const navBackButtons = document.querySelectorAll('.nav-back');

navNextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const page = button.closest('.page');
    if (!page) return;
    const currentId = page.id;
    if (currentId === 'game1') {
      if (currentColorQuestion < colorQuestions.length - 1) {
        currentColorQuestion++;
        loadColorQuestion();
      } else {
        showPage('game2');
      }
    } else if (currentId === 'game2') showPage('game3');
    else if (currentId === 'game3') showPage('game4');
    else if (currentId === 'game4') showPage('game1');
  });
});

navBackButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const page = button.closest('.page');
    if (!page) return;
    const currentId = page.id;
    if (currentId === 'game1') {
      if (currentColorQuestion > 0) {
        currentColorQuestion--;
        loadColorQuestion();
      } else {
        showPage('home');
      }
    } else if (currentId === 'game2') showPage('game1');
    else if (currentId === 'game3') showPage('game2');
    else if (currentId === 'game4') showPage('game3');
  });
});

const replayButtons = [
  { id: 'replayGame1', page: 'game1' },
  { id: 'replayGame2', page: 'game2' },
  { id: 'replayGame3', page: 'game3' },
  { id: 'replayGame4', page: 'game4' }
];

replayButtons.forEach(({ id, page }) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('click', () => replayInstruction(page));
  }
});
