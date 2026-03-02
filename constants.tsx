import React from 'react';
import { SidebarSection } from './types';

// --- ICONS ---
export const IconSave = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
export const IconTrash2 = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
export const IconCopy = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
export const IconChevronDown = ({ size = 16, className="" }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
export const IconChevronRight = ({ size = 16, className="" }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>;
export const IconCheckSquare = ({ size = 18, className="" }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;
export const IconSquare = ({ size = 18, className="" }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>;
export const IconAlertCircle = ({ size = 14 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
export const IconX = ({ size = 20 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
export const IconDot = ({ className="" }: { className?: string }) => <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3"/></svg>;
export const IconArrowLeft = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
export const IconSearch = ({ size = 18, className="" }: { size?: number, className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

// --- DATA ---
export const SIDEBAR_DATA: SidebarSection[] = [
    {
        title: "I. Các thông tin chung",
        groups: [
            {
                name: "Thông tin về trẻ",
                status: "Thiếu dữ liệu",
                items: [
                    { name: "Con thứ mấy", status: null },
                    { name: "Tổng số con trong gia đình", status: null },
                    { name: "Mã bảo hiểm y tế", status: "Thiếu dữ liệu" }
                ]
            },
            {
                name: "Tiền sử bệnh / tật",
                status: "Thiếu dữ liệu",
                items: [
                    { name: "Tiền sử bệnh / tật", status: "Thiếu dữ liệu" },
                    { name: "Mẹ bị bệnh trong thời kì mang thai", status: null }
                ]
            },
            {
                name: "Dinh dưỡng",
                status: "Thiếu dữ liệu",
                items: [
                     { name: "Số bữa ăn/ngày", status: "Thiếu dữ liệu" },
                     { name: "Thói quen ăn uống", status: "Thiếu dữ liệu" },
                     { name: "Món ăn chính hiện nay", status: "Hoàn thành" }
                ]
            },
            {
                name: "Thông tin gia đình",
                status: "Hoàn thành",
                items: [
                    { name: "Người thường xuyên tiếp xúc", status: "Hoàn thành" }
                ]
            },
            {
                name: "Tiêm chủng",
                status: "Thiếu dữ liệu",
                items: [
                    { name: "BCG (phòng lao)", status: "Hoàn thành" },
                    { name: "Bạch hầu, ho gà, uốn ván - Mũi 1", status: "Hoàn thành" },
                    { name: "Bạch hầu, ho gà, uốn ván - Mũi 2", status: "Thiếu dữ liệu" }
                ]
            },
            {
                name: "Thông tin khác",
                status: "Thiếu dữ liệu",
                items: [
                    { name: "Ghi chú đặc biệt", status: "Thiếu dữ liệu" }
                ]
            }
        ]
    },
    {
        title: "II. Theo dõi sức khỏe",
        groups: [
            {
                name: "Theo dõi sức khỏe",
                status: null,
                items: [
                    { name: "Cân nặng", status: "Hoàn thành" },
                    { name: "Chiều cao", status: "Hoàn thành" },
                    { name: "Đánh giá sức khỏe", status: null }
                ]
            }
        ]
    }
];

export const INITIAL_STUDENTS = [
    { id: '1', code: '74836574141', name: 'Bùi Vạn Thảo Tiên', value: '', isSelected: false },
    { id: '2', code: '74835269811', name: 'Hồ Huyền Trang', value: '', isSelected: false },
    { id: '3', code: '79887771501', name: 'Hồ Võ Minh Ngọc', value: '', isSelected: false },
    { id: '4', code: '40911999191', name: 'Lê Hồ Ngọc Diệp', value: '', isSelected: false },
    { id: '5', code: '79887771131', name: 'Lê Kiều Vi', value: '', isSelected: false },
    { id: '6', code: '40887771421', name: 'Mai Hà Phương', value: '', isSelected: false },
    { id: '7', code: '79887771381', name: 'Nguyễn Hoài Bảo Uyên', value: '', isSelected: false },
    { id: '8', code: '79887771101', name: 'Nguyễn Hà Anh', value: '', isSelected: false },
    { id: '9', code: '37887771311', name: 'Nguyễn Hải Đăng', value: '', isSelected: false },
    { id: '10', code: '79887771361', name: 'Nguyễn Ngọc An Nhi', value: '', isSelected: false },
    { id: '11', code: '38887771201', name: 'Nguyễn Ngọc Anh', value: '', isSelected: false },
    { id: '12', code: '79887771111', name: 'Nguyễn Ngọc Hà', value: '', isSelected: false },
];