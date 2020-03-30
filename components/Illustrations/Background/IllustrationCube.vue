<template>
  <div>
    <svg
      id="ef39a350-0ed1-4e6b-a7bb-5df725c62644"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 275 304"
    >
      <title>cube</title>
      <g style="opacity:0.15">
        <path
          d="M158.48,5c-11.54-6.66-30.41-6.66-42,0L21,60.17C9.43,66.83,0,83.18,0,96.5V206.82c0,13.32,9.43,29.67,21,36.33l95.55,55.17c11.54,6.66,30.41,6.66,42,0L254,243.16c11.54-6.66,21-23,21-36.33V96.5c0-13.32-9.43-29.67-21-36.33Z"
          class="fill-current transition-all ease-out duration-200"
          :class="[
            fgColorClass != null ? fgColorClass : defaultFgColorClass
          ]"
          fill="#7066FF"
        />
        <path
          d="M137.5,286.22c0,13.32,9.43,18.77,21,12.11L254,243.15c11.54-6.66,21-23,21-36.33V96.5c0-13.32-9.43-18.77-21-12.11l-95.55,55.16c-11.54,6.66-21,23-21,36.33Z"
          style="opacity:0.3;isolation:isolate"
          class="fill-current transition-all ease-out duration-200"
          :class="[
            sdwColorClass != null ? sdwColorClass : defaultSdwColorClass
          ]"
          fill="#010014"
        />
      </g>
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
