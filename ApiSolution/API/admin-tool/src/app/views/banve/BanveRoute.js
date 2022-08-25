import React from 'react'
import DiaDiem from './diadiem'
import FormEdit from 'app/components/Themmoi/formedit'
import FormAdd from 'app/components/Themmoi/formadd'
import SuKien from './sukien'
import SuKienAdd from 'app/components/Themmoi2/formadd'
import SuKienEdit from 'app/components/Themmoi2/formedit'
import DoiTuong from './doituong'
import TaoVe from './taove'
import GiaVe from './giave'
import DaiNoi from './dainoi'
import DaiNoiAdd from 'app/components/themmoi3/formadd'
import DaiNoiEdit from 'app/components/themmoi3/formedit'
import SuaGiaVe from 'app/components/SuaGiaVe/SuaVe'
import NguoiDung from './nguoidung'
import FeedBack from './feedback'
import Menu from './menu'
import MuaVe from './MuaVe'
import MuaVeXacNhan from './MuaVeXacNhan'
import PhanQuyen from './PhanQuyen'
import ThemMoiVeThamQuan from './ThemMoiVeThamQuan'
const banveRouters = [
    //DIA DIEM
    {
        path: '/quanlydiadiem/*',
        // exact:true,
        // component: ({ match }) => <DiaDiem match={match} />,
        // component: React.lazy(() => import('./diadiem')),
        component: <DiaDiem />,
    },
    {
        path: '/quanlydiadiem/themmoi',
        // exact: false,
        // component: () => <FormAdd />,
        // component: React.lazy(() => import('app/components/Themmoi/formadd')),
        // component: React.lazy(() => import('../../components/Themmoi/formadd')),
        component: <FormAdd />,
    },
    {
        path: '/quanlydiadiem/:id/chinhsua',
        // exact: false,
        // component: ({ match }) => <FormEdit match={match} />,
        // component: React.lazy(() => import('app/components/Themmoi/formedit')),
        component: <FormEdit />,
    },
    //SƯ KIEN
    {
        path: '/quanlysukien/*',
        // exact:true,
        // component: ({ match }) => <SuKien match={match} />,
        // component: React.lazy(() => import('./sukien')),
        component: <SuKien />,
    },
    {
        path: '/quanlysukien/themmoi',
        // exact: false,
        // component: () => <SuKienAdd />,
        // component: React.lazy(() => import('app/components/Themmoi2/formadd')),
        component: <SuKienAdd />,
    },
    {
        path: '/quanlysukien/:id/chinhsua',
        // exact: false,
        // component: ({ match }) => <SuKienEdit match={match} />,
        // component: React.lazy(() => import('app/components/Themmoi2/formedit')),
        component: <SuKienEdit />,
    },
    //ĐẠI NỘI
    {
        path: '/quanlydainoi/*',
        // exact:true,
        // component: ({ match }) => <DaiNoi match={match} />,
        // component: React.lazy(() => import('./dainoi')),
        component: <DaiNoi />,
    },
    {
        path: '/quanlydainoi/themmoi',
        // exact: false,
        // component: () => <DaiNoiAdd />,
        // component: React.lazy(() => import('app/components/themmoi3/formadd')),
        component: <DaiNoiAdd />,
    },
    {
        path: '/quanlydainoi/:id/chinhsua',
        // exact: false,
        // component: ({ match }) => <DaiNoiEdit match={match} />,
        // component: React.lazy(() => import('app/components/themmoi3/formedit')),
        component: <DaiNoiEdit />,
    },
    // DOI TUONG
    {
        path: '/quanlydoituong/*',
        // exact:true,
        // component: ({ match }) => <DoiTuong match={match} />,
        // component: React.lazy(() => import('./doituong')),
        component: <DoiTuong />,
    },
    // TẠO VÉ
    {
        path: '/quanlytaove',
        // exact:true,
        // component: ({ match }) => <TaoVe match={match} />,
        // component: React.lazy(() => import('./taove')),
        // component: <TaoVe />,
        component: <ThemMoiVeThamQuan />,
    },
    // GIÁ VÉ
    {
        path: '/quanlygiave/*',
        // exact:true,
        // component: ({ match }) => <GiaVe match={match} />,
        // component: React.lazy(() => import('./giave')),
        component: <GiaVe />,
    },
    {
        path: '/quanlygiave/:id/chinhsua',
        // exact:true,
        // component: ({ match }) => <SuaGiaVe match={match} />,
        // component: React.lazy(() => import('app/components/SuaGiaVe/SuaVe')),
        component: <SuaGiaVe />,
    },
    //Nguoi dung
    {
        path: '/quanlynguoidung',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <NguoiDung />,
    },
    //Ý kiến
    {
        path: '/quanlyykien',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <FeedBack />,
    },
    {
        path: '/quanlymenu',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <Menu />,
    },
    {
        path: '/phan-quyen',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <PhanQuyen />,
    },
    {
        path: '/mua-ve/*',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <MuaVe />,
    },
    {
        path: '/mua-ve/xac-nhan',
        // exact:true,
        // component : ({match})=> <NguoiDung match={match}/>
        // component: React.lazy(() => import('./nguoidung')),
        component: <MuaVeXacNhan />,
    },
]

export default banveRouters
