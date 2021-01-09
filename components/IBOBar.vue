<template>
  <transition name="iboBarTransition">
    <div
      v-if="!$store.state.isIBOBarClosed && !isBarClosed"
      class="ibo-bar w-full flex flex-row flex-wrap justify-center items-center bg-c-secondary py-3 fixed bottom-0 z-999 px-10 md:px-16 lg:px-20"
    >
      <!-- IBO Live Text -->
      <h3 class="text-2xl font-bold text-c-light mx-5 my-3 text-center">{{$t('iboBar.iboLive')}}</h3>
      <!-- Join IBO Button -->
      <nuxt-link
        :to="localePath('bountyplatform')"
        @click.native="closeIBOBar"
        class="btn-text-sec bg-c-light text-c-secondary transform hover:scale-md focus:scale-md transition-all duration-200 ease-out origin-bottom-left max-w-full font-extrabold text-xl rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md px-12 py-2 mx-5 my-3"
      >{{$t('iboBar.buttonJoinIBO')}}</nuxt-link>
      <!-- Progress Bar & Distributed Text -->
      <div class="flex flex-col mx-5 mt-4 mb-3">
        <!-- Progress Bar -->
        <div class="h-8 w-full max-w-56 md:w-56 bg-c-light-35 rounded-md overflow-hidden">
          <div
            :style="'width:'+(calculateDistributionRatio()*100).toFixed(2)+'%'"
            class="h-full bg-c-light"
          ></div>
        </div>
        <!-- Distributed Text -->
        <h4
          class="font-bold mt-2 text-c-light"
        >{{$t('iboBar.devDistributed').replace('1%', (this.devDistributed).toLocaleString('en-US', { minimumFractionDigits:0, maximumFractionDigits:2 }))}}</h4>
      </div>
      <!-- Close Button -->
      <div class="absolute top-0 right-0 mt-2 mr-2">
        <button
          @mouseover="isCloseHovered=true"
          @mouseleave="isCloseHovered=false"
          @focus="isCloseFocused=true"
          @blur="isCloseFocused=false"
          @click="closeIBOBar"
        >
          <Icon
            :class="isCloseHovered || isCloseFocused? 'scale-120':'scale-100'"
            colorClass="text-c-light"
            class="w-8 h-8 transition-all duration-200 ease-out transform"
            type="cancel"
          />
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
import Icon from "~/components/Icon.vue";
export default {
  components: {
    Icon
  },
    data: function() {
      return {
        distributionRatio: null,
        isBarClosed: false,
        isCloseHovered: false,
        isCloseFocused: false,
      };
    },
    props: {
      devTotalToDistribute: Number,
      devDistributed: Number
    },
    methods: {
      calculateDistributionRatio(){
        this.distributionRatio = Math.sqrt(this.devDistributed)/Math.sqrt(this.devTotalToDistribute)
        return this.distributionRatio;
      },
      closeIBOBar(){
        this.$store.state.isIBOBarClosed = true;
        this.isBarClosed = true;
      }
    }
}
</script>
<style scoped>
.z-999 {
  z-index: 999;
}
.ibo-bar {
  box-shadow: 0 1rem 2rem 1rem rgba(136, 80, 248, 0.5);
}
.iboBarTransition-enter-active {
  transition: all 0.2s ease-out;
}
.iboBarTransition-leave-active {
  transition: all 0.2s ease-out;
}
.iboBarTransition-enter {
  opacity: 0;
  transform: translateY(8rem);
}
.iboBarTransition-leave-to {
  opacity: 0;
  transform: translateY(8rem);
}
</style>