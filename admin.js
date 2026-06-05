const MENU_STORAGE_KEY = 'sliceup-menu-data-v1';
const VIEW_OPTIONS_STORAGE_KEY = 'sliceup-view-options-v1';
const LANGUAGE_STORAGE_KEY = 'sliceup-language';
const ADMIN_SESSION_KEY = 'sliceup-admin-session';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const STORAGE_BUCKET = 'menu-images';
const HEADER_STORAGE_BUCKET = 'menu-header-images';
const MENU_ITEM_SELECT = 'id, category, name, ingredients, story, price, image_url, sort_order, is_active, menu_item_allergens(allergen_id)';
const MENU_ITEM_SELECT_WITH_ENGLISH = 'id, category, name, ingredients, ingredients_english, story, story_english, price, image_url, sort_order, is_active, menu_item_allergens(allergen_id)';
const EXTRAS_SELECT = 'id, name, price, allergen_id, sort_order, is_active';
const EXTRAS_SELECT_WITH_ENGLISH = 'id, name, extra_name, price, allergen_id, sort_order, is_active';

const allergensConfig = {
  egg: { id: 'egg', name: 'Yumurta', icon: '🥚', class: 'allergen-egg', description: 'Yumurta ve yumurta ürünleri içerir.' },
  dairy: { id: 'dairy', name: 'İnek Sütü', icon: '🥛', class: 'allergen-dairy', description: 'İnek sütü, peynir, kaymak, tereyağı veya diğer süt ürünlerini içerir.' },
  gluten: { id: 'gluten', name: 'Gluten', icon: '🌾', class: 'allergen-gluten', description: 'Buğday, çavdar, yulaf veya diğer gluten içeren tahıllar barındırır.' },
  nuts: { id: 'nuts', name: 'Kuru yemiş', icon: '🥜', class: 'allergen-nuts', description: 'Ceviz, badem, fındık veya diğer sert kabuklu meyveler içerir.' },
  sesame: { id: 'sesame', name: 'Susam', icon: '◌', class: 'allergen-sesame', description: 'Susam ve susam ürünleri içerir.' }
};

const defaultMenuData = {
  saltySlices: [
    { id: 'salty-1', name: 'Ata Mirası', ingredients: 'İpeksi humus tabanı, çemensiz pastırma dilimleri, kavrulmuş file badem', story: 'Babamın Kayseri seyahatlerinden getirdiği o mis kokulu çemensiz pastırma, annemin elleriyle yaptığı ipeksi humus yatağında can bulurdu. Üzerine serptiğimiz çıtır bademlerle, her lokmada çocukluğumuzun bayram sabahlarına döneriz.', price: 450, allergens: ['gluten', 'nuts'], image: '' },
    { id: 'salty-2', name: 'Edremit Esintisi', ingredients: 'Zeytin ezmesi, tarla domatesi, salatalık, tam yağlı beyaz peynir, taze kekik', story: 'Halamızın Edremit zeytinliğinden süzülen zeytinyağı ve ezme, bahçemizden gün ağarırken kopardığımız sulu domateslerle buluşurdu. Annem taze kekiği ovalarken, mutfağı çocukluğumuzun o tatlı telaşı kaplardı.', price: 450, allergens: ['dairy'], image: '' },
    { id: 'salty-3', name: 'Pazar Avlusu', ingredients: 'Avokado sos, hindi füme, çırpılmış yumurta, krem peynir', story: 'Kardeşimizin mutfakta ilk kez şefliğe soyunduğu o unutulmaz Pazar sabahı... Geleneksel sofraya modern bir dokunuş katıp avokado sosu çırpılmış yumurta ve hindi füme ile birleştirmişti. O günden beri neşemiz oldu.', price: 450, allergens: ['egg', 'dairy'], image: '' },
    { id: 'salty-4', name: 'Anne Eli Patlıcanlı', ingredients: 'Ev yapımı patlıcanlı kahvaltılık sos, Erzurum çeçil peyniri, ince kıyılmış maydanoz', story: 'Annemin her sonbahar kışa hazırlık için odun ateşinde közlediği o efsanevi patlıcan sosu... Erzurum\'dan gelen tel tel çeçil peyniri ve taze maydanozla birleştiğinde çocukluğumuzun sıcak soba başı kahvaltıları canlanır.', price: 450, allergens: ['dairy'], image: '' },
    { id: 'salty-5', name: 'Bodrum Güneşi', ingredients: 'Avokado sos, zeytinyağda bekletilmiş kuru domates, Bodrum tulumu, çörek otu', story: 'Yaz tatillerinde Bodrum\'un dar sokaklarındaki o kahvaltıcıdan aldığımız tulum peynirinin lezzeti... Annemin zeytinyağı ve çörek otuyla dinlendirdiği kuru domateslerle birleştiğinde adeta yaz hiç bitmesin isterdik.', price: 450, allergens: ['dairy'], image: '' },
    { id: 'salty-6', name: 'Trakya Esintisi', ingredients: 'Yeşil biberli lor kavurması, çeri domates, iri ceviz parçaları', story: 'Anneannem Trakya\'nın köy biberlerini tereyağında hafifçe çevirir, içine taze lor peynirini bırakırdı. Sobanın üzerinde çıtırdayan ekmeklerin üzerine sürdüğümüz o sıcak lor kavurması, çocukluğumuzun en büyük mutluluğuydu.', price: 450, allergens: ['dairy', 'nuts'], image: '' },
    { id: 'salty-7', name: 'Balkon Bahçesi', ingredients: 'Ev yapımı fesleğenli pesto sos, çeri domates, bebek roka, taze mozerella', story: 'Evimizin küçük balkonundaki saksılardan ellerimizle topladığımız o mis kokulu fesleğenleri tahta havanda ezerek yaptığımız pesto sos... Taze mozzarella ve çıtır rokalarla tabakta adeta bir bahçe şöleni sunardı.', price: 450, allergens: ['dairy', 'nuts'], image: '' }
  ],
  sweetSlices: [
    { id: 'sweet-1', name: 'Yayla Esintisi', ingredients: 'Kaymak, süzme çiçek balı, iri ceviz parçaları', story: 'Dedemin Artvin yaylalarından binbir emekle getirdiği o hakiki süzme çiçek balı... Taze süt kaymağı ve cevizle buluştuğunda, çocukken kaşık kaşık yediğimiz en tatlı, en saf ödülümüzdü.', price: 450, allergens: ['dairy', 'nuts'], image: '' },
    { id: 'sweet-2', name: 'Çocukluk Düşü', ingredients: 'Kaymak, Nutella, taze muz veya çilek dilimleri', story: 'Hafta sonu karnemizi getirdiğimizde ya da uslu durduğumuzda annemin bizi ödüllendirdiği o şımartan dilim... Çikolata ve kaymağın uyumu, taze çilek ve muzun kokusuyla birleştiğinde en saf çocukluk rüyamız olurdu.', price: 450, allergens: ['dairy', 'nuts'], image: '' },
    { id: 'sweet-3', name: 'Kazan Dibi Reçeli', ingredients: 'French toast (tereyağında mühürlenmiş brioche ekmeği), ev yapımı mevsim reçelleri', story: 'Büyükannemin bahçeden topladığı vişneleri, incirleri bakır kazanlarda kaynatarak yaptığı o parlak reçeller... Tereyağında mühürlenmiş yumuşacık brioche ekmeğiyle birleştiğinde pazar sabahı ritüelimiz tamamlanırdı.', price: 450, allergens: ['egg', 'dairy', 'gluten'], image: '' }
  ],
  jarDesserts: [],
  extrasOptions: [
    { id: 'extra-1', name: 'Çırpılmış yumurta', price: 450, allergen: 'egg' },
    { id: 'extra-2', name: 'Bacon (domuz pastırması)', price: 450, allergen: null }
  ],
  hotDrinks: [],
  coldDrinks: []
};

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

