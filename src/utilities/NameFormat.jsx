const NameFormat = ({ fName, mName, lName }) => {
	const firstName = fName.charAt(0).toUpperCase() + fName.slice(1);
	const middleName = mName.charAt(0).toUpperCase();
	const lastName = lName.charAt(0).toUpperCase() + lName.slice(1);
	const fullName =
		middleName === ''
			? `${firstName} ${middleName} ${lastName}`
			: `${firstName} ${middleName}. ${lastName}`;

	return fullName;
};

export default NameFormat;
