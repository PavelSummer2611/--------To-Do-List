export function handleDragStart(event) {
	const li = event.target.closest("li");
	if (li) {
		li.classList.add("dragging");
	}
}

export function handleDragOver(event) {
	event.preventDefault();

	const draggingEl = document.querySelector(".dragging");
	const targetLi = event.target.closest("li");

	if (!targetLi || targetLi === draggingEl) return;

	const bounding = targetLi.getBoundingClientRect();
	const offset = event.clientY - bounding.top;

	if (offset < bounding.height / 2) {
		targetLi.parentNode.insertBefore(draggingEl, targetLi);
	} else {
		targetLi.parentNode.insertBefore(draggingEl, targetLi.nextSibling);
	}
}

export function handleDrop(taskList, tasks) {
	const newOrder = [...taskList.querySelectorAll("li")].map((li) =>
		Number(li.getAttribute("data-id"))
	);
	const reorderedTasks = newOrder.map((id) => tasks.find((t) => t.id === id));
	localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
	return reorderedTasks;
}

export function handleDragEnd(event) {
	const li = event.target.closest("li");
	if (li) li.classList.remove("dragging");
}
