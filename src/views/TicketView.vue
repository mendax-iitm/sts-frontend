<template>
  <NavBar :title="title" :username="username"></NavBar>
  <div class="container-fluid" style="width: 80%; margin: auto">
    <div class="row">
      <div class="card" style="min-height: 4em">
        <div
          class="card-header"
          :class="{
              'bg-success': ticket_details.ticket_status == 'resolved',
              'bg-danger': ticket_details.ticket_status == 'unresolved',
          }"
        >
          Featured
        </div>
        <div class="row">
          <div
            class="col-1 d-flex flex-column align-items-center justify-content-center"
          >
            <i
              @click="like(ticket_details.ticket_id)"
              class="bi bi-hand-thumbs-up"
              style="font-size: 2rem"
              data-toggle="tooltip"
              data-placement="top"
              title="Like"
            ></i>
            <p>0</p>
          </div>
          <div class="col">
            <div class="card-body">
              <h5 class="card-title">{{ ticket_details.title }}</h5>
              <p class="card-text">{{ ticket_details.description }}</p>

              <div class="card-footer text-body-secondary">2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary m-3">Mark FAQ</button>
      <button class="btn btn-primary m-3">Mark Duplicate</button>
    </div>
    <div class="row p-3" v-for="response in response_list" :key="response.id">
      <div class="card" style="min-height: 4em">
        <div class="card-header">Featured</div>
        <div class="row">
            
          <div
            class="col-1 d-flex flex-column align-items-center justify-content-center"
          >
          <div v-if="ticket_details.user_id == current_user_id ? true : false">
            <i
              @click="like(ticket_details.ticket_id, response.response_id)"
              class="bi bi-hand-thumbs-up"
              style="font-size: 2rem"
              data-toggle="tooltip"
              data-placement="top"
              title="Like"
            ></i>
          </div>
        </div>
          <div class="col">
            <div class="card-body">
              <p class="card-title">{{ response.response }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-3">
      <form @submit.prevent="AddResponse">
        <div class="form-floating mb-3">
          <textarea
            type="textarea"
            v-model="response_text"
            class="form-control"
            id="floatingContent"
            placeholder="Please enter your Content"
            style="min-height: 8em"
          />
          <label for="floatingContent">Type your Response here</label>
        </div>

        <div class="d-flex justify-content-center">
          <button class="btn btn-primary" type="submit">Add Response</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
    name: "TicketView",
    components: { NavBar },
    data: function () {
        return {
            current_user_id: localStorage.getItem("user_id"),
            username: "",
            response_text: "",
            ticket_details: {},
            response_list: [],
        };
    },

    methods: {
        AddResponse() {
            fetch(`http://127.0.0.1:5500/api/response/${this.$route.params.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem("user_id"),
                    response: this.response_text,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("Response not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    if (data) {
                        window.location.reload();
                    } else {
                        this.response_text = null;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.response_text = null;
                });
        },
    },
    mounted: function () {
        this.username = localStorage.getItem("username");
        fetch(`http://127.0.0.1:5500/api/response/${this.$route.params.id}`, {
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
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.ticket_details = data;
                console.log(this.ticket_details.user_id)
                this.response_list = data.response_list;
            })
            .catch((err) => console.log(err));
    },
};
</script>
