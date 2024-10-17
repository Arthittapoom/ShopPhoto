<template>
    <div>
      <h1>Dashboard</h1> <!-- แสดงชื่อ Dashboard -->
    </div>
  </template>
  
  <script>
  export default {
    layout: 'MenuBar',
  
  async asyncData({ store }) {
    const page = 'dashboard'; // ข้อมูลผู้ใช้
    store.commit('user/setPages', page); // ส่งข้อมูลไปยัง Vuex
  }
}
  </script>
  
  <style scoped></style>
  