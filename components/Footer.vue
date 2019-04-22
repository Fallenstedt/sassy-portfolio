<template>
  <footer class="container">
    <div class="spacer"></div>
    <div class="footer-container">
      <div class="footer-name">
        <p>Alex Fallenstedt</p>
        <p>
          <a class="footer-email" href="mailto:a.fallenstedt@gmail.com">a.fallenstedt@gmail.com</a>
        </p>
      </div>
      <div class="footer-social">
        <a target="_blank" href="https://github.com/fallenstedt" class="footer-social-icon">
          <i class="fab fa-github" aria-hidden="true"></i>
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/alexfallenstedt"
          class="footer-social-icon"
        >
          <i class="fab fa-linkedin" aria-hidden="true"></i>
        </a>
        <a target="_blank" href="https://500px.com/alexanderfallenstedt" class="footer-social-icon">
          <i class="fab fa-500px" aria-hidden="true"></i>
        </a>
        <a target="_blank" href="https://twitter.com/fallenstedt" class="footer-social-icon">
          <i class="fab fa-twitter" aria-hidden="true"></i>
        </a>
        <a target="_blank" href="https://dev.to/fallenstedt" class="footer-social-icon">
          <i class="fab fa-dev"></i>
        </a>
        <div class="footer-links">
          <nuxt-link to="/">
            <p>Home</p>
          </nuxt-link>
          <nuxt-link to="/about">
            <p>About</p>
          </nuxt-link>
          <nuxt-link to="/photos">
            <p>Photos</p>
          </nuxt-link>
          <nuxt-link to="/blog">
            <p>Blog</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import HorizontalBar from "./HorizontalBar.vue";
export default {
  name: "Footer",
  components: {
    HorizontalBar
  }
};
</script>
<style lang="scss">
@import "assets/app.variables.scss";
.spacer {
  // margin-top: rem(30px);
}
.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: rem(30px);
  p {
    margin: rem(15px) 0;
    font-size: rem(20px);
    color: $dandruff;
  }
  .footer-email {
    text-decoration: none;
    color: $dandruff;
    &:hover {
      transition: all 0.2s ease-out;
      color: $tomatoRed;
    }
  }
  .footer-social {
    margin-bottom: rem(80px);
    .footer-links {
      display: flex;
      a {
        text-decoration: none;
        padding: 0 rem(20px);
        &:nth-child(1) {
          padding-left: 0;
        }
        &:hover {
          p {
            transition: all 0.2s ease-out;
            color: $tomatoRed;
          }
        }
      }
    }

    .footer-social-icon {
      &:nth-child(1) {
        padding-left: 0;
      }
      padding: 0 rem(20px);
      color: $dandruff;
      font-size: rem(20px);
      text-decoration: none;
      transition: all 0.2s ease-out;
      &:hover {
        color: $tomatoRed;
      }
    }
  }
}
</style>


