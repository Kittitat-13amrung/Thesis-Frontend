import React from 'react';
// import demoAudio from '@assets/00_BN1-129-Eb_solo_mic.wav';
import Viewer from '@/components/TabViewer/Viewer';

const TabVisualiser: React.FC = () => {
  const [songTitle, setSongTitle] = React.useState<string>("Song Title");

  return (
    <main className="pt-28 bg-[url('./src/assets/images/homepage_hero.png')] bg-scroll bg-cover">
      <section className=" container mx-auto drop-shadow">
        <div className="flex flex-row justify-between mx-5 mt-8">
          {/* Song Title */}
          <div className="inline-block rounded-t-2xl bg-neutral-900 break-words px-10 py-3">
            <h1 className='text-4xl font-black font-sans invert capitalize'>{songTitle}</h1>
          </div>
        </div>
      </section>
      {/* Tab Viewer Component */}
      <section className="rounded-t-xl bg-neutral-50 min-h-[100vh] mx-28 p-5 bg-opacity-80">
        {/* Tab viz */}
        <Viewer setSongTitle={setSongTitle} />
      </section>
    </main>
  )
}

export default TabVisualiser;