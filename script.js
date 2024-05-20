document.addEventListener("DOMContentLoaded", function () {
  const tasks = [];

  document.getElementById("button").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const ErrorMessage = document.getElementById("ErrorMessage");
    const successMessage = document.getElementById("successMessage");

    if (taskInput.length === 0) {
      ErrorMessage.style.display = "block";
      setTimeout(function () {
        ErrorMessage.style.display = "none";
      }, 2000);
    } else {
      const task = {
        text: taskInput,
        description: taskDescription,
        completed: false,
      };
      tasks.push(task);
      updateTaskList();
      successMessage.style.display = "block";
      setTimeout(function () {
        successMessage.style.display = "none";
      }, 2000);
    }
  });

  function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
  }

  function editTask(index) {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = document.getElementById("taskDescription");
    taskInput.value = tasks[index].text;
    taskDescription.value = tasks[index].description;
    deleteTask(index);
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
});
