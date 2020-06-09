<template>
  <div>
    <label class="radio-container flex flex-row items-center">
      <input :checked="checked" type="radio" :name="name" />
      <span :class="$store.state.theme.dt?'border-dtText':'border-ltText'" class="radio-checkmark"></span>
      <h5 class="leading-tight font-bold">{{text}}</h5>
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
  padding-left: 1.8rem;
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
  top: 0;
  left: 0;
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
  border-color: #675cff;
}

.radio-container input:checked ~ h5 {
  color: #675cff;
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
  background-color: #675cff;
}
</style>