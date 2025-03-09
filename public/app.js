document.querySelectorAll('.read-more').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const fullDescription = card.querySelector('.full-description');
    const description = card.querySelector('.description');

    // Toggle expanded state
    card.classList.toggle('expanded');
    if (card.classList.contains('expanded')) {
      fullDescription.style.display = 'block';
      description.style.display = 'none';
      button.textContent = 'Read Less'; 
    } else {
      fullDescription.style.display = 'none';
      description.style.display = 'block';
      button.textContent = 'Read More';
    }
  });
});


document.querySelectorAll(".wrapper-link").forEach(link => {
link.addEventListener("click", () => {
  document.querySelector("#active").checked = false;
});
}); 


document.getElementById("darkModeSwitch").addEventListener("change", function () {
document.body.classList.toggle("dark-mode");

if (document.body.classList.contains("dark-mode")) {
  localStorage.setItem("currentMode", "dark");
} else {
  localStorage.setItem("currentMode", "light");
}
});

window.onload = () => {
if (!localStorage.getItem("currentMode")) {
  localStorage.setItem("currentMode", "light");
}

if (localStorage.getItem("currentMode") === "light") {
  document.body.classList.remove("dark-mode");
  document.getElementById("darkModeSwitch").checked = false;
} else if (localStorage.getItem("currentMode") === "dark") {
  document.body.classList.add("dark-mode");
  document.getElementById("darkModeSwitch").checked = true;
}
}