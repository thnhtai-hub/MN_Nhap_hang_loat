import React, { useState } from 'react';
import { SidebarSection } from '../types';
import { IconChevronRight } from '../constants';

interface SidebarProps {
  data: SidebarSection[];
  currentItem: string;
  onSelectField: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, currentItem, onSelectField }) => {
  // Trạng thái đóng/mở của các nhóm. Mặc định đóng tất cả theo yêu cầu.
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const getStatusColor = (status: string | null) => {
    if (!status) return 'hidden';
    if (status === 'Hoàn thành') return 'text-green-700 bg-green-100 border-green-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar py-6 px-4 bg-slate-50/50">
      {data.map((section, idx) => (
        <div key={idx} className="mb-8 last:mb-0">
            {/* 
               SECTION HEADING 
               Thiết kế nổi bật: Chữ đậm, màu tối, có border bên trái 
            */}
            <div className="mb-4 pl-3 border-l-4 border-blue-700">
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider leading-tight">
                    {section.title}
                 </h3>
            </div>

            <div className="space-y-3">
                {section.groups.map((group) => {
                    const isExpanded = expandedGroups[group.name];
                    const hasActiveChild = group.items.some(item => item.name === currentItem);

                    return (
                    <div 
                        key={group.name} 
                        className={`rounded-lg transition-all duration-200 border bg-white shadow-sm overflow-hidden
                            ${hasActiveChild ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'}
                        `}
                    >
                        {/* Group Header (Dropdown Trigger) */}
                        <button
                            onClick={() => toggleGroup(group.name)}
                            className={`w-full flex items-center justify-between px-3 py-3 text-left transition-colors select-none
                                ${isExpanded ? 'bg-slate-50 border-b border-slate-100' : 'hover:bg-slate-50'}
                            `}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`text-slate-400 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-90 text-blue-600' : ''}`}>
                                    <IconChevronRight size={16} />
                                </div>
                                <span className={`text-sm font-bold truncate ${hasActiveChild ? 'text-blue-800' : 'text-slate-700'}`}>
                                    {group.name}
                                </span>
                            </div>
                            
                            {group.status && (
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ml-2 shadow-sm ${getStatusColor(group.status)}`}>
                                    {group.status}
                                </span>
                            )}
                        </button>
                        
                        {/* Dropdown Content Items */}
                        {isExpanded && (
                            <div className="bg-white py-2">
                                <div className="flex flex-col">
                                    {group.items.map((item) => {
                                        const isActive = currentItem === item.name;
                                        return (
                                            <button
                                                key={item.name}
                                                onClick={() => onSelectField(item.name)}
                                                className={`relative w-full text-left px-4 py-2 text-[13px] transition-all duration-150 flex items-center justify-between gap-3
                                                    ${isActive 
                                                        ? 'bg-blue-600 text-white font-bold shadow-md mx-2 w-auto rounded-md' 
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium pl-10'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 truncate">
                                                     {/* Dấu chấm trang trí cho các mục chưa chọn */}
                                                    {!isActive && (
                                                        <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></div>
                                                    )}
                                                    <span className="truncate">{item.name}</span>
                                                </div>

                                                {/* STATUS BADGE FOR SUB-ITEM - UPDATED */}
                                                {item.status && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ml-2 whitespace-nowrap shadow-sm ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )})}
            </div>
        </div>
      ))}
      <div className="h-8"></div>
    </div>
  );
};

export default Sidebar;