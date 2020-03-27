<template>
  <div>
    <svg
      id="44a8c6d5-d347-499c-971d-54e5424fb30e"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 238 152"
    >
      <title>search</title>
      <g style="opacity:0.15">
        <path
          d="M158,100.45l36.08,9.95,30.22,17.45V125.7h13.31v14c.19,3-1.69,6-5.65,8.3-7.55,4.36-19.79,4.36-27.33,0l-37.87-21.87-17.23-20.83c-15.89,8-36.6,12.94-59.32,12.94C41.28,118.29,1.33,95.68,0,67.62H0v-.08q0-.66,0-1.33t0-1.33V53.1H2.9c10.1-22.38,45.41-39,87.31-39s77.22,16.58,87.31,39h2.85V64.62q0,.79,0,1.59C180.41,78.82,172.44,91,158,100.45ZM25.77,66.21c0,20.51,28.91,37.19,64.44,37.19s64.44-16.69,64.44-37.19S125.74,29,90.21,29,25.77,45.7,25.77,66.21Z"
          class="fill-current transition-all ease-out duration-200"
          v-bind:class="[
            fgColorClass != null ? fgColorClass : defaultFgColorClass
          ]"
          fill="#7066FF"
        />
        <path
          d="M158,100.45l36.08,9.95,30.22,17.45V125.7h13.31v14c.19,3-1.69,6-5.65,8.3-7.55,4.36-19.79,4.36-27.33,0l-37.87-21.87-17.23-20.83c-15.89,8-36.6,12.94-59.32,12.94C41.28,118.29,1.33,95.68,0,67.62H0v-.08q0-.66,0-1.33t0-1.33V53.1H2.9c10.1-22.38,45.41-39,87.31-39s77.22,16.58,87.31,39h2.85V64.62q0,.79,0,1.59C180.41,78.82,172.44,91,158,100.45ZM25.77,66.21c0,20.51,28.91,37.19,64.44,37.19s64.44-16.69,64.44-37.19S125.74,29,90.21,29,25.77,45.7,25.77,66.21Z"
          style="opacity:0.3;isolation:isolate"
          class="fill-current transition-all ease-out duration-200"
          v-bind:class="[
            sdwColorClass != null ? sdwColorClass : defaultSdwColorClass
          ]"
          fill="#010014"
         
        />
        <path
          d="M194.08,96.33,158,86.39c14.45-9.46,22.42-21.63,22.42-34.24C180.42,23.44,140,.07,90.21.07S0,23.44,0,52.14s40.47,52.07,90.21,52.07c22.72,0,43.43-4.91,59.32-12.94l17.23,20.83L204.63,134c7.55,4.36,19.78,4.36,27.33,0s7.55-11.42,0-15.78Zm-103.87-7c-35.53,0-64.44-16.69-64.44-37.19S54.68,15,90.21,15s64.44,16.69,64.44,37.19S125.74,89.34,90.21,89.34Z"
          class="fill-current transition-all ease-out duration-200"
          v-bind:class="[
            fgColorClass != null ? fgColorClass : defaultFgColorClass
          ]"
          fill="#7066FF"
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
