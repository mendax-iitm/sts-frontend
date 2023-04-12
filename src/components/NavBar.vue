<template>
  <div>
    <!-- <h5 class="text-center m-3 ">Welcome {{ username }}</h5> -->
    <div class="d-flex justify-content-between m-3">

      <router-link to="/dash">
        <img src="../assets/logo1.png" alt="Logo" width="100" height="50" class="d-inline-block align-text-top" />
      </router-link>

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
  props: ["username", "title"],
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
  background-color: #653239;
}

.txt-color {
  color: #6b62ff;
}
</style>
