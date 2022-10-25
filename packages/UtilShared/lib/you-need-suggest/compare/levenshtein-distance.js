(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.compare = void 0;
    class DistanceCalculator {
        constructor(continuous, count, position, distance) {
            // 最大的匹配词长度
            this.continuous = continuous;
            // 匹配词总个数
            this.count = count;
            // 首个匹配字符的位置
            this.position = position;
            // 最短编辑路径
            this.distance = distance;
        }
        setContinuous(continuous) {
            if (this.continuous < continuous) {
                this.continuous = continuous;
            }
        }
        getContinuous() {
            return this.continuous;
        }
        setCount(count) {
            this.count = count;
        }
        getCount() {
            return this.count;
        }
        setPosition(position) {
            this.position = position;
        }
        getPosition() {
            return this.position;
        }
        setDistance(distance) {
            this.distance = distance;
        }
        getDistance() {
            return this.distance;
        }
        calc(sourceLength, targetLength, weight) {
            const { continuous, count, position, distance } = this;
            return (1 - distance / Math.max(sourceLength, targetLength)) * weight.distance +
                (1 - position / targetLength) * weight.position +
                (continuous / targetLength) * weight.continuous +
                (count / targetLength) * weight.count;
        }
    }
    function levenshteinDistance(distanceCalculator, inputValue, comparedValue) {
        const sourceLength = inputValue.length;
        const targetLength = comparedValue.length;
        const space = new Array(targetLength);
        // const distanceCalculator: DistanceCalculator = new DistanceCalculator(0, 0, targetLength, -1)
        // 过滤目标或者比较值为空字符串的情况
        if (sourceLength === 0) {
            distanceCalculator.setDistance(targetLength);
        }
        else if (targetLength === 0) {
            distanceCalculator.setDistance(sourceLength);
        }
        else {
            // 保存所有匹配到的字符的index
            const matchPositionList = [];
            // 连续字符长度
            let continuous = 0;
            // 0 为不需要做增删改的操作，1 为需要做增删改操作
            let modifyNum = 0;
            for (let row = 0; row < sourceLength; row++) {
                const sourceChar = inputValue[row];
                let temp = row;
                let matchIndex = -1;
                for (let col = 0; col < targetLength; col++) {
                    const targetChar = comparedValue[col];
                    // 前一个编辑距离
                    const prevDistance = col === 0 ? row + 1 : space[col - 1];
                    // 上一个编辑距离
                    const topDistance = space[col] === undefined ? col + 1 : space[col];
                    if (sourceChar === targetChar) {
                        modifyNum = 0;
                        // 解决重复匹配的问题
                        if (matchIndex === -1 && !matchPositionList.includes(col)) {
                            matchIndex = col;
                        }
                        // 设置首位匹配到的字符
                        if (distanceCalculator.getPosition() === targetLength) {
                            distanceCalculator.setPosition(col);
                        }
                    }
                    else {
                        modifyNum = 1;
                    }
                    // 获取增，删，改和不变得到的最小值
                    const min = Math.min(prevDistance + 1, topDistance + 1, temp + modifyNum);
                    // 保存左上角的数据，计算最小值时需要用到
                    temp = topDistance;
                    space[col] = min;
                }
                // 如果匹配到了结果
                if (matchIndex !== -1) {
                    if (row > 0 && matchIndex > 0 && inputValue[row - 1] === comparedValue[matchIndex - 1]) {
                        if (continuous === 0) {
                            continuous = 2;
                        }
                        else {
                            continuous++;
                        }
                    }
                    else if (continuous === 0) {
                        continuous++;
                    }
                    else {
                        // 设置最长的连续字符
                        distanceCalculator.setContinuous(continuous);
                        continuous = 1;
                    }
                    matchPositionList.push(matchIndex);
                }
                else {
                    // 设置最长的连续字符
                    distanceCalculator.setContinuous(continuous);
                    continuous = 0;
                }
            }
            // 设置最长的连续字符
            distanceCalculator.setContinuous(continuous);
            // 设置匹配到的数量
            distanceCalculator.setCount(matchPositionList.length);
            // 设置编辑距离
            distanceCalculator.setDistance(space[targetLength - 1]);
        }
    }
    const compare = (weight) => (inputValue, comparedValue) => {
        const distanceCalculator = new DistanceCalculator(0, 0, comparedValue.length, -1);
        // 通过编辑距离算法计算相关数据
        levenshteinDistance(distanceCalculator, inputValue, comparedValue);
        // 根据权重关系计算获取最终结果
        return distanceCalculator.calc(inputValue.length, comparedValue.length, weight);
    };
    exports.compare = compare;
});
