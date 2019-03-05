
function getAListEl (ind) {
    if (ind > this.arr.length - 1) {
        return void 0;
    }
    return this.arr[ind];
}

function getLListEl (ind) {
    if (ind > this.length-1) {
        return void 0;
    }
    let current = this.root;
    for (let i = 0; i < ind; i++) {
        current = current.next;
    }
    return current.val;
}


function testCollections(name, constr, getEl) {

    describe(name, function () {

        const arr = new constr();

        it('should have several specific methods and length property', function () {
            assert.isFunction(arr.push);
            assert.isFunction(arr.pop);
            assert.isFunction(arr.shift);
            assert.isFunction(arr.isArray);
            assert.isFunction(arr.some);
            assert.isFunction(arr.every);
            assert.isFunction(arr.remove);
            assert.isFunction(arr.splice);
            assert.isNumber(arr.length);
        });
    });

    describe(name, function () {

        function testPushUnshift(name, testData) {
            describe(name, function () {
                testData.forEach(function (data) {
                    const arr = new constr;
                    const {init, els, exp, expEls} = data;
                    arr.push.apply(arr, init);//initially populate the collection
                    const act = arr[name].apply(arr, els);

                    it(`should return correct array length = ${exp}`, function () {
                        assert.strictEqual(act, exp, `actual returned length = ${act}, init data = ${init}`);
                    });

                    it(`should set correct array length = ${exp}`, function () {
                        assert.strictEqual(arr.length, exp, `actual collection length = ${arr.length}`);//проверка длины массива
                    });

                    it(`should contain expected data: ${expEls}`, function () {
                        const actEls = [];
                        for (let i = 0; i < arr.length; i++) {
                            actEls.push(getEl.call(arr, i));
                        }
                        assert.deepEqual(actEls, expEls, `actual elements = ${actEls}`);
                    })
                });
            });
        }

        testPushUnshift('push', [
            {init: [], els: [0], exp: 1, expEls: [0]},
            {init: [], els: [1], exp: 1, expEls: [1]},
            {init: [], els: [5], exp: 1, expEls: [5]},
            {init: [], els: [5, 10], exp: 2, expEls: [5, 10]},

            {init: [0], els: [0], exp: 2, expEls: [0, 0]},
            {init: [0], els: [6], exp: 2, expEls: [0, 6]},
            {init: [0], els: [6, 100], exp: 3, expEls: [0, 6, 100]},
            {init: [0], els: [1], exp: 2, expEls: [0, 1]},

            {init: [0, 6], els: [0], exp: 3, expEls: [0, 6, 0]},
            {init: [0, 6], els: [1], exp: 3, expEls: [0, 6, 1]},
            {init: [0, 6], els: [5, 10], exp: 4, expEls: [0, 6, 5, 10]},

            {init: [6, 0], els: [], exp: 2, expEls: [6, 0]},
            {init: [6, 0], els: [1], exp: 3, expEls: [6, 0, 1]},
            {init: [1, 1, 1], els: [7, 8], exp: 5, expEls: [1, 1, 1, 7, 8]},
            {init: [1, 1, 1], els: [0], exp: 4, expEls: [1, 1, 1, 0]},
            {init: [1, 1, 1], els: [6, 9], exp: 5, expEls: [1, 1, 1, 6, 9]},
        ]);
        testPushUnshift('unshift', [
            {init: [], els: [0], exp: 1, expEls: [0]},
            {init: [], els: [-1], exp: 1, expEls: [-1]},
            {init: [], els: [6], exp: 1, expEls: [6]},
            {init: [], els: [6, 5], exp: 2, expEls: [6, 5]},
            {init: [0], els: [6, 5], exp: 3, expEls: [6, 5, 0]},
            {init: [5], els: [100], exp: 2, expEls: [100, 5]},
            {init: [5], els: [100, 4], exp: 3, expEls: [100, 4, 5]},
            {init: [4, 6], els: [7, 8], exp: 4, expEls: [7, 8, 4, 6]},
            {init: [0, 50, 9], els: [6, 2], exp: 5, expEls: [6, 2, 0, 50, 9]}
        ]);

        function testPopShift(name, testData) {
            describe(name, function () {
                testData.forEach(function (data) {
                    const {init, expReturn, expEls, expLen} = data;
                    const arr = new constr;
                    arr.push.apply(arr, init);
                    const actReturn = arr[name]();

                    it(`should return ${expReturn}`, function () {
                        assert.strictEqual(actReturn, expReturn);
                    });

                    it(`should contain elements ${expEls}`, function () {
                        const actEls = [];
                        for (let i = 0; i < arr.length; i++) {
                            actEls.push(getEl.call(arr, i));
                        }
                        assert.deepEqual(actEls, expEls);
                    });

                    it(`should set length to ${expLen}`, function () {
                        const actLen = arr.length;
                        assert.strictEqual(actLen, expLen)
                    })
                })

            });
        }

        testPopShift('pop', [
            {init: [0, 1, 2], expReturn: 2, expEls: [0, 1], expLen: 2},
            {init: [0], expReturn: 0, expEls: [], expLen: 0},
            {init: [1], expReturn: 1, expEls: [], expLen: 0},
            {init: [2, 5], expReturn: 5, expEls: [2], expLen: 1},
            {init: [2, 5, 0], expReturn: 0, expEls: [2, 5], expLen: 2},
            {init: [100, 700, 4, 7, 21], expReturn: 21, expEls: [100, 700, 4, 7], expLen: 4},
            {init: [], expReturn: void 0, expEls: [], expLen: 0}
        ]);
        testPopShift('shift', [
            {init: [0, 1, 2], expReturn: 0, expEls: [1, 2], expLen: 2},
            {init: [0], expReturn: 0, expEls: [], expLen: 0},
            {init: [1], expReturn: 1, expEls: [], expLen: 0},
            {init: [2, 5], expReturn: 2, expEls: [5], expLen: 1},
            {init: [2, 5, 0], expReturn: 2, expEls: [5, 0], expLen: 2},
            {init: [100, 700, 4, 7, 21], expReturn: 100, expEls: [700, 4, 7, 21], expLen: 4},
            {init: [], expReturn: void 0, expEls: [], expLen: 0}
        ]);

        describe('isArray', function () {
            it('should tell if the object is array', function () {
                const obj = Object.create(Array.prototype);
                const arr = new constr;
                assert.isTrue(arr.isArray.call(obj));
            });

            it('should tell if the object is array', function () {
                const arr = new constr;
                assert.isFalse(arr.isArray())
            })
        });

        describe('some', function () {
            //given
            const func = function (a) {
                return a < 0;
            };
            const testData = [
                {arr: [0, 1, 2], exp: false},
                {arr: [6, -1, 5], exp: true},
                {arr: [-1, 5], exp: true},
                {arr: [5, 6, 0], exp: false},
                {arr: [-5, -19, -9], exp: true}
            ];
            testData.forEach(function (data) {
                const {arr, exp} = data;
                const obj = new constr;
                obj.push.apply(obj, arr);

                it(`should return true when less than zero values are present and false when greater or equals zero`, function () {
                    //when
                    const act = obj.some(func);
                    //then
                    assert.strictEqual(act, exp, `returned: ${act}, data: ${arr}`);
                })
            })
        });

        describe('every', function () {
            const testData = [
                {init: [1, false, void 0], retVal: false, iterated: [1]},
                {init: [], retVal: false, iterated: []},
                {init: [''], retVal: true, iterated: []},
                {init: ['5', 'he', 8], retVal: true, iterated: ['5']},
                {init: ['', '22', '0'], retVal: true, iterated: ['', '22', '0']}
            ];
            testData.forEach(function (data) {
                const {init, retVal, iterated} = data;
                it(`should return ${retVal} when data = ${init} and iterate these values: ${iterated}`, function () {
                    const arr = new constr;
                    arr.push.apply(arr, init);
                    const res = [];
                    arr.every(function (val) {
                        res.push(val);
                        return (typeof val === 'string');
                    })
                })
            })
        });

        describe('remove', function () {

            it(`should delete single element`, function () {
                //given
                const arr = new constr;
                arr.push(10);
                //when
                const removed = arr.remove(0);
                //then
                assert.strictEqual(removed, 10);
                assert.strictEqual(arr.length, 0);
                assert.strictEqual(getEl.call(arr, 0), void 0)
            });

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5);
                //when
                const removed = arr.remove(0);
                //then
                assert.strictEqual(removed, 10);
                assert.strictEqual(arr.length, 1);
                assert.strictEqual(getEl.call(arr, 0), 5);
                assert.strictEqual(getEl.call(arr, 1), undefined)
            });

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5);
                //when
                const removed = arr.remove(1);
                //then
                assert.strictEqual(removed, 5);
                assert.strictEqual(arr.length, 1);
                assert.strictEqual(getEl.call(arr, 0), 10);
                assert.isUndefined(getEl.call(arr, 1));
            });

            it(`should delete one element`, function () {
                //given
                const arr = new constr;
                arr.push(10, 5, 40);
                //when
                const removed = arr.remove(1);
                //then
                assert.strictEqual(removed, 5);
                assert.strictEqual(arr.length, 2);
                assert.strictEqual(getEl.call(arr, 0), 10);
                assert.strictEqual(getEl.call(arr, 1), 40);
                assert.isUndefined(getEl.call(arr, 2))
            })
        });

        describe('splice', function () {
            const testData = [
                {init: [], args: [0, 1], expReturn: [], expLen: 0, expContent: []},
                {init: [], args: [0, 0, 7, 9], expReturn: [], expLen: 2, expContent: [7, 9]},
                {init: [7], args: [0, 1], expReturn: [7], expLen: 0, expContent: []},
                {init: [5], args: [0, 1, 4], expReturn: [5], expLen: 1, expContent: [4]},
                {init: [5], args: [0], expReturn: [5], expLen: 0, expContent: []},
                {init: [1, 2, 5, 7, 10], args: [2, 2], expReturn: [5, 7], expLen: 3, expContent: [1, 2, 10]},
                {init: [0, 5, 7, 9], args: [1, 2, 3], expReturn: [5, 7], expLen: 3, expContent: [0, 3, 9]},
                {init: [1, 2, 3], args: [1,10, 100, 200], expReturn: [2, 3], expLen: 3, expContent: [1, 100, 200]},
                {init: [1, 2, 3, 4, 5], args: [3, 1, 6, 7, 7], expReturn: [4], expLen: 7, expContent: [1, 2, 3, 6, 7, 7, 5]},
                // {init: [], args: [], expReturn: [], expLen: , expContent: []},
                // {init: [], args: [], expReturn: [], expLen: , expContent: []},
                // {init: [], args: [], expReturn: [], expLen: , expContent: []},
            ];
            testData.forEach(function (data) {
                const {init, args, expReturn, expLen, expContent} = data;

                it(`should delete elements or add new ones. given data: ${init}, args: ${args}`, function () {
                    //given
                    const arr = new constr;
                    arr.push.apply(arr, init);
                    //when
                    const returned = arr.splice.apply(arr,args);
                    //then
                    assert.strictEqual(arr.length, expLen, `expected length ${expLen}, actual ${arr.length}`);
                    assert.deepEqual(returned, expReturn, `expected to return ${expReturn}, returned ${returned}`);
                    const content = [];
                    for (let i = 0; i < arr.length; i++) {
                        content.push(getEl.call(arr, i));
                    }
                    assert.deepEqual(content, expContent, `resulting data was expected to be ${content}, actual: ${expContent}`);
                })
            })
        });

    });

}
testCollections('AList', AList, getAListEl);
testCollections('LList', LList, getLListEl);

