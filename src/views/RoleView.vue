
import EditTag from '@/components/EditTag.vue';

<template>
    <div>
        <NavBarAdmin />
        <div class="container pt-2">
            <div class="text-center" v-if="!filtered_list.length">
                <img src="../assets/notFound.jpg" alt="No image found">
                <h3>No data found under this section.</h3>
            </div>
            <div v-else>
                <ul class="nav nav-fill">
                    <li class="nav-item">
                        <div class="d-flex justify-content-start">
                            <span class="btn-group">
                                <input type="radio" class="btn-check" value="subject_tags" v-model="selectedOption" @change="APPROVED" id="btnradio1" />
                                <label class="btn btn-outline-primary" for="btnradio1">Approved</label>

                                <input type="radio" class="btn-check" value="secondary_tags" v-model="selectedOption" @change="UNAPPROVED" id="btnradio2" />
                                <label class="btn btn-outline-primary" for="btnradio2">UnApproved</label>
                            </span>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="d-flex justify-content-end">
                            <form class="d-flex" role="search">
                                <input type="text" class="form-control me-2" placeholder="Search" aria-label="Search"/>
                                <button type="submit" class="btn" style="font-size: large;"> <i class="bi bi-search"></i> </button>
                            </form>
                        </div>
                    </li>
                </ul>
                <div v-if="selectedOption === 'approved'">
                    <div class="row m-1" v-for="role in filtered_list" :key="role.user_id">
                        <div class="card position-relative" style="width: 84%; margin-left: 13rem; min-height: 4em">
                            <div style="font-size: 1.5em; width: 90%; margin-left: 2.5em" class="d-flex mt-1">
                                <div class="flex-grow-1 justify-content-start">
                                    <ul>
                                        <li><h5>{{ role.username }}</h5></li>
                                        <li>Email: {{ role.email }}</li>
                                        <li>Subject: {{ role.subject_name }}</li>
                                    </ul>
                                </div>
                                <div class="align-self-center justify-content-end">
                                    <EditRole :user_id="role.user_id"></EditRole>
                                    <button class="btn btn-danger" :user_id="role.user_id" v-on:click="DelRole">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row m-1" v-for="role in filtered_list" :key="role.user_id">
                        <div class="card position-relative" style="width: 84%; margin-left: 13rem; min-height: 4em">
                            <div style="font-size: 1.5em; width: 90%; margin-left: 2.5em" class="d-flex mt-1">
                                <div class="flex-grow-1 justify-content-start">
                                    <ul>
                                        <li><h5>{{ role.username }}</h5></li>
                                        <li>Subject: {{ role.subject_name }}</li>
                                    </ul>
                                </div>
                                <div class="align-self-center justify-content-end">
                                    <button class="btn btn-success" :user_id="role.user_id" :subject_id="role.subject_id" v-on:click="ApproveRole(user_id, subject_id)">Approve</button>
                                    <button class="btn btn-danger" :user_id="role.user_id" v-on:click="DenyRole(user_id)">Deny</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBarAdmin from "@/components/NavBarAdmin.vue";
import EditRole from "@/components/EditRole.vue";
import router from "@/router";

export default {
    name: "RoleView",
    components: {
        NavBarAdmin,
        EditRole,
    },
    data: function(){
        return {
            filtered_list: [],
            selectedOption: "approved",
            reload: false,
            role: localStorage.get("role")
        };
    },
    methods: {
        APPROVED(){
            this.selectedOption = "approved";
            this.reload = true,
            fetch(`http://127.0.0.1:5500/api/role?status=1`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
            })
            .then((response) => {
                if (!response.ok) {
                    alert("Please login first");
                    router.push("/");
                }
            })
            .then((data) => {
                this.filtered_list = data;
            })
            .catch((err) => console.log(err));
        },
        UNAPPROVED(){
            this.selectedOption = "approved";
            this.reload = true,
            fetch(`http://127.0.0.1:5500/api/role?status=0`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
            })
            .then((response) => {
                if (!response.ok) {
                    alert("Please login first");
                    router.push("/");
                }
            })
            .then((data) => {
                this.filtered_list = data;
            })
            .catch((err) => console.log(err));
        },
        DelRole(user_id){
            if(confirm('Do you want to remove staff?')){
                this.reload = true,
                fetch(`http://127.0.0.1:5500/api/role/${user_id}`, {
                    method: 'DELETE',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        alert("Please login first");
                        router.push("/");
                    }
                })
                .catch((err) => console.log(err));
            }
        },
        DenyRole(user_id){
            if(confirm('Do you want to deny the role?')){
                this.reload = true,
                fetch(`http://127.0.0.1:5500/api/role/${user_id}`, {
                    method: 'DELETE',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        alert("Please login first");
                        router.push("/");
                    }
                })
                .catch((err) => console.log(err));
            }
        },
        ApproveRole(user_id,subject_id){
            if(confirm('Do you want to approve the staff?')){
                this.reload = true,
                fetch(`http://127.0.0.1:5500/api/${user_id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: "Bearer " + localStorage.getItem("access_token"),
                    },
                    body: JSON.stringify({
                        subject_id: subject_id,
                        status: true
                    })
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    if (data){
                        window.location.reload();
                    }
                    else {
                        this.errStatus = true;
                        this.errormsg = data.error_message;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.errStatus = true;
                    this.errormsg = "Invalid subject";
                });
            }
        },
    },
    beforeMount() {
        this.APPROVED();
    },
}
</script>