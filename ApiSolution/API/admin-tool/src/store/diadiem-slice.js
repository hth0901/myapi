import { createSlice } from "@reduxjs/toolkit";

const diadiemSlice = createSlice({
  name: "diadiem",
  initialState: {
    danhsach: [],
    danhsachDiaDiemGiaVe: [],
    // danhsachTuyenDiaDiemGiaVe: [],
    chitietDiaDiem: null,
  },
  reducers: {
    truyvanDanhSachDiaDiemGiaVe(state, action) {
      const lstDiaDiem = [], lstTuyen = [];
      action.payload.items.forEach(el => {
        if (el.id.split(",").length > 1) {
          lstTuyen.push(el);
        } else {
          lstDiaDiem.push(el);
        }
      });
      lstDiaDiem.sort((el1, el2) => {
        if (+el1.id > +el2.id) {
          return 1;
        }
        return -1;
      });
      lstTuyen.sort((el1, el2) => {
        const le1 = el1.id.split(",").length;
        const le2 = el2.id.split(",").length;
        if (le1 > le2) {
          return 1;
        }
        return -1;
      });
      // state.danhsachDiaDiemGiaVe = [...lstDiaDiem];
      // state.danhsachTuyenDiaDiemGiaVe = [...lstTuyen];
      state.danhsachDiaDiemGiaVe = [...lstDiaDiem, ...lstTuyen];
    },

    truyvanDanhSachDiaDiem(state, action) {
      state.danhsach = [...action.payload.items];
    },
    setThongTinChiTietDiaDiem(state, action) {
      state.chitietDiaDiem = {
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
        address: action.payload.address,
        lattitude: action.payload.lattitude,
        longtidute: action.payload.longtidute,
        imageUrl: action.payload.imageUrl,
        slideShow: action.payload.slideShow,
        adultPrice: action.payload.adultPrice,
        childrenPrice: action.payload.childrenPrice,
        lstImage: action.payload.lstImage,
        description: action.payload.description
      };
    },
  },
});

export const diadiemActions = diadiemSlice.actions;
export default diadiemSlice;
