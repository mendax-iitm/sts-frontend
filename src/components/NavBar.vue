<template>
  <header class="sticky-top header">
    <span class="text-center">
      <p class="h1 pt-2">{{ title }}</p>
    </span>
    <div class="position-relative ms-4 me-4">
      <span>
        <router-link to="/dash" v-if="role == 'student'">
          <img src="../assets/logo1.png" alt="Logo" width="110" height="60" class="d-inline-block align-text-top" />
        </router-link>
        <router-link :to="'/subject/' + subject_name" v-else>
          <img src="../assets/logo1.png" alt="Logo" width="110" height="60" class="d-inline-block align-text-top" />
        </router-link>
      </span>
      <div class="position-absolute top-0 end-0 mt-2">
        <button @click="logout" style="font-size: large; color: whitesmoke" class="btn btn-danger">
          Logout <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
      <hr class="border border-primary border-2 opacity-100" />
    </div>
  </header>
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
      return router.push("/");
    },
  },
};
</script>
<style scoped>
.header {
  background-color: #6B62FF;
}
</style>