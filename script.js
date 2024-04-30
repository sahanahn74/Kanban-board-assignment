document.addEventListener('DOMContentLoaded', function () {
    const todoColumn = document.getElementById('todo');
    const inProgressColumn = document.getElementById('inprogress');
    const doneColumn = document.getElementById('done');

    todoColumn.addEventListener('dragover', allowDrop);
    inProgressColumn.addEventListener('dragover', allowDrop);
    doneColumn.addEventListener('dragover', allowDrop);

    todoColumn.addEventListener('drop', drop);
    inProgressColumn.addEventListener('drop', drop);
    doneColumn.addEventListener('drop', drop);

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const taskElement = document.getElementById(data);
        const targetColumnId = event.target.parentNode.id;

        if (targetColumnId === 'todo' || targetColumnId === 'inprogress' || targetColumnId === 'done') {
            event.target.appendChild(taskElement);
        }
    }
});

function addTask(columnId) {
    const inputId = `newTask${columnId.charAt(0).toUpperCase() + columnId.slice(1)}`;
    const inputValue = document.getElementById(inputId).value.trim();

    if (!inputValue) return;

    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.textContent = inputValue;
    taskElement.draggable = true;
    taskElement.setAttribute('ondragstart', 'drag(event)');
    taskElement.setAttribute('onclick', 'editTask(this)');
    taskElement.setAttribute('id', `task${Date.now()}`);

    const column = document.getElementById(`${columnId}-tasks`);
    column.appendChild(taskElement);

    document.getElementById(inputId).value = '';
}

function editTask(taskElement) {
    const newText = prompt('Edit task:', taskElement.textContent);
    if (newText !== null) {
        taskElement.textContent = newText;
    }
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}
