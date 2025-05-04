export function filterTasks(filter, allLi) {
	allLi.forEach((li) => {
		li.classList.remove("hideTask");
		if (filter === "completed" && !li.classList.contains("completed")) {
			li.classList.add("hideTask");
		}
		if (filter === "pending" && li.classList.contains("completed")) {
			li.classList.add("hideTask");
		}
	});
}
