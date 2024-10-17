<template>
    <div class="signup-page">
        <div class="signup-container">
            <h2 class="pb-4">สมัครสมาชิก</h2>
            <form @submit.prevent="handleSubmit">
                <div class="input-group">
                    <input type="text" id="username" v-model="username" placeholder="ชื่อผู้ใช้" class="input-field"
                        required />
                </div>

                <div class="input-group">
                    <input type="text" id="fullname" v-model="fullname" placeholder="ชื่อ-นามสกุล" class="input-field"
                        required />
                </div>

                <div class="input-group">
                    <input type="email" id="email" v-model="email" placeholder="อีเมล" class="input-field" required />
                </div>

                <div class="input-group">
                    <input type="tel" id="phone" v-model="phone" placeholder="เบอร์โทร" class="input-field" required />
                </div>

                <div class="input-group">
                    <input type="password" id="password" v-model="password" placeholder="รหัสผ่าน" class="input-field"
                        required />
                </div>

                <div class="input-group">
                    <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="ยืนยันรหัสผ่าน"
                        class="input-field" required />
                </div>

                <button type="submit" class="signup-button mt-4 mb-4">สมัครสมาชิก</button>

                <hr>

                <p class="forgot-password">มีบัญชีอยู่แล้ว <NuxtLink to="/login" class="text-p">เข้าสู่ระบบ</NuxtLink>
                </p>

            </form>
        </div>
    </div>
</template>


<script>
import Swal from 'sweetalert2'
import firebase from '~/plugins/firebase.js'
export default {
    data() {
        return {
            username: '',
            fullname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        };
    },
    methods: {
        handleSubmit() {
            if (this.password !== this.confirmPassword) {
                alert("รหัสผ่านไม่ตรงกัน");
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => { this.set_data_to_user(user.user.uid); })
                .catch((error) => {
                    Swal.fire(
                        {
                            position: "center",
                            icon: "error",
                            title: "มีบัญชีอยู่แล้ว",
                            showConfirmButton: false,
                            timer: 1500

                        });
                });
        },
        set_data_to_user(uid) {
            firebase.database().ref('users/' + uid).set({
                username: this.username,
                fullname: this.fullname,
                email: this.email,
                phone: this.phone,
                uid: uid
            }).then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "สมัครสมาชิกสําเร็จ",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.$router.push('/dashboard');
                })
            });
        },
    }
};
</script>

<style scoped>
.forgot-password {
    text-align: end;
}

.signup-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../static/login/bg.png');
}

.signup-container {
    background-color: rgba(255, 255, 255, 0);
    padding: 2rem;
    border-radius: 20px;
    width: 500px;
    text-align: center;
    position: relative;
    right: 250px;
}

h2 {
    font-size: 1.5rem;
    color: #2E3C88;
    margin-bottom: 2rem;
}

.input-group {
    margin-bottom: 1.5rem;
}

.input-field {
    width: 100%;
    height: 2.5rem;
    padding: 1rem;
    border-radius: 25px;
    border: none;
    background-color: #e3f2fd;
    font-size: 1rem;
    color: #1a237e;
}

.input-field::placeholder {
    color: #90a4ae;
}

button {
    width: 100%;
    height: 2.5rem;
    border-radius: 25px;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

button:hover {
    background-color: #7ec5f8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.05);
}

.signup-button {
    background-color: #1e88e5;
    color: white;
}

/* สำหรับหน้าจอขนาดเล็ก (เช่น มือถือ) */
@media (max-width: 768px) {
    .signup-page {
        padding: 1rem;
    }

    .signup-container {
        width: 100%;
        padding: 1.5rem;
        border-radius: 10px;
        position: relative;
        right: 0px;
    }

    .input-field {
        height: 2rem;
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    button {
        height: 2rem;
        font-size: 0.9rem;
    }

    h2 {
        font-size: 1.2rem;
    }
}
</style>
