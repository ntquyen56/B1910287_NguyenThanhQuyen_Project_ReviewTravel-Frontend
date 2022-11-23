<script>
    export default {
        props: {
            reviews: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            }
        }
    };
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item text"
            v-for="(review, index) in reviews"
            :key="review._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            {{ review.title }}

        </li>
    </ul>
</template>