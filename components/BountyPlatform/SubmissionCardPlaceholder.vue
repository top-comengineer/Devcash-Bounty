<template>
  <div class="flex">
    <div
      :class="[
      $store.state.theme.dt
        ? 'bg-dtBackgroundTertiary border-dtText-10'
        : 'bg-ltBackgroundSecondary border-ltText-10 shadow-lgDL']"
      class="w-full flex flex-col flex-wrap justify-between items-center border rounded-lg overflow-hidden text-transparent"
    >
      <!-- Top Part -->
      <div
        :class="[
      $store.state.theme.dt
        ? 'bg-dtText-5'
        : 'bg-ltText-5']"
        class="w-full flex flex-row flex-wrap justify-between items-center py-2"
      >
        <!-- Senders Address and Project Name -->
        <div class="w-full md:w-auto flex flex-row md:items-center px-4 py-2">
          <div
            :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
            class="flex m-1 jazziconPlaceholder rounded-full opacity-animation"
          ></div>
          <h5 class="text-left ml-2 mr-3 opacity-animation">
            <span
              :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
              class="font-mono-jet font-bold px-3 rounded-full"
            >0xb753...ab12</span>
            <span>{{'&nbsp;'}}</span>
            <span
              :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
              class="font-extrabold px-3 rounded-full"
            >Best Bounty</span>
          </h5>
        </div>
        <!-- Bounty Amount and Status Tag -->
        <div class="w-full md:w-auto flex flex-row flex-wrap items-center px-4 md:pr-0">
          <!-- Bounty Amount in DEV, ETH and USD -->
          <div class="flex flex-col my-2">
            <div class="flex flex-row">
              <p
                :class="$store.state.theme.dt?'bg-dtSuccess':'bg-ltSuccess'"
                class="font-bold text-left px-3 rounded-full opacity-animation"
              >{D}150,000</p>
            </div>
            <div class="flex flex-row mt-1">
              <p
                :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
                class="text-sm text-left rounded-full px-3 opacity-animation"
              >Ξ1.2 / $123</p>
            </div>
          </div>
          <!-- Status Tag -->
          <div class="flex flex-col md:mx-4 my-2 opacity-50">
            <div
              :class="$store.state.theme.dt?'bg-dtSuccess border-dtSuccess':'bg-ltSuccess border-ltSuccess'"
              class="flex flex-row items-center px-2 py-1 border rounded-md my-2 mx-3 md:mr-2 opacity-animation"
            >
              <div class="w-4 h-4" />
              <h6 class="font-bold mx-1 text-sm">Approved</h6>
            </div>
          </div>
        </div>
      </div>
      <!-- Thin Status Bar -->
      <StatusDivider status="approved" />
      <!-- Bottom Part -->
      <div class="w-full flex flex-col px-4 md:px-6 py-6">
        <!-- Message -->
        <div class="flex flex-row opacity-50">
          <p
            :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
            class="break-all rounded-full px-4 opacity-animation"
          >You can find my awesome submission below:</p>
        </div>
        <div class="flex flex-row mt-1 opacity-50">
          <p
            :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
            class="break-all rounded-full px-4 opacity-animation"
          >Here is my awesome submission.</p>
        </div>
        <!-- Date -->
        <div class="flex flex-row opacity-15">
          <p
            :class="$store.state.theme.dt?'bg-dtText':'bg-ltText'"
            class="text-sm mt-6 rounded-full px-4 opacity-animation"
          >01.01.2020, 16:00</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from "~/components/Icon.vue";
import Jazzicon from "~/components/Jazzicon.vue";
import StatusTag from "~/components/BountyPlatform/StatusTag.vue";
import StatusDivider from "~/components/BountyPlatform/StatusDivider.vue";
export default {
  components: {
    Icon,
    StatusTag,
    StatusDivider,
    Jazzicon
  }
};
</script>
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