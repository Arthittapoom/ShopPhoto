<template>
    <div>
        <!-- Navbar Component -->
      <Navbar />

      <!-- Header with Search Bar -->
      <header class="header">
        <div class="container">
          <div class="search-bar">
            <input type="text" placeholder="ค้นหาภาพถ่ายที่คุณต้องการ" v-model="searchQuery" />
            <button @click="handleSearch">🔍</button>
          </div>
        </div>
      </header>
  
      <!-- Popular Tags -->
      <section class="tags-section">
        <div class="tags">
          <button v-for="tag in popularTags" :key="tag" @click="filterByTag(tag)">
            {{ tag }}
          </button>
        </div>
      </section>
  
      <!-- Dynamic Image Grid -->
      <section class="image-grid-section">
        <div class="image-grid">
          <div v-for="image in displayedImages" :key="image.id" class="image-item">
            <img :src="image.url" :alt="image.alt" />
          </div>
        </div>
      </section>
  
      <!-- Pagination -->
      <section class="pagination-section">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="!hasMorePages">Next</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        popularTags: ['ความเป็นอยู่', 'อาหารไทย', 'วัฒนธรรมไทย', 'สปา', 'สถานที่ท่องเที่ยว'],
        images: [
          { id: 1, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 1' },
          { id: 2, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 2' },
          { id: 3, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 3' },
          { id: 4, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 4' },
          { id: 5, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 5' },
          { id: 6, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 6' },
          { id: 7, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 7' },
          { id: 8, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 8' },
          { id: 9, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 9' },
          { id: 10, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 10' },
          { id: 11, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 11' },
          { id: 12, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 12' },
          { id: 13, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 13' },
          { id: 14, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 14' },
          { id: 15, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 15' },
          { id: 16, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 16' },
          { id: 17, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 17' },
          { id: 18, url: 'https://dummyimage.com/300x300/000/fff', alt: 'Image 18' },
        ],
        currentPage: 1,
        imagesPerPage: 15,
      };
    },
    computed: {
      displayedImages() {
        const start = (this.currentPage - 1) * this.imagesPerPage;
        return this.images.slice(start, start + this.imagesPerPage);
      },
      hasMorePages() {
        return this.currentPage * this.imagesPerPage < this.images.length;
      },
    },
    methods: {
      handleSearch() {
        alert(`Searching for: ${this.searchQuery}`);
      },
      filterByTag(tag) {
        alert(`Filtering by tag: ${tag}`);
      },
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
    height: 300px;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
  
  .search-bar input {
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .search-bar button {
    padding: 0.75rem;
    background-color: #007bff;
    border: none;
    color: white;
    margin-left: 1rem;
    cursor: pointer;
  }
  
  .tags-section {
    text-align: center;
    margin: 2rem 0;
  }
  
  .tags button {
    background-color: white;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
  }
  
  .image-grid-section {
    padding: 1rem 0;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.2rem;
  }
  
  .image-item img {
    width: 100%;
    border-radius: 5px;
  }
  
  .pagination-section {
    text-align: center;
    margin: 2rem 0;
  }
  
  .pagination-section button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin: 0 0.5rem;
  }
  
  .pagination-section button:disabled {
    background-color: #ccc;
  }
  </style>
  