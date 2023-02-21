Handlebars.registerHelper("default", function (a, b) {
  return a ? a : b;
});

Handlebars.registerHelper("ifEq", function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

async function loadPage(mydata = false) {
  console.log("loading page");

  if (!mydata) {
    let url = cfg.dataPath;
    const response = await fetch(url + "?i=" + Date.now(), {
      method: "get",
    });
    var data = await response.json();
  } else {
    var data = mydata;
  }

  // compile the template
  //var mytemplate = document.querySelector('#mytemplate').innerHTML
  var template = Handlebars.compile(mytemplate);
  // execute the compiled template and print the output to the console
  let compiled = template(data);
  document.querySelector("#main").innerHTML = compiled;
}

loadPage();

// this function get called by the CMS, and updates the data
function render(mydata) {
  loadPage(mydata);
}
