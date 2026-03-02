import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { SIDEBAR_DATA, INITIAL_STUDENTS, IconSave, IconTrash2, IconCopy, IconCheckSquare, IconSquare, IconAlertCircle, IconX, IconChevronDown, IconDot, IconSearch } from '../constants';
import { Student } from '../types';

interface BatchInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Cấu trúc dữ liệu cho Tiền sử bệnh/tật
interface MedicalHistoryState {
  isNormal: boolean;
  isPremature: boolean; // Thiếu tháng
  isPostmature: boolean; // Thừa tháng
  isIntervention: boolean; // Có can thiệp
  isAsphyxia: boolean; // Ngạt
  isAsthma: boolean; // Hen
  isAllergy: boolean; // Dị ứng
  isCongenitalHeart: boolean; // Tim bẩm sinh
  isEpilepsy: boolean; // Động kinh
  motherSickness: string;
}

// Cấu trúc dữ liệu cho Món ăn chính hiện nay
interface MainDishState {
    isMilk: boolean;
    isFlour: boolean;
    isPorridge: boolean;
    isRice: boolean;
}

// Cấu trúc dữ liệu cho Người thường xuyên tiếp xúc
interface ContactsState {
    isGrandpa: boolean;
    isGrandma: boolean;
    isAunt: boolean; // Cô
    isAuntDi: boolean; // Dì
    isUncle: boolean; // Chú
    isUncleBac: boolean; // Bác
    isHelper: boolean;
}

const DEFAULT_MEDICAL_HISTORY: MedicalHistoryState = {
  isNormal: false, isPremature: false, isPostmature: false,
  isIntervention: false, isAsphyxia: false, isAsthma: false,
  isAllergy: false, isCongenitalHeart: false, isEpilepsy: false,
  motherSickness: ""
};

const DEFAULT_MAIN_DISH: MainDishState = {
    isMilk: false, isFlour: false, isPorridge: false, isRice: false
};

const DEFAULT_CONTACTS: ContactsState = {
    isGrandpa: false, isGrandma: false, isAunt: false, 
    isAuntDi: false, isUncle: false, isUncleBac: false, isHelper: false
};

