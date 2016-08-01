module.exports = function (factory) {
  var randomValue = Math.ceil(Math.random() * 10000);

  factory.define('user')
    .attr('name', 'foo')
    .attr('robotId', 'XXX')
    .attr('email', 'example' + randomValue + '@email.com')
    .attr('password', 'password');
};