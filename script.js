const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("header nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

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
