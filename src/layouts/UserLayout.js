import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Divider, Row, Col } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/kartinka_21.png';
import backgrounds from '../assets/fon_fin.jpg';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>{/* Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品*/}</Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div >
          <Row>
            <Col sm={20} md={8} xs={20}>
              <div className={styles.lang}>
                <Row>
                  <Col span={6}>
                    <div  className={styles.lang} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <img
                        alt="logo"
                        className={styles.logo}
                        src={logo}
                      />
                    </div>
                  </Col>
                  <Col span={18}>
                    <div className={styles.lang} style={{backgroundColor:'white', display: 'table-caption'}}>
                      <p className={styles.titlep}>{formatMessage({ id: 'app.login.headertitle' })}</p>
                    </div>
                  </Col>
                </Row>
              </div>
              <Divider style={{margin: '0px', backgroundColor: '#0073BE', height: '7px'}} />

            </Col>
            <Col sm={4} md={16} xs={4}>
              <div className={styles.lang} style={{backgroundColor:'white'}}>
                <SelectLang/>
              </div>
              <Divider style={{margin: '0px', backgroundColor: '#A9B976', height: '7px'}} />
            </Col>
          </Row>

        </div>
        <div className={styles.content} style={{ backgroundImage: `url(${backgrounds})`, backgroundPosition: '100% 100%', marginBottom: '-40px' }}>
          <div className={styles.top}>
            <div className={styles.header}>
              {
                <Link to="/">
                  <h1 className={styles.title}>{formatMessage({ id: 'app.login.entrу' })}</h1>
                </Link>
              }
            </div>
          </div>
          {children}
        </div>
        <GlobalFooter/>
      </div>
    );
  }
}

export default UserLayout;
