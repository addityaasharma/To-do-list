const container = document.getElementById('todoContainer');
    const header = document.getElementById('todoHeader');
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');

    // Dragging logic
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - container.offsetLeft;
        offsetY = e.clientY - container.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            container.style.left = `${e.clientX - offsetX}px`;
            container.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    // service worker
    
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
        console.log('Service Worker Registered');
    });
    }


    // To-Do logic
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            const task = document.createElement('li');
            task.className = 'todo-item';
            task.innerHTML = `
                <span>${input.value.trim()}</span>
                <button onclick="deleteTask(this)">x</button>
            `;
            task.addEventListener('click', () => {
                task.classList.toggle('completed');
            });
            list.appendChild(task);
            input.value = '';
        }
    });

    window.deleteTask = (btn) => {
        btn.parentElement.remove();
    };