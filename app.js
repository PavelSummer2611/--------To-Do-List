import {
	addTask,
	deleteTask,
	toggleTaskCompletion,
	updateTaskTitle,
	saveTasksToLocalStorage,
} from "./tasks.js";
import { renderTasks } from "./render.js";
import { filterTasks } from "./filter.js";
import {
	handleDragStart,
	handleDragOver,
	handleDrop,
	handleDragEnd,
} from "./dragAndDrop.js";
import { initThemeSwitcher } from "./switchTheme.js";

const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const todoFilter = document.querySelector(".todo-filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", function (event) {
	event.preventDefault();
	const taskText = taskInput.value.trim();
	if (taskText !== "") {
		tasks = addTask(taskText, tasks);
		renderTasks(tasks, taskList);
		taskInput.value = "";
		saveTasksToLocalStorage(tasks);
	}
});

taskList.addEventListener("click", function (e) {
	const item = e.target.closest("li");
	if (!item) return;
	const taskId = Number(item.getAttribute("data-id"));

	if (e.target.classList.contains("complete-btn")) {
		tasks = toggleTaskCompletion(taskId, tasks);
		renderTasks(tasks, taskList);
		saveTasksToLocalStorage(tasks);
	}
	if (e.target.classList.contains("delete-btn")) {
		tasks = deleteTask(taskId, tasks);
		renderTasks(tasks, taskList);
		saveTasksToLocalStorage(tasks);
	}
});

todoFilter.addEventListener("click", function (event) {
	const filter = event.target.value;
	const allLi = document.querySelectorAll(".task-item");
	filterTasks(filter, allLi);
});

taskList.addEventListener("dblclick", function (e) {
	const item = e.target.closest("li");
	if (!item) return;
	if (e.target.tagName.toLowerCase() === "button") return;
	const taskId = Number(item.getAttribute("data-id"));
	const task = tasks.find((t) => t.id === taskId);
	if (!task) return;

	const span = item.querySelector("span");
	const input = document.createElement("input");
	input.type = "text";
	input.value = task.title;
	input.className = "edit-input";
	item.replaceChild(input, span);
	input.focus();

	input.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			const newTitle = input.value.trim();
			tasks = updateTaskTitle(taskId, newTitle, tasks);
			saveTasksToLocalStorage(tasks);
			renderTasks(tasks, taskList);
		}
	});
	input.addEventListener("blur", function () {
		const newTitle = input.value.trim();
		tasks = updateTaskTitle(taskId, newTitle, tasks);
		saveTasksToLocalStorage(tasks);
		renderTasks(tasks, taskList);
	});
});

taskList.addEventListener("dragstart", handleDragStart);
taskList.addEventListener("dragover", handleDragOver);
taskList.addEventListener("drop", function () {
	tasks = handleDrop(taskList, tasks);
	saveTasksToLocalStorage(tasks);
	renderTasks(tasks, taskList);
});
taskList.addEventListener("dragend", handleDragEnd);

renderTasks(tasks, taskList);
