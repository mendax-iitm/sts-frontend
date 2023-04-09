<template>
    <NavBar :title="title" :username="username"></NavBar>
<div class="container-fluid" style="width: 80%; margin: auto;">
    <div class="row">
    <div class="card " style="min-height: 4em">
  <div class="card-header" :class="{ 'bg-success': ticket_details.ticket_status == 'resolved', 'bg-danger': ticket_details.ticket_status == 'unresolved' }">
    Featured
  </div>
  <div class="row">
  <div class="col-1 d-flex flex-column align-items-center justify-content-center"><i
          @click="like(ticket_details.ticket_id)"
          class="bi bi-hand-thumbs-up " style="font-size: 2rem"
          data-toggle="tooltip"
          data-placement="top"
          title="Like"
        ></i>
        <p>0</p>
    </div>
  <div class="col"><div class="card-body">
    <h5 class="card-title">{{ ticket_details.title }}</h5>
    <p class="card-text">{{ ticket_details.description }}</p>
   
    <div class="card-footer text-body-secondary">
    2 days ago
  </div>
  </div></div>
  </div>
</div>
</div>
<div class="d-flex justify-content-end">
    <button class="btn btn-primary m-3" >Mark FAQ</button>
<button class="btn btn-primary m-3"   >Mark Duplicate</button>
</div>
<div class="row">
    <div class="card " style="min-height: 4em">
  <div class="card-header">
    Featured
  </div>
  <div class="row">
  <div class="col-1 d-flex flex-column align-items-center justify-content-center"><i
          @click="like(ticket_details.ticket_id)"
          class="bi bi-hand-thumbs-up " style="font-size: 2rem"
          data-toggle="tooltip"
          data-placement="top"
          title="Like"
        ></i>
        
    </div>
  <div class="col"><div class="card-body">
    <h5 class="card-title">{{ ticket_details.title }}</h5>
    <p class="card-text">{{ ticket_details.description }}</p>
   
   
  </div></div>
  </div>
  
</div> 
</div>
<div class="row m-3">
    <form @submit.prevent="AddResponse">
     
      


      <div class="form-floating mb-3">
        <textarea
          type="textarea"
          v-model="response"
          rows="10"
          class="form-control"
          id="floatingContent"
          placeholder="Please enter your Content"
        />
        <label for="floatingContent">Content</label>
       
      </div>
     
<div class="d-flex justify-content-center">
    <button class="btn btn-primary " type="submit">
        Add Response
      </button>
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
            username: "",
            response: "",
            ticket_details: {},
            response_list: [],

        }
    },

    methods: {},
    mounted: function () {
        this.username = localStorage.getItem("username")
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
                console.log(data)
                this.ticket_details = data;
                this.response_list = data.response_list;
            })
            .catch((err) => console.log(err));
    }
}
</script>