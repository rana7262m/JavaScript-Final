document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.textContent = taskText;

    // Task Completion Toggle
    li.addEventListener("click", function () {
        this.classList.toggle("completed");
        saveTasks();
    });

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = ""; // Clear input field
}

// Save to Local Storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((task) => {
        tasks.push({
            text: task.textContent.replace("Delete", "").trim(),
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        let taskList = document.getElementById("taskList");

        tasks.forEach((task) => {
            let li = document.createElement("li");
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add("completed");
            }

            li.addEventListener("click", function () {
                this.classList.toggle("completed");
                saveTasks();
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}
