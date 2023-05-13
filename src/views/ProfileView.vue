<template>
  <div>
    <NavBar title="Profile" />
    Name: {{ username }}
    Role: {{ role }}
    Email: {{ email }}
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
  name: "ProfileView",
  components: {
    NavBar,
  },
  data() {
    return {
      username: '',
      role: '',
      email: '',
    }
  },
  methods: {},
  beforeMount() {
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
      .then(data => {
        this.username = data.username
        this.role = data.role
        this.email = data.email
      })
  }
};
</script>
