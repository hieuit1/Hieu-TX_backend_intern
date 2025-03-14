Day 44

- Database là gì?

  - Là cấp cao nhất trong cấu trúc của MongoDB, Mỗi Database tương đương với một cơ sở dữ liệu riêng biệt, giống như một dự án lớn, Một MongoDB instance có thể chứa nhiều Database, Mỗi Database có không gian lưu trữ và các quyền truy cập riêng.

- Collection là gì?

  - Là một tập hợp các Document (tài liệu), tương tự như một Table trong hệ quản trị cơ sở dữ liệu quan hệ (SQL), một Database có thể chứa nhiều Collection, các Document trong cùng một Collection không bắt buộc phải có cùng cấu trúc (schema-less).

- Document là gì?

* Là đơn vị lưu trữ dữ liệu cơ bản trong MongoDB, được lưu dưới dạng JSON-like (BSON - Binary JSON), mỗi Document là một đối tượng chứa các cặp key-value (tương tự như một bản ghi trong SQL), mỗi Document có một trường id là duy nhất (ID tự động được MongoDB sinh ra).

- Schema là gì?
- Schema trong Mongoose
- Schema là nơi định nghĩa cấu trúc của một Document trong MongoDB.
- Nó giống như một "bản thiết kế" quy định các field (thuộc tính), kiểu dữ liệu và các ràng buộc (validation).
- VD : import { Schema } from 'mongoose';

const UserSchema = new Schema({
name: { type: String, required: true },
email: { type: String, unique: true, required: true },
age: { type: Number, min: 18 },
createdAt: { type: Date, default: Date.now },
});

- Model là gì?
  - - Model trong Mongoose

* Model là nơi để thao tác trực tiếp với Collection trong MongoDB.
* Nó cho phép bạn thực hiện các tha Nó cho phép bạn thực hiện các thao tác CRUD như: Create, Read, Update, Delete
* VD : import { model } from 'mongoose';

// Tạo Model
export const UserModel = model('User', UserSchema);

- Indexing là gì?

  - Indexing (Đánh chỉ mục) là một cơ chế tối ưu hoá trong MongoDB, giúp tăng tốc độ truy vấn dữ liệu thông qua việc tạo ra cấu trúc dữ liệu đặc biệt để MongoDB có thể tìm kiếm dữ liệu nhanh hơn thay vì quét toàn bộ collection.

- Các loại index phổ biến?

  1.  Single Field Index (Chỉ mục trên một trường) , Mục đích: Tạo Index trên một trường để tăng tốc truy vấn.
      Ví dụ: Đánh Index trên trường email.
      VD : UserSchema.index({ email: 1 });

  1: Tăng dần (Ascending)
  -1: Giảm dần (Descending)

  - 2. Compound Index (Đánh chỉ mục trên nhiều trường) Mục đích: Tối ưu truy vấn trên nhiều trường cùng lúc.
       Ví dụ: Tạo Index trên name và age.
       VD : UserSchema.index({ name: 1, age: -1 }); 3. Unique Index (Chỉ mục đảm bảo dữ liệu duy nhất) Mục đích: Ngăn chặn dữ liệu trùng lặp.
       Ví dụ: Không cho phép hai người có cùng email.
       VD : UserSchema.index({ email: 1 }, { unique: true }); 4. Text Index (Đánh chỉ mục để tìm kiếm toàn văn bản) Mục đích: Tìm kiếm các đoạn text lớn (tương tự Google Search).
       Ví dụ: Tìm kiếm theo trường description.
       VD : UserSchema.index({ description: 'text' }); 5. Geospatial Index (Đánh chỉ mục để tìm kiếm theo vị trí địa lý) Mục đích: Tìm kiếm các địa điểm gần nhau, ví dụ như Grab, Google Maps.
       Ví dụ: Tìm kiếm các quán cà phê trong bán kính 5km.
       VD : UserSchema.index({ location: '2dsphere' });

