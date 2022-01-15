var ResultWrapper = /** @class */ (function () {
    function ResultWrapper(continuous, count, position, distance) {
        // 最大的匹配词长度
        this.continuous = continuous;
        // 匹配词总个数
        this.count = count;
        // 首个匹配字符的位置
        this.position = position;
        // 最短编辑路径
        this.distance = distance;
    }
    ResultWrapper.prototype.get = function () {
        var _a = this, continuous = _a.continuous, count = _a.count, position = _a.position, distance = _a.distance;
        return { continuous: continuous, count: count, position: position, distance: distance };
    };
    ResultWrapper.prototype.setContinuous = function (continuous) {
        if (this.continuous < continuous) {
            this.continuous = continuous;
        }
    };
    ResultWrapper.prototype.getContinuous = function () {
        return this.continuous;
    };
    ResultWrapper.prototype.setCount = function (count) {
        this.count = count;
    };
    ResultWrapper.prototype.getCount = function () {
        return this.count;
    };
    ResultWrapper.prototype.setPosition = function (position) {
        this.position = position;
    };
    ResultWrapper.prototype.getPosition = function () {
        return this.position;
    };
    ResultWrapper.prototype.setDistance = function (distance) {
        this.distance = distance;
    };
    ResultWrapper.prototype.getDistance = function () {
        return this.distance;
    };
    return ResultWrapper;
}());
var Utility;
(function (Utility) {
    function levenshteinDistance(source, target) {
        var sourceLength = source.length;
        var targetLength = target.length;
        var space = new Array(targetLength);
        var result = new ResultWrapper(0, 0, targetLength, -1);
        // 过滤目标或者比较值为空字符串的情况
        if (sourceLength === 0) {
            result.setDistance(targetLength);
        }
        else if (targetLength === 0) {
            result.setDistance(sourceLength);
        }
        else {
            // 保存所有匹配到的字符的index
            var matchPositionList = [];
            // 连续字符长度
            var continuous = 0;
            // 0 为不需要做增删改的操作，1 为需要做增删改操作
            var modifyNum = 0;
            for (var i = 0; i < sourceLength; i++) {
                var sourceChar = source[i];
                var temp = i;
                var matchIndex = -1;
                for (var j = 0; j < targetLength; j++) {
                    var targetChar = target[j];
                    // 前一个编辑距离
                    var prevDistance = j === 0 ? i + 1 : space[j - 1];
                    // 上一个编辑距离
                    var topDistance = space[j] === undefined ? j + 1 : space[j];
                    if (sourceChar === targetChar) {
                        modifyNum = 0;
                        // 解决重复匹配的问题
                        if (matchIndex === -1 && !matchPositionList.includes(j)) {
                            matchIndex = j;
                        }
                        // 设置首位匹配到的字符
                        if (result.getPosition() === targetLength) {
                            result.setPosition(j);
                        }
                    }
                    else {
                        modifyNum = 1;
                    }
                    // 获取增，删，改和不变得到的最小值
                    var min = Math.min(prevDistance + 1, topDistance + 1, temp + modifyNum);
                    // 保存左上角的数据，计算最小值时需要用到
                    temp = topDistance;
                    space[j] = min;
                }
                // 如果匹配到了结果
                if (matchIndex !== -1) {
                    if (i > 0 && matchIndex > 0 && source[i - 1] === target[matchIndex - 1]) {
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
                        result.setContinuous(continuous);
                        continuous = 1;
                    }
                    matchPositionList.push(matchIndex);
                }
                else {
                    // 设置最长的连续字符
                    result.setContinuous(continuous);
                    continuous = 0;
                }
            }
            // 设置最长的连续字符
            result.setContinuous(continuous);
            // 设置匹配到的数量
            result.setCount(matchPositionList.length);
            // 设置编辑距离
            result.setDistance(space[targetLength - 1]);
        }
        return result.get();
    }
    Utility.levenshteinDistance = levenshteinDistance;
    function calc(sourceLength, targetLength, data, weight) {
        return (1 - data.distance / Math.max(sourceLength, targetLength)) * weight.distance +
            (1 - data.position / targetLength) * weight.position +
            (data.continuous / targetLength) * weight.continuous +
            (data.count / targetLength) * weight.count;
    }
    Utility.calc = calc;
})(Utility || (Utility = {}));
export default function compare(weight) {
    return function compare_inner(source, target) {
        var result = Utility.levenshteinDistance(source, target);
        return Utility.calc(source.length, target.length, result, weight);
    };
}
//# sourceMappingURL=levenshteinDistance.js.map