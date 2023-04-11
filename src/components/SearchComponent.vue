<template>
    <div>
        <NavBar :title="title" :username="username"></NavBar>
        <div>
            <SideBar @filter-change="tagFilter" @Reset="resetFilter" :reload="reload"></SideBar>
            <form class="search" @submit.prevent="search_function">
                <input class="search" type="text" id="search" placeholder="Search here...." v-model="search" />
                <button type="submit" class="btn btn-link"> <i class="bi bi-search"></i> </button>
            </form>
            <div class="container pt-2">
                <div class="row">
                    <div class="text-center" v-if="!filtered_list.length">
                        <img src="../assets/notFound.jpg" alt="" sizes="" srcset="">
                        <h3>No tickets found under this section.</h3>
                    </div>
                    <div class="row m-1" v-for="ticket in filtered_list" :key="ticket.title">
                        <div class="card position-relative" style="width: 65%; margin: auto; min-height: 4em">
                            <div style="font-size: 2.5em" class="position-absolute">
                                {{ ticket.likes }}
                            </div>
                            <div style="font-size: 1.5em; width: 90%; margin-left: 2.5em" class="mt-1">
                                <div v-if="ticket.sec_name">
                                    <span class="badge bg-primary">{{ ticket.sec_name }}</span><br />
                                </div>
                                <router-link :to="'/ticket/' + ticket.ticket_id">{{ ticket.title }}</router-link>
                            </div>
                        </div>
                    </div>
                    <CreateTicket :subject_tag="subject_name" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import router from "@/router";
import CreateTicket from "@/components/CreateTicket.vue";
export default {
    name: 'SeacrhComp',
    components: {
        NavBar,
        CreateTicket,
        SideBar
    },
    data() {
        return {
            subject_name: this.$route.params.subject,
            title: "Search Page",
            ticket_list: [],
            filtered_list: [],
            search: this.$route.params.search,
            username: "",
            reload: false,
        }
    },
    methods: {
        search_function() {
            fetch(`http://127.0.0.1:5500/api/subject/${this.subject_name}?search=${this.search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
            })
                .then(res => res.json())
                .then((data) => {
                    this.ticket_list = data;
                    this.filtered_list = data;
                })
                .catch((err) => console.log(err));
        },
        tagFilter(value) {
            this.reload = false;
            this.filtered_list = this.ticket_list.filter(x => x.sec_name == value)
        },
        resetFilter() {
            this.filtered_list = this.ticket_list;
        },
    },
    beforeMount() {
        if (localStorage.getItem('access_token') == null) {
            alert("Login first");
            return router.push("/");
        }
        this.username = localStorage.getItem("username");
        this.search_function();
    },
}
</script>
<style>
form.search {
    display: inline-block;
    margin-left: 25%;
    width: auto;
}

input[type='text'].search {
    padding: 1rem;
    width: 25rem;
    height: 3rem;
    border-radius: 50px;
    margin-right: -50px;
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
</style>