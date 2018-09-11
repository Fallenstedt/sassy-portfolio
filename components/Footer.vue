<template>
  <footer class="container">
  <p>Alex Fallenstedt</p>
  <p><a class="footer-email" href="mailto:a.fallenstedt@gmail.com">a.fallenstedt@gmail.com</a></p>
  <div class="footer-social">
    <a target="_blank" href="https://github.com/fallenstedt" class="footer-social-icon">
      <i class="fab fa-github" aria-hidden="true"></i>
    </a>
    <a target="_blank" href="https://www.linkedin.com/in/alexfallenstedt" class="footer-social-icon">
      <i class="fab fa-linkedin" aria-hidden="true"></i>
    </a>
    <a target="_blank" href="https://500px.com/alexanderfallenstedt" class="footer-social-icon">
      <i class="fab fa-500px" aria-hidden="true"></i>
    </a>
    <a target="_blank" href="https://twitter.com/fallenstedt" class="footer-social-icon">
      <i class="fab fa-twitter" aria-hidden="true"></i>
    </a>
  </div>
</footer>
</template>

<script>
export default {};
</script>
<style lang="scss">
@import "assets/app.variables.scss";
footer {
  margin-top: rem(30px);
  p {
    margin: rem(15px) 0;
  }
  .footer-email {
    text-decoration: none;
    color: $ash;
  }
  .footer-social {
    margin-top: rem(20px);
    margin-bottom: rem(80px);

    .footer-social-icon {
      &:nth-child(1) {
        padding-left: 0;
      }
      padding: 0 rem(20px);
      font-size: rem(40px);
      color: #222;
      transition: all 0.2s ease-out;
      &:hover {
        color: $tomatoRed;
      }
    }
  }
}
</style>


