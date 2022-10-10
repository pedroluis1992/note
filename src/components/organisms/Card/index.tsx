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
	title: string;
	text?: string;
	buttonText?: any;
	background?: any;
	buttonDelete?: any;
	removeCard?: any;
	image?: any;
	goToDetail?: any;
}

const StyledMBDCard = styled(MDBCard)`
	width: 300px;
	margin-bottom: 20px;
	${props => `1px solid ${console.log(props)}`};
	${props => `background: ${props.background}`};
`
const StyledWrapperImage = styled.div`
	height: 100px;
	width: 100px;
	margin: auto;
	margin-bottom: 20px;
`;

const Card = ({ footer, header, title, text, buttonText, background, buttonDelete, removeCard, image, goToDetail }: CardProps) => {
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
						<StyledWrapperImage>
							{image && 
								<img src={image} style={{width: 100}} />
							}
						</StyledWrapperImage>
      		}
					{
						!!buttonText &&
						<MDBBtn  style={{marginRight: "10px"}} onClick={() => goToDetail()}>{buttonText}</MDBBtn>
					}
					{
						!!buttonDelete &&
						<MDBBtn onClick={() => removeCard()}>{buttonDelete}</MDBBtn>
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