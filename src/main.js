import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const toggleButton = document.querySelector(".header__toggle");
  const header = document.querySelector(".header");
  const logoImg = document.querySelector(".header__logo-img");
  const toggleIcon = document.querySelector(".header__toggle-icon");

  toggleButton.addEventListener("click", () => {
    const isOpen = header.classList.contains("overlay-active");
    header.classList.toggle("overlay-active");
    toggleButton.setAttribute("aria-expanded", !isOpen);

    logoImg.src = isOpen
      ? "/images/logo-bookmark.svg"
      : "/images/logo-bookmark-overlay.svg";
    toggleIcon.src = isOpen
      ? "/images/icon-hamburger.svg"
      : "/images/icon-close.svg";
    toggleIcon.alt = isOpen ? "Open Menu" : "Close Menu";
  });

  // Features swap
  const tabContainer = document.querySelector(".features__tabs");
  if (!tabContainer) return;

  const tabList = tabContainer.querySelector(".features__tab-list");
  const tabs = Array.from(tabList.querySelectorAll(".features__tab-btn"));
  const panels = tabContainer.querySelectorAll(".features__panel");

  function activateTab(selectedTab, tabIndex) {
    // Update tab states
    tabs.forEach((tab, index) => {
      const isActive = index === tabIndex;
      tab.classList.toggle("features__tab-btn--active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    // Update panel visibility
    panels.forEach((panel) => {
      const isActive = panel.id === selectedTab.getAttribute("aria-controls");
      panel.classList.toggle("features__panel--hidden", !isActive);
    });
  }

  // Attach event listeners
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(tab, index);
      tab.focus(); // Ensure focus moves on click for consistency
    });

    tab.addEventListener("keydown", (e) => {
      let newIndex = index;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          newIndex = (index + 1) % tabs.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          newIndex = (index - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          newIndex = 0;
          break;
        case "End":
          newIndex = tabs.length - 1;
          break;
        default:
          return; // Ignore other keys
      }

      e.preventDefault();
      tabs[newIndex].focus();
      activateTab(tabs[newIndex], newIndex);
    });
  });
});
