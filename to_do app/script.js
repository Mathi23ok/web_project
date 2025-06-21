document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('.task_input');
    const addTaskButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const progressBar = document.getElementById('progress');
    const progressNumber = document.getElementById('numbers');

    function updateProgress() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumber.textContent = totalTasks ? `${completedTasks} / ${totalTasks}` : '0 / 0';
        // Fire confetti when all tasks are completed and there is at least one task
        if (totalTasks > 0 && completedTasks === totalTasks) {
            Confetti();
        }
    }

    function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        const taskId = `task-${Date.now()}`;
        li.innerHTML = `
            <input type="checkbox" class="checkbox" id="${taskId}">
            <label class="custom-checkbox" for="${taskId}"></label>
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        const checkbox = li.querySelector('.checkbox');
        const editButton = li.querySelector('.edit-button');
        const deleteButton = li.querySelector('.delete-button');
        const span = li.querySelector('span');

        // Edit task
        editButton.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = span.textContent;
                taskList.removeChild(li);
                updateProgress();
            }
        });

        // Complete task
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            if (checkbox.checked) {
                editButton.disabled = true;
                editButton.style.opacity = '0.5';
                editButton.style.pointerEvents = 'none';
            } else {
                editButton.disabled = false;
                editButton.style.opacity = '1';
                editButton.style.pointerEvents = 'auto';
            }
            updateProgress();
        });

        // Delete task
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            updateProgress();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateProgress();
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(event);
        }
    });

    updateProgress();
});

// Confetti function (requires canvas-confetti library)
function Confetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}