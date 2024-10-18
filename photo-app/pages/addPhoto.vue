<template>
    <div class="upload-photo-container scrollable-content">
        
        <div class="form-grid">
            <!-- Image Preview -->
            <div class="image-preview-container">
                <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" />
                <img v-else src="https://dummyimage.com/300x200/000/fff" alt="Placeholder Image" />
            </div>
            
            <!-- File Upload -->
            <div class="upload-section">
                <h1>Upload photo</h1>
                <label for="file-upload">Select a photo</label>
                <input type="file" id="file-upload" @change="onImageChange" />
            </div>


            <!-- Media Categories (Dynamic) -->
            <div class="form-field media-category">
                <!-- Form Fields -->
                <div class="form-fields">
                    <div class="form-field">
                        <label>Media name</label>
                        <input type="text" v-model="mediaName" />
                    </div>

                    <div class="form-field">
                        <label>Media watermark</label>
                        <input type="text" v-model="mediaWatermark" />
                    </div>

                    <div class="form-field">
                        <label>Media type</label>
                        <input type="text" v-model="mediaType" />
                    </div>

                    <div class="form-field">
                        <label>Media price</label>
                        <input type="number" v-model="mediaPrice" />
                    </div>
                    <div class="form-field">
                        <label>Media Category <button @click="addCategory">+</button></label>
                        <div v-for="(category, index) in mediaCategories" :key="index" class="category-item">
                            <input type="text" v-model="mediaCategories[index]" />
                            <button @click="removeCategory(index)">Remove</button>

                        </div>

                    </div>
                    <div class="form-field">
                        <label>Media License</label>
                        <input type="text" v-model="mediaLicense" />
                    </div>
                </div>

            </div>
        </div>
        <div style="text-align: end;">
            <button class="add-photo-button" @click="addPhoto">Add Photo</button>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'MenuBar',

    async asyncData({ store }) {
        const page = 'addPhoto';
        store.commit('user/setPages', page);
    },

    data() {
        return {
            mediaName: '',
            mediaWatermark: '',
            mediaType: '',
            mediaPrice: null,
            mediaLicense: '',
            mediaCategories: [''],
            imagePreview: null,
        };
    },
    methods: {
        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imagePreview = URL.createObjectURL(file);
            }
        },
        addCategory() {
            this.mediaCategories.push('');
        },
        addPhoto() {
            console.log('Photo added:', {
                mediaName: this.mediaName,
                mediaWatermark: this.mediaWatermark,
                mediaType: this.mediaType,
                mediaPrice: this.mediaPrice,
                mediaLicense: this.mediaLicense,
                mediaCategories: this.mediaCategories,
                imagePreview : this.imagePreview
            });
        },
        removeCategory(index) {
            this.mediaCategories.splice(index, 1);
        },
    },
};
</script>

<style scoped>
.upload-photo-container {
    max-width: 800px;
    margin: 0 auto;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.image-preview-container {
    grid-row: 1 / 4;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 300px;
    height: 200px;
}

.upload-section {
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-fields {
    grid-row: 2 / 4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-field {
    display: flex;
    flex-direction: column;
}

.media-category {
    grid-column: 1 / 3;
}

.category-item {
    margin-bottom: 10px;
}

button {
    padding: 1px 16px;
    background-color: #166798;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    width: auto;
    height: 2rem;
    margin-left: 1.5rem;
}

button:hover {
    background-color: #0056b3;
}

.add-photo-button {
    grid-column: 1 / 3;
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