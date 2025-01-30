
const API_URL = 'https://your-backend.onrender.com/api/tasks';
const tasksContainer = document.querySelector('.tasks');
const newTask = document.querySelector('.new-task');
const getTask = document.querySelector('.get-task');

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.id = task._id;

        const taskTitle = document.createElement('h1');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.title;

        const taskStatus = document.createElement('div');
        taskStatus.className = 'status';
        taskStatus.textContent = task.status;
        taskStatus.addEventListener('click', async function () {
            await updateTaskStatus(task._id, task.status === 'PENDING' ? 'COMPLETED' : 'PENDING');
            fetchTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', async function () {
            await deleteTask(task._id);
            fetchTasks();
        });

        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskStatus);
        taskDiv.appendChild(deleteBtn);
        tasksContainer.appendChild(taskDiv);
    });
}

async function addTask() {
    const title = getTask.value.trim();
    if (!title) return alert('Enter a task');

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    getTask.value = '';
    fetchTasks();
}

async function updateTaskStatus(id, status) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

newTask.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', fetchTasks);
