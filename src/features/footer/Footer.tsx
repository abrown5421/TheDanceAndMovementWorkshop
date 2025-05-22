import React from 'react';
import Menu from '../navbar/Menu';
import './footer.css'
import { getCurrentYear } from '../../utils/getCurrentYear';
import Block from '../../components/block/Block';
import SocialBar from '../socialBar/SocialBar';

const Footer: React.FC = () => {

  return (
    <Block tailwindClasses="bg-white flex flex-row justify-between items-center min-h-14 relative footer z-40">
        <Block tailwindClasses="flex flex-col justify-around h-full">
            <Menu />
            <Block tailwindClasses='px-5'>
                © {getCurrentYear()} The Dance and Movement Workshop. All rights reserved.
            </Block>
        </Block>
        <Block tailwindClasses="flex flex-col max-h-full">
            <SocialBar />
        </Block>
    </Block>
  );
};

export default Footer;