// Selectors 

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventLinstener('click', deleteCheck);

// Functions

function addTodo(event){
  // Prevent form from submitting
  event.preventDefault();
  // Todo DIV 
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Check Mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Check Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
  // Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  // delete todo
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    todo.addEventLinstener('transitioned', function(){
      todo.remove();
    });
  }


  // /check mark
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
