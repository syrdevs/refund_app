import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { formatMessage } from 'umi/locale';
import pathToRegexp from 'path-to-regexp';
import { urlToList } from '../_utils/pathTools';
import styles from './index.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDatabase,
  faSyncAlt,
  faCreditCard,
  faListAlt,
  faFileExcel,
  faHome,
  faBookOpen,
  faCalendarAlt,
  faFileInvoice,
  faUserCog,
  faMoneyBill,
  faFileContract,
  faFileAlt,
  faFileSignature,
  faFileMedicalAlt,
  faUserMd,
  faChartBar,
  faSearch,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon}/>;
  }
  if (typeof icon === 'string') {
    switch (icon) {
      case 'faFileContract':
        return <Icon><FontAwesomeIcon icon={faFileContract}/></Icon>;
      case 'faFileAlt':
        return <Icon><FontAwesomeIcon icon={faFileAlt}/></Icon>;
      case 'faFileSignature':
        return <Icon><FontAwesomeIcon icon={faFileSignature}/></Icon>;
      case 'faFileMedicalAlt':
        return <Icon><FontAwesomeIcon icon={faFileMedicalAlt}/></Icon>;
      case 'faChartBar':
        return <Icon><FontAwesomeIcon icon={faChartBar}/></Icon>;
      case 'faListAlt':
        return <Icon><FontAwesomeIcon icon={faListAlt}/></Icon>;
      case 'faCreditCard':
        return <Icon><FontAwesomeIcon icon={faCreditCard}/></Icon>;
      case 'faListAlt':
        return <Icon><FontAwesomeIcon icon={faListAlt}/></Icon>;
      case 'faFileExcel':
        return <Icon><FontAwesomeIcon icon={faFileExcel}/></Icon>;
      case 'faHome':
        return <Icon><FontAwesomeIcon icon={faHome}/></Icon>;
      case 'faBookOpen':
        return <Icon><FontAwesomeIcon icon={faBookOpen}/></Icon>;
      case 'faCalendarAlt':
        return <Icon><FontAwesomeIcon icon={faCalendarAlt}/></Icon>;
      case 'faFileInvoice':
        return <Icon><FontAwesomeIcon icon={faFileInvoice}/></Icon>;
      case 'faUserCog':
        return <Icon><FontAwesomeIcon icon={faUserCog}/></Icon>;
      case 'faMoneyBill':
        return <Icon><FontAwesomeIcon icon={faMoneyBill}/></Icon>;
      case 'faDatabase':
        return <Icon><FontAwesomeIcon icon={faDatabase}/></Icon>;
      case 'faUserMd':
        return <Icon><FontAwesomeIcon icon={faUserMd}/></Icon>;
      case 'faSearch':
        return <Icon><FontAwesomeIcon icon={faSearch}/></Icon>;
      case 'faFolderOpen':
        return <Icon><FontAwesomeIcon icon={faFolderOpen}/></Icon>;
      default:
        return <Icon><FontAwesomeIcon icon={faSyncAlt}/></Icon>;
    }


  }
  return icon;
};

export const getMenuMatches = memoizeOne(
  (flatMenuKeys, path) => flatMenuKeys.filter(item => item && pathToRegexp(item).test(path)),
  isEqual,
);

export default class BaseMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.getSelectedMenuKeys = memoizeOne(this.getSelectedMenuKeys, isEqual);
    this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
  }

  /**
   * Recursively flatten the data
   * [{path:string},{path:string}] => {path,path2}
   * @param  menus
   */
  getFlatMenuKeys(menus) {
    let keys = [];
    menus.forEach(item => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push(item.path);
    });
    return keys;
  }

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item, parent);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname =>
    urlToList(pathname).map(itemPath => getMenuMatches(this.flatMenuKeys, itemPath).pop());

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const name = item.locale ? formatMessage({ id: item.locale }) : item.name;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const name = item.locale ? formatMessage({ id: item.locale }) : item.name;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    const { Authorized } = this.props;
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location: { pathname },
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys) {
      props = {
        openKeys,
      };
    }
    const { handleOpenChange, style, menuData } = this.props;
    return (
      <Menu
        key="Menu"
        mode={mode}
        theme={theme}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={style}
        className={mode === 'horizontal' ? 'top-nav-menu' : ''}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
