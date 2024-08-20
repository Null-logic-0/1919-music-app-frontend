'use client'
import Artist from '@/app/Components/Artists/Artist';
import Albums from '@/app/Components/Albums/Albums';
import TopSongs from '@/app/Components/TopSongs/TopSongs';
import Charts from '@/app/Components/Charts/Charts';
import Hits from '@/app/Components/Hits/Hits';
import HomePageTop from '@/app/Components/HomePageTop/HomePageTop';
import AuthGuard from '@/app/Components/AuthGuard/AuthGuard';

const HomePage = () => {
  return (
    <AuthGuard>
      <main>
        <HomePageTop />
        <Artist />
        <Albums />
        <TopSongs />
        <Charts />
        <Hits />
      </main>
    </AuthGuard>
  );
};

export default HomePage;
