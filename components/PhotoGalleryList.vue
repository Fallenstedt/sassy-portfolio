<template>
  <ul class="gallery-list">
    <li 
      v-for="gallery in galleries" 
      :key="gallery.title"
      class="gallery-list__item">
        <nuxt-link :to="getLink(gallery)">
          <div 
          class="gallery-list__teaser"
          :style="{backgroundImage: `url(${gallery.teaser})`}">
          </div>
          <p>{{gallery.title}}</p>
        </nuxt-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "PhotoGalleryList",
  mounted() {},
  data: function() {
    return {
      galleries: [
        {
          title: "World",
          teaser: "https://via.placeholder.com/350x350",
          altTitle: "some alt"
        },
        {
          title: "People",
          teaser: "https://via.placeholder.com/350x350",
          altTitle: "some alt"
        },
        {
          title: "Weddings",
          teaser: "https://via.placeholder.com/350x350",
          altTitle: "some alt"
        },
        {
          title: "Recent",
          teaser: "https://via.placeholder.com/350x350",
          altTitle: "some alt"
        }
      ]
    };
  },
  methods: {
    getLink({ title }) {
      return `/photos/${title.toLowerCase()}`;
    }
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";

.gallery-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__item {
    padding: 0;
    margin: 0;
    list-style: none;
    a {
      text-decoration: none;
    }
  }
  &__teaser {
    border: 2px solid red;
    height: 350px;
    width: 350px;
    background-size: 100%;
    background-position: 50% 50%;
    transition: all 0.2s ease-out;
    &:hover {
      background-size: 120%;
      background-position: 50% 50%;
    }
  }
}
</style>
