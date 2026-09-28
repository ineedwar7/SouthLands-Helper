const weapons = [
  ["Glock 23","pistols",1,"Common"],["Glock 45","pistols",1,"Common"],["G45SS","pistols",1,"Common"],
  ["Olive G19","pistols",1,"Common"],["G48","pistols",1,"Common"],["Glock 20","pistols",1,"Common"],
  ["P88P","pistols",1,"Common"],["Olive 17","pistols",1,"Common"],["Colt 1911","pistols",1,"Common"],
  ["Glock 26 Switch","pistols",1.5,"Common"],["Glock 40","pistols",1.5,"Common"],["ARP 5","smg",1.5,"Common"],
  ["Binary AR-Pistol","smg",1.5,"Common"],["Glock 21B","pistols",1.5,"Common"],["Black Micro Draco","smg",1.5,"Common"],
  ["Olive Draco","smg",1.5,"Common"],["Glock 19x","pistols",1.5,"Common"],["Micro Draco","smg",1.5,"Common"],
  ["M4","rifles",2,"Rare"],["AK-47","rifles",2,"Rare"],["Mossberg","shotguns",2,"Rare"],["Combat Shotgun","shotguns",2,"Rare"],
  ["Glock 34","pistols",2,"Rare"],["AR-15","rifles",2,"Rare"],["Draco","rifles",2,"Rare"],["Heavy Pistol","pistols",2,"Rare"]
];
const drugs = [
  ["Weed","drugs",1,"Common"],["Blue Dream","drugs",1,"Common"],["Cocaine","drugs",1.5,"Common"],
  ["Crack","drugs",1.5,"Common"],["Meth","drugs",2,"Rare"],["Lean","drugs",2,"Rare"]
];

const skills = {
  faction: [
    ["Nametags",3,"Enables viewing nametags above players. Must be in a faction for /mark.","Faction","Vision utility"],
    ["Improvement",5,"Allows faction members to add an additional slot to their vehicles.","Faction","Vehicle utility"],
    ["Taser Resistance",7,"Reduces taser impact duration for trained members.","Faction","Combat"],
    ["Tackle Cover",7,"Adds access to additional faction utility options.","Faction","Utility"],
    ["Vehicle Tracker",10,"Unlocks additional tracking tools for faction members.","Faction","Tracking"]
  ],
  civilian: [
    ["Mechanic Basics",2,"Unlocks basic vehicle maintenance knowledge.","Civilian","Vehicle"],
    ["First Aid",4,"Unlocks basic first-aid utility.","Civilian","Support"],
    ["Street Knowledge",6,"Improves access to civilian route information.","Civilian","Utility"],
    ["Negotiation",8,"Unlocks additional civilian interaction options.","Civilian","Social"]
  ],
  illegal: [
    ["Street Contacts",2,"Unlocks additional illegal route contacts.","Illegal","Contacts"],
    ["Hidden Storage",5,"Unlocks access to hidden storage information.","Illegal","Storage"],
    ["Counter-Surveillance",8,"Adds tools for avoiding unwanted attention.","Illegal","Utility"],
    ["Advanced Trade",10,"Unlocks advanced trade route information.","Illegal","Trading"]
  ]
};

let currentType = "firearms";
let currentTier = 1;
let currentCategory = "all";

function artSvg(name) {
  const isDrug = ["Weed","Blue Dream","Cocaine","Crack","Meth","Lean"].includes(name);
  const label = isDrug ? "SL" : "SL";
  return `<svg viewBox="0 0 100 100" aria-label="${name}">
    <defs><linearGradient id="g${name.replace(/\W/g,'')}" x1="0" x2="1"><stop stop-color="#c69a52"/><stop offset="1" stop-color="#5b3f20"/></linearGradient></defs>
    <circle cx="50" cy="50" r="36" fill="#11161b" stroke="url(#g${name.replace(/\W/g,'')})" stroke-width="3"/>
    <path d="M25 58 Q50 38 75 58 Q52 68 25 58Z" fill="none" stroke="#b88748" stroke-width="4"/>
    <text x="50" y="49" text-anchor="middle" fill="#d5d9dc" font-size="14" font-weight="900">${label}</text>
    <text x="50" y="76" text-anchor="middle" fill="#aab0b5" font-size="7" font-weight="700">SOUTH LANDS</text>
  </svg>`;
}

