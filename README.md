# 🤣 Joke App – "Mỗi ngày một câu đùa"

Ứng dụng kể chuyện cười với nhiều thể loại khác nhau, sử dụng API miễn phí từ JokeAPI.dev.

## 🌟 Tính năng

- 🎲 **Random Joke**: Tự động gọi API để lấy joke ngẫu nhiên
- 📂 **Chọn thể loại**: Người dùng chọn loại: Programming, General, Dark, Pun, Spooky
- 🧼 **Lọc nội dung**: Có thể chọn lọc joke "Clean" hoặc "Edgy"
- 🌙 **Dark/Light mode**: Auto đổi theo giờ hoặc bằng toggle
- 🔁 **Nút "Joke mới"**: Gọi API để lấy joke mới
- 🎤 **Nút "Đọc to"**: Sử dụng Web Speech API để đọc joke

## 🧪 Công nghệ

- **Framework**: Next.js 15
- **Styling**: TailwindCSS 4
- **API**: JokeAPI.dev
- **Bổ sung**: Web Speech API để đọc joke

## 🚀 Hướng dẫn chạy

### Cài đặt

```bash
# Clone repository
git clone [repository-url]

# Di chuyển vào thư mục dự án
cd joke-app

# Cài đặt dependencies
npm install
```

### Chạy ứng dụng

```bash
# Chạy ở môi trường development với Turbopack
npm run dev

# Build cho production
npm run build

# Chạy bản production
npm start
```

## 🎯 API đang sử dụng

**[JokeAPI – jokeapi.dev](https://jokeapi.dev/)**

Ví dụ call API:

```bash
https://v2.jokeapi.dev/joke/Programming,Miscellaneous?type=single&blacklistFlags=nsfw,racist,sexist
```

## 📝 Hướng phát triển tương lai

- [ ] Cho phép người dùng submit joke riêng
- [ ] Tạo "joke history" để xem lại các câu đã đọc
- [ ] Cho phép vote lên/xuống với mỗi câu đùa
- [ ] Tích hợp chức năng "Gửi joke đến email bạn bè"

## 📜 Giấy phép

MIT
