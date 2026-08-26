console.log("Magna HR SPA JS loaded");

// Hides HR self-service PWA sections not needed for this org, and rebrands leftover "Frappe HR" strings/logo that are hardcoded in the HRMS SPA bundle.

(function () {
	const HIDDEN_QUICK_LINKS = ["Claim an Expense", "Request an Advance", "View Salary Slips"];
	const HIDDEN_TABS = ["Expenses", "Salary"];
	const RENAME_MAP = {
		"Install Frappe HR": "Install Magna HR",
		"Login to Frappe HR": "Login to Magna HR",
		"Get the app on your iPhone for easy access & a better experience":
			"Get the app on your iPhone for easy access & a better experience",
	};
	const MAGNA_LOGO_SRC = "/assets/magna_hr/assets/logo.png";

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

	function renameStrings() {
		// Walk text nodes only, so we don't touch attributes/markup — just visible copy.
		const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
		let node;
		while ((node = walker.nextNode())) {
			const original = node.nodeValue;
			for (const [from, to] of Object.entries(RENAME_MAP)) {
				if (original.includes(from)) {
					node.nodeValue = original.replace(from, to);
				}
			}
		}
	}

	function swapLoginLogo() {
		document.querySelectorAll('svg[viewBox="0 0 117 117"]').forEach((svg) => {
			if (svg.dataset.magnaReplaced) return;
			const img = document.createElement("img");
			img.src = MAGNA_LOGO_SRC;
			img.style.height = "48px"; // fixed height, matches original's visual size
			img.style.width = "auto"; // width follows the image's natural aspect ratio
			img.style.objectFit = "contain";
			svg.replaceWith(img);
			img.dataset.magnaReplaced = "true";
		});
	}

	function applyHrmsCustomizations() {
		hideQuickLinks();
		hideBottomTabs();
		renameStrings();
		swapLoginLogo();
	}

	const appRoot = document.getElementById("app") || document.body;
	const observer = new MutationObserver(applyHrmsCustomizations);

	observer.observe(appRoot, {
		childList: true,
		subtree: true,
	});

	applyHrmsCustomizations();
})();
