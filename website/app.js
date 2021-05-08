const form = document.querySelector('.app__form');
const icons = document.querySelectorAll('.entry__icon');

const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=4325b0926e2205f5251e74050f335794';

let knowledge = new Date();
let newknowledge =
  knowledge.getMonth() +
  knowledge.getDate() +
  knowledge.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(per) {
  per.preventDefault();
  const code = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getTemperature(apiURL, code, key)
    .then(function (dataUesr) {
      postData('/add', { date: newknowledge, temp: dataUesr.main.temp, content })
    }).then(function () {
      updateUI()
    })
  form.reset();
}

const getTemperature = async (apiURL, code, key) => {
  const res = await fetch(apiURL + code + key);
  try {
    const dataUesr = await res.json();
    return dataUesr;
  }
  catch (error) {
    console.log('error', error);
  }
}

const postData = async (url = "", data = {}) => {
  const postRequest = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ date: data.date, temp: data.temp, content: data.content })
  })

  try {
    const newData = await postRequest.json();
    return newData;
  }
  catch (error) {
    console.log('error', error);
  }
};

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    icons.forEach(icon => icon.style.opacity = '1');
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
