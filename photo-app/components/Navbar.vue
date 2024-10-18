<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo aligned to the left -->
      <div class="logo">
        <nuxt-link to="/">Gallery Gain</nuxt-link>
      </div>

      <!-- Hamburger menu for mobile -->
      <div class="menu-toggle" @click="toggleMenu">
        ☰
      </div>

      <!-- Navigation links aligned to the right -->
      <div :class="['nav-links', { 'nav-active': isMenuOpen }]">
        <nuxt-link to="/home">Home</nuxt-link>
        <nuxt-link to="/board">Board</nuxt-link>
        <nuxt-link to="/cart">Cart</nuxt-link>
        <nuxt-link to="/addPhoto">Admin</nuxt-link>
        <nuxt-link to="/login">Sign In</nuxt-link>
        <nuxt-link to="/signup">Sign Up</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false, // State to control mobile menu
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggle the menu visibility
    },
  },
};
</script>

<style scoped>
/* Style for the Navbar */
.navbar {
  background-color: #ffffff;
  padding: 1rem;
  width: 100%; /* Ensure the navbar spans full width */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Flex container for logo and links */
.navbar-container {
  display: flex;
  justify-content: space-between; /* Ensure logo on the left, links on the right */
  align-items: center; /* Vertically align logo and links */
  max-width: 1200px;
  margin: 0 auto; /* Center the navbar-container within the page */
  width: 100%; /* Ensure it stretches to full width */
}

/* Logo aligned to the left */
.logo a {
  color: #146799;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

/* Links aligned to the right */
.nav-links {
  display: flex;
  gap: 2rem; /* Add spacing between links */
}

.nav-links a {
  color: #000000;
  text-decoration: none;
  font-size: 1rem;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* Hamburger menu button */
.menu-toggle {
  display: none;
  font-size: 2rem;
  color: #146799;
  cursor: pointer;
}

/* Mobile-specific styling */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Hide navigation links by default on mobile */
    flex-direction: column; /* Stack links vertically */
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    padding: 1rem;
    z-index: 100;
  }

  /* Display the links when the menu is open */
  .nav-active {
    display: flex;
  }

  .menu-toggle {
    display: block; /* Show hamburger menu on mobile */
  }

  .nav-links a {
    padding: 1rem 0;
    text-align: center;
    width: 100%;
  }
}
</style>
