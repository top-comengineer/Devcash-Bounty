<template>
  <div ref="datepicker">
    <div
      class="rounded-lg shadow-2xlS p-4"
      :class="{'bg-dtText text-dtBackground':$store.state.theme.dt, 'bg-ltText text-ltBackground': !$store.state.theme.dt}"
      style="width: 17rem"
      v-on-clickaway="closePicker"
      @keydown.esc.exact="closePicker"
    >
      <div class="flex justify-between items-center mb-2">
        <div>
          <span class="text-lg font-bold">{{ monthNames[month] }}</span>
          <span class="ml-1 text-lg font-normal">{{ year }}</span>
        </div>
        <div>
          <button
            type="button"
            :disabled="futureOnly && today.getFullYear() == year && today.getMonth() == month"
            class="transition-colors ease-in-out duration-200 inline-flex cursor-pointer p-1 rounded-full"
            :class="[futureOnly && today.getFullYear() == year && today.getMonth() == month ? 'opacity-50' : 'hover_bg-dtPrimary-50']"
            @click="previousClick"
          >
            <svg class="h-6 w-6 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            class="transition-colors ease-in-out duration-200 inline-flex cursor-pointer p-1 rounded-full hover_bg-dtPrimary-50"
            @click="nextClick"
          >
            <svg class="h-6 w-6 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-wrap mb-3 -mx-1">
        <div v-for="(day, index) in days" :key="index" style="width: 14.26%" class="px-1">
          <div class="font-medium text-center text-xs">{{ day }}</div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-1">
        <div
          v-for="(blankday, index) in blankdays"
          :key="'blank' + index"
          style="width: 14.28%"
          class="text-center border p-1 border-transparent text-sm"
        ></div>
        <div
          v-for="(date, dateIndex) in no_of_days"
          :key="dateIndex"
          style="width: 14.28%"
          class="px-1 mb-2"
        >
          <div
            @click="getDateValue(date)"
            class="cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition-colors ease-in-out duration-200"
            :class="[futureOnly && isPast(date) && !isToday(date) ? 'opacity-50' : '', isToday(date) && $store.state.theme.dt ? 'bg-dtBackground text-dtText' : isToday(date) && !$store.state.theme.dt ? 'bg-ltBackground text-ltText' : isPicked(date) ? 'bg-dtPrimary text-dtText' : isPast(date) && futureOnly ? '' : 'hover_bg-dtPrimary-50']"
          >{{ date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      today: new Date(),
      showDatepicker: false,
      datepickerValue: '',
      month: '',
      year: '',
      no_of_days: [],
      blankdays: [],
      days: [this.$t('date.shortDays.sunday'), this.$t('date.shortDays.monday'), this.$t('date.shortDays.tuesday'), this.$t('date.shortDays.wednesday'), this.$t('date.shortDays.thursday'), this.$t('date.shortDays.friday'), this.$t('date.shortDays.saturday')],      
      monthNames: [this.$t('date.months.january'), this.$t('date.months.february'), this.$t('date.months.march'), this.$t('date.months.april'), this.$t('date.months.may'), this.$t('date.months.june'), this.$t('date.months.july'), this.$t('date.months.august'), this.$t('date.months.september'), this.$t('date.months.october'), this.$t('date.months.november'), this.$t('date.months.december')]
    }
  },
  props: {
    closePicker: Function,
    datePicked: Function,
    value: Date,
    futureOnly: Boolean
  },
  methods: {
    initDate() {
      this.today = new Date()
      let cur = this.value == null || this.value == "" ? this.today : this.value;
      this.month = cur.getMonth();
      this.year = cur.getFullYear();
      this.date = cur.getDate()
      this.datepickerValue = new Date(this.year, this.month, cur.getDate()).toDateString();
      this.getNoOfDays()
    },
    isEqual(dt1, dt2) {
      return dt1.getFullYear() == dt2.getFullYear() && dt1.getMonth() == dt2.getMonth() && dt1.getDate() == dt2.getDate()
    },
    isToday(date) {
        const d = new Date(this.year, this.month, date);

        return this.isEqual(d, this.today)
    },
    isPicked(date) {
        const d = new Date(this.year, this.month, date);
        if (this.value) {
          return this.isEqual(d, this.value)
        }
        return false
    },
    isPast(date) {
        const d = new Date(this.year, this.month, date);
        return d.getTime() < this.today.getTime()
    },
    getDateValue(date) {
        if (this.futureOnly && this.isPast(date)) {
          return
        }
        let selectedDate = new Date(this.year, this.month, date);
        this.datePicked(selectedDate)
    },
    getNoOfDays() {
        let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(this.year, this.month).getDay();
        let blankdaysArray = [];
        for ( var i=1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        let daysArray = [];
        for ( var i=1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        this.blankdays = blankdaysArray;
        this.no_of_days = daysArray;
    },
    nextClick() {
      if (this.month == 11) {
        this.month = 0
        this.year++
      } else {
        this.month++
      }
      this.getNoOfDays()
    },
    previousClick() {
      if (this.month == 0) {
        this.month = 11
        this.year--
      } else {
        this.month--
      }
      this.getNoOfDays()
    }
  },
  mounted() {
    this.initDate()
  }
}
</script>
