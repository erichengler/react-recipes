import React, { useEffect, useState } from 'react';
import Wrapper from '../styles/Wrapper';
import Card from '../styles/Card';
import Gradient from '../styles/Gradient';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';

function Veggie() {

    // Storing popular
    const [veggie, setVeggie] = useState([]);

    // Run getPopular when component mounts
    useEffect(() => {
        getVeggie();
    }, []);

    const getVeggie = async () => {

        // Checking if veggie is saved in local storage
        const check = localStorage.getItem('veggie');

        if (check) {
            // If veggie is saved in local storage, parse
            setVeggie(JSON.parse(check));

        } else {
            // If veggie is not saved, fetch from API and setVeggie
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();

            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes);
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Veggie Picks</h3>
                <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: '5rem',
                    }}
                >
                    {veggie.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.div}>
                                <Card>
                                    <Link to={'/recipe/' + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title} />
                                        <Gradient />
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
}

export default Veggie;