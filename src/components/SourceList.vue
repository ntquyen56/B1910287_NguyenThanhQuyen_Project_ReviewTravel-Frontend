<script>
    export default {
        props: {
            sources: { type: Array, default: [] },
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
            class="list-group-item"
            v-for="(source, index) in  sources"
            :key="source._id"
            :class="{ active: index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            {{ source.link }}

        </li>
    </ul>
</template>