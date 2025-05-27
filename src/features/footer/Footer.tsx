import React from 'react';
import Menu from '../navbar/Menu';
import './footer.css'
import { getCurrentYear } from '../../utils/getCurrentYear';
import Block from '../../components/block/Block';
import SocialBar from '../socialBar/SocialBar';
import { useAppSelector } from '../../app/store/hooks';
import Transition from '../../components/transition/Transition';
import clsx from 'clsx';
import { useNavigationHook } from '../../hooks/NavigationHook';

const Footer: React.FC = () => {
  const handleNavigation = useNavigationHook()
  const pages = useAppSelector((state) => state.pages.pages.filter((page) => page.PageNavConfig.Aux))
  
  return (
    <Block tailwindClasses="bg-white flex flex-col sm:flex-row justify-between items-center min-h-14 relative footer z-40">
        <Block tailwindClasses="flex flex-col justify-evenly h-full w-full">
            <Block tailwindClasses='block sm:hidden font-primary flex flex-col justify-center items-center p-5'>
                <Block tailwindClasses='flex flex-row'></Block>
                <Block tailwindClasses='flex flex-row flex-wrap-nowrap'>
                <span className="whitespace-nowrap">
                    The Dance <span className="text-primary px-2">&</span> Movement Workshop
                </span>
                </Block>
            </Block>
            <Menu />
            <Block tailwindClasses='hidden sm:flex px-5 flex-row'>
                © {getCurrentYear()} The Dance and Movement Workshop. All rights reserved. 
                {pages.length > 0 && <div className='mx-2'>|</div>}
                {pages.map((page) => (
                    <Transition key={page.PageID} delay={100 * page.PageNavConfig.Order} isEntering={true} tailwindClass='cursor-pointer'>
                        <div
                            className={clsx(page.PageActive ? "hover:text-primary text-black" : "display-none")}
                            onClick={() => {
                                handleNavigation(page.PageSlug, page.PageName, page.PageID)()}
                            }
                        >
                            {page.PageName}
                        </div>
                    </Transition>
                ))}
            </Block>
        </Block>
        <Block tailwindClasses="flex flex-col max-h-full">
            <SocialBar />
            <Block tailwindClasses='flex sm:hidden p-5 flex-row'>
                © {getCurrentYear()} The Dance and Movement Workshop. All rights reserved.
                {pages.length > 0 && <div className='mx-2'>|</div>}
                {pages.map((page) => (
                    <Transition key={page.PageID} delay={100 * page.PageNavConfig.Order} isEntering={true} tailwindClass='cursor-pointer'>
                        <div
                            className={clsx(page.PageActive ? "hover:text-primary text-black" : "display-none")}
                            onClick={() => handleNavigation(page.PageSlug, page.PageName, page.PageID)()}
                        >
                            {page.PageName}
                        </div>
                    </Transition>
                ))}
            </Block>
        </Block>
    </Block>
  );
};

export default Footer;