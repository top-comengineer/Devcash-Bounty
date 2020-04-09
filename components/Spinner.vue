<template>
  <div class="lds-ring">
    <div :class="$store.state.theme.dt?'dt-ring':'lt-ring'"></div>
    <div :class="$store.state.theme.dt?'dt-ring':'lt-ring'"></div>
    <div :class="$store.state.theme.dt?'dt-ring':'lt-ring'"></div>
    <div :class="$store.state.theme.dt?'dt-ring':'lt-ring'"></div>
  </div>
</template>
<style>
.dt-ring {
  border: 0.125rem solid;
  border-color: #010014 transparent transparent transparent;
  border-radius: 50%;
}
.lt-ring {
  border: 0.125rem solid;
  border-color: #f8f7fc transparent transparent transparent;
  border-radius: 50%;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 1rem;
  height: 1rem;
  margin: 0.125rem;
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