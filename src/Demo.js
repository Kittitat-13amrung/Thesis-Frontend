import { Container, Row, Col } from 'react-bootstrap';

import GiphyViewer from './components/GiphyViewer';
import './assets/app.css';
import * as alphaTab from '@coderline/alphatab';
import React from 'react';
import musicFile from './assets/Boss_of_the_Fortress.musicxml';

const Demo = () => {
    const _api = React.useRef();
    const _container = React.useRef();

    React.useEffect(() => {
        _api.current = new alphaTab.AlphaTabApi(_container.current, {
            core: { 
                fontDirectory: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/',
                // file: musicFile,
             },
        });

        _api.current.tex(`.
        :2 19.2{v f} 17.2{v f}
        15.2{v f} 14.2{v f}
        12.2{v f} 10.2{v f}
        12.2{v f} 14.2{v f}.4 :8 15.2 17.2
        14.1.2 :8 17.2 15.1 14.1{h} 17.2
        `)

        _api.current.scoreLoaded.on( (score) => {
            console.log('Score was loaded!', score);
        });
    }, [])

  return (
    <>
      <Container className='mt-5'>
          <Row ref={_container}>
          </Row>
      </Container>
    </>
  );
}

export default Demo;
