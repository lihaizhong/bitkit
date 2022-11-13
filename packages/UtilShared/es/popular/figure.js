import TypeChecker from "@lihzsky/type-checker";
export const Figure = {
    toYuan(value) {
        if (TypeChecker.isNumber(value)) {
            return (value / 100).toFixed(2);
        }
        return '0.00';
    },
    toFen(value) {
        if (TypeChecker.isString(value) && /^\d+(?:\.\d+)?$/.test(value)) {
            return Number(value) * 100;
        }
        return 0;
    },
    toPercent(value) {
        if (TypeChecker.isNumber(value)) {
            return (value / 100) + '%';
        }
        return '';
    }
};
