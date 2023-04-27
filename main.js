let minutes;
let set_seconds;
let set_milli;

//set max of seconds and milli and store the values of minutes & seconds & milli
document.addEventListener("click", function (e) {
  e.target.onmouseleave = function () {
    if (e.target.value === "") {
      e.target.value = "00";
    }
    if (e.target.value < 10) {
      let value = parseInt(e.target.value);
      e.target.value = "0" + value;
    }
  };
  e.target.onblur = function () {
    if (e.target.value === "") {
      e.target.value = "00";
    }
    if (e.target.value < 10) {
      let value = parseInt(e.target.value);
      e.target.value = "0" + value;
    }
  };
  if (e.target.id === "seconds" || e.target.id === "milli") {
    if (e.target.value > 59) {
      e.target.value = 59;
    }
  }
  if (e.target.id === "minutes") {
    set_minutes = e.target.value;
  }
  if (e.target.id === "seconds") {
    set_seconds = e.target.value;
  }
  if (e.target.id === "milli") {
    set_milli = e.target.value;
  }
});

//this part for stopwatch (counter) logic
let limitedInterval;
let sp = document.getElementById("Smilli");
let sm = document.getElementById("Sseconds");
let sh = document.getElementById("Sminutes");

function counter(x = 10.101010101) {
  limitedInterval = setInterval(function () {
    let s = parseInt(sp.innerHTML);
    let m = parseInt(sm.innerHTML);
    let h = parseInt(sh.innerHTML);

    s++;
    sp.innerHTML = s;

    if (sh === "99") {
      clearInterval(limitedInterval);
    }

    if (sp.innerHTML < 10) {
      sp.innerHTML = "0" + s;
    }
    if (sm.innerHTML < 10) {
      sm.innerHTML = "0" + m;
    }
    if (sh.innerHTML < 10) {
      sh.innerHTML = "0" + h;
    }

    if (sm.innerHTML === "59" && sp.innerHTML === "99") {
      sm.innerHTML = "00";
      sp.innerHTML = "00";
      h++;
      sh.innerHTML = h;
    }

    if (sp.innerHTML === "99") {
      sp.innerHTML = "00";
      m++;
      sm.innerHTML = m;
    }

    if (
      +set_minutes === +sh.innerHTML &&
      +set_seconds === +sm.innerHTML &&
      +set_milli === +sp.innerHTML
    ) {
      popup();
    }
  }, x);
}

// to start and pause stopwatch
let button = document.getElementsByTagName("button")[0];
button.onclick = function () {
  if (button.innerHTML === "start") {
    counter();
    button.innerHTML = "pause";
  } else {
    clearInterval(limitedInterval);
    button.innerHTML = "start";
  }
};

// to stop stopwatch
let stopButton = document.getElementsByTagName("button")[1];
stopButton.onclick = function () {
  clearInterval(limitedInterval);
  sp.innerHTML = "00";
  sm.innerHTML = "00";
  sh.innerHTML = "00";
  button.innerHTML = "start";
};

//show popup
let shadow = document.querySelector(".shadow");
let popupe = document.querySelector(".popup");
function popup() {
  button.click();
  shadow.style.display = "block";
  popupe.style.display = "flex";
  let audio = new Audio("./voice.mp3");
  audio.play();
}

//exit popup
document.addEventListener("click", function (e) {
  if (e.target.id === "exit") {
    shadow.style.display = "none";
    popupe.style.display = "none";
  }
});
