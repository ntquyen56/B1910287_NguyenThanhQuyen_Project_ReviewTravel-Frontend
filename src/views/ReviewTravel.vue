<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-card>
                <v-card-text>
                    <vue-show-more-text :text="txtString" :lines="4" additional-container-css="margin:14px;"
                        additional-content-css="font-size:16px;" additional-content-expanded-css="font-size:16px;"
                        additional-anchor-css="font-size: 16px;" @click="change" />
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>

    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />

            
        </div>
        <div class=" col-md-12">
            <h4 class="travel">
                ĐỊA ĐIỂM DU LỊCH
            </h4>
            <router-link :to="{
                name: 'sour.list',
            }">

                <button class="btn btn-sm btn-warning text mb-3">
                    <i class="fa-solid fa-bookmark"></i> Nguồn
                </button>
            </router-link>

            <ReviewList v-if="filteredReviewsCount > 0" :reviews="filteredReviews" v-model:activeIndex="activeIndex" />
            <p v-else>Không có địa điểm nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary text" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <router-link :to="{
                    name: 'review.add',
                }">
                    <button class="btn btn-sm btn-success text">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>

                </router-link>


                <button class="btn btn-sm btn-danger text" @click="removeAllReviews">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>

                
            </div>
        </div>
    </div>

    <!-- The Modal -->
    <div class="modal" id="activeReview" v-if="activeReview">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">{{ activeReview.title }}</h4>
                    <button type="button" class="close" data-dismiss="modal" v-on:click="closeModal()">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="modal-text">

                    <p class="p"  v-if="!readMore"
                        v-html="activeReview.body.replaceAll('\n', '<br>').slice(0, 100)">

                    </p>
                    <span class="read" v-if="!readMore" @click="readMore = !readMore">..Xem thêm</span>

                    <p class="p" v-if="readMore" v-html="activeReview.body.replaceAll('\n', '<br>')"> </p>
                    <span class="read" v-if="readMore" @click="readMore = !readMore">..Ẩn bớt</span>
                    <!-- <div v-html="activeReview.body.replaceAll('\n', '<br>')"></div> -->

                    <img :src="activeReview.image" :alt="activeReview.title">

                    <p class="text text-center mt-3">Nguồn: {{activeReview.source}}</p>
                </div>
                    
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal"
                        v-on:click="closeModal()">Close</button>
                    <router-link :to="{
                        name: 'review.edit',
                        params: { id: activeReview._id },
                    }">

                        <button class="btn btn-primary" data-dismiss="modal">
                            <i class="fas fa-edit"></i> Hiệu chỉnh</button>
                    </router-link>
                </div>

            </div>
        </div>
    </div>

</template>


<script>
import ReviewCard from "@/components/ReviewCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReviewList from "@/components/ReviewList.vue";
import SourceList from "@/components/SourceList.vue";

import ReviewService from "@/services/review.service";
import SourceService from "@/services/source.service";


export default {
    components: {
        ReviewCard,
        InputSearch,
        ReviewList,
        SourceList
    },

    props: {
        review: { type: Object, requied: true },
    },

    data() {
        return {
            reviews: [],
            activeIndex: -1,
            searchText: "",
            searchTextSource: "",

            readMore: false,
            sources:[]
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {

        reviewStrings() {
            return this.reviews.map((review) => {
                const { title } = review;
                return [title.toLowerCase()].join("");
            });
        },
        sourceStrings() {
            return this.sources.map((source) => {
                const { link } = source;
                return [link.toLowerCase()].join("");
            });
        },
        filteredReviews() {
            console.log(this.reviews);
            if (!this.searchText) return this.reviews;
            return this.reviews.filter((_review, index) =>
                this.reviewStrings[index].includes(this.searchText)
            );
        },
        filteredSource() {
            if (!this.searchTextSource) return this.sources;
            return this.sources.filter((_review, index) =>
                this.sourceStrings[index].includes(this.searchTextSource)
            );
        },
        activeReview() {
            if (this.activeIndex < 0) return null;
            
            return this.filteredReviews[this.activeIndex];
        },
        filteredSourcesCount(){
            return this.sources.length;

        },
        filteredReviewsCount() {
            return this.filteredReviews.length;
        },
    },
    methods: {
       
        async retrieveReviews() {
            try {
                let reviews = await ReviewService.getAll();
                this.reviews = [];
                reviews.forEach(async(review)=>{
                    let source =await SourceService.get(review.id_source);
                    review.source = source.link;
                    this.reviews.push(review);
                })
            } catch (error) {
                console.log(error);
            }
        },
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

        refreshList() {
            this.retrieveReviews();
            this.activeIndex = -1;
        },
        async removeAllReviews() {
            if (confirm("Bạn muốn xóa tất cả Địa điểm?")) {
                try {
                    await ReviewService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddReview() {
            this.$router.push({ name: "review.add" });
        },

        closeModal() {
            this.activeIndex = -1;
        }
    },

    mounted() {
        this.refreshList();
        this.getAllSource();
        console.log(this.sources)
        console.log(this.reviews);

    },
};




</script>

<style scoped>

</style>

