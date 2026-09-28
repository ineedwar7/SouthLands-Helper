const cfg = window.SOUTH_LANDS_CONFIG || {};

const state = {
  type: "firearms",
  tier: cfg.wheelTiers?.[1] ?? cfg.wheelTiers?.[0] ?? "1.5",
  category: "all",
  search: "",
  spinning: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
  }[c]));
}

function itemPool() {
  return (cfg.items || []).filter(item =>
    item.type === state.type &&
    String(item.tier) === String(state.tier)
  );
}

function categoryName(id) {
  return cfg.categories?.find(c => c.id === id)?.name || id || "Uncategorized";
}

function tierInfo(item) {
  const defs = cfg.tierDefinitions || [];
  const exact = defs.find(t => String(t.id) === String(item.tier));
  return exact || defs[0] || { label: `Tier ${item.tier}`, color: "#777", damage: "—", role: "—" };
}

function tierLabel(tier) {
  const exact = (cfg.tierDefinitions || []).find(t => String(t.id) === String(tier));
  return exact?.label || `Tier ${tier}`;
}

function imageMarkup(item, cls = "item-image") {
  return `
    <div class="${cls}" style="--tier-color:${escapeHtml(tierColor(item))}">
      <img src="${escapeHtml(item.image || "")}" alt="${escapeHtml(item.label || item.name || item.code)}"
        onerror="this.parentElement.classList.add('image-missing');this.style.display='none'">
      <span class="image-fallback">${escapeHtml((item.label || item.code || "?").slice(0, 2).toUpperCase())}</span>
    </div>`;
}

function tierColor(item) {
  const colors = {
    gray: "#8b8b8b",
    green: "#35b93f",
    blue: "#168de2",
    purple: "#a73bd2",
    gold: "#d7ad22",
    yellow: "#e6d23c",
    orange: "#f05a28"
  };
  return colors[item.tierColor] || tierInfo(item).color || "#777";
}

function setupSite() {
  document.title = cfg.site?.name || "South Lands Helper";
  $("#siteTitle").textContent = cfg.site?.title || "South Lands V5 Illegal Area";
  $("#siteDescription").textContent = cfg.site?.description || "";
  $("#navLogo").src = cfg.site?.logo || "assets/logo.svg";
  $("#heroLogo").src = cfg.site?.logo || "assets/logo.svg";

  if (cfg.site?.heroBackground) {
    $("#heroBackground").style.backgroundImage =
      `linear-gradient(90deg, rgba(3,5,7,.96) 0%, rgba(3,5,7,.72) 42%, rgba(3,5,7,.90) 100%), url('${cfg.site.heroBackground}')`;
  }

  $("[data-nav-drugs]")?.addEventListener("click", () => {
    state.type = "drugs";
    state.category = "all";
    setActiveType();
    renderReel();
    renderCatalogFilters();
    renderCatalog();
    clearResult();
  });
}

function setActiveType() {
  $$("#typeTabs button").forEach(b => b.classList.toggle("active", b.dataset.type === state.type));
}

function renderTierTabs() {
  const wrap = $("#tierTabs");
  const tiers = cfg.wheelTiers || ["1", "1.5", "2"];
  wrap.innerHTML = tiers.map(tier => `
    <button data-tier="${escapeHtml(tier)}">${escapeHtml(tierLabel(tier).toUpperCase())}</button>
  `).join("");

  $$("#tierTabs button").forEach(btn => {
    btn.classList.toggle("active", String(btn.dataset.tier) === String(state.tier));
    btn.addEventListener("click", () => {
      state.tier = btn.dataset.tier;
      $$("#tierTabs button").forEach(b => b.classList.toggle("active", b === btn));
      renderReel();
      clearResult();
    });
  });
}

function setupTabs() {
  $$("#typeTabs button").forEach(btn => btn.addEventListener("click", () => {
    state.type = btn.dataset.type;
    state.category = "all";
    setActiveType();
    renderReel();
    renderCatalogFilters();
    renderCatalog();
    clearResult();
  }));

  renderTierTabs();
}

function renderReel() {
  const pool = itemPool();
  const reel = $("#reel");

  if (!pool.length) {
    reel.innerHTML = `<div class="empty-reel">No items are configured for ${escapeHtml(state.type)} • ${escapeHtml(tierLabel(state.tier))}.</div>`;
    return;
  }

  // Preview only. The actual random roll always returns ONE item.
  const preview = [...pool, ...pool].slice(0, Math.min(10, pool.length * 2));
  reel.innerHTML = preview.map(item => `
    <div class="reel-card">
      ${imageMarkup(item)}
      <strong>${escapeHtml(item.label || item.name || item.code)}</strong>
      <small>${escapeHtml(item.tierColor || tierLabel(item.tier))}</small>
    </div>
  `).join("");
}

