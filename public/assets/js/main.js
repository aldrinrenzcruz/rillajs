

$("#search").$input(() => {
  console.log($("#search").value)
  $sets("search", $("#search").value);
});

document.addEventListener('DOMContentLoaded', function () {
  $("#search").value = $gets("search");
});