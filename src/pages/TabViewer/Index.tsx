import React from 'react';
// import demoAudio from '@assets/00_BN1-129-Eb_solo_mic.wav';
import Viewer from '@/components/TabViewer/Viewer';

const TabVisualiser: React.FC = () => {
  const [songTitle, setSongTitle] = React.useState<string>("Song Title");

  return (
    <main className="pt-28 bg-[url('./src/assets/images/homepage_hero.png')] bg-scroll bg-cover">
      <section className=" container mx-auto drop-shadow">
        <div className="flex flex-row justify-start gap-x-6 mx-5 mt-8">
          {/* Song Title */}
          <div className="inline-block rounded-t-2xl bg-neutral-900 break-words px-10 py-3">
            <h1 className='text-4xl font-black font-sans invert capitalize'>{songTitle}</h1>
          </div>

          {/* Fork Button */}
          <div className="self-end right-0">
            <button className="transition-all hover:pb-5 inline-block rounded-t-2xl bg-neutral-900 break-words px-10 py-2.5 text-2xl font-semibold text-neutral-50 font-sans capitalize">Edit</button>
          </div>
        </div>
      </section>
      {/* Tab Viewer Component */}
      <div className="container mx-auto flex gap-10">
        <section className="w-full rounded-t-xl bg-neutral-50 min-h-[calc(100vh-13rem)] p-5 bg-opacity-80">
          {/* Tab viz */}
          <Viewer setSongTitle={setSongTitle} />
        </section>
        {/* Fork Repo */}
        <section className="sticky top-6 w-1/4 rounded-xl bg-neutral-50 h-96 p-5 bg-opacity-80">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold font-sans">Edits from other users:</h1>
          </div>
        </section>
      </div>
    </main>
  )
}

export default TabVisualiser;