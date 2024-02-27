


const inputEl = document.querySelector('#input');
const buttonEl = document.querySelector('#delete');
const outputEl = document.querySelector('#list-container');
const form = document.querySelector('form');

// delete task
const removeTask = id => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
};

// get tasks
const getTasks = () => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    // function to display dom
    let output;
    const allTasks = tasks.map(task => {
        return `<li id="item">
            <span>${task.title}</span>
            <button onclick="removeTask('${task.id}')" id="delete">X</button>
        </li>`;
    });
    output = allTasks.join("");
    outputEl.innerHTML = output;
};

// Add Task and save into local storage
const addTask = e => {
    e.preventDefault();

    // check if input is empty 
    if (inputEl.value === "") {
        alert('Please enter task');
        return;
    }
 
    // get the item
    const task = inputEl.value;
    if (task) {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        }
        else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.unshift({
            id: Date.now(),
            title: task,
        });

        // save to storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // empty input
        inputEl.value = '';
        getTasks(); // Call getTasks after adding a new task to update the display
    }
};

form.addEventListener('submit', addTask);
getTasks(); // Initial display of tasks
