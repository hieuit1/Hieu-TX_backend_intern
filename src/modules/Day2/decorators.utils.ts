export function LogExecutionTime() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.time(`Execution time of ${propertyKey}`);
      const result = originalMethod.apply(this, args);
      console.timeEnd(`Execution time of ${propertyKey}`);
      return result;
    };

    return descriptor;
  };
}
