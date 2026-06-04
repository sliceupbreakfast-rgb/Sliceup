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
  { name: 'Bacon (domuz pastırması)', price: 450, allergen: null },
  { name: 'Hindi Füme (iki dilim)', price: 160, allergen: null },
  { name: 'Füme Et "Dana Cotto" (iki dilim)', price: 240, allergen: null },
  { name: 'Çemensiz Pastırma (iki dilim)', price: 220, allergen: null },
  { name: 'Tam Yağlı Beyaz Peynir / Çeçil Peyniri / Bodrum Tulum Peyniri (iki dilim)', price: 150, allergen: 'dairy' },
  { name: 'Domates, Salatalık Söğüş', price: 75, allergen: null },
  { name: 'Zeytin Salatası (yeşil, siyah, ızgara zeytinler ve kuru domates)', price: 75, allergen: null },
  { name: 'Bal / Reçel / Nutella', price: 100, allergen: null },
  { name: 'Brioche Ekmeği / Karabuğday Ekmeği (Glutensiz)', price: 50, allergen: 'gluten' }
];

const hotDrinks = [];
const coldDrinks = [];

const defaultBreadPanel = {
  title: 'Ekmeğimiz',
  slogan: 'Ateşin ve Sabrın Çıtır Eseri: Her Dilimde Yaşayan Gerçek Ekşi Maya Kokusu',
  description1: 'Taş değirmende öğütülen unlarla, uzun fermantasyon süreciyle ve geleneksel yöntemlerle hazırlanır. Dışı çıtır, içi yoğun aromalı ve doğal dokusuyla gerçek köy ekmeği lezzetini sunar.',
  description2: 'Katkı maddesi içermez. Sindirim dostu yapısı ve güçlü aromasıyla kahvaltılardan ana yemeklere kadar her sofraya yakışır.',
  items: [
    { icon: '🔥', text: 'Günlük taze çıkar.' },
    { icon: '🍞', text: 'Doğal ekşi maya ile fermente edilir.' },
    { icon: '🌾', text: 'Geleneksel köy usulü üretim.' }
  ]
};

const MENU_STORAGE_KEY = 'sliceup-menu-data-v1';
const VIEW_OPTIONS_STORAGE_KEY = 'sliceup-view-options-v1';
const LANGUAGE_STORAGE_KEY = 'sliceup-language';
const MENU_ITEM_SELECT = 'id, category, name, ingredients, story, price, image_url, sort_order, is_active, menu_item_allergens(allergen_id)';
const MENU_ITEM_SELECT_WITH_ENGLISH = 'id, category, name, ingredients, ingredients_english, story, story_english, price, image_url, sort_order, is_active, menu_item_allergens(allergen_id)';
let supabaseClient = null;
let breadPanel = structuredClone(defaultBreadPanel);
let headerImageUrl = '';
let supportsEnglishIngredients = true;
let currentLanguage = 'tr';

const translations = {
  saltyTitle: { tr: 'Tuzlu Dilimler', en: 'Salty Slices' },
  saltyNote: { tr: 'Tuzlu dilimlerimiz zeytinli yeşil salata ile servis edilmektedir.', en: 'Our savory slices are served with a green salad with olives.' },
  sweetTitle: { tr: 'Tatlı Dilimler', en: 'Sweet Slices' },
  jarTitle: { tr: 'Kavanoz Tatlılar', en: 'Jar Desserts' },
  extrasTitle: { tr: 'İlave etmek ister misiniz?', en: 'Would you like to add anything?' },
  hotDrinksTitle: { tr: 'Sıcak İçecekler', en: 'Hot Drinks' },
  coldDrinksTitle: { tr: 'Soğuk İçecekler', en: 'Cold Drinks' },
  allergenAlert: { tr: 'Alerjen Uyarısı', en: 'Allergen Alert' },
  storyHeading: { tr: 'Hikayemiz:', en: 'Product Story / Details' },
  ingredientsHeading: { tr: 'İçindekiler:', en: 'Indegridients:' }
};

const allergenNameTranslations = {
  egg: { en: 'Eggs' },
  dairy: { en: "Cow's Milk" },
  gluten: { en: 'Gluten' },
  nuts: { en: 'Nuts' },
  sesame: { en: 'Sesame' }
};

