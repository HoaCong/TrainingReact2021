# React Order Coffee

## Bước 1: Chia khối:

<img src="./src/img/chiakhoi.png">

1. Root Container: Chứa toàn bộ nội dung trang web
2. Header (nâu): Chứa phần đầu trang web
3. Body (đen): Chứa nội dung trang web
4. Footer (đỏ): Chứa phần cuối trang web
5. MainContainer (nâu đỏ): Chứa List Category và List Product
6. CartContainer (xanh xám): Chứa thông tin giỏ hàng.
7. List Categories (xanh lá đậm): Chứa các Item Category
8. List Product (đỏ): Chứa form tìm kiếm và list sản phẩm theo loại category
9. Item Category (xanh lá non): Thông tin loại sản phẩm
10. Item Product (xanh biển): thông tin sản phẩm cụ thể.
11. Image (xám): Ảnh
12. Button (vàng): nút button
13. Input (hồng): thanh input.
14. Price(xanh lơ): giá tiền

## => Phân cấp thành phần:

- Root
  - Header:
    - Logo
    - Ship Form
    - Button Login
  - Body
    - MainContainer
      - List Categories
        - Item Category
      - List Product
        - Search Form
        - Item Product
          - Image
          - Price
    - CartContainer
      - Button
      - Discount Form
      - Price
  - Footer

## Bước 2: Xây dựng bản tĩnh:

- Code các thành phần
- Ráp các thành phần với dữ liệu tự nhập

## Bước 3: Xác định trạng thái hoàn chỉnh tối ưu nhất cho giao diện người dùng:

- Rút gọn code bằng việc đưa props vào các component.
- Xác định các state tối thiểu.

## Bước 4: Đưa state vào đâu:

- Fetch API và đẩy dữ liệu vào các component.
- Lựa chọn chô nào giữ state, chỗ nào lấy dữ liệu.
