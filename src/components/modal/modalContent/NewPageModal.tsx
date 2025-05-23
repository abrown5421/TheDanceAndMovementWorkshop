import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import Input from '../../input/Input';
import Block from '../../block/Block';
import { insertDataIntoCollection } from '../../../services/db/insertData';
import { setEntireNotification } from '../../notification/notificationSlice';
import { closeAndClearModal } from '../modalSlice';

const NewPageModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const pages = useAppSelector((state) => state.pages.pages);
    const modal = useAppSelector((state) => state.modal);

    const [pageName, setPageName] = useState("");
    const [pageSlug, setPageSlug] = useState("");
    const [pageActive, setPageActive] = useState(true);
  
    const [order, setOrder] = useState(0);
  
    useEffect(() => {
      const maxOrder = Math.max(0, ...pages.map((p) => p.PageNavConfig.Order));
      setOrder(maxOrder + 1);
    }, [pages]);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const newPage = {
        PageName: pageName,
        PageSlug: pageSlug,
        PageActive: pageActive,
        PageNavConfig: {
          Order: order,
          Show: pageActive,
        },
        PageContent: {
            "children": [
                {
                    "children": [
                        {
                            "type": "Block",
                            "props": {
                                "tailwindClasses": "text-3xl",
                                "children": pageName
                            }
                        }
                    ],
                    "type": "Block",
                    "props": {
                        "tailwindClasses": "flex flex-col flex-1 justify-center h-1/2 lg:h-full box-border p-5 md:p-16 lg:p-32"
                    }
                }
            ],
            "props": {
                "tailwindClasses": "h-full flex flex-col lg:flex-row bg-white"
            },
            "type": "Block"
        },
      };
      try {
        await insertDataIntoCollection('Pages', newPage);
        dispatch(closeAndClearModal());
        dispatch(setEntireNotification({
            notificationOpen: true,
            notificationSeverity: 'success',
            notificationMessage: 'Page added successfully!'
        }))
      } catch (error) {
        dispatch(closeAndClearModal());
        dispatch(setEntireNotification({
            notificationOpen: true,
            notificationSeverity: 'error',
            notificationMessage: 'There was an error adding the page, please ty again later.'
        }))
      }
    };
  
    return (
      <>
        <div className='text-2xl font-primary mb-4'>{modal.modalTitle}</div>
        <Input
          label="Page Name"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
        />
        <Input
          label="Page Slug"
          value={pageSlug}
          onChange={(e) => setPageSlug(e.target.value)}
        />
  
        <Block tailwindClasses="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={pageActive}
              onChange={(e) => setPageActive(e.target.checked)}
            />
            <span>Page Active</span>
          </label>
        </Block>
  
        <Block
          as="button"
          onClick={handleSubmit}
          children="Add New Page"
          tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary transition"
        />
      </>
    );
  };

export default NewPageModal;