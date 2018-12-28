var moment = require('moment');

var date = moment();
date.add(100001, 'year');

console.log(date.format('MMMM Do YYYY h:mm:ss a'));