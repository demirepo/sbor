export const isObject = (entity: unknown) => {
  return typeof entity === 'object' && !Array.isArray(entity) && entity !== null;
};
