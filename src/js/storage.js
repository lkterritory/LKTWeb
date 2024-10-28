function server(param) {
  return $.ajax({
    url: baseUrl + "/onegate/server",
    method: "PATCH",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(param)
  });
}
