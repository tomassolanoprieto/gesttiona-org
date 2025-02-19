export function scrollToTop(smooth = true) {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export function navigateAndScroll(navigate: (path: string) => void, path: string) {
  navigate(path);
  // Small delay to ensure navigation completes before scrolling
  requestAnimationFrame(() => {
    scrollToTop();
  });
}