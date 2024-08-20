export function filterByProperty<Type, Key extends keyof Type>(collection: Type[], property: Key, value: Type[Key]): Type[] {
  return collection.filter((item) => item[property] === value);
}
