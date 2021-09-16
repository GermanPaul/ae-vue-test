<template>
  <div class="picture-details-container">
    <div class="image-container">
      <img
        :src="selectedImage.full_picture"
        alt=""
        @click="isImageModalActive = true"
      >
      <div class="overlay">
        <div>
          <strong>Author: </strong>
          <span>{{selectedImage.author}}</span>
        </div>
        <div>
          <strong>Camera: </strong>
          <span>{{selectedImage.camera}}</span>
        </div>
        <div>
          <strong>Tags: </strong>
          <span>{{selectedImage.tags}}</span>
        </div>
      </div>
    </div>
    <div>

    </div>
    <b-modal v-model="isImageModalActive">
      <p class="image is-4by3">
          <img :src="selectedImage.full_picture">
      </p>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ImageView',
  data() {
    return {
      isImageModalActive: false,
    };
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState([
      'selectedImage',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedImage',
      'resetSelectedImage',
    ]),
  },
  mounted() {
    if (this.id) {
      this.updateSelectedImage(this.id);
    } else {
      this.$router.push({ path: '/' });
    }
  },
  beforeDestroy() {
    this.resetSelectedImage();
  },
};
</script>
