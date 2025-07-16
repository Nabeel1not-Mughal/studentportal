const email = sessionStorage.getItem("adminEmail");
const key = `students_${email}`;
const data = JSON.parse(localStorage.getItem(key)) || [];
document.getElementById("total").textContent = data.length;
document.getElementById("male").textContent = data.filter(
  (s) => s.gender === "Male"
).length;
document.getElementById("female").textContent = data.filter(
  (s) => s.gender === "Female"
).length;

window.addEventListener("DOMContentLoaded", () => {
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) document.body.classList.add("dark-mode");
});
