/* =========================
   LANGUAGE TOGGLE
========================= */

let isSinhala = false;

function toggleLanguage(){

  if(!isSinhala){

    document.getElementById("nav-home").innerHTML = "මුල් පිටුව";
    document.getElementById("nav-about").innerHTML = "අප ගැන";
    document.getElementById("nav-services").innerHTML = "සේවාවන්";
    document.getElementById("nav-projects").innerHTML = "ව්‍යාපෘති";
    document.getElementById("nav-contact").innerHTML = "සම්බන්ධ වන්න";

    document.getElementById("hero-title").innerHTML =
    "සූර්ය බලශක්තිය සමඟ ඔබගේ අනාගතය ශක්තිමත් කරන්න";

    document.getElementById("hero-text").innerHTML =
    "වෘත්තීය සූර්ය පැනල් ස්ථාපන සේවා.";

    document.getElementById("hero-btn").innerHTML = "අප හා සම්බන්ධ වන්න";
    document.getElementById("hero-btn-2").innerHTML = "ව්‍යාපෘති";

    document.getElementById("lang-btn").innerHTML = "English";

    isSinhala = true;

  } else {

    document.getElementById("nav-home").innerHTML = "Home";
    document.getElementById("nav-about").innerHTML = "About";
    document.getElementById("nav-services").innerHTML = "Services";
    document.getElementById("nav-projects").innerHTML = "Projects";
    document.getElementById("nav-contact").innerHTML = "Contact";

    document.getElementById("hero-title").innerHTML =
    "Power Your Future With Solar Energy";

    document.getElementById("hero-text").innerHTML =
    "Professional solar panel installation.";

    document.getElementById("hero-btn").innerHTML = "Contact us";
    document.getElementById("hero-btn-2").innerHTML = "Our Projects";

    document.getElementById("lang-btn").innerHTML = "සිංහල";

    isSinhala = false;
  }
}


/* =========================
   COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCounter = () => {

    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 100;

    if(current < target){
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCounter();
});


/* =========================
   COMMENTS SYSTEM
========================= */

let selectedRating = 5;

function setRating(rating){
  selectedRating = rating;

  document.querySelectorAll(".rating span").forEach((star, index) => {
    star.style.color = index < rating ? "#ffd700" : "#555";
  });
}


/* ADD COMMENT */
function addComment(){

  const name = document.getElementById("name").value;
  const email = document.getElementById("email")?.value || "";
  const message = document.getElementById("message").value;
  const file = document.getElementById("image").files[0];

  if(name === "" || message === ""){
    alert("Fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(){

    const autoImage =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00d4ff&color=fff&size=128`;

    const image = file ? reader.result : autoImage;

    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    comments.push({
      name,
      email,
      message,
      image,
      rating: selectedRating,
      likes: 0
    });

    localStorage.setItem("comments", JSON.stringify(comments));

    document.getElementById("name").value = "";
    if(document.getElementById("email")) document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    document.getElementById("image").value = "";

    loadComments();
  };

  if(file){
    reader.readAsDataURL(file);
  } else {
    reader.onload();
  }
}


/* LOAD COMMENTS */
function loadComments(){

  const data = JSON.parse(localStorage.getItem("comments")) || [];
  const carousel = document.getElementById("carousel");

  carousel.innerHTML = "";

  let totalRating = 0;

  data.forEach((c, index) => {

    totalRating += c.rating;

    const div = document.createElement("div");
    div.classList.add("testimonial-slide");

    div.innerHTML = `
      <img src="${c.image}" class="user-img">

      <h3>${c.name}</h3>
      ${c.email ? `<small>${c.email}</small>` : ""}

      <p>"${c.message}"</p>

      <div>⭐ ${c.rating}/5</div>

      <button onclick="likeComment(${index})">
        ❤️ ${c.likes}
      </button>

      ${isAdmin ? `
        <button class="delete-btn" onclick="deleteComment(${index})">
          🗑 Delete
        </button>
      ` : ""}
    `;

    carousel.appendChild(div);
  });

  showSlide(0);
  updateAverageRating(totalRating, data.length);
}


/* LIKE */
function likeComment(index){

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  comments[index].likes++;

  localStorage.setItem("comments", JSON.stringify(comments));

  loadComments();
}


/* =========================
   SLIDER
========================= */

let currentSlide = 0;

function showSlide(index){

  const slides = document.querySelectorAll(".testimonial-slide");

  if(slides.length === 0) return;

  slides.forEach(s => s.style.display = "none");

  if(index >= slides.length) index = 0;
  if(index < 0) index = slides.length - 1;

  currentSlide = index;
  slides[currentSlide].style.display = "block";
}

function changeSlide(dir){

  const slides = document.querySelectorAll(".testimonial-slide");

  if(slides.length === 0) return;

  currentSlide += dir;

  if(currentSlide >= slides.length) currentSlide = 0;
  if(currentSlide < 0) currentSlide = slides.length - 1;

  showSlide(currentSlide);
}


/* =========================
   AVERAGE RATING
========================= */

function updateAverageRating(total, count){

  const avg = count ? (total / count).toFixed(1) : 0;

  const avgEl = document.getElementById("avgRating");
  const totalEl = document.getElementById("totalReviews");

  if(avgEl) avgEl.innerText = avg + " ★";
  if(totalEl) totalEl.innerText = count + " Reviews";
}


/* =========================
   ADMIN SYSTEM
========================= */

let isAdmin = false;
const ADMIN_PASSWORD = "1234";

function loginAdmin(){

  const pass = document.getElementById("adminPass").value;

  if(pass === ADMIN_PASSWORD){

    isAdmin = true;

    document.getElementById("adminStatus").innerText = "Admin Mode Enabled";

    alert("Welcome Admin!");

    loadComments(); // IMPORTANT FIX

  } else {
    alert("Wrong Password");
  }
}


/* DELETE COMMENT (ADMIN ONLY) */
function deleteComment(index){

  if(!isAdmin){
    alert("Only admin can delete comments!");
    return;
  }

  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  if(!confirm("Delete this comment?")) return;

  comments.splice(index, 1);

  localStorage.setItem("comments", JSON.stringify(comments));

  loadComments();
}


/* AUTO LOAD */
loadComments();

// SHOW / HIDE ADMIN LOGIN PANEL
function toggleAdmin(){

  const adminPanel = document.getElementById("adminPanel");

  if(adminPanel.style.display === "block"){

    adminPanel.style.display = "none";

  }else{

    adminPanel.style.display = "block";

  }

}
function toggleMenu(){
  document.getElementById("navbar").classList.toggle("show");
}
