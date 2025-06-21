import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // const name = event.target.name.value;
    // const dateInput = event.target.date.value;
    addTodoPopup._getInputValues();
    newTodoValidator.resetValidation();

    // Create a date object and adjust for timezone
    const date = new Date(inputValues.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();
  todoCounter.updateTotal(true);
  return todoElement;
};

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (item) => {
    //write the function
    //generate todo item
    const todo = generateTodo(item);
    // add it to the todo list
    section.addItem(todo);
  },
  // refer to the forEach loop in this file
  containerSelector: ".todos__list",
});

//call Section instance's renderItems method (DONE)
section.renderItems();

//const openModal = (modal) => {
//  modal.classList.add("popup_visible");
//};

//const closeModal = (modal) => {
// modal.classList.remove("popup_visible");
//};

//const renderTodo = (item) => {
//const todo = generateTodo(item);
//todosList.append(todo);
//};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }

  todoCounter.updateTotal(false);
}

//addTodoCloseBtn.addEventListener("click", () => {
//  addTodoPopup.close();
//});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;
//   newTodoValidator.resetValidation();

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };
//   const todo = generateTodo(values);
//   section.addItem(todo);
//   addTodoPopup.close();
// });

//initialTodos.forEach((item) => {
//renderTodo(item);
//use renderItems and use addItem
//});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