const viewOptions = {
  showImages: false,
  showBread: true
};

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function formatPrice(price) {
  return `${String(price ?? '').replace(/\s*₺\s*$/, '')} ₺`;
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

function isMissingEnglishIngredientsColumn(error) {
  return /ingredients_english|story_english/i.test(`${error?.message || ''} ${error?.details || ''}`);
}

function mapSupabaseItem(item) {
  return normalizeMenuItem({
    id: item.id,
    name: item.name,
    ingredients: item.ingredients,
    ingredients_en: item.ingredients_english,
    story: item.story,
    story_english: item.story_english,
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
    drink_name: drink.drink_name,
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
    ingredients_en: String(item.ingredients_english ?? item.indegridients ?? item.ingredients_en ?? item.ingredientsEn ?? fallback.ingredients_english ?? fallback.indegridients ?? fallback.ingredients_en ?? fallback.ingredientsEn ?? ''),
    story: String(item.story ?? fallback.story ?? ''),
    story_english: String(item.story_english ?? item.storyEnglish ?? fallback.story_english ?? fallback.storyEnglish ?? ''),
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
    drink_name: String(option.drink_name ?? option.drinkName ?? fallback.drink_name ?? fallback.drinkName ?? ''),
    price: Number.isFinite(savedPrice) ? savedPrice : (fallback.price || 0)
  };
}

function normalizeBreadPanel(panel = {}, items = []) {
  const normalizedItems = Array.isArray(items)
    ? items.slice(0, 3).map((item, index) => ({
      icon: String(item.icon || defaultBreadPanel.items[index]?.icon || ''),
      text: String(item.text || defaultBreadPanel.items[index]?.text || '')
    }))
    : [];

  return {
    title: String(panel.title || defaultBreadPanel.title),
    slogan: String(panel.slogan || defaultBreadPanel.slogan),
    description1: String(panel.description1 || panel.description_1 || defaultBreadPanel.description1),
    description2: String(panel.description2 || panel.description_2 || defaultBreadPanel.description2),
    items: normalizedItems.length === 3 ? normalizedItems : structuredClone(defaultBreadPanel.items)
  };
}

function getCSSImageUrl(url) {
  return `url("${String(url).replace(/"/g, '%22')}")`;
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
  const menuItemsQuery = select => client
    .from('menu_items')
    .select(select)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  let [itemsResponse, extrasResponse, drinksResponse] = await Promise.all([
    menuItemsQuery(MENU_ITEM_SELECT_WITH_ENGLISH),
    client
      .from('extras')
      .select('id, name, price, allergen_id, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true }),
    client
      .from('drinks')
      .select('id, category, name, drink_name, price, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
  ]);

  if (itemsResponse.error && isMissingEnglishIngredientsColumn(itemsResponse.error)) {
    supportsEnglishIngredients = false;
    itemsResponse = await menuItemsQuery(MENU_ITEM_SELECT);
  } else {
    supportsEnglishIngredients = true;
  }

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

async function loadSupabaseViewOptions(client) {
  const [panelResponse, itemsResponse] = await Promise.all([
    client
      .from('bread_panel')
      .select('title, slogan, description_1, description_2, is_active')
      .limit(1),
    client
      .from('bread_panel_items')
      .select('icon, text, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
  ]);

  if (panelResponse.error || itemsResponse.error) {
    console.warn('Ekmeğimiz ayarları yüklenemedi:', panelResponse.error?.message || itemsResponse.error?.message);
    return;
  }

  viewOptions.showBread = panelResponse.data.length > 0 && panelResponse.data.some(row => row.is_active);
  if (panelResponse.data.length > 0) breadPanel = normalizeBreadPanel(panelResponse.data[0], itemsResponse.data);
  saveViewOptions();
}

async function loadSupabaseHeaderImage(client) {
  const response = await client
    .from('menu_header')
    .select('image_url, is_active')
    .limit(1);

  if (response.error) {
    console.warn('Üst menü görseli yüklenemedi:', response.error.message);
    return;
  }

  const row = response.data[0];
  headerImageUrl = row?.is_active ? (row.image_url || '') : '';
}

async function loadMenuData() {
  const client = getSupabaseClient();
  let supabaseMenuLoaded = false;

  if (client) {
    try {
      await loadSupabaseMenuData(client);
      supabaseMenuLoaded = true;
    } catch (error) {
      console.warn('Supabase menü verisi yüklenemedi, yerel veri kullanılacak:', error.message);
    }

    if (supabaseMenuLoaded) {
      await Promise.allSettled([
        loadSupabaseViewOptions(client),
        loadSupabaseHeaderImage(client)
      ]);
      return;
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
    if (savedData.breadPanel) breadPanel = normalizeBreadPanel(savedData.breadPanel, savedData.breadPanel.items);
    headerImageUrl = String(savedData.headerImageUrl || '');
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
    coldDrinks,
    breadPanel,
    headerImageUrl
  }));
}

function applyHeaderImage() {
  document.querySelectorAll('.menu-header').forEach(header => {
    header.style.backgroundImage = headerImageUrl ? getCSSImageUrl(headerImageUrl) : 'none';
  });
}

function loadViewOptions() {
  try {
    const savedOptions = JSON.parse(localStorage.getItem(VIEW_OPTIONS_STORAGE_KEY));
    if (!savedOptions) return;

    if (typeof savedOptions.showImages === 'boolean') viewOptions.showImages = savedOptions.showImages;
    if (typeof savedOptions.showBread === 'boolean') viewOptions.showBread = savedOptions.showBread;
  } catch (error) {
    localStorage.removeItem(VIEW_OPTIONS_STORAGE_KEY);
  }
}

function saveViewOptions() {
  localStorage.setItem(VIEW_OPTIONS_STORAGE_KEY, JSON.stringify(viewOptions));
}

function loadLanguage() {
  currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'tr';
}

function saveLanguage() {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'tr';
  document.querySelectorAll('[data-i18n-key]').forEach(element => {
    const translation = translations[element.dataset.i18nKey]?.[currentLanguage];
    if (translation) element.textContent = translation;
  });

  document.querySelectorAll('.language-toggle').forEach(button => {
    button.textContent = currentLanguage === 'en' ? 'Türkçe Menü' : 'English Menu';
    button.setAttribute('aria-pressed', currentLanguage === 'en' ? 'true' : 'false');
  });
}

function setupLanguageToggle() {
  document.querySelectorAll('.language-toggle').forEach(button => {
    button.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
      saveLanguage();
      renderMenuSections();
      renderDrinkOptions(hotDrinks, 'hot-drinks-container');
      renderDrinkOptions(coldDrinks, 'cold-drinks-container');
      renderAllergenLegend();
      applyLanguage();
      if (modal.classList.contains('active') && modal.dataset.itemId) openItemModal(modal.dataset.itemId);
    });
  });
}

function getLocalizedIngredients(item) {
  return currentLanguage === 'en' ? (item.ingredients_en || '') : item.ingredients;
}

function getLocalizedStory(item) {
  return currentLanguage === 'en' ? (item.story_english || '') : item.story;
}

function getLocalizedDrinkName(drink) {
  return currentLanguage === 'en' ? (drink.drink_name || '') : drink.name;
}

function getLocalizedAllergenName(cfg) {
  return currentLanguage === 'en' ? (allergenNameTranslations[cfg.id]?.en || cfg.name) : cfg.name;
}

function applyViewOptions() {
  document.body.classList.toggle('menu-images-hidden', !viewOptions.showImages);

  const imagesToggle = document.getElementById('toggle-menu-images');
  if (imagesToggle) imagesToggle.checked = viewOptions.showImages;

  const breadToggle = document.getElementById('toggle-bread-section');
  if (breadToggle) breadToggle.checked = viewOptions.showBread;

  const breadSection = document.getElementById('bread-section');
  if (breadSection) breadSection.hidden = !viewOptions.showBread;
}

function setupViewControls() {
  const imagesToggle = document.getElementById('toggle-menu-images');
  const breadToggle = document.getElementById('toggle-bread-section');

  if (imagesToggle) {
    imagesToggle.addEventListener('change', () => {
      viewOptions.showImages = imagesToggle.checked;
      applyViewOptions();
      saveViewOptions();
    });
  }

  if (breadToggle) {
    breadToggle.addEventListener('change', () => {
      viewOptions.showBread = breadToggle.checked;
      applyViewOptions();
      saveViewOptions();
    });
  }
}

function setupViewOptionSync() {
  window.addEventListener('storage', event => {
    if (event.key === VIEW_OPTIONS_STORAGE_KEY) {
      loadViewOptions();
      applyViewOptions();
      return;
    }

    if (event.key === MENU_STORAGE_KEY) {
      try {
        const savedData = JSON.parse(event.newValue);
        headerImageUrl = String(savedData?.headerImageUrl || '');
        applyHeaderImage();
      } catch (error) {
        headerImageUrl = '';
        applyHeaderImage();
      }
    }
  });
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
    const ingredients = getLocalizedIngredients(item);
    const ingredientsClass = currentLanguage === 'en' ? 'menu-item-ingredients menu-item-ingredients-en' : 'menu-item-ingredients';
    const imageHTML = item.image
      ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="menu-item-image">`
      : '';
    return `
      <div class="menu-item" data-id="${escapeHTML(item.id)}">
        ${imageHTML}
        <div class="menu-item-header">
          <h4 class="menu-item-name">${escapeHTML(item.name)}</h4>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${escapeHTML(formatPrice(item.price))}</span>
        </div>
        <div class="menu-item-body">
          <div class="menu-item-ingredients-group">
            <p class="${ingredientsClass}">${escapeHTML(ingredients)}</p>
          </div>
          <div class="menu-item-allergens">${allergenBadges}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderMenuSections() {
  renderMenuSection(saltySlices, 'salty-slices');
  renderMenuSection(sweetSlices, 'sweet-slices');
  renderMenuSection(jarDesserts, 'jar-desserts');
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
        <span class="option-price">${escapeHTML(formatPrice(option.price))}</span>
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
        <span>${escapeHTML(getLocalizedDrinkName(option))}</span>
      </div>
      <span class="option-price">${escapeHTML(formatPrice(option.price))}</span>
    </div>
  `).join('');
}

function renderBreadPanel() {
  const section = document.getElementById('bread-section');
  if (!section) return;

  const title = section.querySelector('.column-title');
  const card = section.querySelector('.bread-story-card');
  if (title) title.textContent = breadPanel.title;
  if (!card) return;

  card.innerHTML = `
    <h4 class="bread-slogan">${escapeHTML(breadPanel.slogan)}</h4>
    <p class="bread-desc">${escapeHTML(breadPanel.description1)}</p>
    <p class="bread-desc">${escapeHTML(breadPanel.description2)}</p>
    <ul class="bread-bullet-list">
      ${breadPanel.items.map(item => `
        <li><span class="bullet-icon">${escapeHTML(item.icon)}</span> ${escapeHTML(item.text)}</li>
      `).join('')}
    </ul>
  `;
}

// Render Allergen Legend
function renderAllergenLegend() {
  const container = document.getElementById('allergen-legend-container');
  if (!container) return;

  container.innerHTML = Object.values(allergensConfig).map(cfg => `
    <div class="legend-item" title="${escapeHTML(cfg.description)}">
      <span class="legend-icon">${escapeHTML(cfg.icon)}</span>
      <span class="legend-text">${escapeHTML(getLocalizedAllergenName(cfg))}</span>
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

  modal.dataset.itemId = itemId;
  modalTitle.textContent = item.name;
  modalStory.textContent = getLocalizedStory(item);
  modalIngredients.textContent = getLocalizedIngredients(item);
  modalPrice.textContent = formatPrice(item.price);
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
              <span class="tag-label">${escapeHTML(getLocalizedAllergenName(cfg))}</span>
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
  delete modal.dataset.itemId;
  document.body.style.overflow = ''; // Unlock background scrolling
}

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  loadViewOptions();
  loadLanguage();
  await loadMenuData();

  // Render components
  renderMenuSections();
  renderDrinkOptions(hotDrinks, 'hot-drinks-container');
  renderDrinkOptions(coldDrinks, 'cold-drinks-container');
  renderExtrasOptions();
  renderBreadPanel();
  renderAllergenLegend();
  applyHeaderImage();
  applyViewOptions();
  applyLanguage();
  setupViewControls();
  setupLanguageToggle();
  setupViewOptionSync();

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

  // Print Menu PDF Event (if button exists)
  const printBtn = document.getElementById('btn-print-pdf');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Auto-print if requested from Admin Panel
  if (window.location.search.includes('print=true')) {
    // Wait slightly for dynamic content and images to load before opening print dialog
    setTimeout(() => {
      window.print();
    }, 1500);
  }
});
