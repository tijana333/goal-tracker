document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("button").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput").value;

    if (taskInput.leghth === 0) {
      console.log("Empty task! Please enter taks:");
    } else {
      console.log("Add task:", taskInput);
    }
  });
});
