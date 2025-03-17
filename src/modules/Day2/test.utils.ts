import { genericFunction, genericClass } from './generic.utils';
import { LogExecutionTime } from './decorators.utils';
import { formatInput } from './unionType.utils';

//  Test Generics
console.log(' Testing Generics...');
const response = genericFunction<string>('Hello, TypeScript!', 'Success');
console.log(response);

const repo = new genericClass<number>();
repo.add(10);
repo.add(20);
console.log(repo.getAll());

// Test Decorators
console.log('Testing Decorators...');
class TestClass {
  @LogExecutionTime()
  heavyTask() {
    for (let i = 0; i < 1e6; i++) {} // Giả lập công việc nặng
  }
}

const testInstance = new TestClass();
testInstance.heavyTask();

//Test Union Type
console.log(' Testing Union Type...');
console.log(formatInput(123.456));
console.log(formatInput('hello'));
