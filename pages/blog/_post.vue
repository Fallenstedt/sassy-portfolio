<template>
  <div class="post-container">
    <div class="container">
      <Title>{{post.title.rendered}}</Title>
      <HorizontalBar></HorizontalBar>
      <p v-html="post.content.rendered"></p>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Title.vue";
import Caption from "../../components/Caption.vue";
import HorizontalBar from "../../components/HorizontalBar.vue";
import posts from "static/posts.json";
export default {
  components: {
    Title,
    Caption,
    HorizontalBar
  },
  data() {
    return {
      post: posts[this.$route.params.post]
    };
  },
  methods: {
    getDate(date) {
      const d = new Date(date);
      return `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
    },
    getLink(slug) {
      return `/blog/${slug}`;
    }
  },
  mounted() {
    console.log("hi");
    console.log(this.post);
  }
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.post-container {
  padding-top: $navHeight * 1.5;
}

.posts {
  &__post-title {
    font-size: 1px;
  }
}
</style>

