<template>
    <div v-if="source" class="page">
        <h4 class="text-uppercase text-center" >Thêm source </h4>
        <SourceForm :source="source"
        @submit:source="addSource" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import SourceForm from "@/components/SourceForm.vue";
    import sourceService from "@/services/source.service";

    export default {
        components: {
            SourceForm,
        },
        props: {
            id: {
                type: String,
                requied: true
            },
        },

        data(){
            return {
                message:"",
                source:null,
                link:""
            };
        },

        methods: {
            async getSource(){
                try {
                    this.source =  {
                    }
                }
                catch(error) {
                    console.log(error);
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },

            async addSource(data){
                try {
                    console.log(data);
                let datanew =  await sourceService.create(data);
                console.log(datanew)
                    this.message = "Thêm source thành công!";
                } catch (error){
                    console.log(error);
                }
            },
        },

        created(){
            this.getSource();
            this.message = "";
        },

    };
</script>