<!-- eslint-disable vue/max-len -->
<template>
 <span class="spinner-wrap">
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="10" fill="none" stroke-width="2.5"></circle>
  </svg>
 </span>
</template>

<script>
export default {
};
</script>

<style>
.spinner-wrap {
  position: relative;
}

.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: -5%;
  left: 100%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
}

.path {
  stroke: #9eff00;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
