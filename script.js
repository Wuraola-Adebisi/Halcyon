const navControls = Array.from(document.querySelectorAll(".nav-toggle"))
  .map((toggle) => {
    const controlsId = toggle.getAttribute("aria-controls");
    const siteNav = controlsId
      ? document.getElementById(controlsId)
      : toggle.closest("header")?.querySelector("nav");

    if (!siteNav) {
      return null;
    }

    return { toggle, siteNav };
  })
  .filter(Boolean);

function setMenuState(toggle, siteNav, isOpen) {
  siteNav.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function closeAllMenus() {
  navControls.forEach(({ toggle, siteNav }) => {
    setMenuState(toggle, siteNav, false);
  });
}

navControls.forEach(({ toggle, siteNav }) => {
  toggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.contains("is-open");
    setMenuState(toggle, siteNav, !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(toggle, siteNav, false);
    });
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeAllMenus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllMenus();
  }
});

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card[data-tags]");
const emptyState = document.querySelector(".projects-empty");

function setActiveFilter(selectedButton) {
  const selectedFilter = selectedButton.dataset.filter;
  let visibleCount = 0;

  filterButtons.forEach((button) => {
    const isActive = button === selectedButton;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  projectCards.forEach((card) => {
    const tags = card.dataset.tags.split(/\s+/);
    const shouldShow =
      selectedFilter === "all" || tags.includes(selectedFilter);

    card.classList.toggle("is-hidden", !shouldShow);
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveFilter(button));
});
