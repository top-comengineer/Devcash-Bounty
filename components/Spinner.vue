<template>
  <div class="lds-ring">
    <div :class="type=='primary'?'ring-primary':'ring'"></div>
    <div :class="type=='primary'?'ring-primary':'ring'"></div>
    <div :class="type=='primary'?'ring-primary':'ring'"></div>
    <div :class="type=='primary'?'ring-primary':'ring'"></div>
  </div>
</template>
<style>
.ring {
  border: 0.125rem solid;
  border-color: var(--c-background) transparent transparent transparent;
  border-radius: 50%;
}
.ring-primary {
  border: 0.125rem solid;
  border-color: var(--c-primary) transparent transparent transparent;
  border-radius: 50%;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  animation: lds-ring 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.375s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.25s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.125s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  props: {
    type: null
  }
}
</script>