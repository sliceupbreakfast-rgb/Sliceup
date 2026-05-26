/**
 * SliceUp Breakfast - Premium Interactive Menu
 * Highly optimized for dynamic content rendering, interactive modals, and vector print layout.
 */

// Allergen Configuration
const allergensConfig = {
  egg: {
    id: 'egg',
    name: 'Yumurta',
    icon: '🥚',
    class: 'allergen-egg',
    description: 'Yumurta ve yumurta ürünleri içerir.'
  },
  dairy: {
    id: 'dairy',
    name: 'İnek Sütü',
    icon: '🥛',
    class: 'allergen-dairy',
    description: 'İnek sütü, peynir, kaymak, tereyağı veya diğer süt ürünlerini içerir.'
  },
  gluten: {
    id: 'gluten',
    name: 'Gluten',
    icon: '🌾',
    class: 'allergen-gluten',
    description: 'Buğday, çavdar, yulaf veya diğer gluten içeren tahıllar barındırır.'
  },
  nuts: {
    id: 'nuts',
    name: 'Kuru yemiş',
    icon: '🥜',
    class: 'allergen-nuts',
    description: 'Ceviz, badem, fındık veya diğer sert kabuklu meyveler içerir.'
  },
  sesame: {
    id: 'sesame',
    name: 'Susam',
    icon: '◌',
    class: 'allergen-sesame',
    description: 'Susam ve susam ürünleri içerir.'
  }
};

// Salty Slices (Tuzlu Dilimler)
const saltySlices = [
  {
    id: 'salty-1',
    name: 'Ata Mirası',
    ingredients: 'İpeksi humus tabanı, çemensiz pastırma dilimleri, kavrulmuş file badem',
    story: 'Babamın Kayseri seyahatlerinden getirdiği o mis kokulu çemensiz pastırma, annemin elleriyle yaptığı ipeksi humus yatağında can bulurdu. Üzerine serptiğimiz çıtır bademlerle, her lokmada çocukluğumuzun bayram sabahlarına döneriz.',
    price: 450,
    allergens: ['gluten', 'nuts']
  },
  {
    id: 'salty-2',
    name: 'Edremit Esintisi',
    ingredients: 'Zeytin ezmesi, tarla domatesi, salatalık, tam yağlı beyaz peynir, taze kekik',
    story: 'Halamızın Edremit zeytinliğinden süzülen zeytinyağı ve ezme, bahçemizden gün ağarırken kopardığımız sulu domateslerle buluşurdu. Annem taze kekiği ovalarken, mutfağı çocukluğumuzun o tatlı telaşı kaplardı.',
    price: 450,
    allergens: ['dairy']
  },
  {
    id: 'salty-3',
    name: 'Pazar Avlusu',
    ingredients: 'Avokado sos, hindi füme, çırpılmış yumurta, krem peynir',
    story: 'Kardeşimizin mutfakta ilk kez şefliğe soyunduğu o unutulmaz Pazar sabahı... Geleneksel sofraya modern bir dokunuş katıp avokado sosu çırpılmış yumurta ve hindi füme ile birleştirmişti. O günden beri neşemiz oldu.',
    price: 450,
    allergens: ['egg', 'dairy']
  },
  {
    id: 'salty-4',
    name: 'Anne Eli Patlıcanlı',
    ingredients: 'Ev yapımı patlıcanlı kahvaltılık sos, Erzurum çeçil peyniri, ince kıyılmış maydanoz',
    story: 'Annemin her sonbahar kışa hazırlık için odun ateşinde közlediği o efsanevi patlıcan sosu... Erzurum\'dan gelen tel tel çeçil peyniri ve taze maydanozla birleştiğinde çocukluğumuzun sıcak soba başı kahvaltıları canlanır.',
    price: 450,
    allergens: ['dairy']
  },
  {
    id: 'salty-5',
    name: 'Bodrum Güneşi',
    ingredients: 'Avokado sos, zeytinyağda bekletilmiş kuru domates, Bodrum tulumu, çörek otu',
    story: 'Yaz tatillerinde Bodrum\'un dar sokaklarındaki o kahvaltıcıdan aldığımız tulum peynirinin lezzeti... Annemin zeytinyağı ve çörek otuyla dinlendirdiği kuru domateslerle birleştiğinde adeta yaz hiç bitmesin isterdik.',
    price: 450,
    allergens: ['dairy']
  },
  {
    id: 'salty-6',
    name: 'Trakya Esintisi',
    ingredients: 'Yeşil biberli lor kavurması, çeri domates, iri ceviz parçaları',
    story: 'Anneannem Trakya\'nın köy biberlerini tereyağında hafifçe çevirir, içine taze lor peynirini bırakırdı. Sobanın üzerinde çıtırdayan ekmeklerin üzerine sürdüğümüz o sıcak lor kavurması, çocukluğumuzun en büyük mutluluğuydu.',
    price: 450,
    allergens: ['dairy', 'nuts']
  },
  {
    id: 'salty-7',
    name: 'Balkon Bahçesi',
    ingredients: 'Ev yapımı fesleğenli pesto sos, çeri domates, bebek roka, taze mozerella',
    story: 'Evimizin küçük balkonundaki saksılardan ellerimizle topladığımız o mis kokulu fesleğenleri tahta havanda ezerek yaptığımız pesto sos... Taze mozzarella ve çıtır rokalarla tabakta adeta bir bahçe şöleni sunardı.',
    price: 450,
    allergens: ['dairy', 'nuts']
  }
];

