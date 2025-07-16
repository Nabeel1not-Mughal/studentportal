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

    function renderEditor() {
      const container = document.getElementById('editor');
      if (!students.length) {
        container.innerHTML = '<p class="no-data">No student records to edit.</p>';
        return;
      }

      let html = `<table><thead>
        <tr>
          <th>Name</th>
          <th>Father's Name</th>
          <th>Course</th>
          <th>Gender</th>
          <th>Save</th>
        </tr></thead><tbody>`;

      students.forEach((s, i) => {
        html += `<tr>
          <td><input type="text" id="name-${i}" value="${s.name}"></td>
          <td><input type="text" id="father-${i}" value="${s.fatherName}"></td>
          <td>
            <select id="course-${i}">
              <option>Nursery</option>
              <option>Play</option>
              <option>Primary</option>
              <option>Middle</option>
              <option>Matric</option>
              <option>Intermediate</option>
            </select>
          </td>
          <td>
            <select id="gender-${i}">
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </td>
          <td><button class="save-btn" onclick="confirmSave(${i})">Save</button></td>
        </tr>`;
      });

      html += '</tbody></table>';
      container.innerHTML = html;

      students.forEach((s, i) => {
        document.getElementById(`course-${i}`).value = s.course;
        document.getElementById(`gender-${i}`).value = s.gender || '';
      });
    }

    function confirmSave(i) {
      const name = document.getElementById(`name-${i}`).value.trim().toUpperCase();
      const father = document.getElementById(`father-${i}`).value.trim().toUpperCase();
      const course = document.getElementById(`course-${i}`).value;
      const gender = document.getElementById(`gender-${i}`).value;

      if (!name || !father || !course || !gender) {
        return showToast('All fields are required', 'error');
      }

      const toast = Toastify({
        node: createConfirmationNode(() => {
          students[i] = { ...students[i], name, fatherName: father, course, gender };
          localStorage.setItem(key, JSON.stringify(students));
          showToast('Record updated');
        }),
        duration: 5000,
        gravity: 'top',
        position: 'center',
        close: true,
        style: { background: '#2C3E50', padding: '10px' }
      });
      toast.showToast();
    }

    function createConfirmationNode(onConfirm) {
      const wrapper = document.createElement('div');
      wrapper.className = 'toast-confirm';
      wrapper.innerHTML = `
        <span style="color:white;">Save changes?</span>
        <button class="yes-btn">Yes</button>
        <button class="no-btn">No</button>
      `;
      wrapper.querySelector('.yes-btn').onclick = () => {
        onConfirm();
        Toastify({ text: 'Confirmed', duration: 2000, style: { background: '#2E7D32' } }).showToast();
        wrapper.remove();
      };
      wrapper.querySelector('.no-btn').onclick = () => {
        Toastify({ text: 'Cancelled', duration: 2000, style: { background: '#f44336' } }).showToast();
        wrapper.remove();
      };
      return wrapper;
    }

    function saveAll() {
      let valid = true;
      students = students.map((s, i) => {
        const name = document.getElementById(`name-${i}`).value.trim().toUpperCase();
        const father = document.getElementById(`father-${i}`).value.trim().toUpperCase();
        const course = document.getElementById(`course-${i}`).value;
        const gender = document.getElementById(`gender-${i}`).value;
        if (!name || !father || !course || !gender) valid = false;
        return { ...s, name, fatherName: father, course, gender };
      });
      if (!valid) return showToast('All fields are required before saving all.', 'error');
      localStorage.setItem(key, JSON.stringify(students));
      showToast('All records updated!');
    }

    window.onload = () => {
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
      renderEditor();
    };