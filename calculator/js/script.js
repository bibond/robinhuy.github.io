new Vue({
  el: "#calculator",
  data: {
    displayValue: "0",
    currentOperator: "",
    waitingForOperand: true,
    calculation: []
  },
  computed: {
    displayValueFormatted: function () {
      var value = this.displayValue.replace(/\+/g, '') || '0';
      var number = value.split(".");
      var integerPart = number[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var floatPart = number[1] || '';
      return floatPart === '' ? integerPart : integerPart + '.' + floatPart;
    }
  },
  methods: {
    inputDigit: function (digit) {
      if (this.waitingForOperand) {
        if (this.displayValue === "0") {
          // Begin the calculation, change 0 to "digit"
          this.displayValue = digit !== "." ? digit : "0.";
          this.calculation.push(this.displayValue);
        } else {
          // Add digit to current number, maximum digits is 9
          if (this.displayValue.length < 9) {
            if (digit === "." && this.displayValue.indexOf(".") !== -1) return;

            this.displayValue += digit;
            this.calculation[this.calculation.length - 1] += digit;
          }
        }
      } else {
        // Display new number
        this.displayValue = digit;
        this.waitingForOperand = true;

        // Add operator and digit to the calculation
        this.calculation.push(this.currentOperator);
        this.calculation.push(digit);
      }
    },
    inputOperator: function (operator) {
      if (operator === "-" || operator === "+") {
        console.log(this.calculation)
        this.displayValue = eval(this.calculation.join("")).toString();
      } else if (operator === "=") {
        // If current operator is "=", continue calculate the last calculation
        if (this.currentOperator === '=') {
          var length = this.calculation.length;
          this.displayValue = eval(
            this.displayValue +
            this.calculation[length - 2] +
            this.calculation[length - 1]
          ).toString();
        } else {
          this.displayValue = eval(this.calculation.join("")).toString();
        }
      }

      this.currentOperator = operator;
      this.waitingForOperand = false;

      var value = this.displayValue;

      // Round to 9 digits
      this.displayValue = parseFloat(value).toPrecision(9);
      if (value[value.length - 1] === '0') this.displayValue = parseFloat(value).toString();

      // Display "Error" instead of "Infinity"
      if (value === Infinity) this.displayValue = "Error";
    },
    clear: function () {
      // Reset current number
    },
    clearAll: function () {
      // Reset the calculation
      this.displayValue = "0";
      this.currentOperator = "";
      this.waitingForOperand = true;
      this.calculation = [];
    },
    changeSign: function () {
      if (this.displayValue.indexOf('-') === 0) {
        this.displayValue = this.displayValue.replace('-', '');
      } else {
        this.displayValue = '-' + this.displayValue;
      }
    },
    calculatePercent: function () {

    }
  }
});