import { createGlobalStyle } from "styled-components";
// import reset from "styled-reset";
import GmarketSansMedium from "../fonts/GmarketSansMedium.otf";
import Bondrians from "../fonts/Bondrians.otf";
import Lemosty from "../fonts/Lemosty.otf";

const GlobalStyle = createGlobalStyle`
  
    @font-face {
        font-family: 'GmarketSansMedium';
        src: local('GmarketSansMedium'), local('GmarketSansMedium');
        font-style: normal;
        src: url(${GmarketSansMedium}) format('opentype');
    }
    @font-face {
        font-family: 'Bondrians';
        src: local('Bondrians'), local('Bondrians');
        font-style: normal;
        src: url(${Bondrians}) format('opentype');
    }
    @font-face {
        font-family: 'Lemosty';
        src: local('Lemosty'), local('Lemosty');
        font-style: normal;
        src: url(${Lemosty}) format('opentype');
    }
    *{
    /* box-sizing:border-box; */
   }
`;
export default GlobalStyle;

// reset이랑 box-sizing 적용 안됐었음
