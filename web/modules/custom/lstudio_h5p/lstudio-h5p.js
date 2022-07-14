H5P.externalDispatcher.on('xAPI', function (event) {
  
  let h5pObject = {};

  window.addEventListener('DOMContentLoaded', () => {  
    h5pObject.maxScore = H5P.instances[0].getMaxScore();
    parent.postMessage(JSON.stringify(h5pObject),"*")
  });
  

  parent.postMessage(JSON.stringify(event.data.statement),"*")
  
});


console.log(H5P.isFramed);