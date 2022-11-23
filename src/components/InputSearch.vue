<script>
    export default {
        props: {
            modelValue: { type: String, default: "" },
        },
        emits: ["submit", "update:modelValue"],
        methods: {
            updateModelValue(e) {
                this.$emit("update:modelValue", e.target.value.toLowerCase());
            },
            submit(){
                this.$emit("submit");
            },
        },
    };

</script>

<template class="col-md-10">
    <div class="input-group " style="margin-left: ;">
        <input 
            type="text"
            class="form-control"
            placeholder="Địa điểm bạn cần tìm?" style="font-style: italic; color: grey;"
            :value="modelValue"
            @input="updateModelValue"
            @keyup.enter="submit"
        />

        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type = "button"
                @click="submit"
            > 
                <i class="fas fa-search"></i>
            </button>
        </div>

    </div>
</template>
