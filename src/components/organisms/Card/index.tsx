import React from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBCardHeader,
	MDBCardFooter,
	MDBBtn
} from 'mdb-react-ui-kit';
import styled from "styled-components";

interface CardProps {
	footer?: any;
	header?: any;
	title?: string;
	text: string;
	buttonText?: any;
	background?: any;
}

const StyledMBDCard = styled(MDBCard)`
	${props => `1px solid ${console.log(props)}`};
	${props => `background: ${props.background}`};
`
const Card = ({ footer, header, title, text, buttonText, background }: CardProps) => {
	return (
		<StyledMBDCard alignment='center' background={background}>
				{
					!!header && 
					<MDBCardHeader>{header}</MDBCardHeader>
				}
				<MDBCardBody>
					<MDBCardTitle>{title}</MDBCardTitle>
					<MDBCardText>{text}</MDBCardText>
					{
						!!buttonText &&
						<MDBBtn href='#'>{buttonText}</MDBBtn>
					}
				</MDBCardBody>
				{
					!!footer &&
					<MDBCardFooter className='text-muted'>{footer}</MDBCardFooter>
				}
		</StyledMBDCard>
	)
}

export default Card;