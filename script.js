async function loadData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  getChartData(data);
}

function getChartData(chartInfo) {
  const chartLabels = chartInfo.map((dataItem) => dataItem.day);
  const chartValues = chartInfo.map((dataItem) => dataItem.amount);
  let maxChartVal = Math.max(...chartValues);
  const chartBgColors = chartValues.map((value) =>
    value === maxChartVal ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)"
  );
  const chartBgHoverColors = chartValues.map((value) =>
    value === maxChartVal ? "hsl(185, 34%, 76%)" : "hsl(10, 78%, 79%)"
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "",
        backgroundColor: chartBgColors,
        hoverBackgroundColor: chartBgHoverColors,
        borderColor: "rgb(0,128,0)",
        borderRadius: 4,
        data: chartValues,
      },
    ],
  };

  const config = {
    type: "bar",
    data: chartData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    },
  };

  const chart = new Chart(
    document.getElementById("expense-chart").getContext("2d"),
    config
  );
}

loadData();
