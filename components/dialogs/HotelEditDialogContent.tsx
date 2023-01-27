import { HotelEditDialogProps, Hotel } from '../../types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

export const schema = z.object({
  title: z.string().min(1, { message: 'Название отеля является обязательным полем' }),
  coordinates: z.optional(
    z.string().regex(/^12\.\d*?,100\.\d*?$/, {
      message:
        'Координаты должны быть в формате двух чисел, разделенных запятой. Дробная часть чисел отделяется точкой',
    })
  ),
  comment: z.string().optional(),
  googleName: z.string().optional(),
  iframe: z.string().optional(),
});

type FormOutput = z.infer<typeof schema>;

// =============================================================================

export default function HotelEditDialogContent({ hotel, onCancel, onConfirm }: HotelEditDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: hotel.title || '',
      googleName: hotel.googleName || '',
      coordinates: hotel.latitude && hotel.longitude ? hotel.latitude + ',' + hotel.longitude : '',
      comment: hotel.comment || '',
      iframe: hotel.iframe || '',
    },
  });

  console.log(errors); //! <-------------------------------- CONSOLE

  const { isLoading, mutate } = useSWR('http://localhost:3000/api/hotel', fetcher);

  let hotelRecord: Hotel;

  const onSubmit = async (data: FormOutput) => {
    let latitude;
    let longitude;
    if (data.coordinates) {
      [latitude, longitude] = data?.coordinates?.trim().split(',');
    }

    hotelRecord = {
      id: hotel.id,
      title: data.title,
      latitude: latitude?.trim() || '',
      longitude: longitude?.trim() || '',
      comment: data.comment || '',
      googleName: data.googleName || '',
      iframe: data.iframe || '',
    };
    await mutate(fetcher('http://localhost:3000/api/hotel', { method: 'PUT', body: JSON.stringify(hotelRecord) }));

    onConfirm(hotelRecord);
  };

  const cancelHandler = (e: React.SyntheticEvent) => {
    onCancel();
  };

  return (
    <>
      <form
        className='edit-form'
        action=''
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='stack'>
          <label htmlFor='hotel-title'>Название отеля</label>
          <input
            type='text'
            id='hotel-title'
            autoComplete='off'
            {...register('title')}
          />
          {errors.title && <p className='error'>{errors.title.message}</p>}

          <label htmlFor='google-name'>Название отеля на Гугл-картах</label>
          <input
            type='text'
            id='google-name'
            autoComplete='off'
            {...register('googleName')}
          />
          {errors.googleName && <p className='error'>{errors.googleName.message}</p>}

          <label htmlFor='coordinates'>Координаты</label>
          <input
            type='text'
            id='coordinates'
            autoComplete='off'
            {...register('coordinates')}
          />
          {errors.coordinates && <p className='error'>{errors.coordinates.message}</p>}

          <label htmlFor='comment'>Комментарий</label>
          <input
            type='text'
            id='comment'
            autoComplete='off'
            {...register('comment')}
          />

          <label htmlFor='iframe'>Строка для вставки карты</label>
          <textarea
            id='iframe'
            autoComplete='off'
            {...register('iframe')}
          />
        </div>
        <div className='buttons'>
          <button onClick={cancelHandler}>Отмена</button>
          <button type='submit'>Сохранить</button>
        </div>
      </form>

      <style jsx>{`
        .edit-form {
          min-width: 500px;
        }

        label {
          font-weight: 600;
        }

        .buttons {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .buttons > * + * {
          margin-left: 2rem;
        }

        input,
        textarea {
          --space: 0.5rem;
          padding-inline: 0.5rem;
        }

        textarea {
          min-height: 7rem;
        }

        .error {
          color: red;
        }
      `}</style>
    </>
  );
}
