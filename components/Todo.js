class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._completed = data.completed;
    this._name = data.name;
    this._id = data.id;
    this._selector = selector;
    this._handleDelete = handleDelete;
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDueDate() {
    this._dueDate = new Date(this._data.date);

    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      )}`;
    }
  }

  _removeTodo = () => {
    this._todoElement.remove();
    this._todoElement = null;
  };

  _toggleComplete = () => {
    this._data.completed = !this._data.completed;
  };

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(this._data.completed);

      this._removeTodo();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleComplete();
      this._handleCheck(!this._completed);
    });
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDueDate();

    return this._todoElement;
  }
}

export default Todo;
