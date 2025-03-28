

$("#search").$input(() => {
  console.log($("#search").value)
  $sets("search", $("#search").value);
});

// Usage examples:
$window(() => {
  console.log("Entire page, including images and resources, is fully loaded");
});

$window(console.log("Entire page, including images and resources, is fully loaded"));
