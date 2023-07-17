// Valores del HTML del boton Add, del input, botones All y el aside de vacio
const inputTask = document.querySelector('#task'),
    btnAdd = document.querySelector('#add'),
    taskContainer = document.querySelector('#task-container'),
    btnsAll = document.querySelector('#buttons-all'),
    asideVacio = document.querySelector('#vacio'),
    taskInvalid = document.querySelector('.invalid');

btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputTask.value !== '') {
        const inputContent = inputTask.value;
        addTask(inputContent);
        inputTask.value = '';
        btnsAll.classList.remove('display-none');
    } else {
        taskInvalid.classList.add('invalid--active');
    }
    checkTasks();
});

function taskInvalidRemove() {
    taskInvalid.classList.remove('invalid--active');
}

function checkTasks() {
    if (taskContainer.querySelectorAll('.task__list').length === 0) {
        taskContainer.classList.add('display-none');
        asideVacio.classList.remove('display-none');
        btnsAll.classList.add('display-none');
    }
    else {
        taskContainer.classList.remove('display-none');
        asideVacio.classList.add('display-none');
        btnsAll.classList.remove('display-none');
    }
}
function completeTask(id) {
    const task = document.querySelector(`[data-task="${id}"]`);
    task.querySelector('.task__info').classList.toggle('item-opacity');
    const btnCheck = task.querySelector('.check').classList;
    btnCheck.remove('btn--green');
    btnCheck.add('btn--blue');

    completedTaskStorage(id);
}

function removeTask(id) {
    const task = document.querySelector(`[data-task="${id}"]`);
    task.remove();
    checkTasks();

    removeTaskStorage(id);
}
function templateTask(getId, title, dateNow, completed) {
    const date = new Date(dateNow);
    const dateDay = date.getDate();
    const dateMonth = date.getMonth() + 1;
    return `
    <div class="task__list" data-task="${getId}">

        <div class="task__info${completed ? ' item-opacity' : ''}">
            <p class="task__text">
                <span class="task__title" id="${getId}">${title}</span>
                <span class="task__fecha">${(dateDay < 10) ? '0' + dateDay : dateDay}/${(dateMonth < 10) ? '0' + dateMonth : dateMonth}/${date.getFullYear()}</span>
            </p>
        </div>

        <div class="task__buttons">

            <button class="btn ${completed ? 'btn--blue' : 'btn--green'} task__btn check" onclick="completeTask('${getId}')">
                <img src="./icons/done.png" class="icon" alt="terminar tarea">
            </button>

            <button class="btn btn-purple task__btn check" onclick="updateTask(${getId})">
                <img src="./icons/create.png" class="icon" alt="terminar tarea">
            </button>

            <button class="btn btn--red task__btn delete" onclick="removeTask('${getId}')">
                <img src="./icons/clear.png" class="icon" alt="eliminar tarea">
            </button>

        </div>
    </div>`;
}

function addTask(title) {
    const dateNow = new Date();
    const getId = (new Date()).getTime();
    taskContainer.insertAdjacentHTML('beforeend', templateTask(getId, title, dateNow, false));
    addTaskStorage(getId, title, dateNow, false);
}

function addTaskFromStorage(title, date, completed, id) {
    taskContainer.insertAdjacentHTML('beforeend', templateTask(id, title, date, completed));
}

function updateTask(id) {
    const taskText = document.getElementById(id);
    const taskTextUpdate = document.querySelector('#updateTask');
    const taskUpdateContent = document.querySelector('.update');

    const taskStorage = JSON.parse(localStorage.getItem(id));

    taskTextUpdate.value = taskText.innerText;
    taskTextUpdate.focus();

    const btnUpdate = document.querySelector('#btn-update');
    const btnUpdateCancel = document.querySelector('#btn-update-cancel');

    modalToggler(taskUpdateContent, true);

    btnUpdate.addEventListener('click', function updateTaskHandler() {
        const updateText = taskText.textContent = taskTextUpdate.value;
        taskStorage.title = updateText;
        localStorage.setItem(id, JSON.stringify(taskStorage));

        console.log('Hola');
        modalToggler(taskUpdateContent, false);

        // Remover el controlador de eventos después de ejecutarse una vez
        btnUpdate.removeEventListener('click', updateTaskHandler);
    }, { once: true });

    btnUpdateCancel.addEventListener('click', function () {
        modalToggler(taskUpdateContent, false);
    });
}

function modalToggler(modal, boolean) {
    return (boolean) ? modal.classList.add('modal--active') : modal.classList.remove('modal--active');
}


function addTaskStorage(id, title, date, completed) {

    const task = {
        'title': title,
        'date': date,
        'completed': completed,
        'isTask': true,
        'id': id
    };

    localStorage.setItem(id, JSON.stringify(task));

};

function removeTaskStorage(id) {

    localStorage.removeItem(id);

}

function completedTaskStorage(id) {
    const task = localStorage.getItem(id);
    const taskContent = JSON.parse(task);
    taskContent["completed"] = true;
    localStorage.setItem(id, JSON.stringify(taskContent));
}

function getTaskStorage() {
    const tasks = { ...localStorage };

    Object.values(tasks).forEach(task => {

        const { title, date, completed, isTask, id } = JSON.parse(task);

        if (isTask) { addTaskFromStorage(title, date, completed, id); }
        checkTasks();
    });
}

getTaskStorage();

function completedAllTask() {

    const tasks = { ...localStorage };

    Object.keys(tasks).forEach(task => {
        completeTask(task);
    });
}

function removeAllTask() {

    const tasks = { ...localStorage };

    Object.keys(tasks).forEach(task => {
        removeTask(task);
    });
}