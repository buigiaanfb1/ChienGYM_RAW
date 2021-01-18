function DanhSachNhanVien() {
  //Attribute
  this.arr = [];

  //Method
  this.themNhanVien = function (nv) {
    this.arr.push(nv);
  };

  // this.timViTri = function (id) {
  //   var viTri = -1;
  //   this.arr.forEach((item, index) => {
  //     if (id === item.manv) viTri = index;
  //   });
  //   return viTri;
  // };

  this.timViTri = function (id) {
    return this.arr.findIndex(function (item) {
      return id === item.manv;
    });
  };

  this.xoaNhanVien = function (id) {
    var viTri = this.timViTri(id);
    if (viTri !== -1) {
      this.arr.splice(viTri, 1);
    }
  };

  this.layThongTinNhanVien = function (id) {
    var viTri = this.timViTri(id);
    if (viTri !== -1) {
      return this.arr[viTri];
    }
  };

  this.capNhatNhanVien = function (nhanVien) {
    var viTri = this.timViTri(nhanVien.manv);
    if (viTri !== -1) {
      this.arr[viTri] = nhanVien;
    }
  };

  // this.timKiemNhanVien = function(keyword) {

  // }
}

DanhSachNhanVien.prototype.timKiemNhanVien = function (keyword) {
  // var mangTimKiem = [];
  // this.arr.forEach((item) => {
  //   if (item.tennv.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
  //     mangTimKiem.push(item);
  //   }
  // });
  // return mangTimKiem;
  return this.arr.filter((item) => {
    return item.tennv.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
  });
};
