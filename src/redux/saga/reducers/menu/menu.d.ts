interface IMenu {
  breadcrumb: {
    [key: string]: {
      icon: React.ReactNode;
      name: string;
    };
  };
  topMenu: Array<IMenuItem>;
  sideMenu: {
    [key: string]: ISidebar;
  };
  currentTopMenu: string | null;
  currentSidebar: ISidebar;
}

type IMenuItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

type ISidebar = ISidebarItem[];

type ISidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  routes?: IMenuItem[];
};
