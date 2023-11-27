export const reconstructed_data = (towers, amenities) => {
	const Amenity_data = () => {
		const AmenitiesMap = new Map();

		amenities.forEach((amenity) => {
			if (!AmenitiesMap.has(amenity.TNum)) {
				AmenitiesMap.set(amenity.TNum, {
					tower: `${amenity.TNum}`,
					amenities: [],
				});
			}

			AmenitiesMap.get(amenity.TNum).amenities.push(amenity.AmenityName);
		});

		const towersWithAmenities = Array.from(AmenitiesMap.values());

		const towerAmenitiesMap = towersWithAmenities.reduce(
			(acc, towerAmenities) => {
				const towerKey = towerAmenities.tower.match(/\((.*?)\)/)[1];
				acc[towerKey] = towerAmenities.amenities || [];
				return acc;
			},
			{}
		);

		// console.log("Towers with Amenities:", towerAmenitiesMap);
		return towerAmenitiesMap;
	};

	const Level = () => {
		const towerAmenities = Amenity_data();

		const units = towers.map((towers) => towers.Units);
		// console.log("Raw units data:",units)

		const unitsWithAmenities = units.map((levelData) => {
			const updatedTowers = {};
			Object.entries(levelData).forEach(([floorKey, units]) => {
				updatedTowers[floorKey] = {};
				Object.entries(units).forEach(([unitKey, unitData]) => {
					const amenities = towerAmenities[unitData.tower] || [
						'No amenity Access',
					];
					updatedTowers[floorKey][unitKey] = {
						...unitData,
						amenities,
					};
				});
			});

			return updatedTowers;
		});

		// console.log( "units with amenities:",unitsWithAmenities)

		const levels = divideArray(unitsWithAmenities);

		function divideArray(array) {
			const dividedArray = {
				lower: [],
				medium: [],
				higher: [],
			};

			for (const object of array) {
				const sortedKeys = Object.keys(object).sort(
					(a, b) => Number(a) - Number(b)
				);
				const chunkSize = Math.ceil(sortedKeys.length / 3);

				const lowKeys = sortedKeys.slice(0, chunkSize);
				const mediumKeys = sortedKeys.slice(chunkSize, chunkSize * 2);
				const highKeys = sortedKeys.slice(chunkSize * 2);

				const extractKeys = (keys, obj) => {
					return keys.reduce((acc, key) => {
						acc[key] = obj[key];
						return acc;
					}, {});
				};

				const lowObj = extractKeys(lowKeys, object);
				const mediumObj = extractKeys(mediumKeys, object);
				const highObj = extractKeys(highKeys, object);

				dividedArray.lower.push(lowObj);
				dividedArray.medium.push(mediumObj);
				dividedArray.higher.push(highObj);
			}

			return dividedArray;
		}

		// console.log("reconstructed data",levels)
		return levels;
	};

	return Level();
};
