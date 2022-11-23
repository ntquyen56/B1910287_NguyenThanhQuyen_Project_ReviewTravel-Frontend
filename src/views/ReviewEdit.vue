<template>
    <div v-if="review" class="page">
        <h4 class="text-center">HIỆU CHỈNH</h4>
        <ReviewForm :review="review" :sources="sources" @submit:review="updateReview" @delete:review="deleteReview" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ReviewForm from "@/components/ReviewForm.vue";
import ReviewService from "@/services/review.service";
import SourceService from "@/services/source.service";


export default {
    components: {
        ReviewForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            review: null,
            sources:[],
            message: "",
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
         async getReview(id) {
            try {
                this.review = await ReviewService.get(id);
                console.log(this.review)
                // this.source = await SourceService.get(this.review.id_source);
                // console.log(this.source)

                // this.review.source  = this.source.link;
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
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
        async updateReview(data) {
            try {
                await ReviewService.update(this.review._id, data);
                // await SourceService.update(this.source._id, data);

                this.message = "Địa điểm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteReview() {
            if (confirm("Bạn muốn xóa Địa điểm này?")) {
                try {
                    await ReviewService.delete(this.review._id);
                    // await SourceService.delete(this.source._id);

                    this.$router.push({ name: "reviewtravel" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getReview(this.id);
        this.getAllSource()
        console.log(this.id);
        this.message = "";
    },
};
</script>