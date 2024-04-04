import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  #root, body, html {
    height: 100%;
  }

  html {
    --white:#fff;
    --black:#000;
    --primary: #036FE3;
    --gray10: #27282A;
    --gray100: #F4F6F8;
    --gray200: #E7EBEE;
    --gray300: #CFD9E0;
    --gray400: #AEC1CC;
    --gray500: #67728A;
    --gray600: #5A657C;
    --gray700: #414D63;
    --gray800: #1B273A;
    --gray900: #111B2B;
    --dark: #333333;
    --blue100:#E8F5FF;
    --blue200:#CEECFF;
    --blue400: #40A0FF;
    --blue600:#0059C8;
    --green200:#CDF3C6;
    --green600: #006D23;
    --orange200:#FDE5C0;
    --orange500:#FFC835;
    --orange600:#B12D00;
    --purple200:#EDE3FF;
    --purple600:#6C3ECF;
    --red200: #FFE0E0;
    --red500: #DA294A;
    --red600: #BD002A;
    --redText: #c51143;

    --secondary: #5551DA;
    --border: 36px;
    --border1: 16px;
    --fontSize: 17px;
    --gray7F: #7F7F7F;
    --grayF2: #F2F2F2;
    --lightRed: #FEE6E6;
    --darkYellow: #F2994A;

    --blue: #007575;
    --green:#057642;
    --black1: #4F4F4F;
    --gray: #F2F2F2;
    --grayDark: #828282;
    --grayWhite: #F2F2F2;
    --grayLight:  #DADADA;
    --gray6: #bdbdbd;
    --text: #333333;
    --red: #ff0302;
    --redDark: #AE2A2F;
    --naviGreen: #4F808C;
    --yellow: #F2C94C;
  }

  html h1,
  html h2,
  html h3,
  html h4,
  html h5,
  html h6,
  html a,
  html p,
  html li,
  input,
  textarea,
  span,
  div,
  html,
  body,
  html a {
    margin-bottom: 0;
    color: inherit;
  }

  /* Set font-family by language */
  ${
    '' /* html:lang(en) body {}
  html:lang(vi) body {} */
  }

  body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: var(--black)
  }

  ul, ol, dl {
    margin-bottom: 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /*==========================
    NOTIFICATION
  ===========================*/
  .ant-notification-notice-with-icon {
    position: relative;
    color: var(--white);

    .ant-notification-notice-icon {
      left: 0;
      margin-left: 0;
      font-size: 30px;
      line-height: 30px;
      height: 30px;
      top: 50%;
      transform: translateY(-50%);
      color: inherit;
    }

    .ant-notification-notice-message {
      margin-bottom: 0;
      color: inherit;
    }
  }

  .ant-notification-notice-close {
    color: var(--white);
    &:hover {
      color: var(--white);
    }
  }

  input {
    &::-webkit-input-placeholder {
      color: var(--gray500) !important;
    }
    &::-moz-placeholder {
      color: var(--gray500) !important;
    }
    &:-ms-input-placeholder {
      color: var(--gray500) !important;
    }
    &:-moz-placeholder {
      color: var(--gray500) !important;
    }
  }

  code {
    background-color: #eee;
    padding: 3px;
  }

  @media screen {
    .orderLabelPrintContainer {
      display: none;
    }
  }
`;

export default GlobalStyle;
