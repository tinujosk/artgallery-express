async function loadAll() {
  const user = localStorage.getItem('loggedInUserId');
  const response = await fetch(`/order/all/${user}`);
  const order = await response.json();

  const table = $('#order-table');
  const tableBody = $('#order-table-body')[0];
  if (tableBody) {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    if (order.length === 0) {
      table.innerHTML =
        'No data available as of now. Please add data using the below form';
    } else {
      order.forEach(order => {
        const newRow = tableBody.insertRow(0);
        newRow.insertCell(0).innerHTML = order.status;
        newRow.insertCell(1).innerHTML = order.product;
        newRow.insertCell(2).innerHTML = order.quantity;
        newRow.insertCell(3).innerHTML = new Date(
          order.createdAt
        ).toDateString();
        newRow.insertCell(4).innerHTML = new Date(
          order.updatedAt
        ).toDateString();
      });
    }
  }
}

$(document).ready(function () {
  const username = localStorage.getItem('loggedInUser');
  if (!username) {
    window.location.href = 'login.html';
  } else {
    $('.display-name').text(username);
    loadAll();
  }
});

$('.logout').click(() => {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('loggedInUserId');
  window.location.href = 'login.html';
});
