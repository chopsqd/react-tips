import React, {useEffect, useState} from 'react';
import './photos.scss';
import Collection from "./Collection";

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function Photos() {
    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [collections, setCollections] = useState([])

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId ? `category=${categoryId}` : ''

        fetch(`https://6370c0cd0399d1995d83340b.mockapi.io/photos?page=${page}&limit=3&${category}`)
            .then(res => res.json())
            .then(json => setCollections(json))
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении данных')
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((item, index) =>
                            <li
                                key={item.name}
                                onClick={() => setCategoryId(index)}
                                className={categoryId === index ? 'active' : ''}
                            >{item.name}</li>
                        )
                    }
                </ul>
                <input
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {isLoading
                    ? <h2>Идет загрузка...</h2>
                    : collections
                        .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) =>
                        <Collection key={index} name={item.name} images={item.photos} />
                    )
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(3)].map((_, index) =>
                        <li
                            key={index}
                            onClick={() => setPage(index+1)}
                            className={page === index + 1 ? 'active' : ''}
                        >{index + 1}</li>
                    )
                }
            </ul>
        </div>
    );
}

export default Photos;