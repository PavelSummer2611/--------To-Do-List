export function addTask(taskText, tasks) {
	const task = {
		id: Date.now(),
		title: taskText,
		completed: false,
	};
	tasks.push(task);
	return tasks;
}

export function deleteTask(taskId, tasks) {
	return tasks.filter((t) => t.id !== taskId);
}

export function toggleTaskCompletion(taskId, tasks) {
	const task = tasks.find((t) => t.id === taskId);
	if (task) {
		task.completed = !task.completed;
	}
	return tasks;
}

export function updateTaskTitle(taskId, newTitle, tasks) {
	const task = tasks.find((t) => t.id === taskId);
	if (task && newTitle.trim() !== "") {
		task.title = newTitle;
	}
	return tasks;
}

export function saveTasksToLocalStorage(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}
