document.querySelectorAll('.read-more').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.project-card');
      const fullDescription = card.querySelector('.full-description');
      const description = card.querySelector('.description');
  
      // Toggle expanded state
      card.classList.toggle('expanded');
      if (card.classList.contains('expanded')) {
        fullDescription.style.display = 'block'; // Show full description
        description.style.display = 'none'; // Hide the truncated description
        button.textContent = 'Read Less'; // Change button text
      } else {
        fullDescription.style.display = 'none'; // Hide full description
        description.style.display = 'block'; // Show truncated description
        button.textContent = 'Read More'; // Change button text
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
});
