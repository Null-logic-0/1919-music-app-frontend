import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import styles from './PlayListFrom.module.scss';
import { FormDataInterface } from '@/app/interfaces/PlaylistForm.interface';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import axios from 'axios';

type FromProps = {
  setShowModal: (value: boolean) => void;
  addNewPlaylist?: (newPlaylist: FormDataInterface) => void;
  playlist?:any;
  updatePlaylist?: (playlist: FormDataInterface) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const PlayListFrom = ({ setShowModal, addNewPlaylist, playlist, updatePlaylist }: FromProps) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormDataInterface>();
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (playlist) {
      setValue("name", playlist.name);
      setImageUploaded(!!playlist.photo);
    } else {
      reset();
      setImageUploaded(false);
    }
  }, [playlist, setValue, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        alert("File is too large. Maximum allowed size is 5 MB.");
        return;
      }

      setValue("photo", file);
      setImageUploaded(true);
    }
  };

  const onSubmit: SubmitHandler<FormDataInterface> = (data) => {
    const formData = new FormData();
    if (data.photo) {
      formData.append("photo", data.photo as File);
    }
    formData.append("name", data.name || "");

    const token = localStorage.getItem("accesstoken");
    if (!token) {
      alert("No token found in localStorage");
      return;
    }

    let request;
    if (playlist)
      {
      request = axios.put(
        `https://one919-backend.onrender.com/playlist/${playlist.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      request = axios.post(
        "https://one919-backend.onrender.com/playlist",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    request
      .then((response) => {
        const playlistData: FormDataInterface = {
          id: response.data.id,
          key: response.data.id.toString(),
          photo: response.data.photo.url,
          name: response.data.name,
        };

        if (playlist) {
          updatePlaylist?.(playlistData);
        } else {
          addNewPlaylist?.(playlistData);  
        }

        setShowModal(false);
        reset(); 
      })
      .catch((error) => {
        alert(`Error submitting form: ${error}`);
      });
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
              <Image src={'/Icons/plusIcon.png'} width={63} height={63} alt="icon" />
            </label>
            <input
              type="file"
              id="fileInput"
              className={styles.uploader}
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.errorContainer}>
            <input
              {...register('name', {
                required: 'Playlist name is required',
                maxLength: {
                  value: 20,
                  message: 'Max length is 20 characters',
                },
              })}
              type="text"
              placeholder="Playlist name.."
              className={classNames(styles.input, { [styles.error]: errors.name })}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
          </div>
        </div>
      </div>
      <input type="submit" className={styles.submit} value={playlist ? 'Update' : 'Save'} />
    </form>
  );
};

export default PlayListFrom;
