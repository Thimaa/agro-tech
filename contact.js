let isSinhala = false;

const text = {
  en: {
    logo: "SolarTech",

    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",

    contactTitle: "Contact Us",
    contactSubtitle: "We are ready to help you with professional solar energy solutions.",

    getTouch: "Get In Touch",
    contactDesc:
      "Contact our team for solar panel installation, energy consultation, and renewable energy solutions for your home or business.",

    langBtn: "සිංහල"
  },

  si: {
    logo: "සෝලාර්ටෙක්",

    home: "මුල් පිටුව",
    about: "අප ගැන",
    services: "සේවාවන්",
    projects: "ව්‍යාපෘති",
    contact: "සම්බන්ධ වන්න",

    contactTitle: "අප හා සම්බන්ධ වන්න",
    contactSubtitle: "වෘත්තීය සූර්ය බලශක්ති විසඳුම් ලබා ගැනීමට අපි සූදානම්.",

    getTouch: "සම්බන්ධ වන්න",
    contactDesc:
      "ඔබේ නිවස හෝ ව්‍යාපාරය සඳහා සූර්ය පැනල් ස්ථාපනය සහ බලශක්ති උපදේශන සඳහා අපගේ කණ්ඩායම අමතන්න.",

    langBtn: "English"
  }
};

function toggleLanguage() {
  isSinhala = !isSinhala;

  applyLanguage();
}

function applyLanguage() {
  const lang = isSinhala ? "si" : "en";

  document.getElementById("logo").innerHTML = text[lang].logo;

  document.getElementById("nav-home").innerHTML = text[lang].home;
  document.getElementById("nav-about").innerHTML = text[lang].about;
  document.getElementById("nav-services").innerHTML = text[lang].services;
  document.getElementById("nav-projects").innerHTML = text[lang].projects;
  document.getElementById("nav-contact").innerHTML = text[lang].contact;

  document.getElementById("contact-title").innerHTML = text[lang].contactTitle;
  document.getElementById("contact-subtitle").innerHTML = text[lang].contactSubtitle;

  document.getElementById("get-touch").innerHTML = text[lang].getTouch;
  document.getElementById("contact-desc").innerHTML = text[lang].contactDesc;

  document.getElementById("lang-btn").innerHTML =
    `<i class="fa-solid fa-globe"></i> ` + text[lang].langBtn;
}

function toggleMenu() {
  document.getElementById("navbar").classList.toggle("show");
}