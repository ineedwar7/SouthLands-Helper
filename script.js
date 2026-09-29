const cfg = window.SOUTH_LANDS_CONFIG || {};

const state = {
  type: "firearms",
  tier: cfg.wheelTiers?.[0] ?? "1",
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

function currentWheelPool() {
  const pools = cfg.wheelPools || {};
  return pools[state.tier] || {
    label: tierLabel(state.tier),
    slotCount: 6,
    tiers: [state.tier]
  };
}

function itemPool() {
  const wheel = currentWheelPool();
  const allowedTiers = (wheel.tiers || [state.tier]).map(String);
  return (cfg.items || []).filter(item =>
    item.type === state.type && allowedTiers.includes(String(item.tier))
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
  const tiers = cfg.wheelTiers || ["1", "1.5", "2", "trial"];
  wrap.innerHTML = tiers.map(tier => {
    const pool = (cfg.wheelPools || {})[tier];
    const label = pool?.label || tierLabel(tier);
    const count = pool?.slotCount ?? 0;
    return `<button data-tier="${escapeHtml(tier)}">${escapeHtml(label.toUpperCase())}<small>${count} GUNS</small></button>`;
  }).join("");

  $$("#tierTabs button").forEach(btn => {
    btn.classList.toggle("active", String(btn.dataset.tier) === String(state.tier));
    btn.addEventListener("click", () => {
      state.tier = btn.dataset.tier;
      clearResult();
      $$("#tierTabs button").forEach(b => b.classList.toggle("active", b === btn));
      renderReel();
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
  const reel = $("#reel");
  const pool = itemPool();
  const wheel = currentWheelPool();
  const slotCount = Number(wheel.slotCount || 6);

  if (!pool.length) {
    reel.innerHTML = `<div class="empty-reel">No guns are configured for ${escapeHtml(wheel.label || tierLabel(state.tier))}. Add them in config.js.</div>`;
    return;
  }

  // The wheel always displays the configured number of gun slots.
  // If you have fewer configured guns, the remaining slots are visibly empty
  // instead of silently duplicating weapons.
  const slots = Array.from({ length: slotCount }, (_, index) => pool[index] || null);
  reel.innerHTML = slots.map((item, index) => {
    if (!item) {
      return `<div class="reel-card reel-empty"><span>${index + 1}</span><strong>EMPTY SLOT</strong><small>Add a gun</small></div>`;
    }
    return `
      <div class="reel-card" data-index="${index}">
        ${imageMarkup(item)}
        <strong>${escapeHtml(item.label || item.name || item.code)}</strong>
        <small>${escapeHtml(item.code || "")}</small>
      </div>`;
  }).join("");
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
  const wheel = currentWheelPool();

  if (!pool.length) {
    $("#rollStatus").textContent = `No guns are configured for ${wheel.label || tierLabel(state.tier)}.`;
    return;
  }

  state.spinning = true;
  const button = $("#rollButton");
  button.disabled = true;
  $("#resultPanel").hidden = true;

  const cards = $$("#reel .reel-card:not(.reel-empty)");
  const maxTicks = Math.max(18, Math.min(42, cards.length * 3));
  let ticks = 0;
  let currentIndex = 0;

  // Visually cycle through the actual guns on the wheel.
  const timer = setInterval(() => {
    cards.forEach(card => card.classList.remove("rolling"));
    if (cards.length) {
      const card = cards[currentIndex % cards.length];
      card.classList.add("rolling");
      const item = pool[currentIndex % pool.length];
      $("#rollStatus").textContent = `SPINNING ${ticks + 1}/${maxTicks}... ${item.label || item.name || item.code}`;
      currentIndex++;
    }

    ticks++;
    if (ticks >= maxTicks) {
      clearInterval(timer);
      cards.forEach(card => card.classList.remove("rolling"));

      // Exactly ONE winner. Clicking ROLL RANDOM again starts another roll.
      const winner = pool[Math.floor(Math.random() * pool.length)];
      const winnerIndex = pool.indexOf(winner);
      const winnerCard = cards[winnerIndex];
      if (winnerCard) winnerCard.classList.add("winner");

      showResult(winner);
      state.spinning = false;
      button.disabled = false;
    }
  }, 75);
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
