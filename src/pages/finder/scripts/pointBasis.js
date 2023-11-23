import { process } from "./process";

export const pointBasis = (data, input) => {
    console.log(input.familySize)

    function Selected_Amenities() {
        const filteredResult = {};
    
        Object.keys(data).forEach((floor) => {
            Object.keys(data[floor]).forEach((unitKey) => {
                Object.keys(data[floor][unitKey]).forEach((a) => {
                const i = data[floor][unitKey][a];
                Object.keys(i).forEach((v) => {
                    const b = i[v].amenities.some((amenity) => input.selectedAmenity.includes(amenity));
                    //console.log(i[v].status)
                    if (b) {
                        if (!filteredResult[floor]) {
                            filteredResult[floor] = [];
                        }

                        if (!filteredResult[floor].includes(data[floor][unitKey])) {
                            filteredResult[floor].push(data[floor][unitKey]);
                        }
                    }
                });
                });
            });
        });
        
        console.log(`Selected Amenities [${input.selectedAmenity}]:`,filteredResult);
        return filteredResult
    }

    const selected_Amenity = Selected_Amenities()
    console.log(selected_Amenity)
    
    const conditional_return = ()=>{
        if (input.selectedAmenity.length == 0 ) {
          console.log('No selected amenity');
          return data
        } else {
          console.log(`Selected Amenities [${input.selectedAmenity}]:`, selected_Amenity);
          return selected_Amenity
        }
    }
    
    const data_to_process = conditional_return()
    console.log("data to process",data_to_process)


    function FamSize(){

        let famsize

        if (input.familySize){
            console.log('has a value')
          if (input.familySize <= 4 && input.familySize !== '') {
            famsize = 'smaller';
          } else if (input.familySize <= 6) {
            famsize = 'smaller';
          } else if (input.familySize <= 8) {
            famsize = 'larger';
          } else if (input.familySize <= 10) {
            famsize = 'larger';
          } else {
            famsize = 'larger';
          }

        }else{
            console.log('no')
        }

          return famsize
    }

 
    function InputPoints(input) {
        const counts = {};
        const famsize = FamSize()
        console.log(famsize)
        input.forEach(item => {
            if (counts[item]) {
                counts[item]++;
            } else {
                counts[item] = 1;
            }
        });

        if (counts[famsize]) {
            counts[famsize]++;
        } else {
            counts[famsize] = 1;
        }
    
        console.log(counts)
        return counts;
    }
    
   
    
    const min = input.minimumPrice
    const max = input.maximumPrice
    const counts = InputPoints(input.questions);
    console.log("points",counts)
    
    const sortedCounts = Object.entries(counts)
        .sort(([, countA], [, countB]) => countB - countA);

    const height = [];
    const spacing = [];
    
    
    sortedCounts.forEach(([key, value]) => {
        if (['higher', 'medium', 'lower'].includes(key)) {
            height.push({ [key]: value });
        } else if (['larger', 'smaller'].includes(key)) {
            spacing.push({ [key]: value });
        } 
    });
    
    height.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
    spacing.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
   
    
    const points = { height, spacing };
    
    console.log(points);

    const p =  process(points, data_to_process,min,max)
    const result = p.r
    const textRet = p.resultText 

    return { result, counts, textRet}
    
};
