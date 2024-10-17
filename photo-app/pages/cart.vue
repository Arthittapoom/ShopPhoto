<template>
    <div>
      <!-- Navbar Component -->
      <Navbar />
  
      <!-- Shopping Cart Section -->
      <div class="cart-page">
        <div class="cart-container">
          <h2 class="cart-title">Shopping Cart</h2>
  
          <!-- Status Filter -->
          <div class="filter-container">
            <label for="statusFilter" class="filter-label">Filter by Status:</label>
            <select v-model="statusFilter" id="statusFilter" class="filter-select">
              <option value="">All</option>
              <option value="Not paid">Not paid</option>
              <option value="Waiting confirmation">Waiting confirmation</option>
              <option value="Confirmation">Confirmation</option>
            </select>
          </div>
  
          <div class="cart-header">
            <p>Items selected for purchase: {{ selectedItems.length }}</p>
          </div>
  
          <!-- Cart Items List -->
          <div v-for="(item, index) in filteredItems" :key="index" class="cart-item">
            <img :src="item.image" alt="item image" class="item-image" />
            <div class="item-details">
              <p><strong>Media type:</strong> {{ item.mediaType }}</p>
              <p><strong>License type:</strong> <a href="#">{{ item.licenseType }}</a></p>
              <p><strong>Price:</strong> {{ item.price }} THB</p>
              <p :class="statusClass(item.status)" class="item-status">
                Status: {{ item.status }}
              </p>
            </div>
            <input type="checkbox" v-model="item.selected" class="select-item-checkbox" />
          </div>
        </div>
  
        <!-- Payment Section -->
        <div class="payment-container">
          <h3 class="payment-title">Payment channels</h3>
          <img src="https://dummyimage.com/100x100/000/fff" alt="QR Code" class="qr-code" />
          <div class="payment-details">
            <input type="text" placeholder="Name" v-model="payment.name" class="input-field" />
            <input type="text" placeholder="Bank" v-model="payment.bank" class="input-field" />
            <input type="text" placeholder="XXX-XXXX-XXX" v-model="payment.accountNumber" class="input-field" />
          </div>
  
          <h3 class="payment-title">Transfer slip</h3>
          <input type="file" @change="handleFileUpload" class="file-input" />
          <img :src="slipImageUrl" alt="slip preview" class="slip-preview" />
          <div class="transfer-details">
            <input type="text" placeholder="Name" v-model="transfer.name" class="input-field" />
            <input type="text" placeholder="Date" v-model="transfer.date" class="input-field" />
            <input type="text" placeholder="Bank" v-model="transfer.bank" class="input-field" />
          </div>
          <div class="subtotal-container">
            <p class="subtotal-text">Subtotal: {{ selectedSubtotal }} THB</p>
            <button @click="processPayment" class="pay-button">Pay</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '~/components/Navbar.vue';
  
  export default {
    components: { Navbar },
    data() {
      return {
        statusFilter: '', // Filter value for status
        cartItems: [
          {
            mediaType: 'Editorial image | 21234422',
            licenseType: 'Rights-managed',
            price: 100,
            status: 'Not paid',
            selected: false,
            image: 'https://dummyimage.com/150x100/000/fff',
          },
          {
            mediaType: 'Editorial image | 21234422',
            licenseType: 'Rights-managed',
            price: 100,
            status: 'Waiting confirmation',
            selected: false,
            image: 'https://dummyimage.com/150x100/000/fff',
          },
          {
            mediaType: 'Editorial image | 21234422',
            licenseType: 'Rights-managed',
            price: 100,
            status: 'Confirmation',
            selected: false,
            image: 'https://dummyimage.com/150x100/000/fff',
          },
        ],
        payment: {
          name: '',
          bank: '',
          accountNumber: '',
        },
        transfer: {
          name: '',
          date: '',
          bank: '',
        },
        slipImageUrl: '',
      };
    },
    computed: {
      filteredItems() {
        // If a status is selected, filter by status, otherwise return all items
        if (this.statusFilter) {
          return this.cartItems.filter((item) => item.status === this.statusFilter);
        }
        return this.cartItems;
      },
      selectedItems() {
        // Return only selected items
        return this.cartItems.filter((item) => item.selected);
      },
      selectedSubtotal() {
        // Calculate subtotal of selected items
        return this.selectedItems.reduce((total, item) => total + item.price, 0);
      },
    },
    methods: {
      statusClass(status) {
        if (status === 'Not paid') return 'not-paid';
        if (status === 'Waiting confirmation') return 'waiting-confirmation';
        return 'confirmation';
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        this.slipImageUrl = URL.createObjectURL(file);
      },
      processPayment() {
        // alert('Payment processed!');
        console.log( this.payment , this.transfer , this.slipImageUrl , this.selectedSubtotal);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Overall Layout */
  .cart-page {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    gap: 2rem;
    font-family: Arial, sans-serif;
  }
  
  /* Filter */
  .filter-container {
    margin-bottom: 1.5rem;
  }
  
  .filter-label {
    font-weight: bold;
    margin-right: 1rem;
  }
  
  .filter-select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  /* Cart Section */
  .cart-container {
    flex: 2;
  }
  
  .cart-title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .cart-header {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
  
  .item-image {
    width: 150px;
    height: 100px;
    margin-right: 1rem;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details p {
    margin: 0.25rem 0;
  }
  
  .item-status {
    margin-top: 0.5rem;
    font-weight: bold;
  }
  
  .select-item-checkbox {
    margin-left: 1rem;
    cursor: pointer;
  }
  
  .not-paid {
    color: red;
  }
  
  .waiting-confirmation {
    color: orange;
  }
  
  .confirmation {
    color: green;
  }
  
  /* Payment Section */
  .payment-container {
    flex: 1;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 10px;
  }
  
  .payment-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .qr-code {
    width: 100px;
    height: 100px;
    margin-bottom: 1.5rem;
  }
  
  .input-field {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .file-input {
    margin-bottom: 1rem;
  }
  
  .slip-preview {
    width: 100px;
    height: 100px;
    margin-top: 1rem;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .subtotal-container {
    margin-top: 2rem;
  }
  
  .subtotal-text {
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .pay-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .pay-button:hover {
    background-color: #0056b3;
  }
  </style>
  