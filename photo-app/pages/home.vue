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
  
      <!-- Introduction Section -->
      <section class="intro">
        <h2>สร้างความเชื่อมโยงที่ลึกซึ้งด้วยภาพถ่ายสต็อกที่สมจริง</h2>
        <p>
          เข้าถึงและเชื่อมต่อจิตวิญญาณของคุณด้วยหลากหลายหมวดหมู่ของภาพถ่ายสต็อกที่หลากหลาย
          ที่นำเสนอภาพลิขสิทธิ์คุณภาพสูงที่สมจริง
        </p>
        <button @click="viewPlans">View Plans and Pricing</button>
      </section>
  
      <!-- Dynamic Popular Tags -->
      <section class="tags-section">
        <h3>สำรวจคำค้นหายอดนิยมประจำสัปดาห์</h3>
        <div class="tags">
          <button v-for="tag in popularTags" :key="tag" @click="filterByTag(tag)">
            {{ tag }}
          </button>
        </div>
      </section>
  
      <!-- Dynamic Popular Image Categories -->
      <section class="popular-categories">
        <h3>หมวดหมู่ภาพถ่ายสต็อกที่กำลังเป็นที่นิยม</h3>
        <div class="category-grid">
          <div
            v-for="category in popularCategories"
            :key="category.id"
            class="category-card"
          >
            <img :src="category.image" :alt="category.name" />
            <p>{{ category.name }}</p>
          </div>
        </div>
      </section>
  
      <!-- Social Media Links -->
      <section class="social-media">
        <h3>พร้อมที่จะเรียนรู้เพิ่มเติม?</h3>
        <div class="social-icons">
          <a href="#" class="social-icon">
            <img src="https://dummyimage.com/200x200/ff00ff/fff" alt="YouTube" />
          </a>
          <a href="#" class="social-icon">
            <img src="https://dummyimage.com/200x200/ff00ff/fff" alt="Instagram" />
          </a>
          <a href="#" class="social-icon">
            <img src="https://dummyimage.com/200x200/ff00ff/fff" alt="Pinterest" />
          </a>
        </div>
      </section>
  
      <!-- Dynamic Image Gallery -->
      <section class="gallery-section">
        <h3>รูปภาพในคลัง</h3>
        <div class="gallery-grid">
          <div v-for="image in galleryImages" :key="image.id" class="gallery-item">
            <img :src="image.url" :alt="image.alt" />
          </div>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section class="faq-section">
        <h3>คำถามที่พบบ่อย ?</h3>
        <div class="faq-list">
          <p v-for="faq in faqs" :key="faq.question">
            {{ faq.question }} >
          </p>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        popularTags: ['ความเป็นอยู่', 'อาหารไทย', 'วัฒนธรรมไทย', 'สปา', 'ความงามไทย'],
        popularCategories: [
          { id: 1, name: 'ความเป็นอยู่', image: 'https://dummyimage.com/200x200/ff00ff/fff' },
          { id: 2, name: 'ความเป็นอยู่', image: 'https://dummyimage.com/200x200/ff00ff/fff' },
          { id: 3, name: 'ความเป็นอยู่', image: 'https://dummyimage.com/200x200/ff00ff/fff' },
          { id: 4, name: 'ความเป็นอยู่', image: 'https://dummyimage.com/200x200/ff00ff/fff' },
          { id: 5, name: 'ความเป็นอยู่', image: 'https://dummyimage.com/200x200/ff00ff/fff' },
        ],
        galleryImages: [
          { id: 1, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 1' },
          { id: 2, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 2' },
          { id: 3, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 3' },
          { id: 4, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 4' },
          { id: 5, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 5' },
          { id: 6, url: 'https://dummyimage.com/200x200/ff00ff/fff', alt: 'Image 6' },
        ],
        faqs: [
          { question: 'อะไรคือรูปภาพในคลัง?' },
          { question: 'ทำไมคนถึงรวบรวมรูปไว้ในคลัง?' },
          { question: 'รูปภาพในคลังต่างจากรูปภาพทั่วไปยังไง?' },
        ],
      };
    },
    methods: {
      handleSearch() {
        alert(`Searching for: ${this.searchQuery}`);
      },
      filterByTag(tag) {
        alert(`Filtering by tag: ${tag}`);
      },
      viewPlans() {
        alert('Viewing plans and pricing');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic Layout */
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    padding: 1rem;
    background-image: url('../static/home/header.png');
    background-size: cover;
    background-position: center;
    text-align: center;
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
    border: 1px solid #ddd;
    border-radius: 5px;
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
  
  .intro {
    text-align: center;
    margin: 3rem 0;
  }
  
  .intro button {
    background-color: #146799;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Popular Tags */
  .tags-section {
    text-align: center;
    margin: 3rem 0;
  }
  
  .tags button {
    background-color: white;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
  }
  
  /* Popular Categories */
  .popular-categories {
    text-align: center;
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .category-card img {
    width: 100%;
    border-radius: 5px;
  }
  
  /* Social Media Section */
  .social-media {
    background-color: #146799;
    padding: 2rem;
    text-align: center;
    color: white;
  }
  
  .social-icons a {
    margin: 0 1rem;
  }
  
  .social-icons img {
    width: 50px;
  }
  
  /* Gallery Section */
  .gallery-section {
    margin: 3rem 0;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .gallery-item img {
    width: 100%;
    border-radius: 5px;
  }
  
  /* FAQ Section */
  .faq-section {
    text-align: center;
    margin: 3rem 0;
  }
  
  .faq-list p {
    margin: 1rem 0;
    cursor: pointer;
  }
  </style>
  