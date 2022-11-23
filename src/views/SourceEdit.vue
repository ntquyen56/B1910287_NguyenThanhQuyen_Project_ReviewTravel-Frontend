<template>
    <div v-if="source" class="page">
        <h4 class="text-center">HIỆU CHỈNH</h4>
        <SourceForm :source="source" @submit:source="updateSource" @delete:source="deleteSource" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import SourceForm from "@/components/SourceForm.vue";
import SourceService from "@/services/source.service";
import ReviewService from "@/services/review.service";


export default {
    components: {
        SourceForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            // review: null,
            source:null,
            message: "",
        };
    },
    methods: {
        async getSource(id) {
            try {
                this.source = await SourceService.get(id);
                console.log(this.source)
                
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
        async updateSource(data) {
            try {
                await SourceService.update(this.source._id, data);
                // await SourceService.update(this.source._id, data);

                this.message = "Source được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteSource() {
            if (confirm("Bạn muốn xóa Địa điểm này?")) {
                try {
                 await ReviewService.deleteAllSource(this.source._id)
                    await SourceService.delete(this.source._id);

                    this.$router.push({ name: "sour.list" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getSource(this.id);
        console.log(this.id);
        this.message = "";
    },
};
</script>