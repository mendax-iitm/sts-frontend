<template>
  <div>
    <h1 class="text-center mt-3">{{ title }}</h1>
    <div class="position-relative ms-4 me-5">
      <span>
        <router-link to="/dash" v-if="role == 'student'">
          <img src="../assets/logo1.png" alt="Logo" width="110" height="60" class="d-inline-block align-text-top" />
        </router-link>
        <router-link :to="'/subject/' + subject_name" v-else>
          <img src="../assets/logo1.png" alt="Logo" width="100" height="50" class="d-inline-block align-text-top" />
        </router-link>
      </span>
      <div class="text-end me-1 position-absolute top-0 end-0">
        <button @click="logout" style="font-size: large; color: whitesmoke" class="btn btn-danger">
          Logout <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
      <hr class="border border-primary border-2 opacity-100" />
    </div>
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
      return router.push("/");
    },
  },
};
</script>
<style scoped></style>