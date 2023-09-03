import React, { useEffect, useState } from 'react';
import Wrapper from '../styles/Wrapper';
import Card from '../styles/Card';
import Gradient from '../styles/Gradient';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';

function Popular() {

    // Storing popular
    const [popular, setPopular] = useState([]);

    // Run getPopular when component mounts
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        // Checking if popular is saved in local storage
        const check = localStorage.getItem('popular');

        if (check) {
            // If popular is saved in local storage, parse
            setPopular(JSON.parse(check));

        } else {
            // If popular is not saved, fetch from API and setPopular
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            );
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide
                    options={{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: 'free',
                        gap: '5rem',
                    }}
                >
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.div}>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient />
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

export default Popular;