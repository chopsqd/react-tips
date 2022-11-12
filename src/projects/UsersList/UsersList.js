import React, {useEffect, useState} from 'react';
import {Success} from './components/Success';
import {Users} from './components/Users';
// import './usersList.scss';

function UsersList() {
    const [users, setUsers] = useState([])
    const [invites, setInvites] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => setUsers(json.data))
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении пользователей')
            })
            .finally(() => setIsLoading(false))
    }, [])

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value)
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(item => item !== id))
        } else {
            setInvites((prev => [...prev, id]))
        }
    }

    const onClickSendInvites = () => {
        setSuccess(true)
    }

    return (
        <div className="App">
            {
                success
                    ? <Success count={invites.length}/>
                    : <Users
                        searchValue={searchValue}
                        items={users}
                        invites={invites}
                        isLoading={isLoading}
                        onClickInvite={onClickInvite}
                        onChangeSearchValue={onChangeSearchValue}
                        onClickSendInvites={onClickSendInvites}
                    />
            }
        </div>
    );
}

export default UsersList;