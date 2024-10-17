<template>
    <nav class="navbar">

      <div class="navbar-container">
        <!-- Logo aligned to the left -->
        <div class="logo">
          <nuxt-link to="/">Gallery Gain</nuxt-link>
        </div>
        <!-- Navigation links aligned to the right -->
        <div class="nav-links">
          <nuxt-link to="/home">Home</nuxt-link>
          <nuxt-link to="/board">Board</nuxt-link>
          <nuxt-link to="/cart">Cart</nuxt-link>
          <nuxt-link to="/dashboard">Dashboard</nuxt-link>
          <nuxt-link to="/login">Sign In</nuxt-link>
          <nuxt-link to="/signup">Sign Up</nuxt-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style scoped>
  /* Style for the Navbar */
  .navbar {
    background-color: #146799;
    padding: 1rem;
    width: 100%; /* Ensure the navbar spans full width */
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
    color: #fff;
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
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  