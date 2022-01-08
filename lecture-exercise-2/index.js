document.getElementById("check_time_button").addEventListener("click", (event) => {checkTime(event), pluralizeWord(event)});

const resultDOM = document.getElementById("results");
let time = "";
let wordResult = "";

async function checkTime(event) {
    event.preventDefault();
    const results = await fetch("/api/gettime");
    const resultText = await results.text();
    time = resultText;
    concatResult();
}

async function pluralizeWord(event) {
    event.preventDefault();
    const results = await fetch("/api/pluralize?word=" + document.getElementById("wordInput").value);
    const resultText = await results.text();
    wordResult = resultText;
    concatResult();
}

function concatResult() {
    resultDOM.textContent = time + " " + wordResult;
}