function renderCatalogFilters() {
  const wrap = $("#categoryFilters");
  const cats = (cfg.categories || []).filter(c => c.type === state.type);

  wrap.innerHTML =
    `<button class="filter active" data-category="all">ALL</button>` +
    cats.map(cat =>
      `<button class="filter" data-category="${escapeHtml(cat.id)}">${escapeHtml(cat.name)}</button>`
    ).join("");

  $$("#categoryFilters .filter").forEach(btn => btn.addEventListener("click", () => {
    state.category = btn.dataset.category;
    $$("#categoryFilters .filter").forEach(b => b.classList.toggle("active", b === btn));
    renderCatalog();
  }));
}

function filteredCatalog() {
  const search = state.search.trim().toLowerCase();

  return (cfg.items || []).filter(item => {
    if (item.type !== state.type) return false;
    if (state.category !== "all" && item.category !== state.category) return false;

    if (!search) return true;

    const text = [
      item.label, item.name, item.code, item.ammo, item.rarity,
      item.category, categoryName(item.category), item.description,
      item.tier, tierLabel(item.tier)
    ].filter(Boolean).join(" ").toLowerCase();

    return text.includes(search);
  });
}

function renderCatalog() {
  const items = filteredCatalog();
  $("#catalogCount").textContent = `${items.length} ITEM${items.length === 1 ? "" : "S"}`;

  $("#catalogGrid").innerHTML = items.length ? items.map(item => {
    const info = tierInfo(item);
    const label = item.label || item.name || item.code;

    return `
      <article class="catalog-card">
        ${imageMarkup(item, "catalog-image")}
        <div class="catalog-info">
          <div class="catalog-name">${escapeHtml(label)}</div>
          <div class="catalog-code">${escapeHtml(item.code || "No spawn code")}</div>
          <div class="catalog-meta">
            <span class="tier-pill" style="--tier-color:${escapeHtml(tierColor(item))}">
              <i></i>${escapeHtml(tierLabel(item.tier))}
            </span>
            <span>${escapeHtml(item.ammo || "Ammo not configured")}</span>
          </div>
          ${item.description ? `<div class="catalog-description">${escapeHtml(item.description)}</div>` : ""}
          <div class="catalog-damage">Damage: ${escapeHtml(info.damage)}</div>
        </div>
      </article>`;
  }).join("") : `<div class="no-results">No items match your current filters.</div>`;
}

function renderTierLegend() {
  const wrap = $("#tierLegend");
  wrap.innerHTML = (cfg.tierDefinitions || []).map(tier => `
    <div class="tier-card">
      <div class="tier-color" style="--tier-color:${escapeHtml(tier.color)}"></div>
      <div class="tier-card-main">
        <strong>${escapeHtml(tier.label)}</strong>
        <span>${escapeHtml(tier.damage)} damage</span>
        <small>${escapeHtml(tier.role)}</small>
      </div>
    </div>
  `).join("");
}

function clearResult() {
  $("#resultPanel").hidden = true;
  $("#rollStatus").textContent = "Choose a type and tier, then roll.";
}

function rollRandom() {
  if (state.spinning) return;

  const pool = itemPool();

  if (!pool.length) {
    $("#rollStatus").textContent = "No items are configured for this selection.";
    return;
  }

  state.spinning = true;
  const button = $("#rollButton");
  button.disabled = true;
  $("#resultPanel").hidden = true;

  let ticks = 0;
  const maxTicks = 18;

  const timer = setInterval(() => {
    const preview = pool[Math.floor(Math.random() * pool.length)];
    $("#rollStatus").textContent =
      `SPINNING ${ticks + 1}/${maxTicks}... ${preview.label || preview.name || preview.code}`;
    ticks++;

    if (ticks >= maxTicks) {
      clearInterval(timer);

      // Exactly ONE winner.
      const winner = pool[Math.floor(Math.random() * pool.length)];

      showResult(winner);
      state.spinning = false;
      button.disabled = false;
    }
  }, 85);
}

function showResult(item) {
  const label = item.label || item.name || item.code;
  const info = tierInfo(item);

  $("#rollStatus").textContent = "DROP SELECTED — 1 ITEM";
  $("#resultPanel").hidden = false;

  $("#resultCard").innerHTML = `
    ${imageMarkup(item, "result-image")}
    <div class="result-copy">
      <span class="result-type">${escapeHtml(item.type === "drugs" ? "DRUG" : "FIREARM")}</span>
      <h3>${escapeHtml(label)}</h3>
      <div class="result-code">${escapeHtml(item.code || "No spawn code")}</div>
      <div class="result-meta">
        <span class="tier-pill" style="--tier-color:${escapeHtml(tierColor(item))}">
          <i></i>${escapeHtml(tierLabel(item.tier))}
        </span>
        <span>${escapeHtml(item.ammo || "Ammo not configured")}</span>
        <span>${escapeHtml(info.damage)} damage</span>
      </div>
      ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
    </div>
  `;

  $("#resultPanel").scrollIntoView({ behavior: "smooth", block: "center" });
}

$("#searchInput").addEventListener("input", e => {
  state.search = e.target.value;
  renderCatalog();
});

$("#rollButton").addEventListener("click", rollRandom);

setupSite();
setupTabs();
renderReel();
renderCatalogFilters();
renderCatalog();
renderTierLegend();
