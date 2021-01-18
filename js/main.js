function getEle(id) {
  return document.getElementById(id);
}

var dsnv = new DanhSachNhanVien();
var validation = new validation();
getLocalStorage();

getEle("btnThem").addEventListener("click", function () {
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
});

getEle("btnThemNV").addEventListener("click", function () {
  getEle("msnv").disables = false;
  var msNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var date = getEle("datepicker").value;
  var chucvu = getEle("chucvu").value;

  var isValid = true;
  //prettier-ignore
  isValid &=
    validation.kiemTraRong(msNV, "tbMaNV", "(*) Vui long nhap ma") &&
    validation.kiemTraDoDaiKyTu(msNV, "tbMaNV", "Do dai ki tu tu 4 --> 10", 4, 10) &&
    validation.kiemTraTrungMa(msNV, "tbMaNV", "(*) Duplicated", dsnv.arr);
  //prettier-ignore
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Vui long nhap ten") &&
    validation.kiemTraDoDaiKyTu(tenNV, "tbTen", "Do dai ki tu tu 4 --> 10", 5, 20);
  // validation.kiemTraKyTu(tenNV, "tbTen", "(*) Vui long ki tu");

  // isValid &=
  //   validation.kiemTraRong(email, "tbEmail", "(*) Vui long nhap email") &&
  //   validation.checkEmail(email, "tbEmail", "(*) Wrong format");
  //prettier-ignore
  // isValid &= validation.kiemTraRong(password, "tbMatKhau", "(*) Vui long nhap pass");
  // isValid &= validation.kiemTraRong(
  //   date,
  //   "tbMatKhau",
  //   "(*) Vui long nhap date"
  // );
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui long chon chuc vu"
  );

  //   if (msNV !== "") {
  //     getEle("tbMaNV").style.display = "none";
  //     getEle("tbMaNV").innerHTML = "";
  //     isValid = true;
  //   } else {
  //     getEle("tbMaNV").style.display = "block";
  //     getEle("tbMaNV").innerHTML = "(*) Vui long nhap ma";
  //     isValid = false;
  //   }

  if (!isValid) return;
  var nhanVien = new NhanVien(msNV, tenNV, date, chucvu);

  //Add
  dsnv.themNhanVien(nhanVien);
  taoBang(dsnv.arr);
  setLocalStorage();
});

function taoBang(dsnv) {
  var content = "";
  dsnv.forEach(function (item) {
    content += `
            <tr>
                <td>${item.manv}</td>
                <td>${item.tennv}</td>
                <td>${item.date}</td>
                <td>${item.chucvu}</td>
                <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.manv}')">Edit</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${item.manv}')">Delete</button>
                </td>
            </tr>
        `;
  });
  getEle("tableDanhSach").innerHTML = content;
}

//delete nhan vien
function xoaNhanVien(id) {
  dsnv.xoaNhanVien(id);
  taoBang(dsnv.arr);
  setLocalStorage();
}

function suaNhanVien(id) {
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  var nhanVien = dsnv.layThongTinNhanVien(id);
  console.log(nhanVien);
  getEle("msnv").value = nhanVien.manv;
  getEle("msnv").disabled = true;
  getEle("name").value = nhanVien.tennv;
  getEle("datepicker").value = nhanVien.date;
  getEle("chucvu").value = nhanVien.chucvu;

  getEle("btnCapNhat").addEventListener("click", function () {
    var msNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var date = getEle("datepicker").value;
    var chucvu = getEle("chucvu").value;
    var nhanVien = new NhanVien(msNV, tenNV, date, chucvu);
    // dsnv.arr.push(nhanVien);
    dsnv.capNhatNhanVien(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();

    getEle("btnDong").click();
  });
}

getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNhanVien(keyword);
  taoBang(mangTimKiem);
});
///save Local

function setLocalStorage() {
  var arr = JSON.stringify(dsnv.arr);
  localStorage.setItem("DSNV", arr);
}

/// get

function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
    taoBang(dsnv.arr);
  }
}
