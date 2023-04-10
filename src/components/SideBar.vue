<template>
    <div class="">
        <div class="sidebar">
            <p class="m-2">Filter tickets by</p>
            <button style="margin-left: 75%; font-size: small;position: absolute;" @click="reset">Reset</button>
            <div class="form-check m-4" v-for="(tag, index) in sec_tag_list" :key="index">
                <input class="form-check-input" type="radio" :value=tag :id=index v-model="selectedOption" @change="notify">
                <label class="form-check-label" :for=index>{{ tag }} </label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SideBar",
    data() {
        return {
            selectedOption: '',
            sec_tag_list: ''
        }
    },
    methods: {
        notify() {
            this.$emit('filter-change', this.selectedOption);
        },
        reset() {
            this.selectedOption = '';
            this.$emit('reset');
        }
    },
    beforeCreate() {
        fetch(`http://127.0.0.1:5500/api/tag/secondary`)
            .then(res => res.json())
            .then((data) => {
                if (data) {
                    this.sec_tag_list = data.map(x => x.sec_name);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
</script>
<style>
.sidebar {
    font-size: x-large;
    min-width: 15rem;
    min-height: 70%;
    background-color: #f2f2f2;
    left: 3%;
    position: absolute;
}
</style>