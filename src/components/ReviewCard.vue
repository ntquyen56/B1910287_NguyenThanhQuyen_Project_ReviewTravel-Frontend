<script>
export default {
    props: {
        review: { type: Object, requied: true },
    },
};
</script>

<template>
    <div class="modal-wrapper">
        <!-- <div class="p-1"> -->
        <h1>
            <strong></strong>
            {{ review.title }}
        </h1>

        <!-- </div> -->
        <div class="p-1">
            <strong></strong>
            <div v-html="review.body.replaceAll ('\n','<br>')"></div>
        </div>


        <div class="p-1">
            <h1>
                <strong></strong>
                {{ source.link }}
            </h1>
        </div>



        <div class="p-1">
            <strong></strong>
            <img :src="review.image" :alt="review.title" width="500" height="200">
        </div>


        <div class="p-1">
            <strong>Địa điểm yêu thích: &nbsp;</strong>
            <i v-if="review.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>


</template>
