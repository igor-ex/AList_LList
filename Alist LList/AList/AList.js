
var AList;

;(function () {
    AList = function () {
        this.arr = [];
        this.length = 0;
    };

    const removeMultiple = function (ind, num) {//num - кол-во удаляемых элементов
        const len = this.arr.length;
        num = (typeof num) !== 'undefined' ? num : 1;
        if (!len) {
            return [];
        }
        if (ind > this.length - 1) {
            return void 0;
        }

        //get values of elements to remove
        const removed = [];
        const stop = num > len - ind ? len : ind + num;
        for (let i = ind; i < stop; i++) {
            removed.push(this.arr[i]);
        }
        //shift elements
        const removedNum = stop - ind;

        for (let i = ind + removedNum; i < len; i++) {
            this.arr[i - removedNum] = this.arr[i];
        }

        this.arr.length = this.arr.length - removedNum;
        this.length = this.length - removedNum;
        return removed;
    };


    AList.prototype.push = function () {
        if (!arguments.length) {
            return this.arr.length;
        }
        for (var i = 0; i < arguments.length; i++) {
            this.arr[this.arr.length] = arguments[i];
            this.length++;
        }
        return this.arr.length;
    };

    AList.prototype.pop = function () {
        if (!this.arr.length) {
            return;
        }
        var val = this.arr[this.arr.length - 1];
        this.arr.length--;
        this.length--;
        return val;
    };

    AList.prototype.shift = function () {
        if (!this.arr.length)
            return;
        var val = this.arr[0];
        for (var i = 1; i < this.arr.length; i++) {
            this.arr[i - 1] = this.arr[i];
        }
        this.arr.length--;
        this.length--;
        return val;
    };

    AList.prototype.unshift = function () {
        const len = arguments.length;
        if (!len) {
            return this.arr.length;
        }
        for (let i = this.arr.length - 1; i >= 0; i--) {
            this.arr[i + len] = this.arr[i];
        }
        for (let i = 0; i < len; i++) {
            this.arr[i] = arguments[i];
            this.length++;
        }
        return this.arr.length;
    };

    AList.prototype.isArray = function () {
        let cur = this;
        while (cur = cur.__proto__) {
            if (cur === Array.prototype) {
                return true;
            }
        }
        return false;
    };

    AList.prototype.some = function (func) {
        for (let i = 0, l = this.arr.length; i < l; i++) {
            if (func(this.arr[i]) === true) {
                return true;
            }
        }
        return false;
    };

    AList.prototype.every = function (func) {
        for (let i = 0, l = this.arr.length; i < l; i++) {
            if (func(this.arr[i]) === false) {
                return false;
            }
        }
        return true;
    };

    AList.prototype.remove = function (ind) {
        if (ind > this.length - 1) {
            return void 0;
        }
        const val = this.arr[ind];
        for (let l = this.arr.length, i = ind; i < l - 1; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.length--;
        this.length--;
        return val;
    };

    AList.prototype.splice = function () {
        const argLen = arguments.length;
        if (!argLen) {
            return [];
        }
        const rem = removeMultiple.bind(this);
        if (argLen === 1) {//если передали один аргумент (индекс) значит надо удалить один элемент
            return rem(arguments[0]);
        }
        if (argLen === 2) {//передано два аргумента, значит, возможно, нужно удалить более одного элемента
            return rem(arguments[0], arguments[1]);
        } else {
            const removed = rem(arguments[0], arguments[1]);
            const added = arguments.length - 2;
            const ind = arguments[0];

            //освободить пространство для новых элементов
            for (let i = this.arr.length - 1; i >= ind; i--) {
                this.arr[i + added] = this.arr[i];
            }

            //добавить новые элементы
            for (let i = 0; i < added; i++) {
                this.arr[ind + i] = arguments[i + 2];
                this.length++;
            }
            return removed;
        }
    }
})();