function listForWheel() {
  return (currentType === "firearms" ? weapons : drugs).filter(x => x[2] === currentTier).slice(0,9);
}

function renderWheel() {
  const list = listForWheel();
  const el = document.querySelector("#wheel-items");
  el.innerHTML = list.map((w,i) => `<div class="wheel-card" data-index="${i}">
    <div class="item-art">${artSvg(w[0])}</div>
    <strong>${w[0]}</strong><span>${w[3]}</span>
  </div>`).join("");
  if (!list.length) el.innerHTML = `<div class="panel" style="grid-column:1/-1">No items are configured for this tier yet.</div>`;
}

function renderSkills(kind="faction") {
  const list = skills[kind];
  document.querySelector("#skill-title").textContent =
    kind === "faction" ? "Faction skill tree" : kind === "civilian" ? "Civilian skill tree" : "Illegal civilian skill tree";
  document.querySelector("#skill-count").textContent = `${list.length} skills listed`;
  document.querySelector("#skill-list").innerHTML = list.map(x => `<div class="skill-row">
    <div class="unlock">Unlock<b>${x[1]}</b></div>
    <div><h3>${x[0]}</h3><p>${x[2]}</p><div class="tags"><span>${x[3]}</span><span>${x[4]}</span></div></div>
  </div>`).join("");
}

function renderCatalog() {
  const query = document.querySelector("#search").value.toLowerCase().trim();
  const all = [...weapons, ...drugs];
  const list = all.filter(x =>
    (currentCategory === "all" || x[1] === currentCategory) &&
    (!query || x[0].toLowerCase().includes(query) || x[1].includes(query))
  );
  document.querySelector("#catalog-grid").innerHTML = list.map(x => `<article class="catalog-card">
    <div class="item-art">${artSvg(x[0])}</div>
    <div class="card-top"><h3>${x[0]}</h3><span class="badge">Tier ${x[2]}</span></div>
    <p>Reliable ${x[1]} item for South Lands roleplay. Configure the final item description, image, price, and availability in this catalog.</p>
    <div class="card-actions"><button>Learn more</button><button>Find nearby</button></div>
  </article>`).join("");
}

document.querySelectorAll("#catalog-type button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll("#catalog-type button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); currentType = btn.dataset.type; renderWheel();
}));
document.querySelectorAll("#tier-filter button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll("#tier-filter button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); currentTier = Number(btn.dataset.tier); renderWheel();
}));
document.querySelectorAll(".skill-tabs button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".skill-tabs button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); renderSkills(btn.dataset.skill);
}));
document.querySelectorAll(".catalog-filters button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".catalog-filters button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active"); currentCategory = btn.dataset.category; renderCatalog();
}));
document.querySelector("#search").addEventListener("input", renderCatalog);

document.querySelector("#roll-btn").addEventListener("click", () => {
  const list = listForWheel();
  if (!list.length) return;
  const btn = document.querySelector("#roll-btn");
  btn.disabled = true;
  const cards = [...document.querySelectorAll(".wheel-card")];
  let tick = 0, final = Math.floor(Math.random() * cards.length);
  const timer = setInterval(() => {
    cards.forEach(c => c.classList.remove("selected"));
    cards[(tick++) % cards.length]?.classList.add("selected");
    if (tick > 10 + final) {
      clearInterval(timer);
      cards[final]?.classList.add("selected");
      btn.disabled = false;
      btn.textContent = "↻  ROLL AGAIN";
      const result = [...list].sort(() => Math.random() - .5).slice(0,3);
      document.querySelector("#drop-results").classList.remove("hidden");
      document.querySelector("#result-grid").innerHTML = result.map((w,i)=>`
        <div class="result-card"><div class="small-label">WEAPON ${i+1}</div>
          <div class="item-art">${artSvg(w[0])}</div><h3>${w[0]} <span class="badge">${w[3]}</span></h3>
          <p>Light ${w[1]} option for roleplay use. Customize this description when you add your server's exact stats.</p>
        </div>`).join("");
      document.querySelector("#drop-results").scrollIntoView({behavior:"smooth", block:"center"});
    }
  }, 90);
});

renderWheel();
renderSkills();
renderCatalog();
