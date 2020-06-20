<template>
  <div>
    <label
      class="radio-container flex flex-row items-center p-1 hover:bg-c-primary-15 focus:bg-c-primary-15 transition-colors ease-out duration-200 rounded-md"
    >
      <input :checked="checked" type="radio" :name="name" />
      <span class="border-c-text radio-checkmark"></span>
      <h5 class="text-c-text leading-tight font-bold">{{text}}</h5>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    name: null,
    text: null,
    checked: null
  }
};
</script>
<style>
/* The radio-container */
.radio-container {
  position: relative;
  padding-left: 2rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.radio-checkmark {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  height: 1.2rem;
  width: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
/* .radio-container:hover input ~ .radio-checkmark {}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .radio-checkmark {
  border-color: var(--c-primary);
}

.radio-container input:checked ~ h5 {
  color: var(--c-primary);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.radio-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-container input:checked ~ .radio-checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio-container .radio-checkmark:after {
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: var(--c-primary);
}
</style>