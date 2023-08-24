import TypeChecker from '@lihzsky/type-checker';
export class Tempo {
    static getRemainByStandardTime(standardTime, gapStr) {
        if (Tempo.remainTime === 0) {
            return '';
        }
        const remain = Math.floor(Tempo.remainTime / standardTime);
        Tempo.remainTime = Tempo.remainTime % standardTime;
        return String(remain) + gapStr;
    }
    format(value, format = "yyyy/MM/dd hh:mm:ss") {
        const date = this.toDate(value);
        if (date === null) {
            return "";
        }
        const map = {
            y: () => date.getFullYear(),
            M: () => date.getMonth() + 1,
            d: () => date.getDate(),
            h: () => date.getHours(),
            m: () => date.getMinutes(),
            s: () => date.getSeconds(),
            q: () => Math.floor((date.getMonth() + 3) / 3),
            S: () => date.getMilliseconds(), // 毫秒
        };
        return format.replace(/([yMdhmsqS])+/g, (all, t) => {
            const fn = map[t];
            if (t === "y") {
                return String(fn()).substring(4 - all.length);
            }
            if (TypeChecker.isFunction(fn)) {
                let valStr = String(fn());
                if (all.length > 1) {
                    valStr = `0${valStr}`;
                    valStr = valStr.substring(valStr.length - 2);
                }
                return valStr;
            }
            return all;
        });
    }
    toRemainTime(value, format = 'd天h小时m分钟s秒') {
        if (!TypeChecker.isNumber(+value) || Number.isNaN(value) || Number.isFinite(value)) {
            return '';
        }
        Tempo.remainTime = +value;
        return format.replace(/([dhms]+)([^dhms]+)/g, (_, t, gapStr) => {
            switch (t) {
                case 'd':
                    return Tempo.getRemainByStandardTime(Tempo.ST.ONE_DAY, gapStr);
                case 'h':
                    return Tempo.getRemainByStandardTime(Tempo.ST.ONE_HOUR, gapStr);
                case 'm':
                    return Tempo.getRemainByStandardTime(Tempo.ST.ONE_MINUTE, gapStr);
                case 's':
                    return Tempo.getRemainByStandardTime(Tempo.ST.ONE_SECOND, gapStr);
                default:
            }
            return t;
        });
    }
    toDate(value, strict = false) {
        var _a, _b;
        if (value instanceof Date) {
            return value;
        }
        if (TypeChecker.isValidDate(value)) {
            return new Date(value);
        }
        if (/^(?:\d+[^\d]+){3}/.test(value)) {
            const parts = (_b = (_a = value.match(/\d+/g)) === null || _a === void 0 ? void 0 : _a.map((item) => +item)) !== null && _b !== void 0 ? _b : [];
            let args;
            if (parts.length > 6) {
                args = parts.slice(0, 6);
            }
            else if (parts.length < 6) {
                args = parts.concat(new Array(6 - parts.length).fill(0));
            }
            else {
                args = parts;
            }
            return new Date(...args);
        }
        if (strict) {
            return new Date();
        }
        return null;
    }
    toTimestamp(value, strict = false) {
        if (TypeChecker.isValidDate(value)) {
            return new Date(value).getTime();
        }
        if (strict) {
            return Date.now();
        }
        return 0;
    }
}
Tempo.ST = {
    ONE_DAY: 86400000,
    ONE_HOUR: 3600000,
    ONE_MINUTE: 60000,
    ONE_SECOND: 1000
};
Tempo.remainTime = 0;
export default new Tempo();
