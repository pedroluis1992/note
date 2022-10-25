import React from "react";
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

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

const StyledMBDCard = styled(Card)`
	width: 300px;
	margin-bottom: 20px;
	${props => `1px solid ${console.log(props)}`};
`
const StyledWrapperImage = styled.div`
	height: 100px;
	width: 100px;
	margin: auto;
	margin-bottom: 20px;
`;

const CardComponent = ({ footer, header, title, text, buttonText, background, buttonDelete, removeCard, image, goToDetail }: CardProps) => {
	return (
		<StyledMBDCard>
				{
					!!header && 
					<CardHeader>{header}</CardHeader>
				}
				<CardContent>
					<Typography>{title}</Typography>
					<Typography>{text}</Typography>
					{
						<StyledWrapperImage>
							{image && 
								<img src={image} style={{width: 100}} />
							}
						</StyledWrapperImage>
      		}
					{
						!!buttonText &&
						<Button variant="contained"  style={{marginRight: "10px"}} onClick={() => goToDetail()}>{buttonText}</Button>
					}
					{
						!!buttonDelete &&
						<Button onClick={() => removeCard()}>{buttonDelete}</Button>
					}
				</CardContent>
				{
					!!footer &&
					<div className='text-muted'>{footer}</div>
				}
		</StyledMBDCard>
	)
}

export default CardComponent;