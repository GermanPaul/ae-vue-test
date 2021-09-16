<template>
  <div class="home">
    <div class="pictures-container">
    <div
      class="cropped-picture"
      v-for="image, index in images.pictures"
      :key="index"
      @click="goToImage(image.id)"
    >
      <img :src="image.cropped_picture" :alt="image.id">
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'images',
    ]),
  },
  methods: {
    ...mapActions([
      'updateImages',
    ]),
    goToImage(id) {
      this.$router.push({
        name: 'ImageView',
        query: { id },
      });
    },
  },
  mounted() {
    this.updateImages();
  },
};
</script>
