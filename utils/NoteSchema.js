const Yup = require('yup');

module.exports = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Title is too long!')
    .required('Title cannot be empty!'),
  body: Yup.string()
    .max(1000, 'body is too long!')
});