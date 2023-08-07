import { Favorites } from './Favorites'

export default function SideMenu() {
	return (
		<section className='fixed top-0 right-0 backdrop-blur-sm bg-[#6565659e] h-full w-full flex justify-end'>
			<Favorites />
		</section>
	)
}
