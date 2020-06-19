<template>
  <div class="flex">
    <div
      class="bg-c-background-sec shadow-lg w-full flex flex-col flex-wrap items-center rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg py-6"
    >
      <!-- Total Earned or Total Awarded -->
      <h6
        class="text-sm text-transparent opacity-animation rounded-full bg-c-text px-2"
      >Total Earned</h6>
      <h2
        class="text-transparent text-3xl font-extrabold break-all opacity-animation bg-c-primary rounded-full px-3 mt-1"
      >{D}0,000</h2>
      <h3
        class="text-transparent font-semibold mt-1 break-all opacity-animation rounded-full bg-c-text px-2"
      >(Ξ000)</h3>
      <!-- Bounties Hunted or Bounties Posted -->
      <div class="flex flex-col items-center mt-6">
        <h6
          class="text-sm text-transparent opacity-animation rounded-full bg-c-text px-2"
        >Bounties Hunted</h6>
        <h2
          class="text-3xl text-transparent font-extrabold break-all opacity-animation rounded-full bg-c-text px-3 mt-1"
        >0,000</h2>
      </div>
    </div>
  </div>
</template>
<style scoped>
.jazziconPlaceholder {
  width: 20px;
  height: 20px;
}
.opacity-animation {
  animation-name: opacity-keyframes;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

/* The animation code */
@keyframes opacity-keyframes {
  0% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.25;
  }
}
</style>