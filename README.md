Day 2

- Primitive Types?

  - Có 6 kiểu dữ liệu nguyên thủy (primitive data type): undefined, boolean, number, string, bigint, symbol.

- Object types?

  - Trong TypeScript, Object là một kiểu dữ liệu được sử dụng để biểu diễn các tập hợp giá trị có cấu trúc, bao gồm nhiều thuộc tính và phương thức.
  - VD : let obj: object = { name: "Alice", age: 25 };

- Union Types?

  - Union Type cho phép một biến có thể chứa một trong nhiều kiểu dữ liệu. Điều này giúp tăng tính linh hoạt và khả năng tái sử dụng code, đặc biệt khi làm việc với các hàm hoặc biến có thể nhận nhiều kiểu giá trị khác nhau.
  - Union : được khai báo bằng cách sử dụng ký hiệu |
  - VD : let value: number | string;
    value = 42; // Hợp lệ
    value = "Hello"; // Cũng hợp lệ

- Intersection Types?

  - Intersection Type trong TypeScript cho phép bạn kết hợp nhiều kiểu khác nhau thành một kiểu duy nhất. Điều này có nghĩa là một biến có kiểu giao sẽ phải thỏa mãn tất cả các kiểu mà nó kết hợp
  - Cú pháp của Intersection Type được biểu diễn bằng ký hiệu &
  - VD : interface Wizard {
    magicPower: string;
    wand: string;
    }

    interface Chef {
    favoriteDish: string;
    kitchenTool: string;
    }

    type WizardChef = Wizard & Chef;

- Interface vs Type Alias?
  - Interface cho phép bạn định nghĩa form của Object. Interface chủ yếu được sử dụng để khai báo các loại đối tượng và thường được dùng trong lập trình hướng đối tượng. Interface có thể extend (kế thừa, mở rộng) và merge (hợp nhất lại), điều này giúp cho việc mở rộng Model trở nên dễ dàng, linh hoạt và dễ tái sử dụng hơn.

* VD : interface User {
  name: string;
  age: number;
  email?: string; // Thuộc tính tùy chọn
  }

       const user: User = {
      	 name: "John",
      	 age: 30
      };

  Type Alias

  - Type Alias cho phép bạn tạo một tên gọi mới cho bất kỳ kiểu dữ liệu nào, không chỉ giới hạn ở các đối tượng. Type Alias có thể sử dụng với các primitive type (kiểu nguyên thủy), union type, intersection, tuple, ...
  - VD : type User = {
    name: string;
    age: number;
    email?: string;
    };
    const user: User = {
    name: "John",
    age: 30
    };

    type ID = number | string; // Union Type
    let userId: ID = 123;
    userId = "abc123";

- Generics là gì?

  - Generics là một tính năng trong TypeScript và các ngôn ngữ lập trình khác, cho phép chúng ta viết một function, class hay interface chung cho nhiều loại dữ liệu khác nhau, và chỉ xác định loại dữ liệu cụ thể khi sử dụng loại dữ liệu đó.
  - Cú pháp Generics : <T>
  - VD : function identity<T>(arg: T): T {
    return arg;
    }

  const output1 = identity<string>("myString"); // type of output will be 'string'
  console.log(output1);

  const output2 = identity<number>(123); // type of output will be 'number'
  console.log(output2);

- Decorators là gì?

  - Decorator trong TypeScript, một tính năng mạnh mẽ giúp mở rộng và thay đổi hành vi của các class, method, property và parameter. Decorator giúp làm cho code trở nên dễ đọc và dễ bảo trì hơn.
  - Decorator: được khai báo bằng cách sử dụng ký hiệu @
  - vd : @Controller('cats')
    export class CatsController {
    @Get()
    findAll(): string {
    return 'This action returns all cats';
    }
    }

- Optional & Readonly Properties?
  - Optional trong TypeScript có vai trò chính là làm cho một thuộc tính hoặc tham số có thể có hoặc không mà không bắt buộc phải khai báo.
- Optional: được khai báo bằng cách sử dụng ký hiệu ?
- VD: interface User {
  id: number;
  name: string;
  age?: number; // Không bắt buộc phải có
  }

  const user1: User = { id: 1, name: "Alice" }; // Hợp lệ
  const user2: User = { id: 2, name: "Bob", age: 25 }; // Hợp lệ

- Readonly properties : readonly là một từ khóa giúp chỉ cho phép đọc giá trị của một thuộc tính, không cho phép thay đổi sau khi được khởi tạo.
- Readonly properties : được khai báo bằng cách sử dụng readonly
- VD: interface User {
  readonly id: number; // Không thể thay đổi sau khi khởi tạo
  name: string;
  }

  const user: User = { id: 1, name: "Alice" };

- dùng cho : Thuộc tính của object, class, interface

- Enum & Tuples?
  - Enum (viết tắt của enumeration) là một kiểu dữ liệu đặc biệt trong TypeScript cho phép bạn định nghĩa một tập hợp các hằng số có tên, giúp mã dễ đọc và dễ quản lý hơn.Mặc định, Enum trong TypeScript là số, bắt đầu từ 0 và tăng dần.
- Enum : được khai báo bằng cách sử dụng enum
- VD : enum Status {
  Pending, // 0
  InProgress, // 1
  Completed // 2
  }

  let taskStatus: Status = Status.InProgress;
  console.log(taskStatus); // Output: 1

- Tuple trong TypeScript là một dạng array đặc biệt giúp bạn định nghĩa số lượng và kiểu dữ liệu cụ thể của từng phần tử.
- VD : let user: [number, string] = [1, "Alice"];
  console.log(user); // Output: [1, "Alice"]
