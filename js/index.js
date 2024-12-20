//create loadChategories
const loadChategories = () => {
  // console.log("loadChategories");
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => DisplayChategories(data.categories))
    .catch((err) => console.log(err));
};
const loadAllPets = () => {
  document.getElementById("spinner").style.display = "block";
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      setTimeout(function () {
        displayAllPets(data.pets);
      }, 2000);
      document.getElementById("sortByPrice").addEventListener("click", () => {
        document.getElementById("spinner").style.display = "block";
        const sortedPets = data.pets.sort(function (a, b) {
          return b.price - a.price;
        });
        setTimeout(function () {
          displayAllPets(sortedPets);
        }, 2000);
      });
    })
    .catch((err) => console.log(err));
};
const displayAllPets = (pets) => {
  // console.log(pets);

  document.getElementById("spinner").style.display = "none";
  const allPetCointainer = document.getElementById("all-pet");
  allPetCointainer.innerHTML = "";
  if (pets.length == 0) {
    allPetCointainer.classList.remove("grid");
    allPetCointainer.innerHTML = `
    <div class="min-h-[300px] w-full my-5  flex flex-col gap-5 justify-center items-center">
    <img src="images/error.webp"/>
    <h1 class="text-2xl font-bold">No Information Available</h1>
    <p class="text-center mb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using  is that it has a.</p>
    </div>
    
    `;
    return;
  } else {
    allPetCointainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    // console.log(pet);
    const card = document.createElement("div");
    card.classList = "card card-compact p-5 border";
    card.innerHTML = `
     <figure class="h-[200px]">
    <img
      src=${pet.image}
      class="h-full w-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="px-0">
    <h2 class="py-2 font-bold">${pet.pet_name}</h2>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="images/Frame.png"/>
<p class='pt-3'>${
      pet?.breed ||
      "<span class='text-red-500'>No Breed information available</span>"
    }</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=80&id=fXgL1AuZbbYX&format=png"/>
    <p>Birth: ${
      pet?.date_of_birth || "<span class='text-red-700'> Not available</span>"
    }</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=80&id=10mr4J5qCaFA&format=png"/>
    <p>${pet.gender}</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=26&id=58437&format=png"/>
     <p>Price ${
       pet?.price || "<span class='text-red-700'> Not available</span>"
     }</p>
   </div>
   <div class="divider"></div>
    <div class=" flex justify-center items-center gap-3">
    <img onclick="likePress(${
      pet.petId
    })" class="size-12 border rounded-lg p-3" src="https://img.icons8.com/?size=50&id=33479&format=png" />
      <button  class="btn text-[#0e7a81]">Adopt</button>
      <button onclick="loadDetails(${
        pet.petId
      })" class="btn text-[#0e7a81] ">Details</button>
    </div>
  </div>
    `;
    allPetCointainer.appendChild(card);
  });
};
const likePress = async (petId) => {
  console.log("hlw");
  console.log(petId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  displayLike(data.petData);
};
const displayLike = (like) => {
  const likeCointainer = document.getElementById("like-cointainer");
  const createImage = document.createElement("div");
  createImage.innerHTML = `
  <img src="${like.image}"/>
  `;
  likeCointainer.appendChild(createImage);
};
// document.getElementById("sortByPrice").addEventListener("click", () => {
//   const sortByPrice = (data) => {
//     console.log(data);
//   };
// });

// category: "Cat";
// category_icon: "https://i.ibb.co.com/N7dM2K1/cat.png";
// id: 1;
//
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // console.log(button);
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// details button a click
const loadDetails = async (petId) => {
  console.log(petId);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  displayDEtails(data.petData);
};
const displayDEtails = (petData) => {
  console.log(petData);
  const detailsModul = document.getElementById("modul-content");
  detailsModul.innerHTML = `
<div class="flex justify-center">
<img class="border rounded-xl" src="${petData.image}" />
</div>
<div class="">
 <h2 class="py-2 font-bold">${petData.pet_name}</h2>
<div class="flex">
<img class="size-6" src="images/Frame.png"/>
<p>${petData.breed}</p>
</div>
 <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=80&id=fXgL1AuZbbYX&format=png"/>
    <p>Birth: ${petData.date_of_birth}</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=80&id=10mr4J5qCaFA&format=png"/>
    <p>${petData.gender}</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="https://img.icons8.com/?size=26&id=58437&format=png"/>
    <p>price:${petData.price}</p>
   </div>
    <div class="flex items-center gap-2 mb-3">
    <img class="size-6" src="images/Frame (1).png"/>
    <p>vaccinated_status:${petData.vaccinated_status}</p>
   </div>

   <div class="divider"></div>
   <div>
   <h1 class="font-bold">pet_details</h1>
   <p>${petData.pet_details}</p>
   </div>
</div>
  `;

  // document.getElementById("showModulData").click();
  document.getElementById("customModul").showModal();
};

// button a press korle ai function a asbe
const loadCatagoryPets = (category) => {
  console.log(category);
  document.getElementById("spinner").style.display = "block";
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      // sob btn ar active class remove korbo
      removeActiveClass();
      // id ar class k active korbo
      const activeBtn = document.getElementById(`btn-${category}`);
      // console.log(activeBtn);
      // css style add kora hoiche active class diya
      activeBtn.classList.add("active");
      setTimeout(function () {
        displayAllPets(data.data);
      }, 2000);
      // cars a dekhanor jonno jabe
      // ki ki dekhaba card a ta bola ace
    })
    .catch((err) => console.log(err));
};

//create DisplayChategories
const DisplayChategories = (categories) => {
  console.log(categories);
  const categoriesCointainer = document.getElementById(
    "categoryies-cointainer"
  );
  categories.forEach((item) => {
    console.log(item);
    // cerate a button
    const buttonCointainer = document.createElement("div");
    buttonCointainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadCatagoryPets('${item.category}')" class="btn category-btn">
    <img class="size-6" src="${item.category_icon}"/>
    ${item.category}
    </button>
    `;
    // createbutton.classList = "btn btn-error";
    // createbutton.innerHTML = `
    // <img class="size-6" src="${item.category_icon}"/>
    // <h1>${item.category}</h1>
    // `;
    // createbutton.onclick = alert("hello");
    // createbutton.innerText = item.category_icon;
    categoriesCointainer.append(buttonCointainer);
  });
};

loadChategories();
loadAllPets();
