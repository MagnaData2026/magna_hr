console.log("Magna HR SPA JS loaded");

(function () {
	const HIDDEN_QUICK_LINKS = ["Claim an Expense", "Request an Advance", "View Salary Slips"];
	const HIDDEN_TABS = ["Expenses", "Salary"];

	function hideQuickLinks() {
		document.querySelectorAll("a").forEach((link) => {
			if (link.dataset.magnaHidden) return;
			const text = link.textContent.trim();

			if (HIDDEN_QUICK_LINKS.some((label) => text.includes(label))) {
				link.style.display = "none";
				link.dataset.magnaHidden = "true";
			}
		});
	}

	function hideBottomTabs() {
		document.querySelectorAll("ion-tab-button").forEach((tab) => {
			if (tab.dataset.magnaHidden) return;

			const text = tab.textContent.trim();

			if (HIDDEN_TABS.some((label) => text.includes(label))) {
				tab.style.display = "none";
				tab.dataset.magnaHidden = "true";
			}
		});
	}

	function applyHrmsCustomizations() {
		hideQuickLinks();
		hideBottomTabs();
	}

	const appRoot = document.getElementById("app") || document.body;
	const observer = new MutationObserver(applyHrmsCustomizations);

	observer.observe(appRoot, {
		childList: true,
		subtree: true,
	});

	applyHrmsCustomizations();
})();
