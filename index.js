    if (!sessionStorage.getItem('adminEmail')) location.href = 'login.html';
    const name = sessionStorage.getItem('adminName');
    document.getElementById('name').textContent = name.charAt(0).toUpperCase() + name.slice(1);
    if (sessionStorage.getItem('justLoggedIn')) {
      Toastify({
        text: `Welcome, ${name}!`,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: { background: '#2E7D32', color: '#fff', borderRadius: '4px' }
      }).showToast();
      sessionStorage.removeItem('justLoggedIn');
    }

    function logout() {
      sessionStorage.clear();
      location.href = 'login.html';
    }

    function broadcast(q) {
      document.querySelector('iframe').contentWindow.postMessage({ type: 'SEARCH', query: q }, '*');
    }

    function toggleSidebar() {
      document.querySelector('.sidebar').classList.toggle('show');
    }

    function toggleDark() {
      const dark = document.getElementById('darkToggle').checked;
      document.body.classList.toggle('dark-mode', dark);
      localStorage.setItem('darkMode', dark);
    }

    window.onload = () => {
      const enabled = localStorage.getItem('darkMode') === 'true';
      document.getElementById('darkToggle').checked = enabled;
      document.body.classList.toggle('dark-mode', enabled);
    }