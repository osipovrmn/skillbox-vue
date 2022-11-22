<!-- eslint-disable vue/max-len -->
<!-- eslint-disable max-len -->
<template>
  <div class="loader-wrap">
    <div class="loader">
    <span>L</span>
    <span>O</span>
    <span>A</span>
    <span>D</span>
    <span>I</span>
    <span>N</span>
    <span>G</span>

    <div class="covers">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
</div>
  </div>
</template>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");

.loader-wrap {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  height: 100px;
}

.loader {
  position: absolute;
  left: 30%;
  width: 50%;
  color: white;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 250%;
  background: linear-gradient(180deg, #222 0, #444 100%);
  box-shadow: inset 0 5px 20px black;
  text-shadow: 5px 5px 5px rgba(0,0,0,0.3);
}

.loader:after {
  content: "";
  display: table;
  clear: both;
}

.loader-wrap span {
  float: left;
  height: 100px;
  line-height: 120px;
  width: calc(100% / 7);
}

.loader > span {
  border-left: 1px solid #444;
  border-right: 1px solid #222;
}

.covers {
  position: absolute;
  height: 100%;
  width: 100%;
}

.covers span {
  background: linear-gradient(180deg, white 0, #ddd 100%);
  animation: up 2s infinite;
}

@keyframes up {
  0%   { margin-bottom: 0; }
  16%  { margin-bottom: 100%; height: 20px; }
  50% { margin-bottom: 0; }
  100% { margin-bottom: 0; }
}

.covers span:nth-child(2) { animation-delay: .142857s; }
.covers span:nth-child(3) { animation-delay: .285714s; }
.covers span:nth-child(4) { animation-delay: .428571s; }
.covers span:nth-child(5) { animation-delay: .571428s; }
.covers span:nth-child(6) { animation-delay: .714285s; }
.covers span:nth-child(7) { animation-delay: .857142s; }
</style>

<script>
export default {
};
</script>
