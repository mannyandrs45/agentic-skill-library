import { Engine } from "./core/engine.js";
import { createGarden } from "./world/garden.js";
import { createGrillMeStation, animateStation } from "./world/station.js";
import { REST_POSITION, WANDER_RADIUS } from "./world/layout.js";
import { Resident, domainAccentColor } from "./residents/resident.js";
import { renderPanel, clearPanel } from "./ui/panel.js";
import { renderList } from "./ui/list.js";
import worldManifest from "./generated/residents.json";

const sceneContainer = document.getElementById("scene-container");
const panelContainer = document.getElementById("skill-panel");
const listContainer = document.getElementById("skill-list-items");

const engine = new Engine(sceneContainer);
engine.scene.add(createGarden());

const [firstResidentData] = worldManifest.residents;
const station = createGrillMeStation(domainAccentColor(firstResidentData?.domain));
engine.scene.add(station);
engine.onUpdate((_delta, elapsed) => animateStation(station, elapsed));

const residents = worldManifest.residents.map((data) => {
  const resident = new Resident(data, {
    worldSeed: worldManifest.worldSeed,
    restPosition: REST_POSITION,
    wanderRadius: WANDER_RADIUS,
    workAnchor: station.userData.workAnchor,
  });
  engine.scene.add(resident.mesh);
  engine.registerSelectable(resident.mesh);
  resident.update(0); // correct static pose even if the loop never runs (reduced motion)
  return resident;
});
const residentsById = new Map(residents.map((r) => [r.data.id, r]));

clearPanel(panelContainer);
let selectedId = null;
let lastPanelState = null;

function selectResident(id) {
  const resident = residentsById.get(id);
  if (!resident) return;
  if (selectedId && selectedId !== id) residentsById.get(selectedId)?.setSelected(false);
  resident.setSelected(true);
  selectedId = id;
  lastPanelState = resident.stateLabel;
  renderPanel(panelContainer, resident.data, resident.stateLabel);
  listController.setActive(id);
  engine.renderOnce();
}

engine.onSelect = selectResident;

const listController = renderList(listContainer, worldManifest.residents, selectResident);

engine.onUpdate((_delta, elapsed) => {
  for (const resident of residents) {
    resident.update(elapsed);
    if (resident.data.id === selectedId && resident.stateLabel !== lastPanelState) {
      lastPanelState = resident.stateLabel;
      renderPanel(panelContainer, resident.data, resident.stateLabel);
      listController.setActive(selectedId);
    }
  }
});

engine.start();
