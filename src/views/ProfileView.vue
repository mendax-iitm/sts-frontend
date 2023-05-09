<template>
  <div>
    <NavBar title="Profile" />
  </div>
</template>

<script>
// import CreateTicket from "./CreateTicket.vue";
import NavBar from "@/components/NavBar.vue"
export default {
  name: "ProfileView",
  components: {
    NavBar,
  },
  data() {
    return {
      username: "",
    }
  },
  methods: {},
  beforeCreate() {
    // fetch user details from api
    fetch(`http://127.0.0.1:5500/api/register`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    ).then(res => res.json())
      .then(data => console.log(data))
  }
};
</script>
