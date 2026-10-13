/* ==========================================================
   script.js - JavaScript thuần cho Bài 2 (Tailwind)
   Tailwind CHỈ cung cấp class CSS, KHÔNG có sẵn hành vi JS
   như Bootstrap => phải tự viết JS để đóng/mở menu mobile.
   ========================================================== */

// 1) Lấy các phần tử cần dùng trong DOM
const menuBtn    = document.getElementById('menu-btn');     // nút hamburger
const mobileMenu = document.getElementById('mobile-menu');  // menu dọc trên di động
const iconOpen   = document.getElementById('icon-open');    // icon ☰
const iconClose  = document.getElementById('icon-close');   // icon ✕

// 2) Hàm đóng/mở menu: toggle class "hidden" <-> "flex"
function toggleMenu() {
  mobileMenu.classList.toggle('hidden'); // có "hidden" => display:none
  mobileMenu.classList.toggle('flex');   // có "flex"   => display:flex (menu hiện, xếp dọc nhờ flex-col)

  // Đổi icon ☰ <-> ✕ cho dễ hiểu
  iconOpen.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');

  // Cập nhật thuộc tính trợ năng (cho trình đọc màn hình)
  const isOpen = mobileMenu.classList.contains('flex');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
}

// 3) Gắn sự kiện click cho nút hamburger
menuBtn.addEventListener('click', toggleMenu);

// 4) Bấm vào 1 link trong menu mobile thì tự đóng menu lại
mobileMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (mobileMenu.classList.contains('flex')) toggleMenu();
  });
});

// 5) Hiệu ứng nhỏ khác: gửi form -> chặn reload trang, hiện thông báo
const form = document.getElementById('order-form');
const msg  = document.getElementById('order-msg');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // không cho trình duyệt tải lại trang
  const ten = document.getElementById('ten').value.trim();
  msg.textContent = 'Cảm ơn ' + ten + '! Bếp Bánh sẽ liên hệ bạn sớm nhất.';
  msg.classList.remove('hidden');
  msg.classList.add('animate-fade-up'); // class animation viết trong style.css
  form.reset();
});
