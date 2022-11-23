<template>
    <Form @submit="submitSource" :validation-schema="sourceFormSchema">
      

        <div class="form-group">
            <label for="link" class="text">Nhập tên nguồn</label>
            <Field name="link" type="text" class="form-control" style="" v-model="sourceLocal.link" />
            <ErrorMessage name="link" class="error-feedback" />
        </div>
        <div class="form-group  text-center">
            <button class="btn btn-primary" style="width: 100px">Lưu</button>
            <button v-if="sourceLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteSource">
                Xóa
            </button>
        </div>
        
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:source", "delete:source"],
    props: {

        source: { type: Object, required: true },
    },
    data() {
        const sourceFormSchema = yup.object().shape({
            link: yup.string(),
           
        });
        return {
            sourceLocal: this.source,
            sourceFormSchema,
        };
    },
    methods: {
        submitSource() {
            this.$emit("submit:source", this.sourceLocal);
        },
        deleteSource() {
            this.$emit("delete:source", this.sourceLocal.id);
        },
        
    },
    created(){
        console.log(this.sourceLocal.link)
    }
};
  
</script>
 


<style scoped>
@import "@/assets/form.css";
</style>