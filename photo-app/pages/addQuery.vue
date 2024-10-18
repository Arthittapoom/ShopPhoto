<template>
    <div class="add-query-container">
      <h1>Add Query</h1>
  
      <div class="form-section">
        <!-- Input fields for Query and Message -->
        <div class="form-field">
          <input type="text" v-model="query" placeholder="Query" />
        </div>
  
        <div class="form-field">
          <input type="text" v-model="message" placeholder="message" />
        </div>
      </div>
      <div style="width: 100%; display: flex; justify-content: end; padding-top: 50px;">
        <!-- Add Query button -->
        <button class="add-query-button" @click="addQuery">Add Query</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'MenuBar',
  
    async asyncData({ store }) {
      const page = 'addQuery';
      store.commit('user/setPages', page);
    },
  
    data() {
      return {
        query: '',
        message: '',
      };
    },
    
    methods: {
      addQuery() {
        // Handle the query submission logic here
        console.log('Query added:', {
          query: this.query,
          message: this.message,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .add-query-container {
    padding-top: 60px;
    max-width: 600px;
    margin: 0 auto;
    text-align: start;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .form-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-field {
    margin-bottom: 16px;
    width: 100%;
  }
  
  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #166798;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  