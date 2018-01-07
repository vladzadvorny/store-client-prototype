const _ = require('lodash');
const { dependencies } = require('./package.json');

const list = _.without(_.keys(dependencies), 'faker', 'react-stars');

console.log(list);
