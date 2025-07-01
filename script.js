 
// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Check if task is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create <li> for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task on button click
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append button to <li>, then <li> to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear input field
        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on "Enter" key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load and display tasks from local storage
    loadTasks();

    // Function to load tasks from local storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false = don't save again
        });
    }

    // Function to save task array to local storage
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the DOM (and optionally save to local storage)
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task!');
            return;
        }

        // Create <li> element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task logic
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            // Remove from local storage
            const updatedTasks = Array.from(taskList.children).map(li => li.childNodes[0].textContent);
            saveTasksToStorage(updatedTasks);
        };

        // Append remove button and list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to local storage if required
        if (save) {
            const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            existingTasks.push(taskText);
            saveTasksToStorage(existingTasks);
        }
    }

    // Handle button click to add task
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    // Handle Enter key press to add task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = '';
            } else {
                alert('Please enter a task!');
            }
        }
    });
});
