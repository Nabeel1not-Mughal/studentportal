// Predefined valid users with 
    const users = [
      { email: "admin1@example.com", password: "pass123",  },
      { email: "admin2@example.com", password: "pass456",  },
      { email: "admin3@example.com", password: "pass789",  }
    ];

    function showToast(message, type = 'success') {
      Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: type === 'success' ? '#2E7D32' : '#f44336',
          color: "#fff",
          borderRadius: "4px"
        }
      }).showToast();
    }

    function login() {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value.trim();

      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        sessionStorage.setItem("adminName", name);
        sessionStorage.setItem("adminEmail", user.email);
        sessionStorage.setItem("adminPass", user.password);

        showToast(`✅ Welcome, ${name}`, "success");
        setTimeout(() => location.href = "index.html", 1000);
      } else {
        showToast("❌ Invalid email or password", "error");
      }
    }