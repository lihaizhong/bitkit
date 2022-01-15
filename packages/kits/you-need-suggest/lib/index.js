import compare from './levenshteinDistance';
var YouNeedSuggest = /** @class */ (function () {
    function YouNeedSuggest(list, options) {
        this.options = {
            // 进行匹配的字段
            keyNameList: ['value'],
            // 是否过滤相似度为0的数据
            filterNoMatch: true,
            // 是否区分大小写
            caseSensitive: false,
            // 最小相似度
            minSimilarity: 0,
            // 计算算法
            compare: compare({
                // 最大的匹配词长度权重
                continuous: 40,
                // 匹配词总个数权重
                count: 20,
                // 首个匹配字符的位置权重
                position: 5,
                // 最短编辑路径权重
                distance: 35,
            }),
        };
        this.list = list;
        this.options = Object.assign(this.options, options);
        this.keyNameList = this.parseKeyNameList(this.options.keyNameList);
    }
    YouNeedSuggest.prototype.get = function (value) {
        var result = [];
        value = this.parseValue(value);
        for (var i = 0; i < this.list.length; i++) {
            var match = this.list[i];
            var similarity = this.getMaxSimilarity(value, match);
            if (similarity >= this.options.minSimilarity) {
                result.push({ data: match, similarity: similarity });
            }
        }
        return result.sort(function (a, b) { return b.similarity - a.similarity; });
    };
    YouNeedSuggest.prototype.parseValue = function (value) {
        var caseSensitive = this.options.caseSensitive;
        if (typeof value !== 'string') {
            return '';
        }
        if (caseSensitive) {
            value = value.toUpperCase();
        }
        return value;
    };
    YouNeedSuggest.prototype.parseKeyNameList = function (keyNameList) {
        if (typeof keyNameList === 'string') {
            return keyNameList.split(',');
        }
        else if (keyNameList instanceof Array) {
            return keyNameList;
        }
        return ['value'];
    };
    YouNeedSuggest.prototype.getMaxSimilarity = function (value, match) {
        var _this = this;
        if (typeof match === 'string') {
            return this.options.compare(this.parseValue(match), value);
        }
        return this.keyNameList.reduce(function (lastSimilarity, key) {
            var source = _this.parseValue(match[key]);
            var currentSimilarity = _this.options.compare(source, value);
            return Math.max(lastSimilarity, currentSimilarity);
        }, -Infinity);
    };
    return YouNeedSuggest;
}());
export default YouNeedSuggest;
//# sourceMappingURL=index.js.map