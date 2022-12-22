interface ObjectKeys {
  [key: string]: any;
}

class Notation {
  private transformKeys(obj: ObjectKeys, transform: (key: string) => string) {
    if (typeof obj !== 'object' || obj === null) {
      throw new Error();
    }

    const result: ObjectKeys = {};

    for (let key of Object.keys(obj)) {
      const newKey = transform(key);
      result[newKey] = obj[key];
    }

    return result;
  }

  private snakeToCamelCase = (key: string) => {
    const transform = (string: string) => string.replaceAll(/_\w/g, (str) => str[1].toUpperCase());

    const isStartsWithUnderscore = key.startsWith('_');

    return isStartsWithUnderscore ? '_' + transform(key.substring(1)) : transform(key);
  };

  private camelToSnakeCase = (key: string) => {
    return key.replaceAll(/([A-Z])/g, '_$1').toLowerCase();
  };

  toCamelCase(obj: ObjectKeys) {
    return this.transformKeys(obj, this.snakeToCamelCase);
  }
  toSnakeCase(obj: ObjectKeys) {
    return this.transformKeys(obj, this.camelToSnakeCase);
  }

  auto(obj: ObjectKeys) {
    const hasUnderscore = Object.keys(obj).some((el) => el.includes('_'));
    return hasUnderscore ? this.toCamelCase(obj) : this.toSnakeCase(obj);
  }
}

export default new Notation();
