import { useState } from "react";
import { useData } from "../../../../DataContext";
import { reconstructed_data } from "./reconstructedData";
import { pointBasis } from "./pointBasis";

export const useProcessData = () => {
    const { towers, amenities } = useData();

    const processData = (data) => {
        console.log('Values received:', data);
        const rd = reconstructed_data(towers, amenities);
        const pb = pointBasis(rd, data);
        const processedResults = pb.result;
        const processedPoints = pb.counts;
        const processedText = pb.textRet;

        

        return {processedResults,processedPoints,processedText};
    };

    const process_Data = processData

    return {process_Data};
};

