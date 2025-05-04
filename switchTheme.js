export function initThemeSwitcher() {
	const root = document.documentElement;
	const switchTheme = document.querySelector(".switchTheme");
	const label = document.getElementById("themeLabel");
	let isDark = false;

	if (!switchTheme || !label) return;

	switchTheme.addEventListener("click", () => {
		document.getElementById("earthToggle")?.classList.toggle("night");
		label.style.opacity = 0;

		setTimeout(() => {
			if (isDark) {
				root.style.setProperty("--bg-color", "#f5f3f0");
				root.style.setProperty("--card-bg", "#ffffff");
				root.style.setProperty("--text-color", "#3e3e3e");
				root.style.setProperty("--primary", "#a98467");
				root.style.setProperty("--primary-hover", "#8d6e63");
				root.style.setProperty("--input-bg", "#f2eae4");
				root.style.setProperty("--border-color", "#dcd4cd");
				root.style.setProperty("--item-complited-color", "#d4edda");
				label.textContent = "Day";
			} else {
				root.style.setProperty("--bg-color", "#2b2b28");
				root.style.setProperty("--card-bg", "#3c3c37");
				root.style.setProperty("--text-color", "#e0e0dc");
				root.style.setProperty("--primary", "#a98467");
				root.style.setProperty("--primary-hover", "#8d6e63");
				root.style.setProperty("--input-bg", "#4a4945");
				root.style.setProperty("--border-color", "#5c5a55");
				root.style.setProperty("--item-complited-color", "#074214");
				label.textContent = "Night";
			}

			label.style.opacity = 1;
			isDark = !isDark;
		}, 200);
	});
}

initThemeSwitcher();
