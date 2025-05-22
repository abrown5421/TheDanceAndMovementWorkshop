import React from 'react';
import Menu from '../navbar/Menu';
import './footer.css'
import { getCurrentYear } from '../../utils/getCurrentYear';
import Block from '../../components/block/Block';
import SocialBar from '../socialBar/SocialBar';

const Footer: React.FC = () => {

  return (
    <Block tailwindClasses="bg-white flex flex-col sm:flex-row justify-between items-center min-h-14 relative footer z-40">
        <Block tailwindClasses="flex flex-col justify-around h-full w-full">
            <Block tailwindClasses='block sm:hidden font-primary flex flex-col justify-center items-center p-5'>
                <Block tailwindClasses='flex flex-row'></Block>
                <Block tailwindClasses='flex flex-row flex-wrap-nowrap'>
                <span className="whitespace-nowrap">
                    The Dance <span className="text-primary px-2">&</span> Movement Workshop
                </span>
                </Block>
            </Block>
            <Menu />
            <Block tailwindClasses='hidden sm:block px-5'>
                © {getCurrentYear()} The Dance and Movement Workshop. All rights reserved.
            </Block>
        </Block>
        <Block tailwindClasses="flex flex-col max-h-full">
            <SocialBar />
            <Block tailwindClasses='block sm:hidden p-5'>
                © {getCurrentYear()} The Dance and Movement Workshop. All rights reserved.
            </Block>
        </Block>
    </Block>
  );
};

export default Footer;