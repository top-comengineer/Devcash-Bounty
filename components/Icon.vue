<template>
  <div>
    <!-- Discord -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-if="type == 'discord'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        d="M17.712 20.8l-1.356-1.697c2.692-.775 3.72-2.493 3.72-2.493-.842.566-1.644.964-2.363 1.236-1.027.44-2.014.733-2.98.9-1.973.377-3.78.272-5.322-.02-1.17-.23-2.178-.566-3.02-.9a11.93 11.93 0 0 1-1.5-.712c-.062-.042-.123-.063-.185-.105-.04-.02-.062-.042-.082-.063l-.575-.356s.986 1.676 3.596 2.472L6.267 20.8C1.726 20.653 0 17.615 0 17.615 0 10.87 2.96 5.4 2.96 5.4c2.96-2.263 5.774-2.2 5.774-2.2l.205.25c-3.7 1.1-5.404 2.745-5.404 2.745s.452-.25 1.212-.608c2.2-.985 3.945-1.257 4.664-1.32.123-.02.226-.042.35-.042 1.253-.168 2.67-.2 4.15-.042a16.52 16.52 0 0 1 6.185 2.011s-1.623-1.57-5.116-2.66l.288-.335s2.815-.063 5.774 2.2c0 0 2.96 5.47 2.96 12.215 0 0-1.747 3.038-6.288 3.185zm-9.555-9.785c-1.17 0-2.096 1.048-2.096 2.326s.945 2.326 2.096 2.326c1.17 0 2.096-1.048 2.096-2.326.02-1.278-.925-2.326-2.096-2.326zm7.5 0c-1.17 0-2.096 1.048-2.096 2.326s.945 2.326 2.096 2.326c1.17 0 2.096-1.048 2.096-2.326s-.925-2.326-2.096-2.326z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Facebook -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'facebook'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        fill-rule="evenodd"
        d="M24 12.073C24 5.406 18.627 0 12 0S0 5.406 0 12.073C0 18.1 4.388 23.094 10.126 24v-8.437H7.08v-3.5h3.047v-2.66c0-3.026 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97H15.83c-1.49 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.5h-2.797V24C19.612 23.094 24 18.1 24 12.073z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Twitter -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'twitter'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        fill-rule="evenodd"
        d="M7.548 21.6c9.057 0 14-7.387 14-13.8 0-.2 0-.42-.014-.626.964-.686 1.796-1.536 2.456-2.51a9.95 9.95 0 0 1-2.828.763 4.86 4.86 0 0 0 2.165-2.682c-.97.565-2.026.963-3.126 1.177-1.526-1.598-3.952-1.99-5.916-.96s-2.98 3.24-2.476 5.376C7.86 8.142 4.17 6.3 1.67 3.273.363 5.5 1.03 8.334 3.195 9.756c-.782-.023-1.548-.23-2.235-.607v.06c.001 2.308 1.653 4.296 3.956 4.752-.725.194-1.485.223-2.224.084.645 1.974 2.493 3.328 4.6 3.366a9.98 9.98 0 0 1-6.115 2.08A10.21 10.21 0 0 1 0 19.423a14.1 14.1 0 0 0 7.548 2.174"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Medium -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'medium'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        fill-rule="evenodd"
        d="M24 0v24H0V0h24zM8.693 5.416H4.018v.27L5.523 7.5c.073.066.13.148.165.24s.05.2.04.288v7.126c.044.257-.037.52-.218.708l-1.693 2.054v.27h4.802v-.27L6.924 15.86c-.182-.187-.27-.448-.234-.708V9l4.215 9.196h.49L15.015 9v7.396c.006.056-.002.113-.025.164s-.058.097-.103.13l-1.302 1.264v.27h6.323v-.27L18.65 16.71a.38.38 0 0 1-.144-.361V7.282c-.023-.138.032-.276.144-.36l1.287-1.234v-.27h-4.455l-3.177 7.924-3.613-7.924z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- GitHub -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'github'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        fill-rule="evenodd"
        d="M12 0C6.114.001 1.098 4.378.156 10.336s2.468 11.736 8.05 13.644c.6.113.82-.267.82-.593L9 21.294c-3.337.744-4.04-1.65-4.04-1.65-.54-1.422-1.332-1.8-1.332-1.8-1.09-.763.082-.748.082-.748 1.205.087 1.838 1.268 1.838 1.268 1.07 1.88 2.808 1.338 3.492 1.022.11-.795.42-1.338.76-1.644-2.664-.31-5.465-1.366-5.465-6.08-.018-1.222.426-2.405 1.235-3.302-.123-.312-.535-1.562.117-3.256 0 0 1.007-.33 3.3 1.26a11.1 11.1 0 0 1 6.008 0c2.29-1.592 3.297-1.26 3.297-1.26.655 1.694.243 2.945.12 3.256.77.86 1.234 1.958 1.234 3.302 0 4.727-2.805 5.766-5.478 6.072.43.38.815 1.13.815 2.278l-.015 3.376c0 .33.216.712.825.592 5.58-1.912 8.987-7.69 8.043-13.646S17.883.001 12 0z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Reddit -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'reddit'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        fill-rule="evenodd"
        d="M12 0c6.628 0 12 5.372 12 12s-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0zm4.81 4.714a1.2 1.2 0 0 0-1.077.7L12.93 4.78c-.076-.016-.156.001-.22.045a.27.27 0 0 0-.123.199L11.728 9.2a8.17 8.17 0 0 0-4.586 1.49 1.66 1.66 0 0 0-1.174-.497c-.942.014-1.695.792-1.683 1.74a1.74 1.74 0 0 0 .988 1.59 3.33 3.33 0 0 0-.042.529c0 2.693 3.025 4.884 6.753 4.884s6.753-2.176 6.753-4.884c-.001-.177-.015-.354-.042-.53.61-.294.998-.91 1-1.6.006-.454-.168-.892-.484-1.218s-.748-.513-1.202-.52c-.44.003-.863.182-1.174.497a8.19 8.19 0 0 0-4.517-1.49l.78-3.75 2.513.556c.023.314.168.606.403.815s.543.317.857.3c.652-.032 1.16-.58 1.143-1.236s-.547-1.18-1.2-1.182h-.005zm-2.184 11.222a.3.3 0 0 1 .221.097c.055.064.086.146.086.23s-.03.167-.086.23c-.827.86-2.402.912-2.86.912s-2.044-.072-2.86-.917a.33.33 0 0 1 0-.457.3.3 0 0 1 .221-.098.3.3 0 0 1 .221.098c.524.544 1.63.73 2.417.73s1.905-.18 2.417-.73a.3.3 0 0 1 .221-.097zm.43-3.88a1.24 1.24 0 0 1 .56.458c.137.205.21.446.2.693.007.675-.53 1.23-1.2 1.242-.246.007-.49-.06-.696-.193s-.37-.324-.47-.55c-.202-.462-.105-1.002.246-1.365a1.23 1.23 0 0 1 1.35-.285h-.001zm-5.712-.05c.66.012 1.188.556 1.182 1.22a1.21 1.21 0 0 1-1.203 1.2c-.673-.01-1.21-.566-1.204-1.242.018-.664.563-1.19 1.224-1.177h.001z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Instagram -->
    <svg
      class="h-auto"
      v-bind:class="widthClass != null ? widthClass : defaultWidthClass"
      v-else-if="type == 'instagram'"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      preserveAspectRatio="xMinYMin meet"
    >
      <path
        class="fill-current"
        v-bind:class="colorClass != null ? colorClass : defaultColorClass"
        d="M11.996 5.847c-3.405 0-6.15 2.748-6.15 6.153a6.15 6.15 0 0 0 6.151 6.153c3.4 0 6.158-2.747 6.158-6.153s-2.747-6.153-6.158-6.153zm0 10.154c-2.2 0-4-1.8-4-4a4.01 4.01 0 0 1 1.174-2.827 4 4 0 0 1 5.654-.002A4.01 4.01 0 0 1 16.001 12a4.01 4.01 0 0 1-3.999 4h-.006zM19.84 5.595a1.43 1.43 0 0 1-1.984 1.327c-.174-.072-.332-.178-.466-.31s-.24-.292-.31-.466-.11-.36-.11-.55c0-.792.642-1.435 1.435-1.435s1.435.642 1.435 1.435zm4.075 1.457c-.09-1.922-.53-3.626-1.938-5.028C20.573.62 18.87.18 16.95.084c-1.98-.112-7.918-.112-9.9 0-1.916.09-3.618.53-5.027 1.934S.18 5.124.085 7.047c-.113 1.98-.113 7.92 0 9.902.09 1.922.53 3.626 1.938 5.028s3.105 1.842 5.027 1.938c1.98.112 7.918.112 9.9 0 1.922-.09 3.624-.53 5.028-1.938s1.842-3.106 1.938-5.028c.113-1.98.113-7.915 0-9.896h-.001zm-2.56 12.023a4.05 4.05 0 0 1-.903 1.378c-.392.392-.86.7-1.377.903-1.58.626-5.327.482-7.073.482s-5.5.14-7.073-.482c-.516-.203-.985-.51-1.377-.903a4.05 4.05 0 0 1-.904-1.378c-.626-1.58-.482-5.335-.482-7.075s-.14-5.5.482-7.074a4.05 4.05 0 0 1 .904-1.378c.392-.393.86-.7 1.378-.904 1.58-.626 5.327-.482 7.073-.482s5.5-.14 7.073.482c.516.203.985.51 1.377.903a4.05 4.05 0 0 1 .903 1.378c.626 1.58.482 5.328.482 7.074s.144 5.5-.482 7.074v.001z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Menu-->
    <svg
      class="h-auto fill-current"
      v-bind:class="[
        widthClass != null ? widthClass : defaultWidthClass,
        colorClass != null ? colorClass : defaultColorClass
      ]"
      v-else-if="type == 'menu'"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      preserveAspectRatio="xMinYMin meet"
      fill="#f2f1ff"
    >
      <path
        d="M0 5h30a2 2 0 1 1 0 4H4a4 4 0 0 1-4-4zm8 9h22a2 2 0 1 1 0 4H12a4 4 0 0 1-4-4zm22 9H0a4 4 0 0 0 4 4h26a2 2 0 1 0 0-4z"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    type: null,
    colorClass: null,
    widthClass: null
  },
  data: function() {
    return {
      defaultWidthClass: "w-6",
      defaultColorClass: "text-dtText"
    };
  }
};
</script>
