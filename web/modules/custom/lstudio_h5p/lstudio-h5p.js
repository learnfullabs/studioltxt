H5P.externalDispatcher.on('xAPI', function (event) {
  parent.postMessage(JSON.stringify(event.data.statement),"*")
  console.log(event.data.statement);
});

console.log(H5P.isFramed);