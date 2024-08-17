import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './PlayListFrom.module.scss';
import { FormDataInterface } from '@/app/interfaces/PlaylistForm.interface';
import classNames from 'classnames';
import { useState } from 'react';

type FromProps = {
  setShowModal: (value: boolean) => void;
}

const PlayListFrom = ({ setShowModal }: FromProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormDataInterface>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const onSubmit: SubmitHandler<FormDataInterface> = async (data) => {
    const formData = {
      img: data.img,
      playlistName: data.playlistName,
      description: data.description,
    };
    setShowModal(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await toBase64(e.target.files[0]);
      setValue('img', base64);
      setImageUploaded(true);
    }
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p className={styles.uploadImage}>Upload Image</p>
            {imageUploaded && (
              <Image src={'/Icons/wellDone.png'} alt='icon' width={16} height={16} />
            )}
          </div>
          <div className={styles.upload}>
            <label htmlFor="fileInput" className={styles.label}>
              <Image src={'/icons/plusIcon.png'} width={63} height={63} alt="icon" />
            </label>
            <input
              type="file"
              id="fileInput"
              className={styles.uploader}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className={styles.inputs}>
          <div className={styles.errorContainer}>
            <input
              {...register('playlistName', {
                required: 'playlistName Name is required',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters',
                },
              })}
              type="text"
              placeholder="Playlist name.."
              className={classNames(styles.input, { [styles.error]: errors.playlistName })}

            />
            {errors.playlistName && <span className={styles.errorMessage}>{errors.playlistName.message}</span>}

          </div>

          <textarea
            {...register('description')}
            placeholder="Add an optional description"
            className={styles.textarea}
          />


        </div>
      </div>
      <input type="submit" className={styles.submit} value="Save" />
    </form>
  );
};

export default PlayListFrom;


