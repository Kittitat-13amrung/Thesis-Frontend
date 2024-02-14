import Navbar from '@/components/Navbar';
import React from 'react';
// import demoAudio from '@assets/00_BN1-129-Eb_solo_mic.wav';
import Viewer from '@/components/TabViewer/Viewer';

type Props = {}

const TabVisualiser: React.FC<Props> = () => {
  const [songTitle, setSongTitle] = React.useState<string>("Song Title");

  return (
    <>
      <main className="container mx-auto drop-shadow">
        <Navbar />

        <div className="flex flex-row justify-between mx-5 mt-8">
          {/* Song Title */}
          <div className="inline-block rounded-t-2xl bg-slate-900 break-words px-10 py-3">
            <h1 className='text-4xl font-black font-sans invert capitalize'>{songTitle}</h1>
          </div>
          {/* Audio Player */}
          {/* <audio controls> */}
            {/* <source src={demoAudio} type="audio/wav" /> */}
          {/* </audio> */}
          <div id="audio-player"></div>
        </div>
      </main>
      <section className="rounded-t-xl bg-neutral-50 min-h-[100vh] mx-28 p-5">
        {/* Tab viz */}
        <Viewer setSongTitle={setSongTitle}/>
      </section>
    </>
  )
}

export default TabVisualiser;