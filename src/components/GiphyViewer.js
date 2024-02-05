import { useState, useEffect } from 'react';
import axios from "axios";
import {Card, Row, Button, Form} from 'react-bootstrap';

const GIPHY_URL = "https://api.giphy.com/v1/gifs"; 
const API_KEY = "ezjq2ZDvcrWt60bXrbbjfHaAzPLTBXrk";

const GiphyViewer = () => { 
    const [gifs, setGifs] = useState([]);
    const [term, setTerm] = useState("");
    const [limit, setLimit] = useState(5);
    const [randomList, setRandomList] = useState([]);
    const [isRandom, setIsRandom] = useState(false);

    const trendingGIF = () => {
        axios.get(`${GIPHY_URL}/trending?api_key=${API_KEY}&limit=${limit}`)
        .then(response => {
            const data = response.data.data;
            // console.log(response.data.data);
            setGifs(data);
        }).catch(error => console.log(error));

        setIsRandom(false);
        setTerm("");
    };

    useEffect( () => {
        if(isRandom) {
            handleRandomClick();
        } else {
            trendingGIF();
        }

        
    }, [limit] );

    const handleChange = (e) => {
        setTerm(e.target.value);
    };

    const searchGIF = () => {
        axios.get(`${GIPHY_URL}/search?api_key=${API_KEY}&q=${term}&limit=${limit}`)
        .then(response => {
            const data = response.data.data;
            setGifs(data);
        }).catch(error => console.log(error));

        setIsRandom(false);
        setTerm("");
    }

    const handleTrendingClick = () => {
        trendingGIF();
    };

    const handleRandomClick = () => {
        setIsRandom(true);
        for (let g = 0; g < (limit); g++) {
            axios.get(`${GIPHY_URL}/random?api_key=${API_KEY}`)
            .then(response => {
                const data = [response.data.data];
                setRandomList(data);
            })
            .catch(error => console.log(error));
        }
        
        setGifs(randomList);
        setTerm("");
    };


    const handleClick = () => {
        searchGIF();
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            searchGIF();
        };
    };

    const handleMouseUpRange = (e) => {
        console.log(e.target.value);
        setLimit(e.target.value);
    }


    let giphyComponents = gifs.map(gif => {
        return <GiphyCard key={gif.id} image={gif.images.fixed_width.url} title={gif.title} url={gif.url}/>
    });

    return <>
        <div className='search'>
            <input type="text" value={term} onKeyUp={handleKeyUp} onChange={handleChange}/>
            <Button variant='primary' onClick={handleClick}>Search</Button>
            <Button className='ms-4' onClick={handleTrendingClick}>Trending</Button>
            <Button className='ms-4' onClick={() => handleRandomClick(limit)}>Random</Button>
        </div>

        <div className="form-group col-3">
            <Form.Label>Limit:</Form.Label>
            <Form.Range onMouseUp={handleMouseUpRange} defaultValue={25} min={1} max={50}/>
        </div>

        <Row ms={1} md={3} className="g-4">
        {giphyComponents}
        </Row>
    </>;
};


const GiphyCard = (props) => {

    return (
            <Card>
                <Card.Img src={props.image} variant="top"/>
                <Card.Body>
                    <Card.Title>
                        <a href={props.url} target="_blank">{props.title}</a>
                        </Card.Title>
                </Card.Body>
            </Card>
    );

};

export default GiphyViewer;