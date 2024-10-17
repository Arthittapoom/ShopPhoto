<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="pb-4">เข้าสู่ระบบ</h2>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="ชื่อผู้ใช้"
            class="input-field"
            required
          />
        </div>

        <div class="input-group">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="รหัสผ่าน"
            class="input-field"
            required
          />
        </div>

        <button type="submit" class="login-button mt-4 mb-4">เข้าสู่ระบบ</button>

        <hr>

        <p class="forgot-password">ยังไม่ได้เป็นสมาชิก <nuxt-link to="/signup" class="text-p">สมัครสมาชิก</nuxt-link></p>

      </form>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase.js'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เข้าสู่ระบบสําเร็จ',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.$router.push('/dashboard');
          })
        })
        .catch((error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 1500
          })
        });

    }
  }
};
</script>

<style scoped>

.forgot-password {
  text-align: end;
}

.text-p {
  color: #1e88e5;
  text-decoration: none;
}

.text-p:hover {
  color: #327ab9;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../static/login/bg.png');
}

.login-container {
  background-color: rgba(255, 255, 255, 0);
  padding: 2rem;
  border-radius: 20px;
  /* box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); */
  position: relative;
  right: 250px;
  width: 500px;
  text-align: center;
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
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  font-size: 1rem;
  color: #1a237e;
}

.input-field::placeholder {
  color: #90a4ae;
}

button {
  width: 100%;
  height: 2.5rem;
  /* padding: 1rem; */
  border-radius: 25px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #7ec5f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: matrix(1.05, 0, 0, 1.05, 0, 0);
  transition: all 0.3s ease-in-out;
}

.login-button {
  background-color: #1e88e5;
  color: white;
  margin-bottom: 1rem;
}

.signup-button {
  background-color: #29b6f6;
  color: white;
}

/* สำหรับหน้าจอขนาดเล็ก (เช่น มือถือ) */
@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }

  .login-container {
    width: 100%;
    padding: 1.5rem;
    right: 0;
    border-radius: 10px;
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
  p{
    font-size: 0.8rem;
  }
}

</style>
