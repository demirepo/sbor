import { DialogProps } from '../../types';

export default function ConfirmDialogContent({ onConfirm, onCancel }: DialogProps) {
  return (
    <>
      <form action=''>
        <p>Отель будет удален из БД. Продолжить? </p>
        <button onClick={onCancel}>Отмена</button>
        <button onClick={onConfirm}>Удалить</button>
      </form>
    </>
  );
}
