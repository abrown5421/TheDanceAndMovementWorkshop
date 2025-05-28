import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { setActivePage } from '../../../pages/activePageSlice';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const pages = useAppSelector((state) => state.pages);
    const activePage = useAppSelector((state) => state.activePage);
    const sortedPages = [...pages.pages].sort((a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order);
    const pageContent = pages.pages.filter((page) => page.PageID === activePage.activePageId)

    useEffect(()=>{console.log(pageContent)}, [pageContent])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPage = sortedPages.find(page => page.PageName === e.target.value);
        if (selectedPage) {
            dispatch(setActivePage({ key: "activePageName", value: selectedPage.PageName }));
            dispatch(setActivePage({ key: "activePageIn", value: true }));
            dispatch(setActivePage({ key: "activePageId", value: selectedPage.PageID }));
        }
    };

    return (
        <div className='flex flex-col flex-1/4 bg-gray-200 shadow p-4'>
            <label className="text-black mb-2 font-semibold" htmlFor="page-select">Select a Page:</label>
            <select
                id="page-select"
                className="mb-3 p-2 rounded border border-gray-400"
                value={activePage.activePageName}
                onChange={handleChange}
            >
                {sortedPages.map((page) => (
                    <option key={page.PageID} value={page.PageName}>
                        {page.PageName}
                    </option>
                ))}
            </select>
            
        </div>
    );
};

export default Sidebar;
