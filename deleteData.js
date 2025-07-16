    const email = sessionStorage.getItem('adminEmail');
    if (!email) location.href = 'login.html';
    const key = `students_${email}`;
    let students = JSON.parse(localStorage.getItem(key)) || [];

    function showToast(msg, type = 'success') {
      Toastify({
        text: msg,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: {
          background: type === 'success' ? '#2E7D32' : '#f44336',
          color: '#fff'
        }
      }).showToast();
    }

    function renderDelete() {
      const container = document.getElementById('deleter');
      if (!students.length) {
        container.innerHTML = '<p class="no-data">No records to delete.</p>';
        return;
      }

      let html = `<table><thead><tr>
        <th>Name</th>
        <th>Father's Name</th>
        <th>Course</th>
        <th>Gender</th>
        <th>Action</th>
      </tr></thead><tbody>`;

      students.forEach((s, i) => {
        html += `<tr>
          <td>${s.name}</td>
          <td>${s.fatherName}</td>
          <td>${s.course}</td>
          <td>${s.gender || ''}</td>
          <td><button class="delete-btn" onclick="confirmDelete(${i})">Delete</button></td>
        </tr>`;
      });

      html += '</tbody></table>';
      container.innerHTML = html;
    }

    function confirmDelete(i) {
      const name = students[i].name;
      const confirmBox = confirm(`Are you sure you want to delete "${name}"?`);
      if (!confirmBox) return;

      students.splice(i, 1);
      localStorage.setItem(key, JSON.stringify(students));
      showToast('Record deleted');
      renderDelete();
    }

    window.onload = () => {
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
      renderDelete();
    };