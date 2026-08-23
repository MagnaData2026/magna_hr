import "./switcher/theme_manager";
import "./switcher/theme_switcher";

console.log("Magna HR Desk JS loaded");

$(document).on("app_ready", function () {
	const observer = new MutationObserver((mutations) => {
		$(".frappe-menu.context-menu .dropdown-menu-item").each(function () {
			let itemText = $(this).find(".menu-item-title").text().trim();
			if (itemText === "About" || itemText === "Frappe Support") {
				$(this).remove();
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
});
