import {
	Menu,
	MenuButton,
	MenuList,
	MenuItemOption,
	MenuOptionGroup,
	MenuDivider,
	IconButton,
} from '@chakra-ui/react';
import { BiFilter } from 'react-icons/bi';
const CusFilter = ({
	filter,
	setFilter,
	setFilterOnChange,
	setSortType,
	titleLbl = 'Position',
}) => {
	return (
		<Menu closeOnSelect={false}>
			<MenuButton
				as={IconButton}
				aria-label='Options'
				icon={<BiFilter />}
				variant='outline'
				bgColor={'w.300'}
				boxShadow='0 4px 12px 0 rgba(134,149,166,0.5)'
			/>
			<MenuList w='110px'>
				<MenuOptionGroup
					defaultValue='asc'
					title='Sort Date'
					type='radio'
					onChange={(e) => {
						setSortType(e);
					}}
				>
					<MenuItemOption
						value='asc'
						fontSize={'sm'}
					>
						Ascending
					</MenuItemOption>
					<MenuItemOption
						value='desc'
						fontSize={'sm'}
					>
						Descending
					</MenuItemOption>
				</MenuOptionGroup>
				{filter && (
					<>
						<MenuDivider />
						<MenuOptionGroup
							title={`Filter ${titleLbl}`}
							type='checkbox'
							onChange={(e) => {
								setFilter(e);
								setFilterOnChange(true);
							}}
							defaultValue={filter}
						>
							{filter.map((filter, id) => (
								<MenuItemOption
									value={filter}
									fontSize={'sm'}
									key={id}
								>
									{filter}
								</MenuItemOption>
							))}
						</MenuOptionGroup>
					</>
				)}
			</MenuList>
		</Menu>
	);
};

export default CusFilter;
