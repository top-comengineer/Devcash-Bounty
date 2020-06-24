<template>
  <div>
    <!-- Discord -->
    <svg
      v-if="type == 'discord'"
      id="28f8ec2b-94c6-4e26-ba13-ffba864e59e6"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>discord</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M17.71,20.8s-.74-.9-1.36-1.7a6.49,6.49,0,0,0,3.72-2.49,11.67,11.67,0,0,1-2.36,1.24,13.33,13.33,0,0,1-3,.9,14.12,14.12,0,0,1-5.32,0,17,17,0,0,1-3-.9,11.93,11.93,0,0,1-1.5-.71L4.71,17a.28.28,0,0,1-.08-.06c-.37-.21-.58-.36-.58-.36a6.4,6.4,0,0,0,3.6,2.47c-.62.8-1.38,1.74-1.38,1.74A7.43,7.43,0,0,1,0,17.62,28.48,28.48,0,0,1,3,5.4,10,10,0,0,1,8.73,3.2l.21.25A13.78,13.78,0,0,0,3.53,6.2S4,5.94,4.75,5.59A15.19,15.19,0,0,1,9.41,4.27a2,2,0,0,1,.35,0,17.05,17.05,0,0,1,4.15,0,16.52,16.52,0,0,1,6.18,2A13.6,13.6,0,0,0,15,3.54l.29-.34A10,10,0,0,1,21,5.4a28.48,28.48,0,0,1,3,12.22A7.49,7.49,0,0,1,17.71,20.8ZM8.16,11a2.21,2.21,0,0,0-2.1,2.33,2.23,2.23,0,0,0,2.1,2.33,2.21,2.21,0,0,0,2.1-2.33A2.2,2.2,0,0,0,8.16,11Zm7.5,0a2.21,2.21,0,0,0-2.1,2.33,2.23,2.23,0,0,0,2.1,2.33,2.21,2.21,0,0,0,2.1-2.33A2.21,2.21,0,0,0,15.66,11Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Facebook -->
    <svg
      v-else-if="type == 'facebook'"
      id="d51db7d3-2d80-4275-963c-38764876e1b4"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>facebook</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M24,12.07A12,12,0,1,0,10.13,24V15.56h-3V12.07h3V9.41c0-3,1.79-4.7,4.53-4.7A18.36,18.36,0,0,1,17.34,5v3H15.83a1.74,1.74,0,0,0-2,1.89v2.26H17.2l-.53,3.49h-2.8V24A12.05,12.05,0,0,0,24,12.07Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Twitter -->
    <svg
      v-else-if="type == 'twitter'"
      id="b02b4714-524c-4048-89c4-6e108c647217"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>twitter</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M7.55,21.6a13.8,13.8,0,0,0,14-13.8c0-.21,0-.42,0-.63A9.93,9.93,0,0,0,24,4.66a10,10,0,0,1-2.83.76,4.86,4.86,0,0,0,2.17-2.68,10,10,0,0,1-3.13,1.18,5,5,0,0,0-5.92-1,4.82,4.82,0,0,0-2.48,5.38A14.05,14.05,0,0,1,1.67,3.27,4.82,4.82,0,0,0,3.19,9.76,5,5,0,0,1,1,9.15v.06a4.87,4.87,0,0,0,4,4.75A5,5,0,0,1,2.69,14a4.92,4.92,0,0,0,4.6,3.37,10,10,0,0,1-6.12,2.08A10.21,10.21,0,0,1,0,19.42,14.1,14.1,0,0,0,7.55,21.6"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Medium -->
    <svg
      v-else-if="type == 'medium'"
      id="b1c06058-e672-4861-9cbc-77fde03e2587"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>medium</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M24,0V24H0V0ZM8.69,5.42H4v.27L5.52,7.5a.62.62,0,0,1,.2.53v7.13a.82.82,0,0,1-.22.71L3.82,17.92v.27h4.8v-.27L6.92,15.86a.85.85,0,0,1-.23-.71V9l4.21,9.2h.49L15,9v7.4a.32.32,0,0,1-.13.29l-1.3,1.26v.27h6.32v-.27l-1.26-1.23a.38.38,0,0,1-.14-.36V7.28a.38.38,0,0,1,.14-.36l1.29-1.23V5.42H15.48l-3.18,7.92L8.69,5.42Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- GitHub -->
    <svg
      v-else-if="type == 'github'"
      id="46f3e73b-0086-4bd6-98a0-26d65ea1096a"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>github</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M12,0A12.09,12.09,0,0,0,.16,10.34,12.34,12.34,0,0,0,8.21,24c.6.11.82-.27.82-.59l0-2.09c-3.34.74-4-1.65-4-1.65a3.2,3.2,0,0,0-1.33-1.8c-1.09-.76.08-.75.08-.75a2.53,2.53,0,0,1,1.84,1.27,2.52,2.52,0,0,0,3.49,1,2.65,2.65,0,0,1,.76-1.64c-2.66-.31-5.47-1.37-5.47-6.08a4.83,4.83,0,0,1,1.23-3.3A4.53,4.53,0,0,1,5.7,5.1s1-.33,3.3,1.26a11.1,11.1,0,0,1,6,0C17.3,4.77,18.3,5.1,18.3,5.1a4.53,4.53,0,0,1,.12,3.26,4.82,4.82,0,0,1,1.23,3.3c0,4.73-2.81,5.77-5.48,6.07A3,3,0,0,1,15,20l0,3.38c0,.33.22.71.82.59a12.34,12.34,0,0,0,8-13.65A12.1,12.1,0,0,0,12,0Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Reddit -->
    <svg
      v-else-if="type == 'reddit'"
      id="16a579ca-d7b6-43aa-bc5b-0930554a3d36"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>reddit</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M12,0A12,12,0,1,1,0,12,12,12,0,0,1,12,0Zm4.81,4.71a1.2,1.2,0,0,0-1.08.7l-2.81-.63a.29.29,0,0,0-.22,0,.27.27,0,0,0-.12.2l-.86,4.19A8.17,8.17,0,0,0,7.14,10.7,1.66,1.66,0,0,0,6,10.2a1.71,1.71,0,0,0-1.68,1.74,1.74,1.74,0,0,0,1,1.59,3.33,3.33,0,0,0,0,.53c0,2.69,3,4.88,6.75,4.88s6.75-2.18,6.75-4.88a3.47,3.47,0,0,0,0-.53,1.77,1.77,0,0,0,1-1.59A1.72,1.72,0,0,0,18,10.2a1.66,1.66,0,0,0-1.17.5,8.19,8.19,0,0,0-4.52-1.49l.78-3.75L15.61,6a1.2,1.2,0,1,0,1.2-1.3ZM14.63,15.94l.12,0a.3.3,0,0,1,.1.07.35.35,0,0,1,0,.46,4.29,4.29,0,0,1-2.86.91,4.36,4.36,0,0,1-2.86-.92.33.33,0,0,1,0-.46.3.3,0,0,1,.1-.07l.12,0,.12,0a.3.3,0,0,1,.1.07,3.67,3.67,0,0,0,2.42.73A3.62,3.62,0,0,0,14.41,16a.3.3,0,0,1,.1-.07Zm.43-3.88a1.24,1.24,0,0,1,.77,1.15,1.23,1.23,0,0,1-2.37.5,1.25,1.25,0,0,1,.25-1.36,1.23,1.23,0,0,1,1.35-.28ZM9.35,12a1.21,1.21,0,0,1,0,2.42,1.23,1.23,0,0,1-1.2-1.24A1.21,1.21,0,0,1,9.35,12Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Instagram -->
    <svg
      v-else-if="type == 'instagram'"
      id="564f3912-aadb-4e72-9a0c-54e07f44b4e5"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>instagram</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M12,5.85A6.15,6.15,0,1,0,18.15,12,6.14,6.14,0,0,0,12,5.85ZM12,16a4,4,0,1,1,4-4,4,4,0,0,1-4,4ZM19.84,5.6a1.43,1.43,0,1,1-1.43-1.44A1.43,1.43,0,0,1,19.84,5.6Zm4.07,1.46A7.1,7.1,0,0,0,22,2a7.14,7.14,0,0,0-5-1.94C15,0,9,0,7,.08A7.14,7.14,0,0,0,2,2,7.12,7.12,0,0,0,.08,7C0,9,0,15,.08,16.95A7.1,7.1,0,0,0,2,22a7.16,7.16,0,0,0,5,1.94c2,.11,7.92.11,9.9,0A7.1,7.1,0,0,0,22,22a7.15,7.15,0,0,0,1.94-5c.11-2,.11-7.92,0-9.9Zm-2.56,12a4,4,0,0,1-2.28,2.28c-1.58.63-5.33.48-7.07.48s-5.5.14-7.07-.48a4,4,0,0,1-2.28-2.28C2,17.49,2.17,13.74,2.17,12S2,6.5,2.65,4.93A4,4,0,0,1,4.93,2.64C6.51,2,10.26,2.16,12,2.16s5.5-.14,7.07.48a4,4,0,0,1,2.28,2.28c.63,1.58.48,5.33.48,7.07s.14,5.5-.48,7.07Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Menu-->
    <svg
      v-else-if="type == 'menu'"
      id="d7937876-8bfa-43c1-80f7-af306154043c"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>menu</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M7,9H27a2,2,0,0,0,0-4H3A4,4,0,0,0,7,9Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M27,14H11a4,4,0,0,0,4,4H27a2,2,0,0,0,0-4Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M27,23H3a4,4,0,0,0,4,4H27a2,2,0,0,0,0-4Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Light-->
    <svg
      v-else-if="type == 'light'"
      id="dee6c340-5f8a-44c8-83e7-3d6877ea9dab"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>light</title>
      <circle
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        cx="16"
        cy="16"
        r="6.01"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M16,24.4a1.2,1.2,0,0,0-1.2,1.2v1.2a1.2,1.2,0,1,0,2.4,0V25.6A1.2,1.2,0,0,0,16,24.4Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M16,7.6a1.2,1.2,0,0,0,1.2-1.2V5.2a1.2,1.2,0,0,0-2.4,0V6.4A1.2,1.2,0,0,0,16,7.6Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M7.6,16a1.2,1.2,0,0,0-1.2-1.2H5.2a1.2,1.2,0,0,0,0,2.4H6.4A1.2,1.2,0,0,0,7.6,16Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M26.8,14.8H25.6a1.2,1.2,0,0,0,0,2.4h1.2a1.2,1.2,0,1,0,0-2.4Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M8.36,21.94l-.85.85a1.2,1.2,0,1,0,1.7,1.7l.85-.85a1.2,1.2,0,1,0-1.7-1.7Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M23.64,10.06l.85-.85a1.2,1.2,0,0,0-1.7-1.7l-.85.85a1.2,1.2,0,1,0,1.7,1.7Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M8.36,10.06a1.2,1.2,0,0,0,1.7-1.7l-.85-.85a1.2,1.2,0,1,0-1.7,1.7Z"
        fill="#f2f1ff"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M23.64,21.94a1.2,1.2,0,1,0-1.7,1.7l.85.85a1.2,1.2,0,1,0,1.7-1.7Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Dark-->
    <svg
      v-else-if="type == 'dark'"
      id="992e4a54-63f7-4882-9e62-e010945b3801"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>dark</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M12.7,4A12.26,12.26,0,1,0,28,19.3,11.14,11.14,0,0,1,12.7,4Z"
        fill="#f2f1ff"
      />
    </svg>
    <!-- Clock -->
    <svg
      v-else-if="type == 'clock'"
      id="43c32ee8-9083-4958-872d-15e3c1dd45e7"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>clock</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M29.09,8.44a1.4,1.4,0,0,0-.17-2l-4.3-3.58A1.4,1.4,0,1,0,22.84,5l4.3,3.58A1.4,1.4,0,0,0,29.09,8.44ZM9.16,5A1.39,1.39,0,0,0,7.38,2.88L3.08,6.45A1.39,1.39,0,1,0,4.87,8.6Zm7.54,6.56a1.05,1.05,0,1,0-2.1,0v7.29l5.8,3.46a1,1,0,1,0,1-1.72L16.7,17.84ZM16,5A12.51,12.51,0,1,0,28.6,17.49,12.56,12.56,0,0,0,16,5Zm0,22.24a9.73,9.73,0,1,1,9.8-9.73A9.76,9.76,0,0,1,16,27.22Z"
      />
    </svg>
    <!-- Award -->
    <svg
      v-else-if="type == 'award'"
      id="527068dd-35fc-4b3b-8fae-05e9ac7c6883"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>award</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M16,30A14,14,0,1,0,2,16,14,14,0,0,0,16,30Zm8.65-17.71a.9.9,0,0,1,0,1.38l-4.08,3.67,1.65,5.76a.9.9,0,0,1-1.37,1L16,20.83,11.1,24.1a.9.9,0,0,1-1.38-1l1.34-5.81-3.79-3.7a.9.9,0,0,1,.56-1.54L13,11.7l2.22-4.92a.9.9,0,0,1,1.64,0L19,11.7l5.13.41A.9.9,0,0,1,24.65,12.29Z"
      />
    </svg>
    <!-- Explore -->
    <svg
      v-else-if="type == 'explore'"
      id="d5b9e97d-8862-4de7-8f2a-88fee8f14a08"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>explore</title>
      <path
        class="fill-current transition-colors ease-out duration-200"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M12,10.9A1.1,1.1,0,1,0,13.1,12,1.1,1.1,0,0,0,12,10.9ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.19,12.19L6.93,17.57a.37.37,0,0,1-.5-.5L9.81,9.81l7.26-3.38a.37.37,0,0,1,.5.5Z"
      />
    </svg>
    <!-- Post -->
    <svg
      v-else-if="type == 'post'"
      id="17d1729a-bcf0-448e-b2c5-ad11fe03d3c4"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>Post</title>
      <path
        class="fill-current transition-colors ease-out duration-200"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M14.81,12A5.63,5.63,0,1,0,9.19,6.38,5.63,5.63,0,0,0,14.81,12ZM14,3.84a.84.84,0,1,1,1.69,0V5.53h1.69a.84.84,0,0,1,0,1.69H15.66V8.91a.84.84,0,1,1-1.69,0V7.22H12.28a.84.84,0,0,1,0-1.69H14Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M14.81,13.5a7.09,7.09,0,0,0,3.75-1.07V21a1.5,1.5,0,0,1-1.5,1.5h-9A4.5,4.5,0,0,1,3.56,18V4.5A1.5,1.5,0,0,1,5.06,3H8.54a7.13,7.13,0,0,0,6.28,10.5Z"
      />
    </svg>
    <!-- Email -->
    <svg
      v-else-if="type == 'email'"
      id="f646dd47-a5f2-419c-b82c-046c5dc8e892"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
    >
      <title>Email</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M11.67,2.33H2.33A1.17,1.17,0,0,0,1.17,3.5v7a1.17,1.17,0,0,0,1.17,1.17h9.33a1.17,1.17,0,0,0,1.17-1.17v-7A1.17,1.17,0,0,0,11.67,2.33Zm0,2.33L7,7.58,2.33,4.67V3.5L7,6.42,11.67,3.5Z"
      />
    </svg>
    <!-- Arrow Down -->
    <svg
      v-else-if="type == 'arrow-down'"
      id="6f661883-87ef-4100-80c8-e92cf4a5f264"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>arrow-down</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M28,9.86a1,1,0,0,1,.73,1.76l-12,12.11a1,1,0,0,1-1.47,0L3.3,11.61A1,1,0,0,1,4,9.86Z"
      />
    </svg>
    <!-- Language -->
    <svg
      v-else-if="type == 'language'"
      id="80cc7d50-e363-4c84-8761-f957b3a19625"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>language</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Zm9,7.8H21.16a20.34,20.34,0,0,0-1.79-4.63A10.44,10.44,0,0,1,25,10.8ZM16,5.65a18.31,18.31,0,0,1,2.48,5.15h-5A18.31,18.31,0,0,1,16,5.65ZM5.94,18.6a10.17,10.17,0,0,1,0-5.2h4.39a21.47,21.47,0,0,0-.18,2.6,21.47,21.47,0,0,0,.18,2.6ZM7,21.2h3.83a20.34,20.34,0,0,0,1.79,4.63A10.38,10.38,0,0,1,7,21.2Zm3.83-10.4H7a10.38,10.38,0,0,1,5.63-4.63,20.34,20.34,0,0,0-1.79,4.63ZM16,26.35a18.31,18.31,0,0,1-2.48-5.15h5A18.31,18.31,0,0,1,16,26.35Zm3-7.75H13a19.13,19.13,0,0,1-.21-2.6A19,19,0,0,1,13,13.4H19a19,19,0,0,1,.21,2.6A19.11,19.11,0,0,1,19,18.6Zm.33,7.23a20.34,20.34,0,0,0,1.79-4.63H25a10.44,10.44,0,0,1-5.63,4.63Zm2.3-7.23a21.47,21.47,0,0,0,.18-2.6,21.47,21.47,0,0,0-.18-2.6h4.39a10.17,10.17,0,0,1,0,5.2Z"
      />
    </svg>
    <!-- Notifications New -->
    <svg
      v-else-if="type == 'notification-new'"
      id="f86f33dd-fc53-44c6-9752-840689abe527"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>notification-new</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M23.75,21.25V15.92a6.67,6.67,0,0,1-6.67-6.67,6.59,6.59,0,0,1,.67-3.07V5.25a2,2,0,0,0-4,0v.91c-3.83.91-6,4.32-6,8.43v6.67L5.08,23.92v1.33H26.42V23.92Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M15.75,29.25a2.67,2.67,0,0,0,2.67-2.67H13.08A2.67,2.67,0,0,0,15.75,29.25Z"
      />
      <circle
        class="fill-current"
        :class="[secondaryColorClass != null ? secondaryColorClass : defaultSecondaryColorClass]"
        fill="#ff8080"
        cx="23.75"
        cy="9.25"
        r="4.67"
      />
    </svg>
    <!-- Overview -->
    <svg
      v-else-if="type == 'overview'"
      id="59182f13-6106-47ba-993a-32dd70cbb2c4"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>overview</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M3,12.25a.75.75,0,0,0,.75.75h6.5a.75.75,0,0,0,.75-.75V3.75A.75.75,0,0,0,10.25,3H3.75A.75.75,0,0,0,3,3.75Zm0,8a.75.75,0,0,0,.75.75h6.5a.75.75,0,0,0,.75-.75v-4.5a.75.75,0,0,0-.75-.75H3.75a.75.75,0,0,0-.75.75Zm10,0a.75.75,0,0,0,.75.75h6.5a.75.75,0,0,0,.75-.75v-8.5a.75.75,0,0,0-.75-.75h-6.5a.75.75,0,0,0-.75.75ZM13.75,3a.75.75,0,0,0-.75.75v4.5a.75.75,0,0,0,.75.75h6.5A.75.75,0,0,0,21,8.25V3.75A.75.75,0,0,0,20.25,3Z"
      />
    </svg>
    <!-- Bounty Hunter -->
    <svg
      v-else-if="type == 'bounty-hunter'"
      id="bdfa1655-4acf-433b-ad0d-e212751f25f8"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>bountyhunter</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M20,15.13a2.21,2.21,0,0,1-1.24.37,2.16,2.16,0,0,1-1.23-.39,2.12,2.12,0,0,1-.8-1,2.18,2.18,0,0,1-.09-1.29l.85-3.69L15.16,6.83a2.25,2.25,0,0,1-.53-2.33,2.21,2.21,0,0,1,.3-.57.42.42,0,0,1-.15,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L9.22,3.11a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L5.36,3.18A.25.25,0,0,0,5,3.4V28.6a.25.25,0,0,0,.36.22l1.42-.71a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.42.71A.25.25,0,0,0,25,28.6V14.48l-2-1.34ZM9,10h5a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2Zm0,4h5a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2ZM21,24H9a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M30,5a.64.64,0,0,0-.23-.33.67.67,0,0,0-.37-.15l-4-.31L23.64.41a.83.83,0,0,0-.26-.3A.7.7,0,0,0,23,0a.73.73,0,0,0-.38.11.83.83,0,0,0-.26.3L20.64,4.24l-4,.31a.67.67,0,0,0-.36.14A.82.82,0,0,0,16,5a.78.78,0,0,0,0,.4.72.72,0,0,0,.19.34l2.95,2.88-1,4.51a.71.71,0,0,0,0,.41.75.75,0,0,0,.25.33.69.69,0,0,0,.39.12h0a.69.69,0,0,0,.39-.12L23,11.34l3.81,2.54a.69.69,0,0,0,.39.12h0a.63.63,0,0,0,.4-.14.68.68,0,0,0,.25-.33.67.67,0,0,0,0-.42L26.59,8.63l3.18-2.86A.69.69,0,0,0,30,5Z"
      />
    </svg>
    <!-- Bounty Manager -->
    <svg
      v-else-if="type == 'bounty-manager'"
      id="90ae1035-9c4d-4f13-a60d-89d6decf8048"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <title>bountymanager</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M19.8,5.7H12L10.05,3.75H4.2A2,2,0,0,0,2.25,5.7V17.4a2,2,0,0,0,1.95,2H19.8a2,2,0,0,0,2-2V7.65A2,2,0,0,0,19.8,5.7Zm-.46,5.47a.41.41,0,0,1,0,.63l-1.87,1.68.75,2.64a.41.41,0,0,1-.63.46l-2.25-1.5-2.25,1.5a.41.41,0,0,1-.63-.44l.61-2.66-1.74-1.69a.41.41,0,0,1,.26-.71L14,10.9l1-2.25a.41.41,0,0,1,.75,0l1,2.25,2.35.19A.41.41,0,0,1,19.34,11.17Z"
      />
    </svg>
    <!-- Bounty Complete -->
    <svg
      v-else-if="type == 'bounty-complete'"
      id="8f9f3bc6-259c-4ad3-b188-8694b59aa694"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>bounty-complete</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M21,14a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2h4.55l-2-2H9a1,1,0,0,1,0-2h.75a2.89,2.89,0,0,1,.4-3.47,2.85,2.85,0,0,1,4.08,0l1.71,1.74L21,3.06a.45.45,0,0,0-.25,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L9.22,3.11a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L5.36,3.18A.25.25,0,0,0,5,3.4V28.6a.25.25,0,0,0,.36.22l1.42-.71a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.42.71A.25.25,0,0,0,25,28.6V7.17L18.33,14ZM9,18h9a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2Zm12,6H9a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M27.08,1a1.36,1.36,0,0,0-1-.41,1.33,1.33,0,0,0-1,.41l-9.2,9.42L13.16,7.58a1.35,1.35,0,0,0-1.94,0,1.36,1.36,0,0,0,0,1.89l4.72,4.83L27.08,2.89A1.34,1.34,0,0,0,27.08,1Z"
      />
    </svg>
    <!-- Cancel -->
    <svg
      v-else-if="type == 'cancel'"
      id="218b30da-4bee-4332-9e79-ab168f428713"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>cancel</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M18.49,16l7-7A1.77,1.77,0,1,0,23,6.52l-7,7-7-7A1.77,1.77,0,1,0,6.52,9l7,7-7,7A1.77,1.77,0,0,0,9,25.48l7-7,7,7a1.77,1.77,0,0,0,2.5-2.5Z"
      />
    </svg>
    <!-- Done -->
    <svg
      v-else-if="type == 'done'"
      id="bbc320b3-9f05-48a1-b883-a31a4cdeed04"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>done</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M11.28,25,4.36,17.91a2,2,0,0,1,0-2.78h0a2,2,0,0,1,2.84,0l4.08,4.16L24.79,5.46a2,2,0,0,1,2.86,0h0a2,2,0,0,1,0,2.78Z"
      />
    </svg>
    <!-- Fee -->
    <svg
      v-else-if="type == 'fee'"
      id="a93db7f0-1af5-4cbb-bc8d-590561003eca"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>fee</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M6.38,18.25V15.44A3.49,3.49,0,0,0,4.5,12,3.49,3.49,0,0,0,6.38,8.56V5.75A1.56,1.56,0,0,1,7.94,4.19h2.18A2.13,2.13,0,0,0,12.31,2H7A2.8,2.8,0,0,0,4.19,4.81V8.09A4,4,0,0,1,2,12a4,4,0,0,1,2.19,3.91v3.28A2.8,2.8,0,0,0,7,22a2.19,2.19,0,0,0,1.22-.36V19.81H7.94A1.56,1.56,0,0,1,6.38,18.25Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M21.26,8.22a10,10,0,0,0-7.45-6.06L12.69,8.53a3.71,3.71,0,0,1,1.49-.31Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M21.81,10.16l-3.47,19.7a10,10,0,0,0,3.47-19.7Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M14.38,16.56V13.75a1.57,1.57,0,0,1,1.56-1.56h2.19A2.14,2.14,0,0,0,20.31,10H15a2.8,2.8,0,0,0-2.81,2.81v3.28A4,4,0,0,1,10,20a4,4,0,0,1,2.19,3.91v3.28A2.8,2.8,0,0,0,15,30a2.14,2.14,0,0,0,2.19-2.19H15.94a1.57,1.57,0,0,1-1.56-1.56V23.44A3.49,3.49,0,0,0,12.5,20,3.49,3.49,0,0,0,14.38,16.56Z"
      />
    </svg>
    <!-- New Bounty -->
    <svg
      v-else-if="type == 'new-bounty'"
      id="6281d12d-0a8b-4f50-a8f1-64dbd112acb4"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>new-bounty</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M20.93,10.65a1.53,1.53,0,0,1-.82.24A1.49,1.49,0,0,1,19,10.45a1.51,1.51,0,0,1-.2-1.88l2.52-3.88a4.44,4.44,0,0,1-.07-1.54l-.08,0a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L9.22,3.11a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L5.36,3.18A.25.25,0,0,0,5,3.4V28.6a.25.25,0,0,0,.36.22l1.42-.71a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.42.71A.25.25,0,0,0,25,28.6V8.16l-.18,0ZM9,10h5a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2Zm0,4h8a1,1,0,0,1,0,2H9a1,1,0,0,1,0-2ZM21,24H9a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Zm0-4H9a1,1,0,0,1,0-2H21a1,1,0,0,1,0,2Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M27.89,1.61a3,3,0,0,0-4.24,0A3,3,0,0,0,23,4.91l-2.9,4.48,4.48-2.9a3,3,0,0,0,3.3-4.88Z"
      />
    </svg>
    <!-- Personal Bounty -->
    <svg
      v-else-if="type == 'personal-bounty'"
      id="9776f15d-f6db-462d-a1ea-8a7976d39c82"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>personal-bounty</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M20.93,10.65a1.53,1.53,0,0,1-.82.24A1.49,1.49,0,0,1,19,10.45a1.51,1.51,0,0,1-.2-1.88l2.52-3.88a4.44,4.44,0,0,1-.07-1.54l-.08,0a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0l-1.56-.78a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L9.22,3.11a.49.49,0,0,0-.44,0l-1.56.78a.49.49,0,0,1-.44,0L5.36,3.18A.25.25,0,0,0,5,3.4V28.6a.25.25,0,0,0,.36.22l1.42-.71a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.56.78a.49.49,0,0,0,.44,0l1.56-.78a.49.49,0,0,1,.44,0l1.42.71A.25.25,0,0,0,25,28.6V8.16l-.18,0ZM15,10.5a4,4,0,1,1-4,4A4,4,0,0,1,15,10.5ZM23,26H7V24c0-2.66,5.33-4,8-4s8,1.34,8,4Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M27.89,1.61a3,3,0,0,0-4.24,0A3,3,0,0,0,23,4.91l-2.9,4.48,4.48-2.9a3,3,0,0,0,3.3-4.88Z"
      />
    </svg>
    <!-- Reclaim -->
    <svg
      v-else-if="type == 'reclaim'"
      id="4e0003a6-8e3e-4aaa-a834-25a21747cfa0"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>reclaim</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M26,4H20V7h4a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H22.5A1.5,1.5,0,0,0,21,22.5V25H11V22.5A1.5,1.5,0,0,0,9.5,21H8a1,1,0,0,1-1-1V8A1,1,0,0,1,8,7h4V4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4Zm-4.48,8A1,1,0,0,0,20,12l-3,3V1A1,1,0,0,0,15,1V15l-3-3a1,1,0,0,0-1.47,1.47L16,19l5.52-5.52A1,1,0,0,0,21.52,12Z"
      />
    </svg>
    <!-- Receive -->
    <svg
      v-else-if="type == 'receive'"
      id="1806eec9-cfb1-4ee8-aa6e-2a966009427d"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>Receive</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M29,19.82,20.48,28a1.57,1.57,0,1,1-2.17-2.27l4.55-4.34H7a2,2,0,0,1-2-2V4.6a1.6,1.6,0,1,1,3.2,0V17.29a1,1,0,0,0,1,1H22.87L18.32,14a1.57,1.57,0,1,1,2.17-2.27Z"
      />
    </svg>
    <!-- Send -->
    <svg
      v-else-if="type == 'send'"
      id="92d26df9-70e1-4e39-aed4-90144c073402"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>Send</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M12.18,3,4,11.52a1.57,1.57,0,1,0,2.27,2.17l4.34-4.55V25a2,2,0,0,0,2,2H27.4a1.6,1.6,0,0,0,0-3.2H14.71a1,1,0,0,1-1-1V9.13L18,13.68a1.57,1.57,0,1,0,2.27-2.17Z"
      />
    </svg>
    <!-- Sign Out -->
    <svg
      v-else-if="type == 'sign-out'"
      id="8bd3d775-be8a-4725-80de-9c871b0cef79"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <title>Sign Out</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M3,3A2,2,0,0,1,5,1H20a2,2,0,0,1,2,2V8a1,1,0,0,1-1,1h0a1,1,0,0,1-1-1V3H7.4l5.428,2.467A2,2,0,0,1,14,7.288V24h6V19a1,1,0,0,1,1-1h0a1,1,0,0,1,1,1v5a2,2,0,0,1-2,2H14v3.382a1,1,0,0,1-1.447.894L4.106,26.053A2,2,0,0,1,3,24.264Z"
      />
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M25,10.315a.5.5,0,0,1,.874-.332L29,13.5l-3.126,3.517A.5.5,0,0,1,25,16.685V14.5H17a1,1,0,0,1,0-2h8Z"
      />
    </svg>
    <!-- Search -->
    <svg
      v-else-if="type == 'search'"
      id="8badac04-8c04-4e3a-b7ea-24f60e9d1362"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <title>search</title>
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#f2f1ff"
        d="M11.006,9.805h-.632l-.224-.216a5.211,5.211,0,1,0-.56.56l.216.224v.632l3.405,3.4A.844.844,0,0,0,14.4,13.21Zm-4.8,0a3.6,3.6,0,1,1,3.6-3.6A3.6,3.6,0,0,1,6.2,9.805Z"
      />
    </svg>
    <!-- Back -->
    <svg
      v-else-if="type=='back'"
      id="1cddab02-5c03-2e1a-b6ea-56f60e9d9742"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#F2F1FF"
        d="M21 12C21 11.3787 20.4963 10.875 19.875 10.875H7.30875L10.5448 7.62993C10.9821 7.19141 10.9816 6.48158 10.5437 6.04368C10.1053 5.60534 9.39466 5.60534 8.95632 6.04368L3 12L8.95632 17.9563C9.39466 18.3947 10.1053 18.3947 10.5437 17.9563C10.9816 17.5184 10.9821 16.8086 10.5448 16.3701L7.30875 13.125H19.875C20.4963 13.125 21 12.6213 21 12Z"
      />
    </svg>
    <!-- Calendar -->
    <svg
      v-else-if="type=='calender'"
      id="1a421579-ccdd-123b-ddae-42f1ad9d9742"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#F2F1FF"
        d="M8.94643 12.5363H7.33929C7.07411 12.5363 6.85714 12.3193 6.85714 12.0541V10.447C6.85714 10.1818 7.07411 9.96484 7.33929 9.96484H8.94643C9.21161 9.96484 9.42857 10.1818 9.42857 10.447V12.0541C9.42857 12.3193 9.21161 12.5363 8.94643 12.5363ZM13.2857 12.0541V10.447C13.2857 10.1818 13.0687 9.96484 12.8036 9.96484H11.1964C10.9312 9.96484 10.7143 10.1818 10.7143 10.447V12.0541C10.7143 12.3193 10.9312 12.5363 11.1964 12.5363H12.8036C13.0687 12.5363 13.2857 12.3193 13.2857 12.0541ZM17.1429 12.0541V10.447C17.1429 10.1818 16.9259 9.96484 16.6607 9.96484H15.0536C14.7884 9.96484 14.5714 10.1818 14.5714 10.447V12.0541C14.5714 12.3193 14.7884 12.5363 15.0536 12.5363H16.6607C16.9259 12.5363 17.1429 12.3193 17.1429 12.0541ZM13.2857 15.9113V14.3041C13.2857 14.039 13.0687 13.822 12.8036 13.822H11.1964C10.9312 13.822 10.7143 14.039 10.7143 14.3041V15.9113C10.7143 16.1765 10.9312 16.3934 11.1964 16.3934H12.8036C13.0687 16.3934 13.2857 16.1765 13.2857 15.9113ZM9.42857 15.9113V14.3041C9.42857 14.039 9.21161 13.822 8.94643 13.822H7.33929C7.07411 13.822 6.85714 14.039 6.85714 14.3041V15.9113C6.85714 16.1765 7.07411 16.3934 7.33929 16.3934H8.94643C9.21161 16.3934 9.42857 16.1765 9.42857 15.9113ZM17.1429 15.9113V14.3041C17.1429 14.039 16.9259 13.822 16.6607 13.822H15.0536C14.7884 13.822 14.5714 14.039 14.5714 14.3041V15.9113C14.5714 16.1765 14.7884 16.3934 15.0536 16.3934H16.6607C16.9259 16.3934 17.1429 16.1765 17.1429 15.9113ZM21 5.46484V19.6077C21 20.6724 20.1362 21.5363 19.0714 21.5363H4.92857C3.86384 21.5363 3 20.6724 3 19.6077V5.46484C3 4.40011 3.86384 3.53627 4.92857 3.53627H6.85714V1.44699C6.85714 1.18181 7.07411 0.964844 7.33929 0.964844H8.94643C9.21161 0.964844 9.42857 1.18181 9.42857 1.44699V3.53627H14.5714V1.44699C14.5714 1.18181 14.7884 0.964844 15.0536 0.964844H16.6607C16.9259 0.964844 17.1429 1.18181 17.1429 1.44699V3.53627H19.0714C20.1362 3.53627 21 4.40011 21 5.46484ZM19.0714 19.3666V7.39342H4.92857V19.3666C4.92857 19.4992 5.03705 19.6077 5.16964 19.6077H18.8304C18.9629 19.6077 19.0714 19.4992 19.0714 19.3666Z"
      />
    </svg>
    <!-- Copy -->
    <svg
      v-else-if="type=='copy'"
      id="2aaabd43-aa31-444b-dad1-31f1ad4c5713"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        fill="#F2F1FF"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.11843 3H21.329V5.36362H7.11843V21.909H4.75V5.36362C4.75 4.06363 5.81579 3 7.11843 3ZM11.8551 26.6364V10.091H24.8815V26.6364H11.8551ZM24.8815 7.72739H11.8551C11.227 7.72739 10.6246 7.97641 10.1804 8.41968C9.73622 8.86294 9.48669 9.46414 9.48669 10.091V26.6364C9.48669 27.2632 9.73622 27.8644 10.1804 28.3077C10.6246 28.751 11.227 29 11.8551 29H24.8815C25.5096 29 26.1121 28.751 26.5562 28.3077C27.0004 27.8644 27.2499 27.2632 27.2499 26.6364V10.091C27.2499 9.46414 27.0004 8.86294 26.5562 8.41968C26.1121 7.97641 25.5096 7.72739 24.8815 7.72739Z"
      />
    </svg>
    <!-- Feedback -->
    <svg
      v-else-if="type=='feedback'"
      id="2aaabd43-aa31-4asdz-1234-zxf1ad4c5713"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      xmlns:v="https://vecta.io/nano"
    >
      <path
        class="fill-current"
        :class="[colorClass != null ? colorClass : defaultColorClass]"
        d="M25.6 4H6.4C5.08 4 4.012 5.08 4.012 6.4L4 28l4.8-4.8h16.8a2.41 2.41 0 0 0 2.4-2.4V6.4A2.41 2.41 0 0 0 25.6 4zm0 16.8H7.804L6.4 22.204V6.4h19.2v14.4zM14.8 16h2.4v2.4h-2.4V16zm0-7.2h2.4v4.8h-2.4V8.8z"
        fill="#f2f1ff"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    type: null,
    colorClass: null,
    secondaryColorClass: null
  },
  data: function() {
    return {
      defaultColorClass: "text-c-text",
      defaultSecondaryColorClass: "text-c-danger"
    };
  }
};
</script>
