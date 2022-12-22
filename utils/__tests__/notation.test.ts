import notation from '../notation';

describe('tests transformation from snake_case to camelCase', () => {
    test('should return transformed string', () => {
        const variable = { some_key: 'something' };
        expect(notation.toCamelCase(variable)).toMatchObject({ someKey: 'something' });
    });

    test('should ignore first "_"', () => {
        const variable = { _some_key: 'something' };
        expect(notation.toCamelCase(variable)).toMatchObject({ _someKey: 'something' });
    });
});

describe('tests transformation from camelCase to snake_case', () => {
    test('should return transformed string', () => {
        const variable = { someKey: 'something' };
        expect(notation.toSnakeCase(variable)).toEqual({ some_key: 'something' });
    });
});
