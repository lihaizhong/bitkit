(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./compare/levenshtein-distance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.YouNeedSuggestion = exports.LevenshteinDistanceCompare = void 0;
    var levenshtein_distance_1 = require("./compare/levenshtein-distance");
    Object.defineProperty(exports, "LevenshteinDistanceCompare", { enumerable: true, get: function () { return levenshtein_distance_1.compare; } });
    class YouNeedSuggestion {
        constructor(dataSource, options) {
            this.options = {
                // 进行匹配的字段
                keyNameList: [],
                // 是否过滤空值
                filterEmptyValue: true,
                // 是否区分大小写
                caseSensitive: false,
                // 最小相似度
                minSimilarity: 0,
                // 计算算法
                compare: () => 100,
            };
            this.dataSource = dataSource;
            this.options = Object.assign(this.options, options);
            this.keyNameList = this.parseKeyNameList(this.options.keyNameList);
        }
        parseValue(value) {
            const { caseSensitive } = this.options;
            if (typeof value !== "string") {
                return "";
            }
            // 不区分大小写时，需要将字符串转换为小写
            return caseSensitive
                ? value
                : value.toLowerCase();
        }
        parseKeyNameList(keyNameList) {
            if (typeof keyNameList === 'string') {
                return keyNameList.split(',');
            }
            else if (Array.isArray(keyNameList)) {
                return keyNameList;
            }
            return ['value'];
        }
        getMaxSimilarity(value, match) {
            if (typeof value === "string" && value === "" && this.options.filterEmptyValue) {
                return 100;
            }
            if (typeof match === 'string') {
                return this.options.compare(this.parseValue(match), value);
            }
            return this.keyNameList.reduce((lastSimilarity, key) => {
                const sourceStr = this.parseValue(match[key]);
                const currentSimilarity = this.options.compare(sourceStr, value);
                return Math.max(lastSimilarity, currentSimilarity);
            }, -Infinity);
        }
        get(value) {
            const result = [];
            value = this.parseValue(value);
            for (let i = 0; i < this.dataSource.length; i++) {
                const match = this.dataSource[i];
                const similarity = this.getMaxSimilarity(value, match);
                if (similarity >= this.options.minSimilarity) {
                    result.push({ data: match, similarity });
                }
            }
            return result.sort((a, b) => b.similarity - a.similarity);
        }
    }
    exports.YouNeedSuggestion = YouNeedSuggestion;
});
