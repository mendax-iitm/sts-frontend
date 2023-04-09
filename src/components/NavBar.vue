<template>
  <div>
    <h1 class="text-center m-3 txt-color">{{ title }}</h1>
    <div class="position-relative" style="margin-left: 3%; margin-right: 3%">
      <h3 class="ms-2">Welcome {{ username }}</h3>
      <div class="text-end me-1 position-absolute top-0 end-0">
        <button @click="logout" style="font-size: large; color: whitesmoke" class="btn btn-block">
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
