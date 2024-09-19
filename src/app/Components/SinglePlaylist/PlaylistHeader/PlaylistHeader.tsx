import Card from "../../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import { ArtistInterface } from "@/app/interfaces/Artist.interface";
import Search from "../../Search/Search";
import EditPlaylist from "../EditPlaylist/EditPlaylist";
import styles from "./PlaylistHeader.module.scss";

interface PlaylistHeaderProps {
  playlist: ArtistInterface;

  addMusics: () => void;
  isTablefull: boolean;
}

const PlaylistHeader = ({
  playlist,
  addMusics,
  isTablefull,
}: PlaylistHeaderProps) => {
  return (
    <div className={styles.playlistContainer}>
      <Card
        images={playlist.photo.url}
        showDetails
        name={playlist.name}
        count={playlist.count}
        direction="row"
        imageSizeVariant={ImageSizeVariant.Large}
      />
      <div className={styles.searchContainer}>
        <div className={styles.edit}>
          <p className={styles.text}>Let’s Find Somethings For Your Playlist</p>
          {isTablefull && (
            <EditPlaylist addMusic={addMusics} playlist={playlist} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
