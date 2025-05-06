let currentStep = 1;
let countdownActive = false;
let keyGenerated = false;

function nextStep() {
  const current = document.getElementById(`step${currentStep}`);
  const next = document.getElementById(`step${currentStep + 1}`);
  if (current && next) {
    current.classList.add("hidden");
    next.classList.remove("hidden");
    currentStep++;
    countdownActive = false;
  }
}

function startCountdown(type) {
  if (countdownActive) return;
  countdownActive = true;

  let time = 0;
  let displayId = "";
  let btnId = "";

  switch (type) {
    case "video":
      displayId = "videoTimer";
      btnId = "videoNext";
      time = 30;
      break;
    case "site":
      displayId = "siteTimer";
      btnId = "siteNext";
      time = 30;
      break;
    case "subscribe":
      displayId = "subscribeTimer";
      btnId = "subscribeNext";
      time = 10;
      break;
    case "download":
      displayId = "downloadTimer";
      btnId = "downloadNext";
      time = 10;
      break;
  }

  const display = document.getElementById(displayId);
  const continueBtn = document.getElementById(btnId);

  display.textContent = time;
  continueBtn.classList.add("hidden");

  const interval = setInterval(() => {
    time--;
    display.textContent = time;
    if (time <= 0) {
      clearInterval(interval);
      continueBtn.classList.remove("hidden");
      countdownActive = false;
    }
  }, 1000);
}


function getKey() {
    if (keyGenerated) return;
  
    keyGenerated = true;
  
    const btn = document.querySelector(".getkey-btn");
    btn.disabled = true;
    btn.innerText = "Key Generated";
  
    fetch("https://raw.githubusercontent.com/DroomerTeamReal/keys/refs/heads/main/keys")
      .then(res => res.text())
      .then(data => {
        const keys = data.trim().split("\n");
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        document.getElementById("keyResult").innerText = "Your key: " + randomKey;
      })
      .catch(err => {
        document.getElementById("keyResult").innerText = "Failed to load key.";
        console.error(err);
      });
  }