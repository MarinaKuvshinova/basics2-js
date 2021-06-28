'use strict';

class Todo {
    constructor (form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
				<button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e) {
        e.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = '';
            this.render();
        } else {
            alert('Пустое дело добавить нельзя');
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key, target) {
        target.closest('.todo-item').style.opacity = 0;
        setTimeout(() => {
            this.todoData.delete(key);
            this.render();
        }, 1000);
    }

    competedItem(key, target) {
        const oldItem = this.todoData.get(key);
        target.closest('.todo-item').style.opacity = 0;

        setTimeout(() => {
            this.todoData.set(key, {
                ...oldItem,
                completed: !oldItem.completed
            });
            this.render();
        }, 1000);
    }

    editItem(key, target) {
        const oldItem = this.todoData.get(key),
            textInput = target.closest('.todo-item').querySelector('.text-todo');

        target.classList.toggle('save');

        if (target.classList.contains('save')) {
            textInput.textContent = '';
            textInput.setAttribute('contenteditable', 'true');
            textInput.focus();
        } else {
            textInput.setAttribute('contenteditable', 'false');
            if (textInput.textContent) {
                this.todoData.set(key, {
                    ...oldItem,
                    value: textInput.textContent
                });
                this.render();
            } else {
                textInput.textContent = oldItem.value;
            }
        }
    }

    handler(e) {
        const target = e.target,
            key = target.closest('.todo-item').dataset.key;

        if (target.classList.contains('todo-remove')) {
            this.deleteItem(key, target);
        }

        if (target.classList.contains('todo-complete')) {
            this.competedItem(key, target);
        }

        if (target.classList.contains('todo-edit')) {
            this.editItem(key, target);
        }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        document.querySelector('.todo-container').addEventListener('click', this.handler.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();