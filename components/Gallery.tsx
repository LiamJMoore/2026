
import React, { useState } from 'react';
import { MEME_DEPOT_URL } from '../constants';
import { ExternalLink, Database, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const RAW_MEME_URLS = [
    "https://i.ibb.co/HT7s7rXz/066e3df2-c8fe-4667-8894-a9f0cc3b5094-png.jpg",
    "https://i.ibb.co/YTwcrH3b/222-png.jpg",
    "https://i.ibb.co/B29ykN1x/333-png.jpg",
    "https://i.ibb.co/MDPqTTmx/d07482b7-d9e7-4223-b3c5-1b804e0be8b5-png.png",
    "https://i.ibb.co/hTr6tFL/Ew-H7-s2-U-jpg.jpg",
    "https://i.ibb.co/xr8g0dP/G1jcvvu-XUAANr3-T-jfif.jpg",
    "https://i.ibb.co/NdScqjzc/G01tz-En-WMAAqez-U-jfif.jpg",
    "https://i.ibb.co/FLb07r0P/G1za9-Qp-Xk-AAbe3-J-jfif.jpg",
    "https://i.ibb.co/DHRr8DLP/G2-I5l-Sq-Ws-AAOIF9-jfif.jpg",
    "https://i.ibb.co/PzgprwCd/G2-Ia-Mbe-Xk-AAGt9-V-jfif.jpg",
    "https://i.ibb.co/67d1P9wF/G2ip7-OXUAA7r-KP-jfif.jpg",
    "https://i.ibb.co/Kzb26ZYd/G2-Lj-MPx-WUAA3i-G2-jfif.jpg",
    "https://i.ibb.co/hR2GfDqm/G2l-Mx-W2-WEAAhy-UE-jfif.jpg",
    "https://i.ibb.co/p687mKRp/G2-Mfeq5-WQAESFoz-jfif.jpg",
    "https://i.ibb.co/kgXKSnBY/G2-NV0-6-WQAA4-Lr9-jfif.jpg",
    "https://i.ibb.co/h3z7MPs/G2-Qz-Xx-CWEAAjvvu-jfif.jpg",
    "https://i.ibb.co/5XzLpZkG/G3-ATVBWWUAAZtxo-jfif.jpg",
    "https://i.ibb.co/xSg7q6ws/G3-E5-LWMXk-AAi-M0-O-jfif.jpg",
    "https://i.ibb.co/jNz1VgZ/G3-Ejt-W3-WIAAx2-Vt-jfif.jpg",
    "https://i.ibb.co/gMNmggjk/G3e-JZf-VWs-AAne-EQ-jfif.jpg",
    "https://i.ibb.co/wrs8qJLg/G3-ESn8-PWEAAn-LHk-jfif.jpg",
    "https://i.ibb.co/4ZgB4jSr/G3-JKVe-TXs-AEk-BTK-jfif.jpg",
    "https://i.ibb.co/mCv1Fsxq/G3-KWCRYXQAAAd-Wx-jfif.jpg",
    "https://i.ibb.co/tMB5HxHz/G3os-J5-OWAAEh-Elp-jfif.jpg",
    "https://i.ibb.co/SwXRjXpQ/G84-Qb5-OWw-AAf-LIg-jfif-1.jpg",
    "https://i.ibb.co/vv4Ddg9G/G3-T9-PMSX0-AAnrvt-jfif.jpg",
    "https://i.ibb.co/bRbcXBF5/G3-V8-Nh-Ia-AAARFi-Z-jfif.jpg",
    "https://i.ibb.co/6757p0hz/G4-He-WJa-Xw-AAuvqx-jfif.jpg",
    "https://i.ibb.co/0vzSW8H/G4-HV0qi-WMAAl-7y-jfif.jpg",
    "https://i.ibb.co/LXd5JKRf/G4mmc-RRWo-AAW4h-Y-jfif.jpg",
    "https://i.ibb.co/rR73ykWx/G4rpr-Pc-XUAAf9-LJ-jfif.jpg",
    "https://i.ibb.co/PV9wt9Q/G8822-PIXk-AE8ha-jfif.jpg",
    "https://i.ibb.co/My8TgJw1/G5-v-HBb-XAAAa3tp-jfif.jpg",
    "https://i.ibb.co/fVfYTmXP/G5-Ev-Br0-Xc-AA3-X-M-jfif.jpg",
    "https://i.ibb.co/ZptcTXss/G5hj5b-IXYAAL87-E-jfif.jpg",
    "https://i.ibb.co/wrh6j81p/G5-LI0-En-Xc-AAVGzn-jfif.jpg",
    "https://i.ibb.co/67xX48kf/G5lui-DRac-AEDEnb-jfif.jpg",
    "https://i.ibb.co/Wp5H7yQt/G5-RXz-Sj-XUAEujm7-jfif.jpg",
    "https://i.ibb.co/vC8DxrWg/G5u09-NSX0-AABg-Rp-jfif.jpg",
    "https://i.ibb.co/qLZLQJWv/G6jo-Pr3-WIAAx7-HW-jfif.jpg",
    "https://i.ibb.co/5Xg098SF/G6nkr-Xk-WAAAODXv-jfif.jpg",
    "https://i.ibb.co/prP74X0X/G6s30d5b-YAAD980-jfif.jpg",
    "https://i.ibb.co/MDMbxHv1/G6x3-Vi-UWIAEkk-GI-jfif.jpg",
    "https://i.ibb.co/NnNMcWq5/G7-BJo0-Xc-AQnp-Ka-jfif.jpg",
    "https://i.ibb.co/jvz8w12F/G7-MOsgag-AE6-Qgg-jfif.jpg",
    "https://i.ibb.co/B5gY1GVh/G7-PGQNWMAE13-Ic-png.png",
    "https://i.ibb.co/wF1cpwZd/G7-Iyjr-Xc-AAbp-ML-jfif.jpg",
    "https://i.ibb.co/twSh8VzS/G7a-R8-TNXw-AAtuz-B-1-jfif.jpg",
    "https://i.ibb.co/DHRrkS62/G7b-Ey-XMWAAAJnsn-jfif-1.jpg",
    "https://i.ibb.co/jpKGtz1/G7bt-TVQXYAAZuj-C-jfif.jpg",
    "https://i.ibb.co/FkyGZ6L8/G7c-QVIMXk-AAikr-R-jfif-1.jpg",
    "https://i.ibb.co/SDTTCyTp/G7f-Hx-MRWg-AA-Aq-O-jfif.jpg",
    "https://i.ibb.co/cSQWgdJP/G7hu-WOl-Wc-AAOw-Gg-jfif.jpg",
    "https://i.ibb.co/dwMK38z4/G7i-PW-Ea-YAAj5-TH-jfif.jpg",
    "https://i.ibb.co/nNdydG97/G7k-km-QW8-AEb-PDZ-jfif.jpg",
    "https://i.ibb.co/bjLC5RLZ/G7ksjh3-Ww-AAqu-RF-jfif.jpg",
    "https://i.ibb.co/TDzkDnmx/G7l5e-Jz-WIAATRwn-jfif.jpg",
    "https://i.ibb.co/0jQbpYsX/G7lb-Vrg-Xw-AAvzc-O-jfif.jpg",
    "https://i.ibb.co/1Gkt37Ky/G7lc8ch-WUAA1h4-R-jfif-1.jpg",
    "https://i.ibb.co/j9Q81SJb/G7lk-Hxl-Xg-AAEb05-jfif.jpg",
    "https://i.ibb.co/5h3TY1LG/G7l-Udq5-XMAAc-Ui-I-jfif.jpg",
    "https://i.ibb.co/qZtCd0K/G7mvc-YHXQAAEJ2-jfif.jpg",
    "https://i.ibb.co/skVMDwD/G7pck-WUaw-AAHuj0-jfif.jpg",
    "https://i.ibb.co/zh6wQjSz/G7pz-DJ0a4-AEucwc-jfif.jpg",
    "https://i.ibb.co/fGPrF3Rt/G7r-ETf-Vb-YAAJ3th-jfif.jpg",
    "https://i.ibb.co/Wqd3Bgh/G7s-E4d-Db-IAAtgg-S-jfif.jpg",
    "https://i.ibb.co/60Cvn4GG/G88mt0-WAAM7m-VQ-jfif-1.jpg",
    "https://i.ibb.co/nNVJgwvB/G7ty-Zi8-Xc-AA-ga-U-jfif.jpg",
    "https://i.ibb.co/hRHbPpx7/G7v-X6j-XQAMj-ZR3-jfif.jpg",
    "https://i.ibb.co/7JNsZJMG/G7v-Fvs-WXMAAA0s-A-jfif.jpg",
    "https://i.ibb.co/B26Fp9kT/G7v-JBi2-Ws-AE7a6j-jfif.jpg",
    "https://i.ibb.co/rG8cHmZC/G7v-Sm-RNXw-AAgv-M3-jfif.jpg",
    "https://i.ibb.co/kghkT4By/G7vtj7l-W4-AIRbzw-1-jfif.jpg",
    "https://i.ibb.co/wrgYsPXy/G7-Wf0-X8-X0-AADAt-Q-jfif.jpg",
    "https://i.ibb.co/ns1L7Jz7/G7-XA-nl-Ww-AA3v-Bb-jfif.jpg",
    "https://i.ibb.co/wFsNdNKX/G7x-G7b-QXw-AAh-Hsl-1-jfif.jpg",
    "https://i.ibb.co/zWx7bg3z/G7-XJi-UQWIAATWDU-jfif.jpg",
    "https://i.ibb.co/Q7J9v6zn/G7x-KMdc-Wo-AAHGPN-1-jfif.jpg",
    "https://i.ibb.co/xK9jNLCL/G7xo-Rxh-W8-AAZ-w-J-jfif.jpg",
    "https://i.ibb.co/whW3F9Qn/G8d0r-Ve-WUAA17-ZC-jfif.jpg",
    "https://i.ibb.co/xtXLZQkW/G8d-Omq3-W4-AArho-E-jfif.jpg",
    "https://i.ibb.co/nNwmGgqR/G8d-OPO3-Xw-AAr-CKt-jfif.jpg",
    "https://i.ibb.co/TBkzRKJT/G8d-U0ft-XAAA0l-Xn-jfif.jpg",
    "https://i.ibb.co/9kPCY2QB/G8ixi8-TWs-AAj-Gh-K-jfif.jpg",
    "https://i.ibb.co/SD2JkHM9/G8-NHy-O5-WAAUg-E9-jfif-1.jpg",
    "https://i.ibb.co/0jMky86D/G8-Oxi-Jd-X0-Ag-Ivb-M-jfif.jpg",
    "https://i.ibb.co/dJXj5wYv/G8p2-VVUWIAEb-L7-Y-jfif.jpg",
    "https://i.ibb.co/1YhCWrRC/G8p-Hkh2b-MAAMZHL-jfif.jpg",
    "https://i.ibb.co/ZzMh8WbH/G8-QDHD1-Xs-Aw-Ub9-A-jfif.jpg",
    "https://i.ibb.co/JwkQQ9tz/G8t-Lc-QX0-AAr-P8j-jfif.jpg",
    "https://i.ibb.co/FbrBBQF7/G8tfj-JAWUAA3-A3b-jfif.jpg",
    "https://i.ibb.co/DHhh7Vkt/G8t-O2-Xia0-AA0-PEM-jfif.jpg",
    "https://i.ibb.co/5gfKtsYh/G8-Uh-Rue-Xk-AQzb5-R-jfif.jpg",
    "https://i.ibb.co/Cp4mhnyC/G8uy-MVNXo-AA6-XGj-jfif.jpg",
    "https://i.ibb.co/CpsDq00S/G8uz6-N7bo-AABdx-H-jfif.jpg",
    "https://i.ibb.co/4ZmkjGT1/G8v7j-ABWIAE57mc-1-jfif.jpg",
    "https://i.ibb.co/Kj5kbwgW/G8v-Wba-Ka-MAAl-XLE-jfif.jpg",
    "https://i.ibb.co/q34JPH71/G8w-MOSKa-QAA-NJA-jfif.jpg",
    "https://i.ibb.co/hxqRP1xZ/G8x-S-4-a-IAA8-WPZ-jfif.jpg",
    "https://i.ibb.co/GfVm1CyD/G8y1-Xe-XIAA6-m-C-jfif.jpg",
    "https://i.ibb.co/prRVM5P6/G8zs-A5-Ob-AAA3d-Z-jfif.jpg",
    "https://i.ibb.co/svH3C55Q/G9-BZ-Vo-Wo-AA3-URp-jfif.jpg",
    "https://i.ibb.co/S4B6w2tV/G9-Dfc-B0bo-AAZYa-H-jfif.jpg",
    "https://i.ibb.co/bgY1mPWR/G9-EE8-ea-UAA1-NPx-jfif.jpg",
    "https://i.ibb.co/TBx9r0XZ/G9-EFbf-FXs-AAj-Pk-K-jfif.jpg",
    "https://i.ibb.co/7JXP7TGZ/G9-GHASx-WAAAambq-jfif.jpg",
    "https://i.ibb.co/LhZCTS4t/G9-GN3lr-Wg-AAfou-N-jfif.jpg",
    "https://i.ibb.co/LXCP83cz/G9-H2u-P6-XQAAh20h-jfif.jpg",
    "https://i.ibb.co/1GwGZ9gg/G9-J-LNOb-MAAa-Nlb-jfif.jpg",
    "https://i.ibb.co/cct9NK0N/G9-J6-Hie-W8-AAB-Fk-jfif.jpg",
    "https://i.ibb.co/CsvQdwN6/G9-Kwdq-b-QAA-jw-jfif.jpg",
    "https://i.ibb.co/YFMR68BY/G9-Ln-Rd-XXYAAHWES-jfif.jpg",
    "https://i.ibb.co/W4cCW668/G9-MDx-GXWQAAdc8-E-jfif.jpg",
    "https://i.ibb.co/YTbVHg8C/G9-Mt-St1-Wo-AQYF1-K-jfif.jpg",
    "https://i.ibb.co/xSBqz1zT/G9-P02zz-Xk-AAKY-Z-jfif.jpg",
    "https://i.ibb.co/TB5KHk5k/G9-Pk7-J6-W8-AAq86-J-jfif.jpg",
    "https://i.ibb.co/q33Mrtk8/G9-Po-Ydebo-AAVQ3-A-jfif.jpg",
    "https://i.ibb.co/ksjMDTRG/G9-Pxxm-Zbk-AAo-UJx-jfif.jpg",
    "https://i.ibb.co/Rk58spWd/G9-Qcvt-KXIAAhtr-M-jfif.jpg",
    "https://i.ibb.co/ynJXtJhf/G9-QHIJz-WQAA1d-QR-jfif.jpg",
    "https://i.ibb.co/WvFzXZpB/G9-QN-DEXo-AAO6p-U-jfif.jpg",
    "https://i.ibb.co/9mmRm82t/G9-QNwnxa-IAAYWUR-jfif.jpg",
    "https://i.ibb.co/G44GMz5m/G9-Qqr-Ktb0-AAs3u-K-jfif.jpg",
    "https://i.ibb.co/Y4pSFk8p/G10-U6h-NXg-AAX-Ic-jfif.jpg",
    "https://i.ibb.co/CK0S6g5y/G13u-SCDXAAAn-ZI5-jfif.jpg",
    "https://i.ibb.co/7d8v34p8/G19egkx-WUAA9-R1s-jfif.jpg",
    "https://i.ibb.co/nqy34N02/G42-Nb-DCXw-AA8-Xe-G-jfif.jpg",
    "https://i.ibb.co/8Lgct03S/G50edu-RWIAEjt0k-jfif.jpg",
    "https://i.ibb.co/fdVv7CpV/G54vugs-XMAEga2t-jfif.jpg",
    "https://i.ibb.co/GvwzyKrW/G55-MUYUXg-AIyfz-L-jfif.jpg",
    "https://i.ibb.co/nNB9tpNK/G59zzw9-XAAAff-Of-jfif.jpg",
    "https://i.ibb.co/7Jp3FpcP/G70-Ndkn-XIAAHq9m-jfif.jpg",
    "https://i.ibb.co/C3HyJ7wK/G70x-r-KWQAA3g-As-jfif.jpg",
    "https://i.ibb.co/TD7JytLV/G72u9-E4-WYAAE9-Wv-jfif.jpg",
    "https://i.ibb.co/zW22tCFY/G72u-Dec-W4-AAJw-m-1-jfif.jpg",
    "https://i.ibb.co/7tvkDTbv/G75b-Cj-Uak-AAgj-Us-jfif.jpg",
    "https://i.ibb.co/fYwKBXGL/G75-VWe-UWAAEKYEi-jfif.jpg",
    "https://i.ibb.co/8LGtFWMr/G75wf-Qeb-EAAw-It-jfif.jpg",
    "https://i.ibb.co/QjDt86z7/G76-B-Pd-WYAEO4x-E-jfif.jpg",
    "https://i.ibb.co/zHFPBWN8/G76-NQw-Pag-AAq87p-jfif.jpg",
    "https://i.ibb.co/q3VYcWbC/G76tbt2ag-As94s-Z-jfif.jpg",
    "https://i.ibb.co/TDKQysPZ/G76yesvag-AEjw-Se-jfif.jpg",
    "https://i.ibb.co/mVp1G4vz/G78-Vm-F-WUAky-Wb-Z-png.png",
    "https://i.ibb.co/gLGcC4CM/G80-F-c-PW0-AAf6b-T-jfif.jpg",
    "https://i.ibb.co/hRbXKzCP/G82-S8db-XYAAQYql-jfif.jpg",
    "https://i.ibb.co/9kxfPMk7/G82-S8n5-Xg-AAhz-Io-jfif.jpg",
    "https://i.ibb.co/Zz9LHc26/G83z8-WHWQAAlwa5-jfif.jpg",
    "https://i.ibb.co/S41sw3kS/G84be-Q-Wc-AAn6-PH-jfif.jpg",
    "https://i.ibb.co/5WH5sLKd/G85-Cz-Kubg-AAIux-jfif.jpg",
    "https://i.ibb.co/RktBt13B/G85-Jrzz-Ww-AA9-Pe-O-jfif.jpg",
    "https://i.ibb.co/m5ZcdR62/G85-S-Dag-AUPF-s-jfif.jpg",
    "https://i.ibb.co/3y549d49/G85-U-sg-Xc-AAXu-LZ-jfif.jpg",
    "https://i.ibb.co/0jZ8hvzv/G85-XMjlao-AA4-GHm-jfif.jpg",
    "https://i.ibb.co/Q3MqHTzP/G85-ZRl-Bbo-AA4j1-K-jfif.jpg",
    "https://i.ibb.co/1GxSYw83/G86-dzs-Xc-AA26-Kl-jfif.jpg",
    "https://i.ibb.co/j9KCdBzf/G87m-BTc-Xk-AEZq-LH-1-jfif.jpg",
    "https://i.ibb.co/VWGqKGvR/G87q-Jn-YWk-AADJq-T-jfif.jpg",
    "https://i.ibb.co/tpLPnkSg/G87-Qri9bk-AAq2-Fn-jfif.jpg",
    "https://i.ibb.co/k2JwxH5Y/G87w-JUn-XUAA8s-MF-jfif.jpg",
    "https://i.ibb.co/zWvyp6yY/G87-Wtkk-WUAAp-O6-jfif.jpg",
    "https://i.ibb.co/yFRFCpnS/G88-IYWLWEAAYHe-I-jfif.jpg",
    "https://i.ibb.co/ksPYMvrX/G88qdz-XQAAa-YJ4-png.png",
    "https://i.ibb.co/Cp6kBj1x/G198kuu-Xo-AARb-C9-jfif.jpg",
    "https://i.ibb.co/Rk6tcFQ0/G385ovn-WAAAd-LN-jfif.jpg",
    "https://i.ibb.co/5gDvR1x3/G410-78-WEAA0-BL-jfif.jpg",
    "https://i.ibb.co/3yH6smHS/G811nm-Lag-AEB1-US-jfif.jpg",
    "https://i.ibb.co/Nnx2XdZR/G837-Bb-XUAAf-QMc-jfif.jpg",
    "https://i.ibb.co/CfrrpP0/G838-Eqx-WQAAIuf-V-jfif.jpg",
    "https://i.ibb.co/Lzgk8drm/G844iq-LXUAAqwbi-jfif.jpg",
    "https://i.ibb.co/rJpBFH0/G880m-E0-Xw-AE4csh-png.png",
    "https://i.ibb.co/Q31sX03t/G889-DWe-WEAAGb-Xc-jfif.jpg",
    "https://i.ibb.co/n8DTCj28/G82899-HXYAA5vmd-jfif.jpg",
    "https://i.ibb.co/3yGSTGpg/photo-2025-09-12-19-42-18-jpg.jpg",
    "https://i.ibb.co/zVrrDxF1/photo-2025-12-26-13-53-10-jpg.jpg",
    "https://i.ibb.co/BK4FqCwX/photo-2025-12-26-14-30-13-jpg.jpg",
    "https://i.ibb.co/PGzN36Qx/photo-2025-12-26-16-15-32-jpg.jpg",
    "https://i.ibb.co/pvJfS4cS/photo-2025-12-26-18-57-59-jpg.jpg",
    "https://i.ibb.co/SD8QHnLt/photo-2025-12-26-20-18-51-jpg.jpg",
    "https://i.ibb.co/nMCJkFbX/photo-2025-12-26-21-47-58-jpg.jpg",
    "https://i.ibb.co/PGzdQTTQ/photo-2025-12-27-00-16-17-jpg.jpg",
    "https://i.ibb.co/Y4tzxkLt/photo-2025-12-27-18-35-38-jpg.jpg",
    "https://i.ibb.co/Df4f9HJn/photo-2025-12-27-21-09-42-jpg.jpg",
    "https://i.ibb.co/wZjGxg06/photo-2025-12-27-21-36-09-jpg.jpg",
    "https://i.ibb.co/xt8zBgyz/photo-2025-12-27-21-58-37-jpg.jpg",
    "https://i.ibb.co/LDfRbnsC/photo-2025-12-27-22-18-46-jpg.jpg",
    "https://i.ibb.co/5X0PtfC6/photo-2025-12-27-22-19-52-jpg.jpg",
    "https://i.ibb.co/B5XpsNJ7/photo-2025-12-27-22-28-27-jpg.jpg"
];

// Ensure unique URLs
const UNIQUE_MEME_URLS = Array.from(new Set(RAW_MEME_URLS));

export const Gallery: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(12);

    const showMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    return (
        <section id="gallery" className="py-24 bg-abyss relative border-t border-cyan-900/30">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display text-4xl md:text-5xl font-bold text-white mb-2"
                    >
                        MEMETIC <span className="text-neon-cyan">ARCHIVE</span>
                    </motion.h2>
                    <p className="font-mono text-cyan-500/60 tracking-widest text-sm">COMMUNITY PROPAGANDA // DEPLOY AT WILL</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {UNIQUE_MEME_URLS.slice(0, visibleCount).map((url, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i % 4 * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative aspect-square overflow-hidden bg-cyan-950/20 rounded-sm border border-cyan-900/50 hover:border-neon-cyan transition-colors"
                        >
                            <img 
                                src={url} 
                                alt={`Meme ${i}`} 
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                                <a 
                                    href={url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="p-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 rounded-full border border-neon-cyan text-neon-cyan transition-colors"
                                    title="View Full Size"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleCount < UNIQUE_MEME_URLS.length && (
                    <div className="mt-12 text-center">
                        <button 
                            onClick={showMore}
                            className="group relative px-8 py-3 bg-black/50 border border-cyan-700 hover:border-neon-cyan transition-colors overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative font-display font-bold text-white flex items-center gap-2 text-sm tracking-wider">
                                LOAD MORE INTEL <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                )}

                {/* Additional Resource Link */}
                <div className="mt-16 flex justify-center">
                    <a 
                        href={MEME_DEPOT_URL} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-slate-500 hover:text-neon-cyan transition-colors font-mono text-xs border-b border-transparent hover:border-neon-cyan pb-1"
                    >
                        <Database size={14} />
                        ACCESS COMPLETE ARCHIVE ON MEMEDEPOT
                    </a>
                </div>
            </div>
        </section>
    );
};
