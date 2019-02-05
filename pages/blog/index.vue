<template>
  <div class="blog-container">
    <div class="container">
      <Title>Blog</Title>
      <Caption>My random thoughts and learnings</Caption>
      <HorizontalBar></HorizontalBar>
      <div class="posts" v-for="(post, index) in posts" :key="index">
        <nuxt-link :to="getLink(post.slug)">
          <h1 class="headline" v-html="post.title.rendered"></h1>
          <p>{{getDate(post.date)}}</p>
          <no-ssr placeholder="Loading...">
            <p v-html="post.excerpt.rendered"></p>
          </no-ssr>
        </nuxt-link>
      </div>
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
      posts
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
    console.log(posts);
  }
};
</script>

<style lang="scss">
@import "assets/app.variables.scss";
.blog-container {
  padding-top: $navHeight * 1.5;
  a {
    font-weight: normal;
  }
}

.posts {
  &__post-title {
    font-size: 1px;
  }
}
</style>

