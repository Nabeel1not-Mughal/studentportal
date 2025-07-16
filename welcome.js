    const email = sessionStorage.getItem('adminEmail');
    const key = `students_${email}`;
    const total = JSON.parse(localStorage.getItem(key))?.length || 0;
    document.getElementById('total').textContent = total;

    window.addEventListener("DOMContentLoaded", () => {
      const dark = localStorage.getItem("darkMode") === "true";
      if (dark) document.body.classList.add("dark-mode");
    });