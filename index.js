'use strict'

const wrapper = document.getElementById('content');


function fetchData() {
  fetch(`https://dummy.restapiexample.com/api/v1/employees`)
      .then(data => data.json())
      .then(jsonData => populate(jsonData.data))
      .catch(e => {
          wrapper.innerText = "Error";
          
      });
};

document.addEventListener('DOMContentLoaded', fetchData, false);

function dom(tag, text) {
    let r = document.createElement(tag);
    if (text) r.innerText = text;
    return r;
};

function append(parent, child) { 
  parent.appendChild(child); 
  return parent; 
};

function populate(json) {
    if (json.length === 0) return;
    let keys = Object.keys(json[0]);
    let table = dom('table');
    //header
    append(table,
      keys.slice(0,-1).map(k => dom('th', k)).reduce(append, dom('tr'))
    );
    //values
    const makeRow = (acc, row) =>
        append(acc,
            keys.slice(0,-1).map(k => dom('td', row[k])).reduce(append, dom('tr'))
        );
    json.reduce(makeRow, table);
    wrapper.appendChild(table);
};