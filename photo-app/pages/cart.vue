<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Shopping Cart Section -->
    <div class="cart-page">
      <div class="cart-container">
        <h2 class="cart-title">Shopping Cart</h2>
        <div class="row">
          <div class="col">
            <div class="cart-header">
              <p>Items selected for purchase: {{ selectedItems.length }}</p>
            </div>
          </div>
          <div class="col">
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
          </div>
        </div>


        <div class="scrollable-content">
          <!-- Cart Items List -->
          <div v-for="(item, index) in filteredItems" :key="index" class="cart-item ">
            <img :src="item.image" alt="item image" class="item-image" />
            <div class="item-details">
              <p><strong>Media type:</strong> {{ item.mediaType }}</p>
              <p><strong>License type:</strong> <a href="#">{{ item.licenseType }}</a></p>
              <p><strong>Price:</strong> {{ item.price }} THB</p>

              <!-- row -->

              <div class="row">
                <div class="col-7">
                  <p :class="statusClass(item.status)" class="item-status">
                    Status: {{ item.status }}
                  </p>
                </div>
                <div class="col">
                  <button v-if="item.status === 'confirmation'" class="download-button"
                    @click="downloadItem(item)">Dorwnload</button>
                </div>
              </div>

              <button class="remove-button" @click="removeItem(item)">Remove</button>
            </div>
            <input type="checkbox" v-model="item.selected" class="select-item-checkbox" />
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="payment-container">
        <h3 class="payment-title">Payment channels</h3>
        <div class="row">
          <div class="col">
            <img src="https://dummyimage.com/200x200/000/fff" alt="QR Code" class="qr-code" />
          </div>
          <div class="col">
            <div class="payment-details">
              <input type="text" placeholder="Name" v-model="payment.name" class="input-field" disabled />
              <input type="text" placeholder="Bank" v-model="payment.bank" class="input-field" disabled />
              <input type="text" placeholder="XXX-XXXX-XXX" v-model="payment.accountNumber" class="input-field"
                disabled />
            </div>
          </div>
        </div>

        <h3 class="payment-title">Transfer slip</h3>
        <input type="file" @change="handleFileUpload" class="file-input" />
        <img v-if="slipImageUrl" :src="slipImageUrl" alt="slip preview" class="slip-preview" />
        <div class="transfer-details">
          <div class="row">
            <div class="col">
              <input type="text" placeholder="Name" v-model="transfer.name" class="input-field" />
            </div>
            <div class="col">
              <input type="text" placeholder="Bank" v-model="transfer.bank" class="input-field" />
            </div>
            <div class="col">
              <input type="text" placeholder="Date" v-model="transfer.date" class="input-field" />
            </div>
          </div>
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
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';  // ใช้ Firebase ในโปรเจกต์

import Navbar from '~/components/Navbar.vue';

