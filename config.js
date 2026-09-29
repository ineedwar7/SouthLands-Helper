// ============================================================
// SOUTH LANDS HELPER CONFIG
// ============================================================
// Add/edit your content here. The website reads this file automatically.
// Image paths are case-sensitive on GitHub Pages.

window.SOUTH_LANDS_CONFIG = {
  "site": {
    "name": "South Lands Helper",
    "title": "South Lands V5 Illegal Area",
    "description": "Browse supply drops and all firearms and drugs South Lands has to offer.",
    "logo": "assets/logo.svg",
    "heroBackground": "",
    "accent": "#e5e5e5"
  },
  "categories": [
    {
      "id": "pistols",
      "name": "Pistols",
      "type": "firearms"
    },
    {
      "id": "smgs",
      "name": "SMGs",
      "type": "firearms"
    },
    {
      "id": "rifles",
      "name": "Rifles",
      "type": "firearms"
    },
    {
      "id": "shotguns",
      "name": "Shotguns",
      "type": "firearms"
    },
    {
      "id": "snipers",
      "name": "Snipers",
      "type": "firearms"
    },
    {
      "id": "special",
      "name": "Special",
      "type": "firearms"
    },
    {
      "id": "halloween",
      "name": "Halloween",
      "type": "firearms"
    },
    {
      "id": "drugs",
      "name": "Drugs",
      "type": "drugs"
    }
  ],
  "wheelTiers": [
    "1",
    "1.5",
    "2",
    "trial"
  ],
  "wheelPools": {
    "1": {
      "label": "Tier 1",
      "slotCount": 6,
      "tiers": ["1"]
    },
    "1.5": {
      "label": "Tier 1.5",
      "slotCount": 12,
      "tiers": ["1.5"]
    },
    "2": {
      "label": "Tier 2",
      "slotCount": 24,
      "tiers": ["2"]
    },
    "trial": {
      "label": "Trial Drops",
      "slotCount": 3,
      "tiers": ["trial"]
    }
  },
  "tierDefinitions": [
    {
      "id": "trial",
      "label": "Trial",
      "color": "#8b8b8b",
      "damage": "18–22",
      "role": "Basic / trial-drop weapons"
    },
    {
      "id": "1",
      "label": "Tier 1",
      "color": "#35b93f",
      "damage": "24–28",
      "role": "Common upgraded weapons"
    },
    {
      "id": "1-blue",
      "label": "Tier 1 • Blue",
      "color": "#168de2",
      "damage": "28–32",
      "role": "Better Tier 1 weapons"
    },
    {
      "id": "1.5",
      "label": "Tier 1.5",
      "color": "#a73bd2",
      "damage": "33–37",
      "role": "Rare weapons"
    },
    {
      "id": "1.5-gold",
      "label": "Tier 1.5 • Gold",
      "color": "#d7ad22",
      "damage": "37–41",
      "role": "High-tier rare weapons"
    },
    {
      "id": "2",
      "label": "Tier 2",
      "color": "#e6d23c",
      "damage": "42–48",
      "role": "Elite / hardest-to-get weapons"
    }
  ],
  "items": [
    {
      "code": "WEAPON_G41",
      "label": "G 41",
      "category": "halloween",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-45",
      "description": "",
      "image": "assets/weapons/WEAPON_G41.png",
      "tierColor": "orange"
    },
    {
      "code": "WEAPON_G40C",
      "label": "G 40 Custom",
      "category": "halloween",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-10",
      "description": "Custom G 40",
      "image": "assets/weapons/WEAPON_G40C.png",
      "tierColor": "orange"
    },
    {
      "code": "WEAPON_G40MOS",
      "label": "G 40 MOS",
      "category": "halloween",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-10",
      "description": "",
      "image": "assets/weapons/WEAPON_G40MOS.png",
      "tierColor": "orange"
    },
    {
      "code": "WEAPON_C556ARP",
      "label": "Arpistol 5.56",
      "category": "halloween",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-rifle",
      "description": "Custom Automatic 556 Arpistol",
      "image": "assets/weapons/WEAPON_C556ARP.png",
      "tierColor": "orange"
    },
    {
      "code": "WEAPON_G34",
      "label": "G 34 Switch",
      "category": "halloween",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-10",
      "description": "Custom Automatic G 40",
      "image": "assets/weapons/WEAPON_G34.png",
      "tierColor": "orange"
    },
    {
      "code": "WEAPON_XDS9",
      "label": "XDS-9",
      "category": "pistols",
      "type": "firearms",
      "tier": "trial",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_XDS9.png",
      "tierColor": "gray"
    },
    {
      "code": "WEAPON_RARP",
      "label": "Red Arpistol",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-rifle",
      "description": "",
      "image": "assets/weapons/WEAPON_RARP.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_KALASHNIKOVAK47",
      "label": "Kalashnikov AK-47",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-rifle",
      "description": "",
      "image": "assets/weapons/WEAPON_KALASHNIKOVAK47.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G45SOPAL",
      "label": "G45 (Opal)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "Opal switch.",
      "image": "assets/weapons/WEAPON_G45SOPAL.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_G45SGEN5",
      "label": "G45 (Gen 5)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "Black switch.",
      "image": "assets/weapons/WEAPON_G45SGEN5.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_G45S",
      "label": "G45",
      "category": "pistols",
      "type": "firearms",
      "tier": "2",
      "ammo": "ammo-9",
      "description": "Orange switch.",
      "image": "assets/weapons/WEAPON_G45S.png",
      "tierColor": "yellow"
    },
    {
      "code": "WEAPON_G40",
      "label": "G40",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-10",
      "description": "",
      "image": "assets/weapons/WEAPON_G40.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_G2C",
      "label": "G2C",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G2C.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_G23SGEN5",
      "label": "G23 (Gen 5)",
      "category": "pistols",
      "type": "firearms",
      "tier": "2",
      "ammo": "ammo-40",
      "description": "Red switch.",
      "image": "assets/weapons/WEAPON_G23SGEN5.png",
      "tierColor": "yellow"
    },
    {
      "code": "WEAPON_G21MOS",
      "label": "G21 MOS",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-45",
      "description": "",
      "image": "assets/weapons/WEAPON_G21MOS.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_G20SGOLD",
      "label": "G20",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-10",
      "description": "Gold switch.",
      "image": "assets/weapons/WEAPON_G20SGOLD.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G19XC",
      "label": "G19X (Custom)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G19XC.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G19X",
      "label": "G19X",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G19X.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_G19SO",
      "label": "G19",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "Orange switch.",
      "image": "assets/weapons/WEAPON_G19SO.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G19SG4",
      "label": "G19 (Gen 4)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G19SG4.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G19FRT",
      "label": "G19 FRT",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G19FRT.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G17GEN5",
      "label": "G17 (Gen 5)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G17GEN5.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_FNX45C",
      "label": "FNX-45 (Custom)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-45",
      "description": "",
      "image": "assets/weapons/WEAPON_FNX45C.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_G17C",
      "label": "G17 (Custom)",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_G17C.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_19X",
      "label": "G19X",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-9",
      "description": "",
      "image": "assets/weapons/WEAPON_19X.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_CDRACO",
      "label": "Draco",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "ammo-rifle2",
      "description": "",
      "image": "assets/weapons/WEAPON_CDRACO.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_5INARP",
      "label": "Five Inch Arpistol",
      "category": "rifles",
      "type": "firearms",
      "tier": "1",
      "ammo": "ammo-rifle",
      "description": "",
      "image": "assets/weapons/WEAPON_5INARP.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_TEC9",
      "label": "TEC-9",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_TEC9.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_P80P",
      "label": "P80",
      "category": "pistols",
      "type": "firearms",
      "tier": "trial",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_P80P.png",
      "tierColor": "gray"
    },
    {
      "code": "WEAPON_SIGCPG",
      "label": "SIG CP",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_SIGCPG.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_OLIVEG19",
      "label": "Olive G19",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_OLIVEG19.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_MGLOCK19",
      "label": "M Glock 19",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_MGLOCK19.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_OLIVE17",
      "label": "Olive G17",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_OLIVE17.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_MCX",
      "label": "MCX",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_MCX.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_KVC",
      "label": "KVC",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_KVC.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_MAC10",
      "label": "MAC-10",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_MAC10.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_HK45",
      "label": "HK45",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_HK45.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_G43C",
      "label": "G43C",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G43C.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_G26S",
      "label": "G26S",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G26S.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G23",
      "label": "G23",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G23.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_G20S",
      "label": "G20S",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G20S.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_G17G5",
      "label": "G17 G5",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G17G5.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_G19G",
      "label": "G19 G",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_G19G.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_DRACOZ",
      "label": "Draco Z",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_DRACOZ.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_DRACO2",
      "label": "Draco 2",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_DRACO2.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_CPT",
      "label": "CPT",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_CPT.png",
      "tierColor": "green"
    },
    {
      "code": "WEAPON_CALLOUS",
      "label": "Callous",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_CALLOUS.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_CANIK",
      "label": "Canik",
      "category": "pistols",
      "type": "firearms",
      "tier": "trial",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_CANIK.png",
      "tierColor": "gray"
    },
    {
      "code": "WEAPON_ARPSH",
      "label": "ARPSH",
      "category": "rifles",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_ARPSH.png",
      "tierColor": "gold"
    },
    {
      "code": "WEAPON_45MOS",
      "label": "45 MOS",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_45MOS.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_AP3",
      "label": "AP3",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_AP3.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_19SWITCH",
      "label": "19 Switch",
      "category": "pistols",
      "type": "firearms",
      "tier": "1.5",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_19SWITCH.png",
      "tierColor": "purple"
    },
    {
      "code": "WEAPON_43MOS",
      "label": "43 MOS",
      "category": "pistols",
      "type": "firearms",
      "tier": "1",
      "ammo": "",
      "description": "",
      "image": "assets/weapons/WEAPON_43MOS.png",
      "tierColor": "blue"
    },
    {
      "code": "WEAPON_PAINTBALL",
      "label": "Paint Ball",
      "category": "special",
      "type": "firearms",
      "tier": "1",
      "ammo": "paintballs",
      "description": "",
      "image": "assets/weapons/WEAPON_PAINTBALL.png",
      "tierColor": "purple"
    }
  ]
};
