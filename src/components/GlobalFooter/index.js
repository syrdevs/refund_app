import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Row, Col, Icon } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale';


const GlobalFooter = ({ className, links, copyright, color, fontcolor}) => {
  const clsString = classNames(styles.globalFooter, className);
  const footermargin= {marginTop:'10px'}
  const fcolor={color: fontcolor};
  return (
    <footer className={clsString} style={{backgroundColor: color}}>

      <div className={styles.links} style={{height:'80px'}}>
        <Row style={fcolor}>
          <Col sm={24} md={19} xs={24} style={footermargin}>
            <p className={styles.foots}>

                {formatMessage({ id: 'app.footer.titleyear' })}
                <span> &copy;</span>
                {formatMessage({ id: 'app.footer.title' })}

            </p>
            <p className={styles.foots}>{formatMessage({ id: 'app.footer.title2' })}</p>
            <p className={styles.foots}></p>
          </Col>
          <Col sm={0} md={5} xs={0} style={footermargin}>
            <p className={styles.foots} style={{float:'left'}}>
              {formatMessage({ id: 'app.footer.suppordname' })}
              </p> <br/>
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
