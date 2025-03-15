//  interface
export interface genericInterface<T> {
  success: boolean;
  data: T;
  message?: string; // using Optional
}

// function
export function genericFunction<T>(
  data: T,
  message?: string,
): genericInterface<T> {
  return {
    success: true,
    data,
    message,
  };
}

// Class
export class genericClass<T> {
  // constructor(parameters) {
  // }
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}
