<template>
  <div>
    <NavBar :title="title" :username="username"></NavBar>
    <div v-if="!ready" class="text-center">
      <h1>Please wait Loading</h1>
    </div>
    <div v-else>
      <span class="btn-group btn-group-lg" style="margin-left: 20%">
        <input type="radio" class="btn-check" value="faq" v-model="selectedOption" @change="FAQ" id="btnradio1" />
        <label class="btn btn-outline-primary" for="btnradio1">FAQ</label>

        <input type="radio" class="btn-check" value="resolved" v-model="selectedOption" @change="RESOLVED"
          id="btnradio2" />
        <label class="btn btn-outline-primary" for="btnradio2">Resolved</label>

        <input type="radio" class="btn-check" value="unresolved" v-model="selectedOption" @change="UNRESOLVED"
          id="btnradio3" />
        <label class="btn btn-outline-primary" for="btnradio3">Unresolved</label>
      </span>
      <span>
        <input class="search" type="text" id="search" placeholder="Search here...." v-model="search" />
        <button type="button" class="btn btn-link" @click="search_function">
          <i class="bi bi-search"></i>
        </button>
      </span>
      <div class="container">
        <div class="row align-items-start">
          <div class="col-8">
            <div class="container-fluid">
              <h3 class="text-center" v-if="!ticket_list.length">
                No tickets found under this section.
              </h3>
              <div class="row p-1" v-for="ticket in ticket_list" :key="ticket.title">
                <div class="card position-relative" style="width: 80%; margin: auto; min-height: 4em">
                  <div style="font-size: 2.5em" class="position-absolute">
                    {{ ticket.likes }}
                  </div>
                  <div style="font-size: 1.5em; width: 90%; margin-left: 2.5em" class="mt-1">
                    <div v-if="ticket.sec_name">
                      <span class="badge bg-primary">{{ ticket.sec_name }}</span><br />
                    </div>
                    <router-link :to="'/ticket/' + ticket.ticket_id">{{
                      ticket.title
                    }}</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="container-fluid">
              <CreateTicket :subject_tag="subject_name" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-end"></div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
import CreateTicket from "@/components/CreateTicket.vue";
export default {
  name: "SubjectView",
  components: {
    NavBar,
    CreateTicket,
  },
  data: function () {
    return {
      subject_name: this.$route.params.subject,
      title: "Subject Dashboard",
      ticket_list: [],
      search: "",
      selectedOption: "faq",
      ready: false,
      username: "",
    };
  },
  methods: {
    search_function() {
      alert(this.search);
    },
    FAQ() {
      this.ready = false;
      fetch(`http://127.0.0.1:5500/api/subject/${this.subject_name}?FAQ=True`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert("Response not ok");
            router.push("/");
          }
          return response.json();
        })
        .then((data) => {
          this.ticket_list = data;
          this.ready = true;
        })
        .catch((err) => console.log(err));
    },
    RESOLVED() {
      this.ready = false;
      fetch(
        `http://127.0.0.1:5500/api/subject/${this.subject_name}?ResolvedStatus=True`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            alert("Response not ok");
            router.push("/");
          }
          return response.json();
        })
        .then((data) => {
          this.ticket_list = data;
          this.ready = true;
        })
        .catch((err) => console.log(err));
    },
    UNRESOLVED() {
      this.ready = false;
      fetch(
        `http://127.0.0.1:5500/api/subject/${this.subject_name}?ResolvedStatus=False`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            alert("Response not ok");
            router.push("/");
          }
          return response.json();
        })
        .then((data) => {
          this.ticket_list = data;
          this.ready = true;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted: function () {
    this.username = localStorage.getItem("username");
    this.FAQ();
  },
};
</script>
<style scoped>
hr {
  border-top: solid #182825;
  border-width: 5px;
}

.card hr {
  border-width: 5px;
  border-color: #182825;
}

.card {
  background-color: #b8b4ff;
  color: #653239;
}

body {
  overflow-x: hidden;
}

a {
  color: #653239;
  text-decoration: none;
}

.search {
  margin-left: 9%;
  width: 30%;
  height: 3rem;
  padding: 1rem;
  border-radius: 50px;
  margin-right: -50px;
}
</style>
