/* ==========================================================
   app.js - Ứng dụng Vue 3 (CDN) cho shop phụ kiện điện thoại

   GHI CHÚ SO SÁNH VỚI VANILLA JS:
   Nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng phải tự
   querySelector + cập nhật DOM thủ công (innerHTML, textContent...).
   Vue tự động làm điều này nhờ reactivity: ta chỉ đổi DỮ LIỆU
   (cart), Vue tự vẽ lại phần giao diện nào phụ thuộc vào dữ liệu đó.
   => "UI = function của data".
   ========================================================== */

// Vue.createApp(...) tạo ứng dụng Vue từ 1 object cấu hình (Options API)
const app = Vue.createApp({

  // ---------- data(): dữ liệu gốc (state) của ứng dụng ----------
  // Vue bọc object trả về này bằng reactive(), nên mọi thay đổi đều được theo dõi.
  // (Cách viết Composition API tương đương: const cart = ref([]); const tuKhoa = ref(''))
  data() {
    return {
      tuKhoa: '', // liên kết 2 chiều với ô tìm kiếm qua v-model
      cart: [],   // giỏ hàng: mảng các sản phẩm đã thêm
      products: [ // danh sách sản phẩm (>= 8 sản phẩm)
        { id: 1, ten: 'Ốp lưng xanh Electric',   gia: 250000, anh: '../images/case-blue.jpg',     moTa: 'Ốp silicon chống sốc, màu xanh điện.' },
        { id: 2, ten: 'Ốp lưng trong suốt',      gia: 180000, anh: '../images/case-clear.jpg',    moTa: 'Ốp trong, không ố vàng, ôm sát máy.' },
        { id: 3, ten: 'Đế sạc không dây',        gia: 320000, anh: '../images/charger-pad.jpg',   moTa: 'Sạc không dây chuẩn Qi, công suất 15W.' },
        { id: 4, ten: 'Tai nghe TWS Active',     gia: 450000, anh: '../images/earbuds.jpg',       moTa: 'Tai nghe Bluetooth 5.3, pin 24 giờ.' },
        { id: 5, ten: 'Cáp sạc USB-C 1m',        gia: 90000,  anh: '../images/cable.webp',        moTa: 'Cáp bọc dù, hỗ trợ sạc nhanh.' },
        { id: 6, ten: 'Củ sạc nhanh 20W',        gia: 150000, anh: '../images/adapter.jpg',      moTa: 'Củ sạc nhỏ gọn, 1 cổng USB-C.' },
        { id: 7, ten: 'Sạc dự phòng 10000mAh',   gia: 380000, anh: '../images/powerbank.webp',    moTa: 'Pin dự phòng mỏng nhẹ, 2 cổng ra.' },
        { id: 8, ten: 'Giá đỡ điện thoại',       gia: 120000, anh: '../images/stand.jpg',         moTa: 'Giá đỡ để bàn, gập gọn, chống trượt.' }
      ]
    };
  },

  // ---------- computed: giá trị TÍNH TOÁN từ data, tự cập nhật & được cache ----------
  computed: {
    // Số lượng sản phẩm trong giỏ -> hiển thị ở header: Giỏ hàng ({{ cartCount }})
    cartCount() {
      return this.cart.length;
    },

    // Tổng tiền = cộng giá của tất cả sản phẩm trong cart.
    // cart thay đổi -> Vue tự tính lại tongTien -> giao diện tự cập nhật.
    tongTien() {
      return this.cart.reduce((tong, sp) => tong + sp.gia, 0);
    },

    // Danh sách sản phẩm sau khi lọc theo từ khoá (không phân biệt hoa/thường).
    // Template dùng danhSachLoc thay vì products => gõ tới đâu lọc tới đó.
    danhSachLoc() {
      const tuKhoa = this.tuKhoa.trim().toLowerCase();
      if (tuKhoa === '') return this.products; // chưa gõ gì: hiện tất cả
      return this.products.filter(sp => sp.ten.toLowerCase().includes(tuKhoa));
    }
  },

  // ---------- methods: các HÀM xử lý sự kiện (gọi bằng @click) ----------
  methods: {
    // Thêm 1 sản phẩm vào mảng cart. Chỉ đổi dữ liệu, KHÔNG đụng DOM.
    themVaoGio(sanPham) {
      this.cart.push(sanPham);
    },

    // Xoá sản phẩm tại vị trí index khỏi cart (splice xoá 1 phần tử).
    xoaKhoiGio(index) {
      this.cart.splice(index, 1);
    },

    // Định dạng số thành tiền Việt: 250000 -> "250.000đ"
    dinhDangGia(so) {
      return so.toLocaleString('vi-VN') + 'đ';
    },

    // Thanh toán (demo): báo tổng tiền rồi làm rỗng giỏ -> UI tự về "Giỏ hàng trống".
    thanhToan() {
      alert('Cảm ơn bạn! Tổng thanh toán: ' + this.dinhDangGia(this.tongTien));
      this.cart = [];
    }
  }
});

// Gắn ứng dụng Vue vào phần tử có id="app" trong index.html
app.mount('#app');
