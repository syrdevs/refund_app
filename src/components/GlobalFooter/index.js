import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Row, Col } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';


const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString} style={{backgroundColor:'#009CD7'}}>

      <div className={styles.links} style={{height:'80px'}}>
        <Row>
          <Col sm={24} md={19} xs={24}>
            <p className={styles.foots}>{formatMessage({ id: 'app.footer.title1' })}</p>
            <p className={styles.foots}>{formatMessage({ id: 'app.footer.title2' })}</p>
          </Col>
          <Col sm={0} md={5} xs={0}>

            <p className={styles.foots} style={{float:'left'}}>{formatMessage({ id: 'app.footer.suppordname' })}</p> <br/>
            <p className={styles.foots} style={{float:'left'}}>{formatMessage({ id: 'app.footer.suppordtel' })}</p> <br/>
            <p className={styles.foots} style={{float:'left'}}>{formatMessage({ id: 'app.footer.suppordemail' })}</p>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default GlobalFooter;



{/*{links && (
        <div className={styles.links}>
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}



      */}
