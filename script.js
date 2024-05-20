document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const ErrorMessage = document.getElementById("ErrorMessage");
    const successMessage = document.getElementById("successMessage");
    const listContainer = document.getElementById("list-container");
    let tasks = [];

    if (taskInput.length === 0) {
      ErrorMessage.style.display = "block";
      setTimeout(function () {
        ErrorMessage.style.display = "none";
      }, 2000);
    } else {
      let li = document.createElement("li");
      li.innerHTML = `<span>${taskInput}</span>
      <span>${taskDescription}</span>
      `;
      listContainer.appendChild(li);
    }
  });
});


const toggleTastComplete=(index) => {
  tasks[index].completed=!tasks[index].completed;
  console.log({tasks})
};

const deleteTask= (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};
const updateTaskList = () => {
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = (
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox"   {
             task.completed ? "checked" : "" 
            
          }/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./img/edit.png" onClick="editTask(${index})"/>
          <img src="./img/bin.png"onClick="deleteTask(${index})" />
        </div>
      </div>
    );
    listItem.addEventListener("change", () => toggleTastComplete(index));
    listContainer.append(listItem);
  });
};