export default {
  components: { Navbar },
  data() {
    return {
      statusFilter: '', // Filter value for status
      cartItems: [], // เริ่มต้นเป็น array ว่างสำหรับเก็บข้อมูลจาก Firebase
      payment: {
        name: 'กสัน จิราวุธ',
        bank: 'กสิกรไทย',
        accountNumber: '25-1234-5678',
      },
      transfer: {
        name: '',
        date: '',
        bank: '',
      },
      slipImageUrl: '', // เก็บ URL ของสลิปที่อัพโหลด
      file: null,  // เก็บไฟล์ที่เลือก
      loading: false,  // สถานะการอัพโหลดไฟล์
    };
  },
  mounted() {
    this.fetchCartItems(); // ดึงข้อมูลจาก Firebase เมื่อ component ถูกสร้างขึ้น
    
  },
  computed: {
    filteredItems() {
      const user = firebase.auth().currentUser;
    if (user) {
      console.log('User:', user.multiFactor.user.uid);
    }
    
      // ถ้าเลือกสถานะจะแสดงผลตามสถานะที่เลือก
      if (this.statusFilter) {
        return this.cartItems.filter((item) => item.status === this.statusFilter);
      }
      return this.cartItems;
    },
    selectedItems() {
      // แสดงเฉพาะรายการที่ถูกเลือก
      return this.cartItems.filter((item) => item.selected);
    },
    selectedSubtotal() {
      // คำนวณยอดรวมของรายการที่ถูกเลือก
      return this.selectedItems.reduce((total, item) => total + parseFloat(item.price), 0);
    },
  },
  methods: {
    fetchCartItems() {
      firebase.database().ref('carts').on('value', (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          items.push({
            mediaType: item.selectedImage.mediaType || 'Unknown media type',
            licenseType: item.selectedImage.mediaLicense || 'Unknown license',
            price: item.mediaPrice || 0,
            image: item.selectedImage.imagePreview || 'https://dummyimage.com/150x100/000/fff',
            price: item.selectedImage.mediaPrice || 0,
            status: item.selectedImage.status || 'Not paid', // คุณสามารถปรับเปลี่ยนสถานะได้ตามที่คุณต้องการ
            selected: false,
            username: item.username || 'Unknown user', // เก็บข้อมูล username
            data: item,
          });
        });
        this.cartItems = items; // อัปเดตข้อมูล cartItems
        Swal.fire({
          title: 'Success!',
          text: 'Cart items fetched successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: `Failed to fetch cart items: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
    },
    statusClass(status) {
      if (status === 'Not paid') return 'not-paid';
      if (status === 'Waiting confirmation') return 'waiting-confirmation';
      return 'confirmation';
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.file = file;  // เก็บไฟล์ที่เลือกไว้เพื่ออัพโหลดในภายหลัง
      this.slipImageUrl = URL.createObjectURL(file);  // แสดงรูปที่เลือกในหน้าเว็บ
    },
    async uploadSlipAndSavePayment() {
      // เช็คว่ามีไฟล์หรือไม่
      if (!this.file) {
        Swal.fire('Error', 'Please select an image to upload.', 'error');
        return;
      }

      try {
        // แสดง loading ระหว่างการอัพโหลด
        this.loading = true;

        // อัพโหลดรูปไปที่ Firebase Storage
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`slips/${this.file.name}`);
        const snapshot = await fileRef.put(this.file);
        const downloadURL = await snapshot.ref.getDownloadURL();

        // นำ URL ที่ได้มาเก็บใน slipImageUrl
        this.slipImageUrl = downloadURL;

        // สร้างข้อมูลการชำระเงิน
        const Payment = {
          ...this.transfer,
          selectedSubtotal: this.selectedSubtotal,
          slipImageUrl: this.slipImageUrl,  // ใช้ URL จาก Firebase
          ...this.selectedItems
        };

        // บันทึกข้อมูลการชำระเงิน (คุณสามารถปรับให้เก็บลง Firebase Database หรืออื่นๆ ได้ตามต้องการ)
        await firebase.database().ref('payments').push(Payment);

        // แสดงข้อความเมื่อบันทึกเรียบร้อย
        Swal.fire('Success', 'Payment processed successfully!', 'success');


      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      } finally {
        this.loading = false;
      }
    },
    processPayment() {
      // ตรวจสอบความครบถ้วนของข้อมูลการโอนเงิน
      if (!this.transfer.name || !this.transfer.bank || !this.transfer.date) {
        Swal.fire({
          title: 'Error!',
          text: 'Please fill in all required fields.',
          icon: 'error',
        });
        return;
      }

      // เรียกฟังก์ชันอัพโหลดรูปและบันทึกข้อมูลการชำระเงิน
      this.uploadSlipAndSavePayment();
    },
    async downloadItem(item) {
  try {
    console.log("Starting to download item:", item.image); // ดูว่า image URL มีค่าอะไร
    
    // อ้างอิงไปยังไฟล์ใน Firebase Storage
    const storageRef = firebase.storage().refFromURL(item.image); // ใช้ URL จาก Firebase Storage
    
    // ดึง URL ที่สามารถดาวน์โหลดได้
    const downloadURL = await storageRef.getDownloadURL();
    console.log("Download URL:", downloadURL); // แสดง URL ที่ได้รับ

    // เปิดหน้าต่างใหม่เพื่อดาวน์โหลดไฟล์
    window.open(downloadURL, '_blank');
  } catch (error) {
    console.error('Error downloading file:', error);
    Swal.fire('Error', 'Failed to download file. Please try again later.', 'error');
  }
},


    removeItem(item) {
      this.cartItems = this.cartItems.filter((i) => i !== item);
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

/* Scrollable content */
.scrollable-content {
  width: 100%;
  height: 66.5vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
}

/* Custom scrollbar */
.scrollable-content::-webkit-scrollbar {
  width: 8px;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  border-radius: 4px;
}

.scrollable-content::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff;
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

.download-button {
  margin-left: 1rem;
  cursor: pointer;
  height: 30px;
  width: auto;
  background-color: #0f6e43;
  color: white;
  border: none;
  border-radius: 5px;
}

.remove-button {
  margin-left: 1rem;
  cursor: pointer;
  height: 30px;
  width: auto;
  background-color: #3f3f3f;
  color: white;
  border: none;
  border-radius: 5px;
}

.download-button:hover {
  background-color: #647b70;
}

.select-item-checkbox {
  margin-left: 1rem;
  cursor: pointer;
  height: 20px;
  width: 20px;
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
  background-color: #ABC4D4;
  padding: 1rem;
  border-radius: 10px;
}

.payment-title {
  font-size: 1.5rem;
  /* margin-bottom: 1rem; */
  color: #166798;
}

.qr-code {
  width: 200px;
  height: 200px;
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
  width: 200px;
  height: 200px;
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
  color: #166798;
}

.pay-button {
  /* margin-top: 1rem; */
  padding: 0.75rem 1.5rem;
  background-color: #166798;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.pay-button:hover {
  background-color: #0f4b6e;
}
</style>