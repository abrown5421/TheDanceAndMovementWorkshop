import React, { useState } from 'react';
import Block from '../../../../components/block/Block';
import { useAppSelector } from '../../../../app/store/hooks';
import { updateDataInCollection } from '../../../../services/db/insertData';
import CircularLoader from '../../../../components/circularLoader/CircularLoader';

const PageManager: React.FC = () => {
  const pages = useAppSelector((state) => state.pages.pages);
  
  const [loadingPageId, setLoadingPageId] = useState<string | null>(null);

  const sortedPages = [...pages].sort(
    (a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order
  );

  const handleToggleShow = async (PageID: string, newShowValue: boolean) => {
    setLoadingPageId(PageID);
    try {
      await updateDataInCollection('Pages', PageID, {
        'PageNavConfig.Show': newShowValue
      });
    } catch (error) {
      console.error('Error updating page visibility:', error);
    } finally {
      setLoadingPageId(null);
    }
  };

  return (
    <Block tailwindClasses="flex flex-col items-center justify-center bg-gray-100 rounded-2xl shadow-xl w-full">
      {sortedPages.length > 0 ? (
        sortedPages.map((page) => (
          <Block
            key={page.PageID}
            tailwindClasses="flex flex-row w-full justify-between p-6"
          >
            <Block tailwindClasses="flex flex-col flex-8">{page.PageName}</Block>
            <Block tailwindClasses="flex flex-col flex-3 items-end">
              {loadingPageId === page.PageID ? (
                <CircularLoader className="text-primary" />
              ) : ( 
                <input
                    type="checkbox"
                    className="w-5 h-5 accent-primary text-primary rounded cursor-pointer transition duration-200 ease-in-out"
                    checked={page.PageNavConfig.Show}
                    onChange={(e) => handleToggleShow(page.PageID, e.target.checked)}
                />
              )}
            </Block>
          </Block>
        ))
      ) : (
        <div className="text-gray-500">No pages available.</div>
      )}
    </Block>
  );
};

export default PageManager;
