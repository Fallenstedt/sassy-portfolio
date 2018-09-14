<template>
  <ul class="gallery-list">
    <li 
      v-for="gallery in galleries" 
      :key="gallery.title"
      class="gallery-list__item">
        <div 
        class="gallery-list__teaser"
        :style="{backgroundImage: `url(${gallery.teaser})`}">
        </div>
        <h2>{{gallery.title}}</h2>
    </li>
  </ul>
</template>
<script>
export default {
  name: "PhotoGalleryList",
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
  }
  &__teaser {
    border: 2px solid red;
    height: 350px;
    width: 350px;
  }
}
</style>
