<template>
    <div>
        <h1>userManagement</h1>
    </div>
</template>

<script>
export default {
    layout: 'MenuBar',

    async asyncData({ store }) {
        const page = 'userManagement'; // ข้อมูลผู้ใช้
        store.commit('user/setPages', page); // ส่งข้อมูลไปยัง Vuex
    }
}
</script>

<style scoped>

</style>