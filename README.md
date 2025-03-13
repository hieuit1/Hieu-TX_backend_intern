Day 3

- Module trong NestJS là gì? Tại sao nó quan trọng?

  - Module là một phần quan trọng giúp tổ chức mã nguồn một cách có cấu trúc và dễ quản lý. Mỗi module trong NestJS là một lớp TypeScript được đánh dấu bằng @Module() decorator, có nhiệm vụ nhóm các thành phần liên quan lại với nhau, chẳng hạn như Controllers, Services, Providers, và Imports.
  - vì sao nó quan trọng Tổ chức mã nguồn rõ ràng Giúp dễ bảo trì, mở rộng, Tăng khả năng tái sử dụng Có thể tách thành module dùng chung, Quản lý Dependency Injection (DI) Module giúp quản lý Service, Provider hiệu quả.

- Sự khác biệt giữa @Module(), @Global(), và @Injectable()?

  - @Module() Định nghĩa một module, Gom nhóm Controller, Service, Middleware,... vào một module
  - @Global() Biến module thành toàn cục, Cho phép module được dùng ở bất kỳ đâu mà không cần import
  - @Injectable() Định nghĩa một Service có thể inject, Quản lý Service thông qua Dependency Injection

- Làm thế nào để import và export các providers giữa các module?

  - Để sử dụng các providers đã được export từ một module khác, bạn cần import module đó vào module hiện tại. Việc import module được thực hiện trong decorator @Module() bằng cách sử dụng mảng imports
  - Để một module chia sẻ providers của nó với các module khác, bạn cần export các providers đó. Việc export được thực hiện trong decorator @Module() bằng cách sử dụng mảng exports.

- Controller trong NestJS đóng vai trò gì?

  - Trong NestJS, Controller là nơi định nghĩa các endpoint (tuyến API) và xử lý các request từ client.
    Mỗi controller là một lớp TypeScript và được đánh dấu bằng @Controller() decorator.

- Cách sử dụng các decorator như @Get(), @Post(), @Param(), và @Body()?

  - @Get(): Dùng để định nghĩa một route GET. Thường được sử dụng để lấy dữ liệu từ server.
  - @Post(): Dùng để định nghĩa một route POST. Thường được sử dụng để gửi dữ liệu lên server.
  - @Param(): Dùng để lấy dữ liệu từ URL params. Ví dụ: /users/:id
  - @Body():Dùng để lấy dữ liệu từ phần body của request (thường trong các API POST, PUT).

- Provider trong NestJS là gì? Có những loại provider nào?

  - Trong NestJS, Providers là nơi xử lý logic nghiệp vụ và có thể được inject vào các phần khác của ứng dụng (Controllers, Services, Guards, Interceptors, Pipes...).
  - Các loại Provider trong NestJS :
    - Class Provider : Định nghĩa một class thông thường (thường là Service hoặc Repository).
    - Value Provider : Cung cấp một giá trị tĩnh (ví dụ: API key, config).
    - Factory Provider : Cung cấp logic xử lý hoặc tạo ra một instance thông qua function.
    - Alias Provider : Tạo bí danh cho Provider đã tồn tại.

- Sự khác biệt giữa @Injectable() và @Inject()?

  - @Injectable()
    - Vai trò : Đánh dấu class là một Provider
    - Cách hoạt động : Tự động quản lý dependency (DI)
    - Áp dụng cho : Class (Service, Repository, Middleware)
  - @Inject()
    - Vai trò : Inject một Provider hoặc một giá trị cụ thể
    - Cách hoạt động : Cần chỉ định thủ công qua token
    - Áp dụng cho : Giá trị tĩnh, Class hoặc Factory

- Middleware là gì?

  - Middleware trong NestJS là một hàm trung gian chạy trước khi request đến Controller. Nó thường được dùng để Kiểm tra & xác thực request (Authentication, Authorization), Ghi log request (Logging). Xử lý dữ liệu đầu vào (Parsing, Validation). Thêm headers vào response (CORS, Security).

- Làm thế nào để tạo một custom middleware trong NestJS?

  - Có hai cách chính để tạo custom middleware trong NestJS:

  - Class-based Middleware (Sử dụng Class): Đây là cách phổ biến và được khuyến khích vì nó tận dụng được Dependency Injection (DI) của NestJS.
  - Functional Middleware (Sử dụng Function): Đơn giản hơn cho các middleware không cần DI hoặc logic phức tạp.

- NestJS cung cấp những built-in middleware nào?

  - Built-in Middleware NestJS hỗ trợ sử dụng Middleware có sẵn của Express hoặc Fastify express.json() : Xử lý request body ở dạng JSON, express.urlencoded() : Xử lý form-data (x-www-form-urlencoded), cors() : Kích hoạt CORS (Cross-Origin Resource Sharing), helmet() : Bảo vệ ứng dụng khỏi các lỗ hổng bảo mật, compression() : Nén response để tăng hiệu suất.

- Cách sử dụng middleware trong NestJS?

- Dependency Injection (DI) là gì?
  - Dependency Injection (DI) là một kỹ thuật thiết kế phần mềm giúp quản lý sự phụ thuộc giữa các class bằng cách inject (tiêm) chúng thay vì khởi tạo trực tiếp , Tách biệt logic của class và sự phụ thuộc, Dễ dàng thay đổi & kiểm thử (Unit Test), NestJS tự động quản lý & inject dependencies bằng @Injectable() và @Inject().
