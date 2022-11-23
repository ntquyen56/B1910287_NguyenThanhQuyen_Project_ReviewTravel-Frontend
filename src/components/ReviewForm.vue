<template>
    <Form @submit="submitReview" :validation-schema="reviewFormSchema">
        <div class="form-group">
            <label for="title" class="title">Tên địa điểm</label>
            <Field name="title" type="text" class="form-control" v-model="reviewLocal.title" />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="body" class="title">Giới thiệu</label>
            
            <textarea name="body" type="text" id="body" class="form-control ckeditor" v-model="reviewLocal.body" />
            <ErrorMessage name="body" class="error-feedback" />
        </div>



        <div class="form-group source">
            <label for="source" class="title">Nguồn</label>
            <select class="form-control text-center" style="width: 400px;" name="source"
                v-model="reviewLocal.id_source">
                <option :value="null" disabled>-----------Chọn nguồn------------</option>
                <option v-for="(source, index) in sources" :key="source._id" v-bind:value="source._id"
                    :selected="source.id == review.id_source">
                    {{ source.link }}
                </option>
            </select>
        </div>
        <div class=" form-group image">
            <label for="image" class="title">Hình ảnh</label>
            <Field name="image" type="file" class="form-control" v-model="image" @change="changeImage()" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>



        <div class="form-group form-check">
            <input name="favorite" type="checkbox" class="form-check-input" v-model="reviewLocal.favorite" />
            <label for="favorite" class="form-check-label">
                <strong>Yêu thích</strong>
            </label>
        </div>

        <div class="form-group">
            <button class="btn btn-primary" style="margin-left: 43%;">Lưu</button>
            <button v-if="reviewLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteReview">
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
    emits: ["submit:review", "delete:review"],
    props: {
        review: { type: Object, required: true },
        sources: { type: Object, required: true }
    },
    data() {
        const reviewFormSchema = yup.object().shape({
            title: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            body: yup.string().max(10000, ""),
            image: yup.string(),
            link: yup.string(),

        });
        return {
            image: this.review?.image || '',
            reviewLocal: this.review,
            reviewFormSchema,
        };
    },
    methods: {
        submitReview() {
            this.$emit("submit:review", this.reviewLocal);
        },
        deleteReview() {
            this.$emit("delete:review", this.reviewLocal.id);
        },
        changeImage() {
            var reader = new FileReader()
            reader.readAsDataURL(this.image)
            reader.onload = (e) => {
                this.reviewLocal.image = reader.result || '';
                console.log(this.reviewLocal);
            };
        }
    },
    created() {
        console.log(this.review);
        console.log(this.sources);
    }
};


</script>



 


<style scoped>
@import "@/assets/form.css";
</style>