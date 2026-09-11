// Accessible, non-visual entry point into the same residents the 3D scene
// renders — keyboard and screen-reader users never need the canvas.

export function renderList(container, residents, onSelect) {
  container.replaceChildren();
  const buttons = new Map();

  for (const resident of residents) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${resident.name} — ${resident.summary}`;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => onSelect(resident.id));
    li.append(button);
    container.append(li);
    buttons.set(resident.id, button);
  }

  return {
    setActive(residentId) {
      for (const [id, button] of buttons) {
        button.setAttribute("aria-pressed", String(id === residentId));
      }
    },
  };
}
