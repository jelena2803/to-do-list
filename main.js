let inputTaskText = document.getElementById("inputTask");
let addTaskBtn = document.getElementById("addTask");
let todoList = document.getElementById("todo-list");
let removeLastTaskBtn = document.getElementById("remove-last-task");
let removeDoneTasksBtn = document.getElementById("remove-completed-tasks");
let removeAllTasksBtn = document.getElementById("remove-all-tasks");
let alertNoTaskInput = document.getElementById("warning-no-input");

// some variables for later use in case I add 2 different type of checkbox, one that marks task urgency and another for task completion
// let urgentCheckbox = document.getElementsByClassName("urgent");
// let completeCheckbox = document.getElementById("complete");

let todoItems = [];

class CreateTodo {
  constructor(taskText) {
    this.text = taskText;
    this.checked = false;
    this.id = Date.now();
  }
}

//in order not to repeat and keep adding the same elements (tasks) from the array todoItems every time a user clicks on the button to add 1 task at a time, only the last element/object of the task array gets chosen to be added to the new li element and to be appended to the ul element that contains the task list

// function that creates dom elements in the task list (input with checkbox and li element with the task name and clears the textbox to make it ready for the other input)
function renderTodo(newTask) {
  let newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  let newAddedTask = document.createElement("li");
  newAddedTask.id = newTask.id;
  newAddedTask.appendChild(newCheckbox);
  newAddedTask.innerHTML += todoItems[todoItems.length - 1].text;
  todoList.append(newAddedTask);
  inputTaskText.value = "";
  inputTaskText.focus();
}

// function that checks if input field is empty, if yes alert the user to insert the task in the input field
function addTodo() {
  let newTask = inputTaskText.value.trim();
  if (newTask === "") {
    alertNoTaskInput.innerText = "Please enter a task";
    inputTaskText.focus();
  } else {
    let addNewTask = new CreateTodo(newTask);
    todoItems.push(addNewTask);
    renderTodo(addNewTask);
  }
}

// remove the warning message when user starts typing the new task name
function alertNoInput() {
  if (alertNoTaskInput.innerText != "") {
    alertNoTaskInput.innerText = "";
  }
}

// remove the last task in the list and remove the last object from the todoItems array
function removeLastTask() {
  let deleteTaskConfirmation =
    "Are you sure you want to delete the last task in the list?";
  if (confirm(deleteTaskConfirmation) == true) {
    todoList.removeChild(todoList.lastElementChild);
    todoItems.pop();
  }
  inputTaskText.focus();
}

// remove the completed tasks in the list and remove the last object from the todoItems array
function removeCompletedTasks() {
  let completed = document.getElementsByClassName("complete");
  let limit = completed.length;
  let deleteCompletedTaskConfirmation =
    "Are you sure you want to delete all the completed tasks in the list?";
  if (confirm(deleteCompletedTaskConfirmation) == true) {
    for (let i = limit - 1; i >= 0; i--) {
      completed[i].remove();
    }
  }
  todoItems = todoItems.filter((element) => element.checked == false);
  inputTaskText.focus();
}

// remove all the tasks in the list and remove all the objects from the todoItems array
function removeAllTasks() {
  let deleteAllTasksConfirmation =
    "Are you sure you want to delete all your tasks in the list?";
  if (confirm(deleteAllTasksConfirmation) == true) {
    todoList.innerHTML = "";
    todoItems = [];
  }
  inputTaskText.focus();
}

// task sorting function
function sortBy(property) {
  let sortingValue = property;
  if (property == "id-reverse") {
    todoItems.sort((a, b) => {
      if (b["id"] < a["id"]) {
        return -1;
      }
      if (b["id"] > a["id"]) {
        return 1;
      }
      return 0;
    });
  }

  todoItems.sort((a, b) => {
    if (a[sortingValue] < b[sortingValue]) {
      return -1;
    }
    if (a[sortingValue] > b[sortingValue]) {
      return 1;
    }
    return 0;
  });

  // clear the task list on the page
  todoList.innerHTML = "";

  // displaying the sorted tasks on the page
  todoItems.forEach((element) => {
    let input = document.createElement("input");
    input.type = "checkbox";
    console.log(element.checked);
    input.checked = element.checked;
    input.setAttribute("class", "checkbox");
    let newAddedTask = document.createElement("li");
    newAddedTask.id = element.id;
    if (element.checked) {
      input.setAttribute("checked", "true");
      newAddedTask.setAttribute("class", "complete");
    }
    newAddedTask.appendChild(input);
    newAddedTask.innerHTML += element.text;
    todoList.append(newAddedTask);
  });
}

// click event listener for the add new task button that takes the user's input (new task) and stores it to todoItems array and then creates a new li element with the new task in the tasks list on the page
addTaskBtn.addEventListener("click", addTodo);
// event listener for input text field that adds the task if enter key gets pressed
inputTaskText.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});
// remove the warning message when the user starts typing the new task in the input field
inputTaskText.addEventListener("keydown", alertNoInput);

// event listeners for buttons
removeLastTaskBtn.addEventListener("click", removeLastTask);
removeDoneTasksBtn.addEventListener("click", removeCompletedTasks);
removeAllTasksBtn.addEventListener("click", removeAllTasks);

// checkbox event listeners
todoList.addEventListener("change", function clickCheckbox(event) {
  for (let i = 0; i < todoItems.length; i++) {
    if (event.target.parentElement.id == todoItems[i].id) {
      if (event.target.checked) {
        todoItems[i].checked = true;
        event.target.parentElement.setAttribute("class", "complete");
      } else if (!event.target.checked) {
        todoItems[i].checked = false;
        event.target.parentElement.removeAttribute("class");
      }
    }
  }
});

// event listener for various sorting filters
document.getElementById("tasks").addEventListener("change", function (event) {
  sortBy(event.target.value);
});
