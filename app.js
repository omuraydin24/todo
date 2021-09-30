//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Fundtions

function addTodo(event) {
  event.preventDefault();


  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  const newTodo = document.createElement('li');
  if (todoInput.value !== "") {
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage
    saveLocalTodos(todoInput.value);
    //checkmark btn 
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);
    //trash btn 
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);
    //Append to list

    todoList.appendChild(todoDiv)
    todoInput.value = "";
  } else {
    alert("Hello! I am an alert box!!");

  }


}

function deleteCheck(e) {
  const item = e.target;
  //delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall")
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //Check, var mı
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);

    //checkmark btn 
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa fa-check"></i>'
    completedButton.classList.add("complete-btn")
    todoDiv.appendChild(completedButton);
    //trash btn 
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);
    //Append to list

    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innderText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// var option = {
//   animation: true,
//   delay: 2000
// }

// function Toasty() {
//   var toastDOM = document.querySelector(".EpicToast");
//   var toastElement = new bootstrap.Toast(toastDOM, option);

//   toastElement.show();
// }


var toastTrigger = document.getElementById('submidbtn')
var toastLiveExample = document.getElementById('EpicToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', function () {
    var toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}