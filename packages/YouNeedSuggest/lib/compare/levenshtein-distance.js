"use strict";
exports.__esModule = true;
exports.compare = void 0;
var DistanceCalculator = /** @class */ (function () {
    function DistanceCalculator(continuous, count, position, distance) {
        // 最大的匹配词长度
        this.continuous = continuous;
        // 匹配词总个数
        this.count = count;
        // 首个匹配字符的位置
        this.position = position;
        // 最短编辑路径
        this.distance = distance;
    }
    DistanceCalculator.prototype.setContinuous = function (continuous) {
        if (this.continuous < continuous) {
            this.continuous = continuous;
        }
    };
    DistanceCalculator.prototype.getContinuous = function () {
        return this.continuous;
    };
    DistanceCalculator.prototype.setCount = function (count) {
        this.count = count;
    };
    DistanceCalculator.prototype.getCount = function () {
        return this.count;
    };
    DistanceCalculator.prototype.setPosition = function (position) {
        this.position = position;
    };
    DistanceCalculator.prototype.getPosition = function () {
        return this.position;
    };
    DistanceCalculator.prototype.setDistance = function (distance) {
        this.distance = distance;
    };
    DistanceCalculator.prototype.getDistance = function () {
        return this.distance;
    };
    DistanceCalculator.prototype.calc = function (sourceLength, targetLength, weight) {
        var _a = this, continuous = _a.continuous, count = _a.count, position = _a.position, distance = _a.distance;
        return ((1 - distance / Math.max(sourceLength, targetLength)) * weight.distance +
            (1 - position / targetLength) * weight.position +
            (continuous / targetLength) * weight.continuous +
            (count / targetLength) * weight.count);
    };
    return DistanceCalculator;
}());
function levenshteinDistance(distanceCalculator, inputValue, comparedValue) {
    var sourceLength = inputValue.length;
    var targetLength = comparedValue.length;
    var space = new Array(targetLength);
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
        var matchPositionList = [];
        // 连续字符长度
        var continuous = 0;
        // 0 为不需要做增删改的操作，1 为需要做增删改操作
        var modifyNum = 0;
        for (var row = 0; row < sourceLength; row++) {
            var sourceChar = inputValue[row];
            var temp = row;
            var matchIndex = -1;
            for (var col = 0; col < targetLength; col++) {
                var targetChar = comparedValue[col];
                // 前一个编辑距离
                var prevDistance = col === 0 ? row + 1 : space[col - 1];
                // 上一个编辑距离
                var topDistance = space[col] === undefined ? col + 1 : space[col];
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
                var min = Math.min(prevDistance + 1, topDistance + 1, temp + modifyNum);
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
var compare = function (weight) { return function (inputValue, comparedValue) {
    var distanceCalculator = new DistanceCalculator(0, 0, comparedValue.length, -1);
    // 通过编辑距离算法计算相关数据
    levenshteinDistance(distanceCalculator, inputValue, comparedValue);
    // 根据权重关系计算获取最终结果
    return distanceCalculator.calc(inputValue.length, comparedValue.length, weight);
}; };
exports.compare = compare;
//# sourceMappingURL=levenshtein-distance.js.map