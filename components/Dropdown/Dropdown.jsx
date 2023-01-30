import React from 'react';
import { mutate as globalMutate } from 'swr';
import DropdownOption from './DropdownOption';
import { useSwrPlus } from '../../hooks/useSwrPlus';
import Modal from '../Modal';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import ConfirmDialogContent from './../dialogs/ConfirmDialogContent';
import HotelEditDialogContent from './../dialogs/HotelEditDialogContent';
import { fetcher } from './../../utils/fetcher';

// =============================================================================

export default function Dropdown({
  currentItem,
  setCurrentItem,
  dropdownInput,
  setDropdownInput,
  dropdown,
  setDropdown,
}) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const dropdownRef = React.useRef();
  const inputRef = React.useRef();

  const pathKey = '/api/hotel/';
  const { data, isLoading, error, controller, mutate } = useSwrPlus(
    dropdownInput.length > 1 ? pathKey : null,
    dropdownInput
  );

  let dropdownOptions;

  if (data) {
    dropdownOptions = data.data ? data.data : [{ id: 0, hotel_title: 'Совпадений не найдено' }];
  }

  // event listners & callbacks
  const onClickOutside = React.useCallback(
    (e) => {
      if (!e.target.closest('form')) {
        setDropdown(false);
      }
    },
    [setDropdown]
  );

  // focus sequence logic when navigating with arrow keys
  const onKeydown = React.useCallback(
    (e) => {
      if (!dropdownRef.current) return;
      const length = dropdownRef.current.children?.length;
      if (length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();

        let nextIndex = selectedIndex + 1;

        if (nextIndex === 0) {
          setSelectedIndex(0);
          inputRef.current.focus();
          return;
        } else if (nextIndex > length) {
          nextIndex = 0;
          setSelectedIndex(1);
          dropdownRef.current.children[0]?.focus();
          return;
        }

        dropdownRef.current.children[selectedIndex]?.focus();
        setSelectedIndex(nextIndex);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();

        let nextIndex = selectedIndex - 1;
        if (nextIndex < 0) {
          nextIndex = length - 1;
        }

        setSelectedIndex(nextIndex);
        dropdownRef.current.children[selectedIndex]?.focus();
      }
    },
    [selectedIndex]
  );

  React.useEffect(() => {
    window.addEventListener('click', onClickOutside);
    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('click', onClickOutside);
      window.removeEventListener('keydown', onKeydown);
    };
  }, [onClickOutside, onKeydown]);

  // fetching
  React.useEffect(() => {
    dropdownInput.length > 1 ? setDropdown(true) : setDropdown(false);
    mutate(pathKey);
  }, [dropdownInput, mutate, setDropdown]);

  const handleInput = (e) => {
    setDropdownInput(e.target.value);
    // setInput(e.target.value);
  };

  const handleOptionClick = async (e) => {
    e.preventDefault();
    const hintWrapper = e.target.closest('[data-id]');
    const titleElement = hintWrapper?.querySelector('[data-option-text]');
    const id = hintWrapper?.dataset.id;

    if (data?.data && id) {
      const selectedHotel = data.data.filter((hotel) => {
        return hotel.id === Number(id);
      });
      setCurrentItem(selectedHotel[0]);
    }
    titleElement && setDropdownInput(titleElement.innerText);
    setDropdown((state) => !state);
  };

  const handleToggleDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal((show) => !show);
  };

  const handleEditSubmit = (submitedData) => {
    setShowEditModal((show) => !show);

    // globalMutate(fetcher('http://localhost:3000/api/hotel', { method: 'PUT', body: JSON.stringify(submitedData) }));
  };

  const handleEditCancel = () => {
    setShowEditModal((show) => !show);
  };

  const handleConfirmDeletion = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal
        title='Удаление'
        show={showDeleteModal}
        onClose={handleToggleDeleteModal}
      >
        <ConfirmDialogContent
          onCancel={handleToggleDeleteModal}
          onConfirm={handleConfirmDeletion}
        />
      </Modal>

      <Modal
        title='Редактирование карточки отеля'
        show={showEditModal}
        onClose={handleEditSubmit}
      >
        <HotelEditDialogContent
          hotel={currentItem}
          onCancel={handleEditCancel}
          onConfirm={handleEditSubmit}
        />
      </Modal>
      <div className='form__wrapper'>
        <form
          className='form'
          action=''
        >
          <div style={{ display: 'flex', height: '50px' }}>
            <input
              id='input'
              ref={inputRef}
              autoComplete='off'
              className='form__input'
              type={'text'}
              value={dropdownInput}
              onChange={handleInput}
              onFocus={() => {
                setSelectedIndex(0);
                setDropdown(dropdownInput.length > 1);
              }}
            />
          </div>

          {!!dropdown && (
            <div
              className='form_dropdown'
              ref={dropdownRef}
            >
              {dropdownOptions &&
                dropdownOptions.map((option) => {
                  return (
                    <DropdownOption
                      id={option.id}
                      key={option.id}
                      text={option.title}
                      onClick={handleOptionClick}
                    />
                  );
                })}
            </div>
          )}
        </form>

        <EditButton onClick={handleEditSubmit} />
        <DeleteButton
          className='button'
          onClick={handleToggleDeleteModal}
        />
      </div>
      <style jsx>
        {`
          .form__wrapper {
            display: flex;
          }

          .form {
            position: relative;
            width: 100%;
          }

          .form__input {
            width: 100%;
            line-height: 2;
            font-size: 1.5rem;
            padding-inline: 1rem;
          }

          .form_dropdown {
            display: block;
            width: 100%;
            max-height: 19rem;
            position: absolute;
            background-color: white;
            border: 1px solid;
            border-top: 0;
            overflow-y: auto;
          }
        `}
      </style>
    </>
  );
}
