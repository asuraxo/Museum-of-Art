import React from 'react'
import useSWR from 'swr'
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link'

export default function ArtworkCard( {objectID} ) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);    

    if(error){
        return <Error statusCode={404} />
    }

    else if (data) {
        return (
            <>
                {
                    data.primaryImage ?
                    <Card.Img variant="top" src={data.primaryImage} /> :
                    <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]"/>
                }
                {
                    data.title ?
                    <Card.Title>{data.title}</Card.Title> :
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
                <Link href={`/artwork/${objectID}`}>
                    <Button>ID: {data.objectID}</Button>
                </Link>
            </>
        )
    }
}