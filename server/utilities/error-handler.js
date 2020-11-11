module.exports = {
  handleMongooseError: (err) => {
    const key = Object.keys(err.errors)[0];
    return err.errors[key].message;
  },
};
