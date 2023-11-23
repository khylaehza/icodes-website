import React from 'react';
import html2canvas from 'html2canvas';
import '../App.css';
import { IconButton } from '@chakra-ui/react';
import { TbCapture } from 'react-icons/tb';
const CusCapture = ({ component }) => {
	const ToCaptureRef = React.useRef(); // ref

	const captureScreenshot = () => {
		var canvasPromise = html2canvas(ToCaptureRef.current, {
			useCORS: true,
		});
		canvasPromise.then((canvas) => {
			var dataURL = canvas.toDataURL('image/png');
			// Create an image element from the data URL
			var img = new Image();
			img.src = dataURL;
			img.download = dataURL;
			// Create a link element
			var a = document.createElement('a');
			a.innerHTML = 'DOWNLOAD';
			a.target = '_blank';
			// Set the href of the link to the data URL of the image
			a.href = img.src;
			// Set the download attribute of the link
			a.download = img.download;
			// Append the link to the page
			document.body.appendChild(a);
			// Click the link to trigger the download
			a.click();
		});
	};

	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: 120,
					left: 20,
				}}
			>
				<IconButton
					variant='ghost'
					colorScheme='#FFFFF'
					icon={<TbCapture />}
					w={75}
					bgColor={'#FFFAF0'}
					border={'1px'}
					borderColor={'#F9EEDA'}
					boxShadow={'xl'}
					h={55}
					zIndex={5}
					onClick={captureScreenshot}
				/>
			</div>

			<div
				style={{
					height: '100vh',
				}}
				ref={ToCaptureRef}
			>
				{component}
			</div>
		</>
	);
};

export default CusCapture;
