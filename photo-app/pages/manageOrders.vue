<template>
    <div class="manage-orders-container">
        <h1>Manage Orders</h1>

        <div class="order-list container scrollable-content">
            <!-- Orders Loop -->
            <div v-for="(order, index) in orders" :key="index" class="order-item">
                <!-- <div class="order-image">
                    <img :src="order.image" alt="Order Image" />
                </div> -->
                <div class="order-details">
                    <p><strong>email: </strong> {{ order.email ? order.email : 'No email' }}</p>
                    <p><strong>Total photos: </strong> {{ order.order ? order.order.length : 0 }}</p>
                    <!-- ตรวจสอบว่ามี order และเป็นอาเรย์ -->
                    <p><strong>Price photos:</strong> {{ order.selectedSubtotal }} THB</p>
                </div>

                <div class="order-details">
                    <p><strong>bank slip:</strong> {{ order.transfer && order.transfer.bank ? order.transfer.bank
                        : 'N/A' }}</p>
                    <p><strong>name slip:</strong> {{ order.transfer && order.transfer.name ? order.transfer.name :
                        'N/A' }}</p>
                    <p><strong>date slip:</strong> {{ order.transfer && order.transfer.date ? order.transfer.date :
                        'N/A' }}</p>
                </div>

                <div class="order-action">
                    <button @click="openModal(order)">Transfer slip</button>
                    <p><strong>status:</strong> {{ order.status || 'N/A' }}</p>
                </div>
            </div>
        </div>

        <!-- Transfer Slip Modal -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <h3>Transfer slip</h3>
                <img :src="selectedOrder.slipImageUrl" alt="Order Slip" />
                <div class="modal-actions">
                    <button class="cancel-button" @click="closeModal">Cancel</button>
                    <button class="confirm-button" @click="confirmOrder">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';
export default {
    layout: 'MenuBar',

    async asyncData({ store }) {
        const page = 'manageOrders';
        store.commit('user/setPages', page);
    },

    data() {
        return {
            orders: [
                {
                    image: 'https://dummyimage.com/300x200/000/fff',
                    mediaName: 'Media name',
                    mediaCategory: 'Media Category',
                    mediaWatermark: 'Media watermark',
                    mediaType: 'Media type',
                    mediaPrice: 'Media price',
                    mediaLicense: 'Media License',
                },
                {
                    image: 'https://dummyimage.com/300x200/000/fff',
                    mediaName: 'Media name',
                    mediaCategory: 'Media Category',
                    mediaWatermark: 'Media watermark',
                    mediaType: 'Media type',
                    mediaPrice: 'Media price',
                    mediaLicense: 'Media License',
                },
                {
                    image: 'https://dummyimage.com/300x200/000/fff',
                    mediaName: 'Media name',
                    mediaCategory: 'Media Category',
                    mediaWatermark: 'Media watermark',
                    mediaType: 'Media type',
                    mediaPrice: 'Media price',
                    mediaLicense: 'Media License',
                },
                {
                    image: 'https://dummyimage.com/300x200/000/fff',
                    mediaName: 'Media name',
                    mediaCategory: 'Media Category',
                    mediaWatermark: 'Media watermark',
                    mediaType: 'Media type',
                    mediaPrice: 'Media price',
                    mediaLicense: 'Media License',
                },
                // Additional orders can be added here
            ],
            showModal: false,
            selectedOrder: null,
        };
    },

    mounted() {
        this.fetchOrders();
    },

    methods: {
        async fetchOrders() {
            firebase.database().ref('payments').on('value', (snapshot) => {
                this.orders = []; // ล้างข้อมูลเก่า
                snapshot.forEach((childSnapshot) => {
                    const orderData = {
                        ...childSnapshot.val(), // ดึงข้อมูลของแต่ละออบเจ็กต์
                        id: childSnapshot.key   // เพิ่มคีย์ลงในข้อมูลของแต่ละรายการ
                    };
                    this.orders.push(orderData); // เพิ่มรายการนี้ในอาเรย์ orders
                });
                // console.log(this.orders); // ตรวจสอบข้อมูล
            });
        },


        openModal(order) {
            this.selectedOrder = order;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedOrder = null;
        },
        confirmOrder() {
            // Handle order confirmation logic here
            // console.log('Order confirmed:', this.selectedOrder.order);
            this.selectedOrder.order.forEach((item) => {
                firebase.database().ref('carts/' + item.id).update({
                    status: 'confirmation'
                })
            })

            // update status payments to confirmation
            firebase.database().ref('payments/' + this.selectedOrder.id).update({
                status: 'confirmation'
            })

            this.closeModal();
        },
    },
};
</script>

<style scoped>
.manage-orders-container {
    max-width: auto;
    margin: 0 auto;
}

.order-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.order-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
}

.order-image img {
    width: 150px;
    height: 100px;
    object-fit: cover;
}

.order-details {
    flex: 1;
    padding: 0 20px;
}

.order-action button {
    padding: 8px 16px;
    background-color: #166798;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;

}

.order-action button:hover {
    background-color: #0056b3;
}

.modal-overlay {
    position: fixed;
    left: 30%;
    top: 25%;
    width: 50vw;
    height: 50vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

.modal-actions {
    margin-top: 20px;
}

.modal-actions button {
    padding: 8px 16px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.cancel-button {
    background-color: #d9534f;
    color: white;
}

.confirm-button {
    background-color: #5cb85c;
    color: white;
}

/* Scrollable content */
.scrollable-content {
    width: 100%;
    height: 80vh;
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
</style>