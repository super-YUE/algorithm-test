"use strict";
exports.__esModule = true;
var MyArray = /** @class */ (function () {
    function MyArray(capacity) {
        if (capacity === void 0) { capacity = 10; }
        this.size = 0;
        this.data = new Array(capacity);
    }
    MyArray.prototype.getCapacity = function () {
        return this.data.length;
    };
    MyArray.prototype.getSize = function () {
        return this.size;
    };
    MyArray.prototype.isEmpty = function () {
        return this.size === 0;
    };
    MyArray.prototype.push = function (index, e) {
        if (index < 0 || index > this.size) {
            throw new Error('Add failed, Required index >= 0 and index <= size');
        }
        if (this.size === this.data.length) {
            this.resize(2 * this.data.length);
        }
        for (var i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i];
        }
        this.data[index] = e;
        this.size++;
    };
    MyArray.prototype.resize = function (newCapacity) {
        var newData = new Array(newCapacity);
        for (var i = 0; i <= this.size; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
    };
    MyArray.prototype.addLast = function (e) {
        this.push(this.size, e);
    };
    MyArray.prototype.addFrist = function (e) {
        this.push(0, e);
    };
    MyArray.prototype.getLast = function () {
        return this.data[this.size - 1];
    };
    MyArray.prototype.getFrist = function () {
        return this.data[0];
    };
    MyArray.prototype.get = function (index) {
        if (index < 0 || index > this.size) {
            throw new Error('Get failed. Index is illegal.');
        }
        return this.data[index];
    };
    MyArray.prototype.set = function (index, e) {
        if (index < 0 || index > this.size) {
            throw new Error('Get failed. Index is illegal.');
        }
        this.data[index] = e;
    };
    MyArray.prototype.contains = function (e) {
        for (var i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return true;
            }
        }
        return false;
    };
    MyArray.prototype.find = function (e) {
        for (var i = 0; i < this.size; i++) {
            if (this.data[i] === e) {
                return i;
            }
        }
        return -1;
    };
    MyArray.prototype.remove = function (index) {
        if (index < 0 || index > this.size) {
            throw new Error('remove failed, Required index >= 0 and index <= size');
        }
        var e = this.data[index];
        for (var i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i];
        }
        this.size--;
        this.data[this.size] = undefined;
        if (this.size === this.data.length / 4 && this.data.length / 2 !== 0) {
            this.resize(this.data.length / 2);
        }
        return e;
    };
    MyArray.prototype.removeFirst = function () {
        return this.remove(0);
    };
    MyArray.prototype.removeLast = function () {
        return this.remove(this.size - 1);
    };
    MyArray.prototype.print = function () {
        var str = "";
        str += "Array: size = " + this.size + ", capacity = " + this.data.length + "\n";
        str += '[';
        for (var i = 0; i < this.size; i++) {
            str += this.data[i];
            if (i !== this.size - 1) {
                str += ', ';
            }
        }
        str += ']';
        console.log(str);
    };
    return MyArray;
}());
var arr = new MyArray(10);
arr.addFrist('123');
arr.addFrist('123');
arr.print();
exports["default"] = MyArray;
