Create...Dto: tất cả các field bắt buộc (không có @IsOptional()).

Update...Dto: các field không bắt buộc, nên thêm @IsOptional() vào trước từng field để NestJS hiểu là mình đang cập nhật một phần (partial update).
cài thư viện 
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/passport-jwt @types/bcrypt
