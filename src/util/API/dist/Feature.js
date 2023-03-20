"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.APIFeatures = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        this.query = query;
        this.queryStr = queryStr;
    }
    APIFeatures.prototype.filter = function () {
        console.log(this.queryStr);
        if (this.queryStr.search)
            return this;
        var queryObj = __assign({}, this.queryStr);
        var excludeFiles = ['page', 'sort', 'limit', 'fields'];
        excludeFiles.forEach(function (el) { return delete queryObj[el]; });
        var querySt = JSON.stringify(queryObj);
        var updatequery = querySt.replace(/\b(gte|gt|lte|lt)\b/g, function (match) { return "$" + match; });
        this.query = this.query.find(JSON.parse(updatequery));
        return this;
    };
    APIFeatures.prototype.search = function () {
        if (this.queryStr.search) {
            this.query = this.query.find({
                $or: [
                    {
                        title: new RegExp(this.queryStr.search, 'i')
                    },
                    {
                        venue: new RegExp(this.queryStr.search, 'i')
                    },
                    {
                        firstName: new RegExp(this.queryStr.search, 'i')
                    },
                    {
                        lastName: new RegExp(this.queryStr.search, 'i')
                    },
                    {
                        userName: new RegExp(this.queryStr.search, 'i')
                    },
                ]
            });
        }
        return this;
    };
    APIFeatures.prototype.sort = function (data) {
        // if (data) {
        //   const shuffledArray = data.sort((a, b) => 0.5 - Math.random());
        //   console.log(shuffledArray);
        //   const sorted = this.query.sort({ type: shuffledArray[0] });
        // }
        if (this.queryStr.sort) {
            var sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query.sort('-createdAt');
        }
        return this;
    };
    APIFeatures.prototype.limitFields = function () {
        if (this.queryStr.fields) {
            var fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    };
    APIFeatures.prototype.paginate = function () {
        var page = this.queryStr.page * 1 || 1;
        var limit = this.queryStr.limit * 1 || 100;
        var skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    };
    return APIFeatures;
}());
exports.APIFeatures = APIFeatures;
