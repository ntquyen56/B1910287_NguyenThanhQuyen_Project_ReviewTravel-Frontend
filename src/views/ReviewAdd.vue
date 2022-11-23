<template>
    <div v-if="review" class="page">
        <h4 class="text-uppercase" style="margin-left: 30%;">Thêm địa điểm mới</h4>
        <ReviewForm :review="review" :sources="sources"
        @submit:review="addReview" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import ReviewForm from "@/components/ReviewForm.vue";
    import reviewService from "@/services/review.service";
    // import sourceService from "@/services/source.service";
    import SourceService from "@/services/source.service";



    export default {
        components: {
            ReviewForm,
        },
        props: {
            id: {
                type: String,
                requied: true
            },
        },

        data(){
            return {
                review: null,
                message:"",
                sources:[]
            };
        },

        methods: {
            async getAllSource(){
            try{
                let data = await SourceService.getAll();
                console.log(data)
                data.forEach(item=>{
                    this.sources.push(item);
                })
            }catch(e){
                console.log(e)
            }
            


        },
            async getReview(){
                try {
                    this.review = await {
                        title: "",
                        body:"",
                        image:"",
                        favorite: false
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

            async addReview(data){
                try {
                    await reviewService.create(data);
                    this.message = "Thêm địa điểm thành công!";
                } catch (error){
                    console.log(error);
                }
            },
        },

        created(){
            this.getReview();
            this.getAllSource();
            this.message = "";
        },

    };
</script>