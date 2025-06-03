const accessKey = 'I3m5TB5DwjEKO20bQWDH-OySv1oFpkswhhrBzD2sWXA';
const query = 'chicken meal';
fetchImagesByCategory('chicken dish', 'chicken-items');
fetchImagesByCategory('breakfast', 'breakfast-items');
fetchImagesByCategory('sandwich', 'sandwiches-items');
fetchImagesByCategory('dessert', 'desserts-items');
fetchImagesByCategory('cold drinks', 'drinks-items');
fetchImagesByCategory('fresh salad', 'salads-items');

function fetchImagesByCategory(query, elementId) {
  fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=4&client_id=${accessKey}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(elementId);
      data.results.forEach(img => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = img.urls.small;
        image.alt = img.alt_description || 'Meal';

        const title = document.createElement('h3');
        title.textContent = img.alt_description || 'Delicious Meal';

        const price = document.createElement('p');
        price.textContent = `$${(Math.random() * 10 + 5).toFixed(2)}`;

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        container.appendChild(card);;
      });
  })
  .catch(err => console.error('Error loading images:', err));
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// تعريف الكلاس
class Order {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

// مصفوفة الطلبات
let orders = [];

// تحميل الطلبات من localStorage إذا كانت موجودة
function loadOrdersFromStorage() {
  const savedOrders = localStorage.getItem("orders");
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
    renderOrders(); // عرض الطلبات بالجدول
  }
}

// عرض الطلبات في الجدول
function renderOrders() {
  const tbody = document.querySelector("#orders-table tbody");
  tbody.innerHTML = ""; // نفرغ الجدول

  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.price}</td>
      <td><img src="${order.image}" width="100" /></td>
    `;
    tbody.appendChild(row);
  });
}

// إضافة طلب جديد
function addOrderToTable(event) {
  event.preventDefault();

  const name = document.getElementById("meal-name").value;
  const price = document.getElementById("meal-price").value;
  const image = document.getElementById("meal-image").value;

  const newOrder = new Order(name, price, image);
  orders.push(newOrder);

  // تحديث التخزين
  localStorage.setItem("orders", JSON.stringify(orders));

  // إعادة عرض الجدول
  renderOrders();

  // تفريغ الفورم
  document.getElementById("order-form").reset();
}

// مسح الطلبات بالكامل
function clearOrders() {
  if (confirm("هل أنت متأكدة من مسح كل الطلبات؟")) {
    orders = [];
    localStorage.removeItem("orders");

    const tbody = document.querySelector("#orders-table tbody");
    tbody.innerHTML = "";
  }
}

// الأحداث
document.getElementById("order-form").addEventListener("submit", addOrderToTable);
document.getElementById("clear-orders").addEventListener("click", clearOrders);

// تحميل الطلبات عند بداية الصفحة
loadOrdersFromStorage();
