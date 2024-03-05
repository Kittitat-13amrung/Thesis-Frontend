import SongList from '@/components/Homepage/Songs/SongList';
import AudioDropInput from '@/components/Songs/AudioDropInput';

const Index = () => {
    console.log(import.meta.env.VITE_API_URL);

    return (
        <>
            <main className="min-h-[75vh] text-neutral-100 bg-[url('https://thesisbackendstorage.blob.core.windows.net/thesisbackendcontainer/assets/homepage_hero.png')] bg-cover flex items-center">
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
            <SongList />
        </>
    )
}

export default Index