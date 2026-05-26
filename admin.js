const MENU_STORAGE_KEY = 'sliceup-menu-data-v1';
const ADMIN_SESSION_KEY = 'sliceup-admin-session';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const STORAGE_BUCKET = 'menu-images';

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

let menuData = structuredClone(defaultMenuData);
let supabaseClient = null;
let selectedImageData = '';
let selectedImageFile = null;
let currentProductImage = '';

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function getSupabaseClient() {
  const config = window.SLICEUP_SUPABASE_CONFIG || {};
  const hasConfig = config.url && config.anonKey && !config.url.includes('YOUR_SUPABASE') && !config.anonKey.includes('YOUR_SUPABASE');

  if (!hasConfig || !window.supabase) return null;
  if (!supabaseClient) supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  return supabaseClient;
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
    story: String(item.story || ''),
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
    price: Number(drink.price) || 0,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0
  };
}

async function loadSupabaseData(client) {
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
    price: extra.price,
    allergen: extra.allergen_id,
    sort_order: extra.sort_order
  }));

  drinksResponse.data.forEach(drink => {
    menuData[getDrinkCategoryKey(drink.category)].push(normalizeDrink(drink));
  });
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
  } catch (error) {
    localStorage.removeItem(MENU_STORAGE_KEY);
  }
}

async function loadData() {
  const client = getSupabaseClient();

  if (client) {
    try {
      await loadSupabaseData(client);
      setSyncStatus('Supabase bağlı: veriler canlı veritabanından geliyor.');
      return;
    } catch (error) {
      setSyncStatus(`Supabase okunamadı: ${error.message}. Yerel demo verisi gösteriliyor.`);
    }
  } else {
    setSyncStatus('Yerel demo modu: Supabase URL ve anon key girilmedi.');
  }

  loadLocalData();
}

function saveLocalData() {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuData));
}

function renderMenuSection(items, containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map(item => {
    const imageHTML = item.image ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="menu-item-image">` : '';
    return `
      <div class="menu-item admin-preview-item" data-id="${escapeHTML(item.id)}" data-category="${escapeHTML(category)}" draggable="true">
        <span class="admin-drag-handle" title="Sürükleyerek sırala">Sırala</span>
        ${imageHTML}
        <div class="menu-item-header">
          <h4 class="menu-item-name">${escapeHTML(item.name)}</h4>
          <span class="menu-item-dots"></span>
          <span class="menu-item-price">${escapeHTML(item.price)}</span>
        </div>
        <div class="menu-item-body">
          <p class="menu-item-ingredients">${escapeHTML(item.ingredients)}</p>
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
        <span>${escapeHTML(extra.name)}</span>
        ${extra.allergen ? getAllergenBadgeHTML(extra.allergen) : ''}
      </div>
      <span class="option-price">${escapeHTML(extra.price)}</span>
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
        <span>${escapeHTML(drink.name)}</span>
      </div>
      <span class="option-price">${escapeHTML(drink.price)}</span>
      <div class="admin-inline-actions">
        <button type="button" data-action="edit-drink">Düzenle</button>
        <button type="button" data-action="delete-drink">Sil</button>
      </div>
    </div>
  `).join('');
}

function renderAllergenLegend() {
  const container = document.getElementById('admin-allergen-legend-container');
  if (!container) return;

  container.innerHTML = Object.values(allergensConfig).map(cfg => `
    <div class="legend-item" title="${escapeHTML(cfg.description)}">
      <span class="legend-icon">${escapeHTML(cfg.icon)}</span>
      <span class="legend-text">${escapeHTML(cfg.name)}</span>
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
  renderAllergenLegend();
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
}

function resetDrinkForm() {
  document.getElementById('drink-form-title').textContent = 'Yeni İçecek';
  document.getElementById('drink-form').reset();
  document.getElementById('drink-id').value = '';
}

function fillProductForm(item, category) {
  document.getElementById('product-form-title').textContent = `${item.name} Düzenle`;
  document.getElementById('product-id').value = item.id;
  document.getElementById('product-category').value = category;
  document.getElementById('product-name').value = item.name;
  document.getElementById('product-price').value = item.price;
  document.getElementById('product-ingredients').value = item.ingredients;
  document.getElementById('product-story').value = item.story;
  document.querySelectorAll('#product-allergens input').forEach(input => {
    input.checked = (item.allergens || []).includes(input.value);
  });

  currentProductImage = item.image || '';
  selectedImageData = '';
  selectedImageFile = null;

  const preview = document.getElementById('product-image-preview');
  preview.src = currentProductImage;
  preview.hidden = !currentProductImage;
  document.getElementById('product-editor-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fillExtraForm(extra) {
  document.getElementById('extra-form-title').textContent = `${extra.name} Düzenle`;
  document.getElementById('extra-id').value = extra.id;
  document.getElementById('extra-name').value = extra.name;
  document.getElementById('extra-price').value = extra.price;
  document.getElementById('extra-allergen').value = extra.allergen || '';
  document.getElementById('extra-editor-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fillDrinkForm(drink, category) {
  document.getElementById('drink-form-title').textContent = `${drink.name} Düzenle`;
  document.getElementById('drink-id').value = drink.id;
  document.getElementById('drink-category').value = category;
  document.getElementById('drink-name').value = drink.name;
  document.getElementById('drink-price').value = drink.price;
  document.getElementById('drink-editor-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    story: document.getElementById('product-story').value.trim(),
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

    let itemId = id;
    if (id) {
      const updateResponse = await client.from('menu_items').update(payload).eq('id', id);
      if (updateResponse.error) throw updateResponse.error;
    } else {
      payload.sort_order = menuData[newCategoryKey].length + 1;
      const insertResponse = await client.from('menu_items').insert(payload).select('id').single();
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
    if (!id) payload.sort_order = menuData.extrasOptions.length + 1;

    const response = id
      ? await client.from('extras').update(payload).eq('id', id)
      : await client.from('extras').insert(payload);

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
    price: Number(document.getElementById('drink-price').value) || 0,
    sort_order: existingDrink?.sort_order || (oldIndex >= 0 ? oldIndex + 1 : menuData[newCategoryKey].length + 1)
  };

  if (client) {
    const payload = {
      category,
      name: drink.name,
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
  await loadData();
  renderPreview();
  attachDragSorting();

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

  document.getElementById('new-product-button').addEventListener('click', resetProductForm);
  document.getElementById('new-extra-button').addEventListener('click', resetExtraForm);
  document.getElementById('new-drink-button').addEventListener('click', resetDrinkForm);
  document.getElementById('cancel-product-edit').addEventListener('click', resetProductForm);
  document.getElementById('cancel-extra-edit').addEventListener('click', resetExtraForm);
  document.getElementById('cancel-drink-edit').addEventListener('click', resetDrinkForm);

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

  document.getElementById('admin-menu-card').addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const action = button.getAttribute('data-action');
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