// Sweet Slices (Tatlı Dilimler)
const sweetSlices = [
  {
    id: 'sweet-1',
    name: 'Yayla Esintisi',
    ingredients: 'Kaymak, süzme çiçek balı, iri ceviz parçaları',
    story: 'Dedemin Artvin yaylalarından binbir emekle getirdiği o hakiki süzme çiçek balı... Taze süt kaymağı ve cevizle buluştuğunda, çocukken kaşık kaşık yediğimiz en tatlı, en saf ödülümüzdü.',
    price: 450,
    allergens: ['dairy', 'nuts']
  },
  {
    id: 'sweet-2',
    name: 'Çocukluk Düşü',
    ingredients: 'Kaymak, Nutella, taze muz veya çilek dilimleri',
    story: 'Hafta sonu karnemizi getirdiğimizde ya da uslu durduğumuzda annemin bizi ödüllendirdiği o şımartan dilim... Çikolata ve kaymağın uyumu, taze çilek ve muzun kokusuyla birleştiğinde en saf çocukluk rüyamız olurdu.',
    price: 450,
    allergens: ['dairy', 'nuts']
  },
  {
    id: 'sweet-3',
    name: 'Kazan Dibi Reçeli',
    ingredients: 'French toast (tereyağında mühürlenmiş brioche ekmeği), ev yapımı mevsim reçelleri',
    story: 'Büyükannemin bahçeden topladığı vişneleri, incirleri bakır kazanlarda kaynatarak yaptığı o parlak reçeller... Tereyağında mühürlenmiş yumuşacık brioche ekmeğiyle birleştiğinde pazar sabahı ritüelimiz tamamlanırdı.',
    price: 450,
    allergens: ['egg', 'dairy', 'gluten']
  }
];

const jarDesserts = [];

// Extras (Ekstralar)
const extrasOptions = [
  { name: 'Çırpılmış yumurta', price: 450, allergen: 'egg' },
  { name: 'Bacon (domuz pastırması)', price: 450, allergen: null }
];

const hotDrinks = [];
const coldDrinks = [];

const MENU_STORAGE_KEY = 'sliceup-menu-data-v1';
let supabaseClient = null;

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function getAllMenuItems() {
  return [...saltySlices, ...sweetSlices, ...jarDesserts];
}

function getSupabaseClient() {
  const config = window.SLICEUP_SUPABASE_CONFIG || {};
  const hasConfig = config.url && config.anonKey && !config.url.includes('YOUR_SUPABASE') && !config.anonKey.includes('YOUR_SUPABASE');

  if (!hasConfig || !window.supabase) return null;
  if (!supabaseClient) supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  return supabaseClient;
}

function mapSupabaseItem(item) {
  return normalizeMenuItem({
    id: item.id,
    name: item.name,
    ingredients: item.ingredients,
    story: item.story,
    price: item.price,
    image: item.image_url || '',
    allergens: (item.menu_item_allergens || []).map(row => row.allergen_id)
  });
}

function mapSupabaseExtra(extra) {
  return normalizeExtraOption({
    id: extra.id,
    name: extra.name,
    price: extra.price,
    allergen: extra.allergen_id
  });
}

function mapSupabaseDrink(drink) {
  return normalizeDrinkOption({
    id: drink.id,
    name: drink.name,
    price: drink.price
  });
}

function normalizeMenuItem(item, fallback = {}) {
  const savedPrice = Number(item.price);
  const allergens = Array.isArray(item.allergens)
    ? item.allergens.filter(allergenId => allergensConfig[allergenId])
    : (fallback.allergens || []);

  return {
    id: String(item.id || fallback.id || `item-${Date.now()}`),
    name: String(item.name ?? fallback.name ?? ''),
    ingredients: String(item.ingredients ?? fallback.ingredients ?? ''),
    story: String(item.story ?? fallback.story ?? ''),
    price: Number.isFinite(savedPrice) ? savedPrice : (fallback.price || 0),
    allergens,
    image: item.image || fallback.image || ''
  };
}

