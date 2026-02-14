// Data dummy menu dengan placeholder gambar
const menuData = {
  nasi: [
    {
      id: 1,
      name: "Nasi Putih",
      price: 5000,
      description: "Nasi putih pulen",
      image: "🍚",
    },
    {
      id: 2,
      name: "Nasi Uduk",
      price: 7000,
      description: "Nasi uduk harum",
      image: "🥥",
    },
    {
      id: 3,
      name: "Nasi Kuning",
      price: 8000,
      description: "Nasi kuning lengkap",
      image: "🟡",
    },
    {
      id: 4,
      name: "Nasi Daun Jeruk",
      price: 9000,
      description: "Aroma daun jeruk",
      image: "🍃",
    },
  ],
  lauk: [
    {
      id: 101,
      name: "Ayam Goreng",
      price: 15000,
      description: "Ayam goreng bumbu",
      image: "🍗",
    },
    {
      id: 102,
      name: "Ayam Bakar",
      price: 18000,
      description: "Ayam bakar kecap",
      image: "🔥",
    },
    {
      id: 103,
      name: "Rendang",
      price: 25000,
      description: "Rendang sapi",
      image: "🥩",
    },
    {
      id: 104,
      name: "Telur Balado",
      price: 8000,
      description: "Telur balado pedas",
      image: "🥚",
    },
  ],
  pelengkap: [
    {
      id: 201,
      name: "Mie Goreng",
      price: 5000,
      description: "Mie goreng spesial",
      image: "🍜",
    },
    {
      id: 202,
      name: "Tempe Orek",
      price: 3000,
      description: "Tempe orek kering",
      image: "🫘",
    },
    {
      id: 203,
      name: "Kentang Balado",
      price: 4000,
      description: "Kentang balado",
      image: "🥔",
    },
    {
      id: 204,
      name: "Perkedel",
      price: 3000,
      description: "Perkedel kentang",
      image: "🥟",
    },
  ],
  sambal: [
    {
      id: 301,
      name: "Sambal Terasi",
      price: 2000,
      description: "Sambal dengan terasi",
      image: "🌶️",
    },
    {
      id: 302,
      name: "Sambal Ijo",
      price: 2000,
      description: "Sambal hijau segar",
      image: "🫑",
    },
    {
      id: 303,
      name: "Sambal Bawang",
      price: 2000,
      description: "Sambal bawang pedas",
      image: "🧄",
    },
    {
      id: 304,
      name: "Sambal Matah",
      price: 3000,
      description: "Sambal mentah khas Bali",
      image: "🌿",
    },
  ],
  box: [
    {
      id: 401,
      name: "Mika Box",
      price: 2000,
      description: "Box plastik bening",
      image: "📦",
    },
    {
      id: 402,
      name: "Dus Catering",
      price: 3000,
      description: "Dus kertas food grade",
      image: "📦",
    },
    {
      id: 403,
      name: "Besek Bambu",
      price: 5000,
      description: "Besek bambu tradisional",
      image: "🎋",
    },
    {
      id: 404,
      name: "Piring Biasa",
      price: 0,
      description: "Piring (dine in)",
      image: "🍽️",
    },
  ],
  tambahan: [
    {
      id: 501,
      name: "Sendok Garpu",
      price: 500,
      description: "Set sendok garpu",
    },
    {
      id: 502,
      name: "Air Mineral",
      price: 3000,
      description: "Air mineral 600ml",
    },
    { id: 503, name: "Kerupuk", price: 2000, description: "Kerupuk udang" },
    { id: 504, name: "Buah", price: 5000, description: "Potongan buah segar" },
    {
      id: 505,
      name: "Pisang Goreng",
      price: 3000,
      description: "Pisang goreng crispy",
    },
  ],
};

// State management
let currentOrder = {
  nasi: null,
  lauk: null,
  pelengkap: null,
  sambal: null,
  box: null,
  tambahan: [],
};

let orders = []; // Array untuk multi order
let editingIndex = -1; // Untuk edit mode

// Load data dari localStorage jika ada
function loadFromLocalStorage() {
  const savedOrders = localStorage.getItem("dapoerMamaOrders");
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
    renderOrderList();
    updateTotalPrice();
    validateCheckoutButton();
  }
}

// Simpan ke localStorage
function saveToLocalStorage() {
  localStorage.setItem("dapoerMamaOrders", JSON.stringify(orders));
}

