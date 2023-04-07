// import React from "react";
import { useAtom } from 'jotai';
import { favouritesAtom } from "@/store";
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Card from 'react-bootstrap/Card';

export default function Favourite () {

    const [ favouritesList ] = useAtom(favouritesAtom);

    return favouritesList ? (
        <>
            <Row className="gy-4">
            {favouritesList.length > 0 ? (
                favouritesList.map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
                </Col>
                ))
            ) : (
                <Col>
                <Card>
                    <Card.Body>
                    <h4>Nothing Here</h4>
                    Try searching for something else.
                    </Card.Body>
                </Card>
                </Col>
            )}
            </Row>
        </>
    ) : null
}