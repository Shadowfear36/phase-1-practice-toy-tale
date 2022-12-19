let addToy = false;
const url = "http://localhost:3000/toys"

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
})
});


function createToyCard(toy) {
  const getToyDiv = document.querySelector("#toy-collection")
  const createH2 = document.createElement('h2')
  const createImg = document.createElement('img')
  const createP = document.createElement('p')
  const createBtn = document.createElement('button')
  const createDiv = document.createElement('div')

      createDiv.appendChild(createH2)
      createDiv.classList.add("card")
      createDiv.appendChild(createH2);
      createDiv.dataset.toyId = toy.id;

      createH2.textContent = toy.name;

      createDiv.appendChild(createImg)
      createImg.src = `${toy.image}`;
      createImg.classList.add('toy-avatar')

      createDiv.appendChild(createP)
      createP.textContent = `${toy.likes}`
      createP.dataset.toyLikesId = toy.id
      

      createDiv.appendChild(createBtn)
      createBtn.textContent = "Like ❤️"
      createBtn.classList.add('like-btn')
     

      getToyDiv.appendChild(createDiv)

      createBtn.addEventListener("click", (e) => {
        console.log('you clicked like button')
        const toySelector = document.querySelector(`[data-toy-likes-id = "${toy.id}"]`)
        // console.log(toySelector);
        console.log("This toy has " + toy.likes + " likes")
        
        let parsedLikes = parseInt(toySelector.textContent, 10) 
        console.log(toySelector.textContent);
        // console.log(parsedLikes);

        toySelector.textContent = `${++parsedLikes}`;



        fetch(`${url}/${toy.id}`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }, body: JSON.stringify(
            {
              likes: ++toy.likes
            }
          )
        })
          .then(response => response.json())
          .then(console.log(`${url}/${toy.id}`))
          .catch(err => console.log(err));
      })

}

//fetch and display toys from database
fetch(url)
.then(response => response.json())
.then(data => { 
  // create each toyCard
  data.forEach(toy => {
    createToyCard(toy);
  })
})
.catch(error => console.log(error.message));


//get new toy form & inputs

let toyForm = document.querySelector('.add-toy-form');
let inputName = document.querySelector('input[name="name"]');
let inputUrl = document.querySelector('input[name="image"]');
toyForm.addEventListener('submit', e => {
  e.preventDefault();
  const newToy = {
    name: inputName.value,
    image: inputUrl.value,
    likes: 0
  }
  createToyCard(newToy);
  // post new toy to database
  fetch(url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
      
    })
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch(error => console.log(error));
  });
