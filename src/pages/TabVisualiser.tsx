import Navbar from '@/components/Navbar';
import React from 'react';
import demoAudio from '@assets/00_BN1-129-Eb_solo_mic.wav';
import SongDescriptions from '@/components/Songs/SongDescriptions';

type Props = {}

const TabVisualiser: React.FC<Props> = () => {
  return (
    <main className="container mx-auto ">
      <Navbar />

      <div className="flex flex-row justify-between mx-5">
        {/* Song Title */}
        <div className="inline-block rounded-t-2xl bg-slate-900 break-words px-10 pb-2">
          <h1 className='text-4xl font-black font-sans invert'>Song</h1>
        </div>
        {/* Audio Player */}
        <audio controls>
          <source src={demoAudio} type="audio/wav" />
        </audio>
      </div>
      <section className="rounded-t-xl bg-slate-200 h-[100vh] p-5">
      {/* Song Description */}
      <SongDescriptions/>
      {/* Tab viz */}
      
      </section>
    </main>
  )
}

export default TabVisualiser;