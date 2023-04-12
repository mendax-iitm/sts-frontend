<template>
  <div>
    <div class="d-flex justify-content-between m-3">
      <div v-if="role == 'student'"><router-link to="/dash">
          <img src="../assets/logo1.png" alt="Logo" width="100" height="50" class="d-inline-block align-text-top" />
        </router-link></div>
      <div v-else><router-link :to="'/subject/' + subject_name">
          <img src="../assets/logo1.png" alt="Logo" width="100" height="50" class="d-inline-block align-text-top" />
        </router-link></div>


      <h3 class="ms-2">{{ title }}</h3>

      <button @click="logout" style="font-size: large; color: whitesmoke" class="btn btn-block">
        Logout <i class="bi bi-box-arrow-right"></i>
      </button>

    </div>
    <hr class="border border-primary border-2 opacity-100 m-3" />
  </div>
</template>
<script>
import router from "@/router";
export default {
  name: "NavBar",
  data() {
    return {
      subject_name: localStorage.getItem("subject_name"),
      role: localStorage.getItem("role")
    }
  },
  props: ["title"],
  methods: {
    logout() {
      localStorage.clear();
      router.push("/");
    },
  },
};
</script>
<style scoped>
.btn-block {
  background-color: #e30d2a;
}

.txt-color {
  color: #6b62ff;
}
</style>
