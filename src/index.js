let addToy = false;
const toyCollection = document.querySelector('#toy-collection');

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  document.querySelector("form").addEventListener("submit", addNewToy)
})

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    
    renderAllToys(data)
  })
}

function renderAllToys(toysArray) {
  return toysArray.forEach(toy => renderSingleToy(toy))
}

function renderSingleToy(toy) {
  let div = document.createElement("div")
  div.className = "card"
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
  `
  let p = document.createElement("p")
  p.innerText = toy.likes
  div.appendChild(p)
  let button = document.createElement("button")
  button.className = "like-btn"
  button.innerText = "Like <3"
  button.addEventListener('click', () => {
    addLike(toy, p)
  })
  div.appendChild(button)
  toyCollection.appendChild(div)
}

function addLike(toy, p) {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  })
  .then(response => response.json())
  .then(data => {
    toy.likes += 1
    p.innerText = toy.likes
  })
  console.log(toy)
  console.log(p)
}

function addNewToy(event) {
  event.preventDefault()
  const toy = {
    name: document.querySelector('input').value,
    image: document.querySelectorAll('input')[1].value,
    likes: 0
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => {
    renderSingleToy(data)
    document.querySelector('input').value = ""
    document.querySelectorAll('input')[1].value = ""
  })

}

