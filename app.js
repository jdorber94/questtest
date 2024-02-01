let tasks = [];
let xp = 0;

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (tasks.length < 10 && xp < 100) {
        let description = document.getElementById('task-input').value;
        tasks.push({description: description, xp: 10, completed: false});
        document.getElementById('task-input').value = '';
        updateTasks();
    }
});

function updateTasks() {
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
        let taskItem = document.createElement('li');
        taskItem.textContent = task.description;
        if (task.completed) {
            taskItem.classList.add('completed');
        } else {
            let completeButton = document.createElement('button');
            completeButton.textContent = '✔';
            completeButton.classList.add('complete-btn');
            completeButton.addEventListener('click', function() {
                tasks[index].completed = true;
                xp += tasks[index].xp;
                if (xp > 100) xp = 100;
                document.getElementById('xp').textContent = 'XP: ' + xp;
                updateTasks();
            });
            taskItem.appendChild(completeButton);
        }

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function() {
            if (tasks[index].completed) {
                xp -= tasks[index].xp;
                if (xp < 0) xp = 0;
            }
            tasks.splice(index, 1);
            document.getElementById('xp').textContent = 'XP: ' + xp;
            updateTasks();
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}