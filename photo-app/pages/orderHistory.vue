<template>
    <div>
        <h1>orderHistory</h1>
    </div>
</template>

<script>
export default {
    layout: 'MenuBar',

    async asyncData({ store }) {
        const page = 'orderHistory'; // ข้อมูลผู้ใช้
        store.commit('user/setPages', page); // ส่งข้อมูลไปยัง Vuex
    }
}

</script>

<style scoped></style>