- Performance Optimization?
  Performance Optimization (Tối ưu hiệu suất) trong MongoDB là tập hợp các kỹ thuật và chiến lược để: Tăng tốc độ truy vấn dữ liệu, Giảm tải bộ nhớ RAM và CPU, Giải quyết tình trạng Full Collection Scan (quét toàn bộ dữ liệu), Tối ưu cho hệ thống khi dữ liệu lớn (big data), Tăng khả năng mở rộng và xử lý đồng thời (Concurrency)
  o Indexing (Đánh chỉ mục) Giúp MongoDB tìm dữ liệu trong B-Tree Index thay vì quét toàn bộ collection.
  VD : UserSchema.index({ email: 1 });
  o Projection (Chỉ lấy dữ liệu cần thiết) :
  VD : await this.userModel.find(); chưa Trả về toàn bộ dữ liệu (bao gồm cả các trường không cần thiết), Lãng phí băng thông và bộ nhớ RAM
  VD : await this.userModel.find({}, { name: 1, email: 1, \_id: 0 }); hỉ lấy name và email, Giảm 60% kích thước dữ liệu
  o Lean Query (Giảm tải bộ nhớ) Mongoose trả về Mongoose Document, chứa nhiều metadata không cần thiết. lean() giúp trả về Plain Object, giảm 50% bộ nhớ RAM.
  VD : await this.userModel.find().lean();
  o Pagination (Phân trang dữ liệu)
  Giải pháp: Cursor-based Pagination (Phân trang dựa trên con trỏ)
  Cách hoạt động:
  • Lấy 10 bản ghi đầu tiên
  Lấy \_id của bản ghi cuối cùng trong trang hiện tại
  Lấy tiếp 10 bản ghi tiếp theo từ ID đó trở đi
  o Caching với Redis (Giảm tải MongoDB)
  Giải pháp: Cache dữ liệu trong Redis : Lưu dữ liệu trong bộ nhớ RAM ruy xuất siêu nhanh (~1ms) Giảm 80% áp lực cho MongoDB
  o Connection Pooling (Tối ưu kết nối đồng thời tới MongoDB)
  Vấn đề : Khi có 1000 request API đồng thời, MongoDB bị quá tải vì không đủ kết nối để xử lý.
  Giải pháp : Tăng Connection Pool (Bể kết nối)
  • Connection Pool là gì?: MongoDB cho phép nhiều kết nối đồng thời. Mặc định MongoDB chỉ cho phép 5 kết nối đồng thời. Tăng Connection Pool lên 20-50 kết nối giúp xử lý nhiều request cùng lúc.
   VD: MongooseModule.forRoot('mongodb://localhost:27017/nestjs', { poolSize: 20, // Tăng số lượng kết nối đồng thời lên 20 useUnifiedTopology:
  true, useNewUrlParser: true,
  }
  );
   Sharding (Phân mảnh dữ liệu lớn trong MongoDB)

- Transaction là gì?
  Transactions trong MongoDB cho phép:
  o Thực hiện nhiều thao tác trong 1 phiên giao dịch (session)
  o Nếu một thao tác thất bại, toàn bộ các thao tác khác sẽ rollback (hoàn tác).
  o Giống như MySQL hay PostgreSQL, nhưng trong MongoDB!

- Cách sử dụng transactions trong Mongoose?
  Cách sử dụng:
  1️ Bắt đầu session và transaction
  typescript
  CopyEdit
  const session = await this.connection.startSession();
  session.startTransaction();
  2️ Thực hiện các thao tác trong session
  typescript
  CopyEdit
  await this.userModel.findByIdAndUpdate(userId, { $inc: { balance: -price } }, { session });
  await new this.orderModel({ userId, product, price }).save({ session });
  3️ Commit nếu thành công, rollback nếu lỗi
  typescript
  CopyEdit
  await session.commitTransaction(); // Commit
  await session.abortTransaction(); // Rollback
  session.endSession(); // Kết thúc session
