import React from 'react';
import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

export default function ArtworkCardDetail( props ) {
    const {objectID} = props;
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
    const [ showAdded, setShowAdded ] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);

    const favouritesClicked = () => {
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav !== objectID));
            setShowAdded(false);
        } else {
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    }

    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);    

    if(error){
        return <Error statusCode={404} />;
    }

    else if (data) {
        return (
            <Card>
                {
                    data.primaryImage ?
                    <Card.Img variant="top" src={data.primaryImage} /> :
                    <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>
                }
                <Card.Body>
                {
                    data.title ?
                    <Card.Title >{data.title}</Card.Title> :
                    <Card.Title>N/A</Card.Title>
                }
                {
                    data.objectDate ?
                    <Card.Text><b>Date: </b>{data.objectDate}</Card.Text> :
                    <Card.Text><b>Date: </b>N/A</Card.Text>
                }
                {
                    data.classification  ?
                    <Card.Text><b>Classification: </b>{data.classification}</Card.Text> :
                    <Card.Text><b>Classification: </b>N/A</Card.Text>
                }
                {
                    data.medium  ?
                    <Card.Text><b>Medium: </b>{data.medium}</Card.Text> :
                    <Card.Text><b>Medium: </b>N/A</Card.Text>
                }
                <br />
                <br />
                {
                    data.artistDisplayName  ?
                    <Card.Text>
                        <b>Artist: </b>{data.artistDisplayName}
                        <a> </a>
                        <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >(wiki)</a>
                    </Card.Text> :
                    <Card.Text><b>Artist: </b>N/A</Card.Text>
                }
                {
                    data.creditLine   ?
                    <Card.Text><b>Credit Line: </b>{data.creditLine}</Card.Text> :
                    <Card.Text><b>Credit Line: </b>N/A</Card.Text>
                }
                {
                    data.dimensions  ?
                    <Card.Text><b>Dimensions: </b>{data.dimensions}</Card.Text> :
                    <Card.Text><b>Dimensions: </b>N/A</Card.Text>
                }
                <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
                    + Favourite{showAdded ? " (added)" : ""}
                </Button>
                </Card.Body>
            </Card>
        )
    };
}
