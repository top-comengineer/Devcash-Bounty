<template>
  <div>
    <svg
      id="4f73667b-3487-4358-bac6-b5cbc4166b69"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 120"
    >
      <title>Token Type</title>
      <path
        d="M151.75,20l-.17,29.62H133.83l0,9.13h17.75l.17-29.62ZM134.6,39l0-9.13-34,.36,0,9.14ZM50.69,28.93l55.47,55.81,14.41-8.32,0,9.14-14.41,8.32L50.72,38.07ZM46.94,70.38l0-9.13L46.17,81l0,9.13ZM29,90.87H80.14l.05-10.28,0,9.14L80.17,100H29Z"
        class="fill-current transition-all ease-out duration-200"
        v-bind:class="[
          fgColorClass != null ? fgColorClass : defaultFgColorClass
        ]"
        fill="#7066ff"
      />
      <path
        d="M151.75,20l-.17,29.62H133.83l0,9.13h17.75l.17-29.62ZM134.6,39l0-9.13-34,.36,0,9.14ZM50.69,28.93l55.47,55.81,14.41-8.32,0,9.14-14.41,8.32L50.72,38.07ZM46.94,70.38l0-9.13L46.17,81l0,9.13ZM29,90.87H80.14l.05-10.28,0,9.14L80.17,100H29Z"
        style="opacity:0.3;isolation:isolate"
        class="fill-current transition-all ease-out duration-200"
        v-bind:class="[
          sdwColorClass != null ? sdwColorClass : defaultSdwColorClass
        ]"
        fill="#010014"
      />
      <path
        d="M100.61,20l-.06,10.28,34-.36-.74,19.7h17.75L151.75,20ZM50.69,28.93l55.47,55.81,14.41-8.32L65.11,20.61ZM29.17,61.24H46.92L46.17,81l34-.37-.05,10.28H29Z"
        class="fill-current transition-all ease-out duration-200"
        v-bind:class="[
          fgColorClass != null ? fgColorClass : defaultFgColorClass
        ]"
        fill="#7066ff"
      />
      <path
        d="M100.61,20l-.06,10.28,34-.36-.74,19.7h17.75L151.75,20ZM50.69,28.93l55.47,55.81,14.41-8.32L65.11,20.61ZM29.17,61.24H46.92L46.17,81l34-.37-.05,10.28H29Z"
        style="opacity:0.4;isolation:isolate"
        class="fill-current transition-all ease-out duration-200"
        v-bind:class="[
          fgColorClass != null ? fgColorClass : defaultFgColorClass
        ]"
        fill="#7066ff"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    fgColorClass: null,
    sdwColorClass: null
  },
  data: function() {
    return {
      defaultFgColorClass: "text-dtPrimaryLessSat",
      defaultSdwColorClass: "text-dtBackground"
    };
  }
};
</script>
<style></style>
