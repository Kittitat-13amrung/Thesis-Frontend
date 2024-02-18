import Listbox from '@/components/Songs/Listbox'
import Navbar from '@/components/Navbar';
import React from 'react';
import AudioDropInput from '@/components/Songs/AudioDropInput';

const Index = () => {
    React.useEffect(() => { }, []);



    return (
        <>
            <main className="py-20 text-neutral-100 bg-[url('./src/assets/images/homepage_hero.png')] drop-shadow">
                {/* <img src={heroImage} className='fixed -z-10 bg-cover'/> */}
                <div className="container mx-auto px-10 py-14 grid grid-flow-col">
                    <div className="leading-loose">
                        <h1 className='text-5xl font-black mb-5'>Automatic Tablature</h1>
                        <p className='text-lg mr-24'>
                            Lorem ipsum dolor sit amet consectetur. In aenean porttitor vitae lorem.
                            Faucibus feugiat felis eget massa etiam eu quis venenatis.
                            <br /> Vel ut eu ut consequat nec lectus tincidunt. Faucibus diam ipsum et lobortis.
                        </p>
                    </div>

                    {/* Drag n' Drop audio functionality */}
                    <AudioDropInput/>
                </div>
            </main>
            {/* Songs Section  */}
            <section>
                {/* Title & Filter */}
                <div className="container mx-auto">
                    <div className="flex justify-between my-6">
                        {/* Songs Title */}
                        <div className="flex gap-4">
                            {/* <MusicalNoteIcon className='aspect-square w-8' /> */}
                            <h2 className="text-3xl font-black font-sans">
                                Songs
                            </h2>
                        </div>
                        {/* Filter */}
                        <div className="flex gap-2">
                            {/* <FunnelIcon className='aspect-square w-5'/> */}
                            <select defaultValue="1" name="" id="">
                                <option value="1">latest</option>
                                <option value="2">oldest</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Songs list */}
                <div className="grid grid-flow-row">
                    <Listbox />
                    <Listbox />
                    <Listbox />
                </div>
            </section>
        </>
    )
}

export default Index