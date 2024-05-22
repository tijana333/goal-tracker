document.addEventListener("DOMContentLoaded", function () {
  const tasks = [];
  const completedTasks = [];
  const deletedTasks = [];
  let editIndex = -1;

  const ErrorMessage = document.getElementById("ErrorMessage");
  const successMessage = document.getElementById("successMessage");

  ErrorMessage.style.display = "none";
  successMessage.style.display = "none";

  document.getElementById("button").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;

    ErrorMessage.style.display = "none";
    successMessage.style.display = "none";

    if (taskInput.length === 0) {
      ErrorMessage.style.display = "block";
      setTimeout(function () {
        ErrorMessage.style.display = "none";
      }, 2000);
    } else {
      if (editIndex === -1) {
        const task = {
          text: taskInput,
          description: taskDescription,
          completed: false,
        };
        tasks.push(task);
      } else {
        tasks[editIndex].text = taskInput;
        tasks[editIndex].description = taskDescription;
        editIndex = -1;
      }
      updateTaskList();

      successMessage.style.display = "block";
      setTimeout(function () {
        successMessage.style.display = "none";
      }, 2000);

      document.getElementById("taskInput").value = "";
      document.getElementById("taskDescription").value = "";
    }
  });

  function toggleTaskComplete(index) {
    const task = tasks[index];
    task.completed = !task.completed;
    if (task.completed) {
      completedTasks.push(task);
      tasks.splice(index, 1);
    } else {
      tasks.push(task);
      completedTasks.splice(completedTasks.indexOf(task), 1);
    }
    updateTaskList();
    updateCompletedTaskList();
  }

  function deleteTask(index) {
    const task = tasks.splice(index, 1)[0];
    deletedTasks.push(task);
    updateTaskList();
    updateDeletedTaskList();
  }

  function editTask(index) {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = document.getElementById("taskDescription");
    taskInput.value = tasks[index].text;
    taskDescription.value = tasks[index].description;
    editIndex = index;
  }

  function updateTaskList() {
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTaskComplete(index));

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.style.textDecoration = "line-through";
      }

      const taskDesc = document.createElement("span");
      taskDesc.textContent = task.description;
      if (task.completed) {
        taskDesc.style.textDecoration = "line-through";
      }

      const iconsDiv = document.createElement("div");
      iconsDiv.className = "icons";

      const editIcon = document.createElement("img");
      editIcon.src = "./img/edit.png";
      editIcon.addEventListener("click", () => editTask(index));

      const deleteIcon = document.createElement("img");
      deleteIcon.src = "./img/bin.png";
      deleteIcon.addEventListener("click", () => deleteTask(index));

      iconsDiv.appendChild(editIcon);
      iconsDiv.appendChild(deleteIcon);

      listItem.appendChild(checkbox);
      listItem.appendChild(taskText);
      listItem.appendChild(taskDesc);
      listItem.appendChild(iconsDiv);

      listContainer.appendChild(listItem);
    });
  }

  function updateCompletedTaskList() {
    const completedTasksContainer = document.getElementById(
      "completed-tasks-list"
    );
    completedTasksContainer.innerHTML = "";

    completedTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.style.textDecoration = "none";

      const taskDesc = document.createElement("span");
      taskDesc.textContent = task.description;
      taskDesc.style.textDecoration = "none";

      listItem.appendChild(taskText);
      listItem.appendChild(taskDesc);

      completedTasksContainer.appendChild(listItem);
    });
  }

  function updateDeletedTaskList() {
    const deletedTasksContainer = document.getElementById("deleted-tasks-list");
    deletedTasksContainer.innerHTML = "";

    deletedTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      const taskDesc = document.createElement("span");
      taskDesc.textContent = task.description;

      listItem.appendChild(taskText);
      listItem.appendChild(taskDesc);

      deletedTasksContainer.appendChild(listItem);
    });
  }
});
