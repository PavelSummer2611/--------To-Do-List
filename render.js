export function renderTasks(tasks, taskList) {
	taskList.innerHTML = "";
	tasks.forEach((task) => {
		const li = document.createElement("li");
		li.className = "task-item";
		li.setAttribute("data-id", task.id);
		li.setAttribute("draggable", "true");
		li.classList.toggle("completed", task.completed);
		li.innerHTML = `
          <span>${task.title}</span>
          <div class="task-item-button">
            <button class="complete-btn">✔</button>
            <button class="delete-btn">✘</button>
          </div>
        `;
		taskList.appendChild(li);
	});
}
