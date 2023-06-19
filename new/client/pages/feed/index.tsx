
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Instant from '@/components/instant/instant';
import Instance from '@/models/instance';
import { useState } from 'react';

export default function Feed() {

    let [instances, setInstances] = useState<{ [key: string]: Instance }>({})

    useEffect(() => {
        let token = localStorage.getItem("token");
        let body = JSON.stringify({ "token": token });

        let options = {
            url: "/api/feed",
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: body,
        }

        axios.request(options).then(
            (response) => {
                let newinstances: { [key: string]: Instance } = {};
                for (let i = 0; i < response.data.length; i++) {
                    let id = response.data[i].id;
                    let newinstance = Instance.create(response.data[i]);
                    newinstances[id] = newinstance;
                }
                setInstances(newinstances);
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )

    }, [])

    return (
        <div>
            <h1>Feed</h1>
            {
                Object.keys(instances).map((key) => {
                    return (
                        <div>
                            <h1>{instances[key].username}</h1>
                            <p>{instances[key].caption}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}