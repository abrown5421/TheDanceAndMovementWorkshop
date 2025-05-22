import React, { useEffect } from 'react';
import Block from '../../../../components/block/Block';
import { useAppSelector } from '../../../../app/store/hooks';
import { updateDataInCollection } from '../../../../services/db/insertData';

const PageManager: React.FC = () => {
  const pages = useAppSelector((state) => state.pages.pages);

  useEffect(()=>{console.log(pages)}, [pages])

  const sortedPages = [...pages].sort(
    (a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order
  );

  const handleToggleShow = async (PageID: string, newShowValue: boolean) => {
    try {
        await updateDataInCollection('Pages', PageID, {
            'PageNavConfig.Show': newShowValue
        });
        console.log(`Show updated to ${newShowValue} for page ${PageID}`);
    } catch (error) {
        console.error('Failed to update Show:', error);
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
              <input
                type="checkbox"
                checked={page.PageNavConfig.Show}
                onChange={(e) => handleToggleShow(page.PageID, e.target.checked)}
              />
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
