// Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("change", filterTodo);

// Functions

function addTodo(e) {
  e.preventDefault();
  
  const todoText = todoInput.value.trim();
  
  if (todoText !== "") {
    createTodoElement(todoText);
    saveLocalTodos(todoText);
    todoInput.value = "";
  }
}

function createTodoElement(todoText) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  const newTodo = document.createElement("li");
  newTodo.innerText = todoText;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;
  
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      removeLocalTodos(todo);
    });
  }
  
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo() {
  const todos = todoList.childNodes;
  
  todos.forEach((todo) => {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
        break;
      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}

function saveLocalTodos(todoText) {
  let todos = [];

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos = [];

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos = [];

  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todoText) => {
    createTodoElement(todoText);
  });
}
