<template>
    <p class="half-width"
        :class="{ headline: isHeadline ? isHeadline : false }">
      <slot></slot>
    </p>
</template>

<script>
export default {
  name: "Caption",
  props: ["isHeadline"]
};
</script>



