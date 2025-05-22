import React, { useState } from 'react';
import Block from '../../../../components/block/Block';
import { useAppSelector } from '../../../../app/store/hooks';
import { updateDataInCollection } from '../../../../services/db/insertData';
import CircularLoader from '../../../../components/circularLoader/CircularLoader';

const PageManager: React.FC = () => {
  const pages = useAppSelector((state) => state.pages.pages);
  const [loadingPageId, setLoadingPageId] = useState<string | null>(null);
  const [editedNames, setEditedNames] = useState<Record<string, string>>({});

  const sortedPages = [...pages].sort(
    (a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order
  );

  const handleInputChange = (pageId: string, value: string) => {
    setEditedNames((prev) => ({ ...prev, [pageId]: value }));
  };

  const handleSaveName = async (pageId: string) => {
    const newName = editedNames[pageId];
    setLoadingPageId(pageId);
    try {
      await updateDataInCollection('Pages', pageId, {
        PageName: newName,
      });
    } catch (error) {
      console.error('Error updating page name:', error);
    } finally {
      setLoadingPageId(null);
    }
  };

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
        sortedPages.map((page) => {
          const currentEditedName = editedNames[page.PageID] ?? page.PageName;
          const nameChanged = currentEditedName !== page.PageName;

          return (
            <Block
              key={page.PageID}
              tailwindClasses="flex flex-row w-full justify-between p-6 gap-4 items-center"
            >
              <Block tailwindClasses="flex-1">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={currentEditedName}
                  onChange={(e) => handleInputChange(page.PageID, e.target.value)}
                />
              </Block>

              <Block tailwindClasses="flex items-center gap-4">
                <button
                  className={`px-4 py-2 rounded text-white ${
                    nameChanged ? 'bg-primary hover:bg-secondary' : 'bg-gray-300 cursor-not-allowed'
                  } transition`}
                  disabled={!nameChanged || loadingPageId === page.PageID}
                  onClick={() => handleSaveName(page.PageID)}
                >
                  {loadingPageId === page.PageID ? 'Saving...' : 'Save'}
                </button>

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
          );
        })
      ) : (
        <div className="text-gray-500">No pages available.</div>
      )}
    </Block>
  );
};

export default PageManager;