// Render menu items
function renderMenus() {
  // Render Nasi
  const nasiGrid = document.getElementById("nasiGrid");
  nasiGrid.innerHTML = menuData.nasi
    .map((item) => createMenuItem(item, "nasi"))
    .join("");

  // Render Lauk
  const laukGrid = document.getElementById("laukGrid");
  laukGrid.innerHTML = menuData.lauk
    .map((item) => createMenuItem(item, "lauk"))
    .join("");

  // Render Pelengkap
  const pelengkapGrid = document.getElementById("pelengkapGrid");
  pelengkapGrid.innerHTML = menuData.pelengkap
    .map((item) => createMenuItem(item, "pelengkap"))
    .join("");

  // Render Sambal (horizontal slider)
  const sambalSlider = document.getElementById("sambalSlider");
  sambalSlider.innerHTML = menuData.sambal
    .map((item) => createMenuItem(item, "sambal", true))
    .join("");

  // Render Box
  const boxGrid = document.getElementById("boxGrid");
  boxGrid.innerHTML = menuData.box
    .map((item) => createMenuItem(item, "box"))
    .join("");

  // Render Tambahan (checkbox)
  const tambahanGroup = document.getElementById("tambahanGroup");
  tambahanGroup.innerHTML = menuData.tambahan
    .map((item) => createCheckboxItem(item))
    .join("");

  // Attach event listeners
  attachMenuListeners();
}

// Create menu item HTML
function createMenuItem(item, type, isSlider = false) {
  const isSelected = currentOrder[type] === item.id;
  const selectedClass = isSelected ? "selected" : "";

  return `
        <div class="menu-item ${selectedClass}" data-id="${item.id}" data-type="${type}" data-price="${item.price}" data-name="${item.name}">
            <div class="placeholder-img" style="height:150px; display:flex; align-items:center; justify-content:center; font-size:3rem;">
                ${item.image || "🍽️"}
            </div>
            <div class="menu-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-price">Rp ${formatRupiah(item.price)}</div>
            </div>
        </div>
    `;
}

// Create checkbox item HTML
function createCheckboxItem(item) {
  const isChecked = currentOrder.tambahan.includes(item.id);

  return `
        <div class="checkbox-item" data-id="${item.id}" data-type="tambahan" data-price="${item.price}" data-name="${item.name}">
            <input type="checkbox" id="tambahan_${item.id}" ${isChecked ? "checked" : ""}>
            <label for="tambahan_${item.id}">
                ${item.name} <br>
                <small>Rp ${formatRupiah(item.price)}</small>
            </label>
        </div>
    `;
}

// Attach event listeners to menu items
function attachMenuListeners() {
  // Single select items (nasi, lauk, pelengkap, sambal, box)
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      const type = this.dataset.type;
      const id = parseInt(this.dataset.id);

      // Untuk single select, toggle selection
      if (currentOrder[type] === id) {
        currentOrder[type] = null;
        this.classList.remove("selected");
      } else {
        // Remove selected class from other items of same type
        document
          .querySelectorAll(`.menu-item[data-type="${type}"]`)
          .forEach((el) => {
            el.classList.remove("selected");
          });

        currentOrder[type] = id;
        this.classList.add("selected");
      }

      validateAddToOrderButton();
    });
  });

  // Checkbox items (tambahan)
  document.querySelectorAll(".checkbox-item input").forEach((checkbox) => {
    checkbox.addEventListener("change", function (e) {
      const id = parseInt(this.closest(".checkbox-item").dataset.id);

      if (this.checked) {
        if (!currentOrder.tambahan.includes(id)) {
          currentOrder.tambahan.push(id);
        }
      } else {
        currentOrder.tambahan = currentOrder.tambahan.filter(
          (itemId) => itemId !== id,
        );
      }

      validateAddToOrderButton();
    });
  });
}

// Validate add to order button
function validateAddToOrderButton() {
  const addBtn = document.getElementById("addToOrderBtn");
  const quantity = parseInt(document.getElementById("quantity").value) || 0;

  // Check if required fields are selected
  const isComplete =
    currentOrder.nasi && currentOrder.lauk && currentOrder.box && quantity > 0;

  addBtn.disabled = !isComplete;
}

// Validate checkout button
function validateCheckoutButton() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const customerForm = document.getElementById("customerForm");

  // Check if form is valid and there are orders
  const isFormValid = customerForm.checkValidity();
  const hasOrders = orders.length > 0;

  checkoutBtn.disabled = !(isFormValid && hasOrders);
}

