import { useState } from 'react';
import { useData } from '../../../../DataContext';
import { reconstructed_data } from './reconstructedData';
import { pointBasis } from './pointBasis';

export const useProcessData = () => {
	const { towers, amenities } = useData();

	const processData = (data) => {
		const rd = reconstructed_data(towers, amenities);
		console.log(rd);
		// const pb = pointBasis(rd, data);
		// const processedResults = pb.result;
		// const processedPoints = pb.counts;
		// const processedText = pb.textRet;

		// console.log(processData)
		// return { processedResults, processedPoints, processedText };
		return { rd };
	};

	const process_Data = processData;

	return { process_Data };
};
