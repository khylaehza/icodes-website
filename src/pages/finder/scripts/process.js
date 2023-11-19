


export const process = (points, data, minn, maxx) => {

    const p = pointBasis(points)
    const r = result(data,p)
    console.log('The highest number(s) found:', p);
    console.log('results:', r);


    function pointBasis (points) {

        const highestNumbers = {};
        
        for (let key in points) {
            const values = points[key].map(obj => Object.values(obj)[0]);
            const max = Math.max(...values);
            const highestInArray = points[key].filter(obj => Object.values(obj)[0] === max);
            const highestKeys = highestInArray.map(obj => Object.keys(obj)[0]);
            
            if (highestKeys.length > 0) {
                highestNumbers[key] = highestKeys;
            }
        }
        
        return highestNumbers;
    }

    const resultText = retText(p)
    function retText(points) {
        const textRef = [...points.height, ...points.spacing];
      
        if (textRef.includes('higher') && textRef.includes('larger')) {
          return 'Your preference is higher floors and large rooms, it suggests that you are someone who enjoys expansive living spaces and the elevated perspective that comes with living on higher floors. You may have a penchant for breath-taking views, a sense of privacy, and a desire to be above the hustle and bustle of the world below. Living on higher floors can offer a sense of tranquillity and a feeling of being removed from the noise and commotion of the street. Additionally, your preference for large rooms indicates that you value ample space for various activities, such as entertaining guests, pursuing hobbies, or simply having room to spread out and relax.';
        } else if (textRef.includes('higher') && textRef.includes('smaller')) {
          return 'Your preference is higher floors and small rooms, it suggests that you are someone who values a compact and elevated living experience. Living on higher floors allows you to enjoy a sense of privacy and detachment from the happening on the ground level. It offers a peaceful and secluded environment where you can retreat and find solace. Your preference for small rooms suggests that you prioritize simplicity, functionality, and efficiency in your living space. You may prefer to have a cozy and minimalistic environment that is easy to maintain and organize.';
        } else if (textRef.includes('lower') && textRef.includes('larger')) {
          return 'Your preference is lower floors and large rooms, it suggests that you are someone who finds comfort and enjoyment in spacious living environments closer to the ground. You may appreciate the feeling of being grounded and having a strong sense of stability. Additionally, living on lower floors can provide a sense of security and convenience, allowing easy access to the outdoors or amenities within the condo.';
        } else if (textRef.includes('lower') && textRef.includes('smaller')) {
          return 'Your preference is lower floors and small rooms, it suggests that you are someone who appreciates a cozy and intimate living environment. You may find comfort in smaller spaces that offer a sense of security and containment. Living on lower floors can provide a grounded feeling and a connection to the immediate surroundings. You may also value the convenience and ease of access that comes being closer to the ground.';
        } else {
          return 'Unable to determine preferences based on the provided inputs.';
        }
    }
    console.log("text",resultText)
    function result(data, highestNumbers) {
        const heightKeys = highestNumbers.height || [];
        const spacingKeys = highestNumbers.spacing || [];
        const filteredData = {};
        const category = {};
        const combinedArray = [];
        const tcp = {}
        Object.keys(data).forEach(key => {
            if (heightKeys.includes(key)) {
                filteredData[key] = data[key];
            }
        });

        console.log("level",filteredData)
      
        console.log("test",combinedArray)


        for (const key in filteredData) {
            const currentObject = filteredData[key];
          for (const innerKey in currentObject) {
            const units = currentObject[innerKey]
            for (const unt in units){
                const r = units[unt]
                for(const p in r){
                    const x = r[p]
                    combinedArray.push(x);
                }
                
            }
          }
        }


        const cleanedArray = combinedArray.map((item) => {
            const newObj = {};
            for (const key in item) {
                if (!isNaN(key)) {
                continue;
                }
                newObj[key] = item[key];
            }
            return newObj;
            });

            const userInputMin = '1,000,000';
            const userInputMax = '7,000,000';

            const min = Number(minn.replace(/,/g, ''));
            const max = Number(maxx.replace(/,/g, ''));

            const result = cleanedArray.filter((item) => {
            if (item.tcp && typeof item.tcp === 'string') {
                const tcpValue = Number(item.tcp.replace(/,/g, ''));

                return (
                item.status === 'Available' &&
                spacingKeys.some(key => item.category[2].includes(key)) &&
                tcpValue >= min &&
                tcpValue <= max
                );
        }
        return false; 
        });


        return result;
    }

    return {r,resultText}
}


