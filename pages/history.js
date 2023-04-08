// import React from "react";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from "@/store";
import { ListGroup, Button } from 'react-bootstrap';
import { useRouter } from "next/router";
import Card from 'react-bootstrap/Card';
import styles from '@/styles/History.module.css';

import { removeFromHistory } from '@/lib/userData';

export default function History () {

    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index) {
        e.stopPropagation();
        router.push(`/artwork?${searchHistory[index]}`);
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        // setSearchHistory((current) => {
        //     let x = [...current];
        //     x.splice(index, 1);
        //     return x;
        // });
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    }

    if (!searchHistory) return null; 

    return (
    <>
        <Card>
            <Card.Body>
                {parsedHistory.length === 0 ? 
                    (<p>Nothing Here Try searching for some artwork</p>) :
                    (<ListGroup>
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                                {Object.keys(historyItem).map((key) => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                                <Button className="float-end" variant="danger" size="sm" 
                                    onClick={e => removeHistoryClicked(e, index)}>&times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)
                }
            </Card.Body>
        </Card>
    </>
    );
}