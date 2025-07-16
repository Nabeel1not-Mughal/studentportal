 const email = sessionStorage.getItem('adminEmail');
    if (!email) location.href = 'login.html';
    const key = `students_${email}`;
    let students = JSON.parse(localStorage.getItem(key)) || [];

    function renderTable(data) {
      const container = document.getElementById('table-container');
      if (!data.length) {
        container.innerHTML = '<p class="no-data">No student records found.</p>';
        return;
      }

      let html = `<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Course</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>`;

      data.forEach(s => {
        html += `<tr>
          <td>${s.name}</td>
          <td>${s.fatherName}</td>
          <td>${s.course}</td>
          <td>${s.gender}</td>
        </tr>`;
      });

      html += '</tbody></table>';
      container.innerHTML = html;
    }

    function applySearch(query) {
      const filtered = students.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.fatherName.toLowerCase().includes(query.toLowerCase()) ||
        s.course.toLowerCase().includes(query.toLowerCase()) ||
        (s.gender || '').toLowerCase().includes(query.toLowerCase())
      );
      renderTable(filtered);
    }

    // Receive broadcast search from dashboard
    window.addEventListener('message', e => {
      if (e.data.type === 'SEARCH') {
        applySearch(e.data.query || '');
      }
    });

    function loadAndRender() {
      students = JSON.parse(localStorage.getItem(key)) || [];
      renderTable(students);
    }

    // Dark mode restore
    window.onload = () => {
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
      loadAndRender();
    };