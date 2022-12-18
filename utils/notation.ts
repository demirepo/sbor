interface ObjectKeys {
    [key: string]: any;
}

class Notation {
    private transformKeys(obj: ObjectKeys, transform: (key: string) => string) {
        const result: ObjectKeys = {};

        for (let key of Object.keys(obj)) {
            const newKey = transform(key);
            result[newKey] = obj[key];
        }

        return result;
    }

    private transformToCamelCase = (key: string) => {
        return key.replaceAll(/_\w/g, (str) => str.substring(1).toUpperCase());
    };
    private transformToSnakeCase = (key: string) => {
        return key.replaceAll(/([A-Z])/g, '_$1').toLowerCase();
    };

    toCamelCase(obj: ObjectKeys) {
        return this.transformKeys(obj, this.transformToCamelCase);
    }
    toSnakeCase(obj: ObjectKeys) {
        return this.transformKeys(obj, this.transformToSnakeCase);
    }

    auto(obj: ObjectKeys) {
        const hasUnderscore = Object.keys(obj).some((el) => el.includes('_'));
        return hasUnderscore ? this.toCamelCase(obj) : this.toSnakeCase(obj);
    }
}

export default new Notation();