// Add to order
function addToOrder() {
  const quantity = parseInt(document.getElementById("quantity").value);

  // Get selected items details
  const nasi = menuData.nasi.find((item) => item.id === currentOrder.nasi);
  const lauk = menuData.lauk.find((item) => item.id === currentOrder.lauk);
  const pelengkap = currentOrder.pelengkap
    ? menuData.pelengkap.find((item) => item.id === currentOrder.pelengkap)
    : null;
  const sambal = currentOrder.sambal
    ? menuData.sambal.find((item) => item.id === currentOrder.sambal)
    : null;
  const box = menuData.box.find((item) => item.id === currentOrder.box);
  const tambahan = menuData.tambahan.filter((item) =>
    currentOrder.tambahan.includes(item.id),
  );

  // Calculate subtotal
  let subtotal = (nasi.price + lauk.price + box.price) * quantity;
  if (pelengkap) subtotal += pelengkap.price * quantity;
  if (sambal) subtotal += sambal.price * quantity;
  tambahan.forEach((item) => (subtotal += item.price * quantity));

  // Create order item
  const orderItem = {
    id: Date.now(),
    nasi,
    lauk,
    pelengkap,
    sambal,
    box,
    tambahan,
    quantity,
    subtotal,
  };

  if (editingIndex >= 0) {
    // Edit mode
    orders[editingIndex] = orderItem;
    editingIndex = -1;
  } else {
    // Add new
    orders.push(orderItem);
  }

  // Clear current selection
  resetCurrentOrder();

  // Save and render
  saveToLocalStorage();
  renderOrderList();
  updateTotalPrice();
  validateCheckoutButton();
}

// Reset current order selection
function resetCurrentOrder() {
  currentOrder = {
    nasi: null,
    lauk: null,
    pelengkap: null,
    sambal: null,
    box: null,
    tambahan: [],
  };

  // Remove all selected classes
  document.querySelectorAll(".menu-item.selected").forEach((el) => {
    el.classList.remove("selected");
  });

  // Uncheck all checkboxes
  document.querySelectorAll(".checkbox-item input").forEach((cb) => {
    cb.checked = false;
  });

  document.getElementById("quantity").value = 1;
  validateAddToOrderButton();
}

// Render order list
function renderOrderList() {
  const orderList = document.getElementById("orderList");

  if (orders.length === 0) {
    orderList.innerHTML =
      '<p class="empty-order">Belum ada pesanan. Silakan pilih menu di atas.</p>';
    return;
  }

  orderList.innerHTML = orders
    .map(
      (order, index) => `
        <div class="order-item" data-index="${index}">
            <div style="font-size:1.5rem;">${order.quantity}×</div>
            <div class="order-item-details">
                <p><strong>${order.nasi.name}</strong> + <strong>${order.lauk.name}</strong></p>
                <p>
                    ${order.pelengkap ? order.pelengkap.name + " • " : ""}
                    ${order.sambal ? order.sambal.name + " • " : ""}
                    ${order.box.name}
                </p>
                ${order.tambahan.length > 0 ? `<p><small>+ ${order.tambahan.map((t) => t.name).join(", ")}</small></p>` : ""}
            </div>
            <div class="order-item-price">
                <strong>Rp ${formatRupiah(order.subtotal)}</strong>
            </div>
            <div class="order-item-actions">
                <button class="edit-btn" onclick="editOrder(${index})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteOrder(${index})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `,
    )
    .join("");
}

