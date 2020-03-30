<template>
  <div>
    <svg
      id="47cede1d-29ae-408b-875b-9aa8a239ff3b"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 263 171"
    >
      <title>code</title>
      <g style="opacity:0.15">
        <path
          d="M262.62,0l-.36,63.22H224.38l.06,19.49h37.89l.36-63.23ZM226,40.65,226,21.16l-72.62.78.06,19.5ZM46.92,19.07,165.33,138.2l30.76-17.77.05,19.5L165.38,157.7,47,38.56Zm-8,88.47L38.87,88,37.28,130.1l.06,19.49ZM.62,151.26H109.78l.11-21.94.06,19.5-.12,21.94H.68Z"
          class="fill-current transition-all ease-out duration-200"
          :class="[
            fgColorClass != null ? fgColorClass : defaultFgColorClass
          ]"
          fill="#7066FF"
        />
        <path
          d="M262.62,0l-.36,63.22H224.38l.06,19.49h37.89l.36-63.23ZM226,40.65,226,21.16l-72.62.78.06,19.5ZM46.92,19.07,165.33,138.2l30.76-17.77.05,19.5L165.38,157.7,47,38.56Zm-8,88.47L38.87,88,37.28,130.1l.06,19.49ZM.62,151.26H109.78l.11-21.94.06,19.5-.12,21.94H.68Z"
          style="opacity:0.3;isolation:isolate"
          class="fill-current transition-all ease-out duration-200"
          :class="[
            sdwColorClass != null ? sdwColorClass : defaultSdwColorClass
          ]"
          fill="#010014"
        />
        <path
          d="M153.47,0l-.12,21.94L226,21.16l-1.59,42.06h37.89L262.62,0ZM46.92,19.07,165.33,138.2l30.76-17.77L77.69,1.3ZM1,88H38.87L37.28,130.1l72.61-.79-.11,21.94H.62Z"
          class="fill-current transition-all ease-out duration-200"
          :class="[
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
