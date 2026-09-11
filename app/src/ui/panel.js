// Plain, accessible 2D detail panel. Everything shown here is also true
// without the 3D scene — the world is discovery, this panel is the record.

function row(dl, label, value) {
  if (!value) return;
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value;
  dl.append(dt, dd);
}

export function renderPanel(container, resident, stateLabel) {
  container.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = resident.name;
  container.append(heading);

  if (stateLabel) {
    const state = document.createElement("p");
    state.className = "state-line";
    state.textContent = `Currently: ${stateLabel}`;
    container.append(state);
  }

  const description = document.createElement("p");
  description.textContent = resident.description;
  container.append(description);

  const dl = document.createElement("dl");
  row(dl, "Domain", resident.domain);
  row(dl, "Collection", resident.collection);
  row(dl, "Version", resident.version);
  row(dl, "License", resident.license);
  row(dl, "Author", resident.author);
  row(dl, "Adapted from", resident.adaptedFrom);
  row(dl, "Source file", resident.sourcePath);
  container.append(dl);

  const actions = document.createElement("div");
  actions.className = "actions";

  const download = document.createElement("a");
  download.href = resident.markdownAsset;
  download.download = `${resident.id}-SKILL.md`;
  download.textContent = "Download SKILL.md";
  actions.append(download);

  const view = document.createElement("a");
  view.href = resident.markdownAsset;
  view.target = "_blank";
  view.rel = "noreferrer";
  view.className = "secondary";
  view.textContent = "Preview raw markdown";
  actions.append(view);

  const source = document.createElement("a");
  source.href = resident.sourceUrl;
  source.target = "_blank";
  source.rel = "noreferrer";
  source.className = "secondary";
  source.textContent = "View source on GitHub";
  actions.append(source);

  container.append(actions);
}

export function clearPanel(container) {
  container.replaceChildren();
  const empty = document.createElement("p");
  empty.id = "skill-panel-empty";
  empty.textContent = "Select a resident to see its skill details here.";
  container.append(empty);
}
