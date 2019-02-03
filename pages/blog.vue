<template>
  <div class="blog-container">
    <div class="container">
      <Title>Blog</Title>
      <Caption>My random thoughts and learnings</Caption>
      <HorizontalBar></HorizontalBar>
      <div class="posts" v-for="(post, index) in posts" :key="index">
        <a href>
          <h1 class="headline" v-html="post.title.rendered"></h1>
          <p>{{getDate(post.date)}}</p>
          <no-ssr placeholder="Loading...">
            <p v-html="post.excerpt.rendered"></p>
          </no-ssr>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../components/Title.vue";
import Caption from "../components/Caption.vue";
import HorizontalBar from "../components/HorizontalBar.vue";
import posts from "static/posts.json";
export default {
  components: {
    Title,
    Caption,
    HorizontalBar
  },
  data() {
    return {
      posts
    };
  },
  methods: {
    getDate(date) {
      const d = new Date(date);
      return `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
    }
  },
  mounted() {
    console.log("hi");
    console.log(posts);
  }
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.blog-container {
  padding-top: $navHeight * 1.5;
}

.posts {
  &__post-title {
    font-size: 1px;
  }
}
</style>

