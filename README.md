# Hệ thống sát hạch đường trường B & C1

Website tĩnh, tối ưu cho điện thoại và máy tính, dùng để hỗ trợ giáo viên chấm bài thi sát hạch đường trường.

## Triển khai

Dự án không cần bước build. Có thể triển khai trực tiếp lên Vercel từ thư mục gốc.

Sau khi tạo dự án trên Vercel, khai báo ba biến môi trường:

- `APP_USERNAME`: tên đăng nhập của giáo viên.
- `APP_PASSWORD`: mật khẩu đăng nhập.
- `SESSION_SECRET`: chuỗi bí mật ngẫu nhiên dài tối thiểu 32 ký tự.

Không lưu giá trị thật của các biến này trong GitHub.
