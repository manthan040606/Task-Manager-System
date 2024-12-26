let tasks = [];

// Function to add a new task
function addTaskHandler() {
    const title = document.getElementById("taskTitle").value;
    const dueTime = parseInt(document.getElementById("taskDueTime").value);
    const priority = document.getElementById("taskPriority").value;

    if (!title || isNaN(dueTime) || !priority) {
        alert("Please enter valid task details.");
        return;
    }

    // Create a new task object based on user input
    const newTask = { 
        title, 
        dueTime, 
        priority, 
        reminderSent: false, 
        createdAt: Date.now() 
    };

    tasks.push(newTask); // Add the task to the tasks array
    renderTaskList();    // Refresh the task list after adding the task
    scheduleReminders(); // Automatically set reminders after adding the task
}

// Function to trigger reminders manually
function triggerManualReminders() {
    const currentTime = Date.now();

    tasks.forEach(task => {
        const taskDueTimeInMs = task.createdAt + (task.dueTime * 60 * 1000);
        if (taskDueTimeInMs <= currentTime && !task.reminderSent) {
            showReminder(task.title); // Show the reminder
            task.reminderSent = true; // Mark the reminder as sent
        }
    });

    alert("Manual reminders have been triggered!");
}

// Function to show the reminder
function showReminder(taskTitle) {
    const reminderList = document.getElementById("reminderList");
    const reminderItem = document.createElement("li");
    reminderItem.innerHTML = `<span>Reminder:</span> ${taskTitle} is due now!`;
    reminderList.appendChild(reminderItem);
}

// Function to render the task list on the page
function renderTaskList() {
    const taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = "";

    if (tasks.length === 0) {
        taskListElement.innerHTML = "<p>No tasks available!</p>";
        return;
    }

    const list = document.createElement("ul");
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.title} (Due in ${task.dueTime} minutes, Priority: ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)})`;

        // Add color based on priority
        if (task.priority === 'high') {
            li.classList.add("priority-high");
        } else if (task.priority === 'medium') {
            li.classList.add("priority-medium");
        } else if (task.priority === 'low') {
            li.classList.add("priority-low");
        }

        list.appendChild(li);
    });
    taskListElement.appendChild(list);
}

// Function to simulate reminders using setTimeout
function scheduleReminders() {
    tasks.forEach(task => {
        const delay = task.dueTime * 60 * 1000;
        setTimeout(() => {
            if (!task.reminderSent) {
                showReminder(task.title);
                task.reminderSent = true;
            }
        }, delay);
    });
}