const BREAD_PANEL_ITEM_IDS = [
  '00000000-0000-0000-0000-000000000401',
  '00000000-0000-0000-0000-000000000402',
  '00000000-0000-0000-0000-000000000403'
];

let menuData = structuredClone(defaultMenuData);
let breadPanel = structuredClone(defaultBreadPanel);
let headerImageUrl = '';
let supabaseClient = null;
let selectedImageData = '';
let selectedImageFile = null;
let currentProductImage = '';
let selectedHeaderImageData = '';
let selectedHeaderImageFile = null;
let supportsEnglishIngredients = true;
let supportsEnglishExtras = true;
let currentLanguage = 'tr';

const translations = {
  saltyTitle: { tr: 'Tuzlu Dilimler', en: 'Salty Slices' },
  saltyNote: { tr: 'Tuzlu dilimlerimiz zeytinli yeşil salata ile servis edilmektedir.', en: 'Our savory slices are served with a green salad with olives.' },
  sweetTitle: { tr: 'Tatlı Dilimler', en: 'Sweet Slices' },
  jarTitle: { tr: 'Kavanoz Tatlılar', en: 'Jar Desserts' },
  extrasTitle: { tr: 'İlave etmek ister misiniz?', en: 'Would you like to add anything?' },
  hotDrinksTitle: { tr: 'Sıcak İçecekler', en: 'Hot Drinks' },
  coldDrinksTitle: { tr: 'Soğuk İçecekler', en: 'Cold Drinks' },
  allergenAlert: { tr: 'Alerjen Uyarısı', en: 'Allergen Alert' }
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

function isMissingEnglishExtrasColumn(error) {
  return /extra_name/i.test(`${error?.message || ''} ${error?.details || ''}`);
}

function setSyncStatus(message) {
  const status = document.getElementById('admin-sync-status');
  if (status) status.textContent = message;
}

function getCategoryKey(category) {
  if (category === 'sweet') return 'sweetSlices';
  if (category === 'jar') return 'jarDesserts';
  return 'saltySlices';
}

function getCategoryLabel(category) {
  if (category === 'sweet') return 'Tatlı Dilimler';
  if (category === 'jar') return 'Kavanoz Tatlılar';
  return 'Tuzlu Dilimler';
}

function getDrinkCategoryKey(category) {
  return category === 'cold' ? 'coldDrinks' : 'hotDrinks';
}

function getDrinkCategoryLabel(category) {
  return category === 'cold' ? 'Soğuk İçecek' : 'Sıcak İçecek';
}

function getAllItems() {
  return [
    ...menuData.saltySlices.map(item => ({ ...item, category: 'salty' })),
    ...menuData.sweetSlices.map(item => ({ ...item, category: 'sweet' })),
    ...menuData.jarDesserts.map(item => ({ ...item, category: 'jar' }))
  ];
}

function findProductLocation(id) {
  if (!id) return { key: 'saltySlices', index: -1 };

  for (const key of ['saltySlices', 'sweetSlices', 'jarDesserts']) {
    const index = menuData[key].findIndex(product => product.id === id);
    if (index >= 0) return { key, index };
  }

  return { key: 'saltySlices', index: -1 };
}

function getAllergenBadgeHTML(allergenId) {
  const cfg = allergensConfig[allergenId];
  if (!cfg) return '';
  return `<span class="allergen-badge ${cfg.class}" title="${escapeHTML(cfg.name)}: ${escapeHTML(cfg.description)}">${escapeHTML(cfg.icon)}</span>`;
}

function normalizeItem(item) {
  const sortOrder = Number(item.sort_order);

  return {
    id: String(item.id),
    name: String(item.name || ''),
    ingredients: String(item.ingredients || ''),
    ingredients_en: String(item.ingredients_english || item.indegridients || item.ingredients_en || item.ingredientsEn || ''),
    story: String(item.story || ''),
    story_english: String(item.story_english || item.storyEnglish || ''),
    price: Number(item.price) || 0,
    allergens: Array.isArray(item.allergens) ? item.allergens.filter(id => allergensConfig[id]) : [],
    image: item.image || item.image_url || '',
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
  };
}

function normalizeExtra(extra) {
  const sortOrder = Number(extra.sort_order);

  return {
    id: String(extra.id || `extra-${Date.now()}`),
    name: String(extra.name || ''),
    extra_name: String(extra.extra_name || extra.extraName || ''),
    price: Number(extra.price) || 0,
    allergen: allergensConfig[extra.allergen] ? extra.allergen : null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
  };
}

function normalizeDrink(drink) {
  const sortOrder = Number(drink.sort_order);

  return {
    id: String(drink.id || `drink-${Date.now()}`),
    name: String(drink.name || ''),
    drink_name: String(drink.drink_name || drink.drinkName || ''),
    price: Number(drink.price) || 0,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
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

async function loadSupabaseData(client) {
  const menuItemsQuery = select => client
    .from('menu_items')
    .select(select)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  const extrasQuery = select => client
    .from('extras')
    .select(select)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  let [itemsResponse, extrasResponse, drinksResponse] = await Promise.all([
    menuItemsQuery(MENU_ITEM_SELECT_WITH_ENGLISH),
    extrasQuery(EXTRAS_SELECT_WITH_ENGLISH),
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

  if (extrasResponse.error && isMissingEnglishExtrasColumn(extrasResponse.error)) {
    supportsEnglishExtras = false;
    extrasResponse = await extrasQuery(EXTRAS_SELECT);
  } else {
    supportsEnglishExtras = true;
  }

  if (itemsResponse.error) throw itemsResponse.error;
  if (extrasResponse.error) throw extrasResponse.error;
  if (drinksResponse.error) throw drinksResponse.error;

  menuData = { saltySlices: [], sweetSlices: [], jarDesserts: [], extrasOptions: [], hotDrinks: [], coldDrinks: [] };

  itemsResponse.data.forEach(item => {
    const normalized = normalizeItem({
      ...item,
      image: item.image_url,
      sort_order: item.sort_order,
      allergens: (item.menu_item_allergens || []).map(row => row.allergen_id)
    });
    menuData[getCategoryKey(item.category)].push(normalized);
  });

  menuData.extrasOptions = extrasResponse.data.map(extra => normalizeExtra({
    id: extra.id,
    name: extra.name,
    extra_name: extra.extra_name,
    price: extra.price,
    allergen: extra.allergen_id,
    sort_order: extra.sort_order
  }));

  drinksResponse.data.forEach(drink => {
    menuData[getDrinkCategoryKey(drink.category)].push(normalizeDrink(drink));
  });
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

function loadLocalData() {
  try {
    const stored = JSON.parse(localStorage.getItem(MENU_STORAGE_KEY));
    if (!stored) return;

    if (Array.isArray(stored.saltySlices)) menuData.saltySlices = stored.saltySlices.map(normalizeItem);
    if (Array.isArray(stored.sweetSlices)) menuData.sweetSlices = stored.sweetSlices.map(normalizeItem);
    if (Array.isArray(stored.jarDesserts)) menuData.jarDesserts = stored.jarDesserts.map(normalizeItem);
    if (Array.isArray(stored.extrasOptions)) menuData.extrasOptions = stored.extrasOptions.map(normalizeExtra);
    if (Array.isArray(stored.hotDrinks)) menuData.hotDrinks = stored.hotDrinks.map(normalizeDrink);
    if (Array.isArray(stored.coldDrinks)) menuData.coldDrinks = stored.coldDrinks.map(normalizeDrink);
    if (stored.breadPanel) breadPanel = normalizeBreadPanel(stored.breadPanel, stored.breadPanel.items);
    headerImageUrl = String(stored.headerImageUrl || '');
  } catch (error) {
    localStorage.removeItem(MENU_STORAGE_KEY);
  }
}

async function loadData() {
  const client = getSupabaseClient();

  if (client) {
    try {
      await loadSupabaseData(client);
      const missingEnglishColumns = [];
      if (!supportsEnglishIngredients) missingEnglishColumns.push('ingredients_english veya story_english');
      if (!supportsEnglishExtras) missingEnglishColumns.push('extra_name');
      setSyncStatus(missingEnglishColumns.length === 0
        ? 'Supabase bağlı: veriler canlı veritabanından geliyor.'
        : `Supabase bağlı: ${missingEnglishColumns.join(', ')} kolonu olmadığı için ilgili İngilizce alanlar canlı veritabanına kaydedilmez.`);
      await Promise.allSettled([
        loadSupabaseViewOptions(client),
        loadSupabaseHeaderImage(client)
      ]);
      return;
    } catch (error) {
      setSyncStatus(`Supabase menü verisi okunamadı: ${error.message}. Yerel demo verisi gösteriliyor.`);
    }
  } else {
    setSyncStatus('Yerel demo modu: Supabase URL ve anon key girilmedi.');
  }

  loadLocalData();
}

function saveLocalData() {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify({
    ...menuData,
    breadPanel,
    headerImageUrl
  }));
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
    button.textContent = currentLanguage === 'en' ? 'Türkçe' : 'English';
    button.setAttribute('aria-pressed', currentLanguage === 'en' ? 'true' : 'false');
  });
}

function setupLanguageToggle() {
  document.querySelectorAll('.language-toggle').forEach(button => {
    button.addEventListener('click', () => {
      currentLanguage = currentLanguage === 'en' ? 'tr' : 'en';
      saveLanguage();
      renderPreview();
      applyLanguage();
    });
  });
}

function getLocalizedDrinkName(drink) {
  return currentLanguage === 'en' ? (drink.drink_name || '') : drink.name;
}

function getLocalizedExtraName(extra) {
  return currentLanguage === 'en' ? (extra.extra_name || extra.name) : extra.name;
}

function getLocalizedAllergenName(cfg) {
  return currentLanguage === 'en' ? (allergenNameTranslations[cfg.id]?.en || cfg.name) : cfg.name;
}

async function saveSupabaseBreadVisibility() {
  const client = getSupabaseClient();
  if (!client) return;

  const response = await client
    .from('bread_panel')
    .upsert({
      id: true,
      title: breadPanel.title,
      slogan: breadPanel.slogan,
      description_1: breadPanel.description1,
      description_2: breadPanel.description2,
      is_active: viewOptions.showBread
    }, { onConflict: 'id' });

  if (response.error) throw response.error;
}

function applyViewOptions() {
  document.body.classList.toggle('menu-images-hidden', !viewOptions.showImages);

  const imagesToggle = document.getElementById('toggle-menu-images');
  if (imagesToggle) imagesToggle.checked = viewOptions.showImages;

  const breadToggle = document.getElementById('toggle-bread-section');
  if (breadToggle) breadToggle.checked = viewOptions.showBread;

  const breadSection = document.getElementById('bread-section');
  if (breadSection) {
    breadSection.hidden = false;
    breadSection.classList.toggle('admin-bread-hidden-preview', !viewOptions.showBread);
  }
}

function applyHeaderImage() {
  document.querySelectorAll('.menu-header').forEach(header => {
    header.style.backgroundImage = headerImageUrl ? getCSSImageUrl(headerImageUrl) : 'none';
  });
}

function updateHeaderImagePreview() {
  const preview = document.getElementById('header-image-preview');
  const removeButton = document.getElementById('remove-header-image');
  if (preview) {
    preview.src = selectedHeaderImageData || headerImageUrl;
    preview.hidden = !(selectedHeaderImageData || headerImageUrl);
  }
  if (removeButton) removeButton.disabled = !headerImageUrl && !selectedHeaderImageData;
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
    breadToggle.addEventListener('change', async () => {
      if (breadToggle.checked === viewOptions.showBread) return;
      await toggleBreadPanelVisibility();
    });
  }
}

function renderMenuSection(items, containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => {
    const imageHTML = item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="menu-item-image">` : '';
    const ingredientsEnHTML = item.ingredients_en
      ? `<p class="menu-item-ingredients-en">${escapeHTML(item.ingredients_en)}</p>`
      : '';
    return `
      <div class="menu-item admin-preview-item" data-id="${escapeHTML(item.id)}" data-category="${escapeHTML(category)}" draggable="true">
        <span class="admin-drag-handle" title="Sürükleyerek sırala">Sırala</span>
        ${imageHTML}
        <div class="menu-item-header">
          <h4 class="menu-item-name">${escapeHTML(item.name)}</h4>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${escapeHTML(formatPrice(item.price))}</span>
        </div>
        <div class="menu-item-body">
          <div class="menu-item-ingredients-group">
            <p class="menu-item-ingredients">${escapeHTML(item.ingredients)}</p>
            ${ingredientsEnHTML}
          </div>
          <div class="menu-item-allergens">${(item.allergens || []).map(getAllergenBadgeHTML).join(' ')}</div>
        </div>
        <div class="admin-inline-actions">
          <button type="button" data-action="edit-product">Düzenle</button>
          <button type="button" data-action="delete-product">Sil</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderExtras() {
  const container = document.getElementById('admin-extras-options-container');
  if (!container) return;

  container.innerHTML = menuData.extrasOptions.map(extra => `
    <div class="option-row admin-extra-row" data-id="${escapeHTML(extra.id)}" draggable="true">
      <span class="admin-drag-handle" title="Sürükleyerek sırala">Sırala</span>
      <div class="option-left">
        <span>${escapeHTML(getLocalizedExtraName(extra))}</span>
        ${extra.allergen ? getAllergenBadgeHTML(extra.allergen) : ''}
      </div>
      <span class="option-price">${escapeHTML(formatPrice(extra.price))}</span>
      <div class="admin-inline-actions">
        <button type="button" data-action="edit-extra">Düzenle</button>
        <button type="button" data-action="delete-extra">Sil</button>
      </div>
    </div>
  `).join('');
}

function renderDrinks(items, containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(drink => `
    <div class="option-row admin-drink-row" data-id="${escapeHTML(drink.id)}" data-category="${escapeHTML(category)}" draggable="true">
      <span class="admin-drag-handle" title="Sürükleyerek sırala">Sırala</span>
      <div class="option-left">
        <span>${escapeHTML(getLocalizedDrinkName(drink))}</span>
      </div>
      <span class="option-price">${escapeHTML(formatPrice(drink.price))}</span>
      <div class="admin-inline-actions">
        <button type="button" data-action="edit-drink">Düzenle</button>
        <button type="button" data-action="delete-drink">Sil</button>
      </div>
    </div>
  `).join('');
}

function renderBreadPanel() {
  const section = document.getElementById('bread-section');
  if (!section) return;

  const title = section.querySelector('.column-title');
  const card = section.querySelector('.bread-story-card');
  if (title) {
    title.textContent = breadPanel.title;
    title.hidden = !viewOptions.showBread;
  }
  if (!card) return;

  if (!viewOptions.showBread) {
    card.innerHTML = `
      <span class="admin-bread-status">Ekmeğimiz menüde gizli</span>
      <div class="admin-inline-actions admin-inline-actions-always">
        <button type="button" data-action="edit-bread">Düzenle</button>
        <button type="button" data-action="toggle-bread" data-visible="false">Göster</button>
      </div>
    `;
    return;
  }

  card.innerHTML = `
    <h4 class="bread-slogan">${escapeHTML(breadPanel.slogan)}</h4>
    <p class="bread-desc">${escapeHTML(breadPanel.description1)}</p>
    <p class="bread-desc">${escapeHTML(breadPanel.description2)}</p>
    <ul class="bread-bullet-list">
      ${breadPanel.items.map(item => `
        <li><span class="bullet-icon">${escapeHTML(item.icon)}</span> ${escapeHTML(item.text)}</li>
      `).join('')}
    </ul>
    <div class="admin-inline-actions admin-inline-actions-always">
      <button type="button" data-action="edit-bread">Düzenle</button>
      <button type="button" data-action="toggle-bread" data-visible="${viewOptions.showBread ? 'true' : 'false'}">${viewOptions.showBread ? 'Gizle' : 'Göster'}</button>
    </div>
  `;
}

function renderAllergenLegend() {
  const container = document.getElementById('admin-allergen-legend-container');
  if (!container) return;

  container.innerHTML = Object.values(allergensConfig).map(cfg => `
    <div class="legend-item" title="${escapeHTML(cfg.description)}">
      <span class="legend-icon">${escapeHTML(cfg.icon)}</span>
      <span class="legend-text">${escapeHTML(getLocalizedAllergenName(cfg))}</span>
    </div>
  `).join('');
}

function renderPreview() {
  renderMenuSection(menuData.saltySlices, 'admin-salty-slices', 'salty');
  renderMenuSection(menuData.sweetSlices, 'admin-sweet-slices', 'sweet');
  renderMenuSection(menuData.jarDesserts, 'admin-jar-desserts', 'jar');
  renderDrinks(menuData.hotDrinks, 'admin-hot-drinks-container', 'hot');
  renderDrinks(menuData.coldDrinks, 'admin-cold-drinks-container', 'cold');
  renderExtras();
  renderBreadPanel();
  renderAllergenLegend();
  applyHeaderImage();
  updateHeaderImagePreview();
  applyViewOptions();
}

function renderAllergenInputs() {
  const productAllergens = document.getElementById('product-allergens');
  const extraAllergen = document.getElementById('extra-allergen');

  productAllergens.innerHTML = Object.values(allergensConfig).map(allergen => `
    <label title="${escapeHTML(allergen.description)}">
      <input type="checkbox" value="${escapeHTML(allergen.id)}">
      ${escapeHTML(allergen.icon)} ${escapeHTML(allergen.name)}
    </label>
  `).join('');

  extraAllergen.insertAdjacentHTML('beforeend', Object.values(allergensConfig).map(allergen => `
    <option value="${escapeHTML(allergen.id)}">${escapeHTML(allergen.icon)} ${escapeHTML(allergen.name)}</option>
  `).join(''));
}

function resetProductForm() {
  document.getElementById('product-form-title').textContent = 'Yeni Ürün';
  document.getElementById('product-form').reset();
  document.getElementById('product-id').value = '';
  document.getElementById('product-image-preview').hidden = true;
  document.getElementById('product-image-preview').src = '';
  selectedImageData = '';
  selectedImageFile = null;
  currentProductImage = '';
}

function resetExtraForm() {
  document.getElementById('extra-form-title').textContent = 'Yeni Ekstra';
  document.getElementById('extra-form').reset();
  document.getElementById('extra-id').value = '';
  document.getElementById('extra-name-en').value = '';
}

function resetDrinkForm() {
  document.getElementById('drink-form-title').textContent = 'Yeni İçecek';
  document.getElementById('drink-form').reset();
  document.getElementById('drink-id').value = '';
}

function hideItemEditorCards() {
  ['header-image-card', 'product-editor-card', 'extra-editor-card', 'drink-editor-card'].forEach(cardId => {
    const card = document.getElementById(cardId);
    if (card) card.hidden = true;
  });
  updatePanelToggleButtons('');
}

function updatePanelToggleButtons(activeCardId) {
  const buttonByCard = {
    'header-image-card': 'header-image-button',
    'product-editor-card': 'new-product-button',
    'extra-editor-card': 'new-extra-button',
    'drink-editor-card': 'new-drink-button'
  };

  Object.entries(buttonByCard).forEach(([cardId, buttonId]) => {
    const button = document.getElementById(buttonId);
    if (button) button.classList.toggle('is-active', cardId === activeCardId);
  });
}

function showItemEditorCard(cardId) {
  hideItemEditorCards();
  const card = document.getElementById(cardId);
  if (!card) return;
  card.hidden = false;
  updatePanelToggleButtons(cardId);
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeHeaderImageForm() {
  selectedHeaderImageData = '';
  selectedHeaderImageFile = null;
  document.getElementById('header-image-input').value = '';
  updateHeaderImagePreview();
  document.getElementById('header-image-card').hidden = true;
  updatePanelToggleButtons('');
}

function closeProductForm() {
  resetProductForm();
  document.getElementById('product-editor-card').hidden = true;
  updatePanelToggleButtons('');
}

function closeExtraForm() {
  resetExtraForm();
  document.getElementById('extra-editor-card').hidden = true;
  updatePanelToggleButtons('');
}

function closeDrinkForm() {
  resetDrinkForm();
  document.getElementById('drink-editor-card').hidden = true;
  updatePanelToggleButtons('');
}

function fillProductForm(item, category) {
  document.getElementById('product-form-title').textContent = `${item.name} Düzenle`;
  document.getElementById('product-id').value = item.id;
  document.getElementById('product-category').value = category;
  document.getElementById('product-name').value = item.name;
  document.getElementById('product-price').value = item.price;
  document.getElementById('product-ingredients').value = item.ingredients;
  document.getElementById('product-ingredients-en').value = item.ingredients_en || '';
  document.getElementById('product-story').value = item.story;
  document.getElementById('product-story-en').value = item.story_english || '';
  document.querySelectorAll('#product-allergens input').forEach(input => {
    input.checked = (item.allergens || []).includes(input.value);
  });

  currentProductImage = item.image || '';
  selectedImageData = '';
  selectedImageFile = null;

  const preview = document.getElementById('product-image-preview');
  preview.src = currentProductImage;
  preview.hidden = !currentProductImage;
  showItemEditorCard('product-editor-card');
}

function fillExtraForm(extra) {
  document.getElementById('extra-form-title').textContent = `${extra.name} Düzenle`;
  document.getElementById('extra-id').value = extra.id;
  document.getElementById('extra-name').value = extra.name;
  document.getElementById('extra-name-en').value = extra.extra_name || '';
  document.getElementById('extra-price').value = extra.price;
  document.getElementById('extra-allergen').value = extra.allergen || '';
  showItemEditorCard('extra-editor-card');
}

function fillDrinkForm(drink, category) {
  document.getElementById('drink-form-title').textContent = `${drink.name} Düzenle`;
  document.getElementById('drink-id').value = drink.id;
  document.getElementById('drink-category').value = category;
  document.getElementById('drink-name-en').value = drink.drink_name || '';
  document.getElementById('drink-name').value = drink.name;
  document.getElementById('drink-price').value = drink.price;
  showItemEditorCard('drink-editor-card');
}

function fillBreadForm() {
  document.getElementById('bread-editor-card').hidden = false;
  document.getElementById('bread-title').value = breadPanel.title;
  document.getElementById('bread-slogan').value = breadPanel.slogan;
  document.getElementById('bread-description-1').value = breadPanel.description1;
  document.getElementById('bread-description-2').value = breadPanel.description2;
  document.getElementById('bread-item-1').value = breadPanel.items[0]?.text || '';
  document.getElementById('bread-item-2').value = breadPanel.items[1]?.text || '';
  document.getElementById('bread-item-3').value = breadPanel.items[2]?.text || '';
  document.getElementById('bread-editor-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideBreadForm() {
  document.getElementById('bread-editor-card').hidden = true;
}

function getBreadPanelFromForm() {
  return normalizeBreadPanel({
    title: document.getElementById('bread-title').value.trim(),
    slogan: document.getElementById('bread-slogan').value.trim(),
    description1: document.getElementById('bread-description-1').value.trim(),
    description2: document.getElementById('bread-description-2').value.trim()
  }, defaultBreadPanel.items.map((item, index) => ({
    icon: item.icon,
    text: document.getElementById(`bread-item-${index + 1}`).value.trim()
  })));
}

async function saveBreadPanel() {
  const client = getSupabaseClient();
  breadPanel = getBreadPanelFromForm();

  if (client) {
    await saveSupabaseBreadVisibility();

    const itemRows = breadPanel.items.map((item, index) => ({
      id: BREAD_PANEL_ITEM_IDS[index],
      icon: item.icon,
      text: item.text,
      sort_order: index + 1,
      is_active: true
    }));
    const itemsResponse = await client.from('bread_panel_items').upsert(itemRows, { onConflict: 'id' });
    if (itemsResponse.error) throw itemsResponse.error;
  } else {
    saveLocalData();
  }

  hideBreadForm();
  await loadData();
  renderPreview();
}

async function toggleBreadPanelVisibility() {
  const previousValue = viewOptions.showBread;
  viewOptions.showBread = !viewOptions.showBread;
  applyViewOptions();
  renderBreadPanel();
  saveViewOptions();

  try {
    await saveSupabaseBreadVisibility();
  } catch (error) {
    viewOptions.showBread = previousValue;
    applyViewOptions();
    renderBreadPanel();
    saveViewOptions();
    alert(`Ekmeğimiz görünürlük ayarı kaydedilemedi: ${error.message}`);
  }
}

async function uploadHeaderImage(client) {
  if (!selectedHeaderImageFile) return headerImageUrl;

  const safeName = selectedHeaderImageFile.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const filePath = `${Date.now()}-${safeName}`;
  const uploadResponse = await client.storage.from(HEADER_STORAGE_BUCKET).upload(filePath, selectedHeaderImageFile, { upsert: false });
  if (uploadResponse.error) throw uploadResponse.error;

  return client.storage.from(HEADER_STORAGE_BUCKET).getPublicUrl(filePath).data.publicUrl;
}

async function saveHeaderImage() {
  const client = getSupabaseClient();
  if (!selectedHeaderImageFile && !selectedHeaderImageData) {
    alert('Önce bir üst menü görseli seçin.');
    return;
  }

  if (client) {
    headerImageUrl = await uploadHeaderImage(client);
    const response = await client
      .from('menu_header')
      .upsert({ id: true, image_url: headerImageUrl, is_active: true }, { onConflict: 'id' });
    if (response.error) throw response.error;
  } else {
    headerImageUrl = selectedHeaderImageData;
  }

  selectedHeaderImageData = '';
  selectedHeaderImageFile = null;
  document.getElementById('header-image-input').value = '';
  saveLocalData();
  renderPreview();
}

async function removeHeaderImage() {
  const client = getSupabaseClient();

  if (client) {
    const response = await client
      .from('menu_header')
      .upsert({ id: true, image_url: null, is_active: false }, { onConflict: 'id' });
    if (response.error) throw response.error;
  }

  headerImageUrl = '';
  selectedHeaderImageData = '';
  selectedHeaderImageFile = null;
  document.getElementById('header-image-input').value = '';
  saveLocalData();
  renderPreview();
}

async function uploadImageIfNeeded(client) {
  if (!selectedImageFile) return currentProductImage;

  const safeName = selectedImageFile.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
  const filePath = `${Date.now()}-${safeName}`;
  const uploadResponse = await client.storage.from(STORAGE_BUCKET).upload(filePath, selectedImageFile, { upsert: false });
  if (uploadResponse.error) throw uploadResponse.error;

  const publicUrl = client.storage.from(STORAGE_BUCKET).getPublicUrl(filePath).data.publicUrl;
  return publicUrl;
}

async function saveProduct() {
  const client = getSupabaseClient();
  const id = document.getElementById('product-id').value;
  const category = document.getElementById('product-category').value;
  const selectedAllergens = Array.from(document.querySelectorAll('#product-allergens input:checked')).map(input => input.value);
  const oldLocation = findProductLocation(id);
  const oldCategoryKey = oldLocation.key;
  const newCategoryKey = getCategoryKey(category);
  const oldIndex = oldLocation.index;
  const existingItem = oldIndex >= 0 ? menuData[oldCategoryKey][oldIndex] : null;
  const item = {
    id: id || `${category}-${Date.now()}`,
    name: document.getElementById('product-name').value.trim(),
    price: Number(document.getElementById('product-price').value) || 0,
    ingredients: document.getElementById('product-ingredients').value.trim(),
    ingredients_en: document.getElementById('product-ingredients-en').value.trim(),
    story: document.getElementById('product-story').value.trim(),
    story_english: document.getElementById('product-story-en').value.trim(),
    allergens: selectedAllergens,
    image: selectedImageData || currentProductImage,
    sort_order: existingItem?.sort_order || (oldIndex >= 0 ? oldIndex + 1 : menuData[newCategoryKey].length + 1)
  };

  if (client) {
    const imageUrl = await uploadImageIfNeeded(client);
    const payload = {
      category,
      name: item.name,
      price: item.price,
      ingredients: item.ingredients,
      story: item.story,
      image_url: imageUrl,
      is_active: true
    };
    if (supportsEnglishIngredients) {
      payload.ingredients_english = item.ingredients_en;
      payload.story_english = item.story_english;
    }

    let itemId = id;
    if (id) {
      let updateResponse = await client.from('menu_items').update(payload).eq('id', id);
      if (updateResponse.error && supportsEnglishIngredients && isMissingEnglishIngredientsColumn(updateResponse.error)) {
        supportsEnglishIngredients = false;
        delete payload.ingredients_english;
        delete payload.story_english;
        updateResponse = await client.from('menu_items').update(payload).eq('id', id);
      }
      if (updateResponse.error) throw updateResponse.error;
    } else {
      payload.sort_order = menuData[newCategoryKey].length + 1;
      let insertResponse = await client.from('menu_items').insert(payload).select('id').single();
      if (insertResponse.error && supportsEnglishIngredients && isMissingEnglishIngredientsColumn(insertResponse.error)) {
        supportsEnglishIngredients = false;
        delete payload.ingredients_english;
        delete payload.story_english;
        insertResponse = await client.from('menu_items').insert(payload).select('id').single();
      }
      if (insertResponse.error) throw insertResponse.error;
      itemId = insertResponse.data.id;
    }

    const deleteAllergensResponse = await client.from('menu_item_allergens').delete().eq('menu_item_id', itemId);
    if (deleteAllergensResponse.error) throw deleteAllergensResponse.error;

    if (selectedAllergens.length > 0) {
      const insertAllergensResponse = await client.from('menu_item_allergens').insert(selectedAllergens.map(allergenId => ({
        menu_item_id: itemId,
        allergen_id: allergenId
      })));
      if (insertAllergensResponse.error) throw insertAllergensResponse.error;
    }
  } else {
    if (id && oldIndex >= 0 && oldCategoryKey === newCategoryKey) {
      menuData[newCategoryKey][oldIndex] = item;
    } else {
      if (id) menuData[oldCategoryKey] = menuData[oldCategoryKey].filter(product => product.id !== id);
      menuData[newCategoryKey].push(item);
    }
    saveLocalData();
  }

  resetProductForm();
  hideItemEditorCards();
  await loadData();
  renderPreview();
}

async function saveExtra() {
  const client = getSupabaseClient();
  const id = document.getElementById('extra-id').value;
  const oldIndex = id ? menuData.extrasOptions.findIndex(item => item.id === id) : -1;
  const existingExtra = oldIndex >= 0 ? menuData.extrasOptions[oldIndex] : null;
  const extra = {
    id: id || `extra-${Date.now()}`,
    name: document.getElementById('extra-name').value.trim(),
    extra_name: document.getElementById('extra-name-en').value.trim(),
    price: Number(document.getElementById('extra-price').value) || 0,
    allergen: document.getElementById('extra-allergen').value || null,
    sort_order: existingExtra?.sort_order || (oldIndex >= 0 ? oldIndex + 1 : menuData.extrasOptions.length + 1)
  };

  if (client) {
    const payload = {
      name: extra.name,
      price: extra.price,
      allergen_id: extra.allergen,
      is_active: true
    };
    payload.extra_name = extra.extra_name;
    if (!id) payload.sort_order = menuData.extrasOptions.length + 1;

    let response = id
      ? await client.from('extras').update(payload).eq('id', id).select('id').single()
      : await client.from('extras').insert(payload).select('id').single();

    if (response.error && isMissingEnglishExtrasColumn(response.error)) {
      supportsEnglishExtras = false;
      delete payload.extra_name;
      response = id
        ? await client.from('extras').update(payload).eq('id', id).select('id').single()
        : await client.from('extras').insert(payload).select('id').single();
    }

    if (response.error) throw response.error;
  } else {
    if (id && oldIndex >= 0) {
      menuData.extrasOptions[oldIndex] = extra;
    } else {
      menuData.extrasOptions.push(extra);
    }
    saveLocalData();
  }

  resetExtraForm();
  hideItemEditorCards();
  await loadData();
  renderPreview();
}

function findDrinkLocation(id) {
  if (!id) return { key: 'hotDrinks', index: -1 };

  for (const key of ['hotDrinks', 'coldDrinks']) {
    const index = menuData[key].findIndex(drink => drink.id === id);
    if (index >= 0) return { key, index };
  }

  return { key: 'hotDrinks', index: -1 };
}

async function saveDrink() {
  const client = getSupabaseClient();
  const id = document.getElementById('drink-id').value;
  const category = document.getElementById('drink-category').value;
  const oldLocation = findDrinkLocation(id);
  const oldCategoryKey = oldLocation.key;
  const newCategoryKey = getDrinkCategoryKey(category);
  const oldIndex = oldLocation.index;
  const existingDrink = oldIndex >= 0 ? menuData[oldCategoryKey][oldIndex] : null;
  const drink = {
    id: id || `${category}-drink-${Date.now()}`,
    name: document.getElementById('drink-name').value.trim(),
    drink_name: document.getElementById('drink-name-en').value.trim(),
    price: Number(document.getElementById('drink-price').value) || 0,
    sort_order: existingDrink?.sort_order || (oldIndex >= 0 ? oldIndex + 1 : menuData[newCategoryKey].length + 1)
  };

  if (client) {
    const payload = {
      category,
      name: drink.name,
      drink_name: drink.drink_name,
      price: drink.price,
      is_active: true
    };
    if (!id) payload.sort_order = menuData[newCategoryKey].length + 1;

    const response = id
      ? await client.from('drinks').update(payload).eq('id', id)
      : await client.from('drinks').insert(payload);

    if (response.error) throw response.error;
  } else {
    if (id && oldIndex >= 0 && oldCategoryKey === newCategoryKey) {
      menuData[newCategoryKey][oldIndex] = drink;
    } else {
      if (id) menuData[oldCategoryKey] = menuData[oldCategoryKey].filter(item => item.id !== id);
      menuData[newCategoryKey].push(drink);
    }
    saveLocalData();
  }

  resetDrinkForm();
  hideItemEditorCards();
  await loadData();
  renderPreview();
}

async function deleteProduct(id, category) {
  const client = getSupabaseClient();

  if (client) {
    const response = await client.from('menu_items').delete().eq('id', id);
    if (response.error) throw response.error;
  } else {
    const key = getCategoryKey(category);
    menuData[key] = menuData[key].filter(item => item.id !== id);
    saveLocalData();
  }

  await loadData();
  renderPreview();
}

async function deleteExtra(id) {
  const client = getSupabaseClient();

  if (client) {
    const response = await client.from('extras').delete().eq('id', id);
    if (response.error) throw response.error;
  } else {
    menuData.extrasOptions = menuData.extrasOptions.filter(item => item.id !== id);
    saveLocalData();
  }

  await loadData();
  renderPreview();
}

async function deleteDrink(id, category) {
  const client = getSupabaseClient();

  if (client) {
    const response = await client.from('drinks').delete().eq('id', id);
    if (response.error) throw response.error;
  } else {
    const key = getDrinkCategoryKey(category);
    menuData[key] = menuData[key].filter(item => item.id !== id);
    saveLocalData();
  }

  await loadData();
  renderPreview();
}

function getDragAfterElement(container, y, itemSelector) {
  const draggableElements = [...container.querySelectorAll(`${itemSelector}:not(.dragging)`)];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }

    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

async function updateSupabaseSortOrders(tableName, ids) {
  const client = getSupabaseClient();
  if (!client) return;

  await Promise.all(ids.map(async (id, index) => {
    const response = await client.from(tableName).update({ sort_order: index + 1 }).eq('id', id);
    if (response.error) throw response.error;
  }));
}

async function persistProductOrder(category, ids) {
  const key = getCategoryKey(category);
  const itemsById = new Map(menuData[key].map(item => [item.id, item]));
  menuData[key] = ids.map((id, index) => ({
    ...itemsById.get(id),
    sort_order: index + 1
  })).filter(Boolean);

  const client = getSupabaseClient();
  if (client) await updateSupabaseSortOrders('menu_items', ids);
  else saveLocalData();
}

async function persistExtraOrder(ids) {
  const extrasById = new Map(menuData.extrasOptions.map(item => [item.id, item]));
  menuData.extrasOptions = ids.map((id, index) => ({
    ...extrasById.get(id),
    sort_order: index + 1
  })).filter(Boolean);

  const client = getSupabaseClient();
  if (client) await updateSupabaseSortOrders('extras', ids);
  else saveLocalData();
}

async function persistDrinkOrder(category, ids) {
  const key = getDrinkCategoryKey(category);
  const drinksById = new Map(menuData[key].map(item => [item.id, item]));
  menuData[key] = ids.map((id, index) => ({
    ...drinksById.get(id),
    sort_order: index + 1
  })).filter(Boolean);

  const client = getSupabaseClient();
  if (client) await updateSupabaseSortOrders('drinks', ids);
  else saveLocalData();
}

function attachSortableContainer(containerId, itemSelector, onOrderChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.addEventListener('dragstart', (event) => {
    const item = event.target.closest(itemSelector);
    if (!item || event.target.closest('button')) {
      event.preventDefault();
      return;
    }

    item.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', item.getAttribute('data-id'));
  });

  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const draggingItem = container.querySelector(`${itemSelector}.dragging`);
    if (!draggingItem) return;

    const afterElement = getDragAfterElement(container, event.clientY, itemSelector);
    if (afterElement) container.insertBefore(draggingItem, afterElement);
    else container.appendChild(draggingItem);
  });

  container.addEventListener('dragend', async (event) => {
    const item = event.target.closest(itemSelector);
    if (!item) return;

    item.classList.remove('dragging');
    const ids = [...container.querySelectorAll(itemSelector)].map(row => row.getAttribute('data-id'));

    try {
      setSyncStatus('Yeni sıra kaydediliyor...');
      await onOrderChange(ids, item);
      setSyncStatus(getSupabaseClient() ? 'Sıralama Supabase üzerine kaydedildi.' : 'Sıralama yerel demo verisine kaydedildi.');
      renderPreview();
    } catch (error) {
      alert(`Sıralama kaydedilemedi: ${error.message}`);
      renderPreview();
    }
  });
}

function attachDragSorting() {
  attachSortableContainer('admin-salty-slices', '.admin-preview-item', ids => persistProductOrder('salty', ids));
  attachSortableContainer('admin-sweet-slices', '.admin-preview-item', ids => persistProductOrder('sweet', ids));
  attachSortableContainer('admin-jar-desserts', '.admin-preview-item', ids => persistProductOrder('jar', ids));
  attachSortableContainer('admin-extras-options-container', '.admin-extra-row', ids => persistExtraOrder(ids));
  attachSortableContainer('admin-hot-drinks-container', '.admin-drink-row', ids => persistDrinkOrder('hot', ids));
  attachSortableContainer('admin-cold-drinks-container', '.admin-drink-row', ids => persistDrinkOrder('cold', ids));
}

function showDashboard() {
  document.getElementById('admin-login-card').hidden = true;
  document.getElementById('admin-dashboard').hidden = false;
}

function showLogin() {
  document.getElementById('admin-login-card').hidden = false;
  document.getElementById('admin-dashboard').hidden = true;
}

async function isLoggedIn() {
  const client = getSupabaseClient();
  if (!client) return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';

  const sessionResponse = await client.auth.getSession();
  return Boolean(sessionResponse.data.session);
}

async function init() {
  renderAllergenInputs();
  loadViewOptions();
  loadLanguage();
  await loadData();
  renderPreview();
  attachDragSorting();
  setupViewControls();
  applyLanguage();
  setupLanguageToggle();

  if (await isLoggedIn()) showDashboard();
  else showLogin();

  document.getElementById('admin-login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const client = getSupabaseClient();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('login-error');

    errorEl.hidden = true;

    if (client) {
      const response = await client.auth.signInWithPassword({ email: username, password });
      if (response.error) {
        errorEl.textContent = response.error.message;
        errorEl.hidden = false;
        return;
      }
      await loadData();
      renderPreview();
      showDashboard();
      return;
    }

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      showDashboard();
      return;
    }

    errorEl.textContent = 'Giriş bilgileri hatalı.';
    errorEl.hidden = false;
  });

  document.getElementById('admin-logout').addEventListener('click', async () => {
    const client = getSupabaseClient();
    if (client) await client.auth.signOut();
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    showLogin();
  });

  document.getElementById('header-image-button').addEventListener('click', () => {
    showItemEditorCard('header-image-card');
  });
  document.getElementById('new-product-button').addEventListener('click', () => {
    resetProductForm();
    showItemEditorCard('product-editor-card');
  });
  document.getElementById('new-extra-button').addEventListener('click', () => {
    resetExtraForm();
    showItemEditorCard('extra-editor-card');
  });
  document.getElementById('new-drink-button').addEventListener('click', () => {
    resetDrinkForm();
    showItemEditorCard('drink-editor-card');
  });
  document.getElementById('cancel-bread-edit').addEventListener('click', hideBreadForm);
  document.getElementById('cancel-product-edit').addEventListener('click', closeProductForm);
  document.getElementById('cancel-extra-edit').addEventListener('click', closeExtraForm);
  document.getElementById('cancel-drink-edit').addEventListener('click', closeDrinkForm);

  document.getElementById('product-image').addEventListener('change', (event) => {
    selectedImageFile = event.target.files[0] || null;
    selectedImageData = '';
    const preview = document.getElementById('product-image-preview');
    preview.hidden = true;
    preview.src = '';

    if (!selectedImageFile) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      selectedImageData = reader.result;
      preview.src = selectedImageData;
      preview.hidden = false;
    });
    reader.readAsDataURL(selectedImageFile);
  });

  document.getElementById('header-image-input').addEventListener('change', (event) => {
    selectedHeaderImageFile = event.target.files[0] || null;
    selectedHeaderImageData = '';
    updateHeaderImagePreview();

    if (!selectedHeaderImageFile) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      selectedHeaderImageData = reader.result;
      updateHeaderImagePreview();
    });
    reader.readAsDataURL(selectedHeaderImageFile);
  });

  document.getElementById('header-image-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveHeaderImage();
    } catch (error) {
      alert(`Üst menü görseli yüklenemedi: ${error.message}`);
    }
  });

  document.getElementById('remove-header-image').addEventListener('click', async () => {
    try {
      await removeHeaderImage();
    } catch (error) {
      alert(`Üst menü görseli kaldırılamadı: ${error.message}`);
    }
  });

  document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveProduct();
    } catch (error) {
      alert(`Ürün kaydedilemedi: ${error.message}`);
    }
  });

  document.getElementById('extra-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveExtra();
    } catch (error) {
      alert(`Ekstra kaydedilemedi: ${error.message}`);
    }
  });

  document.getElementById('drink-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveDrink();
    } catch (error) {
      alert(`İçecek kaydedilemedi: ${error.message}`);
    }
  });

  document.getElementById('bread-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      await saveBreadPanel();
    } catch (error) {
      alert(`Ekmeğimiz kaydedilemedi: ${error.message}`);
    }
  });

  document.getElementById('admin-menu-card').addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const action = button.getAttribute('data-action');
    if (action === 'edit-bread') {
      fillBreadForm();
      return;
    }
    if (action === 'toggle-bread') {
      await toggleBreadPanelVisibility();
      return;
    }

    const productEl = button.closest('.admin-preview-item');
    const extraEl = button.closest('.admin-extra-row');
    const drinkEl = button.closest('.admin-drink-row');

    try {
      if (productEl) {
        const id = productEl.getAttribute('data-id');
        const category = productEl.getAttribute('data-category');
        const item = menuData[getCategoryKey(category)].find(product => product.id === id);
        if (!item) return;

        if (action === 'edit-product') fillProductForm(item, category);
        if (action === 'delete-product' && confirm(`${item.name} silinsin mi?`)) await deleteProduct(id, category);
      }

      if (extraEl) {
        const id = extraEl.getAttribute('data-id');
        const extra = menuData.extrasOptions.find(item => item.id === id);
        if (!extra) return;

        if (action === 'edit-extra') fillExtraForm(extra);
        if (action === 'delete-extra' && confirm(`${extra.name} silinsin mi?`)) await deleteExtra(id);
      }

      if (drinkEl) {
        const id = drinkEl.getAttribute('data-id');
        const category = drinkEl.getAttribute('data-category');
        const drink = menuData[getDrinkCategoryKey(category)].find(item => item.id === id);
        if (!drink) return;

        if (action === 'edit-drink') fillDrinkForm(drink, category);
        if (action === 'delete-drink' && confirm(`${drink.name} silinsin mi?`)) await deleteDrink(id, category);
      }
    } catch (error) {
      alert(`İşlem tamamlanamadı: ${error.message}`);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
