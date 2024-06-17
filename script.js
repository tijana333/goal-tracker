document.addEventListener("DOMContentLoaded", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const completedTasks =
    JSON.parse(localStorage.getItem("completedTasks")) || [];
  const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
  let editIndex = -1;

  const ErrorMessage = document.getElementById("ErrorMessage");
  const successMessage = document.getElementById("successMessage");
  const noTasksMessage = document.getElementById("noTasksMessage");

  ErrorMessage.style.display = "none";
  successMessage.style.display = "none";
  noTasksMessage.style.display = "none";

  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks));
  }

  document.getElementById("button").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDifficulty = document.getElementById("taskDifficulty").value;

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
          difficulty: taskDifficulty,
          completed: false,
        };
        tasks.push(task);
      } else {
        tasks[editIndex].text = taskInput;
        tasks[editIndex].description = taskDescription;
        tasks[editIndex].difficulty = taskDifficulty;
        editIndex = -1;
      }
      sortTasksByDifficulty();
      updateTaskList();

      successMessage.style.display = "block";
      setTimeout(function () {
        successMessage.style.display = "none";
      }, 2000);

      document.getElementById("taskInput").value = "";
      document.getElementById("taskDescription").value = "";
      document.getElementById("taskDifficulty").value = "easy";
    }
  });
  function initializeTaskList() {
    updateTaskList();
    updateCompletedTaskList();
    updateDeletedTaskList();
  }

  initializeTaskList();

  document
    .getElementById("filterCategory")
    .addEventListener("change", function () {
      updateTaskList();
    });

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      updateTaskList();
    });

  function sortTasksByDifficulty() {
    tasks.sort((a, b) => {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
  }

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
    const taskDifficulty = document.getElementById("taskDifficulty");
    taskInput.value = tasks[index].text;
    taskDescription.value = tasks[index].description;
    taskDifficulty.value = tasks[index].difficulty;
    editIndex = index;
  }

  function moveTaskBackToTodoList(index) {
    const task = completedTasks.splice(index, 1)[0];
    task.completed = false;
    tasks.push(task);
    sortTasksByDifficulty();
    updateTaskList();
    updateCompletedTaskList();
  }

  function updateTaskList() {
    const filterCategory = document.getElementById("filterCategory").value;
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const listContainer = document.getElementById("list-container");
    listContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => {
      const matchesCategory =
        filterCategory === "all" || task.difficulty === filterCategory;
      const matchesSearch =
        task.text.toLowerCase().includes(searchInput) ||
        task.description.toLowerCase().includes(searchInput);
      return matchesCategory && matchesSearch;
    });

    if (searchInput.length > 0 && filteredTasks.length === 0) {
      noTasksMessage.style.display = "block";
    } else {
      noTasksMessage.style.display = "none";
      filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskComplete(index));

        const taskTextContainer = document.createElement("div");
        taskTextContainer.className = "task-text-container";

        const taskText = document.createElement("p");
        taskText.className = "task-text";
        taskText.textContent = task.text;
        if (task.completed) {
          taskText.style.textDecoration = "line-through";
        }

        const taskDesc = document.createElement("p");
        taskDesc.className = "task-desc";
        taskDesc.textContent = task.description;
        if (task.completed) {
          taskDesc.style.textDecoration = "line-through";
        }

        const taskDifficulty = document.createElement("span");
        taskDifficulty.className = "task-difficulty";
        taskDifficulty.textContent = task.difficulty;

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

        taskTextContainer.appendChild(taskText);
        taskTextContainer.appendChild(taskDesc);
        taskTextContainer.appendChild(taskDifficulty);

        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextContainer);
        listItem.appendChild(iconsDiv);

        listItem.appendChild(taskContainer);
        listContainer.appendChild(listItem);
      });
    }
    saveTasksToLocalStorage();
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

      const taskDifficulty = document.createElement("span");
      taskDifficulty.className = "task-difficulty";
      taskDifficulty.textContent = task.difficulty;

      const moveBackButton = document.createElement("button");
      moveBackButton.textContent = "Move Back to To-Do";
      moveBackButton.className = "move-back-button";
      moveBackButton.addEventListener("click", () =>
        moveTaskBackToTodoList(index)
      );

      listItem.appendChild(taskText);
      listItem.appendChild(taskDesc);
      listItem.appendChild(taskDifficulty);
      listItem.appendChild(moveBackButton);

      completedTasksContainer.appendChild(listItem);
    });
  }

  function updateDeletedTaskList() {
    const deletedTasksContainer = document.getElementById("deleted-tasks-list");
    deletedTasksContainer.innerHTML = "";

    deletedTasks.forEach((task, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task-item");

      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task");

      const taskTextContainer = document.createElement("div");
      taskTextContainer.className = "task-text-container";

      const taskText = document.createElement("p");
      taskText.className = "task-text";
      taskText.textContent = task.text;

      const taskDesc = document.createElement("p");
      taskDesc.className = "task-desc";
      taskDesc.textContent = task.description;

      const taskDifficulty = document.createElement("span");
      taskDifficulty.className = "task-difficulty";
      taskDifficulty.textContent = task.difficulty;

      taskTextContainer.appendChild(taskText);
      taskTextContainer.appendChild(taskDesc);
      taskTextContainer.appendChild(taskDifficulty);

      taskContainer.appendChild(taskTextContainer);
      listItem.appendChild(taskContainer);
      deletedTasksContainer.appendChild(listItem);
    });
  }

  updateTaskList();
  updateCompletedTaskList();
  updateDeletedTaskList();
});
