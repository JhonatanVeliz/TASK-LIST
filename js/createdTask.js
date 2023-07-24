const $ = (nodo, isArray, documento = document.body) => !isArray ? documento.querySelector(nodo) : documento.querySelectorAll(nodo);

class NewTask {
    static arrayIdsTask = [];

    constructor(task, date, id, completed) {
        this._task = task;
        this._date = date;
        this._id = id;
        this._completed = completed;
    }
    set setTask(task) { this._task = task };

    get getTask() { return this._task };

    set setDate(date) { this._date = date };

    get getDate() { return this._date };

    set setId(id) { this._id = id };

    get getId() { return this._id };

    set setCompleted(completed) { this._completed = completed };

    get getCompleted() { return this._completed };

    static createdId() {
        const date = new Date();
        return `${date.getTime()}`
    }

    static date() {
        const date = new Date();

        const day = `0${date.getDate()}`;
        const month = `0${date.getMonth() + 1}`;
        const year = date.getFullYear();

        return `${day.slice(-2)}/${month.slice(-2)}/${year}`
    }

    static createdTaskHTML(task, date, id, completed) {
        const HTMLGrid = $('#root-task');
        HTMLGrid.classList.remove('display-none');
        const setHTML = `   
        <div class="task__list__item" id="${id}">
    
            <p class="task__list__item__title ${completed ? "throug" : ""}" data-throug="${id}"><span data-title="${id}">${task}</span><span class="task__list__item__title__fecha">${date}</span></p>
    
            <div class="task__list__item__btns">
                <button class="btn task__list__item__btn btn--completed ${completed ? "btn--blue" : "btn--green"}" onclick="NewTask.completedTask(${id})" data-completed="${id}"><img src="./assets/done.png" alt="completar tarea"></button>
                <button class="btn task__list__item__btn btn--update" onclick="NewTask.updateTask(${id})" title="click para editar"><img src="./assets/create.png" alt="editar tarea"></button>
                <button class="btn task__list__item__btn btn--delete" onclick='NewTask.deleteTask("#root-task", ${id})' title="doble click para eliminar"><img src="./assets/clear.png" alt="eliminar tarea"></button>
            </div>
    
        </div>
        `;
        this.removeAddDiv(true, true, '.task__done');
        HTMLGrid.insertAdjacentHTML('beforeend', setHTML);
    }

    static deleteTask(taskContainerId, id) {
        const taskItem = document.getElementById(id)
        taskItem.remove();
        this.deleteFromStorage(false, id);

        const taskContainer = $(taskContainerId);
        const taskChildren = taskContainer.querySelectorAll('div').length;
        if (taskChildren == 0) {
            this.removeAddDiv(true, true, taskContainerId);
            this.removeAddDiv(true, false, '.task__done');
        }
    }

    static removeAddDiv(isFromClass, addToRemove, nodo) {
        const divMessage = $(nodo);
        if (isFromClass) {
            return addToRemove ? divMessage.classList.add('display-none') : divMessage.classList.remove('display-none')
        };
        divMessage.remove();
    }

    static setTaskStorage(task, date, id, completed) {
        const userTask = {
            task,
            date,
            id,
            completed
        }
        localStorage.setItem(id, JSON.stringify(userTask));
        this.arrayIdsTask.push(id);
        localStorage.setItem('ids', this.arrayIdsTask);
    }

    static getTaskStorage(isOnly, id) {
        if (isOnly) { return JSON.parse(localStorage.getItem(id)); }

        const tasks = { ...localStorage };
        Object.values(tasks).forEach((taskStorage) => {
            try {
                const { task, date, id, completed } = JSON.parse(taskStorage);
                if (task) { this.createdTaskHTML(task, date, id, completed) };
            } catch (error) { }
        })
    }

    static deleteFromStorage(isAll, id) {
        if (isAll) {
            let arrayId = localStorage.getItem('ids');
            arrayId.split(",").forEach((id) => localStorage.removeItem(id));
        } else { localStorage.removeItem(id) };
    }

    static updateTask(id) {
        const taskText = $(`[data-title="${id}"]`);
        divUpdateTask.classList.add('update--visibled');
        inputUpdateTask.value = taskText.innerText;
        inputUpdateTask.focus();

        this.updateTaskAccept(divUpdateTask, taskText, inputUpdateTask, id);
    }

    static updateTaskAccept(div, taskText, updateText, id) {

        btnUpdateTaskAccept.addEventListener('click', () => {
            taskText.innerText = updateText.value;
            div.classList.remove('update--visibled');

            this.setTaskStorage(taskText.innerText, this.date(), id, false);
        })
    }

    static completedTask(id) {
        const textThroug = $(`[data-throug="${id}"]`);
        textThroug.classList.add('throug');
        const btnCompleted = $(`[data-completed="${id}"]`);
        btnCompleted.classList.add('btn--blue');
        const storageTask = this.getTaskStorage(true, id);
        storageTask.completed = true;
        this.setTaskStorage(storageTask.task, storageTask.date, storageTask.id, storageTask.completed);

        btnCompleted.addEventListener('dblclick', () => {
            btnCompleted.classList.remove('btn--blue');
            textThroug.classList.remove('throug');
            const storageTask = this.getTaskStorage(true, id);
            storageTask.completed = false;
            this.setTaskStorage(storageTask.task, storageTask.date, storageTask.id, storageTask.completed);
        })
    }
}

const createdTaskInfo = (taskValue) => {
    const task = new NewTask();

    task.setTask = taskValue;
    task.setDate = NewTask.date();
    task.setId = NewTask.createdId();
    task.setCompleted = false;

    NewTask.createdTaskHTML(task.getTask, task.getDate, task.getId, task.getCompleted);
    NewTask.setTaskStorage(task.getTask, task.getDate, task.getId, task.getCompleted);
    inputTask.value = '';
}

const renderStorage = NewTask.getTaskStorage();

// DOM ELEMENTS
const inputTask = $('#task');
const btnCreatedask = $('#create');

const inputUpdateTask = $('#newTask');
const divUpdateTask = $('.update');
const btnUpdateTaskAccept = $('.btn--accept');
const btnUpdateTaskCancel = $('.btn--cancel');

const invalidTask = $('.invalid');
const btnInvalidTask = $('.btn--invalid');

btnCreatedask.addEventListener('click', () => {
    if(inputTask.value !== ''){return createdTaskInfo(inputTask.value)};
    invalidTask.classList.add('invalid--visibled');
});
btnInvalidTask.addEventListener('click', ()=> invalidTask.classList.remove('invalid--visibled'));
btnUpdateTaskCancel.addEventListener('click', ()=> divUpdateTask.classList.remove('update--visibled'));