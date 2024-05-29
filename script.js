function renderTable(data, cols) {
  const rows = data
    .map((row) => {
      const tableRow = cols.reduce((acc, col) => {
        acc += `<td>${row[col]}</td>`;
        return acc;
      }, "");

      return `<tr>${tableRow}</tr>`;
    })
    .join("");
  document.getElementById("tablebody").innerHTML = rows;
}

function renderColumns(data) {
  const cols = `<tr> 
  ${Object.keys(data[0] || {})
    .map((col) => {
      return `<th>${col}</th>`;
    })
    .join("")} 
  </tr>`;
  document.getElementById("tablehead").innerHTML = cols;
  return Object.keys(data[0]);
}

function reorder(event) {
  event?.preventDefault();

  data = JSON.parse(localStorage.getItem("data") || "[]") || data;
  const {
    id: { value: idOrder } = {},
    name: { value: nameOrder } = {},
    address: { value: addressOrder } = {},
    age: { value: ageOrder } = {},
  } = event?.target || {};

  let orderMap = {
    id: idOrder || 1,
    name: nameOrder || 2,
    address: addressOrder || 3,
    age: ageOrder || 4,
  };

  debugger;
  if (!event && localStorage.getItem("order")) {
    orderMap = JSON.parse(localStorage.getItem("order") || "") || orderMap;
  }

  data = data.map((row) => {
    const reorderedKeys = [];
    Object.entries(row).forEach(([key, value]) => {
      reorderedKeys[orderMap[key] - 1] = [key, value];
    });

    return Object.fromEntries(reorderedKeys);
  });

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("order", JSON.stringify(orderMap));
  const cols = renderColumns(data);
  renderTable(data, cols);
}

(function () {
  reorder();
})();
