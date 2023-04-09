<template>
  <CreateTicket subject_tag="BA" />
  <NavBar title="Subject Dashboard" username="abhi" />
</template>

<script>
import CreateTicket from "./CreateTicket.vue";
import NavBar from "./NavBar.vue";
export default {
  name: "TestingAPI",
  components: {
    CreateTicket,
    NavBar,
  },
};
</script>
