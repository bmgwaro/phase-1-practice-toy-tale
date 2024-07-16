let addToy = false;

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


document.addEventListener('DOMContentLoaded', () => {
  fetchToys();

  const toyForm = document.querySelector('.add-toy-form');
  toyForm.addEventListener('submit', handleToyFormSubmit);
});

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => renderToy(toy));
    });
}

function renderToy(toy) {
  const toyCollection = document.getElementById('toy-collection');

  const card = document.createElement('div');
  card.classList.add('card');

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.classList.add('toy-avatar');

  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`;

  const likeBtn = document.createElement('button');
  likeBtn.classList.add('like-btn');
  likeBtn.setAttribute('id', toy.id);
  likeBtn.textContent = 'Like ❤️';
  likeBtn.addEventListener('click', () => handleLike(toy));

  card.append(h2, img, p, likeBtn);
  toyCollection.appendChild(card);
}

function handleToyFormSubmit(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const image = event.target.image.value;
  const likes = 0; // Initial likes for a new toy

  const newToy = {
    name: name,
    image: image,
    likes: likes
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
    .then(response => response.json())
    .then(toy => renderToy(toy));

  event.target.reset();
}

function handleLike(toy) {
  const newLikes = toy.likes + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      likes: newLikes
    })
  })
    .then(response => response.json())
    .then(updatedToy => {
      const toyCard = document.getElementById(updatedToy.id);
      const likeParagraph = toyCard.querySelector('p');
      likeParagraph.textContent = `${updatedToy.likes} Likes`;
    });
}