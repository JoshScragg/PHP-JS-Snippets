document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const loginBtn = document.getElementById('login-btn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginStatus = document.getElementById('login-status');

    addTaskBtn.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            const taskSpan = document.createElement('span');
            const deleteBtn = document.createElement('button');

            taskSpan.textContent = taskText;
            deleteBtn.textContent = 'Delete';

            listItem.appendChild(taskSpan);
            listItem.appendChild(deleteBtn);
            taskList.appendChild(listItem);

            newTaskInput.value = '';

            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(listItem);
            });
        }
    });

    loginBtn.addEventListener('click', async function() {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email && password) {
            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const result = await response.json();
                if (result.status === 'success') {
                    loginStatus.textContent = result.message;
                    loginStatus.style.color = 'green';
                } else {
                    loginStatus.textContent = result.message;
                    loginStatus.style.color = 'red';
                }
            } catch (error) {
                loginStatus.textContent = 'An error occurred. Please try again.';
                loginStatus.style.color = 'red';
            }
        }
    });
});