const BatchInputModal: React.FC<BatchInputModalProps> = ({ isOpen, onClose }) => {
  // -- STATE DỮ LIỆU --
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  // Mặc định chọn "Con thứ mấy"
  const [currentItem, setCurrentItem] = useState("Con thứ mấy"); 
  
  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown states
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const [showClearMenu, setShowClearMenu] = useState(false);

  // Toast Notification State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'danger' | 'warning' | 'primary';
    onConfirm: () => void;
  } | null>(null);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('button.dropdown-trigger')) {
        setShowApplyMenu(false);
        setShowClearMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Auto hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // -- LOGIC CHUNG --
  const filteredStudents = students.slice(1).filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.code.includes(searchTerm)
  );

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const handleSelectField = (itemName: string) => {
    setCurrentItem(itemName);
    // Reset selections and simulate loading data for new field
    setStudents(prev => prev.map(s => ({...s, value: '', isSelected: false})));
  };

  const handleInputChange = (id: string, newValue: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, value: newValue } : s));
  };

  const toggleSelect = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, isSelected: !s.isSelected } : s));
  };

  const toggleSelectAll = () => {
    const allSelected = students.every(s => s.isSelected);
    setStudents(prev => prev.map(s => ({ ...s, isSelected: !allSelected })));
  };

  // ==================== HELPERS FOR JSON PARSING ====================

  const getMedicalHistory = (jsonString: string): MedicalHistoryState => {
    try {
      if (!jsonString) return { ...DEFAULT_MEDICAL_HISTORY };
      return JSON.parse(jsonString);
    } catch (e) {
      return { ...DEFAULT_MEDICAL_HISTORY };
    }
  };

  const getMainDish = (jsonString: string): MainDishState => {
    try {
        if (!jsonString) return { ...DEFAULT_MAIN_DISH };
        return JSON.parse(jsonString);
    } catch (e) {
        return { ...DEFAULT_MAIN_DISH };
    }
  };

  const getContacts = (jsonString: string): ContactsState => {
    try {
        if (!jsonString) return { ...DEFAULT_CONTACTS };
        return JSON.parse(jsonString);
    } catch (e) {
        return { ...DEFAULT_CONTACTS };
    }
  };

  // ==================== UPDATE HANDLERS ====================

  const updateMedicalField = (studentId: string, field: keyof MedicalHistoryState, value: boolean | string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const current = getMedicalHistory(student.value);
    const newVal = { ...current, [field]: value };
    handleInputChange(studentId, JSON.stringify(newVal));
  };

  const updateMainDishField = (studentId: string, field: keyof MainDishState, value: boolean) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const current = getMainDish(student.value);
    const newVal = { ...current, [field]: value };
    handleInputChange(studentId, JSON.stringify(newVal));
  };

  const updateContactsField = (studentId: string, field: keyof ContactsState, value: boolean) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const current = getContacts(student.value);
    const newVal = { ...current, [field]: value };
    handleInputChange(studentId, JSON.stringify(newVal));
  };


  // ==================== SUB-COMPONENTS (FORMS) ====================

  // 1. Tiền sử bệnh tật
  const MedicalHistoryForm = ({ id, value, isMaster }: { id: string, value: string, isMaster?: boolean }) => {
    const data = getMedicalHistory(value);
    const CheckboxItem = ({ label, field }: { label: string, field: keyof MedicalHistoryState }) => (
      <label className="flex items-center gap-2 cursor-pointer select-none group/cb">
        <div className="relative flex items-center">
            <input 
              type="checkbox" 
              checked={data[field] as boolean}
              onChange={(e) => updateMedicalField(id, field, e.target.checked)}
              className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
            />
             <svg className="absolute w-3.5 h-3.5 text-white left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <span className={`text-sm ${isMaster ? 'text-slate-800' : 'text-slate-600'} group-hover/cb:text-blue-700 transition-colors`}>{label}</span>
      </label>
    );
    return (
      <div className={`p-4 rounded-lg border ${isMaster ? 'bg-[#FFFBF5] border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
            <CheckboxItem field="isNormal" label="Bình thường" />
            <CheckboxItem field="isPremature" label="Đẻ thiếu tháng" />
            <CheckboxItem field="isPostmature" label="Đẻ thừa tháng" />
            <CheckboxItem field="isIntervention" label="Đẻ có can thiệp" />
            <CheckboxItem field="isAsphyxia" label="Đẻ ngạt" />
            <CheckboxItem field="isAsthma" label="Hen" />
            <CheckboxItem field="isAllergy" label="Dị ứng" />
            <CheckboxItem field="isCongenitalHeart" label="Tim bẩm sinh" />
            <CheckboxItem field="isEpilepsy" label="Động kinh" />
        </div>
        <div className="mt-4 pt-3 border-t border-dashed border-slate-300">
            <label className="block text-sm font-semibold text-blue-700 mb-1.5">Mẹ bị bệnh trong thời kì mang thai:</label>
            <input 
                type="text" 
                value={data.motherSickness}
                onChange={(e) => updateMedicalField(id, 'motherSickness', e.target.value)}
                placeholder="Ví dụ: Sốt siêu vi..."
                className={`w-full px-3 py-2 text-sm rounded border focus:ring-2 transition-all ${isMaster ? 'border-orange-300 bg-white focus:border-orange-500' : 'border-slate-300 bg-white focus:border-blue-500'}`}
            />
        </div>
      </div>
    );
  };

  // 2. Món ăn chính
  const MainDishForm = ({ id, value, isMaster }: { id: string, value: string, isMaster?: boolean }) => {
    const data = getMainDish(value);
    const checkboxes: { label: string, key: keyof MainDishState }[] = [
        { label: "Sữa", key: "isMilk" }, { label: "Bột", key: "isFlour" },
        { label: "Cháo", key: "isPorridge" }, { label: "Cơm", key: "isRice" },
    ];
    return (
        <div className="flex items-center gap-6">
            {checkboxes.map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none group">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={data[item.key]}
                            onChange={(e) => updateMainDishField(id, item.key, e.target.checked)}
                            className={`peer appearance-none w-5 h-5 rounded border-2 transition-all cursor-pointer bg-white ${isMaster ? 'border-orange-400 checked:bg-orange-600 checked:border-orange-600' : 'border-slate-300 checked:bg-blue-600 checked:border-blue-600'}`}
                        />
                         <svg className="absolute w-3.5 h-3.5 text-white left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className={`text-sm font-medium ${isMaster ? 'text-orange-900' : 'text-slate-700'} group-hover:opacity-80`}>{item.label}</span>
                </label>
            ))}
        </div>
    );
  };

  // 3. Người thường xuyên tiếp xúc
  const ContactsForm = ({ id, value, isMaster }: { id: string, value: string, isMaster?: boolean }) => {
    const data = getContacts(value);
    const checkboxes: { label: string, key: keyof ContactsState }[] = [
        { label: "Ông", key: "isGrandpa" }, { label: "Bà", key: "isGrandma" },
        { label: "Cô", key: "isAunt" }, { label: "Dì", key: "isAuntDi" },
        { label: "Chú", key: "isUncle" }, { label: "Bác", key: "isUncleBac" },
        { label: "Người giúp việc", key: "isHelper" },
    ];
    return (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {checkboxes.map((item) => (
                <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none group">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={data[item.key]}
                            onChange={(e) => updateContactsField(id, item.key, e.target.checked)}
                            className={`peer appearance-none w-5 h-5 rounded border-2 transition-all cursor-pointer bg-white ${isMaster ? 'border-orange-400 checked:bg-orange-600 checked:border-orange-600' : 'border-slate-300 checked:bg-blue-600 checked:border-blue-600'}`}
                        />
                         <svg className="absolute w-3.5 h-3.5 text-white left-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span className={`text-sm font-medium ${isMaster ? 'text-orange-900' : 'text-slate-700'} group-hover:opacity-80`}>{item.label}</span>
                </label>
            ))}
        </div>
    );
  };

  // 4. Tiêm chủng (Radio Group) / Thói quen ăn uống (Reuse logic)
  const RadioGroupForm = ({ id, value, isMaster, namePrefix, options }: { id: string, value: string, isMaster?: boolean, namePrefix: string, options: string[] }) => {
    return (
      <div className="flex items-center gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center">
                <input 
                  type="radio" 
                  name={`${namePrefix}_${id}`} 
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleInputChange(id, e.target.value)}
                  className={`appearance-none w-5 h-5 rounded-full border-2 transition-all cursor-pointer bg-white
                    ${isMaster 
                        ? 'border-orange-400 checked:border-orange-600 checked:bg-orange-600' 
                        : 'border-slate-300 checked:border-blue-600 checked:bg-blue-600'
                    }
                  `}
                />
                <div className={`absolute inset-0 m-auto w-2 h-2 rounded-full bg-white transition-transform ${value === option ? 'scale-100' : 'scale-0'}`}></div>
            </div>
            <span className={`text-sm ${isMaster ? 'text-orange-900 font-medium' : 'text-slate-700 font-medium'} group-hover:opacity-80`}>{option}</span>
          </label>
        ))}
      </div>
    );
  };

  // --- COMPONENT FACTORY ---
  const renderInputForm = (student: Student, isMaster: boolean) => {
      if (currentItem === "Tiền sử bệnh / tật") {
          return <MedicalHistoryForm id={student.id} value={student.value} isMaster={isMaster} />;
      }
      if (currentItem === "Món ăn chính hiện nay") {
          return <MainDishForm id={student.id} value={student.value} isMaster={isMaster} />;
      }
      if (currentItem === "Người thường xuyên tiếp xúc") {
          return <ContactsForm id={student.id} value={student.value} isMaster={isMaster} />;
      }
      if (currentItem === "Thói quen ăn uống") {
          return <RadioGroupForm id={student.id} value={student.value} isMaster={isMaster} namePrefix="eating" options={["Dễ ăn", "Khó ăn"]} />;
      }
      // Check for Vaccination Items (Assuming strict naming or contains keywords)
      if (["BCG (phòng lao)", "Bạch hầu, ho gà, uốn ván - Mũi 1", "Bạch hầu, ho gà, uốn ván - Mũi 2"].includes(currentItem)) {
          return <RadioGroupForm id={student.id} value={student.value} isMaster={isMaster} namePrefix="vaccine" options={["Có", "Không", "Không nhớ rõ"]} />;
      }

      // Default Text Input
      return (
        <>
            <input 
                type="text" 
                value={student.value}
                onChange={(e) => handleInputChange(student.id, e.target.value)}
                placeholder={isMaster ? "Nhập giá trị mẫu..." : "Nhập..."}
                className={`w-full px-3 py-2 text-sm rounded border transition-all 
                    ${isMaster 
                        ? 'border-2 border-orange-300 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-200 text-slate-900 placeholder-orange-300 font-bold' 
                        : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder-slate-300'
                    }`}
                autoFocus={isMaster}
            />
             {student.value && currentItem === "Tổng số con trong gia đình" && isNaN(Number(student.value)) && (
                <div className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-semibold animate-pulse">
                    <IconAlertCircle /> Vui lòng nhập số
                </div>
            )}
        </>
      );
  };

  // --- LOGIC SAO CHÉP MẪU ---
  const applyData = (type: 'all' | 'selected') => {
    const sourceValue = students[0].value;
    // ... logic remains same ...
    let affectedCount = 0;
    if (type === 'all') {
      affectedCount = students.length - 1; 
    } else {
      affectedCount = students.filter(s => s.isSelected && s.id !== '1').length;
    }
    if (affectedCount === 0) {
      showNotification("Vui lòng chọn ít nhất 1 học sinh (khác dòng mẫu) để áp dụng!", "error");
      return;
    }
    const confirmMessage = type === 'all' 
      ? `Bạn có chắc chắn muốn điền nhanh dữ liệu mẫu cho TẤT CẢ ${affectedCount} học sinh còn lại không?`
      : `Bạn có chắc chắn muốn điền nhanh dữ liệu mẫu cho ${affectedCount} học sinh đang chọn không?`;

    setConfirmModal({
        isOpen: true,
        title: "Xác nhận điền nhanh",
        message: confirmMessage,
        type: 'primary',
        onConfirm: () => {
            setStudents(prev => prev.map((s, index) => {
                if (index === 0) return s; 
                if (type === 'all') return { ...s, value: sourceValue };
                else return s.isSelected ? { ...s, value: sourceValue } : s;
            }));
            showNotification(`Đã điền nhanh thành công cho ${affectedCount} học sinh!`);
            setShowApplyMenu(false);
        }
    });
  };

  // --- LOGIC XÓA DỮ LIỆU ---
  const clearData = (type: 'all' | 'selected') => {
     let affectedCount = type === 'all' ? students.length : students.filter(s => s.isSelected).length;
     if (affectedCount === 0) {
       showNotification("Vui lòng chọn ít nhất 1 dòng để xóa!", "error");
       return;
     }
    const confirmMessage = type === 'all'
      ? `CẢNH BÁO: Bạn sắp XÓA TRẮNG dữ liệu của TOÀN BỘ ${affectedCount} học sinh.`
      : `Bạn có chắc chắn muốn xóa dữ liệu của ${affectedCount} học sinh đang chọn không?`;

    setConfirmModal({
        isOpen: true,
        title: "Xác nhận xóa dữ liệu",
        message: confirmMessage,
        type: 'danger',
        onConfirm: () => {
            setStudents(prev => prev.map(s => {
                if (type === 'all') return { ...s, value: '' };
                else return s.isSelected ? { ...s, value: '' } : s;
            }));
            showNotification(`Đã xóa dữ liệu của ${affectedCount} dòng thành công!`);
            setShowClearMenu(false);
        }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* --- CUSTOM CONFIRM MODAL --- */}
      {confirmModal && confirmModal.isOpen && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" onClick={() => setConfirmModal(null)}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative z-10 animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${confirmModal.type === 'danger' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {confirmModal.type === 'danger' ? <IconTrash2 size={24}/> : <IconCopy size={24}/>}
                </div>
                <h3 className={`text-lg font-bold mb-2 text-slate-900`}>
                    {confirmModal.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{confirmModal.message}</p>
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={() => setConfirmModal(null)}
                        className="px-4 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors text-sm"
                    >
                        Hủy bỏ
                    </button>
                    <button 
                        onClick={() => {
                            confirmModal.onConfirm();
                            setConfirmModal(null);
                        }}
                        className={`px-5 py-2.5 text-white font-bold rounded-lg shadow-md transition-transform active:scale-95 text-sm ${
                            confirmModal.type === 'danger' 
                            ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                        }`}
                    >
                        Đồng ý
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Modal Content */}
      <div className="relative w-full max-w-[95vw] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* TOAST NOTIFICATION */}
        {toast && (
            <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 border ${toast.type === 'success' ? 'bg-green-600 border-green-700 text-white' : 'bg-red-600 border-red-700 text-white'}`}>
                {toast.type === 'success' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : (
                    <IconAlertCircle size={20} />
                )}
                <span className="font-bold text-sm">{toast.message}</span>
            </div>
        )}

        {/* --- MODAL HEADER --- */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 z-20 relative">
            <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">Nhập hàng loạt cho {students.length} học sinh</h2>
                    <p className="text-xs text-slate-500 font-medium">Lớp Mầm 1 • Năm học 2024-2025</p>
                </div>
            </div>
            
            <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Đóng (Esc)"
            >
                <IconX size={24} />
            </button>
        </div>

        {/* --- MODAL BODY (2 COLUMNS) --- */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* LEFT SIDEBAR - Expanded width based on user request (approx 30-35%) */}
            <div className="w-[320px] lg:w-[360px] xl:w-[400px] bg-slate-50 border-r border-slate-200 flex flex-col h-full shrink-0 transition-all duration-300">
                <Sidebar 
                    data={SIDEBAR_DATA} 
                    currentItem={currentItem} 
                    onSelectField={handleSelectField} 
                />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 flex flex-col h-full min-w-0 bg-white relative">
                
                {/* TOOLBAR */}
                <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 z-30 relative shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium text-sm">Đang nhập:</span>
                        <h1 className="text-base font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-100 truncate max-w-[300px]">
                            {currentItem}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 flex-1 ml-6">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IconSearch className="text-slate-400" size={18} />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 sm:text-sm transition-all"
                                placeholder="Tìm kiếm học sinh theo tên hoặc mã..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <IconX size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* NÚT XÓA */}
                        <div className="relative">
                            <button 
                                onClick={(e) => {e.stopPropagation(); setShowClearMenu(!showClearMenu); setShowApplyMenu(false);}}
                                className={`dropdown-trigger flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border
                                    ${showClearMenu ? 'bg-red-100 border-red-200 text-red-700 ring-2 ring-red-100' : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100 hover:border-red-200'}
                                `}
                            >
                                <IconTrash2 size={18} />
                                <span>Xóa</span>
                                <IconChevronDown size={16} className="opacity-70 ml-1" />
                            </button>
                            
                            {showClearMenu && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                                    <button onClick={() => clearData('selected')} className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                                        <IconCheckSquare size={16} className="text-slate-400"/> 
                                        <span>Xóa dòng đang chọn</span>
                                    </button>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button onClick={() => clearData('all')} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium">
                                        <IconTrash2 size={16} /> 
                                        <span>Xóa tất cả dữ liệu</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* NÚT ĐIỀN NHANH (TÊN CŨ: SAO CHÉP MẪU) */}
                        <div className="relative">
                            <button 
                                onClick={(e) => {e.stopPropagation(); setShowApplyMenu(!showApplyMenu); setShowClearMenu(false);}}
                                className={`dropdown-trigger flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border
                                    ${showApplyMenu ? 'bg-orange-100 border-orange-200 text-orange-800 ring-2 ring-orange-100' : 'bg-[#FFF7ED] text-[#9A3412] border-[#FFEDD5] hover:bg-[#FFEDD5] hover:border-[#FED7AA]'}
                                `}
                            >
                                <IconCopy size={18} />
                                <span>Điền nhanh</span>
                                <IconChevronDown size={16} className="opacity-70 ml-1" />
                            </button>

                            {showApplyMenu && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                                        <div className="text-[11px] text-slate-500 mb-1">
                                            Lấy dữ liệu từ:
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                             <span className="shrink-0 bg-orange-100 text-orange-700 border border-orange-200 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Mẫu</span>
                                             <span className="font-bold text-slate-800 truncate text-sm">{students[0].name}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => applyData('selected')} className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                                        <div className="p-1.5 bg-slate-100 rounded text-slate-500"><IconCheckSquare size={16} /></div>
                                        <div>
                                            <div className="font-semibold text-slate-800">Áp dụng cho dòng chọn</div>
                                            <div className="text-xs text-slate-500">Chỉ điền vào các ô đã tick</div>
                                        </div>
                                    </button>
                                    <button onClick={() => applyData('all')} className="w-full text-left px-4 py-3 text-sm text-orange-800 hover:bg-orange-50 flex items-center gap-3 border-t border-slate-100 transition-colors">
                                        <div className="p-1.5 bg-orange-100 rounded text-orange-600"><IconCopy size={16} /></div>
                                        <div>
                                            <div className="font-bold">Áp dụng cho cả lớp</div>
                                            <div className="text-xs text-orange-600/70">Điền vào tất cả các dòng</div>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="w-px h-8 bg-slate-200 mx-1"></div>

                        {/* Nút LƯU */}
                        <button 
                            onClick={onClose}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 border border-blue-700"
                        >
                            <IconSave size={18} />
                            LƯU
                        </button>
                    </div>
                </div>

                {/* TABLE AREA */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="w-full">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="sticky top-0 z-10 shadow-sm bg-white">
                                <tr className="text-xs uppercase text-slate-600 font-bold border-b border-slate-300">
                                    <th className="py-3 px-4 w-12 text-center border-r border-slate-200 bg-slate-50">
                                        <button onClick={toggleSelectAll} className="flex items-center justify-center w-full hover:scale-110 transition-transform active:scale-95" title="Chọn tất cả">
                                            {students.every(s => s.isSelected) 
                                                ? <IconCheckSquare className="text-blue-600" size={20} /> 
                                                : <IconSquare className="text-slate-400" size={20} />}
                                        </button>
                                    </th>
                                    <th className="py-3 px-4 w-14 text-center border-r border-slate-200 bg-slate-50">STT</th>
                                    <th className="py-3 px-4 w-[15%] min-w-[100px] border-r border-slate-200 bg-slate-50">Mã HS</th>
                                    <th className="py-3 px-4 w-[25%] min-w-[180px] border-r border-slate-200 bg-slate-50">Họ và tên</th>
                                    <th className="py-3 px-4 text-blue-800 bg-blue-50 border-l border-blue-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                                        Giá trị nhập <span className="font-normal text-blue-600 ml-1">({currentItem})</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {/* DÒNG 1: DÒNG MẪU (MASTER ROW) */}
                                {students.length > 0 && (
                                    <tr className="bg-orange-50 hover:bg-orange-100 transition-colors relative group border-b-2 border-orange-200">
                                        <td className="py-3 px-4 text-center border-r border-orange-200/50 align-top">
                                           <div className="flex justify-center mt-2">
                                                <IconDot className="text-orange-400"/>
                                           </div>
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm font-bold text-orange-700 border-r border-orange-200/50 align-top pt-5">1</td>
                                        <td className="py-3 px-4 text-sm font-mono text-orange-800/80 border-r border-orange-200/50 align-top pt-5">{students[0].code}</td>
                                        <td className="py-3 px-4 border-r border-orange-200/50 align-top pt-5">
                                            <div className="flex items-center gap-2 truncate">
                                                <span className="text-sm font-bold text-orange-900 truncate">{students[0].name}</span>
                                                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-orange-500 text-white uppercase shadow-sm tracking-wide shrink-0">
                                                    Mẫu
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 bg-orange-50/50">
                                            {renderInputForm(students[0], true)}
                                        </td>
                                    </tr>
                                )}

                                {/* CÁC DÒNG CÒN LẠI */}
                                {filteredStudents.map((student, index) => (
                                    <tr 
                                        key={student.id} 
                                        className="hover:bg-blue-50 transition-colors group bg-white"
                                    >
                                        <td className="py-3 px-4 text-center border-r border-slate-100 align-top pt-5">
                                            <button onClick={() => toggleSelect(student.id)} className="text-slate-300 hover:text-blue-600 transition-colors active:scale-95">
                                                {student.isSelected ? <IconCheckSquare className="text-blue-600" size={20} /> : <IconSquare size={20} />}
                                            </button>
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm text-slate-500 font-mono border-r border-slate-100 align-top pt-5">
                                            {index + 2}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-500 font-mono border-r border-slate-100 align-top pt-5">
                                            {student.code}
                                        </td>
                                        <td className="py-3 px-4 border-r border-slate-100 text-slate-700 text-sm font-medium align-top pt-5">
                                            {student.name}
                                        </td>
                                        <td className="py-2 px-4 bg-slate-50/30 group-hover:bg-blue-50/30 transition-colors">
                                            {renderInputForm(student, false)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <div className="bg-slate-50 px-6 py-3 text-center border-t border-slate-200">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                                {searchTerm 
                                    ? `-- Tìm thấy ${filteredStudents.length} kết quả --`
                                    : `-- Hết danh sách ({students.length} học sinh) --`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BatchInputModal;