export interface Student {
  id: string;
  code: string;
  name: string;
  value: string;
  isSelected: boolean;
}

export interface SidebarSubItem {
  name: string;
  status: string | null;
}

export interface SidebarItem {
  name: string;
  status: string | null;
  items: SidebarSubItem[];
}

export interface SidebarSection {
  title: string;
  groups: SidebarItem[];
}