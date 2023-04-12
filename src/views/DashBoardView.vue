<template>
  <div>
    <NavBar :title="title"></NavBar>
    <div v-if="!ready">
      <h1>Please wait Loading</h1>
    </div>
    <div class="row" v-else>
      <div class="col-sm-4" v-for="(faq, subject) in subjects" :key="subject">
        <div class="card mt-3" style="margin-left: 5%; margin-right: 5%">
          <div class="card-body">
            <router-link :to="'/subject/' + subject">
              <h3 class="card-title text-center">
                {{ subject }}
              </h3>
            </router-link>
            <hr class="ms-3" />
            <div class="text-center" v-if="faq.length == 0">
              <router-link :to="'/subject/' + subject">Click Here to view all the tickets of this subject</router-link>
            </div>
            <div v-else>
              <ul v-for="ticket in faq" :key="ticket.title">
                <router-link :to="'/ticket/' + ticket.ticket_id">
                  <li>{{ ticket.title }}</li>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import router from "@/router";
export default {
  name: "DashBoardView",
  components: {
    NavBar,
  },
  data: function () {
    return {
      title: "Student Dashboard",
      subjects: {},
      ready: false,
      darkMode: false,
    };
  },
  methods: {},
  beforeCreate() {
    if (localStorage.getItem("role") == 'staff') {
      router.push(`/subject/${localStorage.getItem('subject_name')}`)
    }
  },
  beforeMount() {

    fetch("http://127.0.0.1:5500/api/tag/subject", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // Authorization: "Bearer " + localStorage.getItem("access_token"),
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
        const subject_names = data.map((x) => x.subject_name);
        // subject_names=['MLT', 'BDM', 'BA'] (output format)
        for (const subject of subject_names) {
          fetch(`http://127.0.0.1:5500/api/subject/${subject}?FAQ=True&limit=5`,
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
            .then(data => {
              this.subjects[subject] = data
              this.ready = true;
            });
        }
      })
      .catch((err) => console.log(err));
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
  min-height: 19rem;
}

body {
  overflow-x: hidden;
}

/* .card-title {
  color: red;
} */

a {
  /* color: green; */
  color: #653239;
  text-decoration: none;
}
</style>
