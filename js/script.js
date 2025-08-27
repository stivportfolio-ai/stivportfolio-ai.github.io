function copyEmail() {
  const email = document.getElementById("email").textContent;
  const copyMsg = document.getElementById("copy-msg");

  navigator.clipboard.writeText(email).then(() => {
    // δείχνει το "Copied!" μήνυμα
    copyMsg.style.display = "inline";

    // μετά από 2 δευτερόλεπτα το ξανακρύβει
    setTimeout(() => {
      copyMsg.style.display = "none";
    }, 2000);
  });
}


// Scroll στη σωστή ενότητα
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

}

// Κάνουμε highlight το σωστό κουμπί
function setActiveButton(sectionId) {
  const buttons = document.querySelectorAll("nav button");
  buttons.forEach(btn => btn.classList.remove("active")); 
  // Αφαιρούμε το active από όλα

  const activeBtn = document.querySelector(`nav button[onclick="scrollToSection('${sectionId}')"]`);
  if (activeBtn) {
    activeBtn.classList.add("active"); 
    // Βάζουμε το active μόνο στο σωστό
  }
}

// Αυτόματο update όταν κάνουμε scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  let currentSection = "home";
  let minDistance = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance) {
      minDistance = distance;
      currentSection = section.id;
    }
  });

  // Αν είμαστε κοντά στο τέλος της σελίδας -> Contact
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    currentSection = "contact";
  }

  setActiveButton(currentSection);
});
