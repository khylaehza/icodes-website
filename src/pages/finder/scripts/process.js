


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
      const textRef = [...points.height, ...points.spacing]

        if (textRef.includes('higher') && textRef.includes('larger')) {
          return 'Your preference is higher floors and large rooms, it suggests that you are someone who enjoys expansive living spaces and the elevated perspective that comes with living on higher floors. You may have a penchant for breathtaking views, a sense of privacy, and a desire to be above the hustle and bustle of the world below. Living on higher floors can offer a sense of tranquility and a feeling of being removed from the noise and commotion of the street. Additionally, your preference for large rooms indicates that you value ample space for various activities, such as entertaining guests, pursuing hobbies, or simply having room to spread out and relax.';
        } else if (textRef.includes('higher') && textRef.includes('smaller')) {
          return 'Your preference is higher floors and small rooms, it suggests that you are someone who values a compact and elevated living experience. Living on higher floors allows you to enjoy a sense of privacy and detachment from the happening on the ground level. It offers a peaceful and secluded environment where you can retreat and find solace. Your preference for small rooms suggests that you prioritize simplicity, functionality, and efficiency in your living space. You may prefer to have a cozy and minimalistic environment that is easy to maintain and organize.';
        } else if (textRef.includes('medium') && textRef.includes('larger')) {
          return 'Your preference is medium floors and large rooms, it suggests that you are someone who enjoys a balance between elevation and spaciousness. Medium floors offer a middle ground between higher and lower perspectives, providing you with a decent view without being too distant from the ground. Large rooms accommodate various activities and provide ample space for comfortable living.';
        } else if (textRef.includes('medium') && textRef.includes('smaller')) {
          return 'Your preference is medium floors and small rooms, it suggests that you are someone who appreciates a balanced and efficient living space. Medium floors offer a moderate perspective while small rooms ensure simplicity and functionality in your living environment. You value practicality and comfort without the need for excessive space.';
        } else if (textRef.includes('lower') && textRef.includes('larger')) {
          return 'Your preference is lower floors and large rooms, it suggests that you are someone who finds comfort and enjoyment in spacious living environments closer to the ground. You may appreciate the feeling of being grounded and having a strong sense of stability. Additionally, living on lower floors can provide a sense of security and convenience, allowing easy access to the outdoors or amenities within the condo.';
        } else if (textRef.includes('lower') && textRef.includes('smaller')) {
          return 'Your preference is lower floors and small rooms, it suggests that you are someone who appreciates a cozy and intimate living environment. You may find comfort in smaller spaces that offer a sense of security and containment. Living on lower floors can provide a grounded feeling and a connection to the immediate surroundings. You may also value the convenience and ease of access that comes from being closer to the ground.';
        } else if (textRef.includes('higher') && textRef.includes('medium') && textRef.includes('larger')) {
          return 'Your preference is higher floors, medium floors, and larger rooms, suggesting a balanced and moderate living experience. Living on higher floors grants you a view and a certain level of seclusion without being overly isolated. Medium-sized rooms provide enough space for essential activities without overwhelming you with excess space. You appreciate functionality and comfort in your living space without needing excessive roominess.';
        } else if (textRef.includes('higher') && textRef.includes('medium') && textRef.includes('smaller')) {
          return 'Your preference is higher floors, medium floors, and smaller rooms, suggesting that you have diverse preferences within your living space. You value the elevated perspective and moderate space provided by higher floors and medium-sized rooms. Additionally, the preference for smaller rooms indicates a desire for coziness and functionality in certain areas of your living space.';
        } else if (textRef.includes('medium') && textRef.includes('lower') && textRef.includes('larger')) {
          return 'Your preference is medium floors, lower floors, and larger rooms, suggesting a balanced preference for a moderate perspective and spacious living environments closer to the ground. Medium floors offer a decent view while remaining close enough to the ground, and large rooms provide ample space for various activities and comfortable living.';
        } else if (textRef.includes('medium') && textRef.includes('lower') && textRef.includes('smaller')) {
          return 'Your preference is medium floors, lower floors, and smaller rooms, indicating a preference for balance in perspective and living space. You appreciate a moderate viewpoint with medium floors and the coziness and efficiency provided by smaller rooms while staying close to the ground.';
        } else if (textRef.includes('lower') && textRef.includes('higher') && textRef.includes('larger')) {
          return 'Your preference is lower floors, higher floors, and larger rooms, suggesting a varied preference in both elevation and living space. You appreciate spaciousness provided by large rooms, the grounded feeling of lower floors, and the elevated perspective and seclusion offered by higher floors.';
        } else if (textRef.includes('lower') && textRef.includes('higher') && textRef.includes('smaller')) {
          return 'Your preference is lower floors, higher floors, and smaller rooms, indicating a diverse preference for both elevation and living space. You value the coziness and functionality of small rooms, the grounded feeling of lower floors, and the seclusion provided by higher floors.';
        } else if (textRef.includes('higher') && textRef.includes('larger') && textRef.includes('smaller')) {
          return 'Your preference is higher floors, larger rooms, and smaller rooms, indicating a varied preference within your living space. You value the expansive space provided by large rooms along with the coziness and functionality offered by small rooms while enjoying the elevated perspective of higher floors.';
        } else if (textRef.includes('medium') && textRef.includes('larger') && textRef.includes('smaller')) {
          return 'Your preference is medium floors, larger rooms, and smaller rooms, suggesting a balanced approach to living space. You appreciate a moderate perspective provided by medium floors, along with the spaciousness of large rooms and the efficiency of small rooms.';
        } else if (textRef.includes('lower') && textRef.includes('larger') && textRef.includes('smaller')) {
          return 'Your preference is lower floors, larger rooms, and smaller rooms, indicating a varied preference within your living space. You value spaciousness provided by large rooms along with the coziness and functionality offered by small rooms while enjoying the grounded feeling of lower floors.';
        } else if (textRef.includes('higher') && textRef.includes('medium') && textRef.includes('lower') && textRef.includes('larger') && textRef.includes('smaller')) {
          return 'Your preference for higher floors, medium floors, lower floors, larger rooms, and smaller rooms indicates a very diverse and balanced set of preferences within your living space. This suggests a nuanced approach to living, valuing the perspectives offered by different floors and the functionalities provided by both larger and smaller rooms. It implies a desire for a comprehensive living experience, accommodating different needs within the same space.';
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

        console.log("test",combinedArray)


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