// Edit order
function editOrder(index) {
  const order = orders[index];
  editingIndex = index;

  // Set current order to edit
  currentOrder = {
    nasi: order.nasi.id,
    lauk: order.lauk.id,
    pelengkap: order.pelengkap ? order.pelengkap.id : null,
    sambal: order.sambal ? order.sambal.id : null,
    box: order.box.id,
    tambahan: order.tambahan.map((t) => t.id),
  };

  // Set quantity
  document.getElementById("quantity").value = order.quantity;

  // Update UI selections
  updateSelections();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update UI selections based on currentOrder
function updateSelections() {
  // Remove all selected classes
  document.querySelectorAll(".menu-item.selected").forEach((el) => {
    el.classList.remove("selected");
  });

  // Add selected classes
  Object.keys(currentOrder).forEach((type) => {
    if (type === "tambahan") {
      // Handle checkboxes
      document.querySelectorAll(".checkbox-item input").forEach((cb) => {
        const id = parseInt(cb.closest(".checkbox-item").dataset.id);
        cb.checked = currentOrder.tambahan.includes(id);
      });
    } else {
      const id = currentOrder[type];
      if (id) {
        const item = document.querySelector(
          `.menu-item[data-type="${type}"][data-id="${id}"]`,
        );
        if (item) item.classList.add("selected");
      }
    }
  });
}

// Delete order
function deleteOrder(index) {
  if (confirm("Hapus pesanan ini?")) {
    orders.splice(index, 1);
    saveToLocalStorage();
    renderOrderList();
    updateTotalPrice();
    validateCheckoutButton();

    if (editingIndex === index) {
      editingIndex = -1;
      resetCurrentOrder();
    }
  }
}

// Update total price
function updateTotalPrice() {
  const total = orders.reduce((sum, order) => sum + order.subtotal, 0);
  document.getElementById("totalPrice").innerHTML =
    `Total: Rp ${formatRupiah(total)}`;
}

// Format rupiah
function formatRupiah(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Validate customer form
function validateCustomerForm() {
  const customerForm = document.getElementById("customerForm");
  const inputs = customerForm.querySelectorAll(
    "input[required], textarea[required]",
  );

  inputs.forEach((input) => {
    input.addEventListener("input", validateCheckoutButton);
    input.addEventListener("change", validateCheckoutButton);
  });
}

// Generate WhatsApp message
function generateWhatsAppMessage() {
  const nama = document.getElementById("nama").value;
  const tanggal = document.getElementById("tanggalAcara").value;
  const waktu = document.getElementById("waktuPengantaran").value;
  const alamat = document.getElementById("alamat").value;
  const catatan = document.getElementById("catatan").value;

  // Format tanggal
  const tanggalFormatted = new Date(tanggal).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let message = `Halo Mamah,\n\n`;
  message += `Saya *${nama}* mau pesan:\n\n`;

  // List orders
  orders.forEach((order, index) => {
    message += `${index + 1}. *${order.quantity} porsi* ${order.nasi.name} + ${order.lauk.name}\n`;
    if (order.pelengkap) message += `   - Pelengkap: ${order.pelengkap.name}\n`;
    if (order.sambal) message += `   - Sambal: ${order.sambal.name}\n`;
    message += `   - Kemasan: ${order.box.name}\n`;
    if (order.tambahan.length > 0) {
      message += `   - Tambahan: ${order.tambahan.map((t) => t.name).join(", ")}\n`;
    }
    message += `   *Rp ${formatRupiah(order.subtotal)}*\n\n`;
  });

  const total = orders.reduce((sum, order) => sum + order.subtotal, 0);

  message += `*Total pesanan: Rp ${formatRupiah(total)}*\n\n`;
  message += `Untuk tanggal: *${tanggalFormatted}*\n`;
  message += `Waktu pengantaran: *${waktu}*\n`;
  message += `Alamat: ${alamat}\n`;

  if (catatan) {
    message += `\nCatatan: ${catatan}\n`;
  }

  message += `\nApakah bisa? 🙏\n\n`;
  message += `Terima kasih Mamah!`;

  return message;
}

// Send WhatsApp message
function sendWhatsApp() {
  const message = generateWhatsAppMessage();
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "6281214367926"; // Nomor tujuan
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}

// Horizontal slider functionality
function initHorizontalSlider() {
  const slider = document.getElementById("sambalSlider");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  if (prevBtn && nextBtn && slider) {
    const scrollAmount = 300;

    prevBtn.addEventListener("click", () => {
      slider.scrollLeft -= scrollAmount;
    });

    nextBtn.addEventListener("click", () => {
      slider.scrollLeft += scrollAmount;
    });
  }
}

// Wizard progress click
function initWizardProgress() {
  document.querySelectorAll(".progress-step").forEach((step) => {
    step.addEventListener("click", function () {
      const stepNum = parseInt(this.dataset.step);
      const sections = document.querySelectorAll(".menu-section");

      // Remove active class from all steps
      document.querySelectorAll(".progress-step").forEach((s) => {
        s.classList.remove("active");
      });

      // Add active class to clicked step
      this.classList.add("active");

      // Scroll to section
      sections[stepNum - 1].scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Initialize all
document.addEventListener("DOMContentLoaded", function () {
  renderMenus();
  loadFromLocalStorage();
  validateCustomerForm();
  initHorizontalSlider();
  initWizardProgress();

  // Add to order button
  document
    .getElementById("addToOrderBtn")
    .addEventListener("click", addToOrder);

  // Checkout button
  document
    .getElementById("checkoutBtn")
    .addEventListener("click", sendWhatsApp);

  // Quantity input validation
  document
    .getElementById("quantity")
    .addEventListener("input", validateAddToOrderButton);

  // Form validation
  document
    .getElementById("customerForm")
    .addEventListener("input", validateCheckoutButton);

  // Initial validation
  validateAddToOrderButton();
  validateCheckoutButton();
});
