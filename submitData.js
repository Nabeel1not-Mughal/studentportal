    const email = sessionStorage.getItem('adminEmail');
    if (!email) location.href = 'login.html';
    const key = `students_${email}`;

    function showToast(msg, type = 'success') {
      Toastify({
        text: msg,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
          background: type === 'success' ? '#2E7D32' : '#f44336',
          color: '#fff'
        }
      }).showToast();
    }

    function submitStudent(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim().toUpperCase();
      const father = document.getElementById('fatherName').value.trim().toUpperCase();
      const course = document.getElementById('course').value;
      const gender = document.getElementById('gender').value;

      if (!name || !father || !course || !gender) {
        return showToast('All fields required', 'error');
      }

      const studentId = Date.now().toString();
      const newStudent = { studentId, name, fatherName: father, course, gender };
      const data = JSON.parse(localStorage.getItem(key)) || [];
      data.push(newStudent);
      localStorage.setItem(key, JSON.stringify(data));
      showToast('Student added!');
      e.target.reset();
    }

    // Dark mode logic
    function toggleDark() {
      const dark = document.getElementById('darkToggle').checked;
      document.body.classList.toggle('dark-mode', dark);
      localStorage.setItem('darkMode', dark);
    }

    window.onload = () => {
      const darkEnabled = localStorage.getItem('darkMode') === 'true';
      document.getElementById('darkToggle').checked = darkEnabled;
      document.body.classList.toggle('dark-mode', darkEnabled);
    };