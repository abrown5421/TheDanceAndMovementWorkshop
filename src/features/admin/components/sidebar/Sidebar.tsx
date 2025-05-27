import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import Transition from '../../../../components/transition/Transition';
import { setActivePage } from '../../../pages/activePageSlice';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const pages = useAppSelector((state) => state.pages);
    const activePage = useAppSelector((state) => state.activePage);
    const sortedPages = [...pages.pages].sort((a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order);

    const visiblePages = sortedPages
        .map((page) => ({
            key: `page-${page.PageName}`,
            label: page.PageName,
            order: page.PageNavConfig.Order,
            isActive: activePage.activePageName === page.PageName,
            onClick: () => {
                dispatch(setActivePage({ key: "activePageName", value: page.PageName }));
                dispatch(setActivePage({ key: "activePageIn", value: true }));
                dispatch(setActivePage({ key: "activePageId", value: page.PageID }));
            },
        }));
        

    return (
        <div className='flex flex-col flex-1/4 bg-gray-200 shadow p-4'>
            {visiblePages.map((item) => (
                <Transition key={item.key} delay={100 * item.order} isEntering={true} tailwindClass='cursor-pointer'>
                    <div
                        className="text-black mx-5 my-3 md:my-5"
                        onClick={item.onClick}
                    >
                        {item.label}
                    </div>
                </Transition>
            ))}
        </div>
    );
};

export default Sidebar;
