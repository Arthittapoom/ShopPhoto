<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <!-- Header with Search Bar -->
    <header class="header">
      <div class="container">
        <div class="search-bar">
          <input
            type="text"
            placeholder="ค้นหาภาพถ่ายที่คุณต้องการ"
            v-model="searchQuery"
          />
          <button @click="handleSearch"><img src="../static/home/search.png" alt="" /></button>
        </div>
      </div>
    </header>

    <!-- Popular Tags (Categories) -->
    <section class="tags-section">
      <div class="tags">
        <button v-for="tag in availableCategories" :key="tag" @click="filterByTag(tag)">
          {{ tag }}
        </button>
      </div>
    </section>

    <!-- Dynamic Image Grid -->
    <section class="image-grid-section">
      <div class="image-grid">
        <div
          v-for="image in filteredImages"
          :key="image.id"
          class="image-item"
          @click="showImageDetails(image)"
        >
          <img :src="image.imagePreview" :alt="image.mediaName" />
        </div>
      </div>
    </section>

    <!-- Image Details Modal -->
    <div v-if="selectedImage" class="modal">
      <div class="modal-content">
        <img :src="selectedImage.imagePreview" alt="Selected Image" />
        <p><strong>Media Name:</strong> {{ selectedImage.mediaName }}</p>
        <p><strong>Categories:</strong> {{ selectedImage.mediaCategories }}</p>
        <p><strong>License:</strong> {{ selectedImage.mediaLicense }}</p>
        <p><strong>Price:</strong> {{ selectedImage.mediaPrice }}</p>
        <button @click="closeModal">กลับ</button>
        <button @click="confirmSelection">ตกลง</button>
      </div>
    </div>

    <!-- Pagination -->
    <section class="pagination-section">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>{{ currentPage }}</span>
      <button class="" @click="nextPage" :disabled="!hasMorePages">Next</button>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import firebase from '~/plugins/firebase.js';

export default {
  data() {
    return {
      searchQuery: '',
      availableCategories: [],
      images: [],
      filteredImages: [],
      selectedImage: null,
      currentPage: 1,
      imagesPerPage: 15,
    };
  },

  computed: {
    displayedImages() {
      const start = (this.currentPage - 1) * this.imagesPerPage;
      return this.filteredImages.slice(start, start + this.imagesPerPage);
    },
    hasMorePages() {
      return this.currentPage * this.imagesPerPage < this.filteredImages.length;
    },
  },

  mounted() {
    this.getCategories();
    this.getPhotos();

    
  },

  methods: {
    // ดึงข้อมูลหมวดหมู่จาก Firebase
    getCategories() {
      const dbRef = firebase.database().ref('categories');
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.availableCategories = Object.values(data);
          console.log( this.availableCategories );
        }
      });
    },

    // ดึงข้อมูลรูปภาพจาก Firebase
    getPhotos() {
      const dbRef = firebase.database().ref('photos');
      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.images = Object.values(data);
          this.filteredImages = this.images;

          console.log( this.images );
        }
      });
    },

    // ฟังก์ชันค้นหารูปภาพจากชื่อหรือหมวดหมู่
    handleSearch() {
      this.filteredImages = this.images.filter((image) => {
        return (
          image.mediaName.includes(this.searchQuery) ||
          image.mediaCategories.includes(this.searchQuery)
        );
      });
    },

    // ฟังก์ชันกรองรูปภาพตามหมวดหมู่
    filterByTag(tag) {
      this.filteredImages = this.images.filter((image) =>
        image.mediaCategories.includes(tag)
      );
    },

    // ฟังก์ชันแสดงรายละเอียดของรูปภาพ
    showImageDetails(image) {
      this.selectedImage = image;
    },

    // ฟังก์ชันปิดโมดัล
    closeModal() {
      this.selectedImage = null;
    },

    // ฟังก์ชันยืนยันการเลือกภาพ
    confirmSelection() {
      Swal.fire('Selected Image', 'You have selected this image.', 'success');
      this.selectedImage = null;
    },

    // การเปลี่ยนหน้า pagination
    nextPage() {
      if (this.hasMorePages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
 /* Layout Styles */
 .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    padding: 1rem;
    background-image: url('../static/home/header.png');
    background-size: cover;
    background-position: center;
    height: 400px;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem 0;
    margin-top: 1rem;
  }
  
  .search-bar input {
    padding: 0.5rem;
    border: 1px solid #ffffff;
    border-radius: 3px;
    width: 600px;
  }
  
  .search-bar button {
    background-color: #146799;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .tags-section {
    text-align: center;
    margin: 2rem 0;
  }
  
  .tags button {
    border-radius: 15px;
    background-color: white;
    border: 1px solid #146799;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }

  .tags button:hover {
    background-color: #146799;
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.196);
    transition: all 0.1s ease-in-out;
    color: white;
  }
  
  .image-grid-section {
    padding: 1rem 1rem 2rem 1rem;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.2rem;
  }
  
  .image-item img {
    width: 100%;
    border-radius: 5px;
    transition: all 0.1s ease-in-out;
  }
  
  .image-item img:hover {
    transform: scale(1.01);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.196);
    transition: all 0.1s ease-in-out;
  }
  
  .pagination-section {
    text-align: center;
    margin: 2rem 0;
  }
  
  .pagination-section button {
    background-color: #146799;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin: 0 0.5rem;
    border-radius: 5px;
  }
  
  .pagination-section button:hover {
    background-color: #327ab9; 
  }
  
  .pagination-section button:disabled {
    background-color: #ccc;
  }

  /* mobile */

  @media (max-width: 768px) {
    .image-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

.modal {
  position: fixed;
  top: 60px;
  left: 35%;
  width: auto;
  height: auto;
  /* background: rgba(255, 255, 255, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