describe('LList.splice', function () {
    const testData = [
        {init: [], args: [0, 1], expReturn: [], expLen: 0, expContent: []},
        {init: [], args: [0, 0, 7, 9], expReturn: [], expLen: 2, expContent: [7, 9]},
        {init: [7], args: [0, 1], expReturn: [7], expLen: 0, expContent: []},
        {init: [5], args: [0, 1, 4], expReturn: [5], expLen: 1, expContent: [4]},
        {init: [5], args: [0], expReturn: [5], expLen: 0, expContent: []},
        {init: [1, 2, 5, 7, 10], args: [2, 2], expReturn: [5, 7], expLen: 3, expContent: [1, 2, 10]},
        {init: [0, 5, 7, 9], args: [1, 2, 3], expReturn: [5, 7], expLen: 3, expContent: [0, 3, 9]},
        {init: [1, 2, 3], args: [1,10, 100, 200], expReturn: [2, 3], expLen: 3, expContent: [1, 100, 200]},
        {init: [1, 2, 3, 4, 5], args: [3, 1, 6, 7, 7], expReturn: [4], expLen: 7, expContent: [1, 2, 3, 6, 7, 7, 5]},
        // {init: [], args: [], expReturn: [], expLen: , expContent: []},
        // {init: [], args: [], expReturn: [], expLen: , expContent: []},
        // {init: [], args: [], expReturn: [], expLen: , expContent: []},
    ];
    testData.forEach(function (data) {
        const {init, args, expReturn, expLen, expContent} = data;

        it(`should delete elements or add new ones. given data: ${init}, args: ${args}`, function () {
            //given
            const arr = new LList;
            arr.push.apply(arr, init);

            const expReturnLList = new LList;
            expReturnLList.push.apply(expReturnLList, expReturn);

            const expContentLList = new LList;
            expContentLList.push.apply(expContentLList, expContent);

            //when
            const returned = arr.splice.apply(arr,args);
            //then
            assert.strictEqual(arr.length, expLen, `expected length ${expLen}, actual ${arr.length}`);
            assert.deepEqual(returned, expReturnLList, `expected to return ${expReturn}, returned ${returned}`);
            const content = [];
            for (let i = 0; i < arr.length; i++) {
                content.push(getEl.call(arr, i));
            }
            assert.deepEqual(arr, expContentLList, `resulting data was expected to be ${content}, actual: ${expContent}`);
        })
    })
});
