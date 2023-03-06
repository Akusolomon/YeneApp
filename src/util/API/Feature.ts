export class APIFeatures {
  constructor(public query, public queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    console.log(this.queryStr);
    if (this.queryStr.search) return this;
    const queryObj = { ...this.queryStr };
    const excludeFiles = ['page', 'sort', 'limit', 'fields'];
    excludeFiles.forEach(el => delete queryObj[el]);

    const querySt = JSON.stringify(queryObj);
    const updatequery = querySt.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(updatequery));

    return this;
  }
  search() {
    if (this.queryStr.search) {
      this.query = this.query.find({
        $or: [
          {
            title: new RegExp(this.queryStr.search, 'i'),
          },
          {
            venue: new RegExp(this.queryStr.search, 'i'),
          },
          {
            firstName: new RegExp(this.queryStr.search, 'i'),
          },
          {
            lastName: new RegExp(this.queryStr.search, 'i'),
          },
          {
            userName: new RegExp(this.queryStr.search, 'i'),
          },
        ],
      });
    }
    return this;
  }
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
