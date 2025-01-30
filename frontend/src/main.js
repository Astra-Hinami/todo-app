const API_URL = 'https://todo-app-37wo.onrender.com/api/tasks';

let tasksDrawer = document.querySelector('.tasks-add');
let drawerTrigger = document.querySelector('.add-slider');
let triggerIcon = document.querySelector('.slider-icon');
let allTasks = document.querySelectorAll('.task');

let newTask = document.querySelector('.new-task');
let getTask = document.querySelector('.get-task');
let tasksContainer = document.querySelector('.tasks');


let isOpen = true; 

drawerTrigger.addEventListener('click', function () {
    tasksDrawer.style.transition = 'bottom 0.3s ease';
    triggerIcon.style.transition = 'transform 0.3s ease';
    
    if (isOpen) {
        tasksDrawer.style.bottom = '0rem'; 
        console.log(isOpen);
        triggerIcon.style.transform = 'rotate(45deg)'
    } else {
        tasksDrawer.style.bottom = '-12rem'; 
        triggerIcon.style.transform = 'rotate(0deg)'
        console.log(isOpen);
    }
    
    isOpen = !isOpen; 
});


const colors = ['#97c8eb', '#f3d180', '#f4978e', '#98c9a3'];


// Add new task

async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasksContainer.innerHTML = ''; // Clear existing tasks

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
            fetchTasks(); // Refresh tasks
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', async function () {
            await deleteTask(task._id);
            fetchTasks(); // Refresh tasks
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
    fetchTasks(); // Refresh tasks
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


// Event Listeners
newTask.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', fetchTasks);
