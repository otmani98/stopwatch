let set_minutes;
let set_seconds;
let set_milli;
let record_number = 0;
let records = document.querySelector(".records");
let tbody = document.querySelector("tbody");
let limitedInterval;
let sp = document.getElementById("Smilli");
let sm = document.getElementById("Sseconds");
let sh = document.getElementById("Sminutes");
let button = document.getElementsByTagName("button")[1];
let stopButton = document.getElementsByTagName("button")[2];
let shadow = document.querySelector(".shadow");
let popupe = document.querySelector(".popup");
let clear = document.getElementById("clear");
let record = document.getElementById("record");

//set max of seconds & milliseconds & minutes then store these values in variables
document.addEventListener("input", function (e) {
  e.target.onmouseleave = function () {
    if (e.target.value < 10) {
      let value = parseInt(e.target.value);
      e.target.value = "0" + value;
    }
  };
  e.target.onblur = function () {
    if (e.target.value < 10) {
      let value = parseInt(e.target.value);
      e.target.value = "0" + value;
    }
  };
  if (e.target.id === "seconds") {
    if (e.target.value > 59) {
      e.target.value = 59;
    }
  }
  if (e.target.id === "milli") {
    if (e.target.value > 98) {
      e.target.value = 98;
    }
  }
  if (e.target.value.length > 2) {
    e.target.value = `${+e.target.value}`;
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

//
//this part for stopwatch (counter) logic
function counter(x = 10.101010101) {
  limitedInterval = setInterval(function () {
    let s = parseInt(sp.innerHTML);
    let m = parseInt(sm.innerHTML);
    let h = parseInt(sh.innerHTML);

    s++;
    sp.innerHTML = s;

    if (sp.innerHTML < 10) {
      sp.innerHTML = "0" + s;
    }
    if (sm.innerHTML < 10) {
      sm.innerHTML = "0" + m;
    }
    if (sh.innerHTML < 10) {
      sh.innerHTML = "0" + h;
    }

    //compare bettween set inputs and stopwatch values
    if (
      set_minutes !== undefined &&
      set_seconds !== undefined &&
      set_milli !== undefined
    ) {
      if (
        +set_minutes === +sh.innerHTML &&
        +set_seconds === +sm.innerHTML &&
        +set_milli === +sp.innerHTML
      ) {
        popup();
      }
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
  }, x);
}

// to start and pause stopwatch
button.onclick = function () {
  if (button.innerHTML === "start") {
    records.style.display = "block";
    counter();
    button.innerHTML = "pause";
  } else {
    clearInterval(limitedInterval);
    button.innerHTML = "start";
  }
};

// to stop stopwatch
stopButton.onclick = function () {
  clearInterval(limitedInterval);
  tbody.textContent = ``;
  record_number = 0;
  records.style.display = "none";
  sp.innerHTML = "00";
  sm.innerHTML = "00";
  sh.innerHTML = "00";
  button.innerHTML = "start";
};

//show popup
function popup() {
  button.click();
  shadow.style.height = `${document.body.clientHeight + 100}px`;
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

//clear set
clear.onclick = function () {
  set_minutes = undefined;
  set_seconds = undefined;
  set_milli = undefined;
  document.querySelectorAll("[type='number']").forEach((element) => {
    element.value = "";
  });
};

//record click to add records
record.onclick = function () {
  let ml;
  let sc;
  let mi;
  document.querySelectorAll("span").forEach((element) => {
    if (element.id === "Smilli") {
      ml = element.textContent;
    }
    if (element.id === "Sseconds") {
      sc = element.textContent;
    }
    if (element.id === "Sminutes") {
      mi = element.textContent;
    }
  });
  record_number++;
  tbody.innerHTML += `<tr>
  <td>${record_number < 10 ? "0" + record_number : record_number}</td>
  <td>${mi}:${sc}:${ml}</td>
  </tr>`;
};
