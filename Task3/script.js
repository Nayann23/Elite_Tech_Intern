function convertTemperature() {
  const temp = parseFloat(document.getElementById("temperature").value);
  const unit = document.getElementById("unit").value;
  let result;

  if (isNaN(temp)) {
      document.getElementById("result").innerText = "Please enter a valid number.";
      return;
  }

  if (unit === "celsius") {
      // Convert Celsius to Fahrenheit
      result = (temp * 9/5) + 32;
      document.getElementById("result").innerText = `${result.toFixed(2)} °F`;
  } else if (unit === "fahrenheit") {
      // Convert Fahrenheit to Celsius
      result = (temp - 32) * 5/9;
      document.getElementById("result").innerText = `${result.toFixed(2)} °C`;
  }
}
