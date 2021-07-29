class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.perPage = 10;
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const fieldsToRemove = ['location', 'page'];
    fieldsToRemove.forEach((field) => delete queryCopy[field]);

    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination() {
    const currentPage = parseInt(this.queryStr.page, 10) || 1;
    const skip = this.perPage * (currentPage - 1);

    this.query = this.query.limit(this.perPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
