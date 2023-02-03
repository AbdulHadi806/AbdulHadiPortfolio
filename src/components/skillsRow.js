import React from 'react'
import useSWR from 'swr'
import styles from '../styles/skillsrow.module.css'
import {Commontitle, Experince } from './commonTitle'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Skillsrow = () => {
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div className={`text-start ${styles.skillsRow}`}>
            <Commontitle
                title={data.skills.heading + '.'}
                icon={data.skills.arrowimg}
            />
            <p style={{ color: '#555555' }}>
                {data.skills.description}
            </p>
            <div className={styles.skillsInner}>
                {data.skills.expertise.map((item) => {
                    return (
                        <div style={{ paddingTop: '15px' }} key={Math.random()}>
                            <h4
                                style={{
                                    fontSize: '17px',
                                    color: '#0b0b13',
                                    fontWeight: 400,
                                }}
                            >
                                {item.skill}
                            </h4>
                            <Experince Width = {item.experince} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Skillsrow