function normalizeExtraOption(option, fallback = {}) {
  const savedPrice = Number(option.price);
  const allergen = allergensConfig[option.allergen] ? option.allergen : null;

  return {
    id: String(option.id || fallback.id || `extra-${Date.now()}`),
    name: String(option.name ?? fallback.name ?? ''),
    price: Number.isFinite(savedPrice) ? savedPrice : (fallback.price || 0),
    allergen
  };
}

function normalizeDrinkOption(option, fallback = {}) {
  const savedPrice = Number(option.price);

  return {
    id: String(option.id || fallback.id || `drink-${Date.now()}`),
    name: String(option.name ?? fallback.name ?? ''),
    price: Number.isFinite(savedPrice) ? savedPrice : (fallback.price || 0)
  };
}

function applySavedItems(targetItems, savedItems) {
  if (!Array.isArray(savedItems)) return;

  const normalizedItems = savedItems.map(savedItem => {
    const fallback = targetItems.find(item => item.id === savedItem.id) || {};
    return normalizeMenuItem(savedItem, fallback);
  });

  targetItems.splice(0, targetItems.length, ...normalizedItems);
}

function applySavedExtras(savedExtras) {
  if (!Array.isArray(savedExtras)) return;

  extrasOptions.splice(0, extrasOptions.length, ...savedExtras.map(normalizeExtraOption));
}

function applySavedDrinks(targetItems, savedDrinks) {
  if (!Array.isArray(savedDrinks)) return;

  targetItems.splice(0, targetItems.length, ...savedDrinks.map(normalizeDrinkOption));
}

async function loadSupabaseMenuData(client) {
  const [itemsResponse, extrasResponse, drinksResponse] = await Promise.all([
    client
      .from('menu_items')
      .select('id, category, name, ingredients, story, price, image_url, sort_order, is_active, menu_item_allergens(allergen_id)')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    client
      .from('extras')
      .select('id, name, price, allergen_id, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    client
      .from('drinks')
      .select('id, category, name, price, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
  ]);

  if (itemsResponse.error) throw itemsResponse.error;
  if (extrasResponse.error) throw extrasResponse.error;
  if (drinksResponse.error) throw drinksResponse.error;

  const saltyItems = itemsResponse.data.filter(item => item.category === 'salty').map(mapSupabaseItem);
  const sweetItems = itemsResponse.data.filter(item => item.category === 'sweet').map(mapSupabaseItem);
  const jarItems = itemsResponse.data.filter(item => item.category === 'jar').map(mapSupabaseItem);

  saltySlices.splice(0, saltySlices.length, ...saltyItems);
  sweetSlices.splice(0, sweetSlices.length, ...sweetItems);
  jarDesserts.splice(0, jarDesserts.length, ...jarItems);
  extrasOptions.splice(0, extrasOptions.length, ...extrasResponse.data.map(mapSupabaseExtra));
  hotDrinks.splice(0, hotDrinks.length, ...drinksResponse.data.filter(drink => drink.category === 'hot').map(mapSupabaseDrink));
  coldDrinks.splice(0, coldDrinks.length, ...drinksResponse.data.filter(drink => drink.category === 'cold').map(mapSupabaseDrink));
}

async function loadMenuData() {
  const client = getSupabaseClient();

  if (client) {
    try {
      await loadSupabaseMenuData(client);
      return;
    } catch (error) {
      console.warn('Supabase verisi yüklenemedi, yerel veri kullanılacak:', error.message);
    }
  }

  try {
    const savedData = JSON.parse(localStorage.getItem(MENU_STORAGE_KEY));
    if (!savedData) return;

    applySavedItems(saltySlices, savedData.saltySlices);
    applySavedItems(sweetSlices, savedData.sweetSlices);
    applySavedItems(jarDesserts, savedData.jarDesserts);
    applySavedExtras(savedData.extrasOptions);
    applySavedDrinks(hotDrinks, savedData.hotDrinks);
    applySavedDrinks(coldDrinks, savedData.coldDrinks);
  } catch (error) {
    localStorage.removeItem(MENU_STORAGE_KEY);
  }
}

function saveMenuData() {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify({
    saltySlices,
    sweetSlices,
    jarDesserts,
    extrasOptions,
    hotDrinks,
    coldDrinks
  }));
}

// Utility: Build Allergen HTML
function getAllergenBadgeHTML(allergenId) {
  const cfg = allergensConfig[allergenId];
  if (!cfg) return '';
  return `<span class="allergen-badge ${cfg.class}" title="${escapeHTML(cfg.name)}: ${escapeHTML(cfg.description)}">${escapeHTML(cfg.icon)}</span>`;
}

// Render Menu Section
function renderMenuSection(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => {
    const allergenBadges = (item.allergens || []).map(getAllergenBadgeHTML).join(' ');
    const imageHTML = item.image
      ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="menu-item-image">`
      : '';
    return `
      <div class="menu-item" data-id="${escapeHTML(item.id)}">
        ${imageHTML}
        <div class="menu-item-header">
          <h4 class="menu-item-name">${escapeHTML(item.name)}</h4>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${escapeHTML(item.price)}</span>
        </div>
        <div class="menu-item-body">
          <p class="menu-item-ingredients">${escapeHTML(item.ingredients)}</p>
          <div class="menu-item-allergens">${allergenBadges}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Extras Options
function renderExtrasOptions() {
  const container = document.getElementById('extras-options-container');
  if (!container) return;

  container.innerHTML = extrasOptions.map(option => {
    const icon = option.allergen ? getAllergenBadgeHTML(option.allergen) : '';
    return `
      <div class="option-row">
        <div class="option-left">
          <span>${escapeHTML(option.name)}</span>
          ${icon}
        </div>
        <span class="option-price">${escapeHTML(option.price)}</span>
      </div>
    `;
  }).join('');
}

function renderDrinkOptions(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(option => `
    <div class="option-row">
      <div class="option-left">
        <span>${escapeHTML(option.name)}</span>
      </div>
      <span class="option-price">${escapeHTML(option.price)}</span>
    </div>
  `).join('');
}

// Render Allergen Legend
function renderAllergenLegend() {
  const container = document.getElementById('allergen-legend-container');
  if (!container) return;

  container.innerHTML = Object.values(allergensConfig).map(cfg => `
    <div class="legend-item" title="${escapeHTML(cfg.description)}">
      <span class="legend-icon">${escapeHTML(cfg.icon)}</span>
      <span class="legend-text">${escapeHTML(cfg.name)}</span>
    </div>
  `).join('');
}

// Modal Interaction
const modal = document.getElementById('item-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalStory = document.getElementById('modal-story');
const modalIngredients = document.getElementById('modal-ingredients');
const modalPrice = document.getElementById('modal-price');
const modalAllergens = document.getElementById('modal-allergens');
const modalImage = document.getElementById('modal-image');

function openItemModal(itemId) {
  const allItems = getAllMenuItems();
  const item = allItems.find(i => i.id === itemId);
  if (!item) return;

  modalTitle.textContent = item.name;
  modalStory.textContent = item.story;
  modalIngredients.textContent = item.ingredients;
  modalPrice.textContent = `${item.price} ₺`;
  modalImage.hidden = !item.image;
  modalImage.src = item.image || '';
  modalImage.alt = item.image ? item.name : '';
  
  // Render allergens in modal
  if (item.allergens && item.allergens.length > 0) {
    modalAllergens.innerHTML = `
      <h5>Alerjen Bilgisi:</h5>
      <div class="modal-allergens-list">
        ${item.allergens.map(aId => {
          const cfg = allergensConfig[aId];
          if (!cfg) return '';
          return `
            <div class="modal-allergen-tag">
              <span class="tag-icon">${escapeHTML(cfg.icon)}</span>
              <span class="tag-label">${escapeHTML(cfg.name)}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
    modalAllergens.style.display = 'block';
  } else {
    modalAllergens.style.display = 'none';
  }

  // Open modal
  modal.classList.add('active');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeItemModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Unlock background scrolling
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  await loadMenuData();

  // Render components
  renderMenuSection(saltySlices, 'salty-slices');
  renderMenuSection(sweetSlices, 'sweet-slices');
  renderMenuSection(jarDesserts, 'jar-desserts');
  renderDrinkOptions(hotDrinks, 'hot-drinks-container');
  renderDrinkOptions(coldDrinks, 'cold-drinks-container');
  renderExtrasOptions();
  renderAllergenLegend();

  // Attach event listeners for menu item clicks
  document.querySelectorAll('.menu-section-grid').forEach(grid => {
    grid.addEventListener('click', (e) => {
      const itemEl = e.target.closest('.menu-item');
      if (itemEl) {
        const itemId = itemEl.getAttribute('data-id');
        openItemModal(itemId);
      }
    });
  });

  // Modal Close Events
  closeBtn.addEventListener('click', closeItemModal);
  modalOverlay.addEventListener('click', closeItemModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeItemModal();
    }
  });

  // Print Menu PDF Event
  const printBtn = document.getElementById('btn-print-pdf